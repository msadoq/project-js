const tIME = require('../ccsds_mal/tIME');

module.exports = {
  encode: data => ({
    timestamp: (data.timestamp !== null && typeof data.timestamp !== 'undefined')
      ? tIME.encode(data.timestamp)
      : null,
    pusId: data.pusId,
    apId: data.apId,
    rowId: data.rowId,
    payload: data.payload,
  }),
  decode: data => ({
    timestamp: (data.timestamp !== null && typeof data.timestamp !== 'undefined')
      ? tIME.decode(data.timestamp)
      : undefined,
    pusId: data.pusId,
    apId: data.apId,
    rowId: data.rowId,
    payload: data.payload,
  }),
};
