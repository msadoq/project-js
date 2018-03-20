// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const AckRequest = require('./ackRequest');
const AckSMS = require('./ackSMS');
const Ack = require('./ack');

module.exports = {
  AckRequest: { type: 'protobuf', adapter: AckRequest },
  AckSMS: { type: 'raw', adapter: AckSMS },
  Ack: { type: 'protobuf', adapter: Ack },
};
