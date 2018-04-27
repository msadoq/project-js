// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move DC stub code in client/lib/stubProcess
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move data stubs in common/protobuf
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Remove data from protobuf in client - Change some
//  stubProcesses and some controllers
// END-HISTORY
// ====================================================================
const stubs = require('../../utils/stubs');
const constants = require('../../constants');

const stubData = stubs.getStubData();

const V1 = queryId => [
  null,
  stubData.getDomainDataHeaderProtobuf(queryId),
  stubData.getStringProtobuf(queryId),
  stubData.getDomainsProtobuf(stubData.getDomains()),
];

const V2 = (queryId, rawBuffer) => [
  null,
  stubData.getDomainDataHeaderProtobufADE(queryId),
  rawBuffer,
  stubData.getDomainsProtobuf(stubData.getDomains()),
];

const versionDCMap = {
  [constants.DC_COM_V1]: V1,
  [constants.DC_COM_V2]: V2,
};

module.exports = function sendDomainData(queryId, rawBuffer, zmq, versionDCCom) {
  zmq.push('stubData', versionDCMap[versionDCCom](queryId, rawBuffer));
};
