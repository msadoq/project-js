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
  return predictibleRand.getFrom([
    'info', 'alarm', 'critical', 'outOfRange', 'severe', 'warning', 'nonsignificant', 'obsolete', 'danger',
  ]);
}

function getAckRequest(timestamp, options) {
  return (!options.allToAck && predictibleRand.getBool(0.25)) ? {
    ackRequestDate: timestamp - 10,
    systemDate: timestamp,
    ack: {
      ackDate: timestamp - 10,
      acknowledger: {
        login: predictibleRand.getString('login', 16),
        password: predictibleRand.getString('password', 64),
        profile: predictibleRand.getString('profile', 256),
        userTime: timestamp - 50000,
      },
    },
    comment: predictibleRand.getString('comment', -1, 10),
  } : undefined;
}

function getNamedValue() {
  return {
    name: predictibleRand.getString('pName'),
    value: predictibleRand.getFrom([
      predictibleRand.getBool(),
      predictibleRand.getString('value'),
      predictibleRand.getInt([0, 100000]),
      predictibleRand.getFloat([0, 100000]),
    ]),
  };
}

const getComObject = (comObject, timestamp, epName, options) => {
  switch (comObject) {
    case 'OnBoardAlarmAckRequest': {
      if (!predictibleRand.getBool(options.alarmFrequency || 1)) {
        return null;
      }

      return stubData.getOnBoardAlarmAckRequestProtobuf({
        oid: `oid${Math.random() * 10000000}`,
        onBoardAlarm: {
          apid: predictibleRand.getInt([0, 100000]),
          reportId: predictibleRand.getInt([0, 100000]),
          reportName: predictibleRand.getString('reportName'),
          eventType: predictibleRand.getInt([0, 100000]),
          alarmLevel: getMonitoringState(),
          onBoardDate: timestamp - 20,
          groundDate: timestamp,
          parameter: [getNamedValue(), getNamedValue()],
        },
        ackRequest: getAckRequest(timestamp, options),
        satellite: predictibleRand.getString('satellite'),
        telemetryType: predictibleRand.getString('telemetryType'),
      });
    }

    case 'GroundMonitoringAlarmAckRequest': {
      if (!predictibleRand.getBool(options.alarmFrequency || 1)) {
        return null;
      }

      const value = predictibleRand.getSinValue(timestamp, epName);
      const groundMonitoringAlarm = {
        creationDate: timestamp - 100,
        paramUid: predictibleRand.getInt([0, 100000]),
        updateDate: timestamp - 50,
        closingDate: predictibleRand.getBool() ? timestamp - 10 : undefined,
        hasAckRequest: options.allToAck || predictibleRand.getBool(0.75),
        alarmId: predictibleRand.getInt([0, 100000]),
        transitions: [],
        isNominal: predictibleRand.getBool(0.25),
      };

      const transitionNumber = predictibleRand.getInt([1, 6]);
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
        oid: `oid${Math.random() * 10000000}`,
        groundMonitoringAlarm,
        ackRequest: getAckRequest(timestamp, options),
        parameterName: predictibleRand.getString('pName'),
        parameterType: predictibleRand.getString('pType'),
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
module.exports = function getPayload(timestamp, comObject, epName = 'todo', options = {}) {
  const payload = getComObject(comObject, timestamp, epName, options);

  if (payload === null) {
    return null;
  }

  return {
    timestamp: stubData.getTimestampProtobuf({ ms: timestamp }),
    payload,
  };
};
