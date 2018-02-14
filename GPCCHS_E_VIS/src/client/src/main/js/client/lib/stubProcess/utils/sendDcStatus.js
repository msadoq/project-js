// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move DC stub code in client/lib/stubProcess
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move data stubs in common/protobuf
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Multiple changes on the load mechansim of adapters : - To test with Jest, add a mock of config(MESSAGES_NAMESPACE) in jest/index.js - Test fix - Lint pass ( 1 test is still KO)
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Remove data from protobuf in client - Change some stubProcesses and some controllers
// END-HISTORY
// ====================================================================

const logger = require('../../common/logManager')('stubs:utils');
const stubs = require('../../utils/stubs');

const stubData = stubs.getStubData();
const constants = require('../../constants');

const healthy = stubData.getHealthyDcStatusProtobuf();
const congestion = stubData.getCongestionDcStatusProtobuf();

const V1 = (queryId, congestionStatus) => [
  null,
  stubData.getDcStatusHeaderProtobuf(),
  congestionStatus,
];;

const V2 = (queryId, congestionStatus, rawBuffer) =>[
  null,
  stubData.getDcStatusHeaderProtobufADE(queryId),
  rawBuffer,
  congestionStatus,
];;

const versionDCMap = {
  [constants.DC_COM_V1]: V1,
  [constants.DC_COM_V2]: V2,
}

const current = {
  isCongestionned: false,
  from: Date.now(),
};

const DC_STUB_CONGESTION_FREQUENCY = 12e4; // 2mn

module.exports = function sendDcStatus(queryId, rawBuffer, zmq, versionDCCom) {
  const now = Date.now();
  const { from, isCongestionned } = current;

  // it's time to switch
  if ((now - from) > DC_STUB_CONGESTION_FREQUENCY) {
    current.isCongestionned = !isCongestionned;
    current.from = now;
    // const buffer = [
    //   null,
    //   header,
    //   isCongestionned ? congestion : healthy,
    // ];
    const congestionStatus = isCongestionned ? congestion : healthy;
    const buffer = versionDCMap[versionDCCom](queryId, congestionStatus, rawBuffer);
    zmq.push('stubData', buffer);
    logger.debug(isCongestionned ? 'congestion' : 'healthy');
  }
};
