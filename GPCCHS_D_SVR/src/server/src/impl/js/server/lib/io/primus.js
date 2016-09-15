const debug = require('../io/debug')('websocket');
const Primus = require('primus');

let primus;

function getInstance(server) {
  return new Primus(server, { transformer: 'uws' });
}

const primusExports = module.exports = {
  getInstance,
  init: (server, handlers) => {
    if (primus) {
      throw new Error('Primus adapter already inited');
    }

    primus = primusExports.getInstance(server);

    primus.on('connection', spark => {
      debug.info('new websocket connection', spark.address);

      spark.on('data', message => {
        debug.debug('data', message);

        if (!message.event) {
          throw new Error('Websocket incoming message without event key');
        }

        // TODO : inject windowId as parameter in each handler

        switch (message.event) {
          case 'identity': {
            if (message.payload.identity === 'main') {
              handlers.onClientOpen(spark);
              spark.on('end', () => handlers.onClientClose(spark));
            } else {
              handlers.onWindowOpen(spark, message.payload.identity);
              spark.on('end', () => handlers.onWindowClose(spark, message.payload.identity));
            }
            break;
          }
          case 'viewOpen': {
            handlers.onViewOpen(spark, message.payload);
            break;
          }
          case 'viewClose': {
            handlers.onViewClose(spark, message.payload);
            break;
          }
          case 'viewUpdate': {
            handlers.onViewUpdate(spark, message.payload);
            break;
          }
          case 'connectedDataOpen': {
            handlers.onConnectedDataOpen(spark, message.payload);
            break;
          }
          case 'connectedDataClose': {
            handlers.onConnectedDataClose(spark, message.payload);
            break;
          }
          default:
            throw new Error(`Websocket incoming message unknown event key: ${message.event}`);
        }
      });
    });
  },
  get: () => primus,
  // sendParameterData: (subscription, event, payload) => {
  //   const applyFilters = require('../utils/filters');
  //   if (!applyFilters(payload, subscription.filter)) {
  //     return;
  //   }
  //
  //   // debug.verbose(`point: ${point}`);
  //   // if (dataBuffer[subscription.subId]) {
  //   //   dataBuffer[subscription.subId] = { points: [] };
  //   // }
  //   //
  //   // dataBuffer[subscription.subId].points.push(point);
  //   // const dataBuffer = {};
  //   // const flushBuffer = () => {
  //   //   _.forEach(dataBuffer,
  //   //     (v, k) => {
  //   //       const points = v.points.splice(0);
  //   //       if (points.length > 0) {
  //   //         debug.debug(`Sending subscription ${k} to views`);
  //   //         send(k, 'plot', points);
  //   //       }
  //   //     });
  //   //   setTimeout(flushBuffer, 40);
  //   // };
  //   // const init = () => {
  //   //   setTimeout(flushBuffer, 40);
  //   // };
  //
  //   primus.write(event, payload);
  // },
};
