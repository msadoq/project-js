// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const closingWay = require('./closingWay');
const user = require('../ccsds_cs/user');

module.exports = {
  encode: data => ({
    closingUser: (data.closingUser !== null && typeof data.closingUser !== 'undefined')
      ? user.encode(data.closingUser)
      : null,
    closingDate: (data.closingDate !== null && typeof data.closingDate !== 'undefined')
      ? { value: data.closingDate }
      : null,
    closingWay: (data.closingWay !== null && typeof data.closingWay !== 'undefined')
      ? data.closingWay
      : null,
  }),
  decode: data => ({
    closingUser: (data.closingUser !== null && typeof data.closingUser !== 'undefined')
      ? user.decode(data.closingUser)
      : undefined,
    closingDate: (data.closingDate !== null && typeof data.closingDate !== 'undefined')
      ? { type: 'time', value: data.closingDate.value.toNumber() }
      : undefined,
    closingWay: (data.closingWay !== null && typeof data.closingWay !== 'undefined')
      ? { type: 'enum', value: data.closingWay, symbol: closingWay[data.closingWay] }
      : undefined,
  }),
};
