// Produced by Acceleo JavaScript Generator 1.1.0
const _map = require('lodash/map');
const namedValue = require('../ccsds_mal/namedValue');
const protobuf = require('../../../');

module.exports = {
  encode: data => ({
    eventDate: (data.eventDate !== null && typeof data.eventDate !== 'undefined')
      ? { value: data.eventDate }
      : null,
    systemDate: (data.systemDate !== null && typeof data.systemDate !== 'undefined')
      ? { value: data.systemDate }
      : null,
    user: (data.user !== null && typeof data.user !== 'undefined')
      ? { value: protobuf.encode('lpisis.ccsds_cs.User', data.user) }
      : null,
    mission: (data.mission !== null && typeof data.mission !== 'undefined')
      ? { value: data.mission }
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
    systemDate: (data.systemDate !== null && typeof data.systemDate !== 'undefined')
      ? { type: 'time', value: data.systemDate.value.toNumber() }
      : undefined,
    user: (data.user !== null && typeof data.user !== 'undefined')
      ? protobuf.decode('lpisis.ccsds_cs.User', data.user.value)
      : undefined,
    mission: (data.mission !== null && typeof data.mission !== 'undefined')
      ? { type: 'string', value: data.mission.value }
      : undefined,
    specificAttributes: _map(data.specificAttributes, d => (namedValue.decode(d))),
    satellite: (data.satellite !== null && typeof data.satellite !== 'undefined')
      ? { type: 'ulong', symbol: data.satellite.value.toString() }
      : undefined,
    producer: (data.producer !== null && typeof data.producer !== 'undefined')
      ? protobuf.decode('lpisis.ccsds_cs.Provider', data.producer.value)
      : undefined,
    referenceTimestamp: (data.eventDate !== null && typeof data.eventDate !== 'undefined')
        ? { type: 'time', value: data.eventDate.value.toNumber() }
        : undefined,
  }),
};
