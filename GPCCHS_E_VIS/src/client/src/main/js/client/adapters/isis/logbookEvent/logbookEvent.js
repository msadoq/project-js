// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const bLOB = require('../ccsds_mal/bLOB');
const namedValue = require('../ccsds_mal/namedValue');
const provider = require('../ccsds_cs/provider');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');
const uLONG = require('../ccsds_mal/uLONG');
const user = require('../ccsds_cs/user');

module.exports = {
  encode: data => ({
    eventDate: (data.eventDate !== null && typeof data.eventDate !== 'undefined')
      ? tIME.encode(data.eventDate)
      : null,
    user: (data.user !== null && typeof data.user !== 'undefined')
      ? bLOB.encode(user.encodeRaw(data.user))
      : null,
    systemDate: (data.systemDate !== null && typeof data.systemDate !== 'undefined')
      ? tIME.encode(data.systemDate)
      : null,
    specificAttributes: _map(data.specificAttributes, d => (namedValue.encode(d))),
    mission: (data.mission !== null && typeof data.mission !== 'undefined')
      ? sTRING.encode(data.mission)
      : null,
    satellite: (data.satellite !== null && typeof data.satellite !== 'undefined')
      ? uLONG.encode(data.satellite)
      : null,
    producer: (data.producer !== null && typeof data.producer !== 'undefined')
      ? bLOB.encode(provider.encodeRaw(data.producer))
      : null,
  }),
  decode: data => ({
    eventDate: (data.eventDate !== null && typeof data.eventDate !== 'undefined')
      ? tIME.decode(data.eventDate)
      : undefined,
    user: (data.user !== null && typeof data.user !== 'undefined')
      ? user.decodeRaw(bLOB.decode(data.user).value)
      : undefined,
    systemDate: (data.systemDate !== null && typeof data.systemDate !== 'undefined')
      ? tIME.decode(data.systemDate)
      : undefined,
    specificAttributes: _map(data.specificAttributes, d => (namedValue.decode(d))),
    mission: (data.mission !== null && typeof data.mission !== 'undefined')
      ? sTRING.decode(data.mission)
      : undefined,
    satellite: (data.satellite !== null && typeof data.satellite !== 'undefined')
      ? uLONG.decode(data.satellite)
      : undefined,
    producer: (data.producer !== null && typeof data.producer !== 'undefined')
      ? provider.decodeRaw(bLOB.decode(data.producer).value)
      : undefined,
    referenceTimestamp: (data.eventDate !== null && typeof data.eventDate !== 'undefined')
        ? { type: 'time', value: data.eventDate.value.toNumber() }
        : undefined,
  }),
};
