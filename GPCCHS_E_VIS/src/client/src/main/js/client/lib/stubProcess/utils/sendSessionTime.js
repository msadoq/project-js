// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move DC stub code in client/lib/stubProcess
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move data stubs in common/protobuf
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Remove data from protobuf in client - Change some stubProcesses and some controllers
// END-HISTORY
// ====================================================================

const stubs = require('../../utils/stubs');

const stubData = stubs.getStubData();

const constants = require('../../constants');

const V1 = (queryId, sessionTime) => [
  null,
  stubData.getSessionTimeDataHeaderProtobuf(),
  stubData.getStringProtobuf(queryId),
  stubData.getTimestampProtobuf({
    ms: sessionTime, // now + (id as int) seconds
  }),
];

const V2 = (queryId, sessionTime, rawBuffer) => [
  null,
  stubData.getSessionTimeDataHeaderProtobufADE(queryId),
  rawBuffer,
  stubData.getTimestampProtobuf({
    ms: sessionTime, // now + (id as int) seconds
  }),
];

const versionDCMap = {
  [constants.DC_COM_V1]: V1,
  [constants.DC_COM_V2]: V2,
};

module.exports = function sendSessionTime(queryId, rawBuffer, sessionId, zmq, versionDCCom) {
  const sessionTime = Date.now() + ((parseInt(sessionId, 10) + 1) * 1000);
  zmq.push('stubData', versionDCMap[versionDCCom](queryId, sessionTime, rawBuffer));
};
