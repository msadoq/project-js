const debug = require('../../io/debug')('dataTypeManager:dataTypeApi');
const util = require('util');

const binToJson = (metadata, data) => new Promise((resolve) => {
  const dataType = metadata.type;
  debug.debug(`Type of bin data: ${dataType}`);
  let processedBin;
  if (dataType === 'FdsData') {
    processBin = JSON.parse(data);
  } else if (dataType === 'AlertToLaunch') {
    const alertToLaunchController = require('../controller/alertToLaunch.js');
    processBin = alertToLaunchController.binToJson(data);
  
  } else if (dataType === 'TCHistory') {
    const tCHistoryController = require('../controller/tCHistory.js');
    processBin = tCHistoryController.binToJson(data);
  
  } else if (dataType === 'Termination') {
    const terminationController = require('../controller/termination.js');
    processBin = terminationController.binToJson(data);
  
  } else if (dataType === 'Provider') {
    const providerController = require('../controller/provider.js');
    processBin = providerController.binToJson(data);
  
  } else if (dataType === 'ProviderDefinition') {
    const providerDefinitionController = require('../controller/providerDefinition.js');
    processBin = providerDefinitionController.binToJson(data);
  
  } else if (dataType === 'User') {
    const userController = require('../controller/user.js');
    processBin = userController.binToJson(data);
  
  } else if (dataType === 'UserContext') {
    const userContextController = require('../controller/userContext.js');
    processBin = userContextController.binToJson(data);
  
  } else if (dataType === 'GroupDefinition') {
    const groupDefinitionController = require('../controller/groupDefinition.js');
    processBin = groupDefinitionController.binToJson(data);
  
  } else if (dataType === 'StatisticFunctionDetails') {
    const statisticFunctionDetailsController = require('../controller/statisticFunctionDetails.js');
    processBin = statisticFunctionDetailsController.binToJson(data);
  
  } else if (dataType === 'StatisticLink') {
    const statisticLinkController = require('../controller/statisticLink.js');
    processBin = statisticLinkController.binToJson(data);
  
  } else if (dataType === 'StatisticValue') {
    const statisticValueController = require('../controller/statisticValue.js');
    processBin = statisticValueController.binToJson(data);
  
  } else if (dataType === 'Execution') {
    const executionController = require('../controller/execution.js');
    processBin = executionController.binToJson(data);
  
  } else if (dataType === 'ExecutionStatus') {
    const executionStatusController = require('../controller/executionStatus.js');
    processBin = executionStatusController.binToJson(data);
  
  } else if (dataType === 'LifeCycle') {
    const lifeCycleController = require('../controller/lifeCycle.js');
    processBin = lifeCycleController.binToJson(data);
  
  } else if (dataType === 'LifeCycleStatus') {
    const lifeCycleStatusController = require('../controller/lifeCycleStatus.js');
    processBin = lifeCycleStatusController.binToJson(data);
  
  } else if (dataType === 'LogbookEvent') {
    const logbookEventController = require('../controller/logbookEvent.js');
    processBin = logbookEventController.binToJson(data);
  
  } else if (dataType === 'OperationParameter') {
    const operationParameterController = require('../controller/operationParameter.js');
    processBin = operationParameterController.binToJson(data);
  
  } else if (dataType === 'Collection') {
    const collectionController = require('../controller/collection.js');
    processBin = collectionController.binToJson(data);
  
  } else if (dataType === 'DocVersion') {
    const docVersionController = require('../controller/docVersion.js');
    processBin = docVersionController.binToJson(data);
  
  } else if (dataType === 'Document') {
    const documentController = require('../controller/document.js');
    processBin = documentController.binToJson(data);
  
  } else if (dataType === 'Folder') {
    const folderController = require('../controller/folder.js');
    processBin = folderController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataBlob') {
    const timeBasedDataBlobController = require('../controller/timeBasedDataBlob.js');
    processBin = timeBasedDataBlobController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataBoolean') {
    const timeBasedDataBooleanController = require('../controller/timeBasedDataBoolean.js');
    processBin = timeBasedDataBooleanController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataByte') {
    const timeBasedDataByteController = require('../controller/timeBasedDataByte.js');
    processBin = timeBasedDataByteController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataDouble') {
    const timeBasedDataDoubleController = require('../controller/timeBasedDataDouble.js');
    processBin = timeBasedDataDoubleController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataDuration') {
    const timeBasedDataDurationController = require('../controller/timeBasedDataDuration.js');
    processBin = timeBasedDataDurationController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataFinetime') {
    const timeBasedDataFinetimeController = require('../controller/timeBasedDataFinetime.js');
    processBin = timeBasedDataFinetimeController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataFloat') {
    const timeBasedDataFloatController = require('../controller/timeBasedDataFloat.js');
    processBin = timeBasedDataFloatController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataIdentifier') {
    const timeBasedDataIdentifierController = require('../controller/timeBasedDataIdentifier.js');
    processBin = timeBasedDataIdentifierController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataInteger') {
    const timeBasedDataIntegerController = require('../controller/timeBasedDataInteger.js');
    processBin = timeBasedDataIntegerController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataLong') {
    const timeBasedDataLongController = require('../controller/timeBasedDataLong.js');
    processBin = timeBasedDataLongController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataShort') {
    const timeBasedDataShortController = require('../controller/timeBasedDataShort.js');
    processBin = timeBasedDataShortController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataString') {
    const timeBasedDataStringController = require('../controller/timeBasedDataString.js');
    processBin = timeBasedDataStringController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataTime') {
    const timeBasedDataTimeController = require('../controller/timeBasedDataTime.js');
    processBin = timeBasedDataTimeController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataUByte') {
    const timeBasedDataUByteController = require('../controller/timeBasedDataUByte.js');
    processBin = timeBasedDataUByteController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataUInteger') {
    const timeBasedDataUIntegerController = require('../controller/timeBasedDataUInteger.js');
    processBin = timeBasedDataUIntegerController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataULong') {
    const timeBasedDataULongController = require('../controller/timeBasedDataULong.js');
    processBin = timeBasedDataULongController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataURI') {
    const timeBasedDataURIController = require('../controller/timeBasedDataURI.js');
    processBin = timeBasedDataURIController.binToJson(data);
  
  } else if (dataType === 'TimeBasedDataUShort') {
    const timeBasedDataUShortController = require('../controller/timeBasedDataUShort.js');
    processBin = timeBasedDataUShortController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataBlob') {
    const fDSTimeBasedDataBlobController = require('../controller/fDSTimeBasedDataBlob.js');
    processBin = fDSTimeBasedDataBlobController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataBoolean') {
    const fDSTimeBasedDataBooleanController = require('../controller/fDSTimeBasedDataBoolean.js');
    processBin = fDSTimeBasedDataBooleanController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataByte') {
    const fDSTimeBasedDataByteController = require('../controller/fDSTimeBasedDataByte.js');
    processBin = fDSTimeBasedDataByteController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataDouble') {
    const fDSTimeBasedDataDoubleController = require('../controller/fDSTimeBasedDataDouble.js');
    processBin = fDSTimeBasedDataDoubleController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataDuration') {
    const fDSTimeBasedDataDurationController = require('../controller/fDSTimeBasedDataDuration.js');
    processBin = fDSTimeBasedDataDurationController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataFinetime') {
    const fDSTimeBasedDataFinetimeController = require('../controller/fDSTimeBasedDataFinetime.js');
    processBin = fDSTimeBasedDataFinetimeController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataFloat') {
    const fDSTimeBasedDataFloatController = require('../controller/fDSTimeBasedDataFloat.js');
    processBin = fDSTimeBasedDataFloatController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataIdentifier') {
    const fDSTimeBasedDataIdentifierController = require('../controller/fDSTimeBasedDataIdentifier.js');
    processBin = fDSTimeBasedDataIdentifierController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataInteger') {
    const fDSTimeBasedDataIntegerController = require('../controller/fDSTimeBasedDataInteger.js');
    processBin = fDSTimeBasedDataIntegerController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataLong') {
    const fDSTimeBasedDataLongController = require('../controller/fDSTimeBasedDataLong.js');
    processBin = fDSTimeBasedDataLongController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataShort') {
    const fDSTimeBasedDataShortController = require('../controller/fDSTimeBasedDataShort.js');
    processBin = fDSTimeBasedDataShortController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataString') {
    const fDSTimeBasedDataStringController = require('../controller/fDSTimeBasedDataString.js');
    processBin = fDSTimeBasedDataStringController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataTime') {
    const fDSTimeBasedDataTimeController = require('../controller/fDSTimeBasedDataTime.js');
    processBin = fDSTimeBasedDataTimeController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataUByte') {
    const fDSTimeBasedDataUByteController = require('../controller/fDSTimeBasedDataUByte.js');
    processBin = fDSTimeBasedDataUByteController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataUInteger') {
    const fDSTimeBasedDataUIntegerController = require('../controller/fDSTimeBasedDataUInteger.js');
    processBin = fDSTimeBasedDataUIntegerController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataULong') {
    const fDSTimeBasedDataULongController = require('../controller/fDSTimeBasedDataULong.js');
    processBin = fDSTimeBasedDataULongController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataURI') {
    const fDSTimeBasedDataURIController = require('../controller/fDSTimeBasedDataURI.js');
    processBin = fDSTimeBasedDataURIController.binToJson(data);
  
  } else if (dataType === 'FDSTimeBasedDataUShort') {
    const fDSTimeBasedDataUShortController = require('../controller/fDSTimeBasedDataUShort.js');
    processBin = fDSTimeBasedDataUShortController.binToJson(data);
  
  } else if (dataType === 'Pus003Model') {
    const pus003ModelController = require('../controller/pus003Model.js');
    processBin = pus003ModelController.binToJson(data);
  
  } else if (dataType === 'Pus005Model') {
    const pus005ModelController = require('../controller/pus005Model.js');
    processBin = pus005ModelController.binToJson(data);
  
  } else if (dataType === 'Pus011Command') {
    const pus011CommandController = require('../controller/pus011Command.js');
    processBin = pus011CommandController.binToJson(data);
  
  } else if (dataType === 'Pus011Model') {
    const pus011ModelController = require('../controller/pus011Model.js');
    processBin = pus011ModelController.binToJson(data);
  
  } else if (dataType === 'Pus011SubSchedule') {
    const pus011SubScheduleController = require('../controller/pus011SubSchedule.js');
    processBin = pus011SubScheduleController.binToJson(data);
  
  } else if (dataType === 'Pus011SyncPoint') {
    const pus011SyncPointController = require('../controller/pus011SyncPoint.js');
    processBin = pus011SyncPointController.binToJson(data);
  
  } else if (dataType === 'Pus012Model') {
    const pus012ModelController = require('../controller/pus012Model.js');
    processBin = pus012ModelController.binToJson(data);
  
  } else if (dataType === 'Pus013Model') {
    const pus013ModelController = require('../controller/pus013Model.js');
    processBin = pus013ModelController.binToJson(data);
  
  } else if (dataType === 'Pus014Model') {
    const pus014ModelController = require('../controller/pus014Model.js');
    processBin = pus014ModelController.binToJson(data);
  
  } else if (dataType === 'Pus015Model') {
    const pus015ModelController = require('../controller/pus015Model.js');
    processBin = pus015ModelController.binToJson(data);
  
  } else if (dataType === 'Pus018Model') {
    const pus018ModelController = require('../controller/pus018Model.js');
    processBin = pus018ModelController.binToJson(data);
  
  } else if (dataType === 'Pus019Model') {
    const pus019ModelController = require('../controller/pus019Model.js');
    processBin = pus019ModelController.binToJson(data);
  
  } else if (dataType === 'Pus140Model') {
    const pus140ModelController = require('../controller/pus140Model.js');
    processBin = pus140ModelController.binToJson(data);
  
  } else if (dataType === 'Pus142Model') {
    const pus142ModelController = require('../controller/pus142Model.js');
    processBin = pus142ModelController.binToJson(data);
  
  } else if (dataType === 'Pus144Model') {
    const pus144ModelController = require('../controller/pus144Model.js');
    processBin = pus144ModelController.binToJson(data);
  
  } else if (dataType === 'UCPReport') {
    const uCPReportController = require('../controller/uCPReport.js');
    processBin = uCPReportController.binToJson(data);
  
  } else if (dataType === 'COP1Context') {
    const cOP1ContextController = require('../controller/cOP1Context.js');
    processBin = cOP1ContextController.binToJson(data);
  
  } else if (dataType === 'DecommutedPacket') {
    const decommutedPacketController = require('../controller/decommutedPacket.js');
    processBin = decommutedPacketController.binToJson(data);
  
  } else if (dataType === 'OperationParameter') {
    const operationParameterController = require('../controller/operationParameter.js');
    processBin = operationParameterController.binToJson(data);
  
  } else if (dataType === 'ReportingParameter') {
    const reportingParameterController = require('../controller/reportingParameter.js');
    processBin = reportingParameterController.binToJson(data);
  
  } else if (dataType === 'GroundMonitoringAlarm') {
    const groundMonitoringAlarmController = require('../controller/groundMonitoringAlarm.js');
    processBin = groundMonitoringAlarmController.binToJson(data);
  
  } else if (dataType === 'ClcwPacket') {
    const clcwPacketController = require('../controller/clcwPacket.js');
    processBin = clcwPacketController.binToJson(data);
  
  } else if (dataType === 'RmPacket') {
    const rmPacketController = require('../controller/rmPacket.js');
    processBin = rmPacketController.binToJson(data);
  
  } else if (dataType === 'TmPacket') {
    const tmPacketController = require('../controller/tmPacket.js');
    processBin = tmPacketController.binToJson(data);
  
  } else if (dataType === 'AckRequest') {
    const ackRequestController = require('../controller/ackRequest.js');
    processBin = ackRequestController.binToJson(data);
  
  } else if (dataType === 'AckSMS') {
    const ackSMSController = require('../controller/ackSMS.js');
    processBin = ackSMSController.binToJson(data);
  
  } else if (dataType === 'ComputedEvent') {
    const computedEventController = require('../controller/computedEvent.js');
    processBin = computedEventController.binToJson(data);
  
  } else if (dataType === 'OpAlert') {
    const opAlertController = require('../controller/opAlert.js');
    processBin = opAlertController.binToJson(data);
  
  } else if (dataType === 'ExternalEvent') {
    const externalEventController = require('../controller/externalEvent.js');
    processBin = externalEventController.binToJson(data);
  
  } else if (dataType === 'UserEvent') {
    const userEventController = require('../controller/userEvent.js');
    processBin = userEventController.binToJson(data);
  
  } else {
    processBin = { error: 'unknown COMObject' };
  }
  debug.verbose(`Decode binary data: ${util.inspect(processedBin)}`);
  resolve(processedBin);
});

module.exports = { binToJson };
