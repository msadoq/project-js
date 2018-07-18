module.exports = {
  encode: data => ({
    modelUniqueId: data.modelUniqueId,
    pusName: data.pusName,
    payload: data.payload,
  }),
  decode: data => ({
    modelUniqueId: data.modelUniqueId,
    pusName: data.pusName,
    payload: data.payload,
  }),
};
