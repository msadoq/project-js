const stubs = require('../../utils/stubs');
const predictibleRand = require('../utils/predictibleRand');

const stubData = stubs.getStubData();
const getAStatus = () => predictibleRand.getFrom([1, 2]);
const getAnUpdateMode = () => predictibleRand.getFrom(['1', '2', '3', '4', '200']);
const getABoolean = () => getABoolean();

const getDataByPusService = (pusService, timestamp) => {
  switch (pusService) {
    case 5: {
      return { dataType: 1, groundDate: timestamp, payload: stubData.getPus005ModelProtobuf() };
    }
    case 11: {
      const binaryProfile = Math.random().toString(16).substring(2, 15);
      return {
        dataType: 4,
        groundDate: timestamp,
        payload: stubData.getPus011ModelProtobuf({
          status: getAStatus(),
          scheduleStatus: getAStatus(),
          lastUpdateModeScheduleStatus: getAnUpdateMode(),
          lastUpdateTimeScheduleStatus: timestamp.toString(),
          lastUpdateModeNoFreeCommands: getAnUpdateMode(),
          lastUpdateTimeNoFreeCommands: timestamp.toString(),
          lastUpdateModeFreeSpace: getAnUpdateMode(),
          lastUpdateTimeFreeSpace: timestamp.toString(),
          pus011Apid: [
            stubData.getPus011Apid({
              lastUpdateModeApid: getAnUpdateMode(),
              status: getAStatus(),
              lastUpdateTimeApid: timestamp.toString(),
            }),
            stubData.getPus011Apid({
              lastUpdateModeApid: getAnUpdateMode(),
              status: getAStatus(),
              lastUpdateTimeApid: timestamp.toString(),
            }),
          ],
          pus011Command: [
            stubData.getPus011Command({
              lastUpdateModeCommandId: getAnUpdateMode(),
              lastUpdateTimeCommandId: timestamp.toString(),
              commandBinaryProfile: `${binaryProfile}${binaryProfile}${binaryProfile}${binaryProfile}`,
              lastUpdateModeBinProf: getAnUpdateMode(),
              lastUpdateTimeBinProf: timestamp.toString(),
              commandGroundStatus: getAStatus(),
              lastUpdateModeGroundStatus: getAnUpdateMode(),
              lastUpdateTimeGroundStatus: timestamp.toString(),
              commandStatus: getAStatus(),
              lastUpdateModeStatus: getAnUpdateMode(),
              lastUpdateTimeStatus: timestamp.toString(),
              currentExecutionTime: timestamp.toString(),
              lastUpdateModeCurrentExecTime: getAnUpdateMode(),
              lastUpdateTimeCurrentExecTime: timestamp.toString(),
              initialExecutionTime: timestamp.toString(),
              lastUpdateModeInitialExecTime: getAnUpdateMode(),
              lastUpdateTimeInitialExecTime: timestamp.toString(),
              lastUpdateModeTotalTimeShiftOffset: getAnUpdateMode(),
              lastUpdateTimeTotalTimeShiftOffset: timestamp.toString(),
              pus011CommandParameters: [
                stubData.getPus011CommandParameter({
                  lastUpdateMode: getAnUpdateMode(),
                  lastUpdateTime: timestamp.toString(),
                }),
                stubData.getPus011CommandParameter({
                  lastUpdateMode: getAnUpdateMode(),
                  lastUpdateTime: timestamp.toString(),
                }),
              ],
              pus011TimeShift: [
                stubData.getPus011TimeShift({
                  applicationTime: timestamp.toString(),
                  lastUpdateMode: getAnUpdateMode(),
                  lastUpdateTime: timestamp.toString(),
                }),
                stubData.getPus011TimeShift({
                  applicationTime: timestamp.toString(),
                  lastUpdateMode: getAnUpdateMode(),
                  lastUpdateTime: timestamp.toString(),
                }),
              ],
            }),
          ],
        }),
      };
    }
    case 12: {
      return {
        dataType: 6,
        groundDate: timestamp,
        payload: stubData.getPus012ModelProtobuf({
          serviceStatus: getAStatus(),
          lastUpdateModeServiceStatus: getAnUpdateMode(),
          pus012ParameterMonitoringDefinition: [
            stubData.getPus012ParameterMonitoringDefinition({
              monitoringStatus: getAStatus(),
              checkType: getAnUpdateMode(),
              isMonitoringIntervalSet: getABoolean(),
              isRepetitionNumberSet: getABoolean(),
              lastUpdateModeMonInterval: getAnUpdateMode(),
              lastUpdateModeRepetition: getAnUpdateMode(),
              lastUpdateModeMonId: getAnUpdateMode(),
              lastUpdateModeParamId: getAnUpdateMode(),
              lastUpdateModeValParamId: getAnUpdateMode(),
              lastUpdateModeParamCurrentValue: getAnUpdateMode(),
              lastUpdateModeValParamExpectValue: getAnUpdateMode(),
              lastUpdateModeValParamMask: getAnUpdateMode(),
              lastUpdateModeCheckType: getAnUpdateMode(),
              lastUpdateModeMonStatus: getAnUpdateMode(),
              lastUpdateModeProtectionStatus: getAnUpdateMode(),
              pus012MonitoringCheckPropertiesLow: stubData.getPus012MonitoringCheckProperties({
                ridStatus: getAStatus(),
                actionStatus: getAStatus(),
                lastUpdateModeRid: getAnUpdateMode(),
                lastUpdateModeActionStatus: getAnUpdateMode(),
                lastUpdateModeRidStatus: getAnUpdateMode(),
                lastUpdateModeMask: getAnUpdateMode(),
                lastUpdateModeValue: getAnUpdateMode(),
              }),
              pus012MonitoringCheckPropertiesExpected: stubData.getPus012MonitoringCheckProperties({
                ridStatus: getAStatus(),
                actionStatus: getAStatus(),
                lastUpdateModeRid: getAnUpdateMode(),
                lastUpdateModeActionStatus: getAnUpdateMode(),
                lastUpdateModeRidStatus: getAnUpdateMode(),
                lastUpdateModeMask: getAnUpdateMode(),
                lastUpdateModeValue: getAnUpdateMode(),
              }),
              pus012MonitoringCheckPropertiesHigh: stubData.getPus012MonitoringCheckProperties({
                ridStatus: getAStatus(),
                actionStatus: getAStatus(),
                lastUpdateModeRid: getAnUpdateMode(),
                lastUpdateModeActionStatus: getAnUpdateMode(),
                lastUpdateModeRidStatus: getAnUpdateMode(),
                lastUpdateModeMask: getAnUpdateMode(),
                lastUpdateModeValue: getAnUpdateMode(),
              }),
            }),
            stubData.getPus012ParameterMonitoringDefinition({
              monitoringStatus: getAStatus(),
              checkType: getAnUpdateMode(),
              isMonitoringIntervalSet: getABoolean(),
              isRepetitionNumberSet: getABoolean(),
              lastUpdateModeMonInterval: getAnUpdateMode(),
              lastUpdateModeRepetition: getAnUpdateMode(),
              lastUpdateModeMonId: getAnUpdateMode(),
              lastUpdateModeParamId: getAnUpdateMode(),
              lastUpdateModeValParamId: getAnUpdateMode(),
              lastUpdateModeParamCurrentValue: getAnUpdateMode(),
              lastUpdateModeValParamExpectValue: getAnUpdateMode(),
              lastUpdateModeValParamMask: getAnUpdateMode(),
              lastUpdateModeCheckType: getAnUpdateMode(),
              lastUpdateModeMonStatus: getAnUpdateMode(),
              lastUpdateModeProtectionStatus: getAnUpdateMode(),
              pus012MonitoringCheckPropertiesLow: stubData.getPus012MonitoringCheckProperties({
                ridStatus: getAStatus(),
                actionStatus: getAStatus(),
                lastUpdateModeRid: getAnUpdateMode(),
                lastUpdateModeActionStatus: getAnUpdateMode(),
                lastUpdateModeRidStatus: getAnUpdateMode(),
                lastUpdateModeMask: getAnUpdateMode(),
                lastUpdateModeValue: getAnUpdateMode(),
              }),
              pus012MonitoringCheckPropertiesExpected: stubData.getPus012MonitoringCheckProperties({
                ridStatus: getAStatus(),
                actionStatus: getAStatus(),
                lastUpdateModeRid: getAnUpdateMode(),
                lastUpdateModeActionStatus: getAnUpdateMode(),
                lastUpdateModeRidStatus: getAnUpdateMode(),
                lastUpdateModeMask: getAnUpdateMode(),
                lastUpdateModeValue: getAnUpdateMode(),
              }),
              pus012MonitoringCheckPropertiesHigh: stubData.getPus012MonitoringCheckProperties({
                ridStatus: getAStatus(),
                actionStatus: getAStatus(),
                lastUpdateModeRid: getAnUpdateMode(),
                lastUpdateModeActionStatus: getAnUpdateMode(),
                lastUpdateModeRidStatus: getAnUpdateMode(),
                lastUpdateModeMask: getAnUpdateMode(),
                lastUpdateModeValue: getAnUpdateMode(),
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
