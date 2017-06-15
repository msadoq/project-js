module.exports = {
  encode: data => ({
    key: data.key,
    value: data.value,
  }),
  decode: data => ({
    key: data.key,
    value: data.value,
  }),
};
