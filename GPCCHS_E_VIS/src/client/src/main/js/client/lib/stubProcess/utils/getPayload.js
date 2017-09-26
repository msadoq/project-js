// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move data stubs in common/protobuf
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move DC stub code in client/lib/stubProcess
// VERSION : 1.1.2 : FA : #6780 : 21/06/2017 : Apply default state colors in views
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Remove data from protobuf in client - Change some stubProcesses and some controllers
// VERSION : 1.1.2 : FA : #6798 : 23/06/2017 : Merge branch 'dev' into pgaucher-464-proto-config
// END-HISTORY
// ====================================================================

// const _concat = require('lodash/fp/concat');
// const _times = require('lodash/fp/times');
// const _prop = require('lodash/fp/prop');
// const _compose = require('lodash/fp/compose');
// const _constant = require('lodash/fp/constant');
// const _head = require('lodash/fp/head');

const stubs = require('../../utils/stubs');

const stubData = stubs.getStubData();

function getValue(timestamp) {
  return (1 + Math.sin(timestamp / 6000));
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

const getComObject = (comObject, timestamp, value) => {
  switch (comObject) {
    case 'ReportingParameter': {
      return stubData.getReportingParameterProtobuf({
        groundDate: timestamp + 20,
        onboardDate: timestamp,
        convertedValue: value,
        rawValue: value,
        extractedValue: value,
        monitoringState: getMonitoringState(timestamp),
      });
    }
    case 'DecommutedPacket':
      {
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

module.exports = function getPayload(timestamp, comObject, epName = 'todo') {
  let epNumber = 0;
  Buffer.from(epName)
    .forEach((val) => { epNumber += val; });
  const value = getValue(timestamp) + (epNumber / 10);
  return {
    timestamp: stubData.getTimestampProtobuf({ ms: timestamp }),
    payload: getComObject(comObject, timestamp, value),
  };
};
