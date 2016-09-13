const JS = require('../protoFile/pus011SyncPoint.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const Pus011SyncPoint = JS.Pus011SyncPoint;

exports.binToJson = (payload) => {
  const decoded = Pus011SyncPoint.decode(payload);
  const pus011SyncPoint = {
    apid: decoded.apid.value,    modelIsEmpty: decoded.modelIsEmpty.value,    groundDate: decoded.groundDate.value
  };
  return pus011SyncPoint;
};
