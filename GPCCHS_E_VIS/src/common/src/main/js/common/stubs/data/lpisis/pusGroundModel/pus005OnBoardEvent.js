// Generated file
const applyOverride = require('../../applyOverride');
const getPusElement = require('./pusElement');

module.exports = override => applyOverride({
  reportId: 100,
  onBoardStatus: 100,
  alarmLevel: 'mySTRING',
  pusElement: getPusElement(),
}, override);

