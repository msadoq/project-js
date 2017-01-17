// Generated file
const applyOverride = require('../../applyOverride');
const getPus014ForwardedPacket = require('./pus014ForwardedPacket');

module.exports = override => applyOverride({
  subsamplingRatio: 100,
  sid: 100,
  pus014ForwardedPacket: getPus014ForwardedPacket(),
}, override);

