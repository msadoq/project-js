const debug = require('../io/debug')('websocket');
const Primus = require('primus');

let primus;

function getNewInstance(server) {
  return new Primus(server, { transformer: 'uws' });
}

const primusExports = module.exports = {
  getNewInstance,
  get: () => primus,
  init: (server, handlers) => {
    if (primus) {
      throw new Error('Primus adapter already inited');
    }

    primus = primusExports.getNewInstance(server);

    primus.on('connection', (spark) => {
      debug.info('new websocket connection', spark.address);

      spark.on('data', (message) => {
        debug.debug('data', message);

        if (!message.event) {
          throw new Error('Websocket incoming message without event key');
        }

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
          case 'timebarUpdate': {
            handlers.onTimebarUpdate(spark, message.payload);
            break;
          }
          default:
            throw new Error(`Websocket incoming message unknown event key: ${message.event}`);
        }
      });
    });
  },
};
