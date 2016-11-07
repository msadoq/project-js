// eslint-disable-next-line import/no-extraneous-dependencies
const { constants: globalConstants } = require('common');
const debug = require('../io/debug')('websocket');
const {
  get: _get,
  set: _set,
} = require('lodash');
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
      _set(spark, 'hsc.getIdentity', () => _get(spark, 'hsc.identity'));

      spark.on('data', (message) => {
        debug.debug('data', message);

        if (!message.event) {
          throw new Error('Websocket incoming message without event key');
        }

        switch (message.event) {
          case globalConstants.EVENT_IDENTITY: {
            if (message.payload.identity === 'main') {
              _set(spark, 'hsc.identity', 'main');
              errorHandler('onClienOpen', () => handlers.onOpen(spark));
              spark.on('end', () => errorHandler('onClose', () => handlers.onClose(spark)));
            } else {
              _set(spark, 'hsc.identity', message.payload.identity);
              errorHandler('onWindowOpen', () => handlers.onWindowOpen(spark, message.payload.identity));
              spark.on('end', () => errorHandler('onWindowClose', () => handlers.onWindowClose(spark, message.payload.identity)));
            }
            break;
          }
          case globalConstants.EVENT_VIMA_TIMEBAR_INIT: {
            errorHandler('onHscVimaTimebarInit', () => handlers.onHscVimaTimebarInit(spark, message.payload));
            break;
          }
          case globalConstants.EVENT_DOMAIN_QUERY: {
            errorHandler('onDomainQuery', () => handlers.onDomainQuery());
            break;
          }
          case globalConstants.EVENT_PULL: {
            errorHandler('onPull', () => handlers.onPull(spark, message.payload));
            break;
          }
          case globalConstants.EVENT_TIMEBASED_QUERY: {
            errorHandler('onTimebasedQuery', () => handlers.onTimebasedQuery(spark, message.payload));
            break;
          }
          case globalConstants.EVENT_TIMEBASED_QUERY_INVALIDATION: {
            errorHandler('onCacheCleanup', () => handlers.onCacheCleanup(message.payload));
            break;
          }
          default:
            throw new Error(`Websocket incoming message unknown event key: ${message.event}`);
        }
      });
    });
  },
};
