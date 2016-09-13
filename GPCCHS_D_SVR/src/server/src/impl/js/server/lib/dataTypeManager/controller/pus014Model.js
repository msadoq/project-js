const JS = require('../protoFile/pus014Model.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const Pus014Model = JS.Pus014Model;

exports.binToJson = (payload) => {
  const decoded = Pus014Model.decode(payload);
  const pus014Model = {
    pus014EventReportPacket: decoded.pus014EventReportPacket.value,    pus014HkPacket: decoded.pus014HkPacket.value,    pus014TmPacket: decoded.pus014TmPacket.value,    groundDate: decoded.groundDate.value,    apid: decoded.apid.value,    pus014DiagPacket: decoded.pus014DiagPacket.value,    noEventReportPackets: decoded.noEventReportPackets.value,    noDiagPackets: decoded.noDiagPackets.value,    noHKPackets: decoded.noHKPackets.value,    noTMPackets: decoded.noTMPackets.value,    pusElement: decoded.pusElement.value
  };
  return pus014Model;
};
