// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ackEnum = require('./ackEnum');
const tIME = require('../ccsds_mal/tIME');

module.exports = {
  encode: data => ({
    scdCop1Ack: (data.scdCop1Ack !== null && typeof data.scdCop1Ack !== 'undefined')
      ? data.scdCop1Ack
      : null,
    cop1Ack: (data.cop1Ack !== null && typeof data.cop1Ack !== 'undefined')
      ? data.cop1Ack
      : null,
    stationAck: (data.stationAck !== null && typeof data.stationAck !== 'undefined')
      ? data.stationAck
      : null,
    missionFailure: (data.missionFailure !== null && typeof data.missionFailure !== 'undefined')
      ? data.missionFailure
      : null,
    executionComplete: (data.executionComplete !== null && typeof data.executionComplete !== 'undefined')
      ? data.executionComplete
      : null,
    acceptance: (data.acceptance !== null && typeof data.acceptance !== 'undefined')
      ? data.acceptance
      : null,
    scdCop1AckRcvDate: (data.scdCop1AckRcvDate !== null && typeof data.scdCop1AckRcvDate !== 'undefined')
      ? tIME.encode(data.scdCop1AckRcvDate)
      : null,
    cop1AckRcvDate: (data.cop1AckRcvDate !== null && typeof data.cop1AckRcvDate !== 'undefined')
      ? tIME.encode(data.cop1AckRcvDate)
      : null,
    stationAckRcvDate: (data.stationAckRcvDate !== null && typeof data.stationAckRcvDate !== 'undefined')
      ? tIME.encode(data.stationAckRcvDate)
      : null,
    missionFailureRcvDate: (data.missionFailureRcvDate !== null && typeof data.missionFailureRcvDate !== 'undefined')
      ? tIME.encode(data.missionFailureRcvDate)
      : null,
    executionCompleteRcvDate: (data.executionCompleteRcvDate !== null && typeof data.executionCompleteRcvDate !== 'undefined')
      ? tIME.encode(data.executionCompleteRcvDate)
      : null,
    acceptanceRcvDate: (data.acceptanceRcvDate !== null && typeof data.acceptanceRcvDate !== 'undefined')
      ? tIME.encode(data.acceptanceRcvDate)
      : null,
    executionStartRcvDate: (data.executionStartRcvDate !== null && typeof data.executionStartRcvDate !== 'undefined')
      ? tIME.encode(data.executionStartRcvDate)
      : null,
    executionStart: (data.executionStart !== null && typeof data.executionStart !== 'undefined')
      ? data.executionStart
      : null,
  }),
  decode: data => ({
    scdCop1Ack: (data.scdCop1Ack !== null && typeof data.scdCop1Ack !== 'undefined')
      ? { type: 'enum', value: data.scdCop1Ack, symbol: ackEnum[data.scdCop1Ack] }
      : undefined,
    cop1Ack: (data.cop1Ack !== null && typeof data.cop1Ack !== 'undefined')
      ? { type: 'enum', value: data.cop1Ack, symbol: ackEnum[data.cop1Ack] }
      : undefined,
    stationAck: (data.stationAck !== null && typeof data.stationAck !== 'undefined')
      ? { type: 'enum', value: data.stationAck, symbol: ackEnum[data.stationAck] }
      : undefined,
    missionFailure: (data.missionFailure !== null && typeof data.missionFailure !== 'undefined')
      ? { type: 'enum', value: data.missionFailure, symbol: ackEnum[data.missionFailure] }
      : undefined,
    executionComplete: (data.executionComplete !== null && typeof data.executionComplete !== 'undefined')
      ? { type: 'enum', value: data.executionComplete, symbol: ackEnum[data.executionComplete] }
      : undefined,
    acceptance: (data.acceptance !== null && typeof data.acceptance !== 'undefined')
      ? { type: 'enum', value: data.acceptance, symbol: ackEnum[data.acceptance] }
      : undefined,
    scdCop1AckRcvDate: (data.scdCop1AckRcvDate !== null && typeof data.scdCop1AckRcvDate !== 'undefined')
      ? tIME.decode(data.scdCop1AckRcvDate)
      : undefined,
    cop1AckRcvDate: (data.cop1AckRcvDate !== null && typeof data.cop1AckRcvDate !== 'undefined')
      ? tIME.decode(data.cop1AckRcvDate)
      : undefined,
    stationAckRcvDate: (data.stationAckRcvDate !== null && typeof data.stationAckRcvDate !== 'undefined')
      ? tIME.decode(data.stationAckRcvDate)
      : undefined,
    missionFailureRcvDate: (data.missionFailureRcvDate !== null && typeof data.missionFailureRcvDate !== 'undefined')
      ? tIME.decode(data.missionFailureRcvDate)
      : undefined,
    executionCompleteRcvDate: (data.executionCompleteRcvDate !== null && typeof data.executionCompleteRcvDate !== 'undefined')
      ? tIME.decode(data.executionCompleteRcvDate)
      : undefined,
    acceptanceRcvDate: (data.acceptanceRcvDate !== null && typeof data.acceptanceRcvDate !== 'undefined')
      ? tIME.decode(data.acceptanceRcvDate)
      : undefined,
    executionStartRcvDate: (data.executionStartRcvDate !== null && typeof data.executionStartRcvDate !== 'undefined')
      ? tIME.decode(data.executionStartRcvDate)
      : undefined,
    executionStart: (data.executionStart !== null && typeof data.executionStart !== 'undefined')
      ? { type: 'enum', value: data.executionStart, symbol: ackEnum[data.executionStart] }
      : undefined,
  }),
};
