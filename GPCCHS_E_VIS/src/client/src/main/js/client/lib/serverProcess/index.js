import adapter from '../utils/adapters';
import parameters from '../common/configurationManager';

const path = require('path');
const exit = require('exit');
const zmq = require('common/zmq');
const getLogger = require('../common/logManager');

const rootPath = parameters.get('IS_BUNDLED') ? __dirname : path.resolve(__dirname, '../..');

// registerDc(path.join(rootPath, 'node_modules/common/protobuf/proto/dc')); // Temporary fix for packaging
// registerLpisis(path.join(rootPath, 'node_modules/common/protobuf/proto/lpisis')); // Temporary fix for packaging
adapter.registerGlobal();
const clientController = require('./controllers/client');
const dcController = require('./controllers/dc');
const { unsubscribeAll } = require('./utils/subscriptions');

// const makeCreateStore =
//  require('../../../../../client/src/main/js/client/lib/store/createStore').default;

const logger = getLogger('main');
const zmqLogger = getLogger('zmq');
process.title = 'gpcchs_hss';

// ZeroMQ
const zmqConfiguration = {
  dcPull: {
    type: 'pull',
    role: 'server',
    url: parameters.get('ZMQ_GPCCDC_PULL'),
    handler: dcController,
  },
  dcPush: {
    type: 'push',
    role: 'client',
    url: parameters.get('ZMQ_GPCCDC_PUSH'),
  },
  options: {
    logger: zmqLogger,
  },
};

zmq.open(zmqConfiguration, (err) => {
  if (err) {
    throw err;
  }

  // ipc with main
  process.on('message', clientController);

  // const store = makeCreateStore('server', process.env.DEBUG === 'on')();
  // store.subscribe(() => console.log('SERVER STORE SUBSCRIPTION'));

  process.send('ready');
});

// handle graceful shutdown
process.once('SIGINT', () => {
  // warning! binding SIGINT prevent SIGTERM handler non-execution when stopping process from CLI
  logger.info('get quit signal from cli (SIGINT)');
});
process.once('SIGTERM', () => {
  logger.info('gracefully close server (SIGTERM)');

  unsubscribeAll(args => zmq.push('dcPush', args));

  logger.info('good bye!');
  exit(0);
});
