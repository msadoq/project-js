const debug = require('../io/debug')('zmq');
const zmq = require('zmq');
const async = require('async');
const _ = require('lodash');

let sockets = {};

function openSockets(configuration, callback) {
  async.eachOf(configuration, (item, key, cb) => {
    if (typeof sockets[key] !== 'undefined') {
      return cb(new Error(`A ZeroMQ socket is already opened with this key: ${key}`));
    }

    if (item.type === 'push') {
      sockets[key] = zmq.socket('push');
      sockets[key].bindSync(item.url);
    } else if (item.type === 'pull') {
      sockets[key] = zmq.socket('pull');
      sockets[key].connect(item.url);
      sockets[key].on('message', (...args) => item.handler(...args));
    }

    sockets[key].close = () => sockets[key].disconnect(item.url);

    debug.info(`${item.type} socket open on ${item.url} for key ${key}`);
    return cb(null);
  }, callback);
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
  openSockets,
  closeSockets,
  get,
  send,
};
