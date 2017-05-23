const { encode } = require('common/protobuf');
const globalConstants = require('common/constants');

const registeredCallbacks = require('../../../utils/callbacks');
const { addRecord: registerQuery } = require('../models/registeredQueries');
const { main } = require('../ipc');

let idIndex = 0;
function generateQueryId() {
  idIndex += 1;
  return `query${idIndex}`;
}

const resetQueryId = () => {
  idIndex = 0;
};

function errorCallback(err) {
  if (err) {
    // forward error to main
    main.message(globalConstants.IPC_METHOD_ERROR, { err });
  }
}

/**
 * Protobuf optimization
 */
const protobufQueryHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_TIMEBASED_QUERY,
});

// TODO envisage memory cleaning by adding timestamp on each protobuf on creation
const dataIdProtobufs = {};
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
  registerQuery(queryId, remoteId);
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
  resetQueryId,
  createQueryMessage,
};
