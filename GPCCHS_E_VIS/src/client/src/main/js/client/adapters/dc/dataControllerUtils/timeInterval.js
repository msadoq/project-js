// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const timestamp = require('./timestamp');

module.exports = {
  encode: data => ({
    startTime: timestamp.encode(data.startTime),
    endTime: timestamp.encode(data.endTime),
  }),
  decode: data => ({
    startTime: timestamp.decode(data.startTime),
    endTime: timestamp.decode(data.endTime),
  }),
};
