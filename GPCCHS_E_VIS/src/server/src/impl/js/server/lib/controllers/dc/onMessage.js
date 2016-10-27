const debug = require('../../io/debug')('controllers:onMessage');
const { decode } = require('../../protobuf');
const { onResponse } = require('./onResponse');
const { onDomainData } = require('./onDomainData');
const { onTimebasedArchiveData } = require('./onTimebasedArchiveData');
const { onTimebasedPubSubData } = require('./onTimebasedPubSubData');
const errorHandler = require('../../utils/errorHandler');
const constants = require('../../constants');
const { slice: _slice } = require('lodash');

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
  headerBuffer,
  ...args
) => {
  debug.debug('decoding message type');
  const header = decode('dc.dataControllerUtils.Header', headerBuffer);

  switch (header.messageType) {
    case constants.MESSAGETYPE_RESPONSE:
      errorHandler('onResponse', () => responseHandler(args[0], args[1], args[2]));
      break;
    case constants.MESSAGETYPE_DOMAIN_DATA:
      errorHandler('onDomainData', () => domainDataHandler(args[0], args[1]));
      break;
    case constants.MESSAGETYPE_TIMEBASED_ARCHIVE_DATA:
      errorHandler('onTimebasedArchiveData', () => timebasedArchiveDataHandler(args[0], args[1], args[2], ..._slice(args, 3)));
      break;
    case constants.MESSAGETYPE_TIMEBASED_PUBSUB_DATA:
      errorHandler('onTimebasedPubSubData', () => timebasedPubSubDataHandler(args[0], args[1], ..._slice(args, 2)));
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
    ...args
  );

module.exports = {
  onMessage,
  message,
};
