const stubData = require('../data');

function getValue(timestamp) {
  return (1 + Math.sin(timestamp / 6000));
}

module.exports = function getPayload(timestamp, epName) {
  let epNumber = 0;
  Buffer.from(epName).forEach((val) => { epNumber += val; });
  const value = getValue(timestamp) + (epNumber / 100);
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
