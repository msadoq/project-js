const debug = require('../io/debug')('controllers:onDcPull');
const async = require('async');
const { decode } = require('../protobuf');
const onDcResponse = require('./onDcResponse');
const onDomainResponse = require('./onDomainResponse');
const onNewDataMessage = require('./onNewDataMessage');

// TODO : test

/**
 * Controller that listen for DC incoming NewDataMessage
 * @param buffer
 */
const callDcPullControllers = (
  buffer,
  dcResponseHandler,
  domainResponseHandler,
  newDataMessageHandler
) => {
  debug.verbose('called');

  let message;

  async.series([
    callback => {
      message = decode('dc.dataControllerUtils.DcServerMessage', buffer);
      return callback(null);
    },
    callback => {
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
      return callback(null);
    },
  ], err => (err ? debug.error(err) : debug.verbose('end')));
};

const onDcPull = (header, buffer) =>
  callDcPullControllers(buffer, onDcResponse, onDomainResponse, onNewDataMessage);

module.exports = {
  onDcPull,
  callDcPullControllers,
};
