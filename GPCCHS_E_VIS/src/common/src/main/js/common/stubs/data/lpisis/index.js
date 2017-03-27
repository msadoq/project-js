// Produced by Acceleo JavaScript Generator 1.1.0
/* eslint global-require:0 */

const protobuf = require('../../../protobuf');

module.exports = {
  getAck: require('./ackRequest/ack'),
  getAckRequest: require('./ackRequest/ackRequest'),
  getAckRequestDeProtobuf: proto => protobuf.decode('lpisis.ackRequest.AckRequest', proto),
  getAckRequestProtobuf: override => protobuf.encode('lpisis.ackRequest.AckRequest', require('./ackRequest/ackRequest')(override)),
  getAckSMS: require('./ackRequest/ackSMS'),
  getAckSMSDeProtobuf: proto => protobuf.decode('lpisis.ackRequest.AckSMS', proto),
  getAckSMSProtobuf: override => protobuf.encode('lpisis.ackRequest.AckSMS', require('./ackRequest/ackSMS')(override)),
  getCOP1Context: require('./cop1/cOP1Context'),
  getCOP1ContextDeProtobuf: proto => protobuf.decode('lpisis.cop1.COP1Context', proto),
  getCOP1ContextProtobuf: override => protobuf.encode('lpisis.cop1.COP1Context', require('./cop1/cOP1Context')(override)),
  getCOP1IfAutoState: require('./cop1/cOP1IfAutoState'),
  getCOP1InternalState: require('./cop1/cOP1InternalState'),
  getCOP1SentQueue: require('./cop1/cOP1SentQueue'),
  getCOP1Status: require('./cop1/cOP1Status'),
  getCOP1WaitQueue: require('./cop1/cOP1WaitQueue'),
  getClcwPacket: require('./packet/clcwPacket'),
  getClcwPacketDeProtobuf: proto => protobuf.decode('lpisis.packet.ClcwPacket', proto),
  getClcwPacketProtobuf: override => protobuf.encode('lpisis.packet.ClcwPacket', require('./packet/clcwPacket')(override)),
  getClcwSegmentMask: require('./cop1/clcwSegmentMask'),
  getCollection: require('./file/collection'),
  getCollectionDeProtobuf: proto => protobuf.decode('lpisis.file.Collection', proto),
  getCollectionDocument: require('./file/collectionDocument'),
  getCollectionDocumentProtobuf: override => protobuf.encode('lpisis.file.CollectionDocument', require('./file/collectionDocument')(override)),
  getCollectionDocumentDeProtobuf: proto => protobuf.decode('lpisis.file.CollectionDocument', proto),
  getCollectionProtobuf: override => protobuf.encode('lpisis.file.Collection', require('./file/collection')(override)),
  getCollectionVirtualFolder: require('./file/collectionVirtualFolder'),
  getComputedEvent: require('./computedEvent/computedEvent'),
  getComputedEventDeProtobuf: proto => protobuf.decode('lpisis.computedEvent.ComputedEvent', proto),
  getComputedEventProtobuf: override => protobuf.encode('lpisis.computedEvent.ComputedEvent', require('./computedEvent/computedEvent')(override)),
  getDecommutedPacket: require('./decommutedPacket/decommutedPacket'),
  getDecommutedPacketDeProtobuf: proto => protobuf.decode('lpisis.decommutedPacket.DecommutedPacket', proto),
  getDecommutedPacketProtobuf: override => protobuf.encode('lpisis.decommutedPacket.DecommutedPacket', require('./decommutedPacket/decommutedPacket')(override)),
  getDecommutedValue: require('./decommutedPacket/decommutedValue'),
  getDocVersion: require('./file/docVersion'),
  getDocVersionDeProtobuf: proto => protobuf.decode('lpisis.file.DocVersion', proto),
  getDocVersionProtobuf: override => protobuf.encode('lpisis.file.DocVersion', require('./file/docVersion')(override)),
  getDocument: require('./file/document'),
  getDocumentDeProtobuf: proto => protobuf.decode('lpisis.file.Document', proto),
  getDocumentProtobuf: override => protobuf.encode('lpisis.file.Document', require('./file/document')(override)),
  getExecution: require('./execution/execution'),
  getExecutionDeProtobuf: proto => protobuf.decode('lpisis.execution.Execution', proto),
  getExecutionProtobuf: override => protobuf.encode('lpisis.execution.Execution', require('./execution/execution')(override)),
  getExecutionStatus: require('./execution/executionStatus'),
  getExecutionStatusDeProtobuf: proto => protobuf.decode('lpisis.execution.ExecutionStatus', proto),
  getExecutionStatusProtobuf: override => protobuf.encode('lpisis.execution.ExecutionStatus', require('./execution/executionStatus')(override)),
  getExpectedAck: require('./tcHistory/expectedAck'),
  getExternalEvent: require('./userEvent/externalEvent'),
  getExternalEventDeProtobuf: proto => protobuf.decode('lpisis.userEvent.ExternalEvent', proto),
  getExternalEventProtobuf: override => protobuf.encode('lpisis.userEvent.ExternalEvent', require('./userEvent/externalEvent')(override)),
  getFlagVal: require('./cop1/flagVal'),
  getFolder: require('./file/folder'),
  getFolderDeProtobuf: proto => protobuf.decode('lpisis.file.Folder', proto),
  getFolderProtobuf: override => protobuf.encode('lpisis.file.Folder', require('./file/folder')(override)),
  getGPMCC1State: require('./cop1/gPMCC1State'),
  getGroundMonitoringAlarm: require('./groundAlarm/groundMonitoringAlarm'),
  getGroundMonitoringAlarmDeProtobuf: proto => protobuf.decode('lpisis.groundAlarm.GroundMonitoringAlarm', proto),
  getGroundMonitoringAlarmProtobuf: override => protobuf.encode('lpisis.groundAlarm.GroundMonitoringAlarm', require('./groundAlarm/groundMonitoringAlarm')(override)),
  getGroupDefinition: require('./ccsds_mc/groupDefinition'),
  getGroupDefinitionDeProtobuf: proto => protobuf.decode('lpisis.ccsds_mc.GroupDefinition', proto),
  getGroupDefinitionProtobuf: override => protobuf.encode('lpisis.ccsds_mc.GroupDefinition', require('./ccsds_mc/groupDefinition')(override)),
  getIfQueueElement: require('./cop1/ifQueueElement'),
  getIfQueueUnit: require('./cop1/ifQueueUnit'),
  getIsisAggregation: require('./ccsds_mc_aggregation/isisAggregation'),
  getIsisAggregationDeProtobuf: proto => protobuf.decode('lpisis.ccsds_mc_aggregation.IsisAggregation', proto),
  getIsisAggregationProtobuf: override => protobuf.encode('lpisis.ccsds_mc_aggregation.IsisAggregation', require('./ccsds_mc_aggregation/isisAggregation')(override)),
  getLifeCycle: require('./lifeCycle/lifeCycle'),
  getLifeCycleDeProtobuf: proto => protobuf.decode('lpisis.lifeCycle.LifeCycle', proto),
  getLifeCycleProtobuf: override => protobuf.encode('lpisis.lifeCycle.LifeCycle', require('./lifeCycle/lifeCycle')(override)),
  getLifeCycleStatus: require('./lifeCycle/lifeCycleStatus'),
  getLifeCycleStatusDeProtobuf: proto => protobuf.decode('lpisis.lifeCycle.LifeCycleStatus', proto),
  getLifeCycleStatusProtobuf: override => protobuf.encode('lpisis.lifeCycle.LifeCycleStatus', require('./lifeCycle/lifeCycleStatus')(override)),
  getLogbookEvent: require('./logbookEvent/logbookEvent'),
  getLogbookEventDeProtobuf: proto => protobuf.decode('lpisis.logbookEvent.LogbookEvent', proto),
  getLogbookEventProtobuf: override => protobuf.encode('lpisis.logbookEvent.LogbookEvent', require('./logbookEvent/logbookEvent')(override)),
  getNamedValue: require('./ccsds_mal/namedValue'),
  getObjectId: require('./ccsds_com/objectId'),
  getObjectKey: require('./ccsds_com/objectKey'),
  getObjectType: require('./ccsds_com/objectType'),
  getOpAlert: require('./opAlert/opAlert'),
  getOpAlertClosingData: require('./opAlert/opAlertClosingData'),
  getOpAlertConfiguration: require('./opAlert/opAlertConfiguration'),
  getOpAlertDeProtobuf: proto => protobuf.decode('lpisis.opAlert.OpAlert', proto),
  getOpAlertProtobuf: override => protobuf.encode('lpisis.opAlert.OpAlert', require('./opAlert/opAlert')(override)),
  getOperationParameter: require('./operationParameter/operationParameter'),
  getOperationParameterDeProtobuf: proto => protobuf.decode('lpisis.operationParameter.OperationParameter', proto),
  getOperationParameterProtobuf: override => protobuf.encode('lpisis.operationParameter.OperationParameter', require('./operationParameter/operationParameter')(override)),
  getParameter: require('./ccsds_mc_aggregation/parameter'),
  getProccessedTC: require('./cop1/proccessedTC'),
  getProfileRight: require('./file/profileRight'),
  getProfileRightProtobuf: override => protobuf.encode('lpisis.file.ProfileRight', require('./file/profileRight')(override)),
  getProfileRightDeProtobuf: proto => protobuf.decode('lpisis.file.ProfileRight', proto),
  getProvider: require('./ccsds_cs/provider'),
  getProviderDeProtobuf: proto => protobuf.decode('lpisis.ccsds_cs.Provider', proto),
  getProviderDefinition: require('./ccsds_cs/providerDefinition'),
  getProviderDefinitionDeProtobuf: proto => protobuf.decode('lpisis.ccsds_cs.ProviderDefinition', proto),
  getProviderDefinitionProtobuf: override => protobuf.encode('lpisis.ccsds_cs.ProviderDefinition', require('./ccsds_cs/providerDefinition')(override)),
  getProviderProtobuf: override => protobuf.encode('lpisis.ccsds_cs.Provider', require('./ccsds_cs/provider')(override)),
  getPus003DiagnosticPacket: require('./pusGroundModel/pus003DiagnosticPacket'),
  getPus003HkPacket: require('./pusGroundModel/pus003HkPacket'),
  getPus003Model: require('./pusGroundModel/pus003Model'),
  getPus003ModelDeProtobuf: proto => protobuf.decode('lpisis.pusGroundModel.Pus003Model', proto),
  getPus003ModelProtobuf: override => protobuf.encode('lpisis.pusGroundModel.Pus003Model', require('./pusGroundModel/pus003Model')(override)),
  getPus003Packet: require('./pusGroundModel/pus003Packet'),
  getPus005Model: require('./pusGroundModel/pus005Model'),
  getPus005ModelDeProtobuf: proto => protobuf.decode('lpisis.pusGroundModel.Pus005Model', proto),
  getPus005ModelProtobuf: override => protobuf.encode('lpisis.pusGroundModel.Pus005Model', require('./pusGroundModel/pus005Model')(override)),
  getPus005OnBoardEvent: require('./pusGroundModel/pus005OnBoardEvent'),
  getPus011Command: require('./pusGroundModel/pus011Command'),
  getPus011CommandDeProtobuf: proto => protobuf.decode('lpisis.pusGroundModel.Pus011Command', proto),
  getPus011CommandParameter: require('./pusGroundModel/pus011CommandParameter'),
  getPus011CommandProtobuf: override => protobuf.encode('lpisis.pusGroundModel.Pus011Command', require('./pusGroundModel/pus011Command')(override)),
  getPus011EncapsulatingTc: require('./pusGroundModel/pus011EncapsulatingTc'),
  getPus011Model: require('./pusGroundModel/pus011Model'),
  getPus011ModelDeProtobuf: proto => protobuf.decode('lpisis.pusGroundModel.Pus011Model', proto),
  getPus011ModelProtobuf: override => protobuf.encode('lpisis.pusGroundModel.Pus011Model', require('./pusGroundModel/pus011Model')(override)),
  getPus011SubSchedule: require('./pusGroundModel/pus011SubSchedule'),
  getPus011SubScheduleDeProtobuf: proto => protobuf.decode('lpisis.pusGroundModel.Pus011SubSchedule', proto),
  getPus011SubScheduleProtobuf: override => protobuf.encode('lpisis.pusGroundModel.Pus011SubSchedule', require('./pusGroundModel/pus011SubSchedule')(override)),
  getPus011SyncPoint: require('./pusGroundModel/pus011SyncPoint'),
  getPus011SyncPointDeProtobuf: proto => protobuf.decode('lpisis.pusGroundModel.Pus011SyncPoint', proto),
  getPus011SyncPointProtobuf: override => protobuf.encode('lpisis.pusGroundModel.Pus011SyncPoint', require('./pusGroundModel/pus011SyncPoint')(override)),
  getPus011TimeShift: require('./pusGroundModel/pus011TimeShift'),
  getPus012Model: require('./pusGroundModel/pus012Model'),
  getPus012ModelDeProtobuf: proto => protobuf.decode('lpisis.pusGroundModel.Pus012Model', proto),
  getPus012ModelProtobuf: override => protobuf.encode('lpisis.pusGroundModel.Pus012Model', require('./pusGroundModel/pus012Model')(override)),
  getPus012MonitoringCheckProperties: require('./pusGroundModel/pus012MonitoringCheckProperties'),
  getPus012ParameterMonitoringDefinition: require('./pusGroundModel/pus012ParameterMonitoringDefinition'),
  getPus013DownlinkLdt: require('./pusGroundModel/pus013DownlinkLdt'),
  getPus013Ldt: require('./pusGroundModel/pus013Ldt'),
  getPus013LdtPart: require('./pusGroundModel/pus013LdtPart'),
  getPus013Model: require('./pusGroundModel/pus013Model'),
  getPus013ModelDeProtobuf: proto => protobuf.decode('lpisis.pusGroundModel.Pus013Model', proto),
  getPus013ModelProtobuf: override => protobuf.encode('lpisis.pusGroundModel.Pus013Model', require('./pusGroundModel/pus013Model')(override)),
  getPus013UplinkLdt: require('./pusGroundModel/pus013UplinkLdt'),
  getPus014EventReportPacket: require('./pusGroundModel/pus014EventReportPacket'),
  getPus014ForwardedPacket: require('./pusGroundModel/pus014ForwardedPacket'),
  getPus014HkOrDiagPacket: require('./pusGroundModel/pus014HkOrDiagPacket'),
  getPus014Model: require('./pusGroundModel/pus014Model'),
  getPus014ModelDeProtobuf: proto => protobuf.decode('lpisis.pusGroundModel.Pus014Model', proto),
  getPus014ModelProtobuf: override => protobuf.encode('lpisis.pusGroundModel.Pus014Model', require('./pusGroundModel/pus014Model')(override)),
  getPus014TmPacket: require('./pusGroundModel/pus014TmPacket'),
  getPus015Model: require('./pusGroundModel/pus015Model'),
  getPus015ModelDeProtobuf: proto => protobuf.decode('lpisis.pusGroundModel.Pus015Model', proto),
  getPus015ModelProtobuf: override => protobuf.encode('lpisis.pusGroundModel.Pus015Model', require('./pusGroundModel/pus015Model')(override)),
  getPus015Packet: require('./pusGroundModel/pus015Packet'),
  getPus015PacketStore: require('./pusGroundModel/pus015PacketStore'),
  getPus018ConfiguredObcp: require('./pusGroundModel/pus018ConfiguredObcp'),
  getPus018Model: require('./pusGroundModel/pus018Model'),
  getPus018ModelDeProtobuf: proto => protobuf.decode('lpisis.pusGroundModel.Pus018Model', proto),
  getPus018ModelProtobuf: override => protobuf.encode('lpisis.pusGroundModel.Pus018Model', require('./pusGroundModel/pus018Model')(override)),
  getPus018Obcp: require('./pusGroundModel/pus018Obcp'),
  getPus019EventAction: require('./pusGroundModel/pus019EventAction'),
  getPus019Model: require('./pusGroundModel/pus019Model'),
  getPus019ModelDeProtobuf: proto => protobuf.decode('lpisis.pusGroundModel.Pus019Model', proto),
  getPus019ModelProtobuf: override => protobuf.encode('lpisis.pusGroundModel.Pus019Model', require('./pusGroundModel/pus019Model')(override)),
  getPus140Model: require('./pusGroundModel/pus140Model'),
  getPus140ModelDeProtobuf: proto => protobuf.decode('lpisis.pusGroundModel.Pus140Model', proto),
  getPus140ModelProtobuf: override => protobuf.encode('lpisis.pusGroundModel.Pus140Model', require('./pusGroundModel/pus140Model')(override)),
  getPus140Parameter: require('./pusGroundModel/pus140Parameter'),
  getPus142FunctionalMonitoring: require('./pusGroundModel/pus142FunctionalMonitoring'),
  getPus142Model: require('./pusGroundModel/pus142Model'),
  getPus142ModelDeProtobuf: proto => protobuf.decode('lpisis.pusGroundModel.Pus142Model', proto),
  getPus142ModelProtobuf: override => protobuf.encode('lpisis.pusGroundModel.Pus142Model', require('./pusGroundModel/pus142Model')(override)),
  getPus142ParameterMonitoringDefinition: require('./pusGroundModel/pus142ParameterMonitoringDefinition'),
  getPus144Model: require('./pusGroundModel/pus144Model'),
  getPus144ModelDeProtobuf: proto => protobuf.decode('lpisis.pusGroundModel.Pus144Model', proto),
  getPus144ModelProtobuf: override => protobuf.encode('lpisis.pusGroundModel.Pus144Model', require('./pusGroundModel/pus144Model')(override)),
  getPus144OnboardFiles: require('./pusGroundModel/pus144OnboardFiles'),
  getPusElement: require('./pusGroundModel/pusElement'),
  getPusHeader: require('./tcHistory/pusHeader'),
  getPusParameter: require('./pusGroundModel/pusParameter'),
  getReportingParameter: require('./decommutedParameter/reportingParameter'),
  getReportingParameterDeProtobuf: proto => protobuf.decode('lpisis.decommutedParameter.ReportingParameter', proto),
  getReportingParameterProtobuf: override => protobuf.encode('lpisis.decommutedParameter.ReportingParameter', require('./decommutedParameter/reportingParameter')(override)),
  getRmPacket: require('./packet/rmPacket'),
  getRmPacketDeProtobuf: proto => protobuf.decode('lpisis.packet.RmPacket', proto),
  getRmPacketProtobuf: override => protobuf.encode('lpisis.packet.RmPacket', require('./packet/rmPacket')(override)),
  getSentQueueElement: require('./cop1/sentQueueElement'),
  getServiceAddress: require('./ccsds_cs/serviceAddress'),
  getStatisticFunctionDetails: require('./ccsds_mc/statisticFunctionDetails'),
  getStatisticFunctionDetailsDeProtobuf: proto => protobuf.decode('lpisis.ccsds_mc.StatisticFunctionDetails', proto),
  getStatisticFunctionDetailsProtobuf: override => protobuf.encode('lpisis.ccsds_mc.StatisticFunctionDetails', require('./ccsds_mc/statisticFunctionDetails')(override)),
  getStatisticValue: require('./ccsds_mc/statisticValue'),
  getStatisticValueDeProtobuf: proto => protobuf.decode('lpisis.ccsds_mc.StatisticValue', proto),
  getStatisticValueProtobuf: override => protobuf.encode('lpisis.ccsds_mc.StatisticValue', require('./ccsds_mc/statisticValue')(override)),
  getSuccessiveAck: require('./tcHistory/successiveAck'),
  getTC11: require('./tcHistory/tC11'),
  getTC11DeProtobuf: proto => protobuf.decode('lpisis.tcHistory.TC11', proto),
  getTC11Protobuf: override => protobuf.encode('lpisis.tcHistory.TC11', require('./tcHistory/tC11')(override)),
  getTC13: require('./tcHistory/tC13'),
  getTC13DeProtobuf: proto => protobuf.decode('lpisis.tcHistory.TC13', proto),
  getTC13Protobuf: override => protobuf.encode('lpisis.tcHistory.TC13', require('./tcHistory/tC13')(override)),
  getTCFile: require('./tcHistory/tCFile'),
  getTCFileDeProtobuf: proto => protobuf.decode('lpisis.tcHistory.TCFile', proto),
  getTCFileProtobuf: override => protobuf.encode('lpisis.tcHistory.TCFile', require('./tcHistory/tCFile')(override)),
  getTCHistory: require('./tcHistory/tCHistory'),
  getTCHistoryDeProtobuf: proto => protobuf.decode('lpisis.tcHistory.TCHistory', proto),
  getTCHistoryProtobuf: override => protobuf.encode('lpisis.tcHistory.TCHistory', require('./tcHistory/tCHistory')(override)),
  getTCImmediate: require('./tcHistory/tCImmediate'),
  getTCImmediateDeProtobuf: proto => protobuf.decode('lpisis.tcHistory.TCImmediate', proto),
  getTCImmediateProtobuf: override => protobuf.encode('lpisis.tcHistory.TCImmediate', require('./tcHistory/tCImmediate')(override)),
  getTCLong: require('./tcHistory/tCLong'),
  getTCLongDeProtobuf: proto => protobuf.decode('lpisis.tcHistory.TCLong', proto),
  getTCLongProtobuf: override => protobuf.encode('lpisis.tcHistory.TCLong', require('./tcHistory/tCLong')(override)),
  getTimeBasedDataBlob: require('./timeBasedDataType/timeBasedDataBlob'),
  getTimeBasedDataBlobDeProtobuf: proto => protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataBlob', proto),
  getTimeBasedDataBlobProtobuf: override => protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataBlob', require('./timeBasedDataType/timeBasedDataBlob')(override)),
  getTimeBasedDataBoolean: require('./timeBasedDataType/timeBasedDataBoolean'),
  getTimeBasedDataBooleanDeProtobuf: proto => protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataBoolean', proto),
  getTimeBasedDataBooleanProtobuf: override => protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataBoolean', require('./timeBasedDataType/timeBasedDataBoolean')(override)),
  getTimeBasedDataByte: require('./timeBasedDataType/timeBasedDataByte'),
  getTimeBasedDataByteDeProtobuf: proto => protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataByte', proto),
  getTimeBasedDataByteProtobuf: override => protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataByte', require('./timeBasedDataType/timeBasedDataByte')(override)),
  getTimeBasedDataDouble: require('./timeBasedDataType/timeBasedDataDouble'),
  getTimeBasedDataDoubleDeProtobuf: proto => protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataDouble', proto),
  getTimeBasedDataDoubleProtobuf: override => protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataDouble', require('./timeBasedDataType/timeBasedDataDouble')(override)),
  getTimeBasedDataDuration: require('./timeBasedDataType/timeBasedDataDuration'),
  getTimeBasedDataDurationDeProtobuf: proto => protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataDuration', proto),
  getTimeBasedDataDurationProtobuf: override => protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataDuration', require('./timeBasedDataType/timeBasedDataDuration')(override)),
  getTimeBasedDataFinetime: require('./timeBasedDataType/timeBasedDataFinetime'),
  getTimeBasedDataFinetimeDeProtobuf: proto => protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataFinetime', proto),
  getTimeBasedDataFinetimeProtobuf: override => protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataFinetime', require('./timeBasedDataType/timeBasedDataFinetime')(override)),
  getTimeBasedDataFloat: require('./timeBasedDataType/timeBasedDataFloat'),
  getTimeBasedDataFloatDeProtobuf: proto => protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataFloat', proto),
  getTimeBasedDataFloatProtobuf: override => protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataFloat', require('./timeBasedDataType/timeBasedDataFloat')(override)),
  getTimeBasedDataIdentifier: require('./timeBasedDataType/timeBasedDataIdentifier'),
  getTimeBasedDataIdentifierDeProtobuf: proto => protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataIdentifier', proto),
  getTimeBasedDataIdentifierProtobuf: override => protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataIdentifier', require('./timeBasedDataType/timeBasedDataIdentifier')(override)),
  getTimeBasedDataInteger: require('./timeBasedDataType/timeBasedDataInteger'),
  getTimeBasedDataIntegerDeProtobuf: proto => protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataInteger', proto),
  getTimeBasedDataIntegerProtobuf: override => protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataInteger', require('./timeBasedDataType/timeBasedDataInteger')(override)),
  getTimeBasedDataLong: require('./timeBasedDataType/timeBasedDataLong'),
  getTimeBasedDataLongDeProtobuf: proto => protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataLong', proto),
  getTimeBasedDataLongProtobuf: override => protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataLong', require('./timeBasedDataType/timeBasedDataLong')(override)),
  getTimeBasedDataShort: require('./timeBasedDataType/timeBasedDataShort'),
  getTimeBasedDataShortDeProtobuf: proto => protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataShort', proto),
  getTimeBasedDataShortProtobuf: override => protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataShort', require('./timeBasedDataType/timeBasedDataShort')(override)),
  getTimeBasedDataString: require('./timeBasedDataType/timeBasedDataString'),
  getTimeBasedDataStringDeProtobuf: proto => protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataString', proto),
  getTimeBasedDataStringProtobuf: override => protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataString', require('./timeBasedDataType/timeBasedDataString')(override)),
  getTimeBasedDataTime: require('./timeBasedDataType/timeBasedDataTime'),
  getTimeBasedDataTimeDeProtobuf: proto => protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataTime', proto),
  getTimeBasedDataTimeProtobuf: override => protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataTime', require('./timeBasedDataType/timeBasedDataTime')(override)),
  getTimeBasedDataUByte: require('./timeBasedDataType/timeBasedDataUByte'),
  getTimeBasedDataUByteDeProtobuf: proto => protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataUByte', proto),
  getTimeBasedDataUByteProtobuf: override => protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataUByte', require('./timeBasedDataType/timeBasedDataUByte')(override)),
  getTimeBasedDataUInteger: require('./timeBasedDataType/timeBasedDataUInteger'),
  getTimeBasedDataUIntegerDeProtobuf: proto => protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataUInteger', proto),
  getTimeBasedDataUIntegerProtobuf: override => protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataUInteger', require('./timeBasedDataType/timeBasedDataUInteger')(override)),
  getTimeBasedDataULong: require('./timeBasedDataType/timeBasedDataULong'),
  getTimeBasedDataULongDeProtobuf: proto => protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataULong', proto),
  getTimeBasedDataULongProtobuf: override => protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataULong', require('./timeBasedDataType/timeBasedDataULong')(override)),
  getTimeBasedDataURI: require('./timeBasedDataType/timeBasedDataURI'),
  getTimeBasedDataURIDeProtobuf: proto => protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataURI', proto),
  getTimeBasedDataURIProtobuf: override => protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataURI', require('./timeBasedDataType/timeBasedDataURI')(override)),
  getTimeBasedDataUShort: require('./timeBasedDataType/timeBasedDataUShort'),
  getTimeBasedDataUShortDeProtobuf: proto => protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataUShort', proto),
  getTimeBasedDataUShortProtobuf: override => protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataUShort', require('./timeBasedDataType/timeBasedDataUShort')(override)),
  getTimeTaggedTC: require('./tcHistory/timeTaggedTC'),
  getTimeTaggedTCDeProtobuf: proto => protobuf.decode('lpisis.tcHistory.TimeTaggedTC', proto),
  getTimeTaggedTCProtobuf: override => protobuf.encode('lpisis.tcHistory.TimeTaggedTC', require('./tcHistory/timeTaggedTC')(override)),
  getTmPacket: require('./packet/tmPacket'),
  getTmPacketDeProtobuf: proto => protobuf.decode('lpisis.packet.TmPacket', proto),
  getTmPacketProtobuf: override => protobuf.encode('lpisis.packet.TmPacket', require('./packet/tmPacket')(override)),
  getTransition: require('./groundAlarm/transition'),
  getUCPParameter: require('./connection/uCPParameter'),
  getUCPReport: require('./connection/uCPReport'),
  getUCPReportDeProtobuf: proto => protobuf.decode('lpisis.connection.UCPReport', proto),
  getUCPReportProtobuf: override => protobuf.encode('lpisis.connection.UCPReport', require('./connection/uCPReport')(override)),
  getUser: require('./ccsds_cs/user'),
  getUserConnection: require('./accessControlModel/userConnection'),
  getUserConnectionDeProtobuf: proto => protobuf.decode('lpisis.accessControlModel.UserConnection', proto),
  getUserConnectionProtobuf: override => protobuf.encode('lpisis.accessControlModel.UserConnection', require('./accessControlModel/userConnection')(override)),
  getUserContext: require('./ccsds_cs/userContext'),
  getUserContextDeProtobuf: proto => protobuf.decode('lpisis.ccsds_cs.UserContext', proto),
  getUserContextProtobuf: override => protobuf.encode('lpisis.ccsds_cs.UserContext', require('./ccsds_cs/userContext')(override)),
  getUserDeProtobuf: proto => protobuf.decode('lpisis.ccsds_cs.User', proto),
  getUserEvent: require('./userEvent/userEvent'),
  getUserEventDeProtobuf: proto => protobuf.decode('lpisis.userEvent.UserEvent', proto),
  getUserEventProtobuf: override => protobuf.encode('lpisis.userEvent.UserEvent', require('./userEvent/userEvent')(override)),
  getUserProtobuf: override => protobuf.encode('lpisis.ccsds_cs.User', require('./ccsds_cs/user')(override)),
  getUserRight: require('./file/userRight'),
  getUserRightProtobuf: override => protobuf.encode('lpisis.file.UserRight', require('./file/userRight')(override)),
  getUserRightDeProtobuf: proto => protobuf.decode('lpisis.file.UserRight', proto),
};
