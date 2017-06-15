import adapter from '../utils/adapters';

const path = require('path');
const exit = require('exit');
const logger = require('common/log')('main');
const zmq = require('common/zmq');

const rootPath = process.env.IS_BUNDLED ? __dirname : path.resolve(__dirname, '../..');

// registerDc(path.join(rootPath, 'node_modules/common/protobuf/proto/dc')); // Temporary fix for packaging
// registerLpisis(path.join(rootPath, 'node_modules/common/protobuf/proto/lpisis')); // Temporary fix for packaging
console.log("SALAMAMAMA");
adapter.registerGlobal();
const clientController = require('./controllers/client');
const dcController = require('./controllers/dc');
const { unsubscribeAll } = require('./utils/subscriptions');

// const makeCreateStore =
//  require('../../../../../client/src/main/js/client/lib/store/createStore').default;
console.log("SALAMAMAMA");
process.title = 'gpcchs_hss';

console.log("Server register !!!!!!!");
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
