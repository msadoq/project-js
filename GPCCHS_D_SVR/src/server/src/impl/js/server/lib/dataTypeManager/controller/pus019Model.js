const JS = require('../protoFile/pus019Model.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const Pus019Model = JS.Pus019Model;

exports.binToJson = (payload) => {
  const decoded = Pus019Model.decode(payload);
  const pus019Model = {
    serviceStatus: decoded.serviceStatus.value,    noOfEventActions: decoded.noOfEventActions.value,    pus19EventAction: decoded.pus19EventAction.value,    groundDate: decoded.groundDate.value,    apid: decoded.apid.value,    pusElement: decoded.pusElement.value
  };
  return pus019Model;
};
