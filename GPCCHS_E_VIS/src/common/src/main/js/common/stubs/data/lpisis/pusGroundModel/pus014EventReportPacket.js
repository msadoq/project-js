// Produced by Acceleo JavaScript Generator 1.1.0
const applyOverride = require('../../applyOverride');
const getPus014ForwardedPacket = require('./pus014ForwardedPacket');

module.exports = override => applyOverride({
  rid: 100,
  pus014ForwardedPacket: getPus014ForwardedPacket(),
}, override);

