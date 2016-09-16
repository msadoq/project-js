module.exports = {
  encode: data => ({
    messageType: data.messageType,
    payload: data.payload,
  }),
  decode: data => ({
    messageType: data.messageType,
    payload: data.payload,
  }),
};
