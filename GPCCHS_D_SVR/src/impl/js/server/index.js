#!/usr/bin/env node

require('dotenv-safe').load();

const exit = require('exit');
const async = require('async');
const debug = require('./lib/io/debug')('launcher');
const app = require('./lib/express');
const http = require('http');
const { openSockets, closeSockets } = require('./lib/io/zmq');
const { openWebsockets } = require('./lib/io/socket.io');
const cacheMgr = require('./lib/dataCache');
const { onMessage } = require('./lib/dataCache/lib/cacheManager');

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
const port = normalizePort(process.env.PORT);
app.set('port', port);

// HTTP server
const server = http.createServer(app);
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ?
    `Pipe ${port}` :
    `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      debug.error(`${bind} requires elevated privileges`);
      exit(1);
      break;
    case 'EADDRINUSE':
      debug.error(`${bind} is already in use`);
      exit(1);
      break;
    default:
      throw error;
  }
}
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug.info(`Server launched on port ${bind}`);
}
server.on('error', onError);
server.on('listening', onListening);

/**
 * Open ZeroMQ sockets:
 * - GPCCDC(push): subscription from HS to DC
 * - GPCCDC(pull): data from DC to HS
 * - Timebar(pull): data from Timebar to HS
 */
const zeroMQSockets = {
  gpccdcpush: {
    type: 'push',
    url: process.env.ZMQ_GPCCDCPUSH,
  },
  gpccdcpull: {
    type: 'pull',
    url: process.env.ZMQ_GPCCDCPULL,
    handler: onMessage,
  },
  timeline: {
    type: 'pull',
    url: process.env.ZMQ_TIMELINE,
    handler: payload => console.log('received timeline', payload), // TODO
  },
};

// open communication bus with external and run HTTP server
debug.info(`Trying to launch server in '${process.env.NODE_ENV}' env`);
async.waterfall([
  callback => openWebsockets(server, callback),
  callback => openSockets(zeroMQSockets, callback),
  callback => {
    cacheMgr.init();
    // TODO : remove, cacheMgr could be statically launched (handle buffer on websocket manager)
    // const { jsonDataColl } = require('./lib/io/loki');
    // const { injectParameters } = require('./stub/paramInjector');
    //injectParameters(jsonDataColl, process.env.PARAM_NB || 0, process.env.TIMESTAMP_START); TODO: wtf?
    callback();
  },
  callback => {
    server.listen(port);
    callback();
  },
], err => {
  if (err) {
    debug.error(err);
    closeSockets();
    exit(1);
  }
});
