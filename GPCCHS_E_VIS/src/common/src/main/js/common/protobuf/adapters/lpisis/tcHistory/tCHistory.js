const expectedAck = require('./expectedAck');
const successiveAck = require('./successiveAck');

const sendTypeEnum = require('./sendTypeEnum');

module.exports = {
  encode: data => ({
    sendingDate: { value: data.sendingDate },
    tcInProgress: { value: data.tcInProgress },
    tcId: { value: data.tcId },
    historyName: { value: data.historyName },
    sendType: data.sendType,
    tcNums: { value: data.tcNums },
    expectedAck: expectedAck.encode(data.expectedAck),
    successiveAck: successiveAck.encode(data.successiveAck),
    tc: { value: data.tc },
  }),
  decode: data => ({
    sendingDate: { type: 'time', value: data.sendingDate.value.toNumber() },
    tcInProgress: { type: 'boolean', value: data.tcInProgress.value },
    tcId: { type: 'ulong', value: data.tcId.value.toNumber() },
    historyName: { type: 'string', value: data.historyName.value },
    sendType: { type: 'enum', value: data.sendType, symbol: sendTypeEnum[data.sendType] },
    tcNums: { type: 'string', value: data.tcNums.value },
    expectedAck: expectedAck.decode(data.expectedAck),
    successiveAck: successiveAck.decode(data.successiveAck),
    tc: { type: 'blob', value: data.tc.value.toBuffer() },
  }),
};
