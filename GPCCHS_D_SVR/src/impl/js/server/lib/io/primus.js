const debug = require('../io/debug')('websocket');
const Primus = require('primus');

let primus;

module.exports = {
  init: (server, handlers = {}) => {
    if (primus) {
      throw new Error('Primus adapter already inited');
    }

    primus = new Primus(server, { transformer: 'uws' });

    primus.on('connection', spark => {
      debug.info('new websocket connection', spark.address);
      Object.keys(handlers).forEach(event => spark.on(event, handlers[event]));
    });
  },
  get: () => primus,
  send: (subscriptionId, event, payload) => {
    // TODO : retrieve the correct spark and write to it
  },
};
