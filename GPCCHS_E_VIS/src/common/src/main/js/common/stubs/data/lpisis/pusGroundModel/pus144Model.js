// Generated file
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getPus144OnboardFiles = require('./pus144OnboardFiles');
const getPusElement = require('./pusElement');

const now = _now();

module.exports = override => applyOverride({
  pus144OnboardFiles: [getPus144OnboardFiles(), getPus144OnboardFiles()],
  groundDate: now,
  apid: 100,
  noOfOnBoardFiles: 100,
  pusElement: getPusElement(),
}, override);

