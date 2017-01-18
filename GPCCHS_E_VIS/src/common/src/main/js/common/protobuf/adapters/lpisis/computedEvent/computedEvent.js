// Generated file
const _map = require('lodash/map');
const eventClass = require('./eventClass');
const namedValue = require('../ccsds_mal/namedValue');
const protobuf = require('../../../');

module.exports = {
  encode: data => ({
    eventDate: (data.eventDate !== null && typeof data.eventDate !== 'undefined')
      ? { value: data.eventDate }
      : null,
    eventClass: (data.eventClass !== null && typeof data.eventClass !== 'undefined')
      ? data.eventClass
      : null,
    systemDate: (data.systemDate !== null && typeof data.systemDate !== 'undefined')
      ? { value: data.systemDate }
      : null,
    mission: (data.mission !== null && typeof data.mission !== 'undefined')
      ? { value: data.mission }
      : null,
    origin: (data.origin !== null && typeof data.origin !== 'undefined')
      ? { value: data.origin }
      : null,
    specificAttributes: _map(data.specificAttributes, d => (namedValue.encode(d))),
    satellite: (data.satellite !== null && typeof data.satellite !== 'undefined')
      ? { value: data.satellite }
      : null,
    producer: (data.producer !== null && typeof data.producer !== 'undefined')
      ? { value: protobuf.encode('lpisis.ccsds_cs.Provider', data.producer) }
      : null,
  }),
  decode: data => ({
    eventDate: (data.eventDate !== null && typeof data.eventDate !== 'undefined')
      ? { type: 'time', value: data.eventDate.value.toNumber() }
      : undefined,
    eventClass: (data.eventClass !== null && typeof data.eventClass !== 'undefined')
      ? { type: 'enum', value: data.eventClass, symbol: eventClass[data.eventClass] }
      : undefined,
    systemDate: (data.systemDate !== null && typeof data.systemDate !== 'undefined')
      ? { type: 'time', value: data.systemDate.value.toNumber() }
      : undefined,
    mission: (data.mission !== null && typeof data.mission !== 'undefined')
      ? { type: 'string', value: data.mission.value }
      : undefined,
    origin: (data.origin !== null && typeof data.origin !== 'undefined')
      ? { type: 'string', value: data.origin.value }
      : undefined,
    specificAttributes: _map(data.specificAttributes, d => (namedValue.decode(d))),
    satellite: (data.satellite !== null && typeof data.satellite !== 'undefined')
      ? { type: 'ulong', value: data.satellite.value.toNumber() }
      : undefined,
    producer: (data.producer !== null && typeof data.producer !== 'undefined')
      ? protobuf.decode('lpisis.ccsds_cs.Provider', data.producer.value)
      : undefined,
    referenceTimestamp: (data.eventDate !== null && typeof data.eventDate !== 'undefined')
        ? { type: 'time', value: data.eventDate.value.toNumber() }
        : undefined,
  }),
};

