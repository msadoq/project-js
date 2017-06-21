// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getAttributeValue = require('./attributeValue.stub');

const action = {
  stageStartedRequired: true,
  stageProgressRequired: true,
  stageCompletedRequired: true,
  argumentValues: [getAttributeValue(), getAttributeValue()],
  argumentIds: [-1000, -1000],
  isConvertedValues: [true, true],
  delay: 100,
  tCID: -1000,
};

module.exports = override => (override ? _defaultsDeep({}, override, action) : action);
