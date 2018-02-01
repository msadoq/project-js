// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const bLOB = require('../ccsds_mal/bLOB');
const eventClass = require('./eventClass');
const namedValue = require('../ccsds_mal/namedValue');
const provider = require('../ccsds_cs/provider');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    eventDate: (data.eventDate !== null && typeof data.eventDate !== 'undefined')
      ? tIME.encode(data.eventDate)
      : null,
    eventClass: (data.eventClass !== null && typeof data.eventClass !== 'undefined')
      ? data.eventClass
      : null,
    systemDate: (data.systemDate !== null && typeof data.systemDate !== 'undefined')
      ? tIME.encode(data.systemDate)
      : null,
    origin: (data.origin !== null && typeof data.origin !== 'undefined')
      ? sTRING.encode(data.origin)
      : null,
    mission: (data.mission !== null && typeof data.mission !== 'undefined')
      ? sTRING.encode(data.mission)
      : null,
    satellite: (data.satellite !== null && typeof data.satellite !== 'undefined')
      ? uLONG.encode(data.satellite)
      : null,
    specificAttributes: _map(data.specificAttributes, d => (namedValue.encode(d))),
    producer: (data.producer !== null && typeof data.producer !== 'undefined')
      ? bLOB.encode(provider.encodeRaw(data.producer))
      : null,
  }),
  decode: data => ({
    eventDate: (data.eventDate !== null && typeof data.eventDate !== 'undefined')
      ? tIME.decode(data.eventDate)
      : undefined,
    eventClass: (data.eventClass !== null && typeof data.eventClass !== 'undefined')
      ? { type: 'enum', value: data.eventClass, symbol: eventClass[data.eventClass] }
      : undefined,
    systemDate: (data.systemDate !== null && typeof data.systemDate !== 'undefined')
      ? tIME.decode(data.systemDate)
      : undefined,
    origin: (data.origin !== null && typeof data.origin !== 'undefined')
      ? sTRING.decode(data.origin)
      : undefined,
    mission: (data.mission !== null && typeof data.mission !== 'undefined')
      ? sTRING.decode(data.mission)
      : undefined,
    satellite: (data.satellite !== null && typeof data.satellite !== 'undefined')
      ? uLONG.decode(data.satellite)
      : undefined,
    specificAttributes: _map(data.specificAttributes, d => (namedValue.decode(d))),
    producer: (data.producer !== null && typeof data.producer !== 'undefined')
      ? provider.decodeRaw(bLOB.decode(data.producer).value)
      : undefined,
    referenceTimestamp: (data.eventDate !== null && typeof data.eventDate !== 'undefined')
        ? { type: 'time', value: data.eventDate.value.toNumber() }
        : undefined,
  }),
};
