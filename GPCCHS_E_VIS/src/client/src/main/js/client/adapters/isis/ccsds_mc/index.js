// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const StatisticLinkStruct = require('./statisticLinkStruct');
const StatisticValueStruct = require('./statisticValueStruct');
const StatisticFunctionDetails = require('./statisticFunctionDetails');
const GroupDefinition = require('./groupDefinition');
const StatisticLink = require('./statisticLink');
const StatisticValue = require('./statisticValue');
const StatisticFunctionDetailsStruct = require('./statisticFunctionDetailsStruct');
const AttributeValue = require('./attributeValue');
const StatisticParameterReport = require('./statisticParameterReport');
const Action = require('./action');
const StatisticFunctionValue = require('./statisticFunctionValue');
const ParameterValue = require('./parameterValue');

module.exports = {
  StatisticLinkStruct: { type: 'raw', adapter: StatisticLinkStruct },
  StatisticValueStruct: { type: 'protobuf', adapter: StatisticValueStruct },
  StatisticFunctionDetails: { type: 'protobuf', adapter: StatisticFunctionDetails },
  GroupDefinition: { type: 'protobuf', adapter: GroupDefinition },
  StatisticLink: { type: 'raw', adapter: StatisticLink },
  StatisticValue: { type: 'protobuf', adapter: StatisticValue },
  StatisticFunctionDetailsStruct: { type: 'protobuf', adapter: StatisticFunctionDetailsStruct },
  AttributeValue: { type: 'protobuf', adapter: AttributeValue },
  StatisticParameterReport: { type: 'protobuf', adapter: StatisticParameterReport },
  Action: { type: 'protobuf', adapter: Action },
  StatisticFunctionValue: { type: 'protobuf', adapter: StatisticFunctionValue },
  ParameterValue: { type: 'protobuf', adapter: ParameterValue },
};
