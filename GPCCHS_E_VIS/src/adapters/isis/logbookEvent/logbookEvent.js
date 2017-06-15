// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _map = require('lodash/map');
const namedValue = require('../ccsds_mal/namedValue');
const provider = require('../ccsds_cs/provider');
const user = require('../ccsds_cs/user');

module.exports = {
  encode: data => ({
    eventDate: (data.eventDate !== null && typeof data.eventDate !== 'undefined')
      ? { value: data.eventDate }
      : null,
    systemDate: (data.systemDate !== null && typeof data.systemDate !== 'undefined')
      ? { value: data.systemDate }
      : null,
    user: (data.user !== null && typeof data.user !== 'undefined')
      ? user.encode(data.user)
      : null,
    specificAttributes: _map(data.specificAttributes, d => (namedValue.encode(d))),
    mission: (data.mission !== null && typeof data.mission !== 'undefined')
      ? { value: data.mission }
      : null,
    satellite: (data.satellite !== null && typeof data.satellite !== 'undefined')
      ? { value: data.satellite }
      : null,
    producer: (data.producer !== null && typeof data.producer !== 'undefined')
      ? provider.encode(data.producer)
      : null,
  }),
  decode: data => ({
    eventDate: (data.eventDate !== null && typeof data.eventDate !== 'undefined')
      ? { type: 'time', value: data.eventDate.value.toNumber() }
      : undefined,
    systemDate: (data.systemDate !== null && typeof data.systemDate !== 'undefined')
      ? { type: 'time', value: data.systemDate.value.toNumber() }
      : undefined,
    user: (data.user !== null && typeof data.user !== 'undefined')
      ? user.decode(data.user)
      : undefined,
    specificAttributes: _map(data.specificAttributes, d => (namedValue.decode(d))),
    mission: (data.mission !== null && typeof data.mission !== 'undefined')
      ? { type: 'string', value: data.mission.value }
      : undefined,
    satellite: (data.satellite !== null && typeof data.satellite !== 'undefined')
      ? { type: 'ulong', symbol: data.satellite.value.toString() }
      : undefined,
    producer: (data.producer !== null && typeof data.producer !== 'undefined')
      ? provider.decode(data.producer)
      : undefined,
    referenceTimestamp: (data.eventDate !== null && typeof data.eventDate !== 'undefined')
        ? { type: 'time', value: data.eventDate.value.toNumber() }
        : undefined,
  }),
};
