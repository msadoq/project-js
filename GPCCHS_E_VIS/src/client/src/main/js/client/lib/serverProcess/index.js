import adapter from '../utils/adapters';
import parameters from '../common/configurationManager';

const exit = require('exit');
const zmq = require('common/zmq');
const getLogger = require('../common/logManager');

adapter.registerGlobal();
const clientController = require('./controllers/client');
const dcController = require('./controllers/dc');
const { unsubscribeAll } = require('./utils/subscriptions');

const makeCreateStore = require('./store').default;

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
