// Produced by Acceleo JavaScript Generator 1.1.0
const applyOverride = require('../../applyOverride');
const getPusElement = require('./pusElement');

module.exports = override => applyOverride({
  apid: 100,
  forwardingStatus: true,
  pusElement: getPusElement(),
}, override);

