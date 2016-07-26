const JS = require('../protoFile/statisticLink.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const StatisticLink = JS.StatisticLink;

exports.binToJson = (payload) => {
  const decoded = StatisticLink.decode(payload);
  const statisticLink = {
    collectionInterval: decoded.collectionInterval.value,    reportingInterval: decoded.reportingInterval.value,    samplingInterval: decoded.samplingInterval.value,    reportingEnabled: decoded.reportingEnabled.value,    startTime: decoded.startTime.value
  };
  return statisticLink;
};
