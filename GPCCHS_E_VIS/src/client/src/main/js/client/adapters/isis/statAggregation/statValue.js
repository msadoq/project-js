// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const aTTRIBUTE = require('../ccsds_mal/aTTRIBUTE');
const lONG = require('../ccsds_mal/lONG');

module.exports = {
  encode: data => ({
    related: (data.related !== null && typeof data.related !== 'undefined')
      ? lONG.encode(data.related)
      : null,
    attrValue: (data.attrValue !== null && typeof data.attrValue !== 'undefined')
      ? aTTRIBUTE.encode(data.attrValue)
      : null,
  }),
  decode: data => ({
    related: (data.related !== null && typeof data.related !== 'undefined')
      ? lONG.decode(data.related)
      : undefined,
    attrValue: (data.attrValue !== null && typeof data.attrValue !== 'undefined')
      ? aTTRIBUTE.decode(data.attrValue)
      : undefined,
  }),
};
