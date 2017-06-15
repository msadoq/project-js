// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */


module.exports = {
  encode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? { value: data.name }
      : null,
    uid: (data.uid !== null && typeof data.uid !== 'undefined')
      ? { value: data.uid }
      : null,
  }),
  decode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? { type: 'string', value: data.name.value }
      : undefined,
    uid: (data.uid !== null && typeof data.uid !== 'undefined')
      ? { type: 'long', symbol: data.uid.value.toString() }
      : undefined,
  }),
};
