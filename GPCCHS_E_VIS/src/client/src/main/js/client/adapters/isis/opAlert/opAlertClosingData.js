// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const closingWay = require('./closingWay');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');

module.exports = {
  encode: data => ({
    closingUser: (data.closingUser !== null && typeof data.closingUser !== 'undefined')
      ? sTRING.encode(data.closingUser)
      : null,
    closingDate: (data.closingDate !== null && typeof data.closingDate !== 'undefined')
      ? tIME.encode(data.closingDate)
      : null,
    closingWay: (data.closingWay !== null && typeof data.closingWay !== 'undefined')
      ? data.closingWay
      : null,
  }),
  decode: data => ({
    closingUser: (data.closingUser !== null && typeof data.closingUser !== 'undefined')
      ? sTRING.decode(data.closingUser)
      : undefined,
    closingDate: (data.closingDate !== null && typeof data.closingDate !== 'undefined')
      ? tIME.decode(data.closingDate)
      : undefined,
    closingWay: (data.closingWay !== null && typeof data.closingWay !== 'undefined')
      ? { type: 'enum', value: data.closingWay, symbol: closingWay[data.closingWay] }
      : undefined,
  }),
};
