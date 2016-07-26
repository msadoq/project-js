const JS = require('../protoFile/tmPacket.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const TmPacket = JS.TmPacket;

exports.binToJson = (payload) => {
  const decoded = TmPacket.decode(payload);
  const tmPacket = {
    groundDate: decoded.groundDate.value,    onboardDate: decoded.onboardDate.value,    apid: decoded.apid.value,    service: decoded.service.value,    subService: decoded.subService.value,    destinationId: decoded.destinationId.value,    isDecommuted: decoded.isDecommuted.value,    primaryHeaderSize: decoded.primaryHeaderSize.value,    secondaryHeaderSize: decoded.secondaryHeaderSize.value,    isNominal: decoded.isNominal.value,    rawData: decoded.rawData.value
  };
  return tmPacket;
};
