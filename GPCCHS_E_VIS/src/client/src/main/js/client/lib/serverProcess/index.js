import path from 'path';
import exit from 'exit';
import { series } from 'async';

import registerDc from 'common/protobuf/adapters/dc';
import registerLpisis from 'common/protobuf/adapters/lpisis';
import getLogger from '../common/logManager';
import makeCreateStore from './store';
import { updateDomains } from '../store/actions/domains';
import { updateSessions } from '../store/actions/sessions';
import { updateMasterSessionIfNeeded } from '../store/actions/masterSession';
import connectToZmq from './lifecycle/zmq';
import fetchInitialData from './lifecycle/data';
import { LOG_APPLICATION_START } from '../constants';
import { dc } from './ipc';

// Temporary fix for packaging ////////////////////////////////////////////////////////////////////
const rootPath = process.env.IS_BUNDLED ? __dirname : path.resolve(__dirname, '../..');
registerDc(path.join(rootPath, 'node_modules/common/protobuf/proto/dc'));
registerLpisis(path.join(rootPath, 'node_modules/common/protobuf/proto/lpisis'));
// Temporary fix for packaging ////////////////////////////////////////////////////////////////////
const clientController = require('./controllers/client');

const logger = getLogger('main');

process.title = 'gpcchs_hss';

series({
  // ZeroMQ sockets
  zmq: callback => connectToZmq(process.env.ZMQ_GPCCDC_PULL, process.env.ZMQ_GPCCDC_PUSH, callback),
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

  // store
  const store = makeCreateStore('server', process.env.DEBUG === 'on')();
  store.dispatch(updateMasterSessionIfNeeded(initialData.masterSessionId));
  store.dispatch(updateSessions(initialData.sessions));
  store.dispatch(updateDomains(initialData.domains));

  // TODO init configuration and inject in store

  // inform main that everything is ready
  process.send('ready'); // TODO : send with initialState
});

// handle graceful shutdown
process.once('SIGINT', () => {
  // warning! binding SIGINT prevent SIGTERM handler non-execution when stopping process from CLI
  logger.info('get quit signal from cli (SIGINT)');
});
process.once('SIGTERM', () => {
  logger.info('gracefully close server (SIGTERM)');
  exit(0);
});
