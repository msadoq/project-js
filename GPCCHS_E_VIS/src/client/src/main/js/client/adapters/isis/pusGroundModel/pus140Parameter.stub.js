// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _random = require('lodash/random');
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus140Parameter = {
  parameterId: 100,
  apid: 100,
  currentValue: _random(1, 100, true),
  pusElement: getPusElement(),
  lastUpdateModeCurrentValue: 100,
  lastUpdateTimeCurrentValue: now,
  lastUpdateModeParamId: 100,
  lastUpdateTimeParamId: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus140Parameter) : pus140Parameter);
