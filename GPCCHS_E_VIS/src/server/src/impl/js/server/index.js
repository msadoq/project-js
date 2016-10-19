#!/usr/bin/env node

require('dotenv-safe').load();

const debug = require('./lib/io/debug')('startup');
const exit = require('exit');
const app = require('./lib/express');
const http = require('http');
const zmq = require('./lib/io/zmq');
const primus = require('./lib/websocket/primus');
const onOpen = require('./lib/controllers/client/onOpen');
const { onClose } = require('./lib/controllers/client/onClose');
const { onMessage } = require('./lib/controllers/dc/onMessage');
const onVimaTimebarUpdate = require('./lib/controllers/timebar/onVimaTimeBarUpdate');
const onWindowOpen = require('./lib/controllers/client/onWindowOpen');
const { onWindowClose } = require('./lib/controllers/client/onWindowClose');
const { onDomainQuery } = require('./lib/controllers/client/onDomainQuery');
const { onCacheCleanup } = require('./lib/controllers/client/onCacheCleanup');
const onHscVimaTimebarInit = require('./lib/controllers/client/onHscVimaTimebarInit');
const { onTimebasedQuery } = require('./lib/controllers/client/onTimebasedQuery');

const cp = require('child_process');
const errorHandler = require('./lib/utils/errorHandler');

const tbStub = require('./lib/stubs/tb');

const perfTool = require('./lib/utils/performanceTool');

if (process.env.MONITORING === 'on') {
  perfTool.init();
  perfTool.launch();
}

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
  onOpen,
  onClose,
  onWindowOpen,
  onWindowClose,
  onVimaTimebarUpdate,
  onHscVimaTimebarInit,
  onDomainQuery,
  onTimebasedQuery,
  onCacheCleanup,
});

// ZeroMQ
zmq.open({
  dcPull: {
    type: 'pull',
    role: 'server',
    url: process.env.ZMQ_GPCCDC_PULL,
    handler: (trash, header, ...args) => errorHandler('onMessage', () => onMessage(header, ...args)),
  },
  dcPush: {
    type: 'push',
    role: 'client',
    url: process.env.ZMQ_GPCCDC_PUSH,
  },
  vimaTbPull: {
    type: 'pull',
    role: 'server',
    url: process.env.ZMQ_VIMA_TIMEBAR,
    handler: buffer => errorHandler('onVimaTimebarUpdate', () => onVimaTimebarUpdate(buffer)),
  },
  vimaTbPush: {
    type: 'push',
    role: 'client',
    url: process.env.ZMQ_VIMA_TIMEBAR_INIT,
  },
}, (err) => {
  if (err) {
    throw err;
  }

  if (process.env.STUB_DC_ON === 'on') {
    const dc = cp.fork(`${__dirname}/lib/stubs/dc.js`);
    dc.on('message', msg => debug.info('HSS got DC message: ', msg));
    /* dcStub((launchStubError) => {
      if (launchStubError) {
        throw launchStubError;
      }
    }); */
  }
  if (process.env.STUB_TB_ON === 'on') {
    tbStub((launchStubError) => {
      if (launchStubError) {
        throw launchStubError;
      }
    });
  }
  // once ZMQ sockets are open, launch express
  debug.info(`Trying to launch server in '${process.env.NODE_ENV}' env`);
  server.listen(port);
});
