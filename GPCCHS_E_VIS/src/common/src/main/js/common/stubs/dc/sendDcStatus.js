const logger = require('../../log')('stubs:dc');

const globalConstants = require('../../constants');
const stubData = require('../data');

const header = stubData.getDcStatusHeaderProtobuf();
const healthy = stubData.getHealthyDcStatusProtobuf();
const congestion = stubData.getCongestionDcStatusProtobuf();

let i = 0;

const itIsTimeToCongest =
  globalConstants.DC_STUB_CONGESTION_FREQUENCY / globalConstants.DC_STUB_FREQUENCY;

const durationToCongest =
  itIsTimeToCongest / 5;

module.exports = function sendDcStatus(zmq) {
  const buffer = [
    null,
    header,
    (i % itIsTimeToCongest < durationToCongest) ? congestion : healthy,
  ];
  i += 1;
  zmq.push('stubData', buffer);
  if (i % itIsTimeToCongest === 0) {
    logger.debug('congestion');
  }
};
