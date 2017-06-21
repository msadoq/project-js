// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ExpectedAck = require('./expectedAck');
const TCDetails = require('./tCDetails');
const TCFile = require('./tCFile');
const TimeTaggedTC = require('./timeTaggedTC');
const TC13 = require('./tC13');
const SuccessiveAck = require('./successiveAck');
const TCHistory = require('./tCHistory');
const TCPhysicalParameter = require('./tCPhysicalParameter');
const TCLong = require('./tCLong');
const TCImmediate = require('./tCImmediate');
const TC11 = require('./tC11');
const GenericTC = require('./genericTC');
const PusHeader = require('./pusHeader');

module.exports = {
  ExpectedAck: { type: 'protobuf', adapter: ExpectedAck },
  TCDetails: { type: 'protobuf', adapter: TCDetails },
  TCFile: { type: 'protobuf', adapter: TCFile },
  TimeTaggedTC: { type: 'protobuf', adapter: TimeTaggedTC },
  TC13: { type: 'protobuf', adapter: TC13 },
  SuccessiveAck: { type: 'protobuf', adapter: SuccessiveAck },
  TCHistory: { type: 'protobuf', adapter: TCHistory },
  TCPhysicalParameter: { type: 'protobuf', adapter: TCPhysicalParameter },
  TCLong: { type: 'protobuf', adapter: TCLong },
  TCImmediate: { type: 'protobuf', adapter: TCImmediate },
  TC11: { type: 'protobuf', adapter: TC11 },
  GenericTC: { type: 'protobuf', adapter: GenericTC },
  PusHeader: { type: 'protobuf', adapter: PusHeader },
};
