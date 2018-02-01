// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move DC stub code in client/lib/stubProcess
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move data stubs in common/protobuf
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Remove data from protobuf in client - Change some stubProcesses and some controllers
// END-HISTORY
// ====================================================================

const stubs = require('../../utils/stubs');

const stubData = stubs.getStubData();

const buffer = [
  null,
  stubData.getDomainDataHeaderProtobuf(),
  null,
  stubData.getDomainsProtobuf(stubData.getDomains()),
];

module.exports = function sendDomainData(queryId, zmq) {
  buffer[2] = stubData.getStringProtobuf(queryId);
  zmq.push('stubData', buffer);
};
