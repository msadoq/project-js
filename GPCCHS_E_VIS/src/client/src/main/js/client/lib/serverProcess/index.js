import exit from 'exit';
import { series } from 'async';
import adapter from '../utils/adapters';
import { LOG_APPLICATION_START, CHILD_PROCESS_READY_MESSAGE_TYPE_KEY } from '../constants';
import getLogger from '../common/logManager';
import { get } from '../common/configurationManager';
import makeCreateStore from './store';
import { updateDomains } from '../store/actions/domains';
import { updateSessions } from '../store/actions/sessions';
import { updateMasterSessionIfNeeded } from '../store/actions/masterSession';
import connectToZmq from './lifecycle/zmq';
import fetchInitialData from './lifecycle/data';
import makeDataRequestsObserver from './dataRequests/observer';
import { dc } from './ipc';
import eventLoopMonitoring from '../common/eventLoopMonitoring';
import { updateHssStatus } from '../store/actions/health';

const HEALTH_CRITICAL_DELAY = get('SERVER_HEALTH_CRITICAL_DELAY');
adapter.registerGlobal();
const clientController = require('./controllers/client');

const logger = getLogger('main');

let monitoring = {};
process.title = 'gpcchs_hss';

series({
  // ZeroMQ sockets
  zmq: callback => connectToZmq(get('ZMQ_GPCCDC_PULL'), get('ZMQ_GPCCDC_PUSH'), callback),
  // Send logBook to LPISIS
  logBook: (callback) => {
    dc.sendProductLog(LOG_APPLICATION_START);
    callback(null);
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
  const store = makeCreateStore('server', isDebugEnabled)();
  store.subscribe(makeDataRequestsObserver(store));
  store.dispatch(updateMasterSessionIfNeeded(initialData.masterSessionId));
  store.dispatch(updateSessions(initialData.sessions));
  store.dispatch(updateDomains(initialData.domains));

  /* Start Health Monitoring mechanism
  On a status change, the Server Health status is updated
  */
  if (isDebugEnabled) {
    monitoring = eventLoopMonitoring({
      criticalDelay: HEALTH_CRITICAL_DELAY,
      onStatusChange: status => store.dispatch(updateHssStatus(status)),
      id: 'server',
    }, store);
    monitoring.startMonitoring();
  }
  // TODO dbrugne init configuration and inject in store

  // inform main that everything is ready and pass initialState
  process.send({
    [CHILD_PROCESS_READY_MESSAGE_TYPE_KEY]: true,
    payload: {
      initialState: store.getState(),
    },
  });
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
