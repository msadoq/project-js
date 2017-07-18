const stubs = require('../../utils/stubs');

const stubData = stubs.getStubData();

module.exports = function sendSessionData(queryId, zmq) {
  const buffer = [
    null,
    stubData.getSessionDataHeaderProtobuf(),
    stubData.getStringProtobuf(queryId),
    stubData.getSessionsProtobuf(stubData.getSessions()),
  ];
  zmq.push('stubData', buffer);
};
