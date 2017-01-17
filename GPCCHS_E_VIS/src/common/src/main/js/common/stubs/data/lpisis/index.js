// Generated file
/* eslint global-require:0 */

const protobuf = require('../../../protobuf');

module.exports = {
  getTC11: require('./tcHistory/tC11'),
  getTC11Protobuf: override => protobuf.encode(
    'lpisis.tcHistory.TC11',
    require('./tcHistory/tC11')(override)
  ),
  getTC11DeProtobuf: proto => protobuf.decode(
    'lpisis.tcHistory.TC11',
    proto
  ),

  getTC13: require('./tcHistory/tC13'),
  getTC13Protobuf: override => protobuf.encode(
    'lpisis.tcHistory.TC13',
    require('./tcHistory/tC13')(override)
  ),
  getTC13DeProtobuf: proto => protobuf.decode(
    'lpisis.tcHistory.TC13',
    proto
  ),

  getTCFile: require('./tcHistory/tCFile'),
  getTCFileProtobuf: override => protobuf.encode(
    'lpisis.tcHistory.TCFile',
    require('./tcHistory/tCFile')(override)
  ),
  getTCFileDeProtobuf: proto => protobuf.decode(
    'lpisis.tcHistory.TCFile',
    proto
  ),

  getTCHistory: require('./tcHistory/tCHistory'),
  getTCHistoryProtobuf: override => protobuf.encode(
    'lpisis.tcHistory.TCHistory',
    require('./tcHistory/tCHistory')(override)
  ),
  getTCHistoryDeProtobuf: proto => protobuf.decode(
    'lpisis.tcHistory.TCHistory',
    proto
  ),

  getTCImmediate: require('./tcHistory/tCImmediate'),
  getTCImmediateProtobuf: override => protobuf.encode(
    'lpisis.tcHistory.TCImmediate',
    require('./tcHistory/tCImmediate')(override)
  ),
  getTCImmediateDeProtobuf: proto => protobuf.decode(
    'lpisis.tcHistory.TCImmediate',
    proto
  ),

  getTCLong: require('./tcHistory/tCLong'),
  getTCLongProtobuf: override => protobuf.encode(
    'lpisis.tcHistory.TCLong',
    require('./tcHistory/tCLong')(override)
  ),
  getTCLongDeProtobuf: proto => protobuf.decode(
    'lpisis.tcHistory.TCLong',
    proto
  ),

  getTimeTaggedTC: require('./tcHistory/timeTaggedTC'),
  getTimeTaggedTCProtobuf: override => protobuf.encode(
    'lpisis.tcHistory.TimeTaggedTC',
    require('./tcHistory/timeTaggedTC')(override)
  ),
  getTimeTaggedTCDeProtobuf: proto => protobuf.decode(
    'lpisis.tcHistory.TimeTaggedTC',
    proto
  ),
  getAckRequest: require('./ackRequest/ackRequest'),
  getAckRequestProtobuf: override => protobuf.encode(
    'lpisis.ackRequest.AckRequest',
    require('./ackRequest/ackRequest')(override)
  ),
  getAckRequestDeProtobuf: proto => protobuf.decode(
    'lpisis.ackRequest.AckRequest',
    proto
  ),

  getAckSMS: require('./ackRequest/ackSMS'),
  getAckSMSProtobuf: override => protobuf.encode(
    'lpisis.ackRequest.AckSMS',
    require('./ackRequest/ackSMS')(override)
  ),
  getAckSMSDeProtobuf: proto => protobuf.decode(
    'lpisis.ackRequest.AckSMS',
    proto
  ),
  getProvider: require('./ccsds_cs/provider'),
  getProviderProtobuf: override => protobuf.encode(
    'lpisis.ccsds_cs.Provider',
    require('./ccsds_cs/provider')(override)
  ),
  getProviderDeProtobuf: proto => protobuf.decode(
    'lpisis.ccsds_cs.Provider',
    proto
  ),

  getProviderDefinition: require('./ccsds_cs/providerDefinition'),
  getProviderDefinitionProtobuf: override => protobuf.encode(
    'lpisis.ccsds_cs.ProviderDefinition',
    require('./ccsds_cs/providerDefinition')(override)
  ),
  getProviderDefinitionDeProtobuf: proto => protobuf.decode(
    'lpisis.ccsds_cs.ProviderDefinition',
    proto
  ),

  getUser: require('./ccsds_cs/user'),
  getUserProtobuf: override => protobuf.encode(
    'lpisis.ccsds_cs.User',
    require('./ccsds_cs/user')(override)
  ),
  getUserDeProtobuf: proto => protobuf.decode(
    'lpisis.ccsds_cs.User',
    proto
  ),

  getUserContext: require('./ccsds_cs/userContext'),
  getUserContextProtobuf: override => protobuf.encode(
    'lpisis.ccsds_cs.UserContext',
    require('./ccsds_cs/userContext')(override)
  ),
  getUserContextDeProtobuf: proto => protobuf.decode(
    'lpisis.ccsds_cs.UserContext',
    proto
  ),
  getGroupDefinition: require('./ccsds_mc/groupDefinition'),
  getGroupDefinitionProtobuf: override => protobuf.encode(
    'lpisis.ccsds_mc.GroupDefinition',
    require('./ccsds_mc/groupDefinition')(override)
  ),
  getGroupDefinitionDeProtobuf: proto => protobuf.decode(
    'lpisis.ccsds_mc.GroupDefinition',
    proto
  ),

  getStatisticFunctionDetails: require('./ccsds_mc/statisticFunctionDetails'),
  getStatisticFunctionDetailsProtobuf: override => protobuf.encode(
    'lpisis.ccsds_mc.StatisticFunctionDetails',
    require('./ccsds_mc/statisticFunctionDetails')(override)
  ),
  getStatisticFunctionDetailsDeProtobuf: proto => protobuf.decode(
    'lpisis.ccsds_mc.StatisticFunctionDetails',
    proto
  ),

  getStatisticValue: require('./ccsds_mc/statisticValue'),
  getStatisticValueProtobuf: override => protobuf.encode(
    'lpisis.ccsds_mc.StatisticValue',
    require('./ccsds_mc/statisticValue')(override)
  ),
  getStatisticValueDeProtobuf: proto => protobuf.decode(
    'lpisis.ccsds_mc.StatisticValue',
    proto
  ),
  getIsisAggregation: require('./ccsds_mc_aggregation/isisAggregation'),
  getIsisAggregationProtobuf: override => protobuf.encode(
    'lpisis.ccsds_mc_aggregation.IsisAggregation',
    require('./ccsds_mc_aggregation/isisAggregation')(override)
  ),
  getIsisAggregationDeProtobuf: proto => protobuf.decode(
    'lpisis.ccsds_mc_aggregation.IsisAggregation',
    proto
  ),
  getComputedEvent: require('./computedEvent/computedEvent'),
  getComputedEventProtobuf: override => protobuf.encode(
    'lpisis.computedEvent.ComputedEvent',
    require('./computedEvent/computedEvent')(override)
  ),
  getComputedEventDeProtobuf: proto => protobuf.decode(
    'lpisis.computedEvent.ComputedEvent',
    proto
  ),
  getExecution: require('./execution/execution'),
  getExecutionProtobuf: override => protobuf.encode(
    'lpisis.execution.Execution',
    require('./execution/execution')(override)
  ),
  getExecutionDeProtobuf: proto => protobuf.decode(
    'lpisis.execution.Execution',
    proto
  ),

  getExecutionStatus: require('./execution/executionStatus'),
  getExecutionStatusProtobuf: override => protobuf.encode(
    'lpisis.execution.ExecutionStatus',
    require('./execution/executionStatus')(override)
  ),
  getExecutionStatusDeProtobuf: proto => protobuf.decode(
    'lpisis.execution.ExecutionStatus',
    proto
  ),
  getCollection: require('./file/collection'),
  getCollectionProtobuf: override => protobuf.encode(
    'lpisis.file.Collection',
    require('./file/collection')(override)
  ),
  getCollectionDeProtobuf: proto => protobuf.decode(
    'lpisis.file.Collection',
    proto
  ),

  getDocVersion: require('./file/docVersion'),
  getDocVersionProtobuf: override => protobuf.encode(
    'lpisis.file.DocVersion',
    require('./file/docVersion')(override)
  ),
  getDocVersionDeProtobuf: proto => protobuf.decode(
    'lpisis.file.DocVersion',
    proto
  ),

  getDocument: require('./file/document'),
  getDocumentProtobuf: override => protobuf.encode(
    'lpisis.file.Document',
    require('./file/document')(override)
  ),
  getDocumentDeProtobuf: proto => protobuf.decode(
    'lpisis.file.Document',
    proto
  ),

  getFolder: require('./file/folder'),
  getFolderProtobuf: override => protobuf.encode(
    'lpisis.file.Folder',
    require('./file/folder')(override)
  ),
  getFolderDeProtobuf: proto => protobuf.decode(
    'lpisis.file.Folder',
    proto
  ),
  getLifeCycle: require('./lifeCycle/lifeCycle'),
  getLifeCycleProtobuf: override => protobuf.encode(
    'lpisis.lifeCycle.LifeCycle',
    require('./lifeCycle/lifeCycle')(override)
  ),
  getLifeCycleDeProtobuf: proto => protobuf.decode(
    'lpisis.lifeCycle.LifeCycle',
    proto
  ),

  getLifeCycleStatus: require('./lifeCycle/lifeCycleStatus'),
  getLifeCycleStatusProtobuf: override => protobuf.encode(
    'lpisis.lifeCycle.LifeCycleStatus',
    require('./lifeCycle/lifeCycleStatus')(override)
  ),
  getLifeCycleStatusDeProtobuf: proto => protobuf.decode(
    'lpisis.lifeCycle.LifeCycleStatus',
    proto
  ),
  getLogbookEvent: require('./logbookEvent/logbookEvent'),
  getLogbookEventProtobuf: override => protobuf.encode(
    'lpisis.logbookEvent.LogbookEvent',
    require('./logbookEvent/logbookEvent')(override)
  ),
  getLogbookEventDeProtobuf: proto => protobuf.decode(
    'lpisis.logbookEvent.LogbookEvent',
    proto
  ),
  getOperationParameter: require('./operationParameter/operationParameter'),
  getOperationParameterProtobuf: override => protobuf.encode(
    'lpisis.operationParameter.OperationParameter',
    require('./operationParameter/operationParameter')(override)
  ),
  getOperationParameterDeProtobuf: proto => protobuf.decode(
    'lpisis.operationParameter.OperationParameter',
    proto
  ),
  getExternalEvent: require('./userEvent/externalEvent'),
  getExternalEventProtobuf: override => protobuf.encode(
    'lpisis.userEvent.ExternalEvent',
    require('./userEvent/externalEvent')(override)
  ),
  getExternalEventDeProtobuf: proto => protobuf.decode(
    'lpisis.userEvent.ExternalEvent',
    proto
  ),

  getUserEvent: require('./userEvent/userEvent'),
  getUserEventProtobuf: override => protobuf.encode(
    'lpisis.userEvent.UserEvent',
    require('./userEvent/userEvent')(override)
  ),
  getUserEventDeProtobuf: proto => protobuf.decode(
    'lpisis.userEvent.UserEvent',
    proto
  ),

  getTimeBasedDataBlob: require('./timeBasedDataType/timeBasedDataBlob'),
  getTimeBasedDataBlobProtobuf: override => protobuf.encode(
    'lpisis.timeBasedDataType.TimeBasedDataBlob',
    require('./timeBasedDataType/timeBasedDataBlob')(override)
  ),
  getTimeBasedDataBlobDeProtobuf: proto => protobuf.decode(
    'lpisis.timeBasedDataType.TimeBasedDataBlob',
    proto
  ),

  getTimeBasedDataBoolean: require('./timeBasedDataType/timeBasedDataBoolean'),
  getTimeBasedDataBooleanProtobuf: override => protobuf.encode(
    'lpisis.timeBasedDataType.TimeBasedDataBoolean',
    require('./timeBasedDataType/timeBasedDataBoolean')(override)
  ),
  getTimeBasedDataBooleanDeProtobuf: proto => protobuf.decode(
    'lpisis.timeBasedDataType.TimeBasedDataBoolean',
    proto
  ),

  getTimeBasedDataByte: require('./timeBasedDataType/timeBasedDataByte'),
  getTimeBasedDataByteProtobuf: override => protobuf.encode(
    'lpisis.timeBasedDataType.TimeBasedDataByte',
    require('./timeBasedDataType/timeBasedDataByte')(override)
  ),
  getTimeBasedDataByteDeProtobuf: proto => protobuf.decode(
    'lpisis.timeBasedDataType.TimeBasedDataByte',
    proto
  ),

  getTimeBasedDataDouble: require('./timeBasedDataType/timeBasedDataDouble'),
  getTimeBasedDataDoubleProtobuf: override => protobuf.encode(
    'lpisis.timeBasedDataType.TimeBasedDataDouble',
    require('./timeBasedDataType/timeBasedDataDouble')(override)
  ),
  getTimeBasedDataDoubleDeProtobuf: proto => protobuf.decode(
    'lpisis.timeBasedDataType.TimeBasedDataDouble',
    proto
  ),

  getTimeBasedDataDuration: require('./timeBasedDataType/timeBasedDataDuration'),
  getTimeBasedDataDurationProtobuf: override => protobuf.encode(
    'lpisis.timeBasedDataType.TimeBasedDataDuration',
    require('./timeBasedDataType/timeBasedDataDuration')(override)
  ),
  getTimeBasedDataDurationDeProtobuf: proto => protobuf.decode(
    'lpisis.timeBasedDataType.TimeBasedDataDuration',
    proto
  ),

  getTimeBasedDataFinetime: require('./timeBasedDataType/timeBasedDataFinetime'),
  getTimeBasedDataFinetimeProtobuf: override => protobuf.encode(
    'lpisis.timeBasedDataType.TimeBasedDataFinetime',
    require('./timeBasedDataType/timeBasedDataFinetime')(override)
  ),
  getTimeBasedDataFinetimeDeProtobuf: proto => protobuf.decode(
    'lpisis.timeBasedDataType.TimeBasedDataFinetime',
    proto
  ),

  getTimeBasedDataFloat: require('./timeBasedDataType/timeBasedDataFloat'),
  getTimeBasedDataFloatProtobuf: override => protobuf.encode(
    'lpisis.timeBasedDataType.TimeBasedDataFloat',
    require('./timeBasedDataType/timeBasedDataFloat')(override)
  ),
  getTimeBasedDataFloatDeProtobuf: proto => protobuf.decode(
    'lpisis.timeBasedDataType.TimeBasedDataFloat',
    proto
  ),

  getTimeBasedDataIdentifier: require('./timeBasedDataType/timeBasedDataIdentifier'),
  getTimeBasedDataIdentifierProtobuf: override => protobuf.encode(
    'lpisis.timeBasedDataType.TimeBasedDataIdentifier',
    require('./timeBasedDataType/timeBasedDataIdentifier')(override)
  ),
  getTimeBasedDataIdentifierDeProtobuf: proto => protobuf.decode(
    'lpisis.timeBasedDataType.TimeBasedDataIdentifier',
    proto
  ),

  getTimeBasedDataInteger: require('./timeBasedDataType/timeBasedDataInteger'),
  getTimeBasedDataIntegerProtobuf: override => protobuf.encode(
    'lpisis.timeBasedDataType.TimeBasedDataInteger',
    require('./timeBasedDataType/timeBasedDataInteger')(override)
  ),
  getTimeBasedDataIntegerDeProtobuf: proto => protobuf.decode(
    'lpisis.timeBasedDataType.TimeBasedDataInteger',
    proto
  ),

  getTimeBasedDataLong: require('./timeBasedDataType/timeBasedDataLong'),
  getTimeBasedDataLongProtobuf: override => protobuf.encode(
    'lpisis.timeBasedDataType.TimeBasedDataLong',
    require('./timeBasedDataType/timeBasedDataLong')(override)
  ),
  getTimeBasedDataLongDeProtobuf: proto => protobuf.decode(
    'lpisis.timeBasedDataType.TimeBasedDataLong',
    proto
  ),

  getTimeBasedDataShort: require('./timeBasedDataType/timeBasedDataShort'),
  getTimeBasedDataShortProtobuf: override => protobuf.encode(
    'lpisis.timeBasedDataType.TimeBasedDataShort',
    require('./timeBasedDataType/timeBasedDataShort')(override)
  ),
  getTimeBasedDataShortDeProtobuf: proto => protobuf.decode(
    'lpisis.timeBasedDataType.TimeBasedDataShort',
    proto
  ),

  getTimeBasedDataString: require('./timeBasedDataType/timeBasedDataString'),
  getTimeBasedDataStringProtobuf: override => protobuf.encode(
    'lpisis.timeBasedDataType.TimeBasedDataString',
    require('./timeBasedDataType/timeBasedDataString')(override)
  ),
  getTimeBasedDataStringDeProtobuf: proto => protobuf.decode(
    'lpisis.timeBasedDataType.TimeBasedDataString',
    proto
  ),

  getTimeBasedDataTime: require('./timeBasedDataType/timeBasedDataTime'),
  getTimeBasedDataTimeProtobuf: override => protobuf.encode(
    'lpisis.timeBasedDataType.TimeBasedDataTime',
    require('./timeBasedDataType/timeBasedDataTime')(override)
  ),
  getTimeBasedDataTimeDeProtobuf: proto => protobuf.decode(
    'lpisis.timeBasedDataType.TimeBasedDataTime',
    proto
  ),

  getTimeBasedDataUByte: require('./timeBasedDataType/timeBasedDataUByte'),
  getTimeBasedDataUByteProtobuf: override => protobuf.encode(
    'lpisis.timeBasedDataType.TimeBasedDataUByte',
    require('./timeBasedDataType/timeBasedDataUByte')(override)
  ),
  getTimeBasedDataUByteDeProtobuf: proto => protobuf.decode(
    'lpisis.timeBasedDataType.TimeBasedDataUByte',
    proto
  ),

  getTimeBasedDataUInteger: require('./timeBasedDataType/timeBasedDataUInteger'),
  getTimeBasedDataUIntegerProtobuf: override => protobuf.encode(
    'lpisis.timeBasedDataType.TimeBasedDataUInteger',
    require('./timeBasedDataType/timeBasedDataUInteger')(override)
  ),
  getTimeBasedDataUIntegerDeProtobuf: proto => protobuf.decode(
    'lpisis.timeBasedDataType.TimeBasedDataUInteger',
    proto
  ),

  getTimeBasedDataULong: require('./timeBasedDataType/timeBasedDataULong'),
  getTimeBasedDataULongProtobuf: override => protobuf.encode(
    'lpisis.timeBasedDataType.TimeBasedDataULong',
    require('./timeBasedDataType/timeBasedDataULong')(override)
  ),
  getTimeBasedDataULongDeProtobuf: proto => protobuf.decode(
    'lpisis.timeBasedDataType.TimeBasedDataULong',
    proto
  ),

  getTimeBasedDataURI: require('./timeBasedDataType/timeBasedDataURI'),
  getTimeBasedDataURIProtobuf: override => protobuf.encode(
    'lpisis.timeBasedDataType.TimeBasedDataURI',
    require('./timeBasedDataType/timeBasedDataURI')(override)
  ),
  getTimeBasedDataURIDeProtobuf: proto => protobuf.decode(
    'lpisis.timeBasedDataType.TimeBasedDataURI',
    proto
  ),

  getTimeBasedDataUShort: require('./timeBasedDataType/timeBasedDataUShort'),
  getTimeBasedDataUShortProtobuf: override => protobuf.encode(
    'lpisis.timeBasedDataType.TimeBasedDataUShort',
    require('./timeBasedDataType/timeBasedDataUShort')(override)
  ),
  getTimeBasedDataUShortDeProtobuf: proto => protobuf.decode(
    'lpisis.timeBasedDataType.TimeBasedDataUShort',
    proto
  ),
  getUserConnection: require('./accessControlModel/userConnection'),
  getUserConnectionProtobuf: override => protobuf.encode(
    'lpisis.accessControlModel.UserConnection',
    require('./accessControlModel/userConnection')(override)
  ),
  getUserConnectionDeProtobuf: proto => protobuf.decode(
    'lpisis.accessControlModel.UserConnection',
    proto
  ),
  getPus003Model: require('./pusGroundModel/pus003Model'),
  getPus003ModelProtobuf: override => protobuf.encode(
    'lpisis.pusGroundModel.Pus003Model',
    require('./pusGroundModel/pus003Model')(override)
  ),
  getPus003ModelDeProtobuf: proto => protobuf.decode(
    'lpisis.pusGroundModel.Pus003Model',
    proto
  ),

  getPus005Model: require('./pusGroundModel/pus005Model'),
  getPus005ModelProtobuf: override => protobuf.encode(
    'lpisis.pusGroundModel.Pus005Model',
    require('./pusGroundModel/pus005Model')(override)
  ),
  getPus005ModelDeProtobuf: proto => protobuf.decode(
    'lpisis.pusGroundModel.Pus005Model',
    proto
  ),

  getPus011Command: require('./pusGroundModel/pus011Command'),
  getPus011CommandProtobuf: override => protobuf.encode(
    'lpisis.pusGroundModel.Pus011Command',
    require('./pusGroundModel/pus011Command')(override)
  ),
  getPus011CommandDeProtobuf: proto => protobuf.decode(
    'lpisis.pusGroundModel.Pus011Command',
    proto
  ),

  getPus011Model: require('./pusGroundModel/pus011Model'),
  getPus011ModelProtobuf: override => protobuf.encode(
    'lpisis.pusGroundModel.Pus011Model',
    require('./pusGroundModel/pus011Model')(override)
  ),
  getPus011ModelDeProtobuf: proto => protobuf.decode(
    'lpisis.pusGroundModel.Pus011Model',
    proto
  ),

  getPus011SubSchedule: require('./pusGroundModel/pus011SubSchedule'),
  getPus011SubScheduleProtobuf: override => protobuf.encode(
    'lpisis.pusGroundModel.Pus011SubSchedule',
    require('./pusGroundModel/pus011SubSchedule')(override)
  ),
  getPus011SubScheduleDeProtobuf: proto => protobuf.decode(
    'lpisis.pusGroundModel.Pus011SubSchedule',
    proto
  ),

  getPus011SyncPoint: require('./pusGroundModel/pus011SyncPoint'),
  getPus011SyncPointProtobuf: override => protobuf.encode(
    'lpisis.pusGroundModel.Pus011SyncPoint',
    require('./pusGroundModel/pus011SyncPoint')(override)
  ),
  getPus011SyncPointDeProtobuf: proto => protobuf.decode(
    'lpisis.pusGroundModel.Pus011SyncPoint',
    proto
  ),

  getPus012Model: require('./pusGroundModel/pus012Model'),
  getPus012ModelProtobuf: override => protobuf.encode(
    'lpisis.pusGroundModel.Pus012Model',
    require('./pusGroundModel/pus012Model')(override)
  ),
  getPus012ModelDeProtobuf: proto => protobuf.decode(
    'lpisis.pusGroundModel.Pus012Model',
    proto
  ),

  getPus013Model: require('./pusGroundModel/pus013Model'),
  getPus013ModelProtobuf: override => protobuf.encode(
    'lpisis.pusGroundModel.Pus013Model',
    require('./pusGroundModel/pus013Model')(override)
  ),
  getPus013ModelDeProtobuf: proto => protobuf.decode(
    'lpisis.pusGroundModel.Pus013Model',
    proto
  ),

  getPus014Model: require('./pusGroundModel/pus014Model'),
  getPus014ModelProtobuf: override => protobuf.encode(
    'lpisis.pusGroundModel.Pus014Model',
    require('./pusGroundModel/pus014Model')(override)
  ),
  getPus014ModelDeProtobuf: proto => protobuf.decode(
    'lpisis.pusGroundModel.Pus014Model',
    proto
  ),

  getPus015Model: require('./pusGroundModel/pus015Model'),
  getPus015ModelProtobuf: override => protobuf.encode(
    'lpisis.pusGroundModel.Pus015Model',
    require('./pusGroundModel/pus015Model')(override)
  ),
  getPus015ModelDeProtobuf: proto => protobuf.decode(
    'lpisis.pusGroundModel.Pus015Model',
    proto
  ),

  getPus018Model: require('./pusGroundModel/pus018Model'),
  getPus018ModelProtobuf: override => protobuf.encode(
    'lpisis.pusGroundModel.Pus018Model',
    require('./pusGroundModel/pus018Model')(override)
  ),
  getPus018ModelDeProtobuf: proto => protobuf.decode(
    'lpisis.pusGroundModel.Pus018Model',
    proto
  ),

  getPus019Model: require('./pusGroundModel/pus019Model'),
  getPus019ModelProtobuf: override => protobuf.encode(
    'lpisis.pusGroundModel.Pus019Model',
    require('./pusGroundModel/pus019Model')(override)
  ),
  getPus019ModelDeProtobuf: proto => protobuf.decode(
    'lpisis.pusGroundModel.Pus019Model',
    proto
  ),

  getPus140Model: require('./pusGroundModel/pus140Model'),
  getPus140ModelProtobuf: override => protobuf.encode(
    'lpisis.pusGroundModel.Pus140Model',
    require('./pusGroundModel/pus140Model')(override)
  ),
  getPus140ModelDeProtobuf: proto => protobuf.decode(
    'lpisis.pusGroundModel.Pus140Model',
    proto
  ),

  getPus142Model: require('./pusGroundModel/pus142Model'),
  getPus142ModelProtobuf: override => protobuf.encode(
    'lpisis.pusGroundModel.Pus142Model',
    require('./pusGroundModel/pus142Model')(override)
  ),
  getPus142ModelDeProtobuf: proto => protobuf.decode(
    'lpisis.pusGroundModel.Pus142Model',
    proto
  ),

  getPus144Model: require('./pusGroundModel/pus144Model'),
  getPus144ModelProtobuf: override => protobuf.encode(
    'lpisis.pusGroundModel.Pus144Model',
    require('./pusGroundModel/pus144Model')(override)
  ),
  getPus144ModelDeProtobuf: proto => protobuf.decode(
    'lpisis.pusGroundModel.Pus144Model',
    proto
  ),
  getUCPReport: require('./connection/uCPReport'),
  getUCPReportProtobuf: override => protobuf.encode(
    'lpisis.connection.UCPReport',
    require('./connection/uCPReport')(override)
  ),
  getUCPReportDeProtobuf: proto => protobuf.decode(
    'lpisis.connection.UCPReport',
    proto
  ),
  getCOP1Context: require('./cop1/cOP1Context'),
  getCOP1ContextProtobuf: override => protobuf.encode(
    'lpisis.cop1.COP1Context',
    require('./cop1/cOP1Context')(override)
  ),
  getCOP1ContextDeProtobuf: proto => protobuf.decode(
    'lpisis.cop1.COP1Context',
    proto
  ),
  getDecommutedPacket: require('./decommutedPacket/decommutedPacket'),
  getDecommutedPacketProtobuf: override => protobuf.encode(
    'lpisis.decommutedPacket.DecommutedPacket',
    require('./decommutedPacket/decommutedPacket')(override)
  ),
  getDecommutedPacketDeProtobuf: proto => protobuf.decode(
    'lpisis.decommutedPacket.DecommutedPacket',
    proto
  ),
  getReportingParameter: require('./decommutedParameter/reportingParameter'),
  getReportingParameterProtobuf: override => protobuf.encode(
    'lpisis.decommutedParameter.ReportingParameter',
    require('./decommutedParameter/reportingParameter')(override)
  ),
  getReportingParameterDeProtobuf: proto => protobuf.decode(
    'lpisis.decommutedParameter.ReportingParameter',
    proto
  ),
  getGroundMonitoringAlarm: require('./groundAlarm/groundMonitoringAlarm'),
  getGroundMonitoringAlarmProtobuf: override => protobuf.encode(
    'lpisis.groundAlarm.GroundMonitoringAlarm',
    require('./groundAlarm/groundMonitoringAlarm')(override)
  ),
  getGroundMonitoringAlarmDeProtobuf: proto => protobuf.decode(
    'lpisis.groundAlarm.GroundMonitoringAlarm',
    proto
  ),
  getClcwPacket: require('./packet/clcwPacket'),
  getClcwPacketProtobuf: override => protobuf.encode(
    'lpisis.packet.ClcwPacket',
    require('./packet/clcwPacket')(override)
  ),
  getClcwPacketDeProtobuf: proto => protobuf.decode(
    'lpisis.packet.ClcwPacket',
    proto
  ),

  getRmPacket: require('./packet/rmPacket'),
  getRmPacketProtobuf: override => protobuf.encode(
    'lpisis.packet.RmPacket',
    require('./packet/rmPacket')(override)
  ),
  getRmPacketDeProtobuf: proto => protobuf.decode(
    'lpisis.packet.RmPacket',
    proto
  ),

  getTmPacket: require('./packet/tmPacket'),
  getTmPacketProtobuf: override => protobuf.encode(
    'lpisis.packet.TmPacket',
    require('./packet/tmPacket')(override)
  ),
  getTmPacketDeProtobuf: proto => protobuf.decode(
    'lpisis.packet.TmPacket',
    proto
  ),
  getAckRequest: require('./ackRequest/ackRequest'),
  getAckRequestProtobuf: override => protobuf.encode(
    'lpisis.ackRequest.AckRequest',
    require('./ackRequest/ackRequest')(override)
  ),
  getAckRequestDeProtobuf: proto => protobuf.decode(
    'lpisis.ackRequest.AckRequest',
    proto
  ),

  getAckSMS: require('./ackRequest/ackSMS'),
  getAckSMSProtobuf: override => protobuf.encode(
    'lpisis.ackRequest.AckSMS',
    require('./ackRequest/ackSMS')(override)
  ),
  getAckSMSDeProtobuf: proto => protobuf.decode(
    'lpisis.ackRequest.AckSMS',
    proto
  ),
  getComputedEvent: require('./computedEvent/computedEvent'),
  getComputedEventProtobuf: override => protobuf.encode(
    'lpisis.computedEvent.ComputedEvent',
    require('./computedEvent/computedEvent')(override)
  ),
  getComputedEventDeProtobuf: proto => protobuf.decode(
    'lpisis.computedEvent.ComputedEvent',
    proto
  ),
  getOpAlert: require('./opAlert/opAlert'),
  getOpAlertProtobuf: override => protobuf.encode(
    'lpisis.opAlert.OpAlert',
    require('./opAlert/opAlert')(override)
  ),
  getOpAlertDeProtobuf: proto => protobuf.decode(
    'lpisis.opAlert.OpAlert',
    proto
  ),
  getExternalEvent: require('./userEvent/externalEvent'),
  getExternalEventProtobuf: override => protobuf.encode(
    'lpisis.userEvent.ExternalEvent',
    require('./userEvent/externalEvent')(override)
  ),
  getExternalEventDeProtobuf: proto => protobuf.decode(
    'lpisis.userEvent.ExternalEvent',
    proto
  ),

  getUserEvent: require('./userEvent/userEvent'),
  getUserEventProtobuf: override => protobuf.encode(
    'lpisis.userEvent.UserEvent',
    require('./userEvent/userEvent')(override)
  ),
  getUserEventDeProtobuf: proto => protobuf.decode(
    'lpisis.userEvent.UserEvent',
    proto
  ),
};
