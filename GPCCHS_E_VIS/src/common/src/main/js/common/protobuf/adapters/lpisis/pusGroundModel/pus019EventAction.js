// Produced by Acceleo JavaScript Generator 1.1.0
const pusElement = require('./pusElement');

module.exports = {
  encode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { value: data.apid }
      : null,
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? { value: data.rid }
      : null,
    actionStatus: (data.actionStatus !== null && typeof data.actionStatus !== 'undefined')
      ? { value: data.actionStatus }
      : null,
    actionTcPacketHeader: (data.actionTcPacketHeader !== null && typeof data.actionTcPacketHeader !== 'undefined')
      ? { value: data.actionTcPacketHeader }
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { type: 'uinteger', value: data.apid.value }
      : undefined,
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? { type: 'uinteger', value: data.rid.value }
      : undefined,
    actionStatus: (data.actionStatus !== null && typeof data.actionStatus !== 'undefined')
      ? { type: 'uinteger', value: data.actionStatus.value }
      : undefined,
    actionTcPacketHeader: (data.actionTcPacketHeader !== null && typeof data.actionTcPacketHeader !== 'undefined')
      ? { type: 'blob', value: data.actionTcPacketHeader.value }
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
  }),
};

