const JS = require('../protoFile/decommutedPacket.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const DecommutedPacket = JS.DecommutedPacket;

exports.binToJson = (payload) => {
  const decoded = DecommutedPacket.decode(payload);
  const decommutedPacket = {
    onboardDate: decoded.onboardDate.value,    groundDate: decoded.groundDate.value,    isNominal: decoded.isNominal.value,    decommutedValues: decoded.decommutedValues.value
  };
  return decommutedPacket;
};
