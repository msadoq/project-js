function extractPayload(rawPayload) {
  const copy = new Buffer(rawPayload.limit - rawPayload.offset);
  rawPayload.buffer.copy(copy, 0, rawPayload.offset);
  return copy;
}

module.exports = {
  encode: data => ({
    messageType: data.messageType,
    payload: data.payload,
  }),
  decode: data => ({
    messageType: data.messageType,
    payload: extractPayload(data.payload),
  }),
};
