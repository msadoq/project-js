const debug = require('../io/debug')('controllers:onDcPull');
const { decode } = require('../protobuf');
const onDcResponse = require('./onDcResponse');
const onDomainResponse = require('./onDomainResponse');
const onNewDataMessage = require('./onNewDataMessage');

// TODO : rename to onDcServerMessage

/**
 * Trigger on new incoming message DcResponse message from DC.
 *
 * - de-protobuf
 * - call the corresponding callback
 *
 * @param buffer
 */
const callDcPullControllers = (
  buffer,
  dcResponseHandler,
  domainResponseHandler,
  newDataMessageHandler
) => {
  debug.verbose('called');

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

const onDcPull = (header, buffer) =>
  callDcPullControllers(buffer, onDcResponse, onDomainResponse, onNewDataMessage);

module.exports = {
  onDcPull,
  callDcPullControllers,
};
