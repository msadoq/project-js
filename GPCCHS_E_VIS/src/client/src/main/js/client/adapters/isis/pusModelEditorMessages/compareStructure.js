// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const tIME = require('../ccsds_mal/tIME');

module.exports = {
  encode: data => ({
    firstDate: (data.firstDate !== null && typeof data.firstDate !== 'undefined')
      ? tIME.encode(data.firstDate)
      : null,
    secondDate: (data.secondDate !== null && typeof data.secondDate !== 'undefined')
      ? tIME.encode(data.secondDate)
      : null,
    startCompTool: (data.startCompTool !== null && typeof data.startCompTool !== 'undefined')
      ? bOOLEAN.encode(data.startCompTool)
      : null,
  }),
  decode: data => ({
    firstDate: (data.firstDate !== null && typeof data.firstDate !== 'undefined')
      ? tIME.decode(data.firstDate)
      : undefined,
    secondDate: (data.secondDate !== null && typeof data.secondDate !== 'undefined')
      ? tIME.decode(data.secondDate)
      : undefined,
    startCompTool: (data.startCompTool !== null && typeof data.startCompTool !== 'undefined')
      ? bOOLEAN.decode(data.startCompTool)
      : undefined,
  }),
};
