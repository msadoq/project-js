// Generated file

const {
  encodeAttribute,
  decodeAttribute,
} = require('../types');

module.exports = {
  encode: data => ({
    parameterName: (data.parameterName !== null && typeof data.parameterName !== 'undefined')
      ? { value: data.parameterName }
      : null,
    parameterValue: (data.parameterValue !== null && typeof data.parameterValue !== 'undefined')
      ? encodeAttribute(data.parameterValue)
      : null,
  }),
  decode: data => ({
    parameterName: (data.parameterName !== null && typeof data.parameterName !== 'undefined')
      ? { type: 'string', value: data.parameterName.value }
      : undefined,
    parameterValue: (data.parameterValue !== null && typeof data.parameterValue !== 'undefined')
      ? decodeAttribute(data.parameterValue)
      : undefined,
  }),
};

