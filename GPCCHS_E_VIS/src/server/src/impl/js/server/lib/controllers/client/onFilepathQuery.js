const logger = require('common/log')('controllers:onFilepathQuery');
const { encode } = require('common/protobuf');
const zmq = require('common/zmq');
const registeredCallbacks = require('common/callbacks');
const globalConstants = require('common/constants');

/**
 * Triggered when there is a new domain query on HSC
 *
 * - send a DomainQuery message to DC
 *
 * @param spark
 */

const protobufFilepathHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_FILEPATH_QUERY,
});
let idIndex = 0;
const generateFilepathId = () => {
  idIndex += 1;
  return `oId${idIndex}`;
};

const errorCallback = (err) => {
  if (err) {
    throw err;
  }
};

const filepathQuery = (id, payload, messageHandler) => {
  logger.debug('new filepath query');
  // create and register queryId
  const queryId = (typeof id === 'undefined') ? generateFilepathId() : id;
  registeredCallbacks.set(queryId, errorCallback);
  // protobufferize queryId
  const protobufQueryId = encode('dc.dataControllerUtils.String', {
    string: queryId,
  });
  const protobufOid = encode('dc.dataControllerUtils.String', {
    string: payload.oid,
  });

  const queryArgs = [protobufFilepathHeader, protobufQueryId, protobufOid];

  messageHandler('dcPush', queryArgs);
};

module.exports = {
  filepathQuery,
  onFilepathQuery: (queryId, payload) => filepathQuery(queryId, payload, zmq.push),
};
