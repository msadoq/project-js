// Generated file
const applyOverride = require('../../applyOverride');
const getPus014ForwardedPacket = require('./pus014ForwardedPacket');

module.exports = override => applyOverride({
  serviceTpe: 100,
  serviceSubType: 100,
  pus014ForwardedPacket: getPus014ForwardedPacket(),
}, override);

