const JS = require('../protoFile/pus003Model.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const Pus003Model = JS.Pus003Model;

exports.binToJson = (payload) => {
  const decoded = Pus003Model.decode(payload);
  const pus003Model = {
    pus003DiagPacket: decoded.pus003DiagPacket.value,    numberHkPackets: decoded.numberHkPackets.value,    numberDiagPackets: decoded.numberDiagPackets.value,    apid: decoded.apid.value,    pus003HkPacket: decoded.pus003HkPacket.value,    status: decoded.status.value,    groundDate: decoded.groundDate.value,    pusElement: decoded.pusElement.value
  };
  return pus003Model;
};
