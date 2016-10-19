const debug = require('../io/debug')('zmq');
const {
  each: _each,
  isFunction: _isFunction,
} = require('lodash');
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
  socket => _each(lifeCycleEvents, event => socket.on(event, debugLifecycle));

let sockets = {};

const connect = (socket, url, callback, handler) => {
  socket.connect(url);
  if (handler) {
    socket.on('message', (...args) => handler(...args));
  }
  return callback(null);
};

const bind = (socket, url, callback, handler) => socket.bind(
  url,
  (err) => {
    if (err) {
      return callback(err);
    }
    if (handler) {
      socket.on('message', (...args) => handler(...args));
    }
    return callback(null);
  }
);

function open(configuration, callback) {
  async.each(Object.keys(configuration), (key, cb) => {
    const item = configuration[key];
    if (typeof sockets[key] !== 'undefined') {
      return cb(new Error(`A ZeroMQ socket is already opened with this key: ${key}`));
    }

    // .handler required for certain types
    if (['req', 'res', 'pull'].indexOf(item.type) !== -1 && !_isFunction(item.handler)) {
      return cb(new Error(`Handler function required for ZeroMQ socket type: ${item.type}`));
    }

    // .role required
    if (['client', 'server'].indexOf(item.role) === -1) {
      return cb(new Error('Role must be client or server and is required'));
    }

    const done = (err) => {
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
      if (item.role === 'server') {
        return bind(sockets[key], item.url, done, item.handler);
      }
      return connect(sockets[key], item.url, done, item.handler);
    }

    // rep
    if (item.type === 'rep') {
      sockets[key] = zmq.socket('rep');
      if (item.role === 'server') {
        return bind(sockets[key], item.url, done, item.handler);
      }
      return connect(sockets[key], item.url, done, item.handler);
    }

    // push
    if (item.type === 'push') {
      sockets[key] = zmq.socket('push');
      if (item.role === 'server') {
        return bind(sockets[key], item.url, done);
      }
      return connect(sockets[key], item.url, done);
    }

    // pull
    if (item.type === 'pull') {
      sockets[key] = zmq.socket('pull');
      if (item.role === 'server') {
        return bind(sockets[key], item.url, done, item.handler);
      }
      return connect(sockets[key], item.url, done, item.handler);
    }

    return cb(new Error(`Unknown ZeroMQ socket type: ${item.type}`));
  }, (err) => {
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
  return socket.send(payload, 0, () => {
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
  _each(sockets, item => item.close());
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
