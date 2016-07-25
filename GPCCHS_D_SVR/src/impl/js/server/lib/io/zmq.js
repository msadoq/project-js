const debug = require('../io/debug')('io:zmq');
const zmq = require('zmq');

let dcPullSockets = [1, 2, 3, 4, 5];
dcPullSockets = dcPullSockets.map(() => zmq.socket('pull'));

const subPushPort = 4000;
const cachePullPort = 3000;
const tlPullPort = 4242;
const dcPullPort = 49159;
const URI = 'tcp://127.0.0.1';

const subscriptionPushSocket = zmq.socket(`push`);
const cachePullSocket = zmq.socket(`pull`);
const timeLinePullSocket = zmq.socket(`pull`);
const bindPushSockets = (callback) => subscriptionPushSocket.bind(`${URI}:${subPushPort}`, (err) => {
  if (err) throw err;
  debug.info(`Subscription Push Socket Bound on ${URI}:${subPushPort}`);
  cachePullSocket.connect(`${URI}:${cachePullPort}`);
  debug.info(`Cache Socket Ready to pull on ${URI}:${cachePullPort}`);
  timeLinePullSocket.connect(`${URI}:${tlPullPort}`);
  debug.info(`TimeLine Socket Ready to pull on ${URI}:${tlPullPort}`);
  dcPullSockets = dcPullSockets.map((s, i) => {
    const dcPort = dcPullPort + i;
    const dcURI = `${URI}:${dcPort}`;
    debug.info(`DC Pull Sockets Ready to pull on ${dcURI}`);
    return s.connect(dcURI);
  });

  setTimeout(callback, 0);
});

module.exports = { bindPushSockets, subscriptionPushSocket, cachePullSocket, timeLinePullSocket, dcPullSockets };
