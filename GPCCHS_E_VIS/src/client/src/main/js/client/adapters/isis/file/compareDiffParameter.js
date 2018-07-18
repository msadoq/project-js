// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const sTRING = require('../ccsds_mal/sTRING');

module.exports = {
  encode: data => ({
    propertyName: (data.propertyName !== null && typeof data.propertyName !== 'undefined')
      ? sTRING.encode(data.propertyName)
      : null,
    leftPropertyValue: (data.leftPropertyValue !== null && typeof data.leftPropertyValue !== 'undefined')
      ? sTRING.encode(data.leftPropertyValue)
      : null,
    rigthPropertyValue: (data.rigthPropertyValue !== null && typeof data.rigthPropertyValue !== 'undefined')
      ? sTRING.encode(data.rigthPropertyValue)
      : null,
  }),
  decode: data => ({
    propertyName: (data.propertyName !== null && typeof data.propertyName !== 'undefined')
      ? sTRING.decode(data.propertyName)
      : undefined,
    leftPropertyValue: (data.leftPropertyValue !== null && typeof data.leftPropertyValue !== 'undefined')
      ? sTRING.decode(data.leftPropertyValue)
      : undefined,
    rigthPropertyValue: (data.rigthPropertyValue !== null && typeof data.rigthPropertyValue !== 'undefined')
      ? sTRING.decode(data.rigthPropertyValue)
      : undefined,
  }),
};
