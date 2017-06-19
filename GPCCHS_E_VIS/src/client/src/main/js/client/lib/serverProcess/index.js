const path = require('path');
const exit = require('exit');
const { series } = require('async');
const zmq = require('common/zmq');
const registerDc = require('common/protobuf/adapters/dc');
const registerLpisis = require('common/protobuf/adapters/lpisis');
const getLogger = require('../common/logManager');

const rootPath = process.env.IS_BUNDLED ? __dirname : path.resolve(__dirname, '../..');

// Temporary fix for packaging ////////////////////////////////////////////////////////////////////
registerDc(path.join(rootPath, 'node_modules/common/protobuf/proto/dc'));
registerLpisis(path.join(rootPath, 'node_modules/common/protobuf/proto/lpisis'));
// Temporary fix for packaging ////////////////////////////////////////////////////////////////////

const clientController = require('./controllers/client');
const dcController = require('./controllers/dc');
const { unsubscribeAll } = require('./utils/subscriptions');

const makeCreateStore = require('./store').default;

const logger = getLogger('main');
const zmqLogger = getLogger('zmq');

process.title = 'gpcchs_hss';

series([
  // ZeroMQ sockets
  function connectToDc(callback) {
    const zmqConfiguration = {
      dcPull: {
        type: 'pull',
        role: 'server',
        url: process.env.ZMQ_GPCCDC_PULL,
        handler: dcController,
      },
      dcPush: {
        type: 'push',
        role: 'client',
        url: process.env.ZMQ_GPCCDC_PUSH,
      },
      options: {
        logger: zmqLogger,
      },
    };

    zmq.open(zmqConfiguration, callback);
  },
], (err) => {
  if (err) {
    throw err;
  }

  // ipc with main
  process.on('message', clientController);

  // store
  makeCreateStore('server', process.env.DEBUG === 'on')();

  // inform main that everything is ready
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
