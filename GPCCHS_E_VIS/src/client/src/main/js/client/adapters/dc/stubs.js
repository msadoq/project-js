// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const actionStub = require('./dataControllerUtils/action.stub');
const booleanStub = require('./dataControllerUtils/boolean.stub');
const dataIdStub = require('./dataControllerUtils/dataId.stub');
const domainStub = require('./dataControllerUtils/domain.stub');
const domainsStub = require('./dataControllerUtils/domains.stub');
const fMDCreateDocumentStub = require('./dataControllerUtils/fMDCreateDocument.stub');
const fMDDocumentPropertyStub = require('./dataControllerUtils/fMDDocumentProperty.stub');
const fMDFileInfoStub = require('./dataControllerUtils/fMDFileInfo.stub');
const fMDFileTypeStub = require('./dataControllerUtils/fMDFileType.stub');
const fMDGetStub = require('./dataControllerUtils/fMDGet.stub');
const headerStub = require('./dataControllerUtils/header.stub');
const queryArgumentsStub = require('./dataControllerUtils/queryArguments.stub');
const sendLogStub = require('./dataControllerUtils/sendLog.stub');
const sessionStub = require('./dataControllerUtils/session.stub');
const sessionGetTimeStub = require('./dataControllerUtils/sessionGetTime.stub');
const sessionsStub = require('./dataControllerUtils/sessions.stub');
const statusStub = require('./dataControllerUtils/status.stub');
const dcStatusStub = require('./dataControllerUtils/dcStatus.stub');
const stringStub = require('./dataControllerUtils/string.stub');
const timeIntervalStub = require('./dataControllerUtils/timeInterval.stub');
const timestampStub = require('./dataControllerUtils/timestamp.stub');
const groundMonitoringAlarmAckRequest = require('./dataControllerUtils/groundMonitoringAlarmAckRequest.stub');
const onBoardAlarmAckRequest = require('./dataControllerUtils/onBoardAlarmAckRequest.stub');
const onBoardAlarm = require('./dataControllerUtils/onBoardAlarm.stub');
const ADEHeader = require('./dataControllerUtils/ADEHeader.stub');
const ADEGenericPayload = require('./dataControllerUtils/ADEGenericPayload.stub');
const ADEPayload = require('./dataControllerUtils/ADEPayload.stub');
const ADEPayloadHeader = require('./dataControllerUtils/ADEPayloadHeader.stub');
const ADETimebasedSubscription = require('./dataControllerUtils/ADETimebasedSubscription.stub');
const ADEStringList = require('./dataControllerUtils/ADEStringList.stub');

module.exports = Object.assign(
  {},
  actionStub,
  booleanStub,
  dataIdStub,
  domainStub,
  domainsStub,
  fMDCreateDocumentStub,
  fMDDocumentPropertyStub,
  fMDFileInfoStub,
  fMDFileTypeStub,
  fMDGetStub,
  headerStub,
  queryArgumentsStub,
  sendLogStub,
  sessionStub,
  sessionGetTimeStub,
  sessionsStub,
  statusStub,
  dcStatusStub,
  stringStub,
  timeIntervalStub,
  timestampStub,
  groundMonitoringAlarmAckRequest,
  onBoardAlarmAckRequest,
  onBoardAlarm,
  ADEHeader,
  ADEGenericPayload,
  ADEPayload,
  ADEPayloadHeader,
  ADETimebasedSubscription,
  ADEStringList
);
