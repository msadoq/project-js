// Generated file

const {
  stringToBytes,
  bytesToString,

} = require('../types');

module.exports = {
  encode: data => ({
    supportedCapabilities: (data.supportedCapabilities !== null && typeof data.supportedCapabilities !== 'undefined')
      ? { value: data.supportedCapabilities }
      : null,
    supportedLevels: (data.supportedLevels !== null && typeof data.supportedLevels !== 'undefined')
      ? { value: data.supportedLevels }
      : null,
    qoSproperties: (data.qoSproperties !== null && typeof data.qoSproperties !== 'undefined')
      ? { value: data.qoSproperties }
      : null,
    priorityLevels: (data.priorityLevels !== null && typeof data.priorityLevels !== 'undefined')
      ? { value: data.priorityLevels }
      : null,
    serviceURI: (data.serviceURI !== null && typeof data.serviceURI !== 'undefined')
      ? { value: stringToBytes(data.serviceURI) }
      : null,
    dataURI: (data.dataURI !== null && typeof data.dataURI !== 'undefined')
      ? { value: stringToBytes(data.dataURI) }
      : null,
    dataName: (data.dataName !== null && typeof data.dataName !== 'undefined')
      ? { value: data.dataName }
      : null,
  }),
  decode: data => ({
    supportedCapabilities: (data.supportedCapabilities !== null && typeof data.supportedCapabilities !== 'undefined')
      ? { type: 'uinteger', value: data.supportedCapabilities.value }
      : undefined,
    supportedLevels: (data.supportedLevels !== null && typeof data.supportedLevels !== 'undefined')
      ? { type: 'uinteger', value: data.supportedLevels.value }
      : undefined,
    qoSproperties: (data.qoSproperties !== null && typeof data.qoSproperties !== 'undefined')
      ? { type: 'uinteger', value: data.qoSproperties.value }
      : undefined,
    priorityLevels: (data.priorityLevels !== null && typeof data.priorityLevels !== 'undefined')
      ? { type: 'uinteger', value: data.priorityLevels.value }
      : undefined,
    serviceURI: (data.serviceURI !== null && typeof data.serviceURI !== 'undefined')
      ? { type: 'uri', value: bytesToString(data.serviceURI.value) }
      : undefined,
    dataURI: (data.dataURI !== null && typeof data.dataURI !== 'undefined')
      ? { type: 'uri', value: bytesToString(data.dataURI.value) }
      : undefined,
    dataName: (data.dataName !== null && typeof data.dataName !== 'undefined')
      ? { type: 'string', value: data.dataName.value }
      : undefined,
  }),
};

