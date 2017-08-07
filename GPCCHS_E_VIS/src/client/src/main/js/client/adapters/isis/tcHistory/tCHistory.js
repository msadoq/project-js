// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const expectedAck = require('./expectedAck');
const iNTEGER = require('../ccsds_mal/iNTEGER');
const sTRING = require('../ccsds_mal/sTRING');
const sendTypeEnum = require('./sendTypeEnum');
const successiveAck = require('./successiveAck');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    sendingDate: (data.sendingDate !== null && typeof data.sendingDate !== 'undefined')
      ? tIME.encode(data.sendingDate)
      : null,
    tcInProgress: (data.tcInProgress !== null && typeof data.tcInProgress !== 'undefined')
      ? bOOLEAN.encode(data.tcInProgress)
      : null,
    tcId: (data.tcId !== null && typeof data.tcId !== 'undefined')
      ? iNTEGER.encode(data.tcId)
      : null,
    tcSourceId: (data.tcSourceId !== null && typeof data.tcSourceId !== 'undefined')
      ? uINTEGER.encode(data.tcSourceId)
      : null,
    historyName: (data.historyName !== null && typeof data.historyName !== 'undefined')
      ? sTRING.encode(data.historyName)
      : null,
    sendType: (data.sendType !== null && typeof data.sendType !== 'undefined')
      ? data.sendType
      : null,
    tcNums: (data.tcNums !== null && typeof data.tcNums !== 'undefined')
      ? uINTEGER.encode(data.tcNums)
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
      ? tIME.decode(data.sendingDate)
      : undefined,
    tcInProgress: (data.tcInProgress !== null && typeof data.tcInProgress !== 'undefined')
      ? bOOLEAN.decode(data.tcInProgress)
      : undefined,
    tcId: (data.tcId !== null && typeof data.tcId !== 'undefined')
      ? iNTEGER.decode(data.tcId)
      : undefined,
    tcSourceId: (data.tcSourceId !== null && typeof data.tcSourceId !== 'undefined')
      ? uINTEGER.decode(data.tcSourceId)
      : undefined,
    historyName: (data.historyName !== null && typeof data.historyName !== 'undefined')
      ? sTRING.decode(data.historyName)
      : undefined,
    sendType: (data.sendType !== null && typeof data.sendType !== 'undefined')
      ? { type: 'enum', value: data.sendType, symbol: sendTypeEnum[data.sendType] }
      : undefined,
    tcNums: (data.tcNums !== null && typeof data.tcNums !== 'undefined')
      ? uINTEGER.decode(data.tcNums)
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
