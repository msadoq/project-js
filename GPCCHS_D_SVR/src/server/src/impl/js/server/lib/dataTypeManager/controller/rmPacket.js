const JS = require('../protoFile/rmPacket.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const RmPacket = JS.RmPacket;

exports.binToJson = (payload) => {
  const decoded = RmPacket.decode(payload);
  const rmPacket = {
    groundDate: decoded.groundDate.value,    onboardDate: decoded.onboardDate.value,    apid: decoded.apid.value,    service: decoded.service.value,    subService: decoded.subService.value,    destinationId: decoded.destinationId.value,    isDecommuted: decoded.isDecommuted.value,    primaryHeaderSize: decoded.primaryHeaderSize.value,    secondaryHeaderSize: decoded.secondaryHeaderSize.value,    isNominal: decoded.isNominal.value,    rawData: decoded.rawData.value
  };
  return rmPacket;
};
