// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus144OnboardFiles = require('./pus144OnboardFiles.stub');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus144Model = {
  pus144OnboardFiles: [getPus144OnboardFiles(), getPus144OnboardFiles()],
  groundDate: now,
  apid: 100,
  noOfOnBoardFiles: 100,
  pusElement: getPusElement(),
  status: 100,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus144Model) : pus144Model);
