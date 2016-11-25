const timestamp = require('./timestamp');

module.exports = {
  encode: data => ({
    name: data.name,
    id: data.id,
    timestamp: timestamp.encode(data.timestamp),
    delta: data.delta,
  }),
  decode: data => ({
    name: data.name,
    id: data.id,
    timestamp: timestamp.decode(data.timestamp),
    delta: data.delta.toNumber(),
  }),
};
