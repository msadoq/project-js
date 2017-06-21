// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const pus013DownlinkLdt = require('./pus013DownlinkLdt');
const pus013UplinkLdt = require('./pus013UplinkLdt');
const pusElement = require('./pusElement');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    noOnGoingDownlinkLDTPacket: (data.noOnGoingDownlinkLDTPacket !== null && typeof data.noOnGoingDownlinkLDTPacket !== 'undefined')
      ? uINTEGER.encode(data.noOnGoingDownlinkLDTPacket)
      : null,
    pUS013UplinkLdt: _map(data.pUS013UplinkLdt, d => (pus013UplinkLdt.encode(d))),
    pUS013DownlinkLdt: _map(data.pUS013DownlinkLdt, d => (pus013DownlinkLdt.encode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.encode(data.groundDate)
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.encode(data.apid)
      : null,
    noOnGoingUplinkLDT: (data.noOnGoingUplinkLDT !== null && typeof data.noOnGoingUplinkLDT !== 'undefined')
      ? uINTEGER.encode(data.noOnGoingUplinkLDT)
      : null,
    noOnGoingDownlinkLDTFile: (data.noOnGoingDownlinkLDTFile !== null && typeof data.noOnGoingDownlinkLDTFile !== 'undefined')
      ? uINTEGER.encode(data.noOnGoingDownlinkLDTFile)
      : null,
    currentUplinkLduIdPosition: (data.currentUplinkLduIdPosition !== null && typeof data.currentUplinkLduIdPosition !== 'undefined')
      ? uINTEGER.encode(data.currentUplinkLduIdPosition)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
  }),
  decode: data => ({
    noOnGoingDownlinkLDTPacket: (data.noOnGoingDownlinkLDTPacket !== null && typeof data.noOnGoingDownlinkLDTPacket !== 'undefined')
      ? uINTEGER.decode(data.noOnGoingDownlinkLDTPacket)
      : undefined,
    pUS013UplinkLdt: _map(data.pUS013UplinkLdt, d => (pus013UplinkLdt.decode(d))),
    pUS013DownlinkLdt: _map(data.pUS013DownlinkLdt, d => (pus013DownlinkLdt.decode(d))),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.decode(data.groundDate)
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.decode(data.apid)
      : undefined,
    noOnGoingUplinkLDT: (data.noOnGoingUplinkLDT !== null && typeof data.noOnGoingUplinkLDT !== 'undefined')
      ? uINTEGER.decode(data.noOnGoingUplinkLDT)
      : undefined,
    noOnGoingDownlinkLDTFile: (data.noOnGoingDownlinkLDTFile !== null && typeof data.noOnGoingDownlinkLDTFile !== 'undefined')
      ? uINTEGER.decode(data.noOnGoingDownlinkLDTFile)
      : undefined,
    currentUplinkLduIdPosition: (data.currentUplinkLduIdPosition !== null && typeof data.currentUplinkLduIdPosition !== 'undefined')
      ? uINTEGER.decode(data.currentUplinkLduIdPosition)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};
