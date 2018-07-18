// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const Ack = require('./ack');
const AckRequest = require('./ackRequest');
const AckSMS = require('./ackSMS');

module.exports = {
  Ack: { type: 'protobuf', adapter: Ack },
  AckRequest: { type: 'protobuf', adapter: AckRequest },
  AckSMS: { type: 'raw', adapter: AckSMS },
};
