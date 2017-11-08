// const _concat = require('lodash/fp/concat');
// const _times = require('lodash/fp/times');
// const _prop = require('lodash/fp/prop');
// const _compose = require('lodash/fp/compose');
// const _constant = require('lodash/fp/constant');
// const _head = require('lodash/fp/head');

const stubs = require('../../utils/stubs');
const predictibleRand = require('./predictibleRand');

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
  const withAckRequest = (options.withAckRequest !== undefined ?
    options.withAckRequest
    : predictibleRand.getBool(0.25)
  );

  const withAck = (options.withAck !== undefined ?
    options.withAck
    : predictibleRand.getBool(0.75)
  );

  return withAckRequest ? {
    ackRequestDate: timestamp - 10,
    systemDate: timestamp,
    ack: withAck ? {
      ackDate: timestamp - 10,
      acknowledger: {
        login: predictibleRand.getString('login', 16),
        password: predictibleRand.getString('password', 64),
        profile: predictibleRand.getString('profile', 256),
        userTime: timestamp - 50000,
      },
    } : undefined,
    comment: options.setComment || predictibleRand.getString('comment', -1, 10),
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

/* eslint-disable complexity, switch case function */
const getComObject = (comObject, timestamp, options) => {
  switch (comObject) {
    case 'OnBoardAlarmAckRequest': {
      if (!predictibleRand.getBool(options.alarmFrequency || 1)) {
        return null;
      }

      return stubData.getOnBoardAlarmAckRequestProtobuf({
        oid: options.setOid || `oid${predictibleRand.getFloat([0, 10000000])}`,
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

      const withAckRequest = (options.withAckRequest !== undefined ?
        options.withAckRequest
        : predictibleRand.getBool(0.75)
      );

      const value = predictibleRand.getSinValue(timestamp, options.epName);
      const groundMonitoringAlarm = {
        creationDate: timestamp - 100,
        paramUid: predictibleRand.getInt([0, 100000]),
        updateDate: timestamp - 50,
        closingDate: predictibleRand.getBool() ? timestamp - 10 : undefined,
        hasAckRequest: withAckRequest,
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
        oid: options.setOid || `oid${predictibleRand.getFloat([0, 10000000])}`,
        groundMonitoringAlarm,
        ackRequest: getAckRequest(timestamp, options),
        parameterName: predictibleRand.getString('pName'),
        parameterType: predictibleRand.getString('pType'),
        satellite: predictibleRand.getString('satellite'),
        telemetryType: predictibleRand.getString('telemetryType'),
      });
    }

    case 'ReportingParameter': {
      const value = predictibleRand.getSinValue(timestamp, options.epName);

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
 * Generate payload for stubs
 * @param  {number} timestamp Timestamp for the generated payload
 * @param  {string} comObject Type of the geneerated patyload
 * @param  {Object} options   Options for generation
 * @return {Object}           Generated payload
 */
module.exports = function getPayload(timestamp, comObject, options = {}) {
  const _options = options;
  _options.epName = (options.epName === undefined ? 'todo' : options.epName);

  predictibleRand.setSeed(timestamp);

  const payload = getComObject(comObject, timestamp, _options);

  if (payload === null) {
    return null;
  }

  return {
    timestamp: stubData.getTimestampProtobuf({ ms: timestamp }),
    payload,
  };
};
