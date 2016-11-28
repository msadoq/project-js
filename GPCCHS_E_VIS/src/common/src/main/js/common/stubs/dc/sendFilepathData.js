const stubData = require('../data');

const buffer = [
  null,
  stubData.getFilepathDataHeaderProtobuf(),
  null,
  null,
];

module.exports = function sendFilepathData(queryId, oid, zmq) {
  buffer[2] = stubData.getStringProtobuf(queryId);
  buffer[3] = stubData.getStringProtobuf(oid);
  zmq.push('stubData', buffer);
};
