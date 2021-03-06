// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getObjectKey = require('../ccsds_com/objectKey.stub');
const getObjectType = require('../ccsds_com/objectType.stub');
const getStatisticFunctionValue = require('./statisticFunctionValue.stub');

const statisticParameterReport = {
  parameterId: getObjectKey(),
  values: [getStatisticFunctionValue(), getStatisticFunctionValue()],
  parameterType: getObjectType(),
};

module.exports = override => (override ? _defaultsDeep({}, override, statisticParameterReport) : statisticParameterReport);
