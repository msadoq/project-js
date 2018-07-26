const stubs = require('../../utils/stubs');
const predictibleRand = require('../utils/predictibleRand');

const stubData = stubs.getStubData();

const getDataByPusService = (pusService, timestamp) => {
  switch (pusService) {
    case 5: {
      return { dataType: 1, groundDate: timestamp, payload: stubData.getPus005ModelProtobuf() };
    }
    case 11: {
      return { dataType: 4, groundDate: timestamp, payload: stubData.getPus011ModelProtobuf() };
    }
    case 12: {
      return {
        dataType: 6,
        groundDate: timestamp,
        payload: stubData.getPus012ModelProtobuf({
          serviceStatus: predictibleRand.getFrom(['1', '2', '3']),
          lastUpdateModeServiceStatus: predictibleRand.getFrom(['1', '2', '3', '4']),
          pus012ParameterMonitoringDefinition: [
            stubData.getPus012ParameterMonitoringDefinition({
              monitoringStatus: predictibleRand.getFrom([1, 2, 3]),
              checkType: predictibleRand.getFrom(['1', '2', '3', '4']),
              isMonitoringIntervalSet: predictibleRand.getFrom([true, false]),
              isRepetitionNumberSet: predictibleRand.getFrom([true, false]),
              lastUpdateModeMonInterval: predictibleRand.getFrom(['1', '2', '3', '4']),
              lastUpdateModeRepetition: predictibleRand.getFrom(['1', '2', '3', '4']),
              lastUpdateModeMonId: predictibleRand.getFrom(['1', '2', '3', '4']),
              lastUpdateModeParamId: predictibleRand.getFrom(['1', '2', '3', '4']),
              lastUpdateModeValParamId: predictibleRand.getFrom(['1', '2', '3', '4']),
              lastUpdateModeParamCurrentValue: predictibleRand.getFrom(['1', '2', '3', '4']),
              lastUpdateModeValParamExpectValue: predictibleRand.getFrom(['1', '2', '3', '4']),
              lastUpdateModeValParamMask: predictibleRand.getFrom(['1', '2', '3', '4']),
              lastUpdateModeCheckType: predictibleRand.getFrom(['1', '2', '3', '4']),
              lastUpdateModeMonStatus: predictibleRand.getFrom(['1', '2', '3', '4']),
              lastUpdateModeProtectionStatus: predictibleRand.getFrom(['1', '2', '3', '4']),
              pus012MonitoringCheckPropertiesLow: stubData.getPus012MonitoringCheckProperties({
                ridStatus: predictibleRand.getFrom([1, 2, 3]),
                actionStatus: predictibleRand.getFrom([1, 2, 3]),
                lastUpdateModeRid: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeActionStatus: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeRidStatus: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeMask: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeValue: predictibleRand.getFrom(['1', '2', '3', '4']),
              }),
              pus012MonitoringCheckPropertiesExpected: stubData.getPus012MonitoringCheckProperties({
                ridStatus: predictibleRand.getFrom([1, 2, 3]),
                actionStatus: predictibleRand.getFrom([1, 2, 3]),
                lastUpdateModeRid: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeActionStatus: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeRidStatus: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeMask: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeValue: predictibleRand.getFrom(['1', '2', '3', '4']),
              }),
              pus012MonitoringCheckPropertiesHigh: stubData.getPus012MonitoringCheckProperties({
                ridStatus: predictibleRand.getFrom([1, 2, 3]),
                actionStatus: predictibleRand.getFrom([1, 2, 3]),
                lastUpdateModeRid: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeActionStatus: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeRidStatus: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeMask: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeValue: predictibleRand.getFrom(['1', '2', '3', '4']),
              }),
            }),
            stubData.getPus012ParameterMonitoringDefinition({
              monitoringStatus: predictibleRand.getFrom([1, 2, 3]),
              checkType: predictibleRand.getFrom(['1', '2', '3', '4']),
              isMonitoringIntervalSet: predictibleRand.getFrom([true, false]),
              isRepetitionNumberSet: predictibleRand.getFrom([true, false]),
              lastUpdateModeMonInterval: predictibleRand.getFrom(['1', '2', '3', '4']),
              lastUpdateModeRepetition: predictibleRand.getFrom(['1', '2', '3', '4']),
              lastUpdateModeMonId: predictibleRand.getFrom(['1', '2', '3', '4']),
              lastUpdateModeParamId: predictibleRand.getFrom(['1', '2', '3', '4']),
              lastUpdateModeValParamId: predictibleRand.getFrom(['1', '2', '3', '4']),
              lastUpdateModeParamCurrentValue: predictibleRand.getFrom(['1', '2', '3', '4']),
              lastUpdateModeValParamExpectValue: predictibleRand.getFrom(['1', '2', '3', '4']),
              lastUpdateModeValParamMask: predictibleRand.getFrom(['1', '2', '3', '4']),
              lastUpdateModeCheckType: predictibleRand.getFrom(['1', '2', '3', '4']),
              lastUpdateModeMonStatus: predictibleRand.getFrom(['1', '2', '3', '4']),
              lastUpdateModeProtectionStatus: predictibleRand.getFrom(['1', '2', '3', '4']),
              pus012MonitoringCheckPropertiesLow: stubData.getPus012MonitoringCheckProperties({
                ridStatus: predictibleRand.getFrom([1, 2, 3]),
                actionStatus: predictibleRand.getFrom([1, 2, 3]),
                lastUpdateModeRid: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeActionStatus: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeRidStatus: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeMask: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeValue: predictibleRand.getFrom(['1', '2', '3', '4']),
              }),
              pus012MonitoringCheckPropertiesExpected: stubData.getPus012MonitoringCheckProperties({
                ridStatus: predictibleRand.getFrom([1, 2, 3]),
                actionStatus: predictibleRand.getFrom([1, 2, 3]),
                lastUpdateModeRid: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeActionStatus: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeRidStatus: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeMask: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeValue: predictibleRand.getFrom(['1', '2', '3', '4']),
              }),
              pus012MonitoringCheckPropertiesHigh: stubData.getPus012MonitoringCheckProperties({
                ridStatus: predictibleRand.getFrom([1, 2, 3]),
                actionStatus: predictibleRand.getFrom([1, 2, 3]),
                lastUpdateModeRid: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeActionStatus: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeRidStatus: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeMask: predictibleRand.getFrom(['1', '2', '3', '4']),
                lastUpdateModeValue: predictibleRand.getFrom(['1', '2', '3', '4']),
              }),
            }),
          ],
        }),
      };
    }
    case 14: {
      return { dataType: 12, groundDate: timestamp, payload: stubData.getPus014ModelProtobuf() };
    }
    case 15: {
      return { dataType: 13, groundDate: timestamp, payload: stubData.getPus015ModelProtobuf() };
    }
    case 0: {
      return { dataType: 25, groundDate: timestamp, payload: stubData.getPusMmeModelProtobuf() };
    }
    default: {
      return null;
    }
  }
};

/**
 * Generate payload for stubs
 * @param  {number} timestamp Timestamp for the generated payload
 * @param  {object} dataId
 * @param  {Object} options   Options for generation
 * @return {Object}           Generated payload
 */
module.exports = function getPayload(pusService, timestamp) {
  return stubData.getDataStructureProtobuf(getDataByPusService(pusService, timestamp));
};
