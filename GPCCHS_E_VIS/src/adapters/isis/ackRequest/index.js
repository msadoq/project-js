// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const Ack = require('./ack');
const AckSMS = require('./ackSMS');
const AckRequest = require('./ackRequest');

module.exports = {
  Ack: { type: 'protobuf', adapter: Ack },
  AckSMS: { type: 'raw', adapter: AckSMS },
  AckRequest: { type: 'protobuf', adapter: AckRequest },
};
