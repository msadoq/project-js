const stubData = require('../data');
const random = require('lodash/random');

function getValue(timestamp) {
  return 50 * (1 + Math.sin(timestamp));
}

module.exports = function getPayload(timestamp) {
  const value = getValue(timestamp);
  return {
    timestamp: stubData.getTimestampProtobuf({ ms: timestamp }),
    payload: stubData.getReportingParameterProtobuf({
      groundDate: timestamp + 20,
      onboardDate: timestamp,
      convertedValue: value + random(1, 20, true),
      rawValue: value + random(1, 20, true),
      extractedValue: random(1, 20, true),
    }),
  };
};
