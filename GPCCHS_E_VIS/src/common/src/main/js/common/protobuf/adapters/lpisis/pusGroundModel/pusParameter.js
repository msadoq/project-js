// Produced by Acceleo JavaScript Generator 1.1.0

const {
  encodeAttribute,
  decodeAttribute,

} = require('../types');

module.exports = {
  encode: data => ({
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? { value: data.parameterId }
      : null,
    parameterName: (data.parameterName !== null && typeof data.parameterName !== 'undefined')
      ? { value: data.parameterName }
      : null,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? encodeAttribute(data.value)
      : null,
  }),
  decode: data => ({
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? { type: 'uinteger', value: data.parameterId.value }
      : undefined,
    parameterName: (data.parameterName !== null && typeof data.parameterName !== 'undefined')
      ? { type: 'string', value: data.parameterName.value }
      : undefined,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? decodeAttribute(data.value)
      : undefined,
  }),
};

