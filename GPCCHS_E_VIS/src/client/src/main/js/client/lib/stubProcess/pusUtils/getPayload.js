const stubs = require('../../utils/stubs');
const predictibleRand = require('../utils/predictibleRand');
const constants = require('../../constants');

const stubData = stubs.getStubData();
const getAFileMode = () => predictibleRand.getFrom(['1', '2']);
const getAStatus = () => predictibleRand.getFrom(['1', '2', '3', '200']);
const getAnUpdateMode = () => predictibleRand.getFrom(['1', '2', '3', '4']);
const getABoolean = () => predictibleRand.getBool();
const getAGroundStatus = () => predictibleRand.getInt([1, 8]).toString();

const getDataByPusService = (pusService, timestamp) => {
  switch (pusService) {
    case 5: {
      return {
        dataType: constants.Pus005ModelType,
        groundDate: timestamp,
        payload: stubData.getPus005ModelProtobuf({
          pus005OnBoardEvent: stubData.getPus005OnBoardEvent({
            onBoardStatus: getAStatus(),
            lastUpdateModeRid: getAnUpdateMode(),
            lastUpdateTimeRid: timestamp.toString(),
            lastUpdateModeOnBoardStatus: getAnUpdateMode(),
            lastUpdateTimeOnBoardStatus: timestamp.toString(),
            lastUpdateModeAlarmLevel: getAnUpdateMode(),
            lastUpdateTimeAlarmLevel: timestamp.toString(),
            defaultOnBoardStatus: getAStatus(),
          }),
        }),
      };
    }
    case 11: {
      const binaryProfile = Math.random().toString(16).substring(2, 15);
      return {
        dataType: constants.Pus011ModelType,
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
          pus011SubSchedule: [
            stubData.getPus011SubSchedule({
              lastUpdateModeSubScheduleId: getAnUpdateMode(),
              lastUpdateTimeSubscheduleId: timestamp.toString(),
              status: getAStatus(),
              lastUpdateModeStatus: getAnUpdateMode(),
              lastUpdateTimeStatus: timestamp.toString(),
              executionTimeFirstTc: timestamp.toString(),
              lastUpdateModeExecTimeFirstTc: getAnUpdateMode(),
              lastUpdateTimeExecTimeFirstTc: timestamp.toString(),
            }),
            stubData.getPus011SubSchedule({
              lastUpdateModeSubScheduleId: getAnUpdateMode(),
              lastUpdateTimeSubscheduleId: timestamp.toString(),
              status: getAStatus(),
              lastUpdateModeStatus: getAnUpdateMode(),
              lastUpdateTimeStatus: timestamp.toString(),
              executionTimeFirstTc: timestamp.toString(),
              lastUpdateModeExecTimeFirstTc: getAnUpdateMode(),
              lastUpdateTimeExecTimeFirstTc: timestamp.toString(),
            }),
          ],
          pus011Command: [
            stubData.getPus011Command({
              lastUpdateModeCommandId: getAnUpdateMode(),
              lastUpdateTimeCommandId: timestamp.toString(),
              commandStatus: getAStatus(),
              lastUpdateModeStatus: getAnUpdateMode(),
              lastUpdateTimeStatus: timestamp.toString(),
              commandGroundStatus: getAGroundStatus(),
              lastUpdateModeGroundStatus: getAnUpdateMode(),
              lastUpdateTimeGroundStatus: timestamp.toString(),
              initialExecutionTime: timestamp.toString(),
              lastUpdateModeInitialExecTime: getAnUpdateMode(),
              lastUpdateTimeInitialExecTime: timestamp.toString(),
              currentExecutionTime: timestamp.toString(),
              lastUpdateModeCurrentExecTime: getAnUpdateMode(),
              lastUpdateTimeCurrentExecTime: timestamp.toString(),
              lastUpdateModeTotalTimeShiftOffset: getAnUpdateMode(),
              lastUpdateTimeTotalTimeShiftOffset: timestamp.toString(),
              commandBinaryProfile: `${binaryProfile}${binaryProfile}${binaryProfile}${binaryProfile}`,
              lastUpdateModeBinProf: getAnUpdateMode(),
              lastUpdateTimeBinProf: timestamp.toString(),
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
            stubData.getPus011Command({
              lastUpdateModeCommandId: getAnUpdateMode(),
              lastUpdateTimeCommandId: timestamp.toString(),
              commandStatus: getAStatus(),
              lastUpdateModeStatus: getAnUpdateMode(),
              lastUpdateTimeStatus: timestamp.toString(),
              commandGroundStatus: getAGroundStatus(),
              lastUpdateModeGroundStatus: getAnUpdateMode(),
              lastUpdateTimeGroundStatus: timestamp.toString(),
              initialExecutionTime: timestamp.toString(),
              lastUpdateModeInitialExecTime: getAnUpdateMode(),
              lastUpdateTimeInitialExecTime: timestamp.toString(),
              currentExecutionTime: timestamp.toString(),
              lastUpdateModeCurrentExecTime: getAnUpdateMode(),
              lastUpdateTimeCurrentExecTime: timestamp.toString(),
              lastUpdateModeTotalTimeShiftOffset: getAnUpdateMode(),
              lastUpdateTimeTotalTimeShiftOffset: timestamp.toString(),
              commandBinaryProfile: `${binaryProfile}${binaryProfile}${binaryProfile}${binaryProfile}`,
              lastUpdateModeBinProf: getAnUpdateMode(),
              lastUpdateTimeBinProf: timestamp.toString(),
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
        dataType: constants.Pus012ModelType,
        groundDate: timestamp,
        payload: stubData.getPus012ModelProtobuf({
          serviceStatus: getAStatus(),
          lastUpdateModeServiceStatus: getAnUpdateMode(),
          lastUpdateTimeServiceStatus: timestamp.toString(),
          pus012ParameterMonitoringDefinition: [
            stubData.getPus012ParameterMonitoringDefinition({
              monitoringStatus: getAStatus(),
              checkType: getAStatus(),
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
              lastUpdateTimeMonInterval: timestamp.toString(),
              lastUpdateTimeRepetition: timestamp.toString(),
              lastUpdateTimeMonId: timestamp.toString(),
              lastUpdateTimeParamId: timestamp.toString(),
              lastUpdateTimeValParamId: timestamp.toString(),
              lastUpdateTimeParamCurrentValue: timestamp.toString(),
              lastUpdateTimeValParamExpectValue: timestamp.toString(),
              lastUpdateTimeValParamMask: timestamp.toString(),
              lastUpdateTimeCheckTime: timestamp.toString(),
              lastUpdateTimeMonStatus: timestamp.toString(),
              lastUpdateTimeProtectionStatus: timestamp.toString(),
              pus012MonitoringCheckPropertiesLow: stubData.getPus012MonitoringCheckProperties({
                ridStatus: getAStatus(),
                actionStatus: getAStatus(),
                lastUpdateModeRid: getAnUpdateMode(),
                lastUpdateModeActionStatus: getAnUpdateMode(),
                lastUpdateModeRidStatus: getAnUpdateMode(),
                lastUpdateModeMask: getAnUpdateMode(),
                lastUpdateModeValue: getAnUpdateMode(),
                lastUpdateTimeRid: timestamp.toString(),
                lastUpdateTimeActionStatus: timestamp.toString(),
                lastUpdateTimeRidStatus: timestamp.toString(),
                lastUpdateTimeMask: timestamp.toString(),
                lastUpdateTimeValue: timestamp.toString(),
              }),
              pus012MonitoringCheckPropertiesExpected: stubData.getPus012MonitoringCheckProperties({
                ridStatus: getAStatus(),
                actionStatus: getAStatus(),
                lastUpdateModeRid: getAnUpdateMode(),
                lastUpdateModeActionStatus: getAnUpdateMode(),
                lastUpdateModeRidStatus: getAnUpdateMode(),
                lastUpdateModeMask: getAnUpdateMode(),
                lastUpdateModeValue: getAnUpdateMode(),
                lastUpdateTimeRid: timestamp.toString(),
                lastUpdateTimeActionStatus: timestamp.toString(),
                lastUpdateTimeRidStatus: timestamp.toString(),
                lastUpdateTimeMask: timestamp.toString(),
                lastUpdateTimeValue: timestamp.toString(),
              }),
              pus012MonitoringCheckPropertiesHigh: stubData.getPus012MonitoringCheckProperties({
                ridStatus: getAStatus(),
                actionStatus: getAStatus(),
                lastUpdateModeRid: getAnUpdateMode(),
                lastUpdateModeActionStatus: getAnUpdateMode(),
                lastUpdateModeRidStatus: getAnUpdateMode(),
                lastUpdateModeMask: getAnUpdateMode(),
                lastUpdateModeValue: getAnUpdateMode(),
                lastUpdateTimeRid: timestamp.toString(),
                lastUpdateTimeActionStatus: timestamp.toString(),
                lastUpdateTimeRidStatus: timestamp.toString(),
                lastUpdateTimeMask: timestamp.toString(),
                lastUpdateTimeValue: timestamp.toString(),
              }),
            }),
            stubData.getPus012ParameterMonitoringDefinition({
              monitoringStatus: getAStatus(),
              checkType: getAStatus(),
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
              lastUpdateTimeMonInterval: timestamp.toString(),
              lastUpdateTimeRepetition: timestamp.toString(),
              lastUpdateTimeMonId: timestamp.toString(),
              lastUpdateTimeParamId: timestamp.toString(),
              lastUpdateTimeValParamId: timestamp.toString(),
              lastUpdateTimeParamCurrentValue: timestamp.toString(),
              lastUpdateTimeValParamExpectValue: timestamp.toString(),
              lastUpdateTimeValParamMask: timestamp.toString(),
              lastUpdateTimeCheckTime: timestamp.toString(),
              lastUpdateTimeMonStatus: timestamp.toString(),
              lastUpdateTimeProtectionStatus: timestamp.toString(),
              pus012MonitoringCheckPropertiesLow: stubData.getPus012MonitoringCheckProperties({
                ridStatus: getAStatus(),
                actionStatus: getAStatus(),
                lastUpdateModeRid: getAnUpdateMode(),
                lastUpdateModeActionStatus: getAnUpdateMode(),
                lastUpdateModeRidStatus: getAnUpdateMode(),
                lastUpdateModeMask: getAnUpdateMode(),
                lastUpdateModeValue: getAnUpdateMode(),
                lastUpdateTimeRid: timestamp.toString(),
                lastUpdateTimeActionStatus: timestamp.toString(),
                lastUpdateTimeRidStatus: timestamp.toString(),
                lastUpdateTimeMask: timestamp.toString(),
                lastUpdateTimeValue: timestamp.toString(),
              }),
              pus012MonitoringCheckPropertiesExpected: stubData.getPus012MonitoringCheckProperties({
                ridStatus: getAStatus(),
                actionStatus: getAStatus(),
                lastUpdateModeRid: getAnUpdateMode(),
                lastUpdateModeActionStatus: getAnUpdateMode(),
                lastUpdateModeRidStatus: getAnUpdateMode(),
                lastUpdateModeMask: getAnUpdateMode(),
                lastUpdateModeValue: getAnUpdateMode(),
                lastUpdateTimeRid: timestamp.toString(),
                lastUpdateTimeActionStatus: timestamp.toString(),
                lastUpdateTimeRidStatus: timestamp.toString(),
                lastUpdateTimeMask: timestamp.toString(),
                lastUpdateTimeValue: timestamp.toString(),
              }),
              pus012MonitoringCheckPropertiesHigh: stubData.getPus012MonitoringCheckProperties({
                ridStatus: getAStatus(),
                actionStatus: getAStatus(),
                lastUpdateModeRid: getAnUpdateMode(),
                lastUpdateModeActionStatus: getAnUpdateMode(),
                lastUpdateModeRidStatus: getAnUpdateMode(),
                lastUpdateModeMask: getAnUpdateMode(),
                lastUpdateModeValue: getAnUpdateMode(),
                lastUpdateTimeRid: timestamp.toString(),
                lastUpdateTimeActionStatus: timestamp.toString(),
                lastUpdateTimeRidStatus: timestamp.toString(),
                lastUpdateTimeMask: timestamp.toString(),
                lastUpdateTimeValue: timestamp.toString(),
              }),
            }),
          ],
        }),
      };
    }
    case 14: {
      return {
        dataType: constants.Pus014ModelType,
        groundDate: timestamp,
        payload: stubData.getPus014ModelProtobuf(),
      };
    }
    case 15: {
      return {
        dataType: constants.Pus015ModelType,
        groundDate: timestamp,
        payload: stubData.getPus015ModelProtobuf({
          status: getAStatus(),
          pus015PacketStore: [
            stubData.getPus015PacketStore({
              status: getAStatus(),
              lastUpdateModeStoreId: getAnUpdateMode(),
              lastUpdateTimeStoreId: timestamp.toString(),
              lastUpdateModeStoreType: getAnUpdateMode(),
              lastUpdateTimeStoreType: timestamp.toString(),
              lastUpdateModeStoreStatus: getAnUpdateMode(),
              lastUpdateTimeStoreStatus: timestamp.toString(),
              pus015Packet: [
                stubData.getPus015Packet({
                  serviceType: getAnUpdateMode(),
                  serviceSubType: getAnUpdateMode(),
                  lastUpdateModePacketId: getAnUpdateMode(),
                  lastUpdateTimePacketId: timestamp.toString(),
                  lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
                  lastUpdateTimeSubSamplingRatio: timestamp.toString(),
                  packetType: getAnUpdateMode(),
                }),
                stubData.getPus015Packet({
                  serviceType: getAnUpdateMode(),
                  serviceSubType: getAnUpdateMode(),
                  lastUpdateModePacketId: getAnUpdateMode(),
                  lastUpdateTimePacketId: timestamp.toString(),
                  lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
                  lastUpdateTimeSubSamplingRatio: timestamp.toString(),
                  packetType: getAnUpdateMode(),
                }),
              ],
            }),
            stubData.getPus015PacketStore({
              status: getAStatus(),
              lastUpdateModeStoreId: getAnUpdateMode(),
              lastUpdateTimeStoreId: timestamp.toString(),
              lastUpdateModeStoreType: getAnUpdateMode(),
              lastUpdateTimeStoreType: timestamp.toString(),
              lastUpdateModeStoreStatus: getAnUpdateMode(),
              lastUpdateTimeStoreStatus: timestamp.toString(),
              pus015Packet: [
                stubData.getPus015Packet({
                  serviceType: getAnUpdateMode(),
                  serviceSubType: getAnUpdateMode(),
                  lastUpdateModePacketId: getAnUpdateMode(),
                  lastUpdateTimePacketId: timestamp.toString(),
                  lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
                  lastUpdateTimeSubSamplingRatio: timestamp.toString(),
                  packetType: getAnUpdateMode(),
                }),
                stubData.getPus015Packet({
                  serviceType: getAnUpdateMode(),
                  serviceSubType: getAnUpdateMode(),
                  lastUpdateModePacketId: getAnUpdateMode(),
                  lastUpdateTimePacketId: timestamp.toString(),
                  lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
                  lastUpdateTimeSubSamplingRatio: timestamp.toString(),
                  packetType: getAnUpdateMode(),
                }),
              ],
            }),
          ],
        }),
      };
    }
    case 144: {
      return {
        dataType: constants.Pus144ModelType,
        groundDate: timestamp,
        payload: stubData.getPus144ModelProtobuf({
          pus144OnboardFiles: [
            stubData.getPus144OnboardFile({
              fileProtectionStatus: getAFileMode(),
              fileMode: getAFileMode(),
              isFileSizeSet: getABoolean(),
              lastUpdateModeOnBoardFileId: getAnUpdateMode(),
              lastUpdateTimeOnBoardFileId: timestamp.toString(),
              lastUpdateModeFileType: getAnUpdateMode(),
              lastUpdateTimeFileType: timestamp.toString(),
              lastUpdateModeFileSize: getAnUpdateMode(),
              lastUpdateTimeFileSize: timestamp.toString(),
              lastUpdateModeFileCreationTime: getAnUpdateMode(),
              lastUpdateTimeFileCreationTime: timestamp.toString(),
              lastUpdateModeFileProtectionStatus: getAnUpdateMode(),
              lastUpdateTimeFileProtectionStatus: timestamp.toString(),
              lastUpdateModeFileMode: getAnUpdateMode(),
              lastUpdateTimeFileMode: timestamp.toString(),
              lastUpdateModeFileAddress: getAnUpdateMode(),
              lastUpdateTimeFileAddress: timestamp.toString(),
              lastUpdateModeUploadedChecksum: getAnUpdateMode(),
              lastUpdateTimeUploadedChecksum: timestamp.toString(),
              lastUpdateModeComputedChecksum: getAnUpdateMode(),
              lastUpdateTimeComputedChecksum: timestamp.toString(),
            }),
            stubData.getPus144OnboardFile({
              fileProtectionStatus: getAFileMode(),
              fileMode: getAFileMode(),
              isFileSizeSet: getABoolean(),
              lastUpdateModeOnBoardFileId: getAnUpdateMode(),
              lastUpdateTimeOnBoardFileId: timestamp.toString(),
              lastUpdateModeFileType: getAnUpdateMode(),
              lastUpdateTimeFileType: timestamp.toString(),
              lastUpdateModeFileSize: getAnUpdateMode(),
              lastUpdateTimeFileSize: timestamp.toString(),
              lastUpdateModeFileCreationTime: getAnUpdateMode(),
              lastUpdateTimeFileCreationTime: timestamp.toString(),
              lastUpdateModeFileProtectionStatus: getAnUpdateMode(),
              lastUpdateTimeFileProtectionStatus: timestamp.toString(),
              lastUpdateModeFileMode: getAnUpdateMode(),
              lastUpdateTimeFileMode: timestamp.toString(),
              lastUpdateModeFileAddress: getAnUpdateMode(),
              lastUpdateTimeFileAddress: timestamp.toString(),
              lastUpdateModeUploadedChecksum: getAnUpdateMode(),
              lastUpdateTimeUploadedChecksum: timestamp.toString(),
              lastUpdateModeComputedChecksum: getAnUpdateMode(),
              lastUpdateTimeComputedChecksum: timestamp.toString(),
            }),
          ],
        }),
      };
    }
    case 0: {
      return {
        dataType: constants.Pus005ModelType,
        groundDate: timestamp,
        payload: stubData.getPusMmeModelProtobuf(),
      };
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
