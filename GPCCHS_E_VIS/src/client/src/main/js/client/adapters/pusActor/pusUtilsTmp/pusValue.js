const _string = require('../ccsds_mal/sTRING');

module.exports = {
  encode: data => ({
    value: (data.value !== null && typeof data.value !== 'undefined')
    ? _string.encode(data.value)
    : null,
  }),
  decode: data => ({
    value: (data.value !== null && typeof data.value !== 'undefined')
    ? _string.decode(data.value)
    : null,
  }),
};
