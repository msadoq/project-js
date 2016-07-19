const zmq = require('zmq');

const subscriptionPushSocket = zmq.socket('push');
const cachePullSocket = zmq.socket('pull');
const timeLinePullSocket = zmq.socket('pull');
const bindPushSockets = (callback) => subscriptionPushSocket.bind('tcp://127.0.0.1:4000', (err) => {
  if (err) throw err;
  console.log('Subscription Push Socket Bound');
  cachePullSocket.connect('tcp://127.0.0.1:3000');
  console.log('Cache Socket Ready to pull');
  timeLinePullSocket.connect('tcp://127.0.0.1:4242');
  console.log('TimeLine Socket Ready to pull');
  setTimeout(callback, 0);
});

module.exports = { bindPushSockets, subscriptionPushSocket, cachePullSocket, timeLinePullSocket };
