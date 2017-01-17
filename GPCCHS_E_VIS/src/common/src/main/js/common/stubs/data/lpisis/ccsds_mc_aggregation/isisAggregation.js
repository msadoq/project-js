// Generated file
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getParameter = require('./parameter');

const now = _now();

module.exports = override => applyOverride({
  generationMode: 1,
  filtered: true,
  deltaTime: 4242,
  intervalTime: 4242,
  setIntervalTime: 4242,
  onboardDate: now,
  groundDate: now,
  packetType: 1,
  apid: 10,
  service: 1,
  subService: 1,
  destinationId: 1,
  values: [getParameter(), getParameter()],
}, override);

