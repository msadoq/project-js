// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const pusElement = require('./pusElement');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    ssId: (data.ssId !== null && typeof data.ssId !== 'undefined')
      ? uINTEGER.encode(data.ssId)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
    executionTimeFirstTc: (data.executionTimeFirstTc !== null && typeof data.executionTimeFirstTc !== 'undefined')
      ? uLONG.encode(data.executionTimeFirstTc)
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.encode(data.apid)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.encode(data.groundDate)
      : null,
    ssIdLabel: (data.ssIdLabel !== null && typeof data.ssIdLabel !== 'undefined')
      ? sTRING.encode(data.ssIdLabel)
      : null,
  }),
  decode: data => ({
    ssId: (data.ssId !== null && typeof data.ssId !== 'undefined')
      ? uINTEGER.decode(data.ssId)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    executionTimeFirstTc: (data.executionTimeFirstTc !== null && typeof data.executionTimeFirstTc !== 'undefined')
      ? uLONG.decode(data.executionTimeFirstTc)
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.decode(data.apid)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.decode(data.groundDate)
      : undefined,
    ssIdLabel: (data.ssIdLabel !== null && typeof data.ssIdLabel !== 'undefined')
      ? sTRING.decode(data.ssIdLabel)
      : undefined,
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};
