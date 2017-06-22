const stubs = require('../../utils/stubs');

stubs.loadStubs();
const stubData = stubs.getStubData();
const { encode } = require('../../utils/adapters');

const MASTER_SESSION_ID = 42;

module.exports = function sendMasterSession(queryId, zmq) {
  zmq.push('stubData', [
    null,
    stubData.getSessionMasterDataHeaderProtobuf(),
    stubData.getStringProtobuf(queryId),
    encode('isis.ccsds_mal.UINTEGER', MASTER_SESSION_ID),
  ]);
};
