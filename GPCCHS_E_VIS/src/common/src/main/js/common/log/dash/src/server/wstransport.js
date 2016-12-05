const util = require('util');
const winston = require('winston');
// eslint-disable-next-line
const app = require('express')();
// eslint-disable-next-line new-cap
const server = require('http').Server(app);
// eslint-disable-next-line
const io = require('socket.io')(server);

const port = process.env.port || 8888;

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

server.listen(port, () => {
  console.log(`server started on port ${port}`);
});

const WSTransport = winston.transports.WSTransport = function WSTransport(options) {
  this.name = 'WSTransport';
  this.level = options.level || 'silly';
};

util.inherits(WSTransport, winston.Transport);

WSTransport.prototype.log = function log(level, msg, meta, callback) {
  if (meta.memUsage) {
    io.emit('memUsage', Object.assign(meta.memUsage, {
      pname: meta.pname,
      pid: meta.pid,
    }));
  }
  if (meta.latency) {
    io.emit('latency', Object.assign(meta.latency, {
      pname: meta.pname,
      pid: meta.pid,
    }));
  }
  if (meta.profiling) {
    io.emit('profiling', {
      timers: meta.profiling.timers,
      time: meta.profiling.time,
      pname: meta.pname,
      pid: meta.pid,
    });
  }
  io.emit('log', {
    level,
    msg,
    meta,
  });
  callback(null, true);
};
