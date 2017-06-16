// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
/* eslint-disable global-require, "DV6 TBC_CNES generated file" */

//const protobuf = require('../../protobuf');
const protobuf = {};
protobuf.decode = (data) => data;
protobuf.encode = (data) => data;
module.exports = {
  getAck: require('./ackRequest/ack.stub'),
  getAckRequest: require('./ackRequest/ackRequest.stub'),
  getAckRequestDeProtobuf: proto => protobuf.decode('isis.ackRequest.AckRequest', proto),
  getAckRequestProtobuf: override => protobuf.encode('isis.ackRequest.AckRequest', require('./ackRequest/ackRequest.stub')(override)),
  getAckSMS: require('./ackRequest/ackSMS.stub'),
  getBreakPoint: require('./execution/breakPoint.stub'),
  getCodedExecutionStrategy: require('./execution/codedExecutionStrategy.stub'),
  getCollection: require('./file/collection.stub'),
  getCollectionDeProtobuf: proto => protobuf.decode('isis.file.Collection', proto),
  getCollectionDocument: require('./file/collectionDocument.stub'),
  getCollectionProtobuf: override => protobuf.encode('isis.file.Collection', require('./file/collection.stub')(override)),
  getCollectionVirtualFolder: require('./file/collectionVirtualFolder.stub'),
  getComputedEvent: require('./computedEvent/computedEvent.stub'),
  getComputedEventDeProtobuf: proto => protobuf.decode('isis.computedEvent.ComputedEvent', proto),
  getComputedEventProtobuf: override => protobuf.encode('isis.computedEvent.ComputedEvent', require('./computedEvent/computedEvent.stub')(override)),
  getContainer: require('./ccsds_cs/container.stub'),
  getDocVersion: require('./file/docVersion.stub'),
  getDocVersionDeProtobuf: proto => protobuf.decode('isis.file.DocVersion', proto),
  getDocVersionProtobuf: override => protobuf.encode('isis.file.DocVersion', require('./file/docVersion.stub')(override)),
  getDocument: require('./file/document.stub'),
  getDocumentDeProtobuf: proto => protobuf.decode('isis.file.Document', proto),
  getDocumentProtobuf: override => protobuf.encode('isis.file.Document', require('./file/document.stub')(override)),
  getExecution: require('./execution/execution.stub'),
  getExecutionDeProtobuf: proto => protobuf.decode('isis.execution.Execution', proto),
  getExecutionProtobuf: override => protobuf.encode('isis.execution.Execution', require('./execution/execution.stub')(override)),
  getExecutionStatus: require('./execution/executionStatus.stub'),
  getExecutionStrategy: require('./execution/executionStrategy.stub'),
  getExpectedAck: require('./tcHistory/expectedAck.stub'),
  getExternalEvent: require('./userEvent/externalEvent.stub'),
  getExternalEventDeProtobuf: proto => protobuf.decode('isis.userEvent.ExternalEvent', proto),
  getExternalEventProtobuf: override => protobuf.encode('isis.userEvent.ExternalEvent', require('./userEvent/externalEvent.stub')(override)),
  getFolder: require('./file/folder.stub'),
  getFolderDeProtobuf: proto => protobuf.decode('isis.file.Folder', proto),
  getFolderProtobuf: override => protobuf.encode('isis.file.Folder', require('./file/folder.stub')(override)),
  getGenericTC: require('./tcHistory/genericTC.stub'),
  getGroupDefinition: require('./ccsds_mc/groupDefinition.stub'),
  getGroupDefinitionDeProtobuf: proto => protobuf.decode('isis.ccsds_mc.GroupDefinition', proto),
  getGroupDefinitionProtobuf: override => protobuf.encode('isis.ccsds_mc.GroupDefinition', require('./ccsds_mc/groupDefinition.stub')(override)),
  getIsisAggregation: require('./ccsds_mc_aggregation/isisAggregation.stub'),
  getIsisAggregationDeProtobuf: proto => protobuf.decode('isis.ccsds_mc_aggregation.IsisAggregation', proto),
  getIsisAggregationProtobuf: override => protobuf.encode('isis.ccsds_mc_aggregation.IsisAggregation', require('./ccsds_mc_aggregation/isisAggregation.stub')(override)),
  getLifeCycle: require('./lifeCycle/lifeCycle.stub'),
  getLifeCycleStatus: require('./lifeCycle/lifeCycleStatus.stub'),
  getLogbookEvent: require('./logbookEvent/logbookEvent.stub'),
  getLogbookEventDeProtobuf: proto => protobuf.decode('isis.logbookEvent.LogbookEvent', proto),
  getLogbookEventProtobuf: override => protobuf.encode('isis.logbookEvent.LogbookEvent', require('./logbookEvent/logbookEvent.stub')(override)),
  getNamedValue: require('./ccsds_mal/namedValue.stub'),
  getObjectId: require('./ccsds_com/objectId.stub'),
  getObjectKey: require('./ccsds_com/objectKey.stub'),
  getObjectType: require('./ccsds_com/objectType.stub'),
  getOpAlert: require('./opAlert/opAlert.stub'),
  getOpAlertClosingData: require('./opAlert/opAlertClosingData.stub'),
  getOpAlertConfiguration: require('./opAlert/opAlertConfiguration.stub'),
  getOpAlertDeProtobuf: proto => protobuf.decode('isis.opAlert.OpAlert', proto),
  getOpAlertProtobuf: override => protobuf.encode('isis.opAlert.OpAlert', require('./opAlert/opAlert.stub')(override)),
  getOperationParameter: require('./operationParameter/operationParameter.stub'),
  getOperationParameterDeProtobuf: proto => protobuf.decode('isis.operationParameter.OperationParameter', proto),
  getOperationParameterProtobuf: override => protobuf.encode('isis.operationParameter.OperationParameter', require('./operationParameter/operationParameter.stub')(override)),
  getParameter: require('./ccsds_mc_aggregation/parameter.stub'),
  getProfileRight: require('./file/profileRight.stub'),
  getProvider: require('./ccsds_cs/provider.stub'),
  getProviderDefinition: require('./ccsds_cs/providerDefinition.stub'),
  getPusHeader: require('./tcHistory/pusHeader.stub'),
  getServiceAddress: require('./ccsds_cs/serviceAddress.stub'),
  getServiceFilter: require('./ccsds_cs/serviceFilter.stub'),
  getStatisticFunctionDetails: require('./ccsds_mc/statisticFunctionDetails.stub'),
  getStatisticFunctionDetailsDeProtobuf: proto => protobuf.decode('isis.ccsds_mc.StatisticFunctionDetails', proto),
  getStatisticFunctionDetailsProtobuf: override => protobuf.encode('isis.ccsds_mc.StatisticFunctionDetails', require('./ccsds_mc/statisticFunctionDetails.stub')(override)),
  getStatisticFunctionDetailsStruct: require('./ccsds_mc/statisticFunctionDetailsStruct.stub'),
  getStatisticLink: require('./ccsds_mc/statisticLink.stub'),
  getStatisticLinkStruct: require('./ccsds_mc/statisticLinkStruct.stub'),
  getStatisticValue: require('./ccsds_mc/statisticValue.stub'),
  getStatisticValueDeProtobuf: proto => protobuf.decode('isis.ccsds_mc.StatisticValue', proto),
  getStatisticValueProtobuf: override => protobuf.encode('isis.ccsds_mc.StatisticValue', require('./ccsds_mc/statisticValue.stub')(override)),
  getStatisticValueStruct: require('./ccsds_mc/statisticValueStruct.stub'),
  getSuccessiveAck: require('./tcHistory/successiveAck.stub'),
  getTC11: require('./tcHistory/tC11.stub'),
  getTC11DeProtobuf: proto => protobuf.decode('isis.tcHistory.TC11', proto),
  getTC11Protobuf: override => protobuf.encode('isis.tcHistory.TC11', require('./tcHistory/tC11.stub')(override)),
  getTC13: require('./tcHistory/tC13.stub'),
  getTC13DeProtobuf: proto => protobuf.decode('isis.tcHistory.TC13', proto),
  getTC13Protobuf: override => protobuf.encode('isis.tcHistory.TC13', require('./tcHistory/tC13.stub')(override)),
  getTCDetails: require('./tcHistory/tCDetails.stub'),
  getTCFile: require('./tcHistory/tCFile.stub'),
  getTCFileDeProtobuf: proto => protobuf.decode('isis.tcHistory.TCFile', proto),
  getTCFileProtobuf: override => protobuf.encode('isis.tcHistory.TCFile', require('./tcHistory/tCFile.stub')(override)),
  getTCHistory: require('./tcHistory/tCHistory.stub'),
  getTCHistoryDeProtobuf: proto => protobuf.decode('isis.tcHistory.TCHistory', proto),
  getTCHistoryProtobuf: override => protobuf.encode('isis.tcHistory.TCHistory', require('./tcHistory/tCHistory.stub')(override)),
  getTCImmediate: require('./tcHistory/tCImmediate.stub'),
  getTCImmediateDeProtobuf: proto => protobuf.decode('isis.tcHistory.TCImmediate', proto),
  getTCImmediateProtobuf: override => protobuf.encode('isis.tcHistory.TCImmediate', require('./tcHistory/tCImmediate.stub')(override)),
  getTCLong: require('./tcHistory/tCLong.stub'),
  getTCLongDeProtobuf: proto => protobuf.decode('isis.tcHistory.TCLong', proto),
  getTCLongProtobuf: override => protobuf.encode('isis.tcHistory.TCLong', require('./tcHistory/tCLong.stub')(override)),
  getTCPhysicalParameter: require('./tcHistory/tCPhysicalParameter.stub'),
  getTimeBasedDataBlob: require('./timeBasedDataType/timeBasedDataBlob.stub'),
  getTimeBasedDataBoolean: require('./timeBasedDataType/timeBasedDataBoolean.stub'),
  getTimeBasedDataByte: require('./timeBasedDataType/timeBasedDataByte.stub'),
  getTimeBasedDataDouble: require('./timeBasedDataType/timeBasedDataDouble.stub'),
  getTimeBasedDataDuration: require('./timeBasedDataType/timeBasedDataDuration.stub'),
  getTimeBasedDataFinetime: require('./timeBasedDataType/timeBasedDataFinetime.stub'),
  getTimeBasedDataFloat: require('./timeBasedDataType/timeBasedDataFloat.stub'),
  getTimeBasedDataIdentifier: require('./timeBasedDataType/timeBasedDataIdentifier.stub'),
  getTimeBasedDataInteger: require('./timeBasedDataType/timeBasedDataInteger.stub'),
  getTimeBasedDataLong: require('./timeBasedDataType/timeBasedDataLong.stub'),
  getTimeBasedDataShort: require('./timeBasedDataType/timeBasedDataShort.stub'),
  getTimeBasedDataString: require('./timeBasedDataType/timeBasedDataString.stub'),
  getTimeBasedDataTime: require('./timeBasedDataType/timeBasedDataTime.stub'),
  getTimeBasedDataUByte: require('./timeBasedDataType/timeBasedDataUByte.stub'),
  getTimeBasedDataUInteger: require('./timeBasedDataType/timeBasedDataUInteger.stub'),
  getTimeBasedDataULong: require('./timeBasedDataType/timeBasedDataULong.stub'),
  getTimeBasedDataURI: require('./timeBasedDataType/timeBasedDataURI.stub'),
  getTimeBasedDataUShort: require('./timeBasedDataType/timeBasedDataUShort.stub'),
  getTimeTaggedTC: require('./tcHistory/timeTaggedTC.stub'),
  getTimeTaggedTCDeProtobuf: proto => protobuf.decode('isis.tcHistory.TimeTaggedTC', proto),
  getTimeTaggedTCProtobuf: override => protobuf.encode('isis.tcHistory.TimeTaggedTC', require('./tcHistory/timeTaggedTC.stub')(override)),
  getUser: require('./ccsds_cs/user.stub'),
  getUserConnection: require('./accessControlModel/userConnection.stub'),
  getUserContext: require('./ccsds_cs/userContext.stub'),
  getUserEvent: require('./userEvent/userEvent.stub'),
  getUserEventDeProtobuf: proto => protobuf.decode('isis.userEvent.UserEvent', proto),
  getUserEventProtobuf: override => protobuf.encode('isis.userEvent.UserEvent', require('./userEvent/userEvent.stub')(override)),
  getUserRight: require('./file/userRight.stub'),
};
