// Produced by Acceleo JavaScript Generator 1.1.0
const ackEnum = require('./ackEnum');

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
      ? { value: data.scdCop1AckRcvDate }
      : null,
    Cop1AckRcvDate: (data.Cop1AckRcvDate !== null && typeof data.Cop1AckRcvDate !== 'undefined')
      ? { value: data.Cop1AckRcvDate }
      : null,
    stationAckRcvDate: (data.stationAckRcvDate !== null && typeof data.stationAckRcvDate !== 'undefined')
      ? { value: data.stationAckRcvDate }
      : null,
    missionFailureRcvDate: (data.missionFailureRcvDate !== null && typeof data.missionFailureRcvDate !== 'undefined')
      ? { value: data.missionFailureRcvDate }
      : null,
    executionCompleteRcvDate: (data.executionCompleteRcvDate !== null && typeof data.executionCompleteRcvDate !== 'undefined')
      ? { value: data.executionCompleteRcvDate }
      : null,
    acceptanceRcvDate: (data.acceptanceRcvDate !== null && typeof data.acceptanceRcvDate !== 'undefined')
      ? { value: data.acceptanceRcvDate }
      : null,
    executionStartRcvDate: (data.executionStartRcvDate !== null && typeof data.executionStartRcvDate !== 'undefined')
      ? { value: data.executionStartRcvDate }
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
      ? { type: 'time', value: data.scdCop1AckRcvDate.value.toNumber() }
      : undefined,
    Cop1AckRcvDate: (data.Cop1AckRcvDate !== null && typeof data.Cop1AckRcvDate !== 'undefined')
      ? { type: 'time', value: data.Cop1AckRcvDate.value.toNumber() }
      : undefined,
    stationAckRcvDate: (data.stationAckRcvDate !== null && typeof data.stationAckRcvDate !== 'undefined')
      ? { type: 'time', value: data.stationAckRcvDate.value.toNumber() }
      : undefined,
    missionFailureRcvDate: (data.missionFailureRcvDate !== null && typeof data.missionFailureRcvDate !== 'undefined')
      ? { type: 'time', value: data.missionFailureRcvDate.value.toNumber() }
      : undefined,
    executionCompleteRcvDate: (data.executionCompleteRcvDate !== null && typeof data.executionCompleteRcvDate !== 'undefined')
      ? { type: 'time', value: data.executionCompleteRcvDate.value.toNumber() }
      : undefined,
    acceptanceRcvDate: (data.acceptanceRcvDate !== null && typeof data.acceptanceRcvDate !== 'undefined')
      ? { type: 'time', value: data.acceptanceRcvDate.value.toNumber() }
      : undefined,
    executionStartRcvDate: (data.executionStartRcvDate !== null && typeof data.executionStartRcvDate !== 'undefined')
      ? { type: 'time', value: data.executionStartRcvDate.value.toNumber() }
      : undefined,
    executionStart: (data.executionStart !== null && typeof data.executionStart !== 'undefined')
      ? { type: 'enum', value: data.executionStart, symbol: ackEnum[data.executionStart] }
      : undefined,
  }),
};

