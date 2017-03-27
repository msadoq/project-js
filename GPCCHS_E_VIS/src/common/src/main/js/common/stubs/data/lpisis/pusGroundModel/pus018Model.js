// Produced by Acceleo JavaScript Generator 1.1.0
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getPus018ConfiguredObcp = require('./pus018ConfiguredObcp');
const getPus018Obcp = require('./pus018Obcp');
const getPusElement = require('./pusElement');

const now = _now();

module.exports = override => applyOverride({
  engineStatus: 100,
  pus018Obcp: [getPus018Obcp(), getPus018Obcp()],
  groundDate: now,
  apid: 100,
  noOBCPs: 100,
  pusElement: getPusElement(),
  pus018ConfiguredObcp: [getPus018ConfiguredObcp(), getPus018ConfiguredObcp()],
}, override);

