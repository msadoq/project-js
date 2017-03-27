// Produced by Acceleo JavaScript Generator 1.1.0
const _map = require('lodash/map');
const ifQueueUnit = require('./ifQueueUnit');

module.exports = {
  encode: data => ({
    number: (data.number !== null && typeof data.number !== 'undefined')
      ? { value: data.number }
      : null,
    reemission_delay: (data.reemission_delay !== null && typeof data.reemission_delay !== 'undefined')
      ? { value: data.reemission_delay }
      : null,
    date: (data.date !== null && typeof data.date !== 'undefined')
      ? { value: data.date }
      : null,
    segment_data: (data.segment_data !== null && typeof data.segment_data !== 'undefined')
      ? { value: data.segment_data }
      : null,
    index: (data.index !== null && typeof data.index !== 'undefined')
      ? { value: data.index }
      : null,
    priority: (data.priority !== null && typeof data.priority !== 'undefined')
      ? { value: data.priority }
      : null,
    units: _map(data.units, d => (ifQueueUnit.encode(d))),
  }),
  decode: data => ({
    number: (data.number !== null && typeof data.number !== 'undefined')
      ? { type: 'integer', value: data.number.value }
      : undefined,
    reemission_delay: (data.reemission_delay !== null && typeof data.reemission_delay !== 'undefined')
      ? { type: 'float', value: data.reemission_delay.value }
      : undefined,
    date: (data.date !== null && typeof data.date !== 'undefined')
      ? { type: 'string', value: data.date.value }
      : undefined,
    segment_data: (data.segment_data !== null && typeof data.segment_data !== 'undefined')
      ? { type: 'blob', value: data.segment_data.value.toBuffer() }
      : undefined,
    index: (data.index !== null && typeof data.index !== 'undefined')
      ? { type: 'integer', value: data.index.value }
      : undefined,
    priority: (data.priority !== null && typeof data.priority !== 'undefined')
      ? { type: 'integer', value: data.priority.value }
      : undefined,
    units: _map(data.units, d => (ifQueueUnit.decode(d))),
  }),
};

