// Generated file
const expectedAck = require('./expectedAck');
const sendTypeEnum = require('./sendTypeEnum');
const successiveAck = require('./successiveAck');

module.exports = {
  encode: data => ({
    sendingDate: (data.sendingDate !== null && typeof data.sendingDate !== 'undefined')
      ? { value: data.sendingDate }
      : null,
    tcInProgress: (data.tcInProgress !== null && typeof data.tcInProgress !== 'undefined')
      ? { value: data.tcInProgress }
      : null,
    tcId: (data.tcId !== null && typeof data.tcId !== 'undefined')
      ? { value: data.tcId }
      : null,
    tcSourceId: (data.tcSourceId !== null && typeof data.tcSourceId !== 'undefined')
      ? { value: data.tcSourceId }
      : null,
    historyName: (data.historyName !== null && typeof data.historyName !== 'undefined')
      ? { value: data.historyName }
      : null,
    sendType: (data.sendType !== null && typeof data.sendType !== 'undefined')
      ? data.sendType
      : null,
    tcNums: (data.tcNums !== null && typeof data.tcNums !== 'undefined')
      ? { value: data.tcNums }
      : null,
    expectedAck: (data.expectedAck !== null && typeof data.expectedAck !== 'undefined')
      ? expectedAck.encode(data.expectedAck)
      : null,
    successiveAck: (data.successiveAck !== null && typeof data.successiveAck !== 'undefined')
      ? successiveAck.encode(data.successiveAck)
      : null,
  }),
  decode: data => ({
    sendingDate: (data.sendingDate !== null && typeof data.sendingDate !== 'undefined')
      ? { type: 'time', value: data.sendingDate.value.toNumber() }
      : undefined,
    tcInProgress: (data.tcInProgress !== null && typeof data.tcInProgress !== 'undefined')
      ? { type: 'boolean', value: data.tcInProgress.value }
      : undefined,
    tcId: (data.tcId !== null && typeof data.tcId !== 'undefined')
      ? { type: 'integer', value: data.tcId.value }
      : undefined,
    tcSourceId: (data.tcSourceId !== null && typeof data.tcSourceId !== 'undefined')
      ? { type: 'uinteger', value: data.tcSourceId.value }
      : undefined,
    historyName: (data.historyName !== null && typeof data.historyName !== 'undefined')
      ? { type: 'string', value: data.historyName.value }
      : undefined,
    sendType: (data.sendType !== null && typeof data.sendType !== 'undefined')
      ? { type: 'enum', value: data.sendType, symbol: sendTypeEnum[data.sendType] }
      : undefined,
    tcNums: (data.tcNums !== null && typeof data.tcNums !== 'undefined')
      ? { type: 'uinteger', value: data.tcNums.value }
      : undefined,
    expectedAck: (data.expectedAck !== null && typeof data.expectedAck !== 'undefined')
      ? expectedAck.decode(data.expectedAck)
      : undefined,
    successiveAck: (data.successiveAck !== null && typeof data.successiveAck !== 'undefined')
      ? successiveAck.decode(data.successiveAck)
      : undefined,
    referenceTimestamp: (data.sendingDate !== null && typeof data.sendingDate !== 'undefined')
        ? { type: 'time', value: data.sendingDate.value.toNumber() }
        : undefined,
  }),
};

