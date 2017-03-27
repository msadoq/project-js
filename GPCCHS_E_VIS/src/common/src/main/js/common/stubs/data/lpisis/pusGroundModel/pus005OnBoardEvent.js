// Produced by Acceleo JavaScript Generator 1.1.0
const applyOverride = require('../../applyOverride');
const getPusElement = require('./pusElement');

module.exports = override => applyOverride({
  reportId: 100,
  onBoardStatus: 100,
  alarmLevel: 'mySTRING',
  pusElement: getPusElement(),
}, override);

