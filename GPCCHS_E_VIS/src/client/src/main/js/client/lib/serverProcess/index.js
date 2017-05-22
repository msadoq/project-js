const exit = require('exit');
const logger = require('common/log')('main');
const zmq = require('common/zmq');
require('common/protobuf/adapters/dc');
require('common/protobuf/adapters/lpisis');
const clientController = require('./lib/controllers/client');
const dcController = require('./lib/controllers/dc');
const { unsubscribeAll } = require('./lib/utils/subscriptions');
const schedulerController = require('./lib/controllers/scheduler');

// const makeCreateStore =
//  require('../../../../../client/src/main/js/client/lib/store/createStore').default;

process.title = 'gpcchs_hss';

// ZeroMQ
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
};

zmq.open(zmqConfiguration, (err) => {
  if (err) {
    throw err;
  }

  // Start Job Scheduler
  schedulerController.start();

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
  schedulerController.stop();

  logger.info('good bye!');
  exit(0);
});
