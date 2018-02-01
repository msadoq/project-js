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

const header = stubData.getDcStatusHeaderProtobuf();
const healthy = stubData.getHealthyDcStatusProtobuf();
const congestion = stubData.getCongestionDcStatusProtobuf();
const current = {
  isCongestionned: false,
  from: Date.now(),
};

const DC_STUB_CONGESTION_FREQUENCY = 12e4; // 2mn

module.exports = function sendDcStatus(zmq) {
  const now = Date.now();
  const { from, isCongestionned } = current;

  // it's time to switch
  if ((now - from) > DC_STUB_CONGESTION_FREQUENCY) {
    current.isCongestionned = !isCongestionned;
    current.from = now;
    const buffer = [
      null,
      header,
      isCongestionned ? congestion : healthy,
    ];
    zmq.push('stubData', buffer);
    logger.debug(isCongestionned ? 'congestion' : 'healthy');
  }
};
