module.exports = {
  encode: data => ({
    code: data.code,
    message: data.message,
  }),
  decode: data => ({
    code: data.code,
    message: data.message,
  }),
};