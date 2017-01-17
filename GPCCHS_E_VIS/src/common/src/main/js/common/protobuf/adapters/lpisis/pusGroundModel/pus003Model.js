// Generated file
const _map = require('lodash/map');
const pus003DiagnosticPacket = require('./pus003DiagnosticPacket');
const pus003HkPacket = require('./pus003HkPacket');
const pusElement = require('./pusElement');

module.exports = {
  encode: data => ({
    pus003DiagPacket: _map(data.pus003DiagPacket, d => (pus003DiagnosticPacket.encode(d))),
    numberHkPackets: (data.numberHkPackets !== null && typeof data.numberHkPackets !== 'undefined')
      ? { value: data.numberHkPackets }
      : null,
    numberDiagPackets: (data.numberDiagPackets !== null && typeof data.numberDiagPackets !== 'undefined')
      ? { value: data.numberDiagPackets }
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { value: data.apid }
      : null,
    pus003HkPacket: _map(data.pus003HkPacket, d => (pus003HkPacket.encode(d))),
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { value: data.status }
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { value: data.groundDate }
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    pus003DiagPacket: _map(data.pus003DiagPacket, d => (pus003DiagnosticPacket.decode(d))),
    numberHkPackets: (data.numberHkPackets !== null && typeof data.numberHkPackets !== 'undefined')
      ? { type: 'uinteger', value: data.numberHkPackets.value }
      : undefined,
    numberDiagPackets: (data.numberDiagPackets !== null && typeof data.numberDiagPackets !== 'undefined')
      ? { type: 'uinteger', value: data.numberDiagPackets.value }
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { type: 'uinteger', value: data.apid.value }
      : undefined,
    pus003HkPacket: _map(data.pus003HkPacket, d => (pus003HkPacket.decode(d))),
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { type: 'uinteger', value: data.status.value }
      : undefined,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { type: 'time', value: data.groundDate.value.toNumber() }
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};

