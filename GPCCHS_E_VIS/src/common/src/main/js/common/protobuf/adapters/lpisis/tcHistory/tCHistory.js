const expectedAck = require('./expectedAck');
const successiveAck = require('./successiveAck');

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
    sendingDate: data.sendingDate.value.toNumber(),
    tcInProgress: data.tcInProgress.value,
    tcId: data.tcId.value.toNumber(),
    historyName: data.historyName.value,
    sendType: data.sendType,
    tcNums: data.tcNums.value,
    expectedAck: expectedAck.decode(data.expectedAck),
    successiveAck: successiveAck.decode(data.successiveAck),
    tc: data.tc.value.toBuffer(),
  }),
};
