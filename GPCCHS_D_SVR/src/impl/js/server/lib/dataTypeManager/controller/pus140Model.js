const JS = require('../protoFile/pus140Model.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const Pus140Model = JS.Pus140Model;

exports.binToJson = (payload) => {
  const decoded = Pus140Model.decode(payload);
  const pus140Model = {
    pus140Parameter: decoded.pus140Parameter.value,    groundDate: decoded.groundDate.value,    apid: decoded.apid.value,    noOfParameters: decoded.noOfParameters.value,    pusElement: decoded.pusElement.value
  };
  return pus140Model;
};
