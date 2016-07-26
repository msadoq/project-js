const debug = require('../../io/debug')('dataTypeManager:dataTypeApi');
const util = require('util');

const binToJson = (metadata, data) => new Promise((resolve) => {
  const dataType = metadata.type;
  debug.debug(`Type of bin data: ${dataType}`);
  let processedBin;
  if (dataType === 'FdsData') {
    processedBin = JSON.parse(data);
  } else if (dataType === 'AlertToLaunch') {
    const alertToLaunchController = require('../controller/alertToLaunch.js');
    processedBin = alertToLaunchController.binToJson(data);
  
  } else if (dataType === 'TCHistory') {
    const tCHistoryController = require('../controller/tCHistory.js');
    processedBin = tCHistoryController.binToJson(data);
  
  } else if (dataType === 'Termination') {
    const terminationController = require('../controller/termination.js');
    processedBin = terminationController.binToJson(data);
  
  } else if (dataType === 'Provider') {
    const providerController = require('../controller/provider.js');
    processedBin = providerController.binToJson(data);
  
  } else if (dataType === 'ProviderDefinition') {
    const providerDefinitionController = require('../controller/providerDefinition.js');
    processedBin = providerDefinitionController.binToJson(data);
  
  } else if (dataType === 'User') {
    const userController = require('../controller/user.js');
    processedBin = userController.binToJson(data);
  
  } else if (dataType === 'UserContext') {
    const userContextController = require('../controller/userContext.js');
    processedBin = userContextController.binToJson(data);
  
  } else if (dataType === 'GroupDefinition') {
    const groupDefinitionController = require('../controller/groupDefinition.js');
    processedBin = groupDefinitionController.binToJson(data);
  
  } else if (dataType === 'StatisticFunctionDetails') {
    const statisticFunctionDetailsController = require('../controller/statisticFunctionDetails.js');
    processedBin = statisticFunctionDetailsController.binToJson(data);
  
  } else if (dataType === 'StatisticLink') {
    const statisticLinkController = require('../controller/statisticLink.js');
    processedBin = statisticLinkController.binToJson(data);
  
  } else if (dataType === 'StatisticValue') {
    const statisticValueController = require('../controller/statisticValue.js');
    processedBin = statisticValueController.binToJson(data);
  
  } else if (dataType === 'Execution') {
    const executionController = require('../controller/execution.js');
    processedBin = executionController.binToJson(data);
  
  } else if (dataType === 'ExecutionStatus') {
    const executionStatusController = require('../controller/executionStatus.js');
    processedBin = executionStatusController.binToJson(data);
  
  } else if (dataType === 'LifeCycle') {
    const lifeCycleController = require('../controller/lifeCycle.js');
    processedBin = lifeCycleController.binToJson(data);
  
  } else if (dataType === 'LifeCycleStatus') {
    const lifeCycleStatusController = require('../controller/lifeCycleStatus.js');
    processedBin = lifeCycleStatusController.binToJson(data);
  
  } else if (dataType === 'LogbookEvent') {
    const logbookEventController = require('../controller/logbookEvent.js');
    processedBin = logbookEventController.binToJson(data);
  
  } else if (dataType === 'OperationParameter') {
    const operationParameterController = require('../controller/operationParameter.js');
    processedBin = operationParameterController.binToJson(data);
  
  } else if (dataType === 'Collection') {
    const collectionController = require('../controller/collection.js');
    processedBin = collectionController.binToJson(data);
  
  } else if (dataType === 'DocVersion') {
    const docVersionController = require('../controller/docVersion.js');
    processedBin = docVersionController.binToJson(data);
  
  } else if (dataType === 'Document') {
    const documentController = require('../controller/document.js');
    processedBin = documentController.binToJson(data);
  
  } else if (dataType === 'Folder') {
    const folderController = require('../controller/folder.js');
    processedBin = folderController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataBlob') {
    const timeBasedDataBlobController = require('../controller/timeBasedDataBlob.js');
    processedBin = timeBasedDataBlobController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataBoolean') {
    const timeBasedDataBooleanController = require('../controller/timeBasedDataBoolean.js');
    processedBin = timeBasedDataBooleanController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataByte') {
    const timeBasedDataByteController = require('../controller/timeBasedDataByte.js');
    processedBin = timeBasedDataByteController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataDouble') {
    const timeBasedDataDoubleController = require('../controller/timeBasedDataDouble.js');
    processedBin = timeBasedDataDoubleController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataDuration') {
    const timeBasedDataDurationController = require('../controller/timeBasedDataDuration.js');
    processedBin = timeBasedDataDurationController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataFinetime') {
    const timeBasedDataFinetimeController = require('../controller/timeBasedDataFinetime.js');
    processedBin = timeBasedDataFinetimeController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataFloat') {
    const timeBasedDataFloatController = require('../controller/timeBasedDataFloat.js');
    processedBin = timeBasedDataFloatController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataIdentifier') {
    const timeBasedDataIdentifierController = require('../controller/timeBasedDataIdentifier.js');
    processedBin = timeBasedDataIdentifierController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataInteger') {
    const timeBasedDataIntegerController = require('../controller/timeBasedDataInteger.js');
    processedBin = timeBasedDataIntegerController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataLong') {
    const timeBasedDataLongController = require('../controller/timeBasedDataLong.js');
    processedBin = timeBasedDataLongController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataShort') {
    const timeBasedDataShortController = require('../controller/timeBasedDataShort.js');
    processedBin = timeBasedDataShortController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataString') {
    const timeBasedDataStringController = require('../controller/timeBasedDataString.js');
    processedBin = timeBasedDataStringController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataTime') {
    const timeBasedDataTimeController = require('../controller/timeBasedDataTime.js');
    processedBin = timeBasedDataTimeController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataUByte') {
    const timeBasedDataUByteController = require('../controller/timeBasedDataUByte.js');
    processedBin = timeBasedDataUByteController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataUInteger') {
    const timeBasedDataUIntegerController = require('../controller/timeBasedDataUInteger.js');
    processedBin = timeBasedDataUIntegerController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataULong') {
    const timeBasedDataULongController = require('../controller/timeBasedDataULong.js');
    processedBin = timeBasedDataULongController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataURI') {
    const timeBasedDataURIController = require('../controller/timeBasedDataURI.js');
    processedBin = timeBasedDataURIController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataUShort') {
    const timeBasedDataUShortController = require('../controller/timeBasedDataUShort.js');
    processedBin = timeBasedDataUShortController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataBlob') {
    const fDSTimeBasedDataBlobController = require('../controller/fDSTimeBasedDataBlob.js');
    processedBin = fDSTimeBasedDataBlobController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataBoolean') {
    const fDSTimeBasedDataBooleanController = require('../controller/fDSTimeBasedDataBoolean.js');
    processedBin = fDSTimeBasedDataBooleanController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataByte') {
    const fDSTimeBasedDataByteController = require('../controller/fDSTimeBasedDataByte.js');
    processedBin = fDSTimeBasedDataByteController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataDouble') {
    const fDSTimeBasedDataDoubleController = require('../controller/fDSTimeBasedDataDouble.js');
    processedBin = fDSTimeBasedDataDoubleController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataDuration') {
    const fDSTimeBasedDataDurationController = require('../controller/fDSTimeBasedDataDuration.js');
    processedBin = fDSTimeBasedDataDurationController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataFinetime') {
    const fDSTimeBasedDataFinetimeController = require('../controller/fDSTimeBasedDataFinetime.js');
    processedBin = fDSTimeBasedDataFinetimeController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataFloat') {
    const fDSTimeBasedDataFloatController = require('../controller/fDSTimeBasedDataFloat.js');
    processedBin = fDSTimeBasedDataFloatController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataIdentifier') {
    const fDSTimeBasedDataIdentifierController = require('../controller/fDSTimeBasedDataIdentifier.js');
    processedBin = fDSTimeBasedDataIdentifierController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataInteger') {
    const fDSTimeBasedDataIntegerController = require('../controller/fDSTimeBasedDataInteger.js');
    processedBin = fDSTimeBasedDataIntegerController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataLong') {
    const fDSTimeBasedDataLongController = require('../controller/fDSTimeBasedDataLong.js');
    processedBin = fDSTimeBasedDataLongController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataShort') {
    const fDSTimeBasedDataShortController = require('../controller/fDSTimeBasedDataShort.js');
    processedBin = fDSTimeBasedDataShortController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataString') {
    const fDSTimeBasedDataStringController = require('../controller/fDSTimeBasedDataString.js');
    processedBin = fDSTimeBasedDataStringController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataTime') {
    const fDSTimeBasedDataTimeController = require('../controller/fDSTimeBasedDataTime.js');
    processedBin = fDSTimeBasedDataTimeController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataUByte') {
    const fDSTimeBasedDataUByteController = require('../controller/fDSTimeBasedDataUByte.js');
    processedBin = fDSTimeBasedDataUByteController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataUInteger') {
    const fDSTimeBasedDataUIntegerController = require('../controller/fDSTimeBasedDataUInteger.js');
    processedBin = fDSTimeBasedDataUIntegerController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataULong') {
    const fDSTimeBasedDataULongController = require('../controller/fDSTimeBasedDataULong.js');
    processedBin = fDSTimeBasedDataULongController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataURI') {
    const fDSTimeBasedDataURIController = require('../controller/fDSTimeBasedDataURI.js');
    processedBin = fDSTimeBasedDataURIController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataUShort') {
    const fDSTimeBasedDataUShortController = require('../controller/fDSTimeBasedDataUShort.js');
    processedBin = fDSTimeBasedDataUShortController.binToJson(data);
  
  } else if (dataType === 'Pus003Model') {
    const pus003ModelController = require('../controller/pus003Model.js');
    processedBin = pus003ModelController.binToJson(data);
  
  } else if (dataType === 'Pus005Model') {
    const pus005ModelController = require('../controller/pus005Model.js');
    processedBin = pus005ModelController.binToJson(data);
  
  } else if (dataType === 'Pus011Command') {
    const pus011CommandController = require('../controller/pus011Command.js');
    processedBin = pus011CommandController.binToJson(data);
  
  } else if (dataType === 'Pus011Model') {
    const pus011ModelController = require('../controller/pus011Model.js');
    processedBin = pus011ModelController.binToJson(data);
  
  } else if (dataType === 'Pus011SubSchedule') {
    const pus011SubScheduleController = require('../controller/pus011SubSchedule.js');
    processedBin = pus011SubScheduleController.binToJson(data);
  
  } else if (dataType === 'Pus011SyncPoint') {
    const pus011SyncPointController = require('../controller/pus011SyncPoint.js');
    processedBin = pus011SyncPointController.binToJson(data);
  
  } else if (dataType === 'Pus012Model') {
    const pus012ModelController = require('../controller/pus012Model.js');
    processedBin = pus012ModelController.binToJson(data);
  
  } else if (dataType === 'Pus013Model') {
    const pus013ModelController = require('../controller/pus013Model.js');
    processedBin = pus013ModelController.binToJson(data);
  
  } else if (dataType === 'Pus014Model') {
    const pus014ModelController = require('../controller/pus014Model.js');
    processedBin = pus014ModelController.binToJson(data);
  
  } else if (dataType === 'Pus015Model') {
    const pus015ModelController = require('../controller/pus015Model.js');
    processedBin = pus015ModelController.binToJson(data);
  
  } else if (dataType === 'Pus018Model') {
    const pus018ModelController = require('../controller/pus018Model.js');
    processedBin = pus018ModelController.binToJson(data);
  
  } else if (dataType === 'Pus019Model') {
    const pus019ModelController = require('../controller/pus019Model.js');
    processedBin = pus019ModelController.binToJson(data);
  
  } else if (dataType === 'Pus140Model') {
    const pus140ModelController = require('../controller/pus140Model.js');
    processedBin = pus140ModelController.binToJson(data);
  
  } else if (dataType === 'Pus142Model') {
    const pus142ModelController = require('../controller/pus142Model.js');
    processedBin = pus142ModelController.binToJson(data);
  
  } else if (dataType === 'Pus144Model') {
    const pus144ModelController = require('../controller/pus144Model.js');
    processedBin = pus144ModelController.binToJson(data);
  
  } else if (dataType === 'UCPReport') {
    const uCPReportController = require('../controller/uCPReport.js');
    processedBin = uCPReportController.binToJson(data);
  
  } else if (dataType === 'COP1Context') {
    const cOP1ContextController = require('../controller/cOP1Context.js');
    processedBin = cOP1ContextController.binToJson(data);
  
  } else if (dataType === 'DecommutedPacket') {
    const decommutedPacketController = require('../controller/decommutedPacket.js');
    processedBin = decommutedPacketController.binToJson(data);
  
  } else if (dataType === 'OperationParameter') {
    const operationParameterController = require('../controller/operationParameter.js');
    processedBin = operationParameterController.binToJson(data);
  
  } else if (dataType === 'ReportingParameter') {
    const reportingParameterController = require('../controller/reportingParameter.js');
    processedBin = reportingParameterController.binToJson(data);
  
  } else if (dataType === 'GroundMonitoringAlarm') {
    const groundMonitoringAlarmController = require('../controller/groundMonitoringAlarm.js');
    processedBin = groundMonitoringAlarmController.binToJson(data);
  
  } else if (dataType === 'ClcwPacket') {
    const clcwPacketController = require('../controller/clcwPacket.js');
    processedBin = clcwPacketController.binToJson(data);
  
  } else if (dataType === 'RmPacket') {
    const rmPacketController = require('../controller/rmPacket.js');
    processedBin = rmPacketController.binToJson(data);
  
  } else if (dataType === 'TmPacket') {
    const tmPacketController = require('../controller/tmPacket.js');
    processedBin = tmPacketController.binToJson(data);
  
  } else if (dataType === 'AckRequest') {
    const ackRequestController = require('../controller/ackRequest.js');
    processedBin = ackRequestController.binToJson(data);
  
  } else if (dataType === 'AckSMS') {
    const ackSMSController = require('../controller/ackSMS.js');
    processedBin = ackSMSController.binToJson(data);
  
  } else if (dataType === 'ComputedEvent') {
    const computedEventController = require('../controller/computedEvent.js');
    processedBin = computedEventController.binToJson(data);
  
  } else if (dataType === 'OpAlert') {
    const opAlertController = require('../controller/opAlert.js');
    processedBin = opAlertController.binToJson(data);
  
  } else if (dataType === 'ExternalEvent') {
    const externalEventController = require('../controller/externalEvent.js');
    processedBin = externalEventController.binToJson(data);
  
  } else if (dataType === 'UserEvent') {
    const userEventController = require('../controller/userEvent.js');
    processedBin = userEventController.binToJson(data);
  
  } else {
    processedBin = { error: 'unknown COMObject' };
  }
  debug.verbose(`Decode binary data: ${util.inspect(processedBin)}`);
  resolve(processedBin);
});

module.exports = { binToJson };
