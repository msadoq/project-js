const JS = require('../protoFile/pus018Model.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const Pus018Model = JS.Pus018Model;

exports.binToJson = (payload) => {
  const decoded = Pus018Model.decode(payload);
  const pus018Model = {
    engineStatus: decoded.engineStatus.value,    pus018Obcp: decoded.pus018Obcp.value,    groundDate: decoded.groundDate.value,    apid: decoded.apid.value,    noOBCPs: decoded.noOBCPs.value,    pusElement: decoded.pusElement.value,    pus018ConfiguredObcp: decoded.pus018ConfiguredObcp.value
  };
  return pus018Model;
};
