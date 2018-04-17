const tIME = require('../ccsds_mal/tIME');

module.exports = {
  encode: data => ({
    date: (data.date !== null && typeof data.date !== 'undefined')
      ? tIME.encode(data.date)
      : null,
    pusId: data.pusId,
    apId: data.apId,
  }),
  decode: data => ({
    date: (data.date !== null && typeof data.date !== 'undefined')
      ? tIME.decode(data.date)
      : undefined,
    pusId: data.pusId,
    apId: data.apId,
  }),
};
