const stubData = require('../data');

module.exports = function sendSessionData(queryId, zmq) {
  const buffer = [
    null,
    stubData.getSessionDataHeaderProtobuf(),
    stubData.getStringProtobuf(queryId),
    stubData.getSessionsProtobuf(stubData.getSessions()),
  ];
  zmq.push('stubData', buffer);
};
