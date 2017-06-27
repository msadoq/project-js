// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const AckSMS = require('./ackSMS');
const AckRequest = require('./ackRequest');
const Ack = require('./ack');

module.exports = {
  AckSMS: { type: 'raw', adapter: AckSMS },
  AckRequest: { type: 'protobuf', adapter: AckRequest },
  Ack: { type: 'protobuf', adapter: Ack },
};
