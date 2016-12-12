#!/usr/bin/env node

/* eslint import/no-extraneous-dependencies:0 */

const logger = require('common/log')('main');
const zmq = require('common/zmq');
const monitoring = require('common/monitoring');
const exit = require('exit');
const app = require('./lib/express'); // TODO deprecate
const primus = require('./lib/websocket/primus'); // TODO deprecate
const onOpen = require('./lib/controllers/client/onOpen'); // TODO deprecate
const http = require('http'); // TODO deprecate
const errorHandler = require('./lib/utils/errorHandler');
const { onClose } = require('./lib/controllers/client/onClose');
const { onMessage } = require('./lib/controllers/dc/onMessage');
const { onDomainQuery } = require('./lib/controllers/client/onDomainQuery');
const onPull = require('./lib/controllers/client/onPull');
const { onCacheCleanup } = require('./lib/controllers/client/onCacheCleanup');
const { onTimebasedQuery } = require('./lib/controllers/client/onTimebasedQuery');
const { onSessionQuery } = require('./lib/controllers/client/onSessionQuery');
const { onFilepathQuery } = require('./lib/controllers/client/onFilepathQuery');

process.title = 'gpcchs_hss';

monitoring.start();

// port
function normalizePort(val) {
  const p = parseInt(val, 10);

  if (isNaN(p)) {
    // named pipe
    return val;
  }

  if (p >= 0) {
    // port number
    return p;
  }

  return false;
}

const port = normalizePort(process.env.SERVER_PORT);
app.set('port', port);

// HTTP server
const server = http.createServer(app);
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ?
    `Pipe ${port}` :
    `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
      exit(1);
      break;
    default:
      throw error;
  }
});
server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? ` pipe ${addr}` : `${addr.port}`;
  logger.info(`Server listening on http://127.0.0.1:${bind}`);
});

// Primus
primus.init(server, {
  onOpen,
  onClose,
  onDomainQuery,
  onPull,
  onTimebasedQuery,
  onCacheCleanup,
  onSessionQuery,
  onFilepathQuery,
});

// ZeroMQ
zmq.open({
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
}, (err) => {
  if (err) {
    throw err;
  }

  // once ZMQ sockets are open, launch express
  logger.info('Trying to launch server');
  server.listen(port, () => {
    // if HSS is a forked process, in e2e tests for example
    if (process.send) {
      // Send 'ready' to parent process
      process.send('ready');
    }
  });
});
