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
