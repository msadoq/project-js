module.exports = {
  encode: data => ({
    method: data.method,
  }),
  decode: data => ({
    method: data.method
  }),
};
