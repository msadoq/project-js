const timestamp = require('./timestamp');

module.exports = {
  encode: data => ({
    timestamp: timestamp.encode(data.timestamp),
    payload: data.payload,
  }),
  decode: data => ({
    timestamp: timestamp.decode(data.timestamp),
    payload: data.payload,
  }),
};
