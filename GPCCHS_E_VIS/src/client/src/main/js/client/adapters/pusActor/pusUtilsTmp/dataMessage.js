const tIME = require('../ccsds_mal/tIME');
const bLOB = require('../ccsds_mal/bLOB');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const headerMessage = require('./headerMessage');

module.exports = {
  encode: data => ({
    dataType: (data.dataType !== null && typeof data.dataType !== 'undefined')
      ? uINTEGER.encode(data.dataType)
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.encode(data.groundDate)
      : null,
    payload: (data.payload !== null && typeof data.payload !== 'undefined')
      ? bLOB.encode(data.payload)
      : null,
    headerMessage: headerMessage.encode(data.headerMessage),
  }),
  decode: data => ({
    dataType: (data.dataType !== null && typeof data.dataType !== 'undefined')
      ? uINTEGER.decode(data.dataType)
      : undefined,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.decode(data.groundDate)
      : undefined,
    payload: (data.payload !== null && typeof data.payload !== 'undefined')
      ? bLOB.decode(data.payload)
      : undefined,
    headerMessage: headerMessage.decode(data.headerMessage),
  }),
};
