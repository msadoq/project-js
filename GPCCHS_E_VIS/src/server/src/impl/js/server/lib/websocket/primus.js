// eslint-disable-next-line import/no-extraneous-dependencies
const globalConstants = require('common/constants');

const debug = require('../io/debug')('websocket');
const {
  get: _get,
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

      if (_get(spark, ['query', 'identity']) !== 'main') {
        debug.warn('unknown websocket client tried to connect to HSS');
        return spark.end();
      }

      handlers.onOpen(spark);

      spark.on('end', () => errorHandler('onClose', () => handlers.onClose(spark)));

      return spark.on('data', (message) => {
        debug.debug('data', message);

        if (!message.event) {
          throw new Error('Websocket incoming message without event key');
        }

        switch (message.event) {
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
