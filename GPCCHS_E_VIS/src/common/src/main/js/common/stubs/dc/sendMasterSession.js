const stubData = require('../data');
const { encode, getType } = require('../../protobuf');

const MASTER_SESSION_ID = 42;

module.exports = function sendMasterSession(queryId, zmq) {
  zmq.push('stubData', [
    null,
    stubData.getSessionMasterDataHeaderProtobuf(),
    stubData.getStringProtobuf(queryId),
    encode(getType('UINTEGER'), MASTER_SESSION_ID),
  ]);
};
