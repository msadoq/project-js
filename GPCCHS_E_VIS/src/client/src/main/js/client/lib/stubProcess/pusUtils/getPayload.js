const constants = require('../../constants');
const stubs = require('../../utils/stubs');
const predictibleRand = require('../utils/predictibleRand');
const moment = require('moment/moment');

const getAnUpdateTime = timestamp =>
  moment(new Date(timestamp)).format(constants.DATE_FORMAT_TAI);
const stubData = stubs.getStubData();
const getAtransfertType = () => predictibleRand.getInt([1, 2]);
const getAFileMode = () => predictibleRand.getFrom(['1', '2']);
const getAStatus = () => predictibleRand.getFrom([1, 2, 3, 200]);

// CHECK_TYPE(PUS12),
// LARGE_TRANSFER_PART_STATUS(PUS 13),
// FUNCTIONAL_MONITORING_CHECKING_STATUS(PUS142),
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
  const formatedTime = getAnUpdateTime(timestamp);
  if (type === 'model') {
    return {
      dataType: constants.Pus005ModelType,
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
            lastUpdateTimeRid: formatedTime,
            lastUpdateTimeOnBoardStatus: formatedTime,
            lastUpdateTimeAlarmLevel: formatedTime,
          }),
          stubData.getPus005OnBoardEvent({
            serviceApid,
            onBoardStatus: getAStatus(),
            defaultOnBoardStatus: getAStatus(),
            lastUpdateModeRid: getAnUpdateMode(),
            lastUpdateModeOnBoardStatus: getAnUpdateMode(),
            lastUpdateModeAlarmLevel: getAnUpdateMode(),
            lastUpdateTimeRid: formatedTime,
            lastUpdateTimeOnBoardStatus: formatedTime,
            lastUpdateTimeAlarmLevel: formatedTime,
          }),
        ],
        pus005ReceivedOnBoardEvent: [
          {
            apid: 100,
            reportId: 100,
            reportName: 'myString',
            eventType: 100,
            alarmLevel: 'myString',
            onBoardDate: formatedTime,
            groundDate: formatedTime,
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
            onBoardDate: formatedTime,
            groundDate: formatedTime,
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
  // TODO @jrabreau
  const deltaType = predictibleRand.getFrom(['getPus005OnBoardEvent'/* , 'getPus005ReceivedOnBoardEvent' */]);
  switch (deltaType) {
    case 'getPus005OnBoardEvent': {
      return {
        dataType: constants.Pus005OnBoardEventType,
        groundDate: timestamp,
        payload: stubData.getPus005OnBoardEventProtobuf({
          serviceApid,
          lastUpdateModeApid: getAnUpdateMode(),
          status: getAStatus(),
          lastUpdateTimeApid: formatedTime,
          uniqueId: predictibleRand.getFrom(['1', '2']),
          apidName: predictibleRand.getFrom(['apidName1', 'apidName2', 'apidName3', 'apidName4']),
        }),
      };
    }
    case 'getPus005ReceivedOnBoardEvent': {
      return {
        // constante manquante
        dataType: constants.Pus005ReceivedOnBoardEventType,
        groundDate: timestamp,
        // connection à un OnBoardAlarm.proto de DC
        payload: {},
        // stubData.getPus005ReceivedOnBoardEventProtobuf({
        //   serviceApid,
        //   status: getAStatus(),
        //   uniqueId: predictibleRand.getFrom(['1', '2']),
        //   ssIdLabel: predictibleRand.getFrom(['ssid1', 'ssid2', 'ssid3', 'ssid4']),
        //   lastUpdateModeSubScheduleId: getAnUpdateMode(),
        //   lastUpdateModeStatus: getAnUpdateMode(),
        //   lastUpdateModeExecTimeFirstTc: getAnUpdateMode(),
        //   executionTimeFirstTc: formatedTime,
        //   lastUpdateTimeSubscheduleId: formatedTime,
        //   lastUpdateTimeStatus: formatedTime,
        //   lastUpdateTimeExecTimeFirstTc: formatedTime,
        // }),
      };
    }
    default: {
      return null;
    }
  }
};
const getPus11Payload = (timestamp, serviceApid, type, binaryProfile) => {
  const formatedTime = getAnUpdateTime(timestamp);
  if (type === 'model') {
    return {
      dataType: constants.Pus011ModelType,
      groundDate: timestamp,
      payload: stubData.getPus011ModelProtobuf({
        serviceApid,
        status: getAStatus(),
        scheduleStatus: getAStatus(),
        spaceInNumberOfCommands: getABoolean(),
        lastUpdateModeScheduleStatus: getAnUpdateMode(),
        lastUpdateModeNoFreeCommands: getAnUpdateMode(),
        lastUpdateModeFreeSpace: getAnUpdateMode(),
        lastUpdateTimeScheduleStatus: formatedTime,
        lastUpdateTimeNoFreeCommands: formatedTime,
        lastUpdateTimeFreeSpace: formatedTime,
        pus011Apid: [
          stubData.getPus011Apid({
            serviceApid,
            status: getAStatus(),
            lastUpdateModeApid: getAnUpdateMode(),
            lastUpdateTimeApid: formatedTime,
            uniqueId: 1,
          }),
          stubData.getPus011Apid({
            serviceApid,
            lastUpdateModeApid: getAnUpdateMode(),
            status: getAStatus(),
            lastUpdateTimeApid: formatedTime,
            uniqueId: 2,
          }),
        ],
        pus011SubSchedule: [
          stubData.getPus011SubSchedule({
            serviceApid,
            lastUpdateModeSubScheduleId: getAnUpdateMode(),
            lastUpdateTimeSubscheduleId: formatedTime,
            status: getAStatus(),
            lastUpdateModeStatus: getAnUpdateMode(),
            lastUpdateTimeStatus: formatedTime,
            executionTimeFirstTc: formatedTime,
            lastUpdateModeExecTimeFirstTc: getAnUpdateMode(),
            lastUpdateTimeExecTimeFirstTc: formatedTime,
            uniqueId: 1,
          }),
          stubData.getPus011SubSchedule({
            serviceApid,
            lastUpdateModeSubScheduleId: getAnUpdateMode(),
            lastUpdateTimeSubscheduleId: formatedTime,
            status: getAStatus(),
            lastUpdateModeStatus: getAnUpdateMode(),
            lastUpdateTimeStatus: formatedTime,
            executionTimeFirstTc: formatedTime,
            lastUpdateModeExecTimeFirstTc: getAnUpdateMode(),
            lastUpdateTimeExecTimeFirstTc: formatedTime,
            uniqueId: 2,
          }),
        ],
        pus011Command: [
          stubData.getPus011Command({
            serviceApid,
            lastUpdateModeCommandId: getAnUpdateMode(),
            lastUpdateTimeCommandId: formatedTime,
            commandStatus: getAStatus(),
            lastUpdateModeStatus: getAnUpdateMode(),
            lastUpdateTimeStatus: formatedTime,
            commandGroundStatus: getAGroundStatus(),
            lastUpdateModeGroundStatus: getAnUpdateMode(),
            lastUpdateTimeGroundStatus: formatedTime,
            initialExecutionTime: formatedTime,
            lastUpdateModeInitialExecTime: getAnUpdateMode(),
            lastUpdateTimeInitialExecTime: formatedTime,
            currentExecutionTime: formatedTime,
            lastUpdateModeCurrentExecTime: getAnUpdateMode(),
            lastUpdateTimeCurrentExecTime: formatedTime,
            lastUpdateModeTotalTimeShiftOffset: getAnUpdateMode(),
            lastUpdateTimeTotalTimeShiftOffset: formatedTime,
            commandBinaryProfile: `${binaryProfile}${binaryProfile}${binaryProfile}${binaryProfile}`,
            lastUpdateModeBinProf: getAnUpdateMode(),
            lastUpdateTimeBinProf: formatedTime,
            pus011CommandParameters: [
              stubData.getPus011CommandParameter({
                lastUpdateMode: getAnUpdateMode(),
                lastUpdateTime: formatedTime,
              }),
              stubData.getPus011CommandParameter({
                lastUpdateMode: getAnUpdateMode(),
                lastUpdateTime: formatedTime,
              }),
            ],
            pus011TimeShift: [
              stubData.getPus011TimeShift({
                applicationTime: formatedTime,
                lastUpdateMode: getAnUpdateMode(),
                lastUpdateTime: formatedTime,
              }),
              stubData.getPus011TimeShift({
                applicationTime: formatedTime,
                lastUpdateMode: getAnUpdateMode(),
                lastUpdateTime: formatedTime,
              }),
            ],
            uniqueId: 1,
          }),
          stubData.getPus011Command({
            serviceApid,
            lastUpdateModeCommandId: getAnUpdateMode(),
            lastUpdateTimeCommandId: formatedTime,
            commandStatus: getAStatus(),
            lastUpdateModeStatus: getAnUpdateMode(),
            lastUpdateTimeStatus: formatedTime,
            commandGroundStatus: getAGroundStatus(),
            lastUpdateModeGroundStatus: getAnUpdateMode(),
            lastUpdateTimeGroundStatus: formatedTime,
            initialExecutionTime: formatedTime,
            lastUpdateModeInitialExecTime: getAnUpdateMode(),
            lastUpdateTimeInitialExecTime: formatedTime,
            currentExecutionTime: formatedTime,
            lastUpdateModeCurrentExecTime: getAnUpdateMode(),
            lastUpdateTimeCurrentExecTime: formatedTime,
            lastUpdateModeTotalTimeShiftOffset: getAnUpdateMode(),
            lastUpdateTimeTotalTimeShiftOffset: formatedTime,
            commandBinaryProfile: `${binaryProfile}${binaryProfile}${binaryProfile}${binaryProfile}`,
            lastUpdateModeBinProf: getAnUpdateMode(),
            lastUpdateTimeBinProf: formatedTime,
            pus011CommandParameters: [
              stubData.getPus011CommandParameter({
                lastUpdateMode: getAnUpdateMode(),
                lastUpdateTime: formatedTime,
              }),
              stubData.getPus011CommandParameter({
                lastUpdateMode: getAnUpdateMode(),
                lastUpdateTime: formatedTime,
              }),
            ],
            pus011TimeShift: [
              stubData.getPus011TimeShift({
                applicationTime: formatedTime,
                lastUpdateMode: getAnUpdateMode(),
                lastUpdateTime: formatedTime,
              }),
              stubData.getPus011TimeShift({
                applicationTime: formatedTime,
                lastUpdateMode: getAnUpdateMode(),
                lastUpdateTime: formatedTime,
              }),
            ],
            uniqueId: 2,
          }),
        ],
      }),
    };
  }
  const deltaType = predictibleRand.getFrom(['getPus011SubSchedule', 'getPus011Command']);
  switch (deltaType) {
    case 'getPus011SubSchedule': {
      return {
        dataType: constants.Pus011SubScheduleType,
        groundDate: timestamp,
        payload: stubData.getPus011SubScheduleProtobuf({
          serviceApid,
          lastUpdateModeSubScheduleId: getAnUpdateMode(),
          lastUpdateTimeSubscheduleId: formatedTime,
          status: getAStatus(),
          lastUpdateModeStatus: getAnUpdateMode(),
          lastUpdateTimeStatus: formatedTime,
          executionTimeFirstTc: formatedTime,
          lastUpdateModeExecTimeFirstTc: getAnUpdateMode(),
          lastUpdateTimeExecTimeFirstTc: formatedTime,
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
          lastUpdateTimeCommandId: formatedTime,
          commandStatus: getAStatus(),
          lastUpdateModeStatus: getAnUpdateMode(),
          lastUpdateTimeStatus: formatedTime,
          commandGroundStatus: getAGroundStatus(),
          lastUpdateModeGroundStatus: getAnUpdateMode(),
          lastUpdateTimeGroundStatus: formatedTime,
          initialExecutionTime: formatedTime,
          lastUpdateModeInitialExecTime: getAnUpdateMode(),
          lastUpdateTimeInitialExecTime: formatedTime,
          currentExecutionTime: formatedTime,
          lastUpdateModeCurrentExecTime: getAnUpdateMode(),
          lastUpdateTimeCurrentExecTime: formatedTime,
          lastUpdateModeTotalTimeShiftOffset: getAnUpdateMode(),
          lastUpdateTimeTotalTimeShiftOffset: formatedTime,
          commandBinaryProfile: `${binaryProfile}${binaryProfile}${binaryProfile}${binaryProfile}`,
          lastUpdateModeBinProf: getAnUpdateMode(),
          lastUpdateTimeBinProf: formatedTime,
          pus011CommandParameters: [
            stubData.getPus011CommandParameter({
              lastUpdateMode: getAnUpdateMode(),
              lastUpdateTime: formatedTime,
            }),
            stubData.getPus011CommandParameter({
              lastUpdateMode: getAnUpdateMode(),
              lastUpdateTime: formatedTime,
            }),
          ],
          pus011TimeShift: [
            stubData.getPus011TimeShift({
              applicationTime: formatedTime,
              lastUpdateMode: getAnUpdateMode(),
              lastUpdateTime: formatedTime,
            }),
            stubData.getPus011TimeShift({
              applicationTime: formatedTime,
              lastUpdateMode: getAnUpdateMode(),
              lastUpdateTime: formatedTime,
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
const getPus12Payload = (timestamp, serviceApid, type) => {
  const formatedTime = getAnUpdateTime(timestamp);
  if (type === 'model') {
    return {
      dataType: constants.Pus012ModelType,
      groundDate: timestamp,
      payload: stubData.getPus012ModelProtobuf({
        serviceApid,
        serviceStatus: getAStatus(),
        lastUpdateModeServiceStatus: getAnUpdateMode(),
        lastUpdateTimeServiceStatus: formatedTime,
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
            lastUpdateTimeMonInterval: formatedTime,
            lastUpdateTimeRepetition: formatedTime,
            lastUpdateTimeMonId: formatedTime,
            lastUpdateTimeParamId: formatedTime,
            lastUpdateTimeValParamId: formatedTime,
            lastUpdateTimeValParamExpectValue: formatedTime,
            lastUpdateTimeValParamMask: formatedTime,
            lastUpdateTimeCheckType: formatedTime,
            lastUpdateTimeMonStatus: formatedTime,
            lastUpdateTimeProtectionStatus: formatedTime,
            pus012MonitoringCheckPropertiesLow: stubData.getPus012MonitoringCheckProperties({
              ridStatus: getAStatus(),
              actionStatus: getAStatus(),
              lastUpdateModeRid: getAnUpdateMode(),
              lastUpdateModeActionStatus: getAnUpdateMode(),
              lastUpdateModeRidStatus: getAnUpdateMode(),
              lastUpdateModeMask: getAnUpdateMode(),
              lastUpdateModeValue: getAnUpdateMode(),
              lastUpdateTimeRid: formatedTime,
              lastUpdateTimeActionStatus: formatedTime,
              lastUpdateTimeRidStatus: formatedTime,
              lastUpdateTimeMask: formatedTime,
              lastUpdateTimeValue: formatedTime,
            }),
            pus012MonitoringCheckPropertiesExpected: stubData.getPus012MonitoringCheckProperties({
              ridStatus: getAStatus(),
              actionStatus: getAStatus(),
              lastUpdateModeRid: getAnUpdateMode(),
              lastUpdateModeActionStatus: getAnUpdateMode(),
              lastUpdateModeRidStatus: getAnUpdateMode(),
              lastUpdateModeMask: getAnUpdateMode(),
              lastUpdateModeValue: getAnUpdateMode(),
              lastUpdateTimeRid: formatedTime,
              lastUpdateTimeActionStatus: formatedTime,
              lastUpdateTimeRidStatus: formatedTime,
              lastUpdateTimeMask: formatedTime,
              lastUpdateTimeValue: formatedTime,
            }),
            pus012MonitoringCheckPropertiesHigh: stubData.getPus012MonitoringCheckProperties({
              ridStatus: getAStatus(),
              actionStatus: getAStatus(),
              lastUpdateModeRid: getAnUpdateMode(),
              lastUpdateModeActionStatus: getAnUpdateMode(),
              lastUpdateModeRidStatus: getAnUpdateMode(),
              lastUpdateModeMask: getAnUpdateMode(),
              lastUpdateModeValue: getAnUpdateMode(),
              lastUpdateTimeRid: formatedTime,
              lastUpdateTimeActionStatus: formatedTime,
              lastUpdateTimeRidStatus: formatedTime,
              lastUpdateTimeMask: formatedTime,
              lastUpdateTimeValue: formatedTime,
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
            lastUpdateTimeMonInterval: formatedTime,
            lastUpdateTimeRepetition: formatedTime,
            lastUpdateTimeMonId: formatedTime,
            lastUpdateTimeParamId: formatedTime,
            lastUpdateTimeValParamId: formatedTime,
            lastUpdateTimeValParamExpectValue: formatedTime,
            lastUpdateTimeValParamMask: formatedTime,
            lastUpdateTimeCheckType: formatedTime,
            lastUpdateTimeMonStatus: formatedTime,
            lastUpdateTimeProtectionStatus: formatedTime,
            pus012MonitoringCheckPropertiesLow: stubData.getPus012MonitoringCheckProperties({
              ridStatus: getAStatus(),
              actionStatus: getAStatus(),
              lastUpdateModeRid: getAnUpdateMode(),
              lastUpdateModeActionStatus: getAnUpdateMode(),
              lastUpdateModeRidStatus: getAnUpdateMode(),
              lastUpdateModeMask: getAnUpdateMode(),
              lastUpdateModeValue: getAnUpdateMode(),
              lastUpdateTimeRid: formatedTime,
              lastUpdateTimeActionStatus: formatedTime,
              lastUpdateTimeRidStatus: formatedTime,
              lastUpdateTimeMask: formatedTime,
              lastUpdateTimeValue: formatedTime,
            }),
            pus012MonitoringCheckPropertiesExpected: stubData.getPus012MonitoringCheckProperties({
              ridStatus: getAStatus(),
              actionStatus: getAStatus(),
              lastUpdateModeRid: getAnUpdateMode(),
              lastUpdateModeActionStatus: getAnUpdateMode(),
              lastUpdateModeRidStatus: getAnUpdateMode(),
              lastUpdateModeMask: getAnUpdateMode(),
              lastUpdateModeValue: getAnUpdateMode(),
              lastUpdateTimeRid: formatedTime,
              lastUpdateTimeActionStatus: formatedTime,
              lastUpdateTimeRidStatus: formatedTime,
              lastUpdateTimeMask: formatedTime,
              lastUpdateTimeValue: formatedTime,
            }),
            pus012MonitoringCheckPropertiesHigh: stubData.getPus012MonitoringCheckProperties({
              ridStatus: getAStatus(),
              actionStatus: getAStatus(),
              lastUpdateModeRid: getAnUpdateMode(),
              lastUpdateModeActionStatus: getAnUpdateMode(),
              lastUpdateModeRidStatus: getAnUpdateMode(),
              lastUpdateModeMask: getAnUpdateMode(),
              lastUpdateModeValue: getAnUpdateMode(),
              lastUpdateTimeRid: formatedTime,
              lastUpdateTimeActionStatus: formatedTime,
              lastUpdateTimeRidStatus: formatedTime,
              lastUpdateTimeMask: formatedTime,
              lastUpdateTimeValue: formatedTime,
            }),
          }),
        ],
      }),
    };
  }
  // case type === delta
  return {
    dataType: constants.Pus012ParameterMonitoringDefinitionType,
    groundDate: timestamp,
    payload: stubData.getPus012ParameterMonitoringDefinitionProtobuf({
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
      lastUpdateTimeMonInterval: formatedTime,
      lastUpdateTimeRepetition: formatedTime,
      lastUpdateTimeMonId: formatedTime,
      lastUpdateTimeParamId: formatedTime,
      lastUpdateTimeValParamId: formatedTime,
      lastUpdateTimeValParamExpectValue: formatedTime,
      lastUpdateTimeValParamMask: formatedTime,
      lastUpdateTimeCheckType: formatedTime,
      lastUpdateTimeMonStatus: formatedTime,
      lastUpdateTimeProtectionStatus: formatedTime,
      pus012MonitoringCheckPropertiesLow: stubData.getPus012MonitoringCheckProperties({
        ridStatus: getAStatus(),
        actionStatus: getAStatus(),
        lastUpdateModeRid: getAnUpdateMode(),
        lastUpdateModeActionStatus: getAnUpdateMode(),
        lastUpdateModeRidStatus: getAnUpdateMode(),
        lastUpdateModeMask: getAnUpdateMode(),
        lastUpdateModeValue: getAnUpdateMode(),
        lastUpdateTimeRid: formatedTime,
        lastUpdateTimeActionStatus: formatedTime,
        lastUpdateTimeRidStatus: formatedTime,
        lastUpdateTimeMask: formatedTime,
        lastUpdateTimeValue: formatedTime,
      }),
      pus012MonitoringCheckPropertiesExpected: stubData.getPus012MonitoringCheckProperties({
        ridStatus: getAStatus(),
        actionStatus: getAStatus(),
        lastUpdateModeRid: getAnUpdateMode(),
        lastUpdateModeActionStatus: getAnUpdateMode(),
        lastUpdateModeRidStatus: getAnUpdateMode(),
        lastUpdateModeMask: getAnUpdateMode(),
        lastUpdateModeValue: getAnUpdateMode(),
        lastUpdateTimeRid: formatedTime,
        lastUpdateTimeActionStatus: formatedTime,
        lastUpdateTimeRidStatus: formatedTime,
        lastUpdateTimeMask: formatedTime,
        lastUpdateTimeValue: formatedTime,
      }),
      pus012MonitoringCheckPropertiesHigh: stubData.getPus012MonitoringCheckProperties({
        ridStatus: getAStatus(),
        actionStatus: getAStatus(),
        lastUpdateModeRid: getAnUpdateMode(),
        lastUpdateModeActionStatus: getAnUpdateMode(),
        lastUpdateModeRidStatus: getAnUpdateMode(),
        lastUpdateModeMask: getAnUpdateMode(),
        lastUpdateModeValue: getAnUpdateMode(),
        lastUpdateTimeRid: formatedTime,
        lastUpdateTimeActionStatus: formatedTime,
        lastUpdateTimeRidStatus: formatedTime,
        lastUpdateTimeMask: formatedTime,
        lastUpdateTimeValue: formatedTime,
      }),
    }),
  };
};
const getPus13Payload = (timestamp, serviceApid, type) => {
  const formatedTime = getAnUpdateTime(timestamp);
  if (type === 'model') {
    return {
      dataType: constants.Pus013ModelType,
      groundDate: timestamp,
      payload: stubData.getPus013ModelProtobuf({
        serviceApid,
        pus013UplinkLdt: [
          stubData.getPus013Ldt({
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
            lastUpdateTimeLduId: formatedTime,
            lastUpdateTimeStatus: formatedTime,
            lastUpdateTimeStartTime: formatedTime,
            lastUpdateTimeEndTime: formatedTime,
            lastUpdateTimeSize: formatedTime,
            lastUpdateTimeRemainSize: formatedTime,
            lastUpdateTimePercent: formatedTime,
            lastUpdateTimeFailureCode: formatedTime,
            lastUpdateTimeFileChecksum: formatedTime,
            pus013LdtPart: [
              stubData.getPus013LdtPart({
                status: getACheckType(), // LARGE_TRANSFER_PART_STATUS
              }),
              stubData.getPus013LdtPart({
                status: getACheckType(),
              }),
            ],
          }),
          stubData.getPus013Ldt({
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
            lastUpdateTimeLduId: formatedTime,
            lastUpdateTimeStatus: formatedTime,
            lastUpdateTimeStartTime: formatedTime,
            lastUpdateTimeEndTime: formatedTime,
            lastUpdateTimeSize: formatedTime,
            lastUpdateTimeRemainSize: formatedTime,
            lastUpdateTimePercent: formatedTime,
            lastUpdateTimeFailureCode: formatedTime,
            lastUpdateTimeFileChecksum: formatedTime,
            pus013LdtPart: [
              stubData.getPus013LdtPart({
                status: getACheckType(), // LARGE_TRANSFER_PART_STATUS
              }),
              stubData.getPus013LdtPart({
                status: getACheckType(),
              }),
            ],
          }),
        ],
        pus013DownlinkLdt: [
          stubData.getPus013Ldt({
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
            lastUpdateTimeLduId: formatedTime,
            lastUpdateTimeStatus: formatedTime,
            lastUpdateTimeStartTime: formatedTime,
            lastUpdateTimeEndTime: formatedTime,
            lastUpdateTimeSize: formatedTime,
            lastUpdateTimeRemainSize: formatedTime,
            lastUpdateTimePercent: formatedTime,
            lastUpdateTimeFailureCode: formatedTime,
            lastUpdateTimeFileChecksum: formatedTime,
            pus013LdtPart: [
              stubData.getPus013LdtPart({
                status: getACheckType(), // LARGE_TRANSFER_PART_STATUS
              }),
              stubData.getPus013LdtPart({
                status: getACheckType(),
              }),
            ],
          }),
          stubData.getPus013Ldt({
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
            lastUpdateTimeLduId: formatedTime,
            lastUpdateTimeStatus: formatedTime,
            lastUpdateTimeStartTime: formatedTime,
            lastUpdateTimeEndTime: formatedTime,
            lastUpdateTimeSize: formatedTime,
            lastUpdateTimeRemainSize: formatedTime,
            lastUpdateTimePercent: formatedTime,
            lastUpdateTimeFailureCode: formatedTime,
            lastUpdateTimeFileChecksum: formatedTime,
            pus013LdtPart: [
              stubData.getPus013LdtPart({
                status: getACheckType(), // LARGE_TRANSFER_PART_STATUS
              }),
              stubData.getPus013LdtPart({
                status: getACheckType(),
              }),
            ],
          }),
        ],
      }),
    };
  }
  const deltaType = predictibleRand.getFrom(['pus013DownlinkLDT', 'pus013UplinkLDT']);
  switch (deltaType) {
    case 'pus013DownlinkLDT': {
      return {
        dataType: constants.Pus013DownlinkLDTType,
        groundDate: timestamp,
        payload: stubData.getPus013LdtProtobuf({
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
          lastUpdateTimeLduId: formatedTime,
          lastUpdateTimeStatus: formatedTime,
          lastUpdateTimeStartTime: formatedTime,
          lastUpdateTimeEndTime: formatedTime,
          lastUpdateTimeSize: formatedTime,
          lastUpdateTimeRemainSize: formatedTime,
          lastUpdateTimePercent: formatedTime,
          lastUpdateTimeFailureCode: formatedTime,
          lastUpdateTimeFileChecksum: formatedTime,
          pus013LdtPart: [
            stubData.getPus013LdtPart({
              status: getACheckType(), // LARGE_TRANSFER_PART_STATUS
            }),
            stubData.getPus013LdtPart({
              status: getACheckType(),
            }),
          ],
        }),
      };
    }
    case 'pus013UplinkLDT': {
      return {
        dataType: constants.Pus013UplinkLDTType,
        groundDate: timestamp,
        payload: stubData.getPus013LdtProtobuf({
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
          lastUpdateTimeLduId: formatedTime,
          lastUpdateTimeStatus: formatedTime,
          lastUpdateTimeStartTime: formatedTime,
          lastUpdateTimeEndTime: formatedTime,
          lastUpdateTimeSize: formatedTime,
          lastUpdateTimeRemainSize: formatedTime,
          lastUpdateTimePercent: formatedTime,
          lastUpdateTimeFailureCode: formatedTime,
          lastUpdateTimeFileChecksum: formatedTime,
          pus013LdtPart: [
            stubData.getPus013LdtPart({
              status: getACheckType(), // LARGE_TRANSFER_PART_STATUS
            }),
            stubData.getPus013LdtPart({
              status: getACheckType(),
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
const getPus14Payload = (timestamp, serviceApid, type) => {
  const formatedTime = getAnUpdateTime(timestamp);
  if (type === 'model') {
    return {
      dataType: constants.Pus014ModelType,
      groundDate: timestamp,
      payload: stubData.getPus014ModelProtobuf({
        serviceApid,
        pus014TmPacket: [
          stubData.getPus014ForwardedPacket({
            serviceApid,
            status: getAStatus(),
            forwardingStatusTypeSubtype: getAStatus(),
            forwardingStatusRidSid: getAStatus(),
            lastUpdateModeTypeSubType: getAnUpdateMode(),
            lastUpdateModeFwdStatusTypeSubtype: getAnUpdateMode(),
            lastUpdateModeRid: getAnUpdateMode(),
            lastUpdateModeSid: getAnUpdateMode(),
            lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
            lastUpdateModeFwdStatusTypeRidSid: getAnUpdateMode(),
            lastUpdateTimeTypeSubType: formatedTime,
            lastUpdateTimeFwdStatusTypeSubtype: formatedTime,
            lastUpdateTimeRid: formatedTime,
            lastUpdateTimeSid: formatedTime,
            lastUpdateTimeSubSamplingRatio: formatedTime,
            lastUpdateTimeFwdStatusTypeRidSid: formatedTime,
          }),
          stubData.getPus014ForwardedPacket({
            serviceApid,
            status: getAStatus(),
            forwardingStatusTypeSubtype: getAStatus(),
            forwardingStatusRidSid: getAStatus(),
            lastUpdateModeTypeSubType: getAnUpdateMode(),
            lastUpdateModeFwdStatusTypeSubtype: getAnUpdateMode(),
            lastUpdateModeRid: getAnUpdateMode(),
            lastUpdateModeSid: getAnUpdateMode(),
            lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
            lastUpdateModeFwdStatusTypeRidSid: getAnUpdateMode(),
            lastUpdateTimeTypeSubType: formatedTime,
            lastUpdateTimeFwdStatusTypeSubtype: formatedTime,
            lastUpdateTimeRid: formatedTime,
            lastUpdateTimeSid: formatedTime,
            lastUpdateTimeSubSamplingRatio: formatedTime,
            lastUpdateTimeFwdStatusTypeRidSid: formatedTime,
          }),
        ],
      }),
    };
  }
  // case type === delta
  return {
    dataType: constants.Pus014ForwardedPacketType,
    groundDate: timestamp,
    payload: stubData.getPus014ForwardedPacketProtobuf({
      serviceApid,
      status: getAStatus(),
      forwardingStatusTypeSubtype: getAStatus(),
      forwardingStatusRidSid: getAStatus(),
      lastUpdateModeTypeSubType: getAnUpdateMode(),
      lastUpdateModeFwdStatusTypeSubtype: getAnUpdateMode(),
      lastUpdateModeRid: getAnUpdateMode(),
      lastUpdateModeSid: getAnUpdateMode(),
      lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
      lastUpdateModeFwdStatusTypeRidSid: getAnUpdateMode(),
      lastUpdateTimeTypeSubType: formatedTime,
      lastUpdateTimeFwdStatusTypeSubtype: formatedTime,
      lastUpdateTimeRid: formatedTime,
      lastUpdateTimeSid: formatedTime,
      lastUpdateTimeSubSamplingRatio: formatedTime,
      lastUpdateTimeFwdStatusTypeRidSid: formatedTime,
    }),
  };
};
const getPus15Payload = (timestamp, serviceApid, type) => {
  const formatedTime = getAnUpdateTime(timestamp);
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
            lastUpdateTimeStoreId: formatedTime,
            lastUpdateTimeStoreType: formatedTime,
            lastUpdateTimeStoreStatus: formatedTime,
            lastUpdateTimeDownlinkStatus: formatedTime,
            pus015Packet: [
              stubData.getPus015Packet({
                serviceApid,
                isSubsamplingRatioSet: getABoolean(),
                lastUpdateModePacketId: getAnUpdateMode(),
                lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
                lastUpdateTimePacketId: formatedTime,
                lastUpdateTimeSubSamplingRatio: formatedTime,
              }),
              stubData.getPus015Packet({
                serviceApid,
                isSubsamplingRatioSet: getABoolean(),
                lastUpdateModePacketId: getAnUpdateMode(),
                lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
                lastUpdateTimePacketId: formatedTime,
                lastUpdateTimeSubSamplingRatio: formatedTime,
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
            lastUpdateTimeStoreId: formatedTime,
            lastUpdateTimeStoreType: formatedTime,
            lastUpdateTimeStoreStatus: formatedTime,
            lastUpdateTimeDownlinkStatus: formatedTime,
            pus015Packet: [
              stubData.getPus015Packet({
                serviceApid,
                isSubsamplingRatioSet: getABoolean(),
                lastUpdateModePacketId: getAnUpdateMode(),
                lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
                lastUpdateTimePacketId: formatedTime,
                lastUpdateTimeSubSamplingRatio: formatedTime,
              }),
              stubData.getPus015Packet({
                serviceApid,
                isSubsamplingRatioSet: getABoolean(),
                lastUpdateModePacketId: getAnUpdateMode(),
                lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
                lastUpdateTimePacketId: formatedTime,
                lastUpdateTimeSubSamplingRatio: formatedTime,
              }),
            ],
          }),
        ],
      }),
    };
  }
  // case type === delta
  return {
    dataType: constants.Pus015PacketStoreType,
    groundDate: timestamp,
    payload: stubData.getPus015PacketStoreProtobuf({
      serviceApid,
      storeStatus: getAStatus(),
      downlinkStatus: getAStatus(),
      lastUpdateModeStoreId: getAnUpdateMode(),
      lastUpdateModeStoreType: getAnUpdateMode(),
      lastUpdateModeStoreStatus: getAnUpdateMode(),
      lastUpdateModeDownlinkStatus: getAnUpdateMode(),
      lastUpdateTimeStoreId: formatedTime,
      lastUpdateTimeStoreType: formatedTime,
      lastUpdateTimeStoreStatus: formatedTime,
      lastUpdateTimeDownlinkStatus: formatedTime,
      pus015Packet: [
        stubData.getPus015Packet({
          serviceApid,
          isSubsamplingRatioSet: getABoolean(),
          lastUpdateModePacketId: getAnUpdateMode(),
          lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
          lastUpdateTimePacketId: formatedTime,
          lastUpdateTimeSubSamplingRatio: formatedTime,
        }),
        stubData.getPus015Packet({
          serviceApid,
          isSubsamplingRatioSet: getABoolean(),
          lastUpdateModePacketId: getAnUpdateMode(),
          lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
          lastUpdateTimePacketId: formatedTime,
          lastUpdateTimeSubSamplingRatio: formatedTime,
        }),
      ],
    }),
  };
};
const getPus18Payload = (timestamp, serviceApid, type) => {
  const formatedTime = getAnUpdateTime(timestamp);
  if (type === 'model') {
    return {
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
            lastUpdateTimeObcpId: formatedTime,
            lastUpdateTimeStatus: formatedTime,
            lastUpdateTimeStepId: formatedTime,
            lastUpdateTimePartitionId: formatedTime,
            lastUpdateTimeObsLevel: formatedTime,
            lastUpdateTimePriority: formatedTime,
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
            lastUpdateTimeObcpId: formatedTime,
            lastUpdateTimeStatus: formatedTime,
            lastUpdateTimeStepId: formatedTime,
            lastUpdateTimePartitionId: formatedTime,
            lastUpdateTimeObsLevel: formatedTime,
            lastUpdateTimePriority: formatedTime,
          }),
        ],
      }),
    };
  }
  // case type === delta
  return {
    dataType: constants.Pus018ObcpType,
    groundDate: timestamp,
    payload: stubData.getPus018ObcpProtobuf({
      serviceApid,
      status: getAStatus(),
      downlinkStatus: getAStatus(),
      lastUpdateModeObcpId: getAnUpdateMode(),
      lastUpdateModeStatus: getAnUpdateMode(),
      lastUpdateModeStepId: getAnUpdateMode(),
      lastUpdateModePartitionId: getAnUpdateMode(),
      lastUpdateModeObsLevel: getAnUpdateMode(),
      lastUpdateModePriority: getAnUpdateMode(),
      lastUpdateTimeObcpId: formatedTime,
      lastUpdateTimeStatus: formatedTime,
      lastUpdateTimeStepId: formatedTime,
      lastUpdateTimePartitionId: formatedTime,
      lastUpdateTimeObsLevel: formatedTime,
      lastUpdateTimePriority: formatedTime,
    }),
  };
};
const getPus19Payload = (timestamp, serviceApid, type, binaryProfile) => {
  const formatedTime = getAnUpdateTime(timestamp);
  if (type === 'model') {
    return {
      dataType: constants.Pus019ModelType,
      groundDate: timestamp,
      payload: stubData.getPus019ModelProtobuf({
        serviceStatus: getAStatus(),
        lastUpdateModeServiceStatus: getAnUpdateMode(),
        lastUpdateTimeServiceStatus: formatedTime,
        pus19EventAction: [
          stubData.getPus019EventAction({
            actionStatus: getAStatus(),
            lastUpdateModeActionStatus: getAnUpdateMode(),
            lastUpdateModeEventActionRid: getAnUpdateMode(),
            lastUpdateModeActionTc: getAnUpdateMode(),
            lastUpdateTimeActionStatus: formatedTime,
            lastUpdateTimeEventActionRid: formatedTime,
            lastUpdateTimeActionTc: formatedTime,
            actionTcPacket: `${binaryProfile}${binaryProfile}${binaryProfile}${binaryProfile}`,
          }),
          stubData.getPus019EventAction({
            actionStatus: getAStatus(),
            lastUpdateModeActionStatus: getAnUpdateMode(),
            lastUpdateModeEventActionRid: getAnUpdateMode(),
            lastUpdateModeActionTc: getAnUpdateMode(),
            lastUpdateTimeActionStatus: formatedTime,
            lastUpdateTimeEventActionRid: formatedTime,
            lastUpdateTimeActionTc: formatedTime,
            actionTcPacket: `${binaryProfile}${binaryProfile}${binaryProfile}${binaryProfile}`,
          }),
        ],
      }),
    };
  }
  // case type === delta
  return {
    dataType: constants.Pus019EventActionType,
    groundDate: timestamp,
    payload: stubData.getPus019EventActionProtobuf({
      actionStatus: getAStatus(),
      lastUpdateModeActionStatus: getAnUpdateMode(),
      lastUpdateModeEventActionRid: getAnUpdateMode(),
      lastUpdateModeActionTc: getAnUpdateMode(),
      lastUpdateTimeActionStatus: formatedTime,
      lastUpdateTimeEventActionRid: formatedTime,
      lastUpdateTimeActionTc: formatedTime,
      actionTcPacket: `${binaryProfile}${binaryProfile}${binaryProfile}${binaryProfile}`,
    }),
  };
};
const getPus140Payload = (timestamp, serviceApid, type) => {
  const formatedTime = getAnUpdateTime(timestamp);
  if (type === 'model') {
    return {
      dataType: constants.Pus140ModelType,
      groundDate: timestamp,
      payload: stubData.getPus140ModelProtobuf({
        pus140Parameter: [
          stubData.getPus140Parameter({
            serviceApid,
            lastUpdateModeCurrentValue: getAnUpdateMode(),
            lastUpdateModeParamId: getAnUpdateMode(),
            lastUpdateTimeCurrentValue: formatedTime,
            lastUpdateTimeParamId: formatedTime,
          }),
          stubData.getPus140Parameter({
            serviceApid,
            lastUpdateModeCurrentValue: getAnUpdateMode(),
            lastUpdateModeParamId: getAnUpdateMode(),
            lastUpdateTimeCurrentValue: formatedTime,
            lastUpdateTimeParamId: formatedTime,
          }),
        ],
      }),
    };
  }
  // case type === delta
  return {
    dataType: constants.Pus140ParameterType,
    groundDate: timestamp,
    payload: stubData.getPus140ParameterProtobuf({
      serviceApid,
      lastUpdateModeCurrentValue: getAnUpdateMode(),
      lastUpdateModeParamId: getAnUpdateMode(),
      lastUpdateTimeCurrentValue: formatedTime,
      lastUpdateTimeParamId: formatedTime,
    }),
  };
};
const getPus142Payload = (timestamp, serviceApid, type) => {
  const formatedTime = getAnUpdateTime(timestamp);
  if (type === 'model') {
    return {
      dataType: constants.Pus142ModelType,
      groundDate: timestamp,
      payload: stubData.getPus142ModelProtobuf({
        serviceStatus: getAStatus(),
        lastUpdateModeServiceStatus: getAnUpdateMode(),
        pus142FunctionalMonitoring: [
          stubData.getPus142FunctionalMonitoring({
            serviceApid,
            status: getAStatus(),
            ridStatus: getAStatus(),
            actionStatus: getAStatus(),
            checkingStatus: getACheckType(),
            lastUpdateModeFMonId: getAnUpdateMode(),
            lastUpdateModeStatus: getAnUpdateMode(),
            lastUpdateModeCheckingStatus: getAnUpdateMode(),
            lastUpdateModeProtectionStatus: getAnUpdateMode(),
            lastUpdateModeRid: getAnUpdateMode(),
            lastUpdateModeRidStatus: getAnUpdateMode(),
            lastUpdateModeValidParamId: getAnUpdateMode(),
            lastUpdateModeValidParamMask: getAnUpdateMode(),
            lastUpdateModeValidParamExpectedValue: getAnUpdateMode(),
            lastUpdateModeActionStatus: getAnUpdateMode(),
            lastUpdateTimeFMonId: formatedTime,
            lastUpdateTimeStatus: formatedTime,
            lastUpdateTimeCheckingStatus: formatedTime,
            lastUpdateTimeProtectionStatus: formatedTime,
            lastUpdateTimeRid: formatedTime,
            lastUpdateTimeRidStatus: formatedTime,
            lastUpdateTimeValidParamId: formatedTime,
            lastUpdateTimeValidParamMask: formatedTime,
            lastUpdateTimeValidParamExpectedValue: formatedTime,
            lastUpdateTimeActionStatus: formatedTime,
            pus142ParameterMonitoringDefinition: [
              stubData.getPus142ParameterMonitoringDefinition({
                serviceApid,
                lastUpdateModeId: getAnUpdateMode(),
                lastUpdateTimeId: formatedTime,
              }),
              stubData.getPus142ParameterMonitoringDefinition({
                serviceApid,
                lastUpdateModeId: getAnUpdateMode(),
                lastUpdateTimeId: formatedTime,
              }),
            ],
          }),
          stubData.getPus142FunctionalMonitoring({
            serviceApid,
            status: getAStatus(),
            ridStatus: getAStatus(),
            actionStatus: getAStatus(),
            checkingStatus: getACheckType(),
            lastUpdateModeFMonId: getAnUpdateMode(),
            lastUpdateModeStatus: getAnUpdateMode(),
            lastUpdateModeCheckingStatus: getAnUpdateMode(),
            lastUpdateModeProtectionStatus: getAnUpdateMode(),
            lastUpdateModeRid: getAnUpdateMode(),
            lastUpdateModeRidStatus: getAnUpdateMode(),
            lastUpdateModeValidParamId: getAnUpdateMode(),
            lastUpdateModeValidParamMask: getAnUpdateMode(),
            lastUpdateModeValidParamExpectedValue: getAnUpdateMode(),
            lastUpdateModeActionStatus: getAnUpdateMode(),
            lastUpdateTimeFMonId: getAnUpdateTime(timestamp),
            lastUpdateTimeStatus: getAnUpdateTime(timestamp),
            lastUpdateTimeCheckingStatus: getAnUpdateTime(timestamp),
            lastUpdateTimeProtectionStatus: getAnUpdateTime(timestamp),
            lastUpdateTimeRid: getAnUpdateTime(timestamp),
            lastUpdateTimeRidStatus: getAnUpdateTime(timestamp),
            lastUpdateTimeValidParamId: getAnUpdateTime(timestamp),
            lastUpdateTimeValidParamMask: getAnUpdateTime(timestamp),
            lastUpdateTimeValidParamExpectedValue: getAnUpdateTime(timestamp),
            lastUpdateTimeActionStatus: getAnUpdateTime(timestamp),
            pus142ParameterMonitoringDefinition: [
              stubData.getPus142ParameterMonitoringDefinition({
                serviceApid,
                lastUpdateModeId: getAnUpdateMode(),
                lastUpdateTimeId: formatedTime,
              }),
              stubData.getPus142ParameterMonitoringDefinition({
                serviceApid,
                lastUpdateModeId: getAnUpdateMode(),
                lastUpdateTimeId: formatedTime,
              }),
            ],
          }),
        ],
      }),
    };
  }
  // case type === delta
  return {
    dataType: constants.Pus142FunctionalMonitoringType,
    groundDate: timestamp,
    payload: stubData.getPus142FunctionalMonitoringProtobuf({
      serviceApid,
      status: getAStatus(),
      ridStatus: getAStatus(),
      actionStatus: getAStatus(),
      checkingStatus: getACheckType(),
      lastUpdateModeFMonId: getAnUpdateMode(),
      lastUpdateModeStatus: getAnUpdateMode(),
      lastUpdateModeCheckingStatus: getAnUpdateMode(),
      lastUpdateModeProtectionStatus: getAnUpdateMode(),
      lastUpdateModeRid: getAnUpdateMode(),
      lastUpdateModeRidStatus: getAnUpdateMode(),
      lastUpdateModeValidParamId: getAnUpdateMode(),
      lastUpdateModeValidParamMask: getAnUpdateMode(),
      lastUpdateModeValidParamExpectedValue: getAnUpdateMode(),
      lastUpdateModeActionStatus: getAnUpdateMode(),
      lastUpdateTimeFMonId: formatedTime,
      lastUpdateTimeStatus: formatedTime,
      lastUpdateTimeCheckingStatus: formatedTime,
      lastUpdateTimeProtectionStatus: formatedTime,
      lastUpdateTimeRid: formatedTime,
      lastUpdateTimeRidStatus: formatedTime,
      lastUpdateTimeValidParamId: formatedTime,
      lastUpdateTimeValidParamMask: formatedTime,
      lastUpdateTimeValidParamExpectedValue: formatedTime,
      lastUpdateTimeActionStatus: formatedTime,
      pus142ParameterMonitoringDefinition: [
        stubData.getPus142ParameterMonitoringDefinition({
          serviceApid,
          lastUpdateModeId: getAnUpdateMode(),
          lastUpdateTimeId: formatedTime,
        }),
        stubData.getPus142ParameterMonitoringDefinition({
          serviceApid,
          lastUpdateModeId: getAnUpdateMode(),
          lastUpdateTimeId: formatedTime,
        }),
      ],
    }),
  };
};
const getPus144Payload = (timestamp, serviceApid, type) => {
  const formatedTime = getAnUpdateTime(timestamp);
  if (type === 'model') {
    return {
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
            lastUpdateTimeOnBoardFileId: formatedTime,
            lastUpdateModeFileType: getAnUpdateMode(),
            lastUpdateTimeFileType: formatedTime,
            lastUpdateModeFileSize: getAnUpdateMode(),
            lastUpdateTimeFileSize: formatedTime,
            lastUpdateModeFileCreationTime: getAnUpdateMode(),
            lastUpdateTimeFileCreationTime: formatedTime,
            lastUpdateModeFileProtectionStatus: getAnUpdateMode(),
            lastUpdateTimeFileProtectionStatus: formatedTime,
            lastUpdateModeFileMode: getAnUpdateMode(),
            lastUpdateTimeFileMode: formatedTime,
            lastUpdateModeFileAddress: getAnUpdateMode(),
            lastUpdateTimeFileAddress: formatedTime,
            lastUpdateModeUploadedChecksum: getAnUpdateMode(),
            lastUpdateTimeUploadedChecksum: formatedTime,
            lastUpdateModeComputedChecksum: getAnUpdateMode(),
            lastUpdateTimeComputedChecksum: formatedTime,
          }),
          stubData.getPus144OnboardFile({
            serviceApid,
            fileProtectionStatus: getAFileMode(),
            fileMode: getAFileMode(),
            isFileSizeSet: getABoolean(),
            lastUpdateModeOnBoardFileId: getAnUpdateMode(),
            lastUpdateTimeOnBoardFileId: formatedTime,
            lastUpdateModeFileType: getAnUpdateMode(),
            lastUpdateTimeFileType: formatedTime,
            lastUpdateModeFileSize: getAnUpdateMode(),
            lastUpdateTimeFileSize: formatedTime,
            lastUpdateModeFileCreationTime: getAnUpdateMode(),
            lastUpdateTimeFileCreationTime: formatedTime,
            lastUpdateModeFileProtectionStatus: getAnUpdateMode(),
            lastUpdateTimeFileProtectionStatus: formatedTime,
            lastUpdateModeFileMode: getAnUpdateMode(),
            lastUpdateTimeFileMode: formatedTime,
            lastUpdateModeFileAddress: getAnUpdateMode(),
            lastUpdateTimeFileAddress: formatedTime,
            lastUpdateModeUploadedChecksum: getAnUpdateMode(),
            lastUpdateTimeUploadedChecksum: formatedTime,
            lastUpdateModeComputedChecksum: getAnUpdateMode(),
            lastUpdateTimeComputedChecksum: formatedTime,
          }),
        ],
      }),
    };
  }
  // case type === delta
  return {
    dataType: constants.Pus144OnBoardFileType,
    groundDate: timestamp,
    payload: stubData.getPus144OnboardFileProtobuf({
      serviceApid,
      fileProtectionStatus: getAFileMode(),
      fileMode: getAFileMode(),
      isFileSizeSet: getABoolean(),
      lastUpdateModeOnBoardFileId: getAnUpdateMode(),
      lastUpdateTimeOnBoardFileId: formatedTime,
      lastUpdateModeFileType: getAnUpdateMode(),
      lastUpdateTimeFileType: formatedTime,
      lastUpdateModeFileSize: getAnUpdateMode(),
      lastUpdateTimeFileSize: formatedTime,
      lastUpdateModeFileCreationTime: getAnUpdateMode(),
      lastUpdateTimeFileCreationTime: formatedTime,
      lastUpdateModeFileProtectionStatus: getAnUpdateMode(),
      lastUpdateTimeFileProtectionStatus: formatedTime,
      lastUpdateModeFileMode: getAnUpdateMode(),
      lastUpdateTimeFileMode: formatedTime,
      lastUpdateModeFileAddress: getAnUpdateMode(),
      lastUpdateTimeFileAddress: formatedTime,
      lastUpdateModeUploadedChecksum: getAnUpdateMode(),
      lastUpdateTimeUploadedChecksum: formatedTime,
      lastUpdateModeComputedChecksum: getAnUpdateMode(),
      lastUpdateTimeComputedChecksum: formatedTime,
    }),
  };
};
const getPusMMEPayload = (timestamp, serviceApid, type) => {
  const formatedTime = getAnUpdateTime(timestamp);
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
            lastUpdateTimeSid: formatedTime,
            lastUpdateTimeStatus: formatedTime,
            lastUpdateTimeValidParamId: formatedTime,
            lastUpdateTimeValidParamExpValue: formatedTime,
            lastUpdateTimeCollectInterval: formatedTime,
            lastUpdateTimeFwdStatusTypeSubtype: formatedTime,
            lastUpdateTimeFwdStatusTypeRidSid: formatedTime,
            lastUpdateTimeGenMode: formatedTime,
            pusMmePacketStore: [
              stubData.getPusMmePacketStore({
                storeStatus: getAStatus(),
                lastUpdateModeStoreId: getAnUpdateMode(),
                lastUpdateModeStoreStatus: getAnUpdateMode(),
                lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
                lastUpdateTimeStoreId: formatedTime,
                lastUpdateTimeStoreStatus: formatedTime,
                lastUpdateTimeSubSamplingRatio: formatedTime,
              }),
              stubData.getPusMmePacketStore({
                storeStatus: getAStatus(),
                lastUpdateModeStoreId: getAnUpdateMode(),
                lastUpdateModeStoreStatus: getAnUpdateMode(),
                lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
                lastUpdateTimeStoreId: formatedTime,
                lastUpdateTimeStoreStatus: formatedTime,
                lastUpdateTimeSubSamplingRatio: formatedTime,
              }),
            ],
            pusMmePacketParameter: [
              stubData.getPusMmePacketParameter({
                lastUpdateModeParameterId: getAnUpdateMode(),
                lastUpdateModeFilteredStatus: getAnUpdateMode(),
                lastUpdateTimeParameterId: formatedTime,
                lastUpdateTimeFilteredStatus: formatedTime,
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
            lastUpdateTimeSid: formatedTime,
            lastUpdateTimeStatus: formatedTime,
            lastUpdateTimeValidParamId: formatedTime,
            lastUpdateTimeValidParamExpValue: formatedTime,
            lastUpdateTimeCollectInterval: formatedTime,
            lastUpdateTimeFwdStatusTypeSubtype: formatedTime,
            lastUpdateTimeFwdStatusTypeRidSid: formatedTime,
            lastUpdateTimeGenMode: formatedTime,
            pusMmePacketStore: [
              stubData.getPusMmePacketStore({
                storeStatus: getAStatus(),
                lastUpdateModeStoreId: getAnUpdateMode(),
                lastUpdateModeStoreStatus: getAnUpdateMode(),
                lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
                lastUpdateTimeStoreId: formatedTime,
                lastUpdateTimeStoreStatus: formatedTime,
                lastUpdateTimeSubSamplingRatio: formatedTime,
              }),
              stubData.getPusMmePacketStore({
                storeStatus: getAStatus(),
                lastUpdateModeStoreId: getAnUpdateMode(),
                lastUpdateModeStoreStatus: getAnUpdateMode(),
                lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
                lastUpdateTimeStoreId: formatedTime,
                lastUpdateTimeStoreStatus: formatedTime,
                lastUpdateTimeSubSamplingRatio: formatedTime,
              }),
            ],
            pusMmePacketParameter: [
              stubData.getPusMmePacketParameter({
                lastUpdateModeParameterId: getAnUpdateMode(),
                lastUpdateModeFilteredStatus: getAnUpdateMode(),
                lastUpdateTimeParameterId: formatedTime,
                lastUpdateTimeFilteredStatus: formatedTime,
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
  // case type === delta
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
      lastUpdateTimeSid: formatedTime,
      lastUpdateTimeStatus: formatedTime,
      lastUpdateTimeValidParamId: formatedTime,
      lastUpdateTimeValidParamExpValue: formatedTime,
      lastUpdateTimeCollectInterval: formatedTime,
      lastUpdateTimeFwdStatusTypeSubtype: formatedTime,
      lastUpdateTimeFwdStatusTypeRidSid: formatedTime,
      lastUpdateTimeGenMode: formatedTime,
      pusMmePacketStore: [
        stubData.getPusMmePacketStore({
          storeStatus: getAStatus(),
          lastUpdateModeStoreId: getAnUpdateMode(),
          lastUpdateModeStoreStatus: getAnUpdateMode(),
          lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
          lastUpdateTimeStoreId: formatedTime,
          lastUpdateTimeStoreStatus: formatedTime,
          lastUpdateTimeSubSamplingRatio: formatedTime,
        }),
        stubData.getPusMmePacketStore({
          storeStatus: getAStatus(),
          lastUpdateModeStoreId: getAnUpdateMode(),
          lastUpdateModeStoreStatus: getAnUpdateMode(),
          lastUpdateModeSubSamplingRatio: getAnUpdateMode(),
          lastUpdateTimeStoreId: formatedTime,
          lastUpdateTimeStoreStatus: formatedTime,
          lastUpdateTimeSubSamplingRatio: formatedTime,
        }),
      ],
      pusMmePacketParameter: [
        stubData.getPusMmePacketParameter({
          lastUpdateModeParameterId: getAnUpdateMode(),
          lastUpdateModeFilteredStatus: getAnUpdateMode(),
          lastUpdateTimeParameterId: formatedTime,
          lastUpdateTimeFilteredStatus: formatedTime,
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
    [constants.PUS_SERVICE_142]: getPus142Payload(timestamp, serviceApid, type),
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
