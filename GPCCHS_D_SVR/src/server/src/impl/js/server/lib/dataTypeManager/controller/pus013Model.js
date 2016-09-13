const JS = require('../protoFile/pus013Model.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const Pus013Model = JS.Pus013Model;

exports.binToJson = (payload) => {
  const decoded = Pus013Model.decode(payload);
  const pus013Model = {
    noOnGoingDownlinkLDTPacket: decoded.noOnGoingDownlinkLDTPacket.value,    pUS013UplinkLdt: decoded.pUS013UplinkLdt.value,    pUS013DownlinkLdt: decoded.pUS013DownlinkLdt.value,    groundDate: decoded.groundDate.value,    apid: decoded.apid.value,    noOnGoingUplinkLDT: decoded.noOnGoingUplinkLDT.value,    noOnGoingDownlinkLDTFile: decoded.noOnGoingDownlinkLDTFile.value,    currentUplinkLduIdPosition: decoded.currentUplinkLduIdPosition.value,    pusElement: decoded.pusElement.value
  };
  return pus013Model;
};
