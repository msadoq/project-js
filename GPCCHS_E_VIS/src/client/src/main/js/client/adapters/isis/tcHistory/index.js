// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ExpectedAck = require('./expectedAck');
const TCDetails = require('./tCDetails');
const TCImmediate = require('./tCImmediate');
const SuccessiveAck = require('./successiveAck');
const TCLong = require('./tCLong');
const TCPhysicalParameter = require('./tCPhysicalParameter');
const TimeTaggedTC = require('./timeTaggedTC');
const GenericTC = require('./genericTC');
const TCFile = require('./tCFile');
const TC11 = require('./tC11');
const TCHistory = require('./tCHistory');
const TC13 = require('./tC13');
const PusHeader = require('./pusHeader');

module.exports = {
  ExpectedAck: { type: 'protobuf', adapter: ExpectedAck },
  TCDetails: { type: 'protobuf', adapter: TCDetails },
  TCImmediate: { type: 'protobuf', adapter: TCImmediate },
  SuccessiveAck: { type: 'protobuf', adapter: SuccessiveAck },
  TCLong: { type: 'protobuf', adapter: TCLong },
  TCPhysicalParameter: { type: 'protobuf', adapter: TCPhysicalParameter },
  TimeTaggedTC: { type: 'protobuf', adapter: TimeTaggedTC },
  GenericTC: { type: 'protobuf', adapter: GenericTC },
  TCFile: { type: 'protobuf', adapter: TCFile },
  TC11: { type: 'protobuf', adapter: TC11 },
  TCHistory: { type: 'protobuf', adapter: TCHistory },
  TC13: { type: 'protobuf', adapter: TC13 },
  PusHeader: { type: 'protobuf', adapter: PusHeader },
};
