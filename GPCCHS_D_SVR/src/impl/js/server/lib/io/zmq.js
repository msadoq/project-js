const debug = require('../io/debug')('zmq');
const _ = require('lodash');
const async = require('async');
const zmq = require('zmq');

const lifeCycleEvents = [
  'connect',
  'connect_delay',
  'connect_retry',
  'listen',
  'bind_error',
  'accept',
  'accept_error',
  'close',
  'close_error',
  'disconnect',
];

const debugLifecycle = (event, url) => {
  debug.debug(event, url);
};

const bindLifecycleEvents =
  socket => _.each(lifeCycleEvents, event => socket.on(event, debugLifecycle));

let sockets = {};

function init(configuration, callback) {
  async.each(Object.keys(configuration), (key, cb) => {
    const item = configuration[key];
    if (typeof sockets[key] !== 'undefined') {
      return cb(new Error(`A ZeroMQ socket is already opened with this key: ${key}`));
    }

    const done = err => {
      if (err) {
        return cb(err);
      }

      // bind lifecycle event handlers
      bindLifecycleEvents(sockets[key]);

      debug.info(`${item.type} socket open on ${item.url} for key ${key}`);
      return cb(null);
    };

    if (item.type === 'push') {
      sockets[key] = zmq.socket('push');
      sockets[key].bind(item.url, done);
      sockets[key].close = () => sockets[key].unbindSync(item.url);
    } else if (item.type === 'req') {
      sockets[key] = zmq.socket('req');
      sockets[key].connect(item.url);
      sockets[key].close = () => sockets[key].disconnect(item.url);
      sockets[key].on('message', (...args) => item.handler(...args));
      return done(null);
    } else if (item.type === 'pull') {
      sockets[key] = zmq.socket('pull');
      sockets[key].connect(item.url);
      sockets[key].close = () => sockets[key].disconnect(item.url);
      sockets[key].on('message', (...args) => item.handler(...args));
      return done(null);
    }

    return cb(new Error('Unknown ZeroMQ socket type: ${item.type}'));
  }, err => {
    if (err) {
      return callback(err);
    }

    return callback(null);
  });
}

function get(key) {
  return sockets[key];
}

function send(key, payload) {
  const socket = sockets[key];
  if (socket) {
    debug.debug('send', payload, 'on', key);
    socket.send(payload);
  }
}

function closeSockets() {
  _.each(sockets, item => item.close());
  sockets = {};
  debug.info('all sockets closed');
}

module.exports = {
  init,
  closeSockets,
  get,
  send,
};
