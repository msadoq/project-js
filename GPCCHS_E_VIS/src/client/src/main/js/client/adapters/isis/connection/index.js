// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const UCPParameter = require('./uCPParameter');
const UCPReport = require('./uCPReport');
const FlowInfo = require('./flowInfo');
const OperationDefinition = require('./operationDefinition');
const InitStationConfiguration = require('./initStationConfiguration');
const CUStatus = require('./cUStatus');
const FlowSmallStatus = require('./flowSmallStatus');
const StationStatus = require('./stationStatus');
const NominalStation = require('./nominalStation');
const FlowElmt = require('./flowElmt');
const StationList = require('./stationList');
const CUInfo = require('./cUInfo');
const InitFlowConfiguration = require('./initFlowConfiguration');
const StationFullStatus = require('./stationFullStatus');
const StationElmt = require('./stationElmt');
const CUFullStatus = require('./cUFullStatus');
const FlowList = require('./flowList');
const StationIdentifier = require('./stationIdentifier');
const FlowFullStatus = require('./flowFullStatus');
const CUOperationDefinition = require('./cUOperationDefinition');
const FlowConfiguration = require('./flowConfiguration');
const ProcessIdentifier = require('./processIdentifier');
const ProcessInfo = require('./processInfo');
const CUIdentifier = require('./cUIdentifier');
const FlowStatus = require('./flowStatus');
const FlowIdentifier = require('./flowIdentifier');
const ProcessFullState = require('./processFullState');

module.exports = {
  UCPParameter: { type: 'protobuf', adapter: UCPParameter },
  UCPReport: { type: 'protobuf', adapter: UCPReport },
  FlowInfo: { type: 'protobuf', adapter: FlowInfo },
  OperationDefinition: { type: 'protobuf', adapter: OperationDefinition },
  InitStationConfiguration: { type: 'protobuf', adapter: InitStationConfiguration },
  CUStatus: { type: 'protobuf', adapter: CUStatus },
  FlowSmallStatus: { type: 'protobuf', adapter: FlowSmallStatus },
  StationStatus: { type: 'protobuf', adapter: StationStatus },
  NominalStation: { type: 'protobuf', adapter: NominalStation },
  FlowElmt: { type: 'protobuf', adapter: FlowElmt },
  StationList: { type: 'protobuf', adapter: StationList },
  CUInfo: { type: 'protobuf', adapter: CUInfo },
  InitFlowConfiguration: { type: 'protobuf', adapter: InitFlowConfiguration },
  StationFullStatus: { type: 'protobuf', adapter: StationFullStatus },
  StationElmt: { type: 'protobuf', adapter: StationElmt },
  CUFullStatus: { type: 'protobuf', adapter: CUFullStatus },
  FlowList: { type: 'protobuf', adapter: FlowList },
  StationIdentifier: { type: 'protobuf', adapter: StationIdentifier },
  FlowFullStatus: { type: 'protobuf', adapter: FlowFullStatus },
  CUOperationDefinition: { type: 'protobuf', adapter: CUOperationDefinition },
  FlowConfiguration: { type: 'protobuf', adapter: FlowConfiguration },
  ProcessIdentifier: { type: 'protobuf', adapter: ProcessIdentifier },
  ProcessInfo: { type: 'protobuf', adapter: ProcessInfo },
  CUIdentifier: { type: 'protobuf', adapter: CUIdentifier },
  FlowStatus: { type: 'protobuf', adapter: FlowStatus },
  FlowIdentifier: { type: 'protobuf', adapter: FlowIdentifier },
  ProcessFullState: { type: 'protobuf', adapter: ProcessFullState },
};
