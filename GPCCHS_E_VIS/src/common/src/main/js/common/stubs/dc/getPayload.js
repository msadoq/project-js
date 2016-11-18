const stubData = require('../data');

function getValue(timestamp) {
  return (1 + Math.sin(timestamp / 6000));
}

module.exports = function getPayload(timestamp, epName) {
  let localEpName = epName;
  if (!localEpName) {
    localEpName = 'todo';
  }
  let epNumber = 0;
  Buffer.from(localEpName).forEach((val) => { epNumber += val; });
  const value = getValue(timestamp) + (epNumber / 10);
  return {
    timestamp: stubData.getTimestampProtobuf({ ms: timestamp }),
    payload: stubData.getReportingParameterProtobuf({
      groundDate: timestamp + 20,
      onboardDate: timestamp,
      convertedValue: value,
      rawValue: value,
      extractedValue: value,
    }),
  };
};
