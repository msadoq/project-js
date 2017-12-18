// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/05/2017 : Move server from server/ sub-component to client/lib/serverProcess
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move serverProcess code one level upper
// VERSION : 1.1.2 : FA : #6762 : 02/06/2017 : Fix proto register for packaging
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #6798 : 15/06/2017 : Merge branch 'dev' into pgaucher-464-proto-config
// VERSION : 1.1.2 : FA : #6798 : 15/06/2017 : Modify protobuf loading strategy : - Move adapters in another folder - New architecture generated for adapters folder - Add raw adapter mechanism
// VERSION : 1.1.2 : FA : #6798 : 15/06/2017 : Add types.proto in dc - Add parse/stringify mechanism to configurationManager
// VERSION : 1.1.2 : FA : #6798 : 16/06/2017 : Several changes : - Lint pass - Modify stub to use encode/decode of adapters (row AND protobuf) - Add a new stubs.js file to load the stubs present in the adapters plugins
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 19/06/2017 : Cleanup main and server startup process
// VERSION : 1.1.2 : DM : #6700 : 20/06/2017 : Cleanup main and server startup process
// VERSION : 1.1.2 : FA : #6798 : 20/06/2017 : Merge branch 'dev' into pgaucher-464-proto-config
// VERSION : 1.1.2 : DM : #6700 : 21/06/2017 : Fix merge and add robustness code in server process bootstraping
// VERSION : 1.1.2 : FA : #6993 : 21/06/2017 : Fix packaging : replace parameters.get('IS_BUNDLED') by process.env.IS_BUNDLED
// VERSION : 1.1.2 : FA : #6798 : 21/06/2017 : Fix side effect due to stringify/parse parameters in forked process
// VERSION : 1.1.2 : DM : #6700 : 23/06/2017 : First draft implementation of dataRequesting management on server
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : First draft implementation of dataRequesting management on server
// VERSION : 1.1.2 : FA : #6798 : 27/06/2017 : branch 'dev' into pgaucher-464-proto-config
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Small fix to access DEBUG value in conf, in forked process
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add health mechanism on each process
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Modify health monitoring mechanism : - Handle properly start and stop - Add critical delay value in conf - Only start monitoring on DEBUG
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add mock delay in profiling loop event - Try to add middlware to induce stress => not possible - Modify health logic, change as soon as the critical delay is reached
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add timing decorator on DEBUG only (for each process) - Move decorator on makeSlave/MasterDispatcher
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Fix openInspector : init rtd in serverProcess
// VERSION : 1.1.2 : FA : #7355 : 27/07/2017 : RTD is now optional on VIMA installation
// VERSION : 1.1.2 : DM : #6700 : 28/07/2017 : Creation of store observer and test state
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Add sendProductLog middleware in serverProcess + replace old IPC productLog
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Major changes : all data consumption is now plugged
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : DM : #6700 : 25/08/2017 : Clean code . . .
// VERSION : 1.1.2 : DM : #6700 : 25/08/2017 : Add redux and patch workflow improvment + remove store observer
// VERSION : 1.1.2 : DM : #6700 : 29/08/2017 : Add throttle mechanism in patch reducer
// END-HISTORY
// ====================================================================

import exit from 'exit';
import { series } from 'async';
import { setRtd, getRtd } from '../rtdManager';
import { updateDomains } from '../store/actions/domains';
import adapter from '../utils/adapters';
import { LOG_APPLICATION_START, CHILD_PROCESS_READY_MESSAGE_TYPE_KEY } from '../constants';
import getLogger from '../common/logManager';
import { get } from '../common/configurationManager';
import makeCreateStore from './store';
import { setRteSessions } from '../store/actions/rte';
import { updateMasterSessionIfNeeded } from '../store/actions/masterSession';
import { sendProductLog } from '../store/actions/hsc';
import connectToZmq from './lifecycle/zmq';
import fetchInitialData from './lifecycle/data';
import eventLoopMonitoring from '../common/eventLoopMonitoring';
import { updateHssStatus } from '../store/actions/health';
import makeSubscriptionStoreObserver from '../store/observers/subscriptionStoreObserver';
import { updateSessions } from '../store/actions/sessions';

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


series({
  // ZeroMQ sockets
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
  initialData: callback => fetchInitialData(callback),
}, (err, { initialData }) => {
  if (err) {
    throw err;
  }

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
