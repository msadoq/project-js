const constants = require('../../constants');
const stubs = require('../../utils/stubs');
const predictibleRand = require('../utils/predictibleRand');

const stubData = stubs.getStubData();
const getAFileMode = () => predictibleRand.getFrom(['1', '2']);
const getAStatus = () => predictibleRand.getFrom([1, 2, 3, 200]);
const getAnUpdateMode = () => predictibleRand.getInt([1, 4]);
const getABoolean = () => predictibleRand.getBool();
const getAGroundStatus = () => predictibleRand.getInt([1, 8]).toString();
// correspond to a model payload or a delta payload
const payloadType = (forceModel) => {
  if (forceModel) {
    return 'model';
  }
  return predictibleRand.getBool(0.9) ? 'delta' : 'model';
};

const getDataByPusService = (pusService, serviceApid, timestamp, type) => {
  switch (pusService) {
    case constants.PUS_SERVICE_05: {
      return {
        dataType: constants.Pus05ModelType,
        groundDate: timestamp,
        payload: stubData.getPus005ModelProtobuf({
          pus005OnBoardEvent: [
            stubData.getPus005OnBoardEvent({
              serviceApid,
              onBoardStatus: getAStatus(),
              lastUpdateModeRid: getAnUpdateMode(),
              lastUpdateTimeRid: timestamp.toString(),
              lastUpdateModeOnBoardStatus: getAnUpdateMode(),
              lastUpdateTimeOnBoardStatus: timestamp.toString(),
              lastUpdateModeAlarmLevel: getAnUpdateMode(),
              lastUpdateTimeAlarmLevel: timestamp.toString(),
              defaultOnBoardStatus: getAStatus(),
            }),
            stubData.getPus005OnBoardEvent({
              onBoardStatus: getAStatus(),
              lastUpdateModeRid: getAnUpdateMode(),
              lastUpdateTimeRid: timestamp.toString(),
              lastUpdateModeOnBoardStatus: getAnUpdateMode(),
              lastUpdateTimeOnBoardStatus: timestamp.toString(),
              lastUpdateModeAlarmLevel: getAnUpdateMode(),
              lastUpdateTimeAlarmLevel: timestamp.toString(),
              defaultOnBoardStatus: getAStatus(),
            }),
          ],
          pus005ReceivedOnBoardEvent: [
            {
              apid: 100,
              reportId: 100,
              reportName: 'myString',
              eventType: 100,
              alarmLevel: 'myString',
              onBoardDate: 1527520025823,
              groundDate: 1527520025823,
              parameter: [
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
              ],
            },
            {
              apid: 100,
              reportId: 100,
              reportName: 'myString',
              eventType: 100,
              alarmLevel: 'myString',
              onBoardDate: 1527520025823,
              groundDate: 1527520025823,
              parameter: [
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
                {
                  name: 100,
                  value: 'xxx', // can be anything, including a BLOB. @see ATTRIBUTE.proto
                },
              ],
            },
          ],
        }),
      };
    }
    case constants.PUS_SERVICE_11: {
      const binaryProfile = Math.random().toString(16).substring(2, 15);
      if (type === 'model') {
        return {
          dataType: constants.Pus011ModelType,
          groundDate: timestamp,
          payload: stubData.getPus011ModelProtobuf({
            serviceApid,
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
                serviceApid,
                lastUpdateModeApid: getAnUpdateMode(),
                status: getAStatus(),
                lastUpdateTimeApid: timestamp.toString(),
                uniqueId: 1,
              }),
              stubData.getPus011Apid({
                serviceApid,
                lastUpdateModeApid: getAnUpdateMode(),
                status: getAStatus(),
                lastUpdateTimeApid: timestamp.toString(),
                uniqueId: 2,
              }),
            ],
            pus011SubSchedule: [
              stubData.getPus011SubSchedule({
                serviceApid,
                lastUpdateModeSubScheduleId: getAnUpdateMode(),
                lastUpdateTimeSubscheduleId: timestamp.toString(),
                status: getAStatus(),
                lastUpdateModeStatus: getAnUpdateMode(),
                lastUpdateTimeStatus: timestamp.toString(),
                executionTimeFirstTc: timestamp.toString(),
                lastUpdateModeExecTimeFirstTc: getAnUpdateMode(),
                lastUpdateTimeExecTimeFirstTc: timestamp.toString(),
                uniqueId: 1,
              }),
              stubData.getPus011SubSchedule({
                serviceApid,
                lastUpdateModeSubScheduleId: getAnUpdateMode(),
                lastUpdateTimeSubscheduleId: timestamp.toString(),
                status: getAStatus(),
                lastUpdateModeStatus: getAnUpdateMode(),
                lastUpdateTimeStatus: timestamp.toString(),
                executionTimeFirstTc: timestamp.toString(),
                lastUpdateModeExecTimeFirstTc: getAnUpdateMode(),
                lastUpdateTimeExecTimeFirstTc: timestamp.toString(),
                uniqueId: 2,
              }),
            ],
            pus011Command: [
              stubData.getPus011Command({
                serviceApid,
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
                uniqueId: 1,
              }),
              stubData.getPus011Command({
                serviceApid,
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
                uniqueId: 2,
              }),
            ],
          }),
        };
      }
      const deltaType = predictibleRand.getFrom(['pus011Apid', 'getPus011SubSchedule', 'getPus011Command']);
      switch (deltaType) {
        case 'pus011Apid': {
          return {
            dataType: constants.Pus011ApidType,
            groundDate: timestamp,
            payload: stubData.getPus011ApidProtobuf({
              serviceApid,
              lastUpdateModeApid: getAnUpdateMode(),
              status: getAStatus(),
              lastUpdateTimeApid: timestamp.toString(),
              uniqueId: predictibleRand.getFrom(['1', '2']),
              serviceApidName: predictibleRand.getFrom(['AAA', 'BBB']),
            }),
          };
        }
        case 'getPus011SubSchedule': {
          return {
            dataType: constants.Pus011SubScheduleType,
            groundDate: timestamp,
            payload: stubData.getPus011SubScheduleProtobuf({
              serviceApid,
              lastUpdateModeSubScheduleId: getAnUpdateMode(),
              lastUpdateTimeSubscheduleId: timestamp.toString(),
              status: getAStatus(),
              lastUpdateModeStatus: getAnUpdateMode(),
              lastUpdateTimeStatus: timestamp.toString(),
              executionTimeFirstTc: timestamp.toString(),
              lastUpdateModeExecTimeFirstTc: getAnUpdateMode(),
              lastUpdateTimeExecTimeFirstTc: timestamp.toString(),
              uniqueId: predictibleRand.getFrom(['1', '2']),
              serviceApidName: predictibleRand.getFrom(['CCC', 'DDD']),
            }),
          };
        }
        case 'getPus011Command': {
          return {
            dataType: constants.Pus011CommandType,
            groundDate: timestamp,
            payload: stubData.getPus011CommandProtobuf({
              serviceApid,
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
              uniqueId: predictibleRand.getFrom(['1', '2']),
              serviceApidName: predictibleRand.getFrom(['EEE', 'FFF']),
            }),
          };
        }
        default: {
          return null;
        }
      }
    }
    case constants.PUS_SERVICE_12: {
      return {
        dataType: constants.Pus012ModelType,
        groundDate: timestamp,
        payload: stubData.getPus012ModelProtobuf({
          serviceApid,
          serviceStatus: getAStatus(),
          lastUpdateModeServiceStatus: getAnUpdateMode(),
          lastUpdateTimeServiceStatus: timestamp.toString(),
          pus012ParameterMonitoringDefinition: [
            stubData.getPus012ParameterMonitoringDefinition({
              serviceApid,
              monitoringStatus: getAStatus(),
              checkType: getAStatus(),
              isMonitoringIntervalSet: getABoolean(),
              isRepetitionNumberSet: getABoolean(),
              lastUpdateModeMonInterval: getAnUpdateMode(),
              lastUpdateModeRepetition: getAnUpdateMode(),
              lastUpdateModeMonId: getAnUpdateMode(),
              lastUpdateModeParamId: getAnUpdateMode(),
              lastUpdateModeValParamId: getAnUpdateMode(),
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
              lastUpdateTimeValParamExpectValue: timestamp.toString(),
              lastUpdateTimeValParamMask: timestamp.toString(),
              lastUpdateTimeCheckType: timestamp.toString(),
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
              serviceApid,
              monitoringStatus: getAStatus(),
              checkType: getAStatus(),
              isMonitoringIntervalSet: getABoolean(),
              isRepetitionNumberSet: getABoolean(),
              lastUpdateModeMonInterval: getAnUpdateMode(),
              lastUpdateModeRepetition: getAnUpdateMode(),
              lastUpdateModeMonId: getAnUpdateMode(),
              lastUpdateModeParamId: getAnUpdateMode(),
              lastUpdateModeValParamId: getAnUpdateMode(),
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
              lastUpdateTimeValParamExpectValue: timestamp.toString(),
              lastUpdateTimeValParamMask: timestamp.toString(),
              lastUpdateTimeCheckType: timestamp.toString(),
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
        payload: stubData.getPus014ModelProtobuf({ serviceApid }),
      };
    }
    case constants.PUS_SERVICE_15: {
      return {
        dataType: constants.Pus015ModelType,
        groundDate: timestamp,
        payload: stubData.getPus015ModelProtobuf({
          serviceApid,
          status: getAStatus(),
          pus015PacketStore: [
            stubData.getPus015PacketStore({
              storeStatus: getAStatus(),
              downlinkStatus: getAStatus(),
              lastUpdateModeStoreId: getAnUpdateMode(),
              lastUpdateModeStoreType: getAnUpdateMode(),
              lastUpdateModeStoreStatus: getAnUpdateMode(),
              lastUpdateModeDownlinkStatus: getAnUpdateMode(),
              lastUpdateTimeStoreId: timestamp.toString(),
              lastUpdateTimeStoreType: timestamp.toString(),
              lastUpdateTimeStoreStatus: timestamp.toString(),
              lastUpdateTimeDownlinkStatus: timestamp.toString(),
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
    case 140: {
      return {
        dataType: constants.Pus140ModelType,
        groundDate: timestamp,
        payload: stubData.getPus140ModelProtobuf({
          pus140Parameter: [
            stubData.getPus140Parameter({
              lastUpdateModeCurrentValue: getAnUpdateMode(),
              lastUpdateTimeCurrentValue: timestamp.toString(),
              lastUpdateModeParamId: getAnUpdateMode(),
              lastUpdateTimeParamId: timestamp.toString(),
            }),
            stubData.getPus140Parameter({
              lastUpdateModeCurrentValue: getAnUpdateMode(),
              lastUpdateTimeCurrentValue: timestamp.toString(),
              lastUpdateModeParamId: getAnUpdateMode(),
              lastUpdateTimeParamId: timestamp.toString(),
            }),
          ],
        }),
      };
    }
    case constants.PUS_SERVICE_MME: {
      return {
        dataType: constants.PusMmeModelType,
        groundDate: timestamp,
        payload: stubData.getPusMmeModelProtobuf({ serviceApid }),
      };
    }
    case constants.PUS_SERVICE_144: {
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
module.exports = function getPayload(pusService, serviceApid, timestamp, forceModel) {
  const type = payloadType(forceModel);
  return stubData.getDataStructureProtobuf(
    getDataByPusService(pusService, serviceApid, timestamp, type)
  );
};
