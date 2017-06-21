// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const StatisticValueStruct = require('./statisticValueStruct');
const GroupDefinition = require('./groupDefinition');
const StatisticValue = require('./statisticValue');
const StatisticLinkStruct = require('./statisticLinkStruct');
const StatisticLink = require('./statisticLink');
const StatisticFunctionDetailsStruct = require('./statisticFunctionDetailsStruct');
const StatisticFunctionDetails = require('./statisticFunctionDetails');
const StatisticFunctionValue = require('./statisticFunctionValue');
const AttributeValue = require('./attributeValue');
const Action = require('./action');
const StatisticParameterReport = require('./statisticParameterReport');
const ParameterValue = require('./parameterValue');

module.exports = {
  StatisticValueStruct: { type: 'protobuf', adapter: StatisticValueStruct },
  GroupDefinition: { type: 'protobuf', adapter: GroupDefinition },
  StatisticValue: { type: 'protobuf', adapter: StatisticValue },
  StatisticLinkStruct: { type: 'raw', adapter: StatisticLinkStruct },
  StatisticLink: { type: 'raw', adapter: StatisticLink },
  StatisticFunctionDetailsStruct: { type: 'protobuf', adapter: StatisticFunctionDetailsStruct },
  StatisticFunctionDetails: { type: 'protobuf', adapter: StatisticFunctionDetails },
  StatisticFunctionValue: { type: 'protobuf', adapter: StatisticFunctionValue },
  AttributeValue: { type: 'protobuf', adapter: AttributeValue },
  Action: { type: 'protobuf', adapter: Action },
  StatisticParameterReport: { type: 'protobuf', adapter: StatisticParameterReport },
  ParameterValue: { type: 'protobuf', adapter: ParameterValue },
};
