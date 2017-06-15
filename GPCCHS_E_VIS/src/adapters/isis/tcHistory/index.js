// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const ExpectedAck = require('./expectedAck');
const PusHeader = require('./pusHeader');
const SuccessiveAck = require('./successiveAck');
const TC11 = require('./tC11');
const TC13 = require('./tC13');
const TCDetails = require('./tCDetails');
const TCFile = require('./tCFile');
const TCHistory = require('./tCHistory');
const TCImmediate = require('./tCImmediate');
const TCLong = require('./tCLong');
const TCPhysicalParameter = require('./tCPhysicalParameter');
const TimeTaggedTC = require('./timeTaggedTC');

module.exports = {
  ExpectedAck: {type: "protobuf", adapter: ExpectedAck},
  PusHeader: {type: "protobuf", adapter: PusHeader},
  SuccessiveAck: {type: "protobuf", adapter: SuccessiveAck},
  TC11: {type: "protobuf", adapter: TC11},
  TC13: {type: "protobuf", adapter: TC13},
  TCDetails: {type: "protobuf", adapter: TCDetails},
  TCFile: {type: "protobuf", adapter: TCFile},
  TCHistory: {type: "protobuf", adapter: TCHistory},
  TCImmediate: {type: "protobuf", adapter: TCImmediate},
  TCLong: {type: "protobuf", adapter: TCLong},
  TCPhysicalParameter: {type: "protobuf", adapter: TCPhysicalParameter},
  TimeTaggedTC: {type: "protobuf", adapter: TimeTaggedTC},
};
