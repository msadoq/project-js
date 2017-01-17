// Generated file
const pusElement = require('./pusElement');

module.exports = {
  encode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { value: data.apid }
      : null,
    forwardingStatus: (data.forwardingStatus !== null && typeof data.forwardingStatus !== 'undefined')
      ? { value: data.forwardingStatus }
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { type: 'uinteger', value: data.apid.value }
      : undefined,
    forwardingStatus: (data.forwardingStatus !== null && typeof data.forwardingStatus !== 'undefined')
      ? { type: 'boolean', value: data.forwardingStatus.value }
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
  }),
};

