const constants = require('../../constants');
const stubs = require('../../utils/stubs');
const predictibleRand = require('../utils/predictibleRand');

const stubData = stubs.getStubData();
const getAtransfertType = () => predictibleRand.getInt([1, 2]);
const getAFileMode = () => predictibleRand.getFrom(['1', '2']);
const getAStatus = () => predictibleRand.getFrom([1, 2, 3, 200]);
// CHECK_TYPE(PUS12), LARGE_TRANSFER_PART_STATUS(PUS 13)
const getACheckType = () => predictibleRand.getInt([1, 4]).toString();
const getALtGroundStatus = () => predictibleRand.getInt([1, 7]).toString();
const getAnUpdateMode = () => predictibleRand.getInt([1, 4]);
const getABoolean = () => predictibleRand.getBool();
const getAGroundStatus = () => predictibleRand.getInt([1, 8]).toString();
// correspond to a model payload or a delta payload
const payloadType = (forceModel, continuous) => {
  // first initialise, we need a model, forceModel = true
  // when vima is in play mode, only deltas are sending, continuous = true
  if (continuous) {
    return 'delta';
  } else if (forceModel) {
    return 'model';
  }
  return predictibleRand.getBool(0.9) ? 'delta' : 'model';
};

const getPus05Payload = (timestamp, serviceApid, type) => {
  if (type === 'model') {
    return {
      dataType: constants.Pus05ModelType,
      groundDate: timestamp,
      payload: stubData.getPus005ModelProtobuf({
        serviceApid,
        pus005OnBoardEvent: [
          stubData.getPus005OnBoardEvent({
            serviceApid,
            onBoardStatus: getAStatus(),
            defaultOnBoardStatus: getAStatus(),
            lastUpdateModeRid: getAnUpdateMode(),
            lastUpdateModeOnBoardStatus: getAnUpdateMode(),
            lastUpdateModeAlarmLevel: getAnUpdateMode(),
            lastUpdateTimeRid: timestamp.toString(),
            lastUpdateTimeOnBoardStatus: timestamp.toString(),
            lastUpdateTimeAlarmLevel: timestamp.toString(),
          }),
          stubData.getPus005OnBoardEvent({
            serviceApid,
            onBoardStatus: getAStatus(),
            defaultOnBoardStatus: getAStatus(),
            lastUpdateModeRid: getAnUpdateMode(),
            lastUpdateModeOnBoardStatus: getAnUpdateMode(),
            lastUpdateModeAlarmLevel: getAnUpdateMode(),
            lastUpdateTimeRid: timestamp.toString(),
            lastUpdateTimeOnBoardStatus: timestamp.toString(),
            lastUpdateTimeAlarmLevel: timestamp.toString(),
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
  const deltaType = predictibleRand.getFrom(['getPus005OnBoardEvent', 'getPus005ReceivedOnBoardEvent']);
  switch (deltaType) {
    case 'getPus005OnBoardEvent': {
      return {
        dataType: constants.Pus005OnBoardEventType,
        groundDate: timestamp,
        payload: stubData.getPus005OnBoardEventProtobuf({
          serviceApid,
          lastUpdateModeApid: getAnUpdateMode(),
          status: getAStatus(),
          lastUpdateTimeApid: timestamp.toString(),
          uniqueId: predictibleRand.getFrom(['1', '2']),
          apidName: predictibleRand.getFrom(['apidName1', 'apidName2', 'apidName3', 'apidName4']),
        }),
      };
    }
    case 'getPus005ReceivedOnBoardEvent': {
      return {
        // constante manquante
        dataType: constants.pus005ReceivedOnBoardEvent,
        groundDate: timestamp,
        // connection à un OnBoardAlarm.proto de DC
        payload: stubData.getpus005ReceivedOnBoardEventProtobuf({
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
          ssIdLabel: predictibleRand.getFrom(['ssid1', 'ssid2', 'ssid3', 'ssid4']),
        }),
      };
    }
    default: {
      return null;
    }
  }
};
const getPus11Payload = (timestamp, serviceApid, type, binaryProfile) => {
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
          apidName: predictibleRand.getFrom(['apidName1', 'apidName2', 'apidName3', 'apidName4']),
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
          ssIdLabel: predictibleRand.getFrom(['ssid1', 'ssid2', 'ssid3', 'ssid4']),
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
          commandName: predictibleRand.getFrom(['Command1', 'Command2', 'Command3', 'Command4']),
        }),
      };
    }
    default: {
      return null;
    }
  }
};
const getPus12Payload = (timestamp, serviceApid) => ({
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
        checkType: getACheckType(),
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
        checkType: getACheckType(),
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
});
const getPus13Payload = (timestamp, serviceApid) => ({
  dataType: constants.Pus013ModelType,
  groundDate: timestamp,
  payload: stubData.getPus013ModelProtobuf({
    serviceApid,
    pus013UplinkLdt: [
      stubData.getPus013Ltd({
        serviceApid,
        status: getALtGroundStatus(),
        transferType: getAtransfertType(),
        lastUpdateModeLduId: getAnUpdateMode(),
        lastUpdateModeStatus: getAnUpdateMode(),
        lastUpdateModeStartTime: getAnUpdateMode(),
        lastUpdateModeEndTime: getAnUpdateMode(),
        lastUpdateModeSize: getAnUpdateMode(),
        lastUpdateModeRemainSize: getAnUpdateMode(),
        lastUpdateModePercent: getAnUpdateMode(),
        lastUpdateModeFailureCode: getAnUpdateMode(),
        lastUpdateModeFileChecksum: getAnUpdateMode(),
        lastUpdateTimeLduId: timestamp.toString(),
        lastUpdateTimeStatus: timestamp.toString(),
        lastUpdateTimeStartTime: timestamp.toString(),
        lastUpdateTimeEndTime: timestamp.toString(),
        lastUpdateTimeSize: timestamp.toString(),
        lastUpdateTimeRemainSize: timestamp.toString(),
        lastUpdateTimePercent: timestamp.toString(),
        lastUpdateTimeFailureCode: timestamp.toString(),
        lastUpdateTimeFileChecksum: timestamp.toString(),
        pus013LdtPart: [
          stubData.getPus013LtdPart({
            status: getACheckType(), // LARGE_TRANSFER_PART_STATUS
          }),
          stubData.getPus013LtdPart({
            status: getACheckType(),
          }),
        ],
      }),
      stubData.getPus013Ltd({
        serviceApid,
        status: getALtGroundStatus(),
        transferType: getAtransfertType(),
        lastUpdateModeLduId: getAnUpdateMode(),
        lastUpdateModeStatus: getAnUpdateMode(),
        lastUpdateModeStartTime: getAnUpdateMode(),
        lastUpdateModeEndTime: getAnUpdateMode(),
        lastUpdateModeSize: getAnUpdateMode(),
        lastUpdateModeRemainSize: getAnUpdateMode(),
        lastUpdateModePercent: getAnUpdateMode(),
        lastUpdateModeFailureCode: getAnUpdateMode(),
        lastUpdateModeFileChecksum: getAnUpdateMode(),
        lastUpdateTimeLduId: timestamp.toString(),
        lastUpdateTimeStatus: timestamp.toString(),
        lastUpdateTimeStartTime: timestamp.toString(),
        lastUpdateTimeEndTime: timestamp.toString(),
        lastUpdateTimeSize: timestamp.toString(),
        lastUpdateTimeRemainSize: timestamp.toString(),
        lastUpdateTimePercent: timestamp.toString(),
        lastUpdateTimeFailureCode: timestamp.toString(),
        lastUpdateTimeFileChecksum: timestamp.toString(),
        pus013LdtPart: [
          stubData.getPus013LtdPart({
            status: getACheckType(), // LARGE_TRANSFER_PART_STATUS
          }),
          stubData.getPus013LtdPart({
            status: getACheckType(),
          }),
        ],
      }),
    ],
    pus013DownlinkLdt: [
      stubData.getPus013Ltd({
        serviceApid,
        status: getALtGroundStatus(),
        transferType: getAtransfertType(),
        lastUpdateModeLduId: getAnUpdateMode(),
        lastUpdateModeStatus: getAnUpdateMode(),
        lastUpdateModeStartTime: getAnUpdateMode(),
        lastUpdateModeEndTime: getAnUpdateMode(),
        lastUpdateModeSize: getAnUpdateMode(),
        lastUpdateModeRemainSize: getAnUpdateMode(),
        lastUpdateModePercent: getAnUpdateMode(),
        lastUpdateModeFailureCode: getAnUpdateMode(),
        lastUpdateModeFileChecksum: getAnUpdateMode(),
        lastUpdateTimeLduId: timestamp.toString(),
        lastUpdateTimeStatus: timestamp.toString(),
        lastUpdateTimeStartTime: timestamp.toString(),
        lastUpdateTimeEndTime: timestamp.toString(),
        lastUpdateTimeSize: timestamp.toString(),
        lastUpdateTimeRemainSize: timestamp.toString(),
        lastUpdateTimePercent: timestamp.toString(),
        lastUpdateTimeFailureCode: timestamp.toString(),
        lastUpdateTimeFileChecksum: timestamp.toString(),
        pus013LdtPart: [
          stubData.getPus013LtdPart({
            status: getACheckType(), // LARGE_TRANSFER_PART_STATUS
          }),
          stubData.getPus013LtdPart({
            status: getACheckType(),
          }),
        ],
      }),
      stubData.getPus013Ltd({
        serviceApid,
        status: getALtGroundStatus(),
        transferType: getAtransfertType(),
        lastUpdateModeLduId: getAnUpdateMode(),
        lastUpdateModeStatus: getAnUpdateMode(),
        lastUpdateModeStartTime: getAnUpdateMode(),
        lastUpdateModeEndTime: getAnUpdateMode(),
        lastUpdateModeSize: getAnUpdateMode(),
        lastUpdateModeRemainSize: getAnUpdateMode(),
        lastUpdateModePercent: getAnUpdateMode(),
        lastUpdateModeFailureCode: getAnUpdateMode(),
        lastUpdateModeFileChecksum: getAnUpdateMode(),
        lastUpdateTimeLduId: timestamp.toString(),
        lastUpdateTimeStatus: timestamp.toString(),
        lastUpdateTimeStartTime: timestamp.toString(),
        lastUpdateTimeEndTime: timestamp.toString(),
        lastUpdateTimeSize: timestamp.toString(),
        lastUpdateTimeRemainSize: timestamp.toString(),
        lastUpdateTimePercent: timestamp.toString(),
        lastUpdateTimeFailureCode: timestamp.toString(),
        lastUpdateTimeFileChecksum: timestamp.toString(),
        pus013LdtPart: [
          stubData.getPus013LtdPart({
            status: getACheckType(), // LARGE_TRANSFER_PART_STATUS
          }),
          stubData.getPus013LtdPart({
            status: getACheckType(),
          }),
        ],
      }),
    ],
  }),
});
const getPus14Payload = (timestamp, serviceApid, type) => {
  if (type === 'model') {
    return {
      dataType: constants.Pus014ModelType,
      groundDate: timestamp,
      payload: stubData.getPus014ModelProtobuf({
        serviceApid,
        pus014TmPacket: [
          stubData.getPus014ForwardingPacket({
            serviceApid,
            status: getAStatus(),
            forwardingStatus: getAStatus(),
            forwardingStatusRidSid: getAStatus(),
            lastUpdateModeTypeSubType: getAnUpdateMode(),
            lastUpdateModeFwdStatus: getAnUpdateMode(),
            lastUpdateModeRid: getAnUpdateMode(),
            lastUpdateModeSid: getAnUpdateMode(),
            lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
            lastUpdateModeFwdStatusTypeRidSid: getAnUpdateMode(),
          }),
          stubData.getPus014ForwardingPacket({
            serviceApid,
            status: getAStatus(),
            forwardingStatus: getAStatus(),
            forwardingStatusRidSid: getAStatus(),
            lastUpdateModeTypeSubType: getAnUpdateMode(),
            lastUpdateModeFwdStatus: getAnUpdateMode(),
            lastUpdateModeRid: getAnUpdateMode(),
            lastUpdateModeSid: getAnUpdateMode(),
            lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
            lastUpdateModeFwdStatusTypeRidSid: getAnUpdateMode(),
          }),
        ],
      }),
    };
  }
  // case type === delta
  return {
    dataType: constants.Pus014ForwardPacketType,
    groundDate: timestamp,
    payload: stubData.getPus014ForwardingPacketProtobuf({
      serviceApid,
      status: getAStatus(),
      forwardingStatus: getAStatus(),
      forwardingStatusRidSid: getAStatus(),
      lastUpdateModeTypeSubType: getAnUpdateMode(),
      lastUpdateModeFwdStatus: getAnUpdateMode(),
      lastUpdateModeRid: getAnUpdateMode(),
      lastUpdateModeSid: getAnUpdateMode(),
      lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
      lastUpdateModeFwdStatusTypeRidSid: getAnUpdateMode(),
    }),
  };
};
const getPus15Payload = (timestamp, serviceApid, type) => {
  if (type === 'model') {
    return {
      dataType: constants.Pus015ModelType,
      groundDate: timestamp,
      payload: stubData.getPus015ModelProtobuf({
        serviceApid,
        status: getAStatus(),
        pus015PacketStore: [
          stubData.getPus015PacketStore({
            serviceApid,
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
                serviceApid,
                isSubsamplingRatioSet: getABoolean(),
                lastUpdateModePacketId: getAnUpdateMode(),
                lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
                lastUpdateTimePacketId: timestamp.toString(),
                lastUpdateTimeSubSamplingRatio: timestamp.toString(),
              }),
              stubData.getPus015Packet({
                serviceApid,
                isSubsamplingRatioSet: getABoolean(),
                lastUpdateModePacketId: getAnUpdateMode(),
                lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
                lastUpdateTimePacketId: timestamp.toString(),
                lastUpdateTimeSubSamplingRatio: timestamp.toString(),
              }),
            ],
          }),
          stubData.getPus015PacketStore({
            serviceApid,
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
                serviceApid,
                isSubsamplingRatioSet: getABoolean(),
                lastUpdateModePacketId: getAnUpdateMode(),
                lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
                lastUpdateTimePacketId: timestamp.toString(),
                lastUpdateTimeSubSamplingRatio: timestamp.toString(),
              }),
              stubData.getPus015Packet({
                serviceApid,
                isSubsamplingRatioSet: getABoolean(),
                lastUpdateModePacketId: getAnUpdateMode(),
                lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
                lastUpdateTimePacketId: timestamp.toString(),
                lastUpdateTimeSubSamplingRatio: timestamp.toString(),
              }),
            ],
          }),
        ],
      }),
    };
  }
  // case type === delta
  return {
    dataType: constants.Pus015PacketType,
    groundDate: timestamp,
    payload: stubData.getPus015PacketProtobuf({
      serviceApid,
      status: getAStatus(),
      forwardingStatus: getAStatus(),
      forwardingStatusRidSid: getAStatus(),
      lastUpdateModeTypeSubType: getAnUpdateMode(),
      lastUpdateModeFwdStatus: getAnUpdateMode(),
      lastUpdateModeRid: getAnUpdateMode(),
      lastUpdateModeSid: getAnUpdateMode(),
      lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
      lastUpdateModeFwdStatusTypeRidSid: getAnUpdateMode(),
    }),
  };
};
const getPus18Payload = (timestamp, serviceApid) => ({
  dataType: constants.Pus018ModelType,
  groundDate: timestamp,
  payload: stubData.getPus018ModelProtobuf({
    serviceApid,
    engineStatus: getAStatus(),
    lastUpdateModeEngineStatus: getAnUpdateMode(),
    pus018Obcp: [
      stubData.getPus018Obcp({
        serviceApid,
        status: getAStatus(),
        downlinkStatus: getAStatus(),
        lastUpdateModeObcpId: getAnUpdateMode(),
        lastUpdateModeStatus: getAnUpdateMode(),
        lastUpdateModeStepId: getAnUpdateMode(),
        lastUpdateModePartitionId: getAnUpdateMode(),
        lastUpdateModeObsLevel: getAnUpdateMode(),
        lastUpdateModePriority: getAnUpdateMode(),
        lastUpdateTimeObcpId: timestamp.toString(),
        lastUpdateTimeStatus: timestamp.toString(),
        lastUpdateTimeStepId: timestamp.toString(),
        lastUpdateTimePartitionId: timestamp.toString(),
        lastUpdateTimeObsLevel: timestamp.toString(),
        lastUpdateTimePriority: timestamp.toString(),
      }),
      stubData.getPus018Obcp({
        serviceApid,
        status: getAStatus(),
        downlinkStatus: getAStatus(),
        lastUpdateModeObcpId: getAnUpdateMode(),
        lastUpdateModeStatus: getAnUpdateMode(),
        lastUpdateModeStepId: getAnUpdateMode(),
        lastUpdateModePartitionId: getAnUpdateMode(),
        lastUpdateModeObsLevel: getAnUpdateMode(),
        lastUpdateModePriority: getAnUpdateMode(),
        lastUpdateTimeObcpId: timestamp.toString(),
        lastUpdateTimeStatus: timestamp.toString(),
        lastUpdateTimeStepId: timestamp.toString(),
        lastUpdateTimePartitionId: timestamp.toString(),
        lastUpdateTimeObsLevel: timestamp.toString(),
        lastUpdateTimePriority: timestamp.toString(),
      }),
    ],
  }),
});
const getPus19Payload = (timestamp, serviceApid, binaryProfile) => ({
  dataType: constants.Pus019ModelType,
  groundDate: timestamp,
  payload: stubData.getPus019ModelProtobuf({
    serviceStatus: getAStatus(),
    lastUpdateModeServiceStatus: getAnUpdateMode(),
    lastUpdateTimeServiceStatus: timestamp.toString(),
    pus19EventAction: [
      stubData.getPus019EventAction({
        actionStatus: getAStatus(),
        lastUpdateModeActionStatus: getAnUpdateMode(),
        lastUpdateModeEventActionRid: getAnUpdateMode(),
        lastUpdateModeActionTc: getAnUpdateMode(),
        lastUpdateTimeActionStatus: timestamp.toString(),
        lastUpdateTimeEventActionRid: timestamp.toString(),
        lastUpdateTimeActionTc: timestamp.toString(),
        actionTcPacket: `${binaryProfile}${binaryProfile}${binaryProfile}${binaryProfile}`,
      }),
      stubData.getPus019EventAction({
        actionStatus: getAStatus(),
        lastUpdateModeActionStatus: getAnUpdateMode(),
        lastUpdateModeEventActionRid: getAnUpdateMode(),
        lastUpdateModeActionTc: getAnUpdateMode(),
        lastUpdateTimeActionStatus: timestamp.toString(),
        lastUpdateTimeEventActionRid: timestamp.toString(),
        lastUpdateTimeActionTc: timestamp.toString(),
        actionTcPacket: `${binaryProfile}${binaryProfile}${binaryProfile}${binaryProfile}`,
      }),
    ],
  }),
});
const getPus140Payload = (timestamp, serviceApid) => ({
  dataType: constants.Pus140ModelType,
  groundDate: timestamp,
  payload: stubData.getPus140ModelProtobuf({
    pus140Parameter: [
      stubData.getPus140Parameter({
        serviceApid,
        lastUpdateModeCurrentValue: getAnUpdateMode(),
        lastUpdateModeParamId: getAnUpdateMode(),
        lastUpdateTimeCurrentValue: timestamp.toString(),
        lastUpdateTimeParamId: timestamp.toString(),
      }),
      stubData.getPus140Parameter({
        serviceApid,
        lastUpdateModeCurrentValue: getAnUpdateMode(),
        lastUpdateModeParamId: getAnUpdateMode(),
        lastUpdateTimeCurrentValue: timestamp.toString(),
        lastUpdateTimeParamId: timestamp.toString(),
      }),
    ],
  }),
});
const getPus144Payload = (timestamp, serviceApid) => ({
  dataType: constants.Pus144ModelType,
  groundDate: timestamp,
  payload: stubData.getPus144ModelProtobuf({
    serviceApid,
    pus144OnboardFiles: [
      stubData.getPus144OnboardFile({
        serviceApid,
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
        serviceApid,
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
});
const getPusMMEPayload = (timestamp, serviceApid, type) => {
  if (type === 'model') {
    return {
      dataType: constants.PusMmeModelType,
      groundDate: timestamp,
      payload: stubData.getPusMmeModelProtobuf({
        pusMmePacket: [
          stubData.getPusMmePacket({
            serviceApid,
            status: getAStatus(),
            forwardingStatus: getAStatus(),
            forwardingStatusRidSid: getAStatus(),
            lastUpdateModeSid: getAnUpdateMode(),
            lastUpdateModeStatus: getAnUpdateMode(),
            lastUpdateModeValidParamId: getAnUpdateMode(),
            lastUpdateModeValidParamExpValue: getAnUpdateMode(),
            lastUpdateModeCollectInterval: getAnUpdateMode(),
            lastUpdateModeFwdStatusTypeSubtype: getAnUpdateMode(),
            lastUpdateModeFwdStatusTypeRidSid: getAnUpdateMode(),
            lastUpdateModeGenMode: getAnUpdateMode(),
            pusMmePacketStore: [
              stubData.getPusMmePacketStore({
                storeStatus: getAStatus(),
                lastUpdateModeStoreId: getAnUpdateMode(),
                lastUpdateModeStoreStatus: getAnUpdateMode(),
                lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
              }),
              stubData.getPusMmePacketStore({
                storeStatus: getAStatus(),
                lastUpdateModeStoreId: getAnUpdateMode(),
                lastUpdateModeStoreStatus: getAnUpdateMode(),
                lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
              }),
            ],
            pusMmePacketParameter: [
              stubData.getPusMmePacketParameter({
                lastUpdateModeParameterId: getAnUpdateMode(),
                lastUpdateModeFilteredStatus: getAnUpdateMode(),
              }),
              stubData.getPusMmePacketParameter({
                lastUpdateModeParameterId: getAnUpdateMode(),
                lastUpdateModeFilteredStatus: getAnUpdateMode(),
              }),
            ],
          }),
          stubData.getPusMmePacket({
            serviceApid,
            status: getAStatus(),
            forwardingStatus: getAStatus(),
            forwardingStatusRidSid: getAStatus(),
            lastUpdateModeSid: getAnUpdateMode(),
            lastUpdateModeStatus: getAnUpdateMode(),
            lastUpdateModeValidParamId: getAnUpdateMode(),
            lastUpdateModeValidParamExpValue: getAnUpdateMode(),
            lastUpdateModeCollectInterval: getAnUpdateMode(),
            lastUpdateModeFwdStatusTypeSubtype: getAnUpdateMode(),
            lastUpdateModeFwdStatusTypeRidSid: getAnUpdateMode(),
            lastUpdateModeGenMode: getAnUpdateMode(),
            pusMmePacketStore: [
              stubData.getPusMmePacketStore({
                storeStatus: getAStatus(),
                lastUpdateModeStoreId: getAnUpdateMode(),
                lastUpdateModeStoreStatus: getAnUpdateMode(),
                lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
              }),
              stubData.getPusMmePacketStore({
                storeStatus: getAStatus(),
                lastUpdateModeStoreId: getAnUpdateMode(),
                lastUpdateModeStoreStatus: getAnUpdateMode(),
                lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
              }),
            ],
            pusMmePacketParameter: [
              stubData.getPusMmePacketParameter({
                lastUpdateModeParameterId: getAnUpdateMode(),
                lastUpdateModeFilteredStatus: getAnUpdateMode(),
              }),
              stubData.getPusMmePacketParameter({
                lastUpdateModeParameterId: getAnUpdateMode(),
                lastUpdateModeFilteredStatus: getAnUpdateMode(),
              }),
            ],
          }),
        ],
      }),
    };
  }
  return {
    dataType: constants.PusMmePacketType,
    groundDate: timestamp,
    payload: stubData.getPusMmePacketProtobuf({
      serviceApid,
      status: getAStatus(),
      forwardingStatus: getAStatus(),
      forwardingStatusRidSid: getAStatus(),
      lastUpdateModeSid: getAnUpdateMode(),
      lastUpdateModeStatus: getAnUpdateMode(),
      lastUpdateModeValidParamId: getAnUpdateMode(),
      lastUpdateModeValidParamExpValue: getAnUpdateMode(),
      lastUpdateModeCollectInterval: getAnUpdateMode(),
      lastUpdateModeFwdStatusTypeSubtype: getAnUpdateMode(),
      lastUpdateModeFwdStatusTypeRidSid: getAnUpdateMode(),
      lastUpdateModeGenMode: getAnUpdateMode(),
      pusMmePacketStore: [
        stubData.getPusMmePacketStore({
          storeStatus: getAStatus(),
          lastUpdateModeStoreId: getAnUpdateMode(),
          lastUpdateModeStoreStatus: getAnUpdateMode(),
          lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
        }),
        stubData.getPusMmePacketStore({
          storeStatus: getAStatus(),
          lastUpdateModeStoreId: getAnUpdateMode(),
          lastUpdateModeStoreStatus: getAnUpdateMode(),
          lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
        }),
      ],
      pusMmePacketParameter: [
        stubData.getPusMmePacketParameter({
          lastUpdateModeParameterId: getAnUpdateMode(),
          lastUpdateModeFilteredStatus: getAnUpdateMode(),
        }),
        stubData.getPusMmePacketParameter({
          lastUpdateModeParameterId: getAnUpdateMode(),
          lastUpdateModeFilteredStatus: getAnUpdateMode(),
        }),
      ],
    }),
  };
};

const getDataByPusService = (pusService, serviceApid, timestamp, type) => {
  const binaryProfile = Math.random().toString(16).substring(2, 15);
  const pusServices = {
    [constants.PUS_SERVICE_05]: getPus05Payload(timestamp, serviceApid, type),
    [constants.PUS_SERVICE_11]: getPus11Payload(timestamp, serviceApid, type, binaryProfile),
    [constants.PUS_SERVICE_12]: getPus12Payload(timestamp, serviceApid, type),
    [constants.PUS_SERVICE_13]: getPus13Payload(timestamp, serviceApid, type),
    [constants.PUS_SERVICE_14]: getPus14Payload(timestamp, serviceApid, type),
    [constants.PUS_SERVICE_15]: getPus15Payload(timestamp, serviceApid, type),
    [constants.PUS_SERVICE_18]: getPus18Payload(timestamp, serviceApid, type),
    [constants.PUS_SERVICE_19]: getPus19Payload(timestamp, serviceApid, type, binaryProfile),
    [constants.PUS_SERVICE_140]: getPus140Payload(timestamp, serviceApid, type),
    [constants.PUS_SERVICE_MME]: getPusMMEPayload(timestamp, serviceApid, type),
    [constants.PUS_SERVICE_144]: getPus144Payload(timestamp, serviceApid, type),
  };
  return pusServices[pusService];
};


/**
 * Generate payload for stubs
 * @param  {number} timestamp Timestamp for the generated payload
 * @param  {object} dataId
 * @param  {Object} options   Options for generation
 * @return {Object}           Generated payload
 */
module.exports = function getPayload(pusService, serviceApid, timestamp, forceModel, continuous) {
  const type = payloadType(forceModel, continuous);
  return stubData.getDataStructureProtobuf(
    getDataByPusService(pusService, serviceApid, timestamp, type)
  );
};
