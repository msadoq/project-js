const JS = require('../protoFile/ackRequest.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const AckRequest = JS.AckRequest;

exports.binToJson = (payload) => {
  const decoded = AckRequest.decode(payload);
  const ackRequest = {
    ackRequestDate: decoded.ackRequestDate.value,    systemDate: decoded.systemDate.value,    ack: decoded.ack.value,    comment: decoded.comment.value
  };
  return ackRequest;
};
