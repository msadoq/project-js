// Produced by Acceleo JavaScript Generator 1.1.0
const pusElement = require('./pusElement');
const {
  encodeAttribute,
  decodeAttribute,

} = require('../types');

module.exports = {
  encode: data => ({
    sid: (data.sid !== null && typeof data.sid !== 'undefined')
      ? { value: data.sid }
      : null,
    validityParameterId: (data.validityParameterId !== null && typeof data.validityParameterId !== 'undefined')
      ? { value: data.validityParameterId }
      : null,
    validityParameterMask: (data.validityParameterMask !== null && typeof data.validityParameterMask !== 'undefined')
      ? { value: data.validityParameterMask }
      : null,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
      ? encodeAttribute(data.validityParameterExpectedValue)
      : null,
    collectionInterval: (data.collectionInterval !== null && typeof data.collectionInterval !== 'undefined')
      ? { value: data.collectionInterval }
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { value: data.status }
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    sid: (data.sid !== null && typeof data.sid !== 'undefined')
      ? { type: 'uinteger', value: data.sid.value }
      : undefined,
    validityParameterId: (data.validityParameterId !== null && typeof data.validityParameterId !== 'undefined')
      ? { type: 'uinteger', value: data.validityParameterId.value }
      : undefined,
    validityParameterMask: (data.validityParameterMask !== null && typeof data.validityParameterMask !== 'undefined')
      ? { type: 'string', value: data.validityParameterMask.value }
      : undefined,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
      ? decodeAttribute(data.validityParameterExpectedValue)
      : undefined,
    collectionInterval: (data.collectionInterval !== null && typeof data.collectionInterval !== 'undefined')
      ? { type: 'duration', value: data.collectionInterval.value }
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { type: 'uinteger', value: data.status.value }
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
  }),
};

