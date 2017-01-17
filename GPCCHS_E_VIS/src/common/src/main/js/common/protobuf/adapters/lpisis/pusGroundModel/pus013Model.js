// Generated file
const _map = require('lodash/map');
const pus013DownlinkLdt = require('./pus013DownlinkLdt');
const pus013UplinkLdt = require('./pus013UplinkLdt');
const pusElement = require('./pusElement');

module.exports = {
  encode: data => ({
    noOnGoingDownlinkLDTPacket: (data.noOnGoingDownlinkLDTPacket !== null && typeof data.noOnGoingDownlinkLDTPacket !== 'undefined')
      ? { value: data.noOnGoingDownlinkLDTPacket }
      : null,
    pUS013UplinkLdt: _map(data.pUS013UplinkLdt, d => (pus013UplinkLdt.encode(d))),
    pUS013DownlinkLdt: _map(data.pUS013DownlinkLdt, d => (pus013DownlinkLdt.encode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { value: data.groundDate }
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { value: data.apid }
      : null,
    noOnGoingUplinkLDT: (data.noOnGoingUplinkLDT !== null && typeof data.noOnGoingUplinkLDT !== 'undefined')
      ? { value: data.noOnGoingUplinkLDT }
      : null,
    noOnGoingDownlinkLDTFile: (data.noOnGoingDownlinkLDTFile !== null && typeof data.noOnGoingDownlinkLDTFile !== 'undefined')
      ? { value: data.noOnGoingDownlinkLDTFile }
      : null,
    currentUplinkLduIdPosition: (data.currentUplinkLduIdPosition !== null && typeof data.currentUplinkLduIdPosition !== 'undefined')
      ? { value: data.currentUplinkLduIdPosition }
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    noOnGoingDownlinkLDTPacket: (data.noOnGoingDownlinkLDTPacket !== null && typeof data.noOnGoingDownlinkLDTPacket !== 'undefined')
      ? { type: 'uinteger', value: data.noOnGoingDownlinkLDTPacket.value }
      : undefined,
    pUS013UplinkLdt: _map(data.pUS013UplinkLdt, d => (pus013UplinkLdt.decode(d))),
    pUS013DownlinkLdt: _map(data.pUS013DownlinkLdt, d => (pus013DownlinkLdt.decode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { type: 'time', value: data.groundDate.value.toNumber() }
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { type: 'uinteger', value: data.apid.value }
      : undefined,
    noOnGoingUplinkLDT: (data.noOnGoingUplinkLDT !== null && typeof data.noOnGoingUplinkLDT !== 'undefined')
      ? { type: 'uinteger', value: data.noOnGoingUplinkLDT.value }
      : undefined,
    noOnGoingDownlinkLDTFile: (data.noOnGoingDownlinkLDTFile !== null && typeof data.noOnGoingDownlinkLDTFile !== 'undefined')
      ? { type: 'uinteger', value: data.noOnGoingDownlinkLDTFile.value }
      : undefined,
    currentUplinkLduIdPosition: (data.currentUplinkLduIdPosition !== null && typeof data.currentUplinkLduIdPosition !== 'undefined')
      ? { type: 'uinteger', value: data.currentUplinkLduIdPosition.value }
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};

