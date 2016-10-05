const debug = require('../../io/debug')('controllers:onMessage');
const { decode } = require('../../protobuf');
const onResponse = require('./onResponse');
const { onDomainData } = require('./onDomainData');
const onTimebasedArchiveData = require('./onTimebasedArchiveData');
const onTimebasedPubSubData = require('./onTimebasedPubSubData');
const errorHandler = require('../../utils/errorHandler');

// TODO :

/**
  * Trigger on a new incoming Server Message from DC
  *
  * - de-protobuf
  * - call the corresponding callback
 * @param buffer
 */
const callDcServerMessageControllers = (
  buffer,
  dcResponseHandler,
  domainResponseHandler,
  queryDataHandler,
  subscriptionDataHandler
) => {
  debug.debug('decoding Dc Server Message');
  const message = decode('dc.dataControllerUtils.DcServerMessage', buffer);

  switch (message.messageType) {
    case 'DC_RESPONSE':
      errorHandler('onResponse', () => dcResponseHandler(message.payload));
      break;
    case 'DOMAIN_RESPONSE':
      errorHandler('onDomainData', () => domainResponseHandler(message.payload));
      break;
    case 'NEW_DATA_MESSAGE':
      {
        const newDataMessage = decode('dc.dataControllerUtils.NewDataMessage', message.payload);

        switch (newDataMessage.dataSource) {
          case 'ARCHIVE':
            errorHandler('onTimebasedArchiveData', () => queryDataHandler(
              newDataMessage.dataId,
              newDataMessage.id,
              newDataMessage.payloads,
              newDataMessage.isEndOfQuery)
            );
            break;
          case 'REAL_TIME':
            errorHandler('onTimebasedPubSubData', () => subscriptionDataHandler(
              newDataMessage.dataId,
              newDataMessage.payloads)
            );
            break;
          case 'UNKNOWN':
          default:
            throw new Error('Unknown data source');
        }
        break;
      }
    case 'UNKNOWN':
    default:
      throw new Error('messageType not recognized');
  }
};

const onMessage = (header, buffer) =>
  callDcServerMessageControllers(
    buffer,
    onResponse,
    onDomainData,
    onTimebasedArchiveData,
    onTimebasedPubSubData
  );

module.exports = {
  onMessage,
  callDcServerMessageControllers,
};
