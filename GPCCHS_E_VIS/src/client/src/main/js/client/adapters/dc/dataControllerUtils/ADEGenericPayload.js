const ADEPayloadHeader = require('./ADEPayloadHeader');

module.exports = {
  encode: data => ({
    header: data.header,
    payload: ADEPayloadHeader.encode(data.payload),
  }),
  decode: data => ({
    header: data.header,
    payload: ADEPayloadHeader.decode(data.payload),
  }),
};