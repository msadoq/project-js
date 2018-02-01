// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const PusHeader = require('./pusHeader');
const TCLong = require('./tCLong');
const TCImmediate = require('./tCImmediate');
const TCFile = require('./tCFile');
const TCDetails = require('./tCDetails');
const TC11 = require('./tC11');
const TCPhysicalParameter = require('./tCPhysicalParameter');
const TimeTaggedTC = require('./timeTaggedTC');
const ExpectedAck = require('./expectedAck');
const TCHistory = require('./tCHistory');
const GenericTC = require('./genericTC');
const SuccessiveAck = require('./successiveAck');
const TC13 = require('./tC13');

module.exports = {
  PusHeader: { type: 'protobuf', adapter: PusHeader },
  TCLong: { type: 'protobuf', adapter: TCLong },
  TCImmediate: { type: 'protobuf', adapter: TCImmediate },
  TCFile: { type: 'protobuf', adapter: TCFile },
  TCDetails: { type: 'protobuf', adapter: TCDetails },
  TC11: { type: 'protobuf', adapter: TC11 },
  TCPhysicalParameter: { type: 'protobuf', adapter: TCPhysicalParameter },
  TimeTaggedTC: { type: 'protobuf', adapter: TimeTaggedTC },
  ExpectedAck: { type: 'protobuf', adapter: ExpectedAck },
  TCHistory: { type: 'protobuf', adapter: TCHistory },
  GenericTC: { type: 'protobuf', adapter: GenericTC },
  SuccessiveAck: { type: 'protobuf', adapter: SuccessiveAck },
  TC13: { type: 'protobuf', adapter: TC13 },
};
