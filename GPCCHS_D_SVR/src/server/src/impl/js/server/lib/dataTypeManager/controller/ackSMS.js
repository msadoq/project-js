const JS = require('../protoFile/ackSMS.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const AckSMS = JS.AckSMS;

exports.binToJson = (payload) => {
  const decoded = AckSMS.decode(payload);
  const ackSMS = {
    SystemCreationDate: decoded.SystemCreationDate.value,    ApplicationCreationDate: decoded.ApplicationCreationDate.value
  };
  return ackSMS;
};
