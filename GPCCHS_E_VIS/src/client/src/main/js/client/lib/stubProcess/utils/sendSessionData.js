// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move DC stub code in client/lib/stubProcess
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move data stubs in common/protobuf
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Remove data from protobuf in client - Change some stubProcesses and some controllers
// END-HISTORY
// ====================================================================

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
