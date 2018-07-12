const uINTEGER = require('../ccsds_mal/uINTEGER');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');
const uLONG = require('../ccsds_mal/uLONG');
const pus013Ldt = require('./pus013Ldt');
const _map = require('lodash/map');


module.exports = {
  encode: data => ({
    pUS013UplinkLdt: _map(data.pUS013UplinkLdt, upLink => pus013Ldt.encode(upLink)),
    pUS013DownlinkLdt: _map(data.pUS013DownlinkLdt, downLink => pus013Ldt.encode(downLink)),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.encode(data.groundDate)
      : null,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.encode(data.serviceApid)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? sTRING.encode(data.status)
      : null,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.encode(data.serviceApidName)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
  }),
  decode: data => ({
    pUS013UplinkLdt: _map(data.pUS013UplinkLdt, upLink => pus013Ldt.decode(upLink)),
    pUS013DownlinkLdt: _map(data.pUS013DownlinkLdt, downLink => pus013Ldt.decode(downLink)),
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.decode(data.groundDate)
      : undefined,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.decode(data.serviceApid)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? sTRING.decode(data.status)
      : undefined,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.decode(data.serviceApidName)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
  }),
};
