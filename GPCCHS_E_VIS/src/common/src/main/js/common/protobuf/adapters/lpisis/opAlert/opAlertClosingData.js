// Produced by Acceleo JavaScript Generator 1.1.0
const alertingWay = require('./alertingWay');

module.exports = {
  encode: data => ({
    closingWay: (data.closingWay !== null && typeof data.closingWay !== 'undefined')
      ? data.closingWay
      : null,
    closingDate: (data.closingDate !== null && typeof data.closingDate !== 'undefined')
      ? { value: data.closingDate }
      : null,
  }),
  decode: data => ({
    closingWay: (data.closingWay !== null && typeof data.closingWay !== 'undefined')
      ? { type: 'enum', value: data.closingWay, symbol: alertingWay[data.closingWay] }
      : undefined,
    closingDate: (data.closingDate !== null && typeof data.closingDate !== 'undefined')
      ? { type: 'time', value: data.closingDate.value.toNumber() }
      : undefined,
  }),
};

