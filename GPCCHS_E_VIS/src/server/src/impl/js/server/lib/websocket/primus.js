const debug = require('../io/debug')('websocket');
const _ = require('lodash');
const Primus = require('primus');
const errorHandler = require('../utils/errorHandler');

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

      // eslint-disable-next-line no-param-reassign
      _.set(spark, 'hsc.getIdentity', () => _.get(spark, 'hsc.identity'));

      spark.on('data', (message) => {
        debug.debug('data', message);

        if (!message.event) {
          throw new Error('Websocket incoming message without event key');
        }

        switch (message.event) {
          case 'identity': {
            if (message.payload.identity === 'main') {
              _.set(spark, 'hsc.identity', 'main');
              errorHandler('onClienOpen', () => handlers.onOpen(spark));
              spark.on('end', () => errorHandler('onClose', () => handlers.onClose(spark)));
            } else {
              _.set(spark, 'hsc.identity', message.payload.identity);
              errorHandler('onWindowOpen', () => handlers.onWindowOpen(spark, message.payload.identity));
              spark.on('end', () => errorHandler('onWindowClose', () => handlers.onWindowClose(spark, message.payload.identity)));
            }
            break;
          }
          case 'viewOpen': {
            errorHandler('onViewOpen', () => handlers.onViewOpen(spark, message.payload));
            break;
          }
          case 'viewClose': {
            errorHandler('onViewClose', () => handlers.onViewClose(spark, message.payload));
            break;
          }
          case 'connectedDataOpen': {
            errorHandler('onSubscriptionOpen', () => handlers.onSubscriptionOpen(spark, message.payload));
            break;
          }
          case 'connectedDataClose': {
            errorHandler('onSubscriptionClose', () => handlers.onSubscriptionClose(spark, message.payload));
            break;
          }
          case 'vimaTimebarInit': {
            errorHandler('onHscVimaTimebarInit', () => handlers.onHscVimaTimebarInit(spark, message.payload));
            break;
          }
          case 'domainQuery': {
            errorHandler('onDomainQuery', () => handlers.onDomainQuery());
            break;
          }
          case 'dataQuery': {
            errorHandler('onTimebasedQuery', () => handlers.onTimebasedQuery(spark, message.payload));
            break;
          }
          default:
            throw new Error(`Websocket incoming message unknown event key: ${message.event}`);
        }
      });
    });
  },
};
