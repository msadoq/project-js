// Generated file
const applyOverride = require('../../applyOverride');
const getPus003Packet = require('./pus003Packet');

module.exports = override => applyOverride({
  generationMode: 100,
  pus003Packet: getPus003Packet(),
}, override);

