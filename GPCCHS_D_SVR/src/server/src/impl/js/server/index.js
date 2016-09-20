#!/usr/bin/env node

require('dotenv-safe').load();

const debug = require('./lib/io/debug')('startup');
const exit = require('exit');
const app = require('./lib/express');
const http = require('http');
const zmq = require('./lib/io/zmq');
const primus = require('./lib/io/primus');
const onClientOpen = require('./lib/controllers/onClientOpen');
const onClientClose = require('./lib/controllers/onClientClose');
const { onDcServerMessage } = require('./lib/controllers/onDcServerMessage');
const onTimeBarUpdate = require('./lib/controllers/onTimeBarUpdate');
const onWindowOpen = require('./lib/controllers/onWindowOpen');
const onWindowClose = require('./lib/controllers/onWindowClose');
const onViewOpen = require('./lib/controllers/onViewOpen');
const onViewClose = require('./lib/controllers/onViewClose');
const onViewUpdate = require('./lib/controllers/onViewUpdate');
const { onConnectedDataOpen } = require('./lib/controllers/onConnectedDataOpen');
const { onConnectedDataClose } = require('./lib/controllers/onConnectedDataClose');
const { onClientDomainQuery } = require('./lib/controllers/onClientDomainQuery');
const onTimebarUpdate = require('./lib/controllers/onHscTimebarUpdate');

const dcStub = require('./lib/stubs/dc');
const tbStub = require('./lib/stubs/tb');

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
});
server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? ` pipe ${addr}` : `${addr.port}`;
  debug.info(`Server listening on http://127.0.0.1:${bind}`);
});

// Primus
primus.init(server, {
  onClientOpen,
  onClientClose,
  onWindowOpen,
  onWindowClose,
  onViewOpen,
  onViewClose,
  onViewUpdate,
  onConnectedDataOpen,
  onConnectedDataClose,
  onTimebarUpdate,
  onClientDomainQuery,
});

// ZeroMQ
zmq.open({
  dcPull: {
    type: 'pull',
    url: process.env.ZMQ_GPCCDC_PULL,
    handler: onDcServerMessage,
  },
  dcPush: {
    type: 'push',
    url: process.env.ZMQ_GPCCDC_PUSH,
  },
  tb: {
    type: 'pull',
    url: process.env.ZMQ_VIMA_TIMEBAR,
    handler: onTimeBarUpdate,
  },
}, err => {
  if (err) {
    throw err;
  }

  if (process.env.STUB_DC_ON === 'on') {
    dcStub(launchStubError => {
      if (launchStubError) {
        throw launchStubError;
      }
    });
  }
  if (process.env.STUB_TB_ON === 'on') {
    tbStub(launchStubError => {
      if (launchStubError) {
        throw launchStubError;
      }
    });
  }
  // once ZMQ sockets are open, launch express
  debug.info(`Trying to launch server in '${process.env.NODE_ENV}' env`);
  server.listen(port);
});
