module.exports = {
  encode: data => ({
    lhs: data.lhs,
    comp: data.comp,
    rhs: data.rhs,
  }),
  decode: data => ({
    lhs: data.lhs,
    comp: data.comp,
    rhs: data.rhs,
  }),
};
