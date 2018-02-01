// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const EncodingAction = require('./encodingAction');
const EncodeArgumentRequest = require('./encodeArgumentRequest');
const EncryptResponse = require('./encryptResponse');
const EncodedValue = require('./encodedValue');
const EncodeInvocation = require('./encodeInvocation');
const TimeTaggedTelecommand = require('./timeTaggedTelecommand');
const EncodedValuesList = require('./encodedValuesList');
const EncodeResponse = require('./encodeResponse');
const EncodeLargeTCInvocation = require('./encodeLargeTCInvocation');

module.exports = {
  EncodingAction: { type: 'protobuf', adapter: EncodingAction },
  EncodeArgumentRequest: { type: 'protobuf', adapter: EncodeArgumentRequest },
  EncryptResponse: { type: 'protobuf', adapter: EncryptResponse },
  EncodedValue: { type: 'protobuf', adapter: EncodedValue },
  EncodeInvocation: { type: 'protobuf', adapter: EncodeInvocation },
  TimeTaggedTelecommand: { type: 'protobuf', adapter: TimeTaggedTelecommand },
  EncodedValuesList: { type: 'protobuf', adapter: EncodedValuesList },
  EncodeResponse: { type: 'protobuf', adapter: EncodeResponse },
  EncodeLargeTCInvocation: { type: 'protobuf', adapter: EncodeLargeTCInvocation },
};
