const Primus = require('primus');
// eslint-disable-next-line no-underscore-dangle
const _get = require('lodash/get');

// eslint-disable-next-line import/no-extraneous-dependencies
const globalConstants = require('common/constants');
// eslint-disable-next-line import/no-extraneous-dependencies
const logger = require('common/log')('websocket');

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
      logger.info('new websocket connection', spark.address);

      if (_get(spark, ['query', 'identity']) !== 'main') {
        logger.warn('unknown websocket client tried to connect to HSS');
        return spark.end();
      }

      handlers.onOpen(spark);

      spark.on('end', () => errorHandler('onClose', () => handlers.onClose(spark)));

      return spark.on('data', (message) => {
        logger.debug('data', message);

        if (!message.event) {
          throw new Error('Websocket incoming message without event key');
        }

        switch (message.event) {
          case globalConstants.EVENT_DOMAIN_QUERY: {
            errorHandler('onDomainQuery', () => handlers.onDomainQuery(message.queryId));
            break;
          }
          case globalConstants.EVENT_PULL: {
            errorHandler('onPull', () => handlers.onPull(spark, message.payload));
            break;
          }
          case globalConstants.EVENT_TIMEBASED_QUERY: {
            errorHandler('onTimebasedQuery', () => handlers.onTimebasedQuery(message.payload));
            break;
          }
          case globalConstants.EVENT_TIMEBASED_QUERY_INVALIDATION: {
            errorHandler('onCacheCleanup', () => handlers.onCacheCleanup(message.payload));
            break;
          }
          case globalConstants.EVENT_SESSION_QUERY: {
            errorHandler('onSessionQuery', () => handlers.onSessionQuery(message.queryId));
            break;
          }
          case globalConstants.EVENT_FILEPATH_QUERY: {
            errorHandler('onFilepathQuery', () => handlers.onFilepathQuery(message.queryId,
                                                                           message.payload));
            break;
          }
          default:
            throw new Error(`Websocket incoming message unknown event key: ${message.event}`);
        }
      });
    });
  },
};
