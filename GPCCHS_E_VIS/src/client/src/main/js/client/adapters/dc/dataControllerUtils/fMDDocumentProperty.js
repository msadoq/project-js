// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

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
