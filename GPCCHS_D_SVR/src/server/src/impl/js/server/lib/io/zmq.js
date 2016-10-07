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

function open(configuration, callback) {
  async.each(Object.keys(configuration), (key, cb) => {
    const item = configuration[key];
    if (typeof sockets[key] !== 'undefined') {
      return cb(new Error(`A ZeroMQ socket is already opened with this key: ${key}`));
    }

    // .handler required for certain types
    if (['req', 'res', 'pull'].indexOf(item.type) !== -1 && !_.isFunction(item.handler)) {
      return cb(new Error(`Handler function required for ZeroMQ socket type: ${item.type}`));
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

    // req
    if (item.type === 'req') {
      sockets[key] = zmq.socket('req');
      return sockets[key].bind(item.url, err => {
        if (err) {
          return done(err);
        }

        sockets[key].on('message', (...args) => item.handler(...args));
        return done(null);
      });
    }

    // rep
    if (item.type === 'rep') {
      sockets[key] = zmq.socket('rep');
      sockets[key].connect(item.url);
      sockets[key].on('message', (...args) => item.handler(...args));
      return done(null);
    }

    // push
    if (item.type === 'push') {
      sockets[key] = zmq.socket('push');
      return sockets[key].bind(item.url, done);
    }

    // pull
    if (item.type === 'pull') {
      sockets[key] = zmq.socket('pull');
      sockets[key].connect(item.url);
      sockets[key].on('message', (...args) => item.handler(...args));
      return done(null);
    }

    return cb(new Error(`Unknown ZeroMQ socket type: ${item.type}`));
  }, err => {
    if (err) {
      return callback(err);
    }

    return callback(null);
  });
}

function get(key, type) {
  const socket = sockets[key];
  if (!socket) {
    throw new Error(`Unable to find socket with key ${key}`);
  }

  if (type !== socket.type) {
    throw new Error(`Trying to use a ${socket.type} as ${type} for ${key}`);
  }

  return socket;
}

function push(key, payload, callback = () => {}) {
  const socket = get(key, 'push');
  debug.debug(`sending to ${key}`);
  return socket.send(payload, 1, () => {
    debug.debug(`sent to ${key}`);
    return callback(null);
  });
}

function request(key, payload, callback = () => {}) {
  const socket = get(key, 'req');
  debug.debug(`requesting ${key}`);
  return socket.send(payload, 0, () => {
    debug.debug(`requested ${key}`, key);
    return callback(null);
  });
}

function respond(key, payload, callback = () => {}) {
  const socket = get(key, 'rep');
  debug.debug(`responding ${key}`);
  return socket.send(payload, 0, () => {
    debug.debug(`responded ${key}`, key);
    return callback(null);
  });
}

function closeSockets() {
  _.each(sockets, item => item.close());
  sockets = {};
  debug.info('all sockets closed');
}

module.exports = {
  open,
  get,
  closeSockets,
  push,
  request,
  respond,
};
