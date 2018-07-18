const pusMmePacket = require('./pusMmePacket');
const time = require('../ccsds_mal/tIME');
const uinteger = require('../ccsds_mal/uINTEGER');
const _string = require('../ccsds_mal/sTRING');
const ulong = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
    ? uinteger.encode(data.serviceApid)
    : null,
    status:(data.status !== null && typeof data.status !== 'undefined')
    ? uinteger.encode(data.status)
    : null,
    groundDate:(data.groundDate !== null && typeof data.groundDate !== 'undefined')
    ? time.encode(data.groundDate)
    : null,
    serviceApidName:(data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
    ? _string.encode(data.serviceApidName)
    : null,
    uniqueId:(data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
    ? ulong.encode(data.uniqueId)
    : null,
    pusMmePacket: pusMmePacket.encode(data.pusMmePacket),
  }),
  decode: data => ({
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
    ? uinteger.decode(data.serviceApid)
    : null,
    status:(data.status !== null && typeof data.status !== 'undefined')
    ? uinteger.decode(data.status)
    : null,
    groundDate:(data.groundDate !== null && typeof data.groundDate !== 'undefined')
    ? time.decode(data.groundDate)
    : null,
    serviceApidName:(data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
    ? _string.decode(data.serviceApidName)
    : null,
    uniqueId:(data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
    ? ulong.decode(data.uniqueId)
    : null,
    pusMmePacket: pusMmePacket.decode(data.pusMmePacket),
  }),
};
