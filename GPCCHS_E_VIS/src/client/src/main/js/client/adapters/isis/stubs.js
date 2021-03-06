// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
/* eslint-disable import/newline-after-import, "DV6 TBC_CNES generated code" */
const ProtoBuf = require('protobufjs');

const ackAdapter = require('./ackRequest/ack');
const ackBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/ackRequest/Ack.proto`, { keepCase: true }).lookup('ackRequest.protobuf.Ack');
const ackRequestAdapter = require('./ackRequest/ackRequest');
const ackRequestBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/ackRequest/AckRequest.proto`, { keepCase: true }).lookup('ackRequest.protobuf.AckRequest');
const ackRequestStub = require('./ackRequest/ackRequest.stub');
const ackSMSStub = require('./ackRequest/ackSMS.stub');
const ackStub = require('./ackRequest/ack.stub');
const actionAdapter = require('./ccsds_mc/action');
const actionBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/ccsds_mc/Action.proto`, { keepCase: true }).lookup('ccsds_mc.protobuf.Action');
const actionStub = require('./ccsds_mc/action.stub');
const archiveDetailsStub = require('./ccsds_com/archiveDetails.stub');
const archiveQueryStub = require('./ccsds_com/archiveQuery.stub');
const attributeValueAdapter = require('./ccsds_mc/attributeValue');
const attributeValueBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/ccsds_mc/AttributeValue.proto`, { keepCase: true }).lookup('ccsds_mc.protobuf.AttributeValue');
const attributeValueStub = require('./ccsds_mc/attributeValue.stub');
const binaryDataAdapter = require('./memoryImage/binaryData');
const binaryDataBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/memoryImage/BinaryData.proto`, { keepCase: true }).lookup('memoryImage.protobuf.BinaryData');
const binaryDataStub = require('./memoryImage/binaryData.stub');
const breakPointStub = require('./execution/breakPoint.stub');
const briefcaseAdapter = require('./briefcase/briefcase');
const briefcaseBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/briefcase/Briefcase.proto`, { keepCase: true }).lookup('briefcase.protobuf.Briefcase');
const briefcaseContentAdapter = require('./briefcase/briefcaseContent');
const briefcaseContentBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/briefcase/BriefcaseContent.proto`, { keepCase: true }).lookup('briefcase.protobuf.BriefcaseContent');
const briefcaseContentStub = require('./briefcase/briefcaseContent.stub');
const briefcaseStub = require('./briefcase/briefcase.stub');
const cOP1ContextAdapter = require('./cop1/cOP1Context');
const cOP1ContextBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/cop1/COP1Context.proto`, { keepCase: true }).lookup('cop1.protobuf.COP1Context');
const cOP1ContextStub = require('./cop1/cOP1Context.stub');
const cOP1DirectiveAdapter = require('./cop1/cOP1Directive');
const cOP1DirectiveBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/cop1/COP1Directive.proto`, { keepCase: true }).lookup('cop1.protobuf.COP1Directive');
const cOP1DirectiveStub = require('./cop1/cOP1Directive.stub');
const cOP1IfAutoStateAdapter = require('./cop1/cOP1IfAutoState');
const cOP1IfAutoStateBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/cop1/COP1IfAutoState.proto`, { keepCase: true }).lookup('cop1.protobuf.COP1IfAutoState');
const cOP1IfAutoStateStub = require('./cop1/cOP1IfAutoState.stub');
const cOP1InternalStateAdapter = require('./cop1/cOP1InternalState');
const cOP1InternalStateBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/cop1/COP1InternalState.proto`, { keepCase: true }).lookup('cop1.protobuf.COP1InternalState');
const cOP1InternalStateStub = require('./cop1/cOP1InternalState.stub');
const cOP1SentQueueAdapter = require('./cop1/cOP1SentQueue');
const cOP1SentQueueBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/cop1/COP1SentQueue.proto`, { keepCase: true }).lookup('cop1.protobuf.COP1SentQueue');
const cOP1SentQueueStub = require('./cop1/cOP1SentQueue.stub');
const cOP1StatusAdapter = require('./cop1/cOP1Status');
const cOP1StatusBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/cop1/COP1Status.proto`, { keepCase: true }).lookup('cop1.protobuf.COP1Status');
const cOP1StatusStub = require('./cop1/cOP1Status.stub');
const cOP1WaitQueueAdapter = require('./cop1/cOP1WaitQueue');
const cOP1WaitQueueBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/cop1/COP1WaitQueue.proto`, { keepCase: true }).lookup('cop1.protobuf.COP1WaitQueue');
const cOP1WaitQueueStub = require('./cop1/cOP1WaitQueue.stub');
const cUFullStatusAdapter = require('./connection/cUFullStatus');
const cUFullStatusBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/CUFullStatus.proto`, { keepCase: true }).lookup('connection.protobuf.CUFullStatus');
const cUFullStatusStub = require('./connection/cUFullStatus.stub');
const cUIdentifierAdapter = require('./connection/cUIdentifier');
const cUIdentifierBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/CUIdentifier.proto`, { keepCase: true }).lookup('connection.protobuf.CUIdentifier');
const cUIdentifierStub = require('./connection/cUIdentifier.stub');
const cUInfoAdapter = require('./connection/cUInfo');
const cUInfoBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/CUInfo.proto`, { keepCase: true }).lookup('connection.protobuf.CUInfo');
const cUInfoStub = require('./connection/cUInfo.stub');
const cUOperationDefinitionAdapter = require('./connection/cUOperationDefinition');
const cUOperationDefinitionBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/CUOperationDefinition.proto`, { keepCase: true }).lookup('connection.protobuf.CUOperationDefinition');
const cUOperationDefinitionStub = require('./connection/cUOperationDefinition.stub');
const cUStatusAdapter = require('./connection/cUStatus');
const cUStatusBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/CUStatus.proto`, { keepCase: true }).lookup('connection.protobuf.CUStatus');
const cUStatusStub = require('./connection/cUStatus.stub');
const clcwPacketAdapter = require('./packet/clcwPacket');
const clcwPacketBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/packet/ClcwPacket.proto`, { keepCase: true }).lookup('packet.protobuf.ClcwPacket');
const clcwPacketStub = require('./packet/clcwPacket.stub');
const clcwSegmentMaskAdapter = require('./cop1/clcwSegmentMask');
const clcwSegmentMaskBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/cop1/ClcwSegmentMask.proto`, { keepCase: true }).lookup('cop1.protobuf.ClcwSegmentMask');
const clcwSegmentMaskStub = require('./cop1/clcwSegmentMask.stub');
const codedExecutionStrategyStub = require('./execution/codedExecutionStrategy.stub');
const collectionAdapter = require('./file/collection');
const collectionBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/file/Collection.proto`, { keepCase: true }).lookup('file.protobuf.Collection');
const collectionDocumentAdapter = require('./file/collectionDocument');
const collectionDocumentBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/file/CollectionDocument.proto`, { keepCase: true }).lookup('file.protobuf.CollectionDocument');
const collectionDocumentStub = require('./file/collectionDocument.stub');
const collectionStub = require('./file/collection.stub');
const collectionVirtualFolderAdapter = require('./file/collectionVirtualFolder');
const collectionVirtualFolderBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/file/CollectionVirtualFolder.proto`, { keepCase: true }).lookup('file.protobuf.CollectionVirtualFolder');
const collectionVirtualFolderStub = require('./file/collectionVirtualFolder.stub');
const compositeFilterAdapter = require('./ccsds_com/compositeFilter');
const compositeFilterBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/ccsds_com/CompositeFilter.proto`, { keepCase: true }).lookup('ccsds_com.protobuf.CompositeFilter');
const compositeFilterSetAdapter = require('./ccsds_com/compositeFilterSet');
const compositeFilterSetBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/ccsds_com/CompositeFilterSet.proto`, { keepCase: true }).lookup('ccsds_com.protobuf.CompositeFilterSet');
const compositeFilterSetStub = require('./ccsds_com/compositeFilterSet.stub');
const compositeFilterStub = require('./ccsds_com/compositeFilter.stub');
const computedEventAdapter = require('./computedEvent/computedEvent');
const computedEventBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/computedEvent/ComputedEvent.proto`, { keepCase: true }).lookup('computedEvent.protobuf.ComputedEvent');
const computedEventStub = require('./computedEvent/computedEvent.stub');
const containerStub = require('./ccsds_cs/container.stub');
const decommutedPacketAdapter = require('./decommutedPacket/decommutedPacket');
const decommutedPacketBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/decommutedPacket/DecommutedPacket.proto`, { keepCase: true }).lookup('decommutedPacket.protobuf.DecommutedPacket');
const decommutedPacketStub = require('./decommutedPacket/decommutedPacket.stub');
const decommutedParameterAdapter = require('./decommutedParameter/decommutedParameter');
const decommutedParameterBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/decommutedParameter/DecommutedParameter.proto`, { keepCase: true }).lookup('decommutedParameter.protobuf.DecommutedParameter');
const decommutedParameterStub = require('./decommutedParameter/decommutedParameter.stub');
const decommutedValueAdapter = require('./decommutedPacket/decommutedValue');
const decommutedValueBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/decommutedPacket/DecommutedValue.proto`, { keepCase: true }).lookup('decommutedPacket.protobuf.DecommutedValue');
const decommutedValueStub = require('./decommutedPacket/decommutedValue.stub');
const docVersionAdapter = require('./file/docVersion');
const docVersionBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/file/DocVersion.proto`, { keepCase: true }).lookup('file.protobuf.DocVersion');
const docVersionStub = require('./file/docVersion.stub');
const documentAdapter = require('./file/document');
const documentBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/file/Document.proto`, { keepCase: true }).lookup('file.protobuf.Document');
const documentStub = require('./file/document.stub');
const documentValueAdapter = require('./editor/documentValue');
const documentValueBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/editor/DocumentValue.proto`, { keepCase: true }).lookup('editor.protobuf.DocumentValue');
const documentValueStub = require('./editor/documentValue.stub');
const encodeArgumentRequestAdapter = require('./encode/encodeArgumentRequest');
const encodeArgumentRequestBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/encode/EncodeArgumentRequest.proto`, { keepCase: true }).lookup('encode.protobuf.EncodeArgumentRequest');
const encodeArgumentRequestStub = require('./encode/encodeArgumentRequest.stub');
const encodeInvocationAdapter = require('./encode/encodeInvocation');
const encodeInvocationBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/encode/EncodeInvocation.proto`, { keepCase: true }).lookup('encode.protobuf.EncodeInvocation');
const encodeInvocationStub = require('./encode/encodeInvocation.stub');
const encodeLargeTCInvocationAdapter = require('./encode/encodeLargeTCInvocation');
const encodeLargeTCInvocationBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/encode/EncodeLargeTCInvocation.proto`, { keepCase: true }).lookup('encode.protobuf.EncodeLargeTCInvocation');
const encodeLargeTCInvocationStub = require('./encode/encodeLargeTCInvocation.stub');
const encodeResponseAdapter = require('./encode/encodeResponse');
const encodeResponseBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/encode/EncodeResponse.proto`, { keepCase: true }).lookup('encode.protobuf.EncodeResponse');
const encodeResponseStub = require('./encode/encodeResponse.stub');
const encodedValueAdapter = require('./encode/encodedValue');
const encodedValueBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/encode/EncodedValue.proto`, { keepCase: true }).lookup('encode.protobuf.EncodedValue');
const encodedValueStub = require('./encode/encodedValue.stub');
const encodedValuesListAdapter = require('./encode/encodedValuesList');
const encodedValuesListBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/encode/EncodedValuesList.proto`, { keepCase: true }).lookup('encode.protobuf.EncodedValuesList');
const encodedValuesListStub = require('./encode/encodedValuesList.stub');
const encodingActionAdapter = require('./encode/encodingAction');
const encodingActionBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/encode/EncodingAction.proto`, { keepCase: true }).lookup('encode.protobuf.EncodingAction');
const encodingActionStub = require('./encode/encodingAction.stub');
const encryptResponseAdapter = require('./encode/encryptResponse');
const encryptResponseBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/encode/EncryptResponse.proto`, { keepCase: true }).lookup('encode.protobuf.EncryptResponse');
const encryptResponseStub = require('./encode/encryptResponse.stub');
const eventAdapter = require('./event/event');
const eventBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/event/Event.proto`, { keepCase: true }).lookup('event.protobuf.Event');
const eventDefinitionAdapter = require('./event/eventDefinition');
const eventDefinitionBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/event/EventDefinition.proto`, { keepCase: true }).lookup('event.protobuf.EventDefinition');
const eventDefinitionStub = require('./event/eventDefinition.stub');
const eventStub = require('./event/event.stub');
const executionAdapter = require('./execution/execution');
const executionBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/execution/Execution.proto`, { keepCase: true }).lookup('execution.protobuf.Execution');
const executionStatusStub = require('./execution/executionStatus.stub');
const executionStub = require('./execution/execution.stub');
const expectedAckAdapter = require('./tcHistory/expectedAck');
const expectedAckBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/tcHistory/ExpectedAck.proto`, { keepCase: true }).lookup('tcHistory.protobuf.ExpectedAck');
const expectedAckStub = require('./tcHistory/expectedAck.stub');
const externalEventAdapter = require('./userEvent/externalEvent');
const externalEventBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/userEvent/ExternalEvent.proto`, { keepCase: true }).lookup('userEvent.protobuf.ExternalEvent');
const externalEventStub = require('./userEvent/externalEvent.stub');
const flagValAdapter = require('./cop1/flagVal');
const flagValBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/cop1/FlagVal.proto`, { keepCase: true }).lookup('cop1.protobuf.FlagVal');
const flagValStub = require('./cop1/flagVal.stub');
const flowConfigurationAdapter = require('./connection/flowConfiguration');
const flowConfigurationBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/FlowConfiguration.proto`, { keepCase: true }).lookup('connection.protobuf.FlowConfiguration');
const flowConfigurationStub = require('./connection/flowConfiguration.stub');
const flowElmtAdapter = require('./connection/flowElmt');
const flowElmtBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/FlowElmt.proto`, { keepCase: true }).lookup('connection.protobuf.FlowElmt');
const flowElmtStub = require('./connection/flowElmt.stub');
const flowFullStatusAdapter = require('./connection/flowFullStatus');
const flowFullStatusBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/FlowFullStatus.proto`, { keepCase: true }).lookup('connection.protobuf.FlowFullStatus');
const flowFullStatusStub = require('./connection/flowFullStatus.stub');
const flowIdentifierAdapter = require('./connection/flowIdentifier');
const flowIdentifierBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/FlowIdentifier.proto`, { keepCase: true }).lookup('connection.protobuf.FlowIdentifier');
const flowIdentifierStub = require('./connection/flowIdentifier.stub');
const flowInfoAdapter = require('./connection/flowInfo');
const flowInfoBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/FlowInfo.proto`, { keepCase: true }).lookup('connection.protobuf.FlowInfo');
const flowInfoStub = require('./connection/flowInfo.stub');
const flowListAdapter = require('./connection/flowList');
const flowListBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/FlowList.proto`, { keepCase: true }).lookup('connection.protobuf.FlowList');
const flowListStub = require('./connection/flowList.stub');
const flowSmallStatusAdapter = require('./connection/flowSmallStatus');
const flowSmallStatusBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/FlowSmallStatus.proto`, { keepCase: true }).lookup('connection.protobuf.FlowSmallStatus');
const flowSmallStatusStub = require('./connection/flowSmallStatus.stub');
const flowStatusAdapter = require('./connection/flowStatus');
const flowStatusBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/FlowStatus.proto`, { keepCase: true }).lookup('connection.protobuf.FlowStatus');
const flowStatusStub = require('./connection/flowStatus.stub');
const folderAdapter = require('./file/folder');
const folderBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/file/Folder.proto`, { keepCase: true }).lookup('file.protobuf.Folder');
const folderStub = require('./file/folder.stub');
const functionalChainAdapter = require('./soo/functionalChain');
const functionalChainBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/soo/FunctionalChain.proto`, { keepCase: true }).lookup('soo.protobuf.FunctionalChain');
const functionalChainStub = require('./soo/functionalChain.stub');
const gPMCC1StateAdapter = require('./cop1/gPMCC1State');
const gPMCC1StateBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/cop1/GPMCC1State.proto`, { keepCase: true }).lookup('cop1.protobuf.GPMCC1State');
const gPMCC1StateStub = require('./cop1/gPMCC1State.stub');
const genericOperationAdapter = require('./soo/genericOperation');
const genericOperationBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/soo/GenericOperation.proto`, { keepCase: true }).lookup('soo.protobuf.GenericOperation');
const genericOperationStub = require('./soo/genericOperation.stub');
const genericTCAdapter = require('./tcHistory/genericTC');
const genericTCBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/tcHistory/GenericTC.proto`, { keepCase: true }).lookup('tcHistory.protobuf.GenericTC');
const genericTCStub = require('./tcHistory/genericTC.stub');
const groundMonitoringAlarmAdapter = require('./groundAlarm/groundMonitoringAlarm');
const groundMonitoringAlarmBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/groundAlarm/GroundMonitoringAlarm.proto`, { keepCase: true }).lookup('groundAlarm.protobuf.GroundMonitoringAlarm');
const groundMonitoringAlarmStub = require('./groundAlarm/groundMonitoringAlarm.stub');
const groupDefinitionAdapter = require('./ccsds_mc/groupDefinition');
const groupDefinitionBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/ccsds_mc/GroupDefinition.proto`, { keepCase: true }).lookup('ccsds_mc.protobuf.GroupDefinition');
const groupDefinitionStub = require('./ccsds_mc/groupDefinition.stub');
const groupOfOperationAdapter = require('./soo/groupOfOperation');
const groupOfOperationBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/soo/GroupOfOperation.proto`, { keepCase: true }).lookup('soo.protobuf.GroupOfOperation');
const groupOfOperationStub = require('./soo/groupOfOperation.stub');
const ifQueueElementAdapter = require('./cop1/ifQueueElement');
const ifQueueElementBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/cop1/IfQueueElement.proto`, { keepCase: true }).lookup('cop1.protobuf.IfQueueElement');
const ifQueueElementStub = require('./cop1/ifQueueElement.stub');
const ifQueueUnitAdapter = require('./cop1/ifQueueUnit');
const ifQueueUnitBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/cop1/IfQueueUnit.proto`, { keepCase: true }).lookup('cop1.protobuf.IfQueueUnit');
const ifQueueUnitStub = require('./cop1/ifQueueUnit.stub');
const indexedValueAdapter = require('./ccsds_mal/indexedValue');
const indexedValueBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/ccsds_mal/IndexedValue.proto`, { keepCase: true }).lookup('ccsds_mal.protobuf.IndexedValue');
const indexedValueStub = require('./ccsds_mal/indexedValue.stub');
const initFlowConfigurationAdapter = require('./connection/initFlowConfiguration');
const initFlowConfigurationBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/InitFlowConfiguration.proto`, { keepCase: true }).lookup('connection.protobuf.InitFlowConfiguration');
const initFlowConfigurationStub = require('./connection/initFlowConfiguration.stub');
const initStationConfigurationAdapter = require('./connection/initStationConfiguration');
const initStationConfigurationBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/InitStationConfiguration.proto`, { keepCase: true }).lookup('connection.protobuf.InitStationConfiguration');
const initStationConfigurationStub = require('./connection/initStationConfiguration.stub');
const instanceBooleanPairStub = require('./ccsds_com/instanceBooleanPair.stub');
const isisAggregationAdapter = require('./ccsds_mc_aggregation/isisAggregation');
const isisAggregationBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/ccsds_mc_aggregation/IsisAggregation.proto`, { keepCase: true }).lookup('ccsds_mc_aggregation.protobuf.IsisAggregation');
const isisAggregationStub = require('./ccsds_mc_aggregation/isisAggregation.stub');
const isisFilterSetAdapter = require('./queries/isisFilterSet');
const isisFilterSetBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/queries/IsisFilterSet.proto`, { keepCase: true }).lookup('queries.protobuf.IsisFilterSet');
const isisFilterSetStub = require('./queries/isisFilterSet.stub');
const lifeCycleAdapter = require('./lifeCycle/lifeCycle');
const lifeCycleBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/lifeCycle/LifeCycle.proto`, { keepCase: true }).lookup('lifeCycle.protobuf.LifeCycle');
const lifeCycleStatusStub = require('./lifeCycle/lifeCycleStatus.stub');
const lifeCycleStub = require('./lifeCycle/lifeCycle.stub');
const locationAdapter = require('./memoryImage/location');
const locationBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/memoryImage/Location.proto`, { keepCase: true }).lookup('memoryImage.protobuf.Location');
const locationStub = require('./memoryImage/location.stub');
const logStub = require('./logModel/log.stub');
const logbookEventAdapter = require('./logbookEvent/logbookEvent');
const logbookEventBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/logbookEvent/LogbookEvent.proto`, { keepCase: true }).lookup('logbookEvent.protobuf.LogbookEvent');
const logbookEventStub = require('./logbookEvent/logbookEvent.stub');
const mAPAdapter = require('./memoryImage/mAP');
const mAPBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/memoryImage/MAP.proto`, { keepCase: true }).lookup('memoryImage.protobuf.MAP');
const mAPDataAdapter = require('./memoryImage/mAPData');
const mAPDataBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/memoryImage/MAPData.proto`, { keepCase: true }).lookup('memoryImage.protobuf.MAPData');
const mAPDataStub = require('./memoryImage/mAPData.stub');
const mAPStub = require('./memoryImage/mAP.stub');
const memoryImageAdapter = require('./memoryImage/memoryImage');
const memoryImageBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/memoryImage/MemoryImage.proto`, { keepCase: true }).lookup('memoryImage.protobuf.MemoryImage');
const memoryImageStub = require('./memoryImage/memoryImage.stub');
const namedValueAdapter = require('./ccsds_mal/namedValue');
const namedValueBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/ccsds_mal/NamedValue.proto`, { keepCase: true }).lookup('ccsds_mal.protobuf.NamedValue');
const namedValueStub = require('./ccsds_mal/namedValue.stub');
const nominalStationAdapter = require('./connection/nominalStation');
const nominalStationBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/NominalStation.proto`, { keepCase: true }).lookup('connection.protobuf.NominalStation');
const nominalStationStub = require('./connection/nominalStation.stub');
const objectDetailsStub = require('./ccsds_com/objectDetails.stub');
const objectIdStub = require('./ccsds_com/objectId.stub');
const objectKeyStub = require('./ccsds_com/objectKey.stub');
const objectTypeStub = require('./ccsds_com/objectType.stub');
const opAlertAdapter = require('./opAlert/opAlert');
const opAlertBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/opAlert/OpAlert.proto`, { keepCase: true }).lookup('opAlert.protobuf.OpAlert');
const opAlertClosingDataAdapter = require('./opAlert/opAlertClosingData');
const opAlertClosingDataBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/opAlert/OpAlertClosingData.proto`, { keepCase: true }).lookup('opAlert.protobuf.OpAlertClosingData');
const opAlertClosingDataStub = require('./opAlert/opAlertClosingData.stub');
const opAlertConfigurationAdapter = require('./opAlert/opAlertConfiguration');
const opAlertConfigurationBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/opAlert/OpAlertConfiguration.proto`, { keepCase: true }).lookup('opAlert.protobuf.OpAlertConfiguration');
const opAlertConfigurationStub = require('./opAlert/opAlertConfiguration.stub');
const opAlertStub = require('./opAlert/opAlert.stub');
const operationAdapter = require('./soo/operation');
const operationBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/soo/Operation.proto`, { keepCase: true }).lookup('soo.protobuf.Operation');
const operationDefinitionAdapter = require('./connection/operationDefinition');
const operationDefinitionBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/OperationDefinition.proto`, { keepCase: true }).lookup('connection.protobuf.OperationDefinition');
const operationDefinitionStub = require('./connection/operationDefinition.stub');
const operationParameterAdapter = require('./operationParameter/operationParameter');
const operationParameterBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/operationParameter/OperationParameter.proto`, { keepCase: true }).lookup('operationParameter.protobuf.OperationParameter');
const operationParameterStub = require('./operationParameter/operationParameter.stub');
const operationStub = require('./soo/operation.stub');
const packetAdapter = require('./packet/packet');
const packetBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/packet/Packet.proto`, { keepCase: true }).lookup('packet.protobuf.Packet');
const packetStub = require('./packet/packet.stub');
const parameterAdapter = require('./ccsds_mc_aggregation/parameter');
const parameterBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/ccsds_mc_aggregation/Parameter.proto`, { keepCase: true }).lookup('ccsds_mc_aggregation.protobuf.Parameter');
const parameterStub = require('./ccsds_mc_aggregation/parameter.stub');
const parameterValueAdapter = require('./ccsds_mc/parameterValue');
const parameterValueBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/ccsds_mc/ParameterValue.proto`, { keepCase: true }).lookup('ccsds_mc.protobuf.ParameterValue');
const parameterValueStub = require('./ccsds_mc/parameterValue.stub');
const proccessedTCAdapter = require('./cop1/proccessedTC');
const proccessedTCBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/cop1/ProccessedTC.proto`, { keepCase: true }).lookup('cop1.protobuf.ProccessedTC');
const proccessedTCStub = require('./cop1/proccessedTC.stub');
const processFullStateAdapter = require('./connection/processFullState');
const processFullStateBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/ProcessFullState.proto`, { keepCase: true }).lookup('connection.protobuf.ProcessFullState');
const processFullStateStub = require('./connection/processFullState.stub');
const processIdentifierAdapter = require('./connection/processIdentifier');
const processIdentifierBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/ProcessIdentifier.proto`, { keepCase: true }).lookup('connection.protobuf.ProcessIdentifier');
const processIdentifierStub = require('./connection/processIdentifier.stub');
const processInfoAdapter = require('./connection/processInfo');
const processInfoBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/ProcessInfo.proto`, { keepCase: true }).lookup('connection.protobuf.ProcessInfo');
const processInfoStub = require('./connection/processInfo.stub');
const providerDefinitionStub = require('./ccsds_cs/providerDefinition.stub');
const providerStub = require('./ccsds_cs/provider.stub');
const rawDataAdapter = require('./rawData/rawData');
const rawDataBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/rawData/RawData.proto`, { keepCase: true }).lookup('rawData.protobuf.RawData');
const rawDataStub = require('./rawData/rawData.stub');
const reportingParameterAdapter = require('./decommutedParameter/reportingParameter');
const reportingParameterBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/decommutedParameter/ReportingParameter.proto`, { keepCase: true }).lookup('decommutedParameter.protobuf.ReportingParameter');
const reportingParameterStub = require('./decommutedParameter/reportingParameter.stub');
const resultAdapter = require('./soo/result');
const resultBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/soo/Result.proto`, { keepCase: true }).lookup('soo.protobuf.Result');
const resultStub = require('./soo/result.stub');
const rmPacketAdapter = require('./packet/rmPacket');
const rmPacketBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/packet/RmPacket.proto`, { keepCase: true }).lookup('packet.protobuf.RmPacket');
const rmPacketStub = require('./packet/rmPacket.stub');
const sentQueueElementAdapter = require('./cop1/sentQueueElement');
const sentQueueElementBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/cop1/SentQueueElement.proto`, { keepCase: true }).lookup('cop1.protobuf.SentQueueElement');
const sentQueueElementStub = require('./cop1/sentQueueElement.stub');
const serializableFunctionInfoStub = require('./sessionModel/serializableFunctionInfo.stub');
const serializableSessionInfoStub = require('./sessionModel/serializableSessionInfo.stub');
const serviceAddressStub = require('./ccsds_cs/serviceAddress.stub');
const serviceFilterStub = require('./ccsds_cs/serviceFilter.stub');
const sessionAdapter = require('./soo/session');
const sessionBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/soo/Session.proto`, { keepCase: true }).lookup('soo.protobuf.Session');
const sessionStub = require('./soo/session.stub');
const specificAttributeDefinitionAdapter = require('./event/specificAttributeDefinition');
const specificAttributeDefinitionBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/event/SpecificAttributeDefinition.proto`, { keepCase: true }).lookup('event.protobuf.SpecificAttributeDefinition');
const specificAttributeDefinitionStub = require('./event/specificAttributeDefinition.stub');
const statAggregationAdapter = require('./statAggregation/statAggregation');
const statAggregationBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/statAggregation/StatAggregation.proto`, { keepCase: true }).lookup('statAggregation.protobuf.StatAggregation');
const statAggregationStub = require('./statAggregation/statAggregation.stub');
const statValueAdapter = require('./statAggregation/statValue');
const statValueBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/statAggregation/StatValue.proto`, { keepCase: true }).lookup('statAggregation.protobuf.StatValue');
const statValueStub = require('./statAggregation/statValue.stub');
const stationElmtAdapter = require('./connection/stationElmt');
const stationElmtBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/StationElmt.proto`, { keepCase: true }).lookup('connection.protobuf.StationElmt');
const stationElmtStub = require('./connection/stationElmt.stub');
const stationFullStatusAdapter = require('./connection/stationFullStatus');
const stationFullStatusBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/StationFullStatus.proto`, { keepCase: true }).lookup('connection.protobuf.StationFullStatus');
const stationFullStatusStub = require('./connection/stationFullStatus.stub');
const stationIdentifierAdapter = require('./connection/stationIdentifier');
const stationIdentifierBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/StationIdentifier.proto`, { keepCase: true }).lookup('connection.protobuf.StationIdentifier');
const stationIdentifierStub = require('./connection/stationIdentifier.stub');
const stationListAdapter = require('./connection/stationList');
const stationListBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/StationList.proto`, { keepCase: true }).lookup('connection.protobuf.StationList');
const stationListStub = require('./connection/stationList.stub');
const stationStatusAdapter = require('./connection/stationStatus');
const stationStatusBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/StationStatus.proto`, { keepCase: true }).lookup('connection.protobuf.StationStatus');
const stationStatusStub = require('./connection/stationStatus.stub');
const statisticFunctionDetailsAdapter = require('./ccsds_mc/statisticFunctionDetails');
const statisticFunctionDetailsBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/ccsds_mc/StatisticFunctionDetails.proto`, { keepCase: true }).lookup('ccsds_mc.protobuf.StatisticFunctionDetails');
const statisticFunctionDetailsStructAdapter = require('./ccsds_mc/statisticFunctionDetailsStruct');
const statisticFunctionDetailsStructBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/ccsds_mc/StatisticFunctionDetailsStruct.proto`, { keepCase: true }).lookup('ccsds_mc.protobuf.StatisticFunctionDetailsStruct');
const statisticFunctionDetailsStructStub = require('./ccsds_mc/statisticFunctionDetailsStruct.stub');
const statisticFunctionDetailsStub = require('./ccsds_mc/statisticFunctionDetails.stub');
const statisticFunctionValueAdapter = require('./ccsds_mc/statisticFunctionValue');
const statisticFunctionValueBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/ccsds_mc/StatisticFunctionValue.proto`, { keepCase: true }).lookup('ccsds_mc.protobuf.StatisticFunctionValue');
const statisticFunctionValueStub = require('./ccsds_mc/statisticFunctionValue.stub');
const statisticLinkStructStub = require('./ccsds_mc/statisticLinkStruct.stub');
const statisticLinkStub = require('./ccsds_mc/statisticLink.stub');
const statisticParameterReportAdapter = require('./ccsds_mc/statisticParameterReport');
const statisticParameterReportBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/ccsds_mc/StatisticParameterReport.proto`, { keepCase: true }).lookup('ccsds_mc.protobuf.StatisticParameterReport');
const statisticParameterReportStub = require('./ccsds_mc/statisticParameterReport.stub');
const statisticValueAdapter = require('./ccsds_mc/statisticValue');
const statisticValueBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/ccsds_mc/StatisticValue.proto`, { keepCase: true }).lookup('ccsds_mc.protobuf.StatisticValue');
const statisticValueStructAdapter = require('./ccsds_mc/statisticValueStruct');
const statisticValueStructBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/ccsds_mc/StatisticValueStruct.proto`, { keepCase: true }).lookup('ccsds_mc.protobuf.StatisticValueStruct');
const statisticValueStructStub = require('./ccsds_mc/statisticValueStruct.stub');
const statisticValueStub = require('./ccsds_mc/statisticValue.stub');
const statusAdapter = require('./soo/status');
const statusBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/soo/Status.proto`, { keepCase: true }).lookup('soo.protobuf.Status');
const statusStub = require('./soo/status.stub');
const successiveAckAdapter = require('./tcHistory/successiveAck');
const successiveAckBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/tcHistory/SuccessiveAck.proto`, { keepCase: true }).lookup('tcHistory.protobuf.SuccessiveAck');
const successiveAckStub = require('./tcHistory/successiveAck.stub');
const tC11Adapter = require('./tcHistory/tC11');
const tC11Builder = new ProtoBuf.Root().loadSync(`${__dirname}/tcHistory/TC11.proto`, { keepCase: true }).lookup('tcHistory.protobuf.TC11');
const tC11Stub = require('./tcHistory/tC11.stub');
const tC13Adapter = require('./tcHistory/tC13');
const tC13Builder = new ProtoBuf.Root().loadSync(`${__dirname}/tcHistory/TC13.proto`, { keepCase: true }).lookup('tcHistory.protobuf.TC13');
const tC13Stub = require('./tcHistory/tC13.stub');
const tCDetailsAdapter = require('./tcHistory/tCDetails');
const tCDetailsBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/tcHistory/TCDetails.proto`, { keepCase: true }).lookup('tcHistory.protobuf.TCDetails');
const tCDetailsStub = require('./tcHistory/tCDetails.stub');
const tCFileAdapter = require('./tcHistory/tCFile');
const tCFileBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/tcHistory/TCFile.proto`, { keepCase: true }).lookup('tcHistory.protobuf.TCFile');
const tCFileStub = require('./tcHistory/tCFile.stub');
const tCHistoryAdapter = require('./tcHistory/tCHistory');
const tCHistoryBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/tcHistory/TCHistory.proto`, { keepCase: true }).lookup('tcHistory.protobuf.TCHistory');
const tCHistoryStub = require('./tcHistory/tCHistory.stub');
const tCImmediateAdapter = require('./tcHistory/tCImmediate');
const tCImmediateBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/tcHistory/TCImmediate.proto`, { keepCase: true }).lookup('tcHistory.protobuf.TCImmediate');
const tCImmediateStub = require('./tcHistory/tCImmediate.stub');
const tCLongAdapter = require('./tcHistory/tCLong');
const tCLongBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/tcHistory/TCLong.proto`, { keepCase: true }).lookup('tcHistory.protobuf.TCLong');
const tCLongStub = require('./tcHistory/tCLong.stub');
const tCPhysicalParameterAdapter = require('./tcHistory/tCPhysicalParameter');
const tCPhysicalParameterBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/tcHistory/TCPhysicalParameter.proto`, { keepCase: true }).lookup('tcHistory.protobuf.TCPhysicalParameter');
const tCPhysicalParameterStub = require('./tcHistory/tCPhysicalParameter.stub');
const timeBasedDataBooleanStub = require('./timeBasedDataType/timeBasedDataBoolean.stub');
const timeBasedDataByteStub = require('./timeBasedDataType/timeBasedDataByte.stub');
const timeBasedDataDoubleStub = require('./timeBasedDataType/timeBasedDataDouble.stub');
const timeBasedDataDurationStub = require('./timeBasedDataType/timeBasedDataDuration.stub');
const timeBasedDataFinetimeStub = require('./timeBasedDataType/timeBasedDataFinetime.stub');
const timeBasedDataFloatStub = require('./timeBasedDataType/timeBasedDataFloat.stub');
const timeBasedDataIdentifierStub = require('./timeBasedDataType/timeBasedDataIdentifier.stub');
const timeBasedDataIntegerStub = require('./timeBasedDataType/timeBasedDataInteger.stub');
const timeBasedDataLongStub = require('./timeBasedDataType/timeBasedDataLong.stub');
const timeBasedDataShortStub = require('./timeBasedDataType/timeBasedDataShort.stub');
const timeBasedDataStringStub = require('./timeBasedDataType/timeBasedDataString.stub');
const timeBasedDataTimeStub = require('./timeBasedDataType/timeBasedDataTime.stub');
const timeBasedDataUByteStub = require('./timeBasedDataType/timeBasedDataUByte.stub');
const timeBasedDataUIntegerStub = require('./timeBasedDataType/timeBasedDataUInteger.stub');
const timeBasedDataULongStub = require('./timeBasedDataType/timeBasedDataULong.stub');
const timeBasedDataURIStub = require('./timeBasedDataType/timeBasedDataURI.stub');
const timeBasedDataUShortStub = require('./timeBasedDataType/timeBasedDataUShort.stub');
const timeStructureStub = require('./modelTimebar/timeStructure.stub');
const timeTaggedTCAdapter = require('./tcHistory/timeTaggedTC');
const timeTaggedTCBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/tcHistory/TimeTaggedTC.proto`, { keepCase: true }).lookup('tcHistory.protobuf.TimeTaggedTC');
const timeTaggedTCStub = require('./tcHistory/timeTaggedTC.stub');
const timeTaggedTelecommandAdapter = require('./encode/timeTaggedTelecommand');
const timeTaggedTelecommandBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/encode/TimeTaggedTelecommand.proto`, { keepCase: true }).lookup('encode.protobuf.TimeTaggedTelecommand');
const timeTaggedTelecommandStub = require('./encode/timeTaggedTelecommand.stub');
const tmPacketAdapter = require('./packet/tmPacket');
const tmPacketBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/packet/TmPacket.proto`, { keepCase: true }).lookup('packet.protobuf.TmPacket');
const tmPacketStub = require('./packet/tmPacket.stub');
const transitionAdapter = require('./groundAlarm/transition');
const transitionBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/groundAlarm/Transition.proto`, { keepCase: true }).lookup('groundAlarm.protobuf.Transition');
const transitionStub = require('./groundAlarm/transition.stub');
const transportedDocumentsAdapter = require('./editor/transportedDocuments');
const transportedDocumentsBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/editor/TransportedDocuments.proto`, { keepCase: true }).lookup('editor.protobuf.TransportedDocuments');
const transportedDocumentsStub = require('./editor/transportedDocuments.stub');
const transportedGroundAlarmAdapter = require('./groundAlarm/transportedGroundAlarm');
const transportedGroundAlarmBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/groundAlarm/TransportedGroundAlarm.proto`, { keepCase: true }).lookup('groundAlarm.protobuf.TransportedGroundAlarm');
const transportedGroundAlarmStub = require('./groundAlarm/transportedGroundAlarm.stub');
const uCPParameterAdapter = require('./connection/uCPParameter');
const uCPParameterBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/UCPParameter.proto`, { keepCase: true }).lookup('connection.protobuf.UCPParameter');
const uCPParameterStub = require('./connection/uCPParameter.stub');
const uCPReportAdapter = require('./connection/uCPReport');
const uCPReportBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/connection/UCPReport.proto`, { keepCase: true }).lookup('connection.protobuf.UCPReport');
const uCPReportStub = require('./connection/uCPReport.stub');
const userContextStub = require('./ccsds_cs/userContext.stub');
const userEventAdapter = require('./userEvent/userEvent');
const userEventBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/userEvent/UserEvent.proto`, { keepCase: true }).lookup('userEvent.protobuf.UserEvent');
const userEventStub = require('./userEvent/userEvent.stub');
const userRightAdapter = require('./file/userRight');
const userRightBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/file/UserRight.proto`, { keepCase: true }).lookup('file.protobuf.UserRight');
const userRightStub = require('./file/userRight.stub');
const userStub = require('./ccsds_cs/user.stub');

const compareStructureStub = require('./pusModelEditorMessages/compareStructure.stub');
const compareStructureAdapter = require('./pusModelEditorMessages/compareStructure');
const compareStructureBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/CompareStructure.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.CompareStructure');

const dataStructureStub = require('./pusModelEditorMessages/dataStructure.stub');
const dataStructureAdapter = require('./pusModelEditorMessages/dataStructure');
const dataStructureBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/DataStructure.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.DataStructure');

const headerStructureStub = require('./pusModelEditorMessages/headerStructure.stub');
const headerStructureAdapter = require('./pusModelEditorMessages/headerStructure');
const headerStructureBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/HeaderStructure.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.HeaderStructure');

const initialiseStructureStub = require('./pusModelEditorMessages/initialiseStructure.stub');
const initialiseStructureAdapter = require('./pusModelEditorMessages/initialiseStructure');
const initialiseStructureBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/InitialiseStructure.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.InitialiseStructure');

const pus005ModelStub = require('./pusModelEditorMessages/pus005Model.stub');
const pus005ModelAdapter = require('./pusModelEditorMessages/pus005Model');
const pus005ModelBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus005Model.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus005Model');

const pus005OnBoardEventStub = require('./pusModelEditorMessages/pus005OnBoardEvent.stub');
const pus005OnBoardEventAdapter = require('./pusModelEditorMessages/pus005OnBoardEvent');
const pus005OnBoardEventBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus005OnBoardEvent.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus005OnBoardEvent');

const pus011ApidStub = require('./pusModelEditorMessages/pus011Apid.stub');
const pus011ApidAdapter = require('./pusModelEditorMessages/pus011Apid');
const pus011ApidBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus011Apid.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus011Apid');

const pus011CommandStub = require('./pusModelEditorMessages/pus011Command.stub');
const pus011CommandAdapter = require('./pusModelEditorMessages/pus011Command');
const pus011CommandBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus011Command.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus011Command');

const pus011CommandParameterStub = require('./pusModelEditorMessages/pus011CommandParameter.stub');
const pus011CommandParameterAdapter = require('./pusModelEditorMessages/pus011CommandParameter');
const pus011CommandParameterBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus011CommandParameter.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus011CommandParameter');

const pus011ModelStub = require('./pusModelEditorMessages/pus011Model.stub');
const pus011ModelAdapter = require('./pusModelEditorMessages/pus011Model');
const pus011ModelBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus011Model.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus011Model');

const pus011SubScheduleStub = require('./pusModelEditorMessages/pus011SubSchedule.stub');
const pus011SubScheduleAdapter = require('./pusModelEditorMessages/pus011SubSchedule');
const pus011SubScheduleBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus011SubSchedule.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus011SubSchedule');

const pus011TimeShiftStub = require('./pusModelEditorMessages/pus011TimeShift.stub');
const pus011TimeShiftAdapter = require('./pusModelEditorMessages/pus011TimeShift');
const pus011TimeShiftBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus011TimeShift.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus011TimeShift');

const pus012ModelStub = require('./pusModelEditorMessages/pus012Model.stub');
const pus012ModelAdapter = require('./pusModelEditorMessages/pus012Model');
const pus012ModelBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus012Model.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus012Model');

const pus012MonitoringCheckPropertiesStub = require('./pusModelEditorMessages/pus012MonitoringCheckProperties.stub');
const pus012MonitoringCheckPropertiesAdapter = require('./pusModelEditorMessages/pus012MonitoringCheckProperties');
const pus012MonitoringCheckPropertiesBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus012MonitoringCheckProperties.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus012MonitoringCheckProperties');

const pus012ParameterMonitoringDefinitionStub = require('./pusModelEditorMessages/pus012ParameterMonitoringDefinition.stub');
const pus012ParameterMonitoringDefinitionAdapter = require('./pusModelEditorMessages/pus012ParameterMonitoringDefinition');
const pus012ParameterMonitoringDefinitionBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus012ParameterMonitoringDefinition.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus012ParameterMonitoringDefinition');

const pus013LdtStub = require('./pusModelEditorMessages/pus013Ldt.stub');
const pus013LdtAdapter = require('./pusModelEditorMessages/pus013Ldt');
const pus013LdtBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus013Ldt.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus013Ldt');

const pus013LdtPartStub = require('./pusModelEditorMessages/pus013LdtPart.stub');
const pus013LdtPartAdapter = require('./pusModelEditorMessages/pus013LdtPart');
const pus013LdtPartBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus013LdtPart.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus013LdtPart');

const pus013ModelStub = require('./pusModelEditorMessages/pus013Model.stub');
const pus013ModelAdapter = require('./pusModelEditorMessages/pus013Model');
const pus013ModelBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus013Model.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus013Model');

const pus014ForwardedPacketStub = require('./pusModelEditorMessages/pus014ForwardedPacket.stub');
const pus014ForwardedPacketAdapter = require('./pusModelEditorMessages/pus014ForwardedPacket');
const pus014ForwardedPacketBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus014ForwardedPacket.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus014ForwardedPacket');

const pus014ModelStub = require('./pusModelEditorMessages/pus014Model.stub');
const pus014ModelAdapter = require('./pusModelEditorMessages/pus014Model');
const pus014ModelBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus014Model.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus014Model');

const pus015ModelStub = require('./pusModelEditorMessages/pus015Model.stub');
const pus015ModelAdapter = require('./pusModelEditorMessages/pus015Model');
const pus015ModelBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus015Model.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus015Model');

const pus015PacketStub = require('./pusModelEditorMessages/pus015Packet.stub');
const pus015PacketAdapter = require('./pusModelEditorMessages/pus015Packet');
const pus015PacketBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus015Packet.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus015Packet');

const pus015PacketStoreStub = require('./pusModelEditorMessages/pus015PacketStore.stub');
const pus015PacketStoreAdapter = require('./pusModelEditorMessages/pus015PacketStore');
const pus015PacketStoreBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus015PacketStore.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus015PacketStore');

const pus018ModelStub = require('./pusModelEditorMessages/pus018Model.stub');
const pus018ModelAdapter = require('./pusModelEditorMessages/pus018Model');
const pus018ModelBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus018Model.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus018Model');

const pus018ObcpStub = require('./pusModelEditorMessages/pus018Obcp.stub');
const pus018ObcpAdapter = require('./pusModelEditorMessages/pus018Obcp');
const pus018ObcpBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus018Obcp.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus018Obcp');

const pus019EventActionStub = require('./pusModelEditorMessages/pus019EventAction.stub');
const pus019EventActionAdapter = require('./pusModelEditorMessages/pus019EventAction');
const pus019EventActionBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus019EventAction.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus019EventAction');

const pus019ModelStub = require('./pusModelEditorMessages/pus019Model.stub');
const pus019ModelAdapter = require('./pusModelEditorMessages/pus019Model');
const pus019ModelBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus019Model.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus019Model');

const pus140ModelStub = require('./pusModelEditorMessages/pus140Model.stub');
const pus140ModelAdapter = require('./pusModelEditorMessages/pus140Model');
const pus140ModelBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus140Model.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus140Model');

const pus140ParameterStub = require('./pusModelEditorMessages/pus140Parameter.stub');
const pus140ParameterAdapter = require('./pusModelEditorMessages/pus140Parameter');
const pus140ParameterBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus140Parameter.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus140Parameter');

const pus142FunctionalMonitoringStub = require('./pusModelEditorMessages/pus142FunctionalMonitoring.stub');
const pus142FunctionalMonitoringAdapter = require('./pusModelEditorMessages/pus142FunctionalMonitoring');
const pus142FunctionalMonitoringBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus142FunctionalMonitoring.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus142FunctionalMonitoring');

const pus142ModelStub = require('./pusModelEditorMessages/pus142Model.stub');
const pus142ModelAdapter = require('./pusModelEditorMessages/pus142Model');
const pus142ModelBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus142Model.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus142Model');

const pus142ParameterMonitoringDefinitionStub = require('./pusModelEditorMessages/pus142ParameterMonitoringDefinition.stub');
const pus142ParameterMonitoringDefinitionAdapter = require('./pusModelEditorMessages/pus142ParameterMonitoringDefinition');
const pus142ParameterMonitoringDefinitionBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus142ParameterMonitoringDefinition.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus142ParameterMonitoringDefinition');

const pus144ModelStub = require('./pusModelEditorMessages/pus144Model.stub');
const pus144ModelAdapter = require('./pusModelEditorMessages/pus144Model');
const pus144ModelBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus144Model.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus144Model');

const pus144OnboardFileStub = require('./pusModelEditorMessages/pus144OnboardFile.stub');
const pus144OnboardFileAdapter = require('./pusModelEditorMessages/pus144OnboardFile');
const pus144OnboardFileBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/Pus144OnboardFile.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.Pus144OnboardFile');

const pusElementListStub = require('./pusModelEditorMessages/pusElementList.stub');
const pusElementListAdapter = require('./pusModelEditorMessages/pusElementList');
const pusElementListBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/PusElementList.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.PusElementList');

const pusMmeModelStub = require('./pusModelEditorMessages/pusMmeModel.stub');
const pusMmeModelAdapter = require('./pusModelEditorMessages/pusMmeModel');
const pusMmeModelBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/PusMmeModel.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.PusMmeModel');

const pusMmePacketStub = require('./pusModelEditorMessages/pusMmePacket.stub');
const pusMmePacketAdapter = require('./pusModelEditorMessages/pusMmePacket');
const pusMmePacketBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/PusMmePacket.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.PusMmePacket');

const pusMmePacketParameterStub = require('./pusModelEditorMessages/pusMmePacketParameter.stub');
const pusMmePacketParameterAdapter = require('./pusModelEditorMessages/pusMmePacketParameter');
const pusMmePacketParameterBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/PusMmePacketParameter.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.PusMmePacketParameter');

const pusMmePacketStoreStub = require('./pusModelEditorMessages/pusMmePacketStore.stub');
const pusMmePacketStoreAdapter = require('./pusModelEditorMessages/pusMmePacketStore');
const pusMmePacketStoreBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/PusMmePacketStore.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.PusMmePacketStore');

const pusParameterStub = require('./pusModelEditorMessages/pusParameter.stub');
const pusParameterAdapter = require('./pusModelEditorMessages/pusParameter');
const pusParameterBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/PusParameter.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.PusParameter');

const pusServiceApidStub = require('./pusModelEditorMessages/pusServiceApid.stub');
const pusServiceApidAdapter = require('./pusModelEditorMessages/pusServiceApid');
const pusServiceApidBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/PusServiceApid.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.PusServiceApid');

const pusValueStub = require('./pusModelEditorMessages/pusValue.stub');
const pusValueAdapter = require('./pusModelEditorMessages/pusValue');
const pusValueBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/PusValue.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.PusValue');

const resetStructureStub = require('./pusModelEditorMessages/resetStructure.stub');
const resetStructureAdapter = require('./pusModelEditorMessages/resetStructure');
const resetStructureBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/ResetStructure.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.ResetStructure');

const subscribeStructureStub = require('./pusModelEditorMessages/subscribeStructure.stub');
const subscribeStructureAdapter = require('./pusModelEditorMessages/subscribeStructure');
const subscribeStructureBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/SubscribeStructure.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.SubscribeStructure');

const synchoniseStructureStub = require('./pusModelEditorMessages/synchoniseStructure.stub');
const synchoniseStructureAdapter = require('./pusModelEditorMessages/synchoniseStructure');
const synchoniseStructureBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/SynchoniseStructure.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.SynchoniseStructure');

const unsubscribeStructureStub = require('./pusModelEditorMessages/unsubscribeStructure.stub');
const unsubscribeStructureAdapter = require('./pusModelEditorMessages/unsubscribeStructure');
const unsubscribeStructureBuilder = new ProtoBuf.Root().loadSync(`${__dirname}/pusModelEditorMessages/UnsubscribeStructure.proto`, { keepCase: true }).lookup('pusModelEditorMessages.protobuf.UnsubscribeStructure');
module.exports = {
  getAck: ackStub,
  getAckDeProtobuf: proto => ackAdapter.decode(ackBuilder.decode(proto)),
  getAckProtobuf: override => ackBuilder.encode(ackAdapter.encode(ackStub(override))).finish(),
  getAckRequest: ackRequestStub,
  getAckRequestDeProtobuf: proto => ackRequestAdapter.decode(ackRequestBuilder.decode(proto)),
  getAckRequestProtobuf: override => ackRequestBuilder.encode(ackRequestAdapter.encode(ackRequestStub(override))).finish(),
  getAckSMS: ackSMSStub,
  getAction: actionStub,
  getActionDeProtobuf: proto => actionAdapter.decode(actionBuilder.decode(proto)),
  getActionProtobuf: override => actionBuilder.encode(actionAdapter.encode(actionStub(override))).finish(),
  getArchiveDetails: archiveDetailsStub,
  getArchiveQuery: archiveQueryStub,
  getAttributeValue: attributeValueStub,
  getAttributeValueDeProtobuf: proto => attributeValueAdapter.decode(attributeValueBuilder.decode(proto)),
  getAttributeValueProtobuf: override => attributeValueBuilder.encode(attributeValueAdapter.encode(attributeValueStub(override))).finish(),
  getBinaryData: binaryDataStub,
  getBinaryDataDeProtobuf: proto => binaryDataAdapter.decode(binaryDataBuilder.decode(proto)),
  getBinaryDataProtobuf: override => binaryDataBuilder.encode(binaryDataAdapter.encode(binaryDataStub(override))).finish(),
  getBreakPoint: breakPointStub,
  getBriefcase: briefcaseStub,
  getBriefcaseContent: briefcaseContentStub,
  getBriefcaseContentDeProtobuf: proto => briefcaseContentAdapter.decode(briefcaseContentBuilder.decode(proto)),
  getBriefcaseContentProtobuf: override => briefcaseContentBuilder.encode(briefcaseContentAdapter.encode(briefcaseContentStub(override))).finish(),
  getBriefcaseDeProtobuf: proto => briefcaseAdapter.decode(briefcaseBuilder.decode(proto)),
  getBriefcaseProtobuf: override => briefcaseBuilder.encode(briefcaseAdapter.encode(briefcaseStub(override))).finish(),
  getCOP1Context: cOP1ContextStub,
  getCOP1ContextDeProtobuf: proto => cOP1ContextAdapter.decode(cOP1ContextBuilder.decode(proto)),
  getCOP1ContextProtobuf: override => cOP1ContextBuilder.encode(cOP1ContextAdapter.encode(cOP1ContextStub(override))).finish(),
  getCOP1Directive: cOP1DirectiveStub,
  getCOP1DirectiveDeProtobuf: proto => cOP1DirectiveAdapter.decode(cOP1DirectiveBuilder.decode(proto)),
  getCOP1DirectiveProtobuf: override => cOP1DirectiveBuilder.encode(cOP1DirectiveAdapter.encode(cOP1DirectiveStub(override))).finish(),
  getCOP1IfAutoState: cOP1IfAutoStateStub,
  getCOP1IfAutoStateDeProtobuf: proto => cOP1IfAutoStateAdapter.decode(cOP1IfAutoStateBuilder.decode(proto)),
  getCOP1IfAutoStateProtobuf: override => cOP1IfAutoStateBuilder.encode(cOP1IfAutoStateAdapter.encode(cOP1IfAutoStateStub(override))).finish(),
  getCOP1InternalState: cOP1InternalStateStub,
  getCOP1InternalStateDeProtobuf: proto => cOP1InternalStateAdapter.decode(cOP1InternalStateBuilder.decode(proto)),
  getCOP1InternalStateProtobuf: override => cOP1InternalStateBuilder.encode(cOP1InternalStateAdapter.encode(cOP1InternalStateStub(override))).finish(),
  getCOP1SentQueue: cOP1SentQueueStub,
  getCOP1SentQueueDeProtobuf: proto => cOP1SentQueueAdapter.decode(cOP1SentQueueBuilder.decode(proto)),
  getCOP1SentQueueProtobuf: override => cOP1SentQueueBuilder.encode(cOP1SentQueueAdapter.encode(cOP1SentQueueStub(override))).finish(),
  getCOP1Status: cOP1StatusStub,
  getCOP1StatusDeProtobuf: proto => cOP1StatusAdapter.decode(cOP1StatusBuilder.decode(proto)),
  getCOP1StatusProtobuf: override => cOP1StatusBuilder.encode(cOP1StatusAdapter.encode(cOP1StatusStub(override))).finish(),
  getCOP1WaitQueue: cOP1WaitQueueStub,
  getCOP1WaitQueueDeProtobuf: proto => cOP1WaitQueueAdapter.decode(cOP1WaitQueueBuilder.decode(proto)),
  getCOP1WaitQueueProtobuf: override => cOP1WaitQueueBuilder.encode(cOP1WaitQueueAdapter.encode(cOP1WaitQueueStub(override))).finish(),
  getCUFullStatus: cUFullStatusStub,
  getCUFullStatusDeProtobuf: proto => cUFullStatusAdapter.decode(cUFullStatusBuilder.decode(proto)),
  getCUFullStatusProtobuf: override => cUFullStatusBuilder.encode(cUFullStatusAdapter.encode(cUFullStatusStub(override))).finish(),
  getCUIdentifier: cUIdentifierStub,
  getCUIdentifierDeProtobuf: proto => cUIdentifierAdapter.decode(cUIdentifierBuilder.decode(proto)),
  getCUIdentifierProtobuf: override => cUIdentifierBuilder.encode(cUIdentifierAdapter.encode(cUIdentifierStub(override))).finish(),
  getCUInfo: cUInfoStub,
  getCUInfoDeProtobuf: proto => cUInfoAdapter.decode(cUInfoBuilder.decode(proto)),
  getCUInfoProtobuf: override => cUInfoBuilder.encode(cUInfoAdapter.encode(cUInfoStub(override))).finish(),
  getCUOperationDefinition: cUOperationDefinitionStub,
  getCUOperationDefinitionDeProtobuf: proto => cUOperationDefinitionAdapter.decode(cUOperationDefinitionBuilder.decode(proto)),
  getCUOperationDefinitionProtobuf: override => cUOperationDefinitionBuilder.encode(cUOperationDefinitionAdapter.encode(cUOperationDefinitionStub(override))).finish(),
  getCUStatus: cUStatusStub,
  getCUStatusDeProtobuf: proto => cUStatusAdapter.decode(cUStatusBuilder.decode(proto)),
  getCUStatusProtobuf: override => cUStatusBuilder.encode(cUStatusAdapter.encode(cUStatusStub(override))).finish(),
  getClcwPacket: clcwPacketStub,
  getClcwPacketDeProtobuf: proto => clcwPacketAdapter.decode(clcwPacketBuilder.decode(proto)),
  getClcwPacketProtobuf: override => clcwPacketBuilder.encode(clcwPacketAdapter.encode(clcwPacketStub(override))).finish(),
  getClcwSegmentMask: clcwSegmentMaskStub,
  getClcwSegmentMaskDeProtobuf: proto => clcwSegmentMaskAdapter.decode(clcwSegmentMaskBuilder.decode(proto)),
  getClcwSegmentMaskProtobuf: override => clcwSegmentMaskBuilder.encode(clcwSegmentMaskAdapter.encode(clcwSegmentMaskStub(override))).finish(),
  getCodedExecutionStrategy: codedExecutionStrategyStub,
  getCollection: collectionStub,
  getCollectionDeProtobuf: proto => collectionAdapter.decode(collectionBuilder.decode(proto)),
  getCollectionDocument: collectionDocumentStub,
  getCollectionDocumentDeProtobuf: proto => collectionDocumentAdapter.decode(collectionDocumentBuilder.decode(proto)),
  getCollectionDocumentProtobuf: override => collectionDocumentBuilder.encode(collectionDocumentAdapter.encode(collectionDocumentStub(override))).finish(),
  getCollectionProtobuf: override => collectionBuilder.encode(collectionAdapter.encode(collectionStub(override))).finish(),
  getCollectionVirtualFolder: collectionVirtualFolderStub,
  getCollectionVirtualFolderDeProtobuf: proto => collectionVirtualFolderAdapter.decode(collectionVirtualFolderBuilder.decode(proto)),
  getCollectionVirtualFolderProtobuf: override => collectionVirtualFolderBuilder.encode(collectionVirtualFolderAdapter.encode(collectionVirtualFolderStub(override))).finish(),
  getCompositeFilter: compositeFilterStub,
  getCompositeFilterDeProtobuf: proto => compositeFilterAdapter.decode(compositeFilterBuilder.decode(proto)),
  getCompositeFilterProtobuf: override => compositeFilterBuilder.encode(compositeFilterAdapter.encode(compositeFilterStub(override))).finish(),
  getCompositeFilterSet: compositeFilterSetStub,
  getCompositeFilterSetDeProtobuf: proto => compositeFilterSetAdapter.decode(compositeFilterSetBuilder.decode(proto)),
  getCompositeFilterSetProtobuf: override => compositeFilterSetBuilder.encode(compositeFilterSetAdapter.encode(compositeFilterSetStub(override))).finish(),
  getComputedEvent: computedEventStub,
  getComputedEventDeProtobuf: proto => computedEventAdapter.decode(computedEventBuilder.decode(proto)),
  getComputedEventProtobuf: override => computedEventBuilder.encode(computedEventAdapter.encode(computedEventStub(override))).finish(),
  getContainer: containerStub,
  getDecommutedPacket: decommutedPacketStub,
  getDecommutedPacketDeProtobuf: proto => decommutedPacketAdapter.decode(decommutedPacketBuilder.decode(proto)),
  getDecommutedPacketProtobuf: override => decommutedPacketBuilder.encode(decommutedPacketAdapter.encode(decommutedPacketStub(override))).finish(),
  getDecommutedParameter: decommutedParameterStub,
  getDecommutedParameterDeProtobuf: proto => decommutedParameterAdapter.decode(decommutedParameterBuilder.decode(proto)),
  getDecommutedParameterProtobuf: override => decommutedParameterBuilder.encode(decommutedParameterAdapter.encode(decommutedParameterStub(override))).finish(),
  getDecommutedValue: decommutedValueStub,
  getDecommutedValueDeProtobuf: proto => decommutedValueAdapter.decode(decommutedValueBuilder.decode(proto)),
  getDecommutedValueProtobuf: override => decommutedValueBuilder.encode(decommutedValueAdapter.encode(decommutedValueStub(override))).finish(),
  getDocVersion: docVersionStub,
  getDocVersionDeProtobuf: proto => docVersionAdapter.decode(docVersionBuilder.decode(proto)),
  getDocVersionProtobuf: override => docVersionBuilder.encode(docVersionAdapter.encode(docVersionStub(override))).finish(),
  getDocument: documentStub,
  getDocumentDeProtobuf: proto => documentAdapter.decode(documentBuilder.decode(proto)),
  getDocumentProtobuf: override => documentBuilder.encode(documentAdapter.encode(documentStub(override))).finish(),
  getDocumentValue: documentValueStub,
  getDocumentValueDeProtobuf: proto => documentValueAdapter.decode(documentValueBuilder.decode(proto)),
  getDocumentValueProtobuf: override => documentValueBuilder.encode(documentValueAdapter.encode(documentValueStub(override))).finish(),
  getEncodeArgumentRequest: encodeArgumentRequestStub,
  getEncodeArgumentRequestDeProtobuf: proto => encodeArgumentRequestAdapter.decode(encodeArgumentRequestBuilder.decode(proto)),
  getEncodeArgumentRequestProtobuf: override => encodeArgumentRequestBuilder.encode(encodeArgumentRequestAdapter.encode(encodeArgumentRequestStub(override))).finish(),
  getEncodeInvocation: encodeInvocationStub,
  getEncodeInvocationDeProtobuf: proto => encodeInvocationAdapter.decode(encodeInvocationBuilder.decode(proto)),
  getEncodeInvocationProtobuf: override => encodeInvocationBuilder.encode(encodeInvocationAdapter.encode(encodeInvocationStub(override))).finish(),
  getEncodeLargeTCInvocation: encodeLargeTCInvocationStub,
  getEncodeLargeTCInvocationDeProtobuf: proto => encodeLargeTCInvocationAdapter.decode(encodeLargeTCInvocationBuilder.decode(proto)),
  getEncodeLargeTCInvocationProtobuf: override => encodeLargeTCInvocationBuilder.encode(encodeLargeTCInvocationAdapter.encode(encodeLargeTCInvocationStub(override))).finish(),
  getEncodeResponse: encodeResponseStub,
  getEncodeResponseDeProtobuf: proto => encodeResponseAdapter.decode(encodeResponseBuilder.decode(proto)),
  getEncodeResponseProtobuf: override => encodeResponseBuilder.encode(encodeResponseAdapter.encode(encodeResponseStub(override))).finish(),
  getEncodedValue: encodedValueStub,
  getEncodedValueDeProtobuf: proto => encodedValueAdapter.decode(encodedValueBuilder.decode(proto)),
  getEncodedValueProtobuf: override => encodedValueBuilder.encode(encodedValueAdapter.encode(encodedValueStub(override))).finish(),
  getEncodedValuesList: encodedValuesListStub,
  getEncodedValuesListDeProtobuf: proto => encodedValuesListAdapter.decode(encodedValuesListBuilder.decode(proto)),
  getEncodedValuesListProtobuf: override => encodedValuesListBuilder.encode(encodedValuesListAdapter.encode(encodedValuesListStub(override))).finish(),
  getEncodingAction: encodingActionStub,
  getEncodingActionDeProtobuf: proto => encodingActionAdapter.decode(encodingActionBuilder.decode(proto)),
  getEncodingActionProtobuf: override => encodingActionBuilder.encode(encodingActionAdapter.encode(encodingActionStub(override))).finish(),
  getEncryptResponse: encryptResponseStub,
  getEncryptResponseDeProtobuf: proto => encryptResponseAdapter.decode(encryptResponseBuilder.decode(proto)),
  getEncryptResponseProtobuf: override => encryptResponseBuilder.encode(encryptResponseAdapter.encode(encryptResponseStub(override))).finish(),
  getEvent: eventStub,
  getEventDeProtobuf: proto => eventAdapter.decode(eventBuilder.decode(proto)),
  getEventDefinition: eventDefinitionStub,
  getEventDefinitionDeProtobuf: proto => eventDefinitionAdapter.decode(eventDefinitionBuilder.decode(proto)),
  getEventDefinitionProtobuf: override => eventDefinitionBuilder.encode(eventDefinitionAdapter.encode(eventDefinitionStub(override))).finish(),
  getEventProtobuf: override => eventBuilder.encode(eventAdapter.encode(eventStub(override))).finish(),
  getExecution: executionStub,
  getExecutionDeProtobuf: proto => executionAdapter.decode(executionBuilder.decode(proto)),
  getExecutionProtobuf: override => executionBuilder.encode(executionAdapter.encode(executionStub(override))).finish(),
  getExecutionStatus: executionStatusStub,
  getExpectedAck: expectedAckStub,
  getExpectedAckDeProtobuf: proto => expectedAckAdapter.decode(expectedAckBuilder.decode(proto)),
  getExpectedAckProtobuf: override => expectedAckBuilder.encode(expectedAckAdapter.encode(expectedAckStub(override))).finish(),
  getExternalEvent: externalEventStub,
  getExternalEventDeProtobuf: proto => externalEventAdapter.decode(externalEventBuilder.decode(proto)),
  getExternalEventProtobuf: override => externalEventBuilder.encode(externalEventAdapter.encode(externalEventStub(override))).finish(),
  getFlagVal: flagValStub,
  getFlagValDeProtobuf: proto => flagValAdapter.decode(flagValBuilder.decode(proto)),
  getFlagValProtobuf: override => flagValBuilder.encode(flagValAdapter.encode(flagValStub(override))).finish(),
  getFlowConfiguration: flowConfigurationStub,
  getFlowConfigurationDeProtobuf: proto => flowConfigurationAdapter.decode(flowConfigurationBuilder.decode(proto)),
  getFlowConfigurationProtobuf: override => flowConfigurationBuilder.encode(flowConfigurationAdapter.encode(flowConfigurationStub(override))).finish(),
  getFlowElmt: flowElmtStub,
  getFlowElmtDeProtobuf: proto => flowElmtAdapter.decode(flowElmtBuilder.decode(proto)),
  getFlowElmtProtobuf: override => flowElmtBuilder.encode(flowElmtAdapter.encode(flowElmtStub(override))).finish(),
  getFlowFullStatus: flowFullStatusStub,
  getFlowFullStatusDeProtobuf: proto => flowFullStatusAdapter.decode(flowFullStatusBuilder.decode(proto)),
  getFlowFullStatusProtobuf: override => flowFullStatusBuilder.encode(flowFullStatusAdapter.encode(flowFullStatusStub(override))).finish(),
  getFlowIdentifier: flowIdentifierStub,
  getFlowIdentifierDeProtobuf: proto => flowIdentifierAdapter.decode(flowIdentifierBuilder.decode(proto)),
  getFlowIdentifierProtobuf: override => flowIdentifierBuilder.encode(flowIdentifierAdapter.encode(flowIdentifierStub(override))).finish(),
  getFlowInfo: flowInfoStub,
  getFlowInfoDeProtobuf: proto => flowInfoAdapter.decode(flowInfoBuilder.decode(proto)),
  getFlowInfoProtobuf: override => flowInfoBuilder.encode(flowInfoAdapter.encode(flowInfoStub(override))).finish(),
  getFlowList: flowListStub,
  getFlowListDeProtobuf: proto => flowListAdapter.decode(flowListBuilder.decode(proto)),
  getFlowListProtobuf: override => flowListBuilder.encode(flowListAdapter.encode(flowListStub(override))).finish(),
  getFlowSmallStatus: flowSmallStatusStub,
  getFlowSmallStatusDeProtobuf: proto => flowSmallStatusAdapter.decode(flowSmallStatusBuilder.decode(proto)),
  getFlowSmallStatusProtobuf: override => flowSmallStatusBuilder.encode(flowSmallStatusAdapter.encode(flowSmallStatusStub(override))).finish(),
  getFlowStatus: flowStatusStub,
  getFlowStatusDeProtobuf: proto => flowStatusAdapter.decode(flowStatusBuilder.decode(proto)),
  getFlowStatusProtobuf: override => flowStatusBuilder.encode(flowStatusAdapter.encode(flowStatusStub(override))).finish(),
  getFolder: folderStub,
  getFolderDeProtobuf: proto => folderAdapter.decode(folderBuilder.decode(proto)),
  getFolderProtobuf: override => folderBuilder.encode(folderAdapter.encode(folderStub(override))).finish(),
  getFunctionalChain: functionalChainStub,
  getFunctionalChainDeProtobuf: proto => functionalChainAdapter.decode(functionalChainBuilder.decode(proto)),
  getFunctionalChainProtobuf: override => functionalChainBuilder.encode(functionalChainAdapter.encode(functionalChainStub(override))).finish(),
  getGPMCC1State: gPMCC1StateStub,
  getGPMCC1StateDeProtobuf: proto => gPMCC1StateAdapter.decode(gPMCC1StateBuilder.decode(proto)),
  getGPMCC1StateProtobuf: override => gPMCC1StateBuilder.encode(gPMCC1StateAdapter.encode(gPMCC1StateStub(override))).finish(),
  getGenericOperation: genericOperationStub,
  getGenericOperationDeProtobuf: proto => genericOperationAdapter.decode(genericOperationBuilder.decode(proto)),
  getGenericOperationProtobuf: override => genericOperationBuilder.encode(genericOperationAdapter.encode(genericOperationStub(override))).finish(),
  getGenericTC: genericTCStub,
  getGenericTCDeProtobuf: proto => genericTCAdapter.decode(genericTCBuilder.decode(proto)),
  getGenericTCProtobuf: override => genericTCBuilder.encode(genericTCAdapter.encode(genericTCStub(override))).finish(),
  getGroundMonitoringAlarm: groundMonitoringAlarmStub,
  getGroundMonitoringAlarmDeProtobuf: proto => groundMonitoringAlarmAdapter.decode(groundMonitoringAlarmBuilder.decode(proto)),
  getGroundMonitoringAlarmProtobuf: override => groundMonitoringAlarmBuilder.encode(groundMonitoringAlarmAdapter.encode(groundMonitoringAlarmStub(override))).finish(),
  getGroupDefinition: groupDefinitionStub,
  getGroupDefinitionDeProtobuf: proto => groupDefinitionAdapter.decode(groupDefinitionBuilder.decode(proto)),
  getGroupDefinitionProtobuf: override => groupDefinitionBuilder.encode(groupDefinitionAdapter.encode(groupDefinitionStub(override))).finish(),
  getGroupOfOperation: groupOfOperationStub,
  getGroupOfOperationDeProtobuf: proto => groupOfOperationAdapter.decode(groupOfOperationBuilder.decode(proto)),
  getGroupOfOperationProtobuf: override => groupOfOperationBuilder.encode(groupOfOperationAdapter.encode(groupOfOperationStub(override))).finish(),
  getIfQueueElement: ifQueueElementStub,
  getIfQueueElementDeProtobuf: proto => ifQueueElementAdapter.decode(ifQueueElementBuilder.decode(proto)),
  getIfQueueElementProtobuf: override => ifQueueElementBuilder.encode(ifQueueElementAdapter.encode(ifQueueElementStub(override))).finish(),
  getIfQueueUnit: ifQueueUnitStub,
  getIfQueueUnitDeProtobuf: proto => ifQueueUnitAdapter.decode(ifQueueUnitBuilder.decode(proto)),
  getIfQueueUnitProtobuf: override => ifQueueUnitBuilder.encode(ifQueueUnitAdapter.encode(ifQueueUnitStub(override))).finish(),
  getIndexedValue: indexedValueStub,
  getIndexedValueDeProtobuf: proto => indexedValueAdapter.decode(indexedValueBuilder.decode(proto)),
  getIndexedValueProtobuf: override => indexedValueBuilder.encode(indexedValueAdapter.encode(indexedValueStub(override))).finish(),
  getInitFlowConfiguration: initFlowConfigurationStub,
  getInitFlowConfigurationDeProtobuf: proto => initFlowConfigurationAdapter.decode(initFlowConfigurationBuilder.decode(proto)),
  getInitFlowConfigurationProtobuf: override => initFlowConfigurationBuilder.encode(initFlowConfigurationAdapter.encode(initFlowConfigurationStub(override))).finish(),
  getInitStationConfiguration: initStationConfigurationStub,
  getInitStationConfigurationDeProtobuf: proto => initStationConfigurationAdapter.decode(initStationConfigurationBuilder.decode(proto)),
  getInitStationConfigurationProtobuf: override => initStationConfigurationBuilder.encode(initStationConfigurationAdapter.encode(initStationConfigurationStub(override))).finish(),
  getInstanceBooleanPair: instanceBooleanPairStub,
  getIsisAggregation: isisAggregationStub,
  getIsisAggregationDeProtobuf: proto => isisAggregationAdapter.decode(isisAggregationBuilder.decode(proto)),
  getIsisAggregationProtobuf: override => isisAggregationBuilder.encode(isisAggregationAdapter.encode(isisAggregationStub(override))).finish(),
  getIsisFilterSet: isisFilterSetStub,
  getIsisFilterSetDeProtobuf: proto => isisFilterSetAdapter.decode(isisFilterSetBuilder.decode(proto)),
  getIsisFilterSetProtobuf: override => isisFilterSetBuilder.encode(isisFilterSetAdapter.encode(isisFilterSetStub(override))).finish(),
  getLifeCycle: lifeCycleStub,
  getLifeCycleDeProtobuf: proto => lifeCycleAdapter.decode(lifeCycleBuilder.decode(proto)),
  getLifeCycleProtobuf: override => lifeCycleBuilder.encode(lifeCycleAdapter.encode(lifeCycleStub(override))).finish(),
  getLifeCycleStatus: lifeCycleStatusStub,
  getLocation: locationStub,
  getLocationDeProtobuf: proto => locationAdapter.decode(locationBuilder.decode(proto)),
  getLocationProtobuf: override => locationBuilder.encode(locationAdapter.encode(locationStub(override))).finish(),
  getLog: logStub,
  getLogbookEvent: logbookEventStub,
  getLogbookEventDeProtobuf: proto => logbookEventAdapter.decode(logbookEventBuilder.decode(proto)),
  getLogbookEventProtobuf: override => logbookEventBuilder.encode(logbookEventAdapter.encode(logbookEventStub(override))).finish(),
  getMAP: mAPStub,
  getMAPData: mAPDataStub,
  getMAPDataDeProtobuf: proto => mAPDataAdapter.decode(mAPDataBuilder.decode(proto)),
  getMAPDataProtobuf: override => mAPDataBuilder.encode(mAPDataAdapter.encode(mAPDataStub(override))).finish(),
  getMAPDeProtobuf: proto => mAPAdapter.decode(mAPBuilder.decode(proto)),
  getMAPProtobuf: override => mAPBuilder.encode(mAPAdapter.encode(mAPStub(override))).finish(),
  getMemoryImage: memoryImageStub,
  getMemoryImageDeProtobuf: proto => memoryImageAdapter.decode(memoryImageBuilder.decode(proto)),
  getMemoryImageProtobuf: override => memoryImageBuilder.encode(memoryImageAdapter.encode(memoryImageStub(override))).finish(),
  getNamedValue: namedValueStub,
  getNamedValueDeProtobuf: proto => namedValueAdapter.decode(namedValueBuilder.decode(proto)),
  getNamedValueProtobuf: override => namedValueBuilder.encode(namedValueAdapter.encode(namedValueStub(override))).finish(),
  getNominalStation: nominalStationStub,
  getNominalStationDeProtobuf: proto => nominalStationAdapter.decode(nominalStationBuilder.decode(proto)),
  getNominalStationProtobuf: override => nominalStationBuilder.encode(nominalStationAdapter.encode(nominalStationStub(override))).finish(),
  getObjectDetails: objectDetailsStub,
  getObjectId: objectIdStub,
  getObjectKey: objectKeyStub,
  getObjectType: objectTypeStub,
  getOpAlert: opAlertStub,
  getOpAlertClosingData: opAlertClosingDataStub,
  getOpAlertClosingDataDeProtobuf: proto => opAlertClosingDataAdapter.decode(opAlertClosingDataBuilder.decode(proto)),
  getOpAlertClosingDataProtobuf: override => opAlertClosingDataBuilder.encode(opAlertClosingDataAdapter.encode(opAlertClosingDataStub(override))).finish(),
  getOpAlertConfiguration: opAlertConfigurationStub,
  getOpAlertConfigurationDeProtobuf: proto => opAlertConfigurationAdapter.decode(opAlertConfigurationBuilder.decode(proto)),
  getOpAlertConfigurationProtobuf: override => opAlertConfigurationBuilder.encode(opAlertConfigurationAdapter.encode(opAlertConfigurationStub(override))).finish(),
  getOpAlertDeProtobuf: proto => opAlertAdapter.decode(opAlertBuilder.decode(proto)),
  getOpAlertProtobuf: override => opAlertBuilder.encode(opAlertAdapter.encode(opAlertStub(override))).finish(),
  getOperation: operationStub,
  getOperationDeProtobuf: proto => operationAdapter.decode(operationBuilder.decode(proto)),
  getOperationDefinition: operationDefinitionStub,
  getOperationDefinitionDeProtobuf: proto => operationDefinitionAdapter.decode(operationDefinitionBuilder.decode(proto)),
  getOperationDefinitionProtobuf: override => operationDefinitionBuilder.encode(operationDefinitionAdapter.encode(operationDefinitionStub(override))).finish(),
  getOperationParameter: operationParameterStub,
  getOperationParameterDeProtobuf: proto => operationParameterAdapter.decode(operationParameterBuilder.decode(proto)),
  getOperationParameterProtobuf: override => operationParameterBuilder.encode(operationParameterAdapter.encode(operationParameterStub(override))).finish(),
  getOperationProtobuf: override => operationBuilder.encode(operationAdapter.encode(operationStub(override))).finish(),
  getPacket: packetStub,
  getPacketDeProtobuf: proto => packetAdapter.decode(packetBuilder.decode(proto)),
  getPacketProtobuf: override => packetBuilder.encode(packetAdapter.encode(packetStub(override))).finish(),
  getParameter: parameterStub,
  getParameterDeProtobuf: proto => parameterAdapter.decode(parameterBuilder.decode(proto)),
  getParameterProtobuf: override => parameterBuilder.encode(parameterAdapter.encode(parameterStub(override))).finish(),
  getParameterValue: parameterValueStub,
  getParameterValueDeProtobuf: proto => parameterValueAdapter.decode(parameterValueBuilder.decode(proto)),
  getParameterValueProtobuf: override => parameterValueBuilder.encode(parameterValueAdapter.encode(parameterValueStub(override))).finish(),
  getProccessedTC: proccessedTCStub,
  getProccessedTCDeProtobuf: proto => proccessedTCAdapter.decode(proccessedTCBuilder.decode(proto)),
  getProccessedTCProtobuf: override => proccessedTCBuilder.encode(proccessedTCAdapter.encode(proccessedTCStub(override))).finish(),
  getProcessFullState: processFullStateStub,
  getProcessFullStateDeProtobuf: proto => processFullStateAdapter.decode(processFullStateBuilder.decode(proto)),
  getProcessFullStateProtobuf: override => processFullStateBuilder.encode(processFullStateAdapter.encode(processFullStateStub(override))).finish(),
  getProcessIdentifier: processIdentifierStub,
  getProcessIdentifierDeProtobuf: proto => processIdentifierAdapter.decode(processIdentifierBuilder.decode(proto)),
  getProcessIdentifierProtobuf: override => processIdentifierBuilder.encode(processIdentifierAdapter.encode(processIdentifierStub(override))).finish(),
  getProcessInfo: processInfoStub,
  getProcessInfoDeProtobuf: proto => processInfoAdapter.decode(processInfoBuilder.decode(proto)),
  getProcessInfoProtobuf: override => processInfoBuilder.encode(processInfoAdapter.encode(processInfoStub(override))).finish(),
  getProvider: providerStub,
  getProviderDefinition: providerDefinitionStub,
  getRawData: rawDataStub,
  getRawDataDeProtobuf: proto => rawDataAdapter.decode(rawDataBuilder.decode(proto)),
  getRawDataProtobuf: override => rawDataBuilder.encode(rawDataAdapter.encode(rawDataStub(override))).finish(),
  getReportingParameter: reportingParameterStub,
  getReportingParameterDeProtobuf: proto => reportingParameterAdapter.decode(reportingParameterBuilder.decode(proto)),
  getReportingParameterProtobuf: override => reportingParameterBuilder.encode(reportingParameterAdapter.encode(reportingParameterStub(override))).finish(),
  getResult: resultStub,
  getResultDeProtobuf: proto => resultAdapter.decode(resultBuilder.decode(proto)),
  getResultProtobuf: override => resultBuilder.encode(resultAdapter.encode(resultStub(override))).finish(),
  getRmPacket: rmPacketStub,
  getRmPacketDeProtobuf: proto => rmPacketAdapter.decode(rmPacketBuilder.decode(proto)),
  getRmPacketProtobuf: override => rmPacketBuilder.encode(rmPacketAdapter.encode(rmPacketStub(override))).finish(),
  getSentQueueElement: sentQueueElementStub,
  getSentQueueElementDeProtobuf: proto => sentQueueElementAdapter.decode(sentQueueElementBuilder.decode(proto)),
  getSentQueueElementProtobuf: override => sentQueueElementBuilder.encode(sentQueueElementAdapter.encode(sentQueueElementStub(override))).finish(),
  getSerializableFunctionInfo: serializableFunctionInfoStub,
  getSerializableSessionInfo: serializableSessionInfoStub,
  getServiceAddress: serviceAddressStub,
  getServiceFilter: serviceFilterStub,
  getSession: sessionStub,
  getSessionDeProtobuf: proto => sessionAdapter.decode(sessionBuilder.decode(proto)),
  getSessionProtobuf: override => sessionBuilder.encode(sessionAdapter.encode(sessionStub(override))).finish(),
  getSpecificAttributeDefinition: specificAttributeDefinitionStub,
  getSpecificAttributeDefinitionDeProtobuf: proto => specificAttributeDefinitionAdapter.decode(specificAttributeDefinitionBuilder.decode(proto)),
  getSpecificAttributeDefinitionProtobuf: override => specificAttributeDefinitionBuilder.encode(specificAttributeDefinitionAdapter.encode(specificAttributeDefinitionStub(override))).finish(),
  getStatAggregation: statAggregationStub,
  getStatAggregationDeProtobuf: proto => statAggregationAdapter.decode(statAggregationBuilder.decode(proto)),
  getStatAggregationProtobuf: override => statAggregationBuilder.encode(statAggregationAdapter.encode(statAggregationStub(override))).finish(),
  getStatValue: statValueStub,
  getStatValueDeProtobuf: proto => statValueAdapter.decode(statValueBuilder.decode(proto)),
  getStatValueProtobuf: override => statValueBuilder.encode(statValueAdapter.encode(statValueStub(override))).finish(),
  getStationElmt: stationElmtStub,
  getStationElmtDeProtobuf: proto => stationElmtAdapter.decode(stationElmtBuilder.decode(proto)),
  getStationElmtProtobuf: override => stationElmtBuilder.encode(stationElmtAdapter.encode(stationElmtStub(override))).finish(),
  getStationFullStatus: stationFullStatusStub,
  getStationFullStatusDeProtobuf: proto => stationFullStatusAdapter.decode(stationFullStatusBuilder.decode(proto)),
  getStationFullStatusProtobuf: override => stationFullStatusBuilder.encode(stationFullStatusAdapter.encode(stationFullStatusStub(override))).finish(),
  getStationIdentifier: stationIdentifierStub,
  getStationIdentifierDeProtobuf: proto => stationIdentifierAdapter.decode(stationIdentifierBuilder.decode(proto)),
  getStationIdentifierProtobuf: override => stationIdentifierBuilder.encode(stationIdentifierAdapter.encode(stationIdentifierStub(override))).finish(),
  getStationList: stationListStub,
  getStationListDeProtobuf: proto => stationListAdapter.decode(stationListBuilder.decode(proto)),
  getStationListProtobuf: override => stationListBuilder.encode(stationListAdapter.encode(stationListStub(override))).finish(),
  getStationStatus: stationStatusStub,
  getStationStatusDeProtobuf: proto => stationStatusAdapter.decode(stationStatusBuilder.decode(proto)),
  getStationStatusProtobuf: override => stationStatusBuilder.encode(stationStatusAdapter.encode(stationStatusStub(override))).finish(),
  getStatisticFunctionDetails: statisticFunctionDetailsStub,
  getStatisticFunctionDetailsDeProtobuf: proto => statisticFunctionDetailsAdapter.decode(statisticFunctionDetailsBuilder.decode(proto)),
  getStatisticFunctionDetailsProtobuf: override => statisticFunctionDetailsBuilder.encode(statisticFunctionDetailsAdapter.encode(statisticFunctionDetailsStub(override))).finish(),
  getStatisticFunctionDetailsStruct: statisticFunctionDetailsStructStub,
  getStatisticFunctionDetailsStructDeProtobuf: proto => statisticFunctionDetailsStructAdapter.decode(statisticFunctionDetailsStructBuilder.decode(proto)),
  getStatisticFunctionDetailsStructProtobuf: override => statisticFunctionDetailsStructBuilder.encode(statisticFunctionDetailsStructAdapter.encode(statisticFunctionDetailsStructStub(override))).finish(),
  getStatisticFunctionValue: statisticFunctionValueStub,
  getStatisticFunctionValueDeProtobuf: proto => statisticFunctionValueAdapter.decode(statisticFunctionValueBuilder.decode(proto)),
  getStatisticFunctionValueProtobuf: override => statisticFunctionValueBuilder.encode(statisticFunctionValueAdapter.encode(statisticFunctionValueStub(override))).finish(),
  getStatisticLink: statisticLinkStub,
  getStatisticLinkStruct: statisticLinkStructStub,
  getStatisticParameterReport: statisticParameterReportStub,
  getStatisticParameterReportDeProtobuf: proto => statisticParameterReportAdapter.decode(statisticParameterReportBuilder.decode(proto)),
  getStatisticParameterReportProtobuf: override => statisticParameterReportBuilder.encode(statisticParameterReportAdapter.encode(statisticParameterReportStub(override))).finish(),
  getStatisticValue: statisticValueStub,
  getStatisticValueDeProtobuf: proto => statisticValueAdapter.decode(statisticValueBuilder.decode(proto)),
  getStatisticValueProtobuf: override => statisticValueBuilder.encode(statisticValueAdapter.encode(statisticValueStub(override))).finish(),
  getStatisticValueStruct: statisticValueStructStub,
  getStatisticValueStructDeProtobuf: proto => statisticValueStructAdapter.decode(statisticValueStructBuilder.decode(proto)),
  getStatisticValueStructProtobuf: override => statisticValueStructBuilder.encode(statisticValueStructAdapter.encode(statisticValueStructStub(override))).finish(),
  getStatus: statusStub,
  getStatusDeProtobuf: proto => statusAdapter.decode(statusBuilder.decode(proto)),
  getStatusProtobuf: override => statusBuilder.encode(statusAdapter.encode(statusStub(override))).finish(),
  getSuccessiveAck: successiveAckStub,
  getSuccessiveAckDeProtobuf: proto => successiveAckAdapter.decode(successiveAckBuilder.decode(proto)),
  getSuccessiveAckProtobuf: override => successiveAckBuilder.encode(successiveAckAdapter.encode(successiveAckStub(override))).finish(),
  getTC11: tC11Stub,
  getTC11DeProtobuf: proto => tC11Adapter.decode(tC11Builder.decode(proto)),
  getTC11Protobuf: override => tC11Builder.encode(tC11Adapter.encode(tC11Stub(override))).finish(),
  getTC13: tC13Stub,
  getTC13DeProtobuf: proto => tC13Adapter.decode(tC13Builder.decode(proto)),
  getTC13Protobuf: override => tC13Builder.encode(tC13Adapter.encode(tC13Stub(override))).finish(),
  getTCDetails: tCDetailsStub,
  getTCDetailsDeProtobuf: proto => tCDetailsAdapter.decode(tCDetailsBuilder.decode(proto)),
  getTCDetailsProtobuf: override => tCDetailsBuilder.encode(tCDetailsAdapter.encode(tCDetailsStub(override))).finish(),
  getTCFile: tCFileStub,
  getTCFileDeProtobuf: proto => tCFileAdapter.decode(tCFileBuilder.decode(proto)),
  getTCFileProtobuf: override => tCFileBuilder.encode(tCFileAdapter.encode(tCFileStub(override))).finish(),
  getTCHistory: tCHistoryStub,
  getTCHistoryDeProtobuf: proto => tCHistoryAdapter.decode(tCHistoryBuilder.decode(proto)),
  getTCHistoryProtobuf: override => tCHistoryBuilder.encode(tCHistoryAdapter.encode(tCHistoryStub(override))).finish(),
  getTCImmediate: tCImmediateStub,
  getTCImmediateDeProtobuf: proto => tCImmediateAdapter.decode(tCImmediateBuilder.decode(proto)),
  getTCImmediateProtobuf: override => tCImmediateBuilder.encode(tCImmediateAdapter.encode(tCImmediateStub(override))).finish(),
  getTCLong: tCLongStub,
  getTCLongDeProtobuf: proto => tCLongAdapter.decode(tCLongBuilder.decode(proto)),
  getTCLongProtobuf: override => tCLongBuilder.encode(tCLongAdapter.encode(tCLongStub(override))).finish(),
  getTCPhysicalParameter: tCPhysicalParameterStub,
  getTCPhysicalParameterDeProtobuf: proto => tCPhysicalParameterAdapter.decode(tCPhysicalParameterBuilder.decode(proto)),
  getTCPhysicalParameterProtobuf: override => tCPhysicalParameterBuilder.encode(tCPhysicalParameterAdapter.encode(tCPhysicalParameterStub(override))).finish(),
  getTimeBasedDataBoolean: timeBasedDataBooleanStub,
  getTimeBasedDataByte: timeBasedDataByteStub,
  getTimeBasedDataDouble: timeBasedDataDoubleStub,
  getTimeBasedDataDuration: timeBasedDataDurationStub,
  getTimeBasedDataFinetime: timeBasedDataFinetimeStub,
  getTimeBasedDataFloat: timeBasedDataFloatStub,
  getTimeBasedDataIdentifier: timeBasedDataIdentifierStub,
  getTimeBasedDataInteger: timeBasedDataIntegerStub,
  getTimeBasedDataLong: timeBasedDataLongStub,
  getTimeBasedDataShort: timeBasedDataShortStub,
  getTimeBasedDataString: timeBasedDataStringStub,
  getTimeBasedDataTime: timeBasedDataTimeStub,
  getTimeBasedDataUByte: timeBasedDataUByteStub,
  getTimeBasedDataUInteger: timeBasedDataUIntegerStub,
  getTimeBasedDataULong: timeBasedDataULongStub,
  getTimeBasedDataURI: timeBasedDataURIStub,
  getTimeBasedDataUShort: timeBasedDataUShortStub,
  getTimeStructure: timeStructureStub,
  getTimeTaggedTC: timeTaggedTCStub,
  getTimeTaggedTCDeProtobuf: proto => timeTaggedTCAdapter.decode(timeTaggedTCBuilder.decode(proto)),
  getTimeTaggedTCProtobuf: override => timeTaggedTCBuilder.encode(timeTaggedTCAdapter.encode(timeTaggedTCStub(override))).finish(),
  getTimeTaggedTelecommand: timeTaggedTelecommandStub,
  getTimeTaggedTelecommandDeProtobuf: proto => timeTaggedTelecommandAdapter.decode(timeTaggedTelecommandBuilder.decode(proto)),
  getTimeTaggedTelecommandProtobuf: override => timeTaggedTelecommandBuilder.encode(timeTaggedTelecommandAdapter.encode(timeTaggedTelecommandStub(override))).finish(),
  getTmPacket: tmPacketStub,
  getTmPacketDeProtobuf: proto => tmPacketAdapter.decode(tmPacketBuilder.decode(proto)),
  getTmPacketProtobuf: override => tmPacketBuilder.encode(tmPacketAdapter.encode(tmPacketStub(override))).finish(),
  getTransition: transitionStub,
  getTransitionDeProtobuf: proto => transitionAdapter.decode(transitionBuilder.decode(proto)),
  getTransitionProtobuf: override => transitionBuilder.encode(transitionAdapter.encode(transitionStub(override))).finish(),
  getTransportedDocuments: transportedDocumentsStub,
  getTransportedDocumentsDeProtobuf: proto => transportedDocumentsAdapter.decode(transportedDocumentsBuilder.decode(proto)),
  getTransportedDocumentsProtobuf: override => transportedDocumentsBuilder.encode(transportedDocumentsAdapter.encode(transportedDocumentsStub(override))).finish(),
  getTransportedGroundAlarm: transportedGroundAlarmStub,
  getTransportedGroundAlarmDeProtobuf: proto => transportedGroundAlarmAdapter.decode(transportedGroundAlarmBuilder.decode(proto)),
  getTransportedGroundAlarmProtobuf: override => transportedGroundAlarmBuilder.encode(transportedGroundAlarmAdapter.encode(transportedGroundAlarmStub(override))).finish(),
  getUCPParameter: uCPParameterStub,
  getUCPParameterDeProtobuf: proto => uCPParameterAdapter.decode(uCPParameterBuilder.decode(proto)),
  getUCPParameterProtobuf: override => uCPParameterBuilder.encode(uCPParameterAdapter.encode(uCPParameterStub(override))).finish(),
  getUCPReport: uCPReportStub,
  getUCPReportDeProtobuf: proto => uCPReportAdapter.decode(uCPReportBuilder.decode(proto)),
  getUCPReportProtobuf: override => uCPReportBuilder.encode(uCPReportAdapter.encode(uCPReportStub(override))).finish(),
  getUser: userStub,
  getUserContext: userContextStub,
  getUserEvent: userEventStub,
  getUserEventDeProtobuf: proto => userEventAdapter.decode(userEventBuilder.decode(proto)),
  getUserEventProtobuf: override => userEventBuilder.encode(userEventAdapter.encode(userEventStub(override))).finish(),
  getUserRight: userRightStub,
  getUserRightDeProtobuf: proto => userRightAdapter.decode(userRightBuilder.decode(proto)),
  getUserRightProtobuf: override => userRightBuilder.encode(userRightAdapter.encode(userRightStub(override))).finish(),
  getCompareStructure: compareStructureStub,
getCompareStructureDeProtobuf:  proto => compareStructureAdapter.decode(compareStructureBuilder.decode(proto)),
getCompareStructureProtobuf: override => compareStructureBuilder.encode(compareStructureAdapter.encode(compareStructureStub(override))).finish(),
getDataStructure: dataStructureStub,
getDataStructureDeProtobuf:  proto => dataStructureAdapter.decode(dataStructureBuilder.decode(proto)),
getDataStructureProtobuf: override => dataStructureBuilder.encode(dataStructureAdapter.encode(dataStructureStub(override))).finish(),
getHeaderStructure: headerStructureStub,
getHeaderStructureDeProtobuf:  proto => headerStructureAdapter.decode(headerStructureBuilder.decode(proto)),
getHeaderStructureProtobuf: override => headerStructureBuilder.encode(headerStructureAdapter.encode(headerStructureStub(override))).finish(),
getInitialiseStructure: initialiseStructureStub,
getInitialiseStructureDeProtobuf:  proto => initialiseStructureAdapter.decode(initialiseStructureBuilder.decode(proto)),
getInitialiseStructureProtobuf: override => initialiseStructureBuilder.encode(initialiseStructureAdapter.encode(initialiseStructureStub(override))).finish(),
getPus005Model: pus005ModelStub,
getPus005ModelDeProtobuf:  proto => pus005ModelAdapter.decode(pus005ModelBuilder.decode(proto)),
getPus005ModelProtobuf: override => pus005ModelBuilder.encode(pus005ModelAdapter.encode(pus005ModelStub(override))).finish(),
getPus005OnBoardEvent: pus005OnBoardEventStub,
getPus005OnBoardEventDeProtobuf:  proto => pus005OnBoardEventAdapter.decode(pus005OnBoardEventBuilder.decode(proto)),
getPus005OnBoardEventProtobuf: override => pus005OnBoardEventBuilder.encode(pus005OnBoardEventAdapter.encode(pus005OnBoardEventStub(override))).finish(),
getPus011Apid: pus011ApidStub,
getPus011ApidDeProtobuf:  proto => pus011ApidAdapter.decode(pus011ApidBuilder.decode(proto)),
getPus011ApidProtobuf: override => pus011ApidBuilder.encode(pus011ApidAdapter.encode(pus011ApidStub(override))).finish(),
getPus011Command: pus011CommandStub,
getPus011CommandDeProtobuf:  proto => pus011CommandAdapter.decode(pus011CommandBuilder.decode(proto)),
getPus011CommandProtobuf: override => pus011CommandBuilder.encode(pus011CommandAdapter.encode(pus011CommandStub(override))).finish(),
getPus011CommandParameter: pus011CommandParameterStub,
getPus011CommandParameterDeProtobuf:  proto => pus011CommandParameterAdapter.decode(pus011CommandParameterBuilder.decode(proto)),
getPus011CommandParameterProtobuf: override => pus011CommandParameterBuilder.encode(pus011CommandParameterAdapter.encode(pus011CommandParameterStub(override))).finish(),
getPus011Model: pus011ModelStub,
getPus011ModelDeProtobuf:  proto => pus011ModelAdapter.decode(pus011ModelBuilder.decode(proto)),
getPus011ModelProtobuf: override => pus011ModelBuilder.encode(pus011ModelAdapter.encode(pus011ModelStub(override))).finish(),
getPus011SubSchedule: pus011SubScheduleStub,
getPus011SubScheduleDeProtobuf:  proto => pus011SubScheduleAdapter.decode(pus011SubScheduleBuilder.decode(proto)),
getPus011SubScheduleProtobuf: override => pus011SubScheduleBuilder.encode(pus011SubScheduleAdapter.encode(pus011SubScheduleStub(override))).finish(),
getPus011TimeShift: pus011TimeShiftStub,
getPus011TimeShiftDeProtobuf:  proto => pus011TimeShiftAdapter.decode(pus011TimeShiftBuilder.decode(proto)),
getPus011TimeShiftProtobuf: override => pus011TimeShiftBuilder.encode(pus011TimeShiftAdapter.encode(pus011TimeShiftStub(override))).finish(),
getPus012Model: pus012ModelStub,
getPus012ModelDeProtobuf:  proto => pus012ModelAdapter.decode(pus012ModelBuilder.decode(proto)),
getPus012ModelProtobuf: override => pus012ModelBuilder.encode(pus012ModelAdapter.encode(pus012ModelStub(override))).finish(),
getPus012MonitoringCheckProperties: pus012MonitoringCheckPropertiesStub,
getPus012MonitoringCheckPropertiesDeProtobuf:  proto => pus012MonitoringCheckPropertiesAdapter.decode(pus012MonitoringCheckPropertiesBuilder.decode(proto)),
getPus012MonitoringCheckPropertiesProtobuf: override => pus012MonitoringCheckPropertiesBuilder.encode(pus012MonitoringCheckPropertiesAdapter.encode(pus012MonitoringCheckPropertiesStub(override))).finish(),
getPus012ParameterMonitoringDefinition: pus012ParameterMonitoringDefinitionStub,
getPus012ParameterMonitoringDefinitionDeProtobuf:  proto => pus012ParameterMonitoringDefinitionAdapter.decode(pus012ParameterMonitoringDefinitionBuilder.decode(proto)),
getPus012ParameterMonitoringDefinitionProtobuf: override => pus012ParameterMonitoringDefinitionBuilder.encode(pus012ParameterMonitoringDefinitionAdapter.encode(pus012ParameterMonitoringDefinitionStub(override))).finish(),
getPus013Ldt: pus013LdtStub,
getPus013LdtDeProtobuf:  proto => pus013LdtAdapter.decode(pus013LdtBuilder.decode(proto)),
getPus013LdtProtobuf: override => pus013LdtBuilder.encode(pus013LdtAdapter.encode(pus013LdtStub(override))).finish(),
getPus013LdtPart: pus013LdtPartStub,
getPus013LdtPartDeProtobuf:  proto => pus013LdtPartAdapter.decode(pus013LdtPartBuilder.decode(proto)),
getPus013LdtPartProtobuf: override => pus013LdtPartBuilder.encode(pus013LdtPartAdapter.encode(pus013LdtPartStub(override))).finish(),
getPus013Model: pus013ModelStub,
getPus013ModelDeProtobuf:  proto => pus013ModelAdapter.decode(pus013ModelBuilder.decode(proto)),
getPus013ModelProtobuf: override => pus013ModelBuilder.encode(pus013ModelAdapter.encode(pus013ModelStub(override))).finish(),
getPus014ForwardedPacket: pus014ForwardedPacketStub,
getPus014ForwardedPacketDeProtobuf:  proto => pus014ForwardedPacketAdapter.decode(pus014ForwardedPacketBuilder.decode(proto)),
getPus014ForwardedPacketProtobuf: override => pus014ForwardedPacketBuilder.encode(pus014ForwardedPacketAdapter.encode(pus014ForwardedPacketStub(override))).finish(),
getPus014Model: pus014ModelStub,
getPus014ModelDeProtobuf:  proto => pus014ModelAdapter.decode(pus014ModelBuilder.decode(proto)),
getPus014ModelProtobuf: override => pus014ModelBuilder.encode(pus014ModelAdapter.encode(pus014ModelStub(override))).finish(),
getPus015Model: pus015ModelStub,
getPus015ModelDeProtobuf:  proto => pus015ModelAdapter.decode(pus015ModelBuilder.decode(proto)),
getPus015ModelProtobuf: override => pus015ModelBuilder.encode(pus015ModelAdapter.encode(pus015ModelStub(override))).finish(),
getPus015Packet: pus015PacketStub,
getPus015PacketDeProtobuf:  proto => pus015PacketAdapter.decode(pus015PacketBuilder.decode(proto)),
getPus015PacketProtobuf: override => pus015PacketBuilder.encode(pus015PacketAdapter.encode(pus015PacketStub(override))).finish(),
getPus015PacketStore: pus015PacketStoreStub,
getPus015PacketStoreDeProtobuf:  proto => pus015PacketStoreAdapter.decode(pus015PacketStoreBuilder.decode(proto)),
getPus015PacketStoreProtobuf: override => pus015PacketStoreBuilder.encode(pus015PacketStoreAdapter.encode(pus015PacketStoreStub(override))).finish(),
getPus018Model: pus018ModelStub,
getPus018ModelDeProtobuf:  proto => pus018ModelAdapter.decode(pus018ModelBuilder.decode(proto)),
getPus018ModelProtobuf: override => pus018ModelBuilder.encode(pus018ModelAdapter.encode(pus018ModelStub(override))).finish(),
getPus018Obcp: pus018ObcpStub,
getPus018ObcpDeProtobuf:  proto => pus018ObcpAdapter.decode(pus018ObcpBuilder.decode(proto)),
getPus018ObcpProtobuf: override => pus018ObcpBuilder.encode(pus018ObcpAdapter.encode(pus018ObcpStub(override))).finish(),
getPus019EventAction: pus019EventActionStub,
getPus019EventActionDeProtobuf:  proto => pus019EventActionAdapter.decode(pus019EventActionBuilder.decode(proto)),
getPus019EventActionProtobuf: override => pus019EventActionBuilder.encode(pus019EventActionAdapter.encode(pus019EventActionStub(override))).finish(),
getPus019Model: pus019ModelStub,
getPus019ModelDeProtobuf:  proto => pus019ModelAdapter.decode(pus019ModelBuilder.decode(proto)),
getPus019ModelProtobuf: override => pus019ModelBuilder.encode(pus019ModelAdapter.encode(pus019ModelStub(override))).finish(),
getPus140Model: pus140ModelStub,
getPus140ModelDeProtobuf:  proto => pus140ModelAdapter.decode(pus140ModelBuilder.decode(proto)),
getPus140ModelProtobuf: override => pus140ModelBuilder.encode(pus140ModelAdapter.encode(pus140ModelStub(override))).finish(),
getPus140Parameter: pus140ParameterStub,
getPus140ParameterDeProtobuf:  proto => pus140ParameterAdapter.decode(pus140ParameterBuilder.decode(proto)),
getPus140ParameterProtobuf: override => pus140ParameterBuilder.encode(pus140ParameterAdapter.encode(pus140ParameterStub(override))).finish(),
getPus142FunctionalMonitoring: pus142FunctionalMonitoringStub,
getPus142FunctionalMonitoringDeProtobuf:  proto => pus142FunctionalMonitoringAdapter.decode(pus142FunctionalMonitoringBuilder.decode(proto)),
getPus142FunctionalMonitoringProtobuf: override => pus142FunctionalMonitoringBuilder.encode(pus142FunctionalMonitoringAdapter.encode(pus142FunctionalMonitoringStub(override))).finish(),
getPus142Model: pus142ModelStub,
getPus142ModelDeProtobuf:  proto => pus142ModelAdapter.decode(pus142ModelBuilder.decode(proto)),
getPus142ModelProtobuf: override => pus142ModelBuilder.encode(pus142ModelAdapter.encode(pus142ModelStub(override))).finish(),
getPus142ParameterMonitoringDefinition: pus142ParameterMonitoringDefinitionStub,
getPus142ParameterMonitoringDefinitionDeProtobuf:  proto => pus142ParameterMonitoringDefinitionAdapter.decode(pus142ParameterMonitoringDefinitionBuilder.decode(proto)),
getPus142ParameterMonitoringDefinitionProtobuf: override => pus142ParameterMonitoringDefinitionBuilder.encode(pus142ParameterMonitoringDefinitionAdapter.encode(pus142ParameterMonitoringDefinitionStub(override))).finish(),
getPus144Model: pus144ModelStub,
getPus144ModelDeProtobuf:  proto => pus144ModelAdapter.decode(pus144ModelBuilder.decode(proto)),
getPus144ModelProtobuf: override => pus144ModelBuilder.encode(pus144ModelAdapter.encode(pus144ModelStub(override))).finish(),
getPus144OnboardFile: pus144OnboardFileStub,
getPus144OnboardFileDeProtobuf:  proto => pus144OnboardFileAdapter.decode(pus144OnboardFileBuilder.decode(proto)),
getPus144OnboardFileProtobuf: override => pus144OnboardFileBuilder.encode(pus144OnboardFileAdapter.encode(pus144OnboardFileStub(override))).finish(),
getPusElementList: pusElementListStub,
getPusElementListDeProtobuf:  proto => pusElementListAdapter.decode(pusElementListBuilder.decode(proto)),
getPusElementListProtobuf: override => pusElementListBuilder.encode(pusElementListAdapter.encode(pusElementListStub(override))).finish(),
getPusMmeModel: pusMmeModelStub,
getPusMmeModelDeProtobuf:  proto => pusMmeModelAdapter.decode(pusMmeModelBuilder.decode(proto)),
getPusMmeModelProtobuf: override => pusMmeModelBuilder.encode(pusMmeModelAdapter.encode(pusMmeModelStub(override))).finish(),
getPusMmePacket: pusMmePacketStub,
getPusMmePacketDeProtobuf:  proto => pusMmePacketAdapter.decode(pusMmePacketBuilder.decode(proto)),
getPusMmePacketProtobuf: override => pusMmePacketBuilder.encode(pusMmePacketAdapter.encode(pusMmePacketStub(override))).finish(),
getPusMmePacketParameter: pusMmePacketParameterStub,
getPusMmePacketParameterDeProtobuf:  proto => pusMmePacketParameterAdapter.decode(pusMmePacketParameterBuilder.decode(proto)),
getPusMmePacketParameterProtobuf: override => pusMmePacketParameterBuilder.encode(pusMmePacketParameterAdapter.encode(pusMmePacketParameterStub(override))).finish(),
getPusMmePacketStore: pusMmePacketStoreStub,
getPusMmePacketStoreDeProtobuf:  proto => pusMmePacketStoreAdapter.decode(pusMmePacketStoreBuilder.decode(proto)),
getPusMmePacketStoreProtobuf: override => pusMmePacketStoreBuilder.encode(pusMmePacketStoreAdapter.encode(pusMmePacketStoreStub(override))).finish(),
getPusParameter: pusParameterStub,
getPusParameterDeProtobuf:  proto => pusParameterAdapter.decode(pusParameterBuilder.decode(proto)),
getPusParameterProtobuf: override => pusParameterBuilder.encode(pusParameterAdapter.encode(pusParameterStub(override))).finish(),
getPusServiceApid: pusServiceApidStub,
getPusServiceApidDeProtobuf:  proto => pusServiceApidAdapter.decode(pusServiceApidBuilder.decode(proto)),
getPusServiceApidProtobuf: override => pusServiceApidBuilder.encode(pusServiceApidAdapter.encode(pusServiceApidStub(override))).finish(),
getPusValue: pusValueStub,
getPusValueDeProtobuf:  proto => pusValueAdapter.decode(pusValueBuilder.decode(proto)),
getPusValueProtobuf: override => pusValueBuilder.encode(pusValueAdapter.encode(pusValueStub(override))).finish(),
getResetStructure: resetStructureStub,
getResetStructureDeProtobuf:  proto => resetStructureAdapter.decode(resetStructureBuilder.decode(proto)),
getResetStructureProtobuf: override => resetStructureBuilder.encode(resetStructureAdapter.encode(resetStructureStub(override))).finish(),
getSubscribeStructure: subscribeStructureStub,
getSubscribeStructureDeProtobuf:  proto => subscribeStructureAdapter.decode(subscribeStructureBuilder.decode(proto)),
getSubscribeStructureProtobuf: override => subscribeStructureBuilder.encode(subscribeStructureAdapter.encode(subscribeStructureStub(override))).finish(),
getSynchoniseStructure: synchoniseStructureStub,
getSynchoniseStructureDeProtobuf:  proto => synchoniseStructureAdapter.decode(synchoniseStructureBuilder.decode(proto)),
getSynchoniseStructureProtobuf: override => synchoniseStructureBuilder.encode(synchoniseStructureAdapter.encode(synchoniseStructureStub(override))).finish(),
getUnsubscribeStructure: unsubscribeStructureStub,
getUnsubscribeStructureDeProtobuf:  proto => unsubscribeStructureAdapter.decode(unsubscribeStructureBuilder.decode(proto)),
getUnsubscribeStructureProtobuf: override => unsubscribeStructureBuilder.encode(unsubscribeStructureAdapter.encode(unsubscribeStructureStub(override))).finish(),
};
