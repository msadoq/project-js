// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move DC stub code in client/lib/stubProcess
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move data stubs in common/protobuf
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Multiple changes on the load mechansim of adapters : - To test with Jest, add a mock of config(MESSAGES_NAMESPACE) in jest/index.js - Test fix - Lint pass ( 1 test is still KO)
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Remove data from protobuf in client - Change some stubProcesses and some controllers
// VERSION : 1.1.2 : FA : #6798 : 23/06/2017 : Small fix : fix unit test in decode proto UINTEGER
// END-HISTORY
// ====================================================================

const stubs = require('../../utils/stubs');

stubs.loadStubs();
const stubData = stubs.getStubData();
const { encode, getType } = require('../../utils/adapters');

const MASTER_SESSION_ID = 42;

module.exports = function sendMasterSession(queryId, zmq) {
  zmq.push('stubData', [
    null,
    stubData.getSessionMasterDataHeaderProtobuf(),
    stubData.getStringProtobuf(queryId),
    encode(getType('UINTEGER'), MASTER_SESSION_ID),
  ]);
};
