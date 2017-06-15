// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _now = require('lodash/now');
const applyOverride = require('../../../protobuf/utils/applyOverride');
const getParameter = require('./parameter.stub');

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
