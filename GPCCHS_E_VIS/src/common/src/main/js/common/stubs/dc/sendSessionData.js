const stubData = require('../data');

const buffer = [
  null,
  stubData.getSessionDataHeaderProtobuf(),
  null,
  stubData.getSessionsProtobuf(stubData.getSessions()),
];

module.exports = function sendSessionData(queryId, zmq) {
  buffer[2] = stubData.getStringProtobuf(queryId);
  zmq.push('stubData', buffer);
};
