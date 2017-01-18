// Generated file
const pusElement = require('./pusElement');
const {
  encodeAttribute,
  decodeAttribute,

} = require('../types');

module.exports = {
  encode: data => ({
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? { value: data.parameterId }
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { value: data.apid }
      : null,
    currentValue: (data.currentValue !== null && typeof data.currentValue !== 'undefined')
      ? encodeAttribute(data.currentValue)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? { type: 'uinteger', value: data.parameterId.value }
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { type: 'uinteger', value: data.apid.value }
      : undefined,
    currentValue: (data.currentValue !== null && typeof data.currentValue !== 'undefined')
      ? decodeAttribute(data.currentValue)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
  }),
};

