// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const timestamp = require('./timestamp');

module.exports = {
  encode: data => ({
    name: data.name,
    id: data.id,
    timestamp: timestamp.encode(data.timestamp),
  }),
  decode: data => ({
    name: data.name,
    id: data.id,
    timestamp: timestamp.decode(data.timestamp),
  }),
};
