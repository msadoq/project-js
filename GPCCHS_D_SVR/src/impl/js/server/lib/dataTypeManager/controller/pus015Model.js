const JS = require('../protoFile/pus015Model.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const Pus015Model = JS.Pus015Model;

exports.binToJson = (payload) => {
  const decoded = Pus015Model.decode(payload);
  const pus015Model = {
    pus015PacketStore: decoded.pus015PacketStore.value,    groundDate: decoded.groundDate.value,    apid: decoded.apid.value,    noPacketStores: decoded.noPacketStores.value,    pusElement: decoded.pusElement.value
  };
  return pus015Model;
};
