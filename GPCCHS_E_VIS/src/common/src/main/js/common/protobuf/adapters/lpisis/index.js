// Produced by Acceleo JavaScript Generator 1.1.0
/* eslint global-require:0 */

module.exports = {
  tcHistory: {
    TC11: require('./tcHistory/tC11'),
    TC13: require('./tcHistory/tC13'),
    TCFile: require('./tcHistory/tCFile'),
    TCHistory: require('./tcHistory/tCHistory'),
    TCImmediate: require('./tcHistory/tCImmediate'),
    TCLong: require('./tcHistory/tCLong'),
    TimeTaggedTC: require('./tcHistory/timeTaggedTC'),
  },
  ackRequest: {
    AckRequest: require('./ackRequest/ackRequest'),
    AckSMS: require('./ackRequest/ackSMS'),
  },
  ccsds_cs: {
    Provider: require('./ccsds_cs/provider'),
    ProviderDefinition: require('./ccsds_cs/providerDefinition'),
    User: require('./ccsds_cs/user'),
    UserContext: require('./ccsds_cs/userContext'),
  },
  ccsds_mc: {
    GroupDefinition: require('./ccsds_mc/groupDefinition'),
    StatisticFunctionDetails: require('./ccsds_mc/statisticFunctionDetails'),
    StatisticValue: require('./ccsds_mc/statisticValue'),
  },
  ccsds_mc_aggregation: {
    IsisAggregation: require('./ccsds_mc_aggregation/isisAggregation'),
  },
  computedEvent: {
    ComputedEvent: require('./computedEvent/computedEvent'),
  },
  execution: {
    Execution: require('./execution/execution'),
    ExecutionStatus: require('./execution/executionStatus'),
  },
  file: {
    Collection: require('./file/collection'),
    CollectionDocument: require('./file/collectionDocument'),
    CollectionVirtualFolder: require('./file/collectionVirtualFolder'),
    DocVersion: require('./file/docVersion'),
    Document: require('./file/document'),
    Folder: require('./file/folder'),
    ProfileRight: require('./file/profileRight'),
    UserRight: require('./file/userRight'),
  },
  lifeCycle: {
    LifeCycle: require('./lifeCycle/lifeCycle'),
    LifeCycleStatus: require('./lifeCycle/lifeCycleStatus'),
  },
  logbookEvent: {
    LogbookEvent: require('./logbookEvent/logbookEvent'),
  },
  operationParameter: {
    OperationParameter: require('./operationParameter/operationParameter'),
  },
  userEvent: {
    ExternalEvent: require('./userEvent/externalEvent'),
    UserEvent: require('./userEvent/userEvent'),
  },

  timeBasedDataType: {
    TimeBasedDataBlob: require('./timeBasedDataType/timeBasedDataBlob'),
    TimeBasedDataBoolean: require('./timeBasedDataType/timeBasedDataBoolean'),
    TimeBasedDataByte: require('./timeBasedDataType/timeBasedDataByte'),
    TimeBasedDataDouble: require('./timeBasedDataType/timeBasedDataDouble'),
    TimeBasedDataDuration: require('./timeBasedDataType/timeBasedDataDuration'),
    TimeBasedDataFinetime: require('./timeBasedDataType/timeBasedDataFinetime'),
    TimeBasedDataFloat: require('./timeBasedDataType/timeBasedDataFloat'),
    TimeBasedDataIdentifier: require('./timeBasedDataType/timeBasedDataIdentifier'),
    TimeBasedDataInteger: require('./timeBasedDataType/timeBasedDataInteger'),
    TimeBasedDataLong: require('./timeBasedDataType/timeBasedDataLong'),
    TimeBasedDataShort: require('./timeBasedDataType/timeBasedDataShort'),
    TimeBasedDataString: require('./timeBasedDataType/timeBasedDataString'),
    TimeBasedDataTime: require('./timeBasedDataType/timeBasedDataTime'),
    TimeBasedDataUByte: require('./timeBasedDataType/timeBasedDataUByte'),
    TimeBasedDataUInteger: require('./timeBasedDataType/timeBasedDataUInteger'),
    TimeBasedDataULong: require('./timeBasedDataType/timeBasedDataULong'),
    TimeBasedDataURI: require('./timeBasedDataType/timeBasedDataURI'),
    TimeBasedDataUShort: require('./timeBasedDataType/timeBasedDataUShort'),
  },
  accessControlModel: {
    UserConnection: require('./accessControlModel/userConnection'),
  },
  pusGroundModel: {
    Pus003Model: require('./pusGroundModel/pus003Model'),
    Pus005Model: require('./pusGroundModel/pus005Model'),
    Pus011Command: require('./pusGroundModel/pus011Command'),
    Pus011Model: require('./pusGroundModel/pus011Model'),
    Pus011SubSchedule: require('./pusGroundModel/pus011SubSchedule'),
    Pus011SyncPoint: require('./pusGroundModel/pus011SyncPoint'),
    Pus012Model: require('./pusGroundModel/pus012Model'),
    Pus013Model: require('./pusGroundModel/pus013Model'),
    Pus014Model: require('./pusGroundModel/pus014Model'),
    Pus015Model: require('./pusGroundModel/pus015Model'),
    Pus018Model: require('./pusGroundModel/pus018Model'),
    Pus019Model: require('./pusGroundModel/pus019Model'),
    Pus140Model: require('./pusGroundModel/pus140Model'),
    Pus142Model: require('./pusGroundModel/pus142Model'),
    Pus144Model: require('./pusGroundModel/pus144Model'),
  },
  connection: {
    UCPReport: require('./connection/uCPReport'),
  },
  cop1: {
    COP1Context: require('./cop1/cOP1Context'),
  },
  decommutedPacket: {
    DecommutedPacket: require('./decommutedPacket/decommutedPacket'),
  },
  decommutedParameter: {
    ReportingParameter: require('./decommutedParameter/reportingParameter'),
  },
  groundAlarm: {
    GroundMonitoringAlarm: require('./groundAlarm/groundMonitoringAlarm'),
  },
  packet: {
    ClcwPacket: require('./packet/clcwPacket'),
    RmPacket: require('./packet/rmPacket'),
    TmPacket: require('./packet/tmPacket'),
  },
  ackRequest: {
    AckRequest: require('./ackRequest/ackRequest'),
    AckSMS: require('./ackRequest/ackSMS'),
  },
  computedEvent: {
    ComputedEvent: require('./computedEvent/computedEvent'),
  },
  opAlert: {
    OpAlert: require('./opAlert/opAlert'),
  },
  userEvent: {
    ExternalEvent: require('./userEvent/externalEvent'),
    UserEvent: require('./userEvent/userEvent'),
  },
};
