const debug = require('../io/debug')('controllers:onDcServerMessage');
const { decode } = require('../protobuf');
const onDcResponse = require('./onDcResponse');
const { onDomainResponse } = require('./onDomainResponse');
const onNewDataMessage = require('./onNewDataMessage');

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
  newDataMessageHandler
) => {
  debug.debug('decoding Dc Server Message');
  const message = decode('dc.dataControllerUtils.DcServerMessage', buffer);

  switch (message.messageType) {
    case 'DC_RESPONSE':
      dcResponseHandler(message.payload);
      break;
    case 'DOMAIN_RESPONSE':
      domainResponseHandler(message.payload);
      break;
    case 'NEW_DATA_MESSAGE':
      newDataMessageHandler(message.payload);
      break;
    case 'UNKNOWN':
    default:
      throw new Error('messageType not recognized');
  }
};

const onDcServerMessage = (header, buffer) =>
  callDcServerMessageControllers(buffer, onDcResponse, onDomainResponse, onNewDataMessage);

module.exports = {
  onDcServerMessage,
  callDcServerMessageControllers,
};
