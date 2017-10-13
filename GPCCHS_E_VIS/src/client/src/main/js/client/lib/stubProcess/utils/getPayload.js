// const _concat = require('lodash/fp/concat');
// const _times = require('lodash/fp/times');
// const _prop = require('lodash/fp/prop');
// const _compose = require('lodash/fp/compose');
// const _constant = require('lodash/fp/constant');
// const _head = require('lodash/fp/head');

const stubs = require('../../utils/stubs');

const stubData = stubs.getStubData();

/**
 * Generate sinusoidal value within [offset, offset+2] range,
 * offset is a unique float value computed from epName.
 *
 * @param  {int} timestamp
 * @return {float}
 */
function getSinValue(timestamp, epName) {
  let offset = 0;
  Buffer.from(epName).forEach((val) => {
    offset += val;
  });

  return (1 + Math.sin(timestamp / 6000)) + (offset / 10);
}

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
      const value = getSinValue(timestamp, epName);

      return stubData.getGroundMonitoringAlarmAckRequestProtobuf({
        oid: `osef${Math.random() * 10000000}`,
        groundAlarm: stubData.getGroundMonitoringAlarmProtobuf({
          creationDate: timestamp - 100,
          // paramUid: null,
          updateDate: timestamp - 50,
          // closingDate: null,
          hasAckRequest: false,
          // alarmId: null,
          transitions: [{
            onboardDate: timestamp,
            groundDate: timestamp + 20,
            convertedValue: value * 2,
            extractedValue: value * 3,
            rawValue: value,
            monitoringState: getMonitoringState(timestamp),
          }],
          // isNominal: false
        }),
        ackRequest: {
          ackRequestDate: timestamp,
          systemDate: timestamp,
          ack: stubData.getAckProtobuf({
            ackDate: timestamp,
            // acknowledger: bLOB.encode(user.encodeRaw(data.acknowledger)),
          }),
          comment: 'J\'aime les guimauves au miel',
        },
        parameterName: 'MyParameterStubName',
        parameterType: 'MyParameterStubType',
        satellite: 'MyStubSatelliteUnicorn',
        telemetryType: 'MyTelemetryStubType',
      });
    }
    case 'ReportingParameter': {
      const value = getSinValue(timestamp, epName);

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
