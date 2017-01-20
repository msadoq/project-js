const stubData = require('../data');

function getValue(timestamp) {
  return (1 + Math.sin(timestamp / 6000));
}

function getMonitoringState(timestamp) {
  const states = ['ok', 'info', 'warning', 'alarm', 'severe', 'critical', 'outOfRange'];
  return states[timestamp % states.length];
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
    case 'DecommutedPacket': {
      return stubData.getDecommutedPacketProtobuf({
        groundDate: timestamp + 20,
        onboardDate: timestamp,
        decommutedValues: [
          stubData.getDecommutedValue({
            name: 'myDecomValue#1',
            convertedValue: value,
            rawValue: value,
            extractedValue: value,
          }),
          stubData.getDecommutedValue({
            name: 'myDecomValue#2',
            convertedValue: value + 1,
            rawValue: value + 1,
            extractedValue: value + 1,
          }),
        ],
      });
    }
    default: {
      return undefined;
    }
  }
};

module.exports = function getPayload(timestamp, comObject, epName = 'todo') {
  let epNumber = 0;
  Buffer.from(epName).forEach((val) => { epNumber += val; });
  const value = getValue(timestamp) + (epNumber / 10);
  return {
    timestamp: stubData.getTimestampProtobuf({ ms: timestamp }),
    payload: getComObject(comObject, timestamp, value),
  };
};
