// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const EncodedValue = require('./encodedValue');
const EncodeArgumentRequest = require('./encodeArgumentRequest');
const EncodeInvocation = require('./encodeInvocation');
const EncodedValuesList = require('./encodedValuesList');
const EncodeResponse = require('./encodeResponse');
const TimeTaggedTelecommand = require('./timeTaggedTelecommand');
const EncodeLargeTCInvocation = require('./encodeLargeTCInvocation');
const EncodingAction = require('./encodingAction');
const EncryptResponse = require('./encryptResponse');

module.exports = {
  EncodedValue: { type: 'protobuf', adapter: EncodedValue },
  EncodeArgumentRequest: { type: 'protobuf', adapter: EncodeArgumentRequest },
  EncodeInvocation: { type: 'protobuf', adapter: EncodeInvocation },
  EncodedValuesList: { type: 'protobuf', adapter: EncodedValuesList },
  EncodeResponse: { type: 'protobuf', adapter: EncodeResponse },
  TimeTaggedTelecommand: { type: 'protobuf', adapter: TimeTaggedTelecommand },
  EncodeLargeTCInvocation: { type: 'protobuf', adapter: EncodeLargeTCInvocation },
  EncodingAction: { type: 'protobuf', adapter: EncodingAction },
  EncryptResponse: { type: 'protobuf', adapter: EncryptResponse },
};
