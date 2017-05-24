// Produced by Acceleo JavaScript Generator 1.1.0
const applyOverride = require('../../applyOverride');
const getIfQueueUnit = require('./ifQueueUnit');

module.exports = override => applyOverride({
  number: -100,
  reemission_delay: 1.100000023841858,
  date: 'mySTRING',
  segment_data: Buffer.alloc(10, 1),
  index: -100,
  priority: -100,
  units: [getIfQueueUnit(), getIfQueueUnit()],
}, override);

