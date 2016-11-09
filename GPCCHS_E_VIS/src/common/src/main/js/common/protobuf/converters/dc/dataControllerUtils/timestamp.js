module.exports = {
  encode: data => ({
    ms: data.ms,
    ps: data.ps,
  }),
  decode: data => ({
    ms: data.ms.toNumber(),
    ps: data.ps,
  }),
};
