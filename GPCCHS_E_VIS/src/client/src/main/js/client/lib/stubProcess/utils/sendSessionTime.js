const stubData = require('common/stubs/data');

module.exports = function sendSessionTime(queryId, sessionId, zmq) {
  const sessionTime = Date.now() + ((parseInt(sessionId, 10) + 1) * 1000);
  zmq.push('stubData', [
    null,
    stubData.getSessionTimeDataHeaderProtobuf(),
    stubData.getStringProtobuf(queryId),
    stubData.getTimestampProtobuf({
      ms: sessionTime, // now + (id as int) seconds
    }),
  ]);
};
