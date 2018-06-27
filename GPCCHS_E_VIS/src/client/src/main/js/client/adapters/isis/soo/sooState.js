// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');

module.exports = {
  encode: data => ({
    isRunning: (data.isRunning !== null && typeof data.isRunning !== 'undefined')
      ? bOOLEAN.encode(data.isRunning)
      : null,
  }),
  decode: data => ({
    isRunning: (data.isRunning !== null && typeof data.isRunning !== 'undefined')
      ? bOOLEAN.decode(data.isRunning)
      : undefined,
  }),
};
