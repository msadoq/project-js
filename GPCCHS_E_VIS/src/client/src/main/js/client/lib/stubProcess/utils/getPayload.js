// const _concat = require('lodash/fp/concat');
// const _times = require('lodash/fp/times');
// const _prop = require('lodash/fp/prop');
// const _compose = require('lodash/fp/compose');
// const _constant = require('lodash/fp/constant');
// const _head = require('lodash/fp/head');

const stubs = require('../../utils/stubs');
const predictibleRand = require('./PredictibleRand');

const stubData = stubs.getStubData();

// function getMonitoringState(timestamp) {
//   const arr = ['info', 'alarm', 'critical', 'outOfRange', 'severe', 'warning', 'nonsignificant', 'obsolete'];
//   const states = _compose(
//     _concat(arr),
//     _compose(_times, _constant, _head)(arr),
//     l => l * 4,
//     _prop('length')
//   )(arr);
//   return states[timestamp % states.length];
// }
function getMonitoringState() {
  const arr = ['info', 'alarm', 'critical', 'outOfRange', 'severe', 'warning', 'nonsignificant', 'obsolete', 'danger'];
  const n = Math.round(Math.random() * 7);
  return arr[n];
}

const getComObject = (comObject, timestamp, epName) => {
  switch (comObject) {
    case 'GroundMonitoringAlarmAckRequest': {
      const value = predictibleRand.getSinValue(timestamp, epName);
      const groundMonitoringAlarm = {
        creationDate: timestamp - 100,
        paramUid: predictibleRand.getInt([0, 100000]),
        updateDate: timestamp - 50,
        closingDate: predictibleRand.getBool() ? timestamp - 10 : undefined,
        hasAckRequest: predictibleRand.getBool(0.25),
        alarmId: predictibleRand.getInt([0, 100000]),
        transitions: [],
        isNominal: predictibleRand.getBool(0.25),
      };

      const transitionNumber = predictibleRand.getInt([0, 6]);
      for (let i = 0; i < transitionNumber; i += 1) {
        groundMonitoringAlarm.transitions.push({
          onboardDate: timestamp,
          groundDate: timestamp + 20,
          convertedValue: value * 2,
          extractedValue: value * 3,
          rawValue: value,
          monitoringState: getMonitoringState(timestamp),
        });
      }

      return stubData.getGroundMonitoringAlarmAckRequestProtobuf({
        oid: `osef${Math.random() * 10000000}`,
        groundMonitoringAlarm,
        ackRequest: {
          ackRequestDate: timestamp - 10,
          systemDate: timestamp,
          ack: predictibleRand.getBool(0.25) ? {
            ackDate: timestamp - 10,
            acknowledger: {
              login: predictibleRand.getString('login', 16),
              password: predictibleRand.getString('password', 64),
              profile: predictibleRand.getString('profile', 256),
              userTime: timestamp - 50000,
            },
          } : undefined,
          comment: predictibleRand.getString('comment', -1, 10),
        },
        parameterName: predictibleRand.getString('parameterName'),
        parameterType: predictibleRand.getString('parameterType'),
        satellite: predictibleRand.getString('satellite'),
        telemetryType: predictibleRand.getString('telemetryType'),
      });
    }

    case 'ReportingParameter': {
      const value = predictibleRand.getSinValue(timestamp, epName);

      return stubData.getReportingParameterProtobuf({
        groundDate: timestamp + 20,
        onboardDate: timestamp,
        convertedValue: value,
        rawValue: value,
        extractedValue: value,
        monitoringState: getMonitoringState(timestamp),
      });
    }

    case 'DecommutedPacket': {
      return stubData.getDecommutedPacketProtobuf({
        groundDate: timestamp + 20,
        onboardDate: timestamp,
        decommutedValues: [
          stubData.getDecommutedValue({
            name: 'GENE_AM_CCSDSVERS1',
            extractedValue: Buffer.alloc(10, 12),
            rawValue: 2,
            convertedValue: 2,
          }),
          stubData.getDecommutedValue({
            name: 'GENE_AM_CCSDSVERS2',
            extractedValue: Buffer.alloc(10, 1),
            rawValue: 0,
            convertedValue: 0,
          }),
        ],
      });
    }

    case 'Pus003Model':
      return stubData.getPus003ModelProtobuf({
        groundDate: timestamp,
      });

    case 'Pus005Model':
      return stubData.getPus005ModelProtobuf({
        groundDate: timestamp,
      });

    case 'Pus012Model':
      return stubData.getPus012ModelProtobuf({
        groundDate: timestamp,
      });

    default: {
      return undefined;
    }
  }
};

/**
 * @param  {String} epName    entry Point Name
 */
module.exports = function getPayload(timestamp, comObject, epName = 'todo') {
  return {
    timestamp: stubData.getTimestampProtobuf({ ms: timestamp }),
    payload: getComObject(comObject, timestamp, epName),
  };
};
