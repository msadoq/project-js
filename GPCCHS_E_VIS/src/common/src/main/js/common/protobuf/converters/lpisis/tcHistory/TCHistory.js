const ExpectedAck = require('./ExpectedAck');
const SuccessiveAck = require('./SuccessiveAck');

module.exports = {
  encode: data => ({
    sendingDate: { value: data.sendingDate },
    tcInProgress: { value: data.tcInProgress },
    tcId: { value: data.tcId },
    historyName: { value: data.historyName },
    sendType: data.sendType,
    tcNums: { value: data.tcNums },
    expectedAck: ExpectedAck.encode(data.expectedAck),
    successiveAck: SuccessiveAck.encode(data.successiveAck),
    tc: { value: data.tc },
  }),
  decode: data => ({
    sendingDate: data.sendingDate.value.toNumber(),
    tcInProgress: data.tcInProgress.value,
    tcId: data.tcId.value.toNumber(),
    historyName: data.historyName.value,
    sendType: data.sendType,
    tcNums: data.tcNums.value,
    expectedAck: ExpectedAck.decode(data.expectedAck),
    successiveAck: SuccessiveAck.decode(data.successiveAck),
    tc: data.tc.value,
  }),
};
