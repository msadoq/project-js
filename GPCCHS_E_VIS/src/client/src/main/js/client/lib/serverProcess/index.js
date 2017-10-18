import exit from 'exit';
import { series } from 'async';
import { setRtd, getRtd } from '../rtdManager';
import { read } from '../common/fs';
import adapter from '../utils/adapters';
import { LOG_APPLICATION_START, CHILD_PROCESS_READY_MESSAGE_TYPE_KEY } from '../constants';
import getLogger from '../common/logManager';
import { get, setFmdConfiguration } from '../common/configurationManager';
import makeCreateStore from './store';
import { updateDomains } from '../store/actions/domains';
import { updateSessions } from '../store/actions/sessions';
import { updateMasterSessionIfNeeded } from '../store/actions/masterSession';
import { sendProductLog } from '../store/actions/hsc';
import connectToZmq from './lifecycle/zmq';
import fetchInitialData from './lifecycle/data';
import eventLoopMonitoring from '../common/eventLoopMonitoring';
import { updateHssStatus } from '../store/actions/health';
import makeSubscriptionStoreObserver from '../store/observers/subscriptionStoreObserver';
import { setRteSessions } from '../store/actions/rte';

const dynamicRequire = process.env.IS_BUNDLED === 'on' ? global.dynamicRequire : require; // eslint-disable-line

adapter.registerGlobal();
const clientController = require('./controllers/client');

const logger = getLogger('main');

let monitoring = {};
process.title = 'gpcchs_master';

const requestCatalogSessions = (store) => {
  // should have rte sessions in store at start
  if (get('RTD_ON') === 'on') {
    logger.info('requesting catalog explorer sessions...');
    const rtdApi = getRtd();
    rtdApi.getDatabase().getSessionList((err, sessions) => {
      if (err) {
        return;
      }
      logger.info('injecting catalog explorer sessions...');
      store.dispatch(setRteSessions(sessions));
    });
  }
};

function loadFmdConfigurationFile(absolutePath, callback) {
  read(absolutePath, (error, content) => {
    callback(error, content);
    setFmdConfiguration(JSON.parse(content));
  });
}

const loadMissionsAdapters = (missionsAdapters) => {
  adapter.registerGlobal(missionsAdapters);
};

series({
  // ZeroMQ sockets
  loadFileConfig: callback => loadFmdConfigurationFile(callback),
  zmq: callback => connectToZmq(get('ZMQ_GPCCDC_PULL'), get('ZMQ_GPCCDC_PUSH'), callback),
  // TODO : Send logBook to LPISIS (after store init to allow dispatch)
  logBook: (callback) => {
    callback(null);
  },
  rtd: (callback) => {
    if (get('RTD_ON') === 'on') {
      const createRtd = dynamicRequire('rtd/catalogs').connect;
      const socket = get('RTD_UNIX_SOCKET');
      let stub = false;
      if (get('STUB_RTD_ON') === 'on') {
        stub = true;
      }
      logger.info('starting RTD client...');
      createRtd({ socket, stub }, (err, rtd) => {
        if (err) {
          callback(err);
          return;
        }
        setRtd(rtd);
        callback(null);
      });
    } else {
      callback(null);
    }
  },
  // Initial data for store (domains, sessions, master session ID)
  initialData: callback => fetchInitialData(get('CONFIGURATION'), callback),
}, (err, { initialData }) => {
  if (err) {
    throw err;
  }
  loadMissionsAdapters(get('MISSIONS_ADAPTERS'));

  // ipc with main
  process.on('message', clientController);
  const isDebugEnabled = get('DEBUG') === 'on';
  // store
  const store = makeCreateStore('server', isDebugEnabled)(); // STORE
  store.subscribe(makeSubscriptionStoreObserver(store));

  // inform main that everything is ready and pass initialState
  // warning: as IPC never change the message sending order, this message will be sent before any "patch" message
  //          on the main side this message will trigger the store creation (fully synchronous), so there is no
  //          risk that a "patch", will be applied on an not instancied store.
  process.send({
    [CHILD_PROCESS_READY_MESSAGE_TYPE_KEY]: true,
    payload: {
      initialState: store.getState(),
    },
  });

  // hydrate store with initial data from LPISIS
  store.dispatch(sendProductLog(LOG_APPLICATION_START));
  store.dispatch(updateMasterSessionIfNeeded(initialData.masterSessionId));
  store.dispatch(updateSessions(initialData.sessions));
  store.dispatch(updateDomains(initialData.domains));

  requestCatalogSessions(store);

  /* Start Health Monitoring mechanism
  On a status change, the Server Health status is updated
  */
  if (isDebugEnabled) {
    monitoring = eventLoopMonitoring({
      criticalDelay: get('SERVER_HEALTH_CRITICAL_DELAY'),
      onStatusChange: status => store.dispatch(updateHssStatus(status)),
      id: 'server',
    }, store);
    monitoring.startMonitoring();
  }
});

// handle graceful shutdown
process.once('SIGINT', () => {
  // warning! binding SIGINT prevent SIGTERM handler non-execution when stopping process from CLI
  logger.info('get quit signal from cli (SIGINT)');
});
process.once('SIGTERM', () => {
  if (monitoring.stopMonitoring) monitoring.stopMonitoring();
  logger.info('gracefully close server (SIGTERM)');
  exit(0);
});
