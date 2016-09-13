const JS = require('../protoFile/statisticFunctionDetails.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const StatisticFunctionDetails = JS.StatisticFunctionDetails;

exports.binToJson = (payload) => {
  const decoded = StatisticFunctionDetails.decode(payload);
  const statisticFunctionDetails = {
    name: decoded.name.value,    description: decoded.description.value,    timestamp: decoded.timestamp.value
  };
  return statisticFunctionDetails;
};
