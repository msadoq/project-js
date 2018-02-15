const ADEPayloadHeader = require('./ADEPayloadHeader');

module.exports = {
  encode: data => ({
    header: ADEPayloadHeader.encode(data.header),
    payload: data.payload,
  }),
  decode: data => ({
    header: ADEPayloadHeader.decode(data.header),
    payload: data.payload,
  }),
};