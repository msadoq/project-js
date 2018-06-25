// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const GroupDefinition = require('./groupDefinition');
const StatisticValue = require('./statisticValue');
const StatisticLinkStruct = require('./statisticLinkStruct');
const StatisticValueStruct = require('./statisticValueStruct');
const StatisticFunctionDetails = require('./statisticFunctionDetails');
const StatisticLink = require('./statisticLink');
const StatisticFunctionDetailsStruct = require('./statisticFunctionDetailsStruct');
const AttributeValue = require('./attributeValue');
const StatisticParameterReport = require('./statisticParameterReport');
const ParameterValue = require('./parameterValue');
const Action = require('./action');
const StatisticFunctionValue = require('./statisticFunctionValue');

module.exports = {
  GroupDefinition: { type: 'protobuf', adapter: GroupDefinition },
  StatisticValue: { type: 'protobuf', adapter: StatisticValue },
  StatisticLinkStruct: { type: 'raw', adapter: StatisticLinkStruct },
  StatisticValueStruct: { type: 'protobuf', adapter: StatisticValueStruct },
  StatisticFunctionDetails: { type: 'protobuf', adapter: StatisticFunctionDetails },
  StatisticLink: { type: 'raw', adapter: StatisticLink },
  StatisticFunctionDetailsStruct: { type: 'protobuf', adapter: StatisticFunctionDetailsStruct },
  AttributeValue: { type: 'protobuf', adapter: AttributeValue },
  StatisticParameterReport: { type: 'protobuf', adapter: StatisticParameterReport },
  ParameterValue: { type: 'protobuf', adapter: ParameterValue },
  Action: { type: 'protobuf', adapter: Action },
  StatisticFunctionValue: { type: 'protobuf', adapter: StatisticFunctionValue },
};
