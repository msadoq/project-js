#!/usr/bin/env node

require('dotenv-safe').load();

const debug = require('./lib/io/debug')('startup');
const exit = require('exit');
const app = require('./lib/express');
const http = require('http');
const zmq = require('./lib/io/zmq');
const primus = require('./lib/io/primus');
const onDcData = require('./lib/controllers/onDcData');
const onTimeBarUpdate = require('./lib/controllers/onTimeBarUpdate');
const onViewUpdate = require('./lib/controllers/onViewUpdate');

const dcStub = require('./lib/stubs/dc');

// !!!! Delete TB file to allow timebar Stub to be ok-------------
// !!!! To be deleted when timebar ok !!!!
const path = require('path');
const fs = require('fs');

debug.debug('Going to delete an existing file');
const tmpPath = path.join(__dirname, 'stub/tmp');
const tbPath = path.join(tmpPath, 'tb.json');
try {
  fs.accessSync(tmpPath, fs.constants.F_OK);
  fs.unlink(tbPath, (err) => {
    if (err) {
      throw err;
    }
    return undefined;
  });
  debug.debug('File deleted successfully!');
} catch (e) {
  debug.debug('No tmp folder');
  fs.mkdirSync(tmpPath);
}

// Read TB file
const tb = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'lib/schemaManager/examples/TB.example.json'), 'utf8')
);
// Create file with current timebar
fs.writeFileSync(tbPath, JSON.stringify(tb), 'utf8');
// !!!-------------------------------------------------

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
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug.info(`Server launched on ${bind}`);
});

// Primus
primus.init(server, {
  viewUpdate: onViewUpdate,
});

// ZeroMQ
zmq.open({
  dcreq: {
    type: 'req',
    url: process.env.ZMQ_GPCCDC_REQ,
    handler: payload => payload, // TODO implement a onDcRequestResponse (with error)
  },
  dcarchive: {
    type: 'pull',
    url: process.env.ZMQ_GPCCDC_ARCHIVE,
    handler: onDcData,
  },
  dcrealtime: {
    type: 'pull',
    url: process.env.ZMQ_GPCCDC_REALTIME,
    handler: onDcData,
  },
  vimatimebar: {
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

  // once ZMQ sockets are open, launch express
  debug.info(`Trying to launch server in '${process.env.NODE_ENV}' env`);
  server.listen(port);
});
