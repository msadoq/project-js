const debug = require('../io/debug')('websocket');
const _ = require('lodash');
const Primus = require('primus');
const errorHandler = require('../utils/errorHandler');

let primus;

const TIMESTEP = 100; // 100 ms

function getNewInstance(server) {
  return new Primus(server, { transformer: 'uws' });
}

const primusExports = module.exports = {
  getNewInstance,
  get: () => primus,
  getMainWebsocket: () => {
    if (!primus) {
      throw new Error('primus wasn\'t inited yet');
    }
    let mainWebsocket;
    primus.forEach((spark) => {
      if (spark.hsc.identity === 'main') {
        mainWebsocket = spark;
        // TODO study _.some equivalent to avoid full list looping
      }
    });

    return mainWebsocket;
  },
  init: (server, handlers) => {
    if (primus) {
      throw new Error('Primus adapter already inited');
    }

    primus = primusExports.getNewInstance(server);

    primus.on('connection', (spark) => {
      debug.info('new websocket connection', spark.address);

      _.set(spark, 'hsc.queue', {});

      // eslint-disable-next-line no-param-reassign
      spark.hsc.getIdentity = () => _.get(spark, 'hsc.identity');

      // eslint-disable-next-line no-param-reassign
      spark.sendToWindow = _.throttle(() => {
        debug.debug('sending data to window');
        const start = process.hrtime();
        spark.write({
          event: 'newData',
          payload: _.get(spark, 'hsc.queue'),
        });
        const stop = process.hrtime(start);
        debug.debug('flushing time', stop);
        _.set(spark, 'hsc.queue', []);
      }, TIMESTEP);

      // eslint-disable-next-line no-param-reassign
      spark.addToQueue = (remoteId, payload) => {
        debug.debug('adding to queue');
        const previous = _.get(spark, ['hsc', 'queue', remoteId]);
        if (typeof previous === 'undefined') {
          _.set(spark, ['hsc', 'queue', remoteId], payload);
        } else {
          _.set(spark, ['hsc', 'queue', remoteId], _.concat(previous, payload));
        }
        spark.sendToWindow();
      };

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
            errorHandler('onDomainQuery', () => handlers.onDomainQuery(spark, message.payload));
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
