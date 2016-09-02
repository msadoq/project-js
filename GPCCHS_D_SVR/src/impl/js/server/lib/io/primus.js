const debug = require('../io/debug')('websocket');
const Primus = require('primus');
const applyFilters = require('../utils/filters');

let primus;

module.exports = {
  init: (server, openHandler, closeHandler, handlers = {}) => {
    if (primus) {
      throw new Error('Primus adapter already inited');
    }

    primus = new Primus(server, { transformer: 'uws' });

    primus.on('connection', spark => {
      debug.info('new websocket connection', spark.address);

      openHandler(spark);
      spark.on('end', () => closeHandler(spark));

      Object.keys(handlers).forEach(event => spark.on(event, handlers[event]));
    });
  },
  get: () => primus,
  sendParameterData: (subscription, event, payload) => {
    // TODO : retrieve the correct sparks (basedOn subscription.subId) and write to it
    // primus.forEach(function (spark, next) {
    //   //
    //   next();
    // }, function (err) {
    //   console.log('We are done');
    // });

    if (!applyFilters(payload, subscription.filter)) {
      return;
    }

    // TODO : bufferisation
    // debug.verbose(`point: ${point}`);
    // if (dataBuffer[subscription.subId]) {
    //   dataBuffer[subscription.subId] = { points: [] };
    // }
    //
    // dataBuffer[subscription.subId].points.push(point);
    // const dataBuffer = {};
    // const flushBuffer = () => {
    //   _.forEach(dataBuffer,
    //     (v, k) => {
    //       const points = v.points.splice(0);
    //       if (points.length > 0) {
    //         debug.debug(`Sending subscription ${k} to views`);
    //         send(k, 'plot', points);
    //       }
    //     });
    //   setTimeout(flushBuffer, 40);
    // };
    // const init = () => {
    //   setTimeout(flushBuffer, 40);
    // };

    primus.write(event, payload);
  },
};
