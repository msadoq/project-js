// Produced by Acceleo JavaScript Generator 1.1.0
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');


const now = _now();

module.exports = override => applyOverride({
  groundDate: now,
  onboardDate: now,
  apid: 10,
  service: 1,
  subService: 1,
  destinationId: 1,
  isDecommuted: true,
  primaryHeaderSize: 1,
  secondaryHeaderSize: 1,
  isNominal: true,
  rawData: Buffer.alloc(10, 1),
}, override);

