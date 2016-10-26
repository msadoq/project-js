const debug = require('../io/debug')('utils:queries');
const registeredCallbacks = require('../utils/registeredCallbacks');
const registeredQueries = require('../utils/registeredQueries');
const { encode } = require('../protobuf');
const constants = require('../constants');
const execution = require('./execution')('query');

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
  messageType: constants.MESSAGETYPE_TIMEBASED_QUERY,
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
const createQueryMessage = (remoteId, dataId, interval, queryArguments) => {
  execution.start('creating query handling');
  const queryId = generateQueryId();
  registeredCallbacks.set(queryId, errorCallback);
  registeredQueries.set(queryId, remoteId);
  execution.stop('creating query handling');

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
