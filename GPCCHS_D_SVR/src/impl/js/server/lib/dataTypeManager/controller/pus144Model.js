const JS = require('../protoFile/pus144Model.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const Pus144Model = JS.Pus144Model;

exports.binToJson = (payload) => {
  const decoded = Pus144Model.decode(payload);
  const pus144Model = {
    pus144OnboardFiles: decoded.pus144OnboardFiles.value,    groundDate: decoded.groundDate.value,    apid: decoded.apid.value,    noOfOnBoardFiles: decoded.noOfOnBoardFiles.value,    pusElement: decoded.pusElement.value
  };
  return pus144Model;
};
