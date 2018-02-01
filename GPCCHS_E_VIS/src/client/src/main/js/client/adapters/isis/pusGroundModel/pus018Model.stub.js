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
const getPus018ConfiguredObcp = require('./pus018ConfiguredObcp.stub');
const getPus018Obcp = require('./pus018Obcp.stub');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus018Model = {
  engineStatus: 100,
  pus018Obcp: [getPus018Obcp(), getPus018Obcp()],
  groundDate: now,
  apid: 100,
  noOBCPs: 100,
  pusElement: getPusElement(),
  pus018ConfiguredObcp: [getPus018ConfiguredObcp(), getPus018ConfiguredObcp()],
  status: 100,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus018Model) : pus018Model);
