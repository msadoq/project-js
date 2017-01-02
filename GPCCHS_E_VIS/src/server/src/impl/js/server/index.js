#!/usr/bin/env node

const exit = require('exit');
const logger = require('common/log')('main');
const zmq = require('common/zmq');
const monitoring = require('common/monitoring');
const { bind: bindMainIpc } = require('common/ipc');
// const app = require('./lib/express'); // TODO deprecate
// const primus = require('./lib/websocket/primus'); // TODO deprecate
// const http = require('http'); // TODO deprecate
const errorHandler = require('./lib/utils/errorHandler');
const { onMessage } = require('./lib/controllers/dc/onMessage');
const { onDomainQuery } = require('./lib/controllers/client/onDomainQuery');
const onPull = require('./lib/controllers/client/onPull');
const { onCacheCleanup } = require('./lib/controllers/client/onCacheCleanup');
const { onTimebasedQuery } = require('./lib/controllers/client/onTimebasedQuery');
const { onSessionQuery } = require('./lib/controllers/client/onSessionQuery');
const { onFilepathQuery } = require('./lib/controllers/client/onFilepathQuery');
const { unsubscribeAll } = require('./lib/utils/subscriptions');

process.title = 'gpcchs_hss';

monitoring.start();

// ZeroMQ
const zmqConfiguration = {
  dcPull: {
    type: 'pull',
    role: 'server',
    url: process.env.ZMQ_GPCCDC_PULL,
    handler: (trash, header, ...args) => errorHandler('onMessage', () => onMessage(header, ...args), false),
  },
  dcPush: {
    type: 'push',
    role: 'client',
    url: process.env.ZMQ_GPCCDC_PUSH,
  },
};

// start
zmq.open(zmqConfiguration, (err) => {
  if (err) {
    throw err;
  }

  // bind IPC channel with main process
  bindMainIpc({
    getDomains: onDomainQuery, // TODO rename + constant
    getSessions: onSessionQuery, // TODO rename + constant
    cleanupCache: onCacheCleanup, // TODO rename + constant
    getData: onPull, // TODO rename + constant
    timebasedQuery: onTimebasedQuery, // TODO rename + constant
    filepathQuery: onFilepathQuery, // TODO rename + constant
  });

  // once ZMQ sockets are open, launch express
  // logger.info('Trying to launch server');
  // server.listen(port);
});

// handle gracefull shutdown
process.once('SIGINT', () => { // binding SIGINT prevent SIGTERM event avoiding
  logger.info('get quit signal from commande line (SIGINT)');
});
process.once('SIGTERM', () => {
  logger.info('gracefully close server (SIGTERM)');

  unsubscribeAll(zmq.push);

  logger.info('good bye!');
  exit(0);
});
