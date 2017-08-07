// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');

module.exports = {
  encode: data => ({
    acceptance: (data.acceptance !== null && typeof data.acceptance !== 'undefined')
      ? bOOLEAN.encode(data.acceptance)
      : null,
    executionComplete: (data.executionComplete !== null && typeof data.executionComplete !== 'undefined')
      ? bOOLEAN.encode(data.executionComplete)
      : null,
    executionStart: (data.executionStart !== null && typeof data.executionStart !== 'undefined')
      ? bOOLEAN.encode(data.executionStart)
      : null,
  }),
  decode: data => ({
    acceptance: (data.acceptance !== null && typeof data.acceptance !== 'undefined')
      ? bOOLEAN.decode(data.acceptance)
      : undefined,
    executionComplete: (data.executionComplete !== null && typeof data.executionComplete !== 'undefined')
      ? bOOLEAN.decode(data.executionComplete)
      : undefined,
    executionStart: (data.executionStart !== null && typeof data.executionStart !== 'undefined')
      ? bOOLEAN.decode(data.executionStart)
      : undefined,
  }),
};
