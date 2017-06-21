// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const EncryptResponse = require('./encryptResponse');
const EncodeInvocation = require('./encodeInvocation');
const EncodeLargeTCInvocation = require('./encodeLargeTCInvocation');
const EncodingAction = require('./encodingAction');
const EncodeResponse = require('./encodeResponse');
const TimeTaggedTelecommand = require('./timeTaggedTelecommand');
const EncodedValue = require('./encodedValue');
const EncodedValuesList = require('./encodedValuesList');
const EncodeArgumentRequest = require('./encodeArgumentRequest');

module.exports = {
  EncryptResponse: { type: 'protobuf', adapter: EncryptResponse },
  EncodeInvocation: { type: 'protobuf', adapter: EncodeInvocation },
  EncodeLargeTCInvocation: { type: 'protobuf', adapter: EncodeLargeTCInvocation },
  EncodingAction: { type: 'protobuf', adapter: EncodingAction },
  EncodeResponse: { type: 'protobuf', adapter: EncodeResponse },
  TimeTaggedTelecommand: { type: 'protobuf', adapter: TimeTaggedTelecommand },
  EncodedValue: { type: 'protobuf', adapter: EncodedValue },
  EncodedValuesList: { type: 'protobuf', adapter: EncodedValuesList },
  EncodeArgumentRequest: { type: 'protobuf', adapter: EncodeArgumentRequest },
};
