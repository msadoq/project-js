// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const StatisticValueStruct = require('./statisticValueStruct');
const StatisticValue = require('./statisticValue');
const GroupDefinition = require('./groupDefinition');
const StatisticFunctionDetailsStruct = require('./statisticFunctionDetailsStruct');
const StatisticLink = require('./statisticLink');
const StatisticFunctionDetails = require('./statisticFunctionDetails');
const StatisticLinkStruct = require('./statisticLinkStruct');
const StatisticParameterReport = require('./statisticParameterReport');
const AttributeValue = require('./attributeValue');
const StatisticFunctionValue = require('./statisticFunctionValue');
const ParameterValue = require('./parameterValue');
const Action = require('./action');

module.exports = {
  StatisticValueStruct: { type: 'protobuf', adapter: StatisticValueStruct },
  StatisticValue: { type: 'protobuf', adapter: StatisticValue },
  GroupDefinition: { type: 'protobuf', adapter: GroupDefinition },
  StatisticFunctionDetailsStruct: { type: 'protobuf', adapter: StatisticFunctionDetailsStruct },
  StatisticLink: { type: 'raw', adapter: StatisticLink },
  StatisticFunctionDetails: { type: 'protobuf', adapter: StatisticFunctionDetails },
  StatisticLinkStruct: { type: 'raw', adapter: StatisticLinkStruct },
  StatisticParameterReport: { type: 'protobuf', adapter: StatisticParameterReport },
  AttributeValue: { type: 'protobuf', adapter: AttributeValue },
  StatisticFunctionValue: { type: 'protobuf', adapter: StatisticFunctionValue },
  ParameterValue: { type: 'protobuf', adapter: ParameterValue },
  Action: { type: 'protobuf', adapter: Action },
};
