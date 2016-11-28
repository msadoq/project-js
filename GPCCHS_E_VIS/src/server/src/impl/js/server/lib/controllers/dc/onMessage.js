const debug = require('../../io/debug')('controllers:onMessage');

// eslint-disable-next-line no-underscore-dangle
const _slice = require('lodash/slice');

// eslint-disable-next-line import/no-extraneous-dependencies
const globalConstants = require('common/constants');
// eslint-disable-next-line import/no-extraneous-dependencies
const { decode } = require('common/protobuf');

const errorHandler = require('../../utils/errorHandler');

const { onResponse } = require('./onResponse');
const { onDomainData } = require('./onDomainData');
const { onTimebasedArchiveData } = require('./onTimebasedArchiveData');
const { onTimebasedPubSubData } = require('./onTimebasedPubSubData');
const { onSessionData } = require('./onSessionData');
const { onFilepathData } = require('./onFilepathData');


/**
  * Trigger on a new incoming Server Message from DC
  *
  * - de-protobuf
  * - call the corresponding callback
 * @param buffer
 */
const message = (
  responseHandler,
  domainDataHandler,
  timebasedArchiveDataHandler,
  timebasedPubSubDataHandler,
  sessionDataHandler,
  filepathDataHandler,
  headerBuffer,
  ...args
) => {
  debug.debug('decoding message type');
  const header = decode('dc.dataControllerUtils.Header', headerBuffer);

  switch (header.messageType) {
    case globalConstants.MESSAGETYPE_RESPONSE:
      errorHandler('onResponse', () => responseHandler(args[0], args[1], args[2]));
      break;
    case globalConstants.MESSAGETYPE_DOMAIN_DATA:
      errorHandler('onDomainData', () => domainDataHandler(args[0], args[1]));
      break;
    case globalConstants.MESSAGETYPE_TIMEBASED_ARCHIVE_DATA:
      errorHandler('onTimebasedArchiveData', () => timebasedArchiveDataHandler(args[0], args[1], args[2], ..._slice(args, 3)));
      break;
    case globalConstants.MESSAGETYPE_TIMEBASED_PUBSUB_DATA:
      errorHandler('onTimebasedPubSubData', () => timebasedPubSubDataHandler(args[0], args[1], ..._slice(args, 2)));
      break;
    case globalConstants.MESSAGETYPE_SESSION_DATA:
      errorHandler('onSessionData', () => sessionDataHandler(args[0], args[1]));
      break;
    case globalConstants.MESSAGETYPE_FILEPATH_DATA:
      errorHandler('onFilepathData', () => filepathDataHandler(args[0], args[1]));
      break;
    default:
      debug.debug('message type not recognized');
      break;
  }
};

const onMessage = (...args) =>
  message(
    onResponse,
    onDomainData,
    onTimebasedArchiveData,
    onTimebasedPubSubData,
    onSessionData,
    onFilepathData,
    ...args
  );

module.exports = {
  onMessage,
  message,
};
