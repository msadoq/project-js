module.exports = {
  encode: data => ({
    pusId: data.pusId,
    apId: data.apId,
  }),
  decode: data => ({
    pusId: data.pusId,
    apId: data.apId,
  }),
};
