const timestamp = require('./timestamp');

function extractPayload(rawPayload) {
  const copy = new Buffer(rawPayload.limit - rawPayload.offset);
  rawPayload.buffer.copy(copy, 0, rawPayload.offset);
  return copy;
}
module.exports = {
  encode: data => ({
    timestamp: timestamp.encode(data.timestamp),
    payload: data.payload,
  }),
  decode: data => ({
    timestamp: timestamp.decode(data.timestamp),
    payload: extractPayload(data.payload),
  }),
};
