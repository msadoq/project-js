// Generated file
const applyOverride = require('../../applyOverride');
const getPusElement = require('./pusElement');

module.exports = override => applyOverride({
  apid: 100,
  serviceTpe: 100,
  serviceSubType: 100,
  sid: 100,
  subsamplingRatio: 100,
  pusElement: getPusElement(),
  packetType: 100,
}, override);

