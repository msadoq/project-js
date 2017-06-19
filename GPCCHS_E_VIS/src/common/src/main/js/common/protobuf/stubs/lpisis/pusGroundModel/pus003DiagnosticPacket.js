// Produced by Acceleo JavaScript Generator 1.1.0
const applyOverride = require('../../applyOverride');
const getPus003Packet = require('./pus003Packet');

module.exports = override => applyOverride({
  pus003Packet: getPus003Packet(),
}, override);

