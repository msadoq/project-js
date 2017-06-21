// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');


const now = _now();

const successiveAck = {
  scdCop1Ack: 0,
  cop1Ack: 0,
  stationAck: 0,
  missionFailure: 0,
  executionComplete: 0,
  acceptance: 0,
  scdCop1AckRcvDate: now,
  cop1AckRcvDate: now,
  stationAckRcvDate: now,
  missionFailureRcvDate: now,
  executionCompleteRcvDate: now,
  acceptanceRcvDate: now,
  executionStartRcvDate: now,
  executionStart: 0,
};

module.exports = override => (override ? _defaultsDeep({}, override, successiveAck) : successiveAck);
