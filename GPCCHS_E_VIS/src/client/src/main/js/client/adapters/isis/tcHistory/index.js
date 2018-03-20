// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const TimeTaggedTC = require('./timeTaggedTC');
const GenericTC = require('./genericTC');
const SuccessiveAck = require('./successiveAck');
const TCHistory = require('./tCHistory');
const ExpectedAck = require('./expectedAck');
const TCDetails = require('./tCDetails');
const PusHeader = require('./pusHeader');
const TCImmediate = require('./tCImmediate');
const TCLong = require('./tCLong');
const TC11 = require('./tC11');
const TC13 = require('./tC13');
const TCFile = require('./tCFile');
const TCPhysicalParameter = require('./tCPhysicalParameter');

module.exports = {
  TimeTaggedTC: { type: 'protobuf', adapter: TimeTaggedTC },
  GenericTC: { type: 'protobuf', adapter: GenericTC },
  SuccessiveAck: { type: 'protobuf', adapter: SuccessiveAck },
  TCHistory: { type: 'protobuf', adapter: TCHistory },
  ExpectedAck: { type: 'protobuf', adapter: ExpectedAck },
  TCDetails: { type: 'protobuf', adapter: TCDetails },
  PusHeader: { type: 'protobuf', adapter: PusHeader },
  TCImmediate: { type: 'protobuf', adapter: TCImmediate },
  TCLong: { type: 'protobuf', adapter: TCLong },
  TC11: { type: 'protobuf', adapter: TC11 },
  TC13: { type: 'protobuf', adapter: TC13 },
  TCFile: { type: 'protobuf', adapter: TCFile },
  TCPhysicalParameter: { type: 'protobuf', adapter: TCPhysicalParameter },
};
