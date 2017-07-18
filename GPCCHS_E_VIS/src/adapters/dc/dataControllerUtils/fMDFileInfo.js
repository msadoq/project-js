module.exports = {
  encode: data => ({
    type: data.type,
    serializedOid: data.serializedOid,
  }),
  decode: data => ({
    type: data.type,
    serializedOid: data.serializedOid,
  }),
};
