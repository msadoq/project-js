const logger = require('../../common/logManager')('stubs:utils');
const stubs = require('../../utils/stubs');

const stubData = stubs.getStubData();

const header = stubData.getDcStatusHeaderProtobuf();
const healthy = stubData.getHealthyDcStatusProtobuf();
const congestion = stubData.getCongestionDcStatusProtobuf();
console.log(header);
console.log(healthy);
console.log(congestion);
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
