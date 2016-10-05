const debug = require('../io/debug')('controllers:onDcServerMessage');
const { decode } = require('../protobuf');
const onDcResponse = require('./onDcResponse');
const { onDomainResponse } = require('./onDomainResponse');
const onQueryData = require('./onQueryData');
const onSubscriptionData = require('./onSubscriptionData');
const errorHandler = require('../utils/errorHandler');

// TODO :

/**
  * Trigger on new incoming message DcResponse message from DC.
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
    case 2: // 'DC_RESPONSE'
      errorHandler('onDcResponse', () => dcResponseHandler(message.payload));
      break;
    case 3: // 'DOMAIN_RESPONSE'
      errorHandler('onDomainResponse', () => domainResponseHandler(message.payload));
      break;
    case 1: // 'NEW_DATA_MESSAGE'
      {
        const newDataMessage = decode('dc.dataControllerUtils.NewDataMessage', message.payload);

        switch (newDataMessage.dataSource) {
          case 2: // 'ARCHIVE'
            errorHandler('onQueryData', () => queryDataHandler(
              newDataMessage.dataId,
              newDataMessage.id,
              newDataMessage.payloads,
              newDataMessage.isEndOfQuery)
            );
            break;
          case 1: // 'REAL_TIME'
            errorHandler('onSubscriptionData', () => subscriptionDataHandler(
              newDataMessage.dataId,
              newDataMessage.payloads)
            );
            break;
          case 0: // 'UNKNOWN':
          default:
            throw new Error('Unknown data source');
        }
        break;
      }
    case 0: // 'UNKNOWN'
    default:
      throw new Error('messageType not recognized');
  }
};

const onDcServerMessage = (header, buffer) =>
  callDcServerMessageControllers(
    buffer,
    onDcResponse,
    onDomainResponse,
    onQueryData,
    onSubscriptionData
  );

module.exports = {
  onDcServerMessage,
  callDcServerMessageControllers,
};
