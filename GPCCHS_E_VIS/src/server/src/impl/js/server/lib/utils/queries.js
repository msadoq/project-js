const { encode } = require('common/protobuf');
const globalConstants = require('common/constants');
const registeredCallbacks = require('common/callbacks');

const registeredQueries = require('./registeredQueries');

let idIndex = 0;
function generateQueryId() {
  idIndex += 1;
  return `query${idIndex}`;
}

function errorCallback(respErr) {
  if (respErr) {
    throw new Error(respErr);
  }
}

/**
 * Protobuf optimization
 */
const protobufQueryHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_TIMEBASED_QUERY,
});

const dataIdProtobufs = {}; // TODO envisage cache cleaning by adding timestamp on creation
function getDataIdProtobuf(remoteId, dataId) {
  if (typeof dataIdProtobufs[remoteId] === 'undefined') {
    dataIdProtobufs[remoteId] = encode('dc.dataControllerUtils.DataId', dataId);
  }
  return dataIdProtobufs[remoteId];
}

/**
 * Message creation
 */
const createQueryMessage = (remoteId, dataId, interval, queryArguments, execution) => {
  execution.start('set query handling');
  const queryId = generateQueryId();
  registeredCallbacks.set(queryId, errorCallback);
  registeredQueries.set(queryId, remoteId);
  execution.stop('set query handling');

  execution.start('encode dc query');
  const args = [
    protobufQueryHeader,
    encode('dc.dataControllerUtils.String', { string: queryId }),
    getDataIdProtobuf(remoteId, dataId),
    encode('dc.dataControllerUtils.TimeInterval', {
      startTime: { ms: interval[0] },
      endTime: { ms: interval[1] },
    }),
    encode('dc.dataControllerUtils.QueryArguments', queryArguments),
  ];
  execution.stop('encode dc query');
  return { args, queryId };
};

module.exports = {
  createQueryMessage,
};
