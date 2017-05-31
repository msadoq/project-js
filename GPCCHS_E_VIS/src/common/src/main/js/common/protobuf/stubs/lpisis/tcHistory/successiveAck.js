// Produced by Acceleo JavaScript Generator 1.1.0
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');


const now = _now();

module.exports = override => applyOverride({
  scdCop1Ack: 0,
  cop1Ack: 0,
  stationAck: 0,
  missionFailure: 0,
  executionComplete: 0,
  acceptance: 0,
  scdCop1AckRcvDate: now,
  Cop1AckRcvDate: now,
  stationAckRcvDate: now,
  missionFailureRcvDate: now,
  executionCompleteRcvDate: now,
  acceptanceRcvDate: now,
  executionStartRcvDate: now,
  executionStart: 0,
}, override);

