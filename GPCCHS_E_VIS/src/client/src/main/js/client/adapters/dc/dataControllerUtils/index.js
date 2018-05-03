// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// VERSION : 2.0.0 : DM : #5806 : 29/09/2017 : Creation of alarm view adapters
// VERSION : 2.0.0 : DM : #5806 : 10/10/2017 : Add new stub data for GrounData and OnBoardData
// VERSION : 2.0.0.2 : FA : #11812 : 18/04/2018 : Add management of StatsAggregation in VIMA +
//  update stub
// END-HISTORY
// ====================================================================

const Action = require('./action');
const Bool = require('./boolean');
const DataId = require('./dataId');
const DcStatus = require('./dcStatus');
const Domains = require('./domains');
const FMDCreateDocument = require('./fMDCreateDocument');
const FMDDocumentProperty = require('./fMDDocumentProperty');
const FMDFileInfo = require('./fMDFileInfo');
const FMDFileType = require('./fMDFileType');
const FMDGet = require('./fMDGet');
const Header = require('./header');
const QueryArguments = require('./queryArguments');
const SendLog = require('./sendLog');
const SessionGetTime = require('./sessionGetTime');
const Sessions = require('./sessions');
const Status = require('./status');
const Str = require('./string');
const TimeInterval = require('./timeInterval');
const Timestamp = require('./timestamp');
const AlarmType = require('./alarmType');
const AlarmMode = require('./alarmMode');
const GroundMonitoringAlarmAckRequest = require('./groundMonitoringAlarmAckRequest');
const OnBoardAlarmAckRequest = require('./onBoardAlarmAckRequest');
const OnBoardAlarm = require('./onBoardAlarm');

// ADE
const ADEAck = require('./ADEAck');
const ADEError = require('./ADEError');
const ADEGenericPayload = require('./ADEGenericPayload');
const ADEHeader = require('./ADEHeader');
const ADEPayload = require('./ADEPayload');
const ADEPayloadHeader = require('./ADEPayloadHeader');
const ADESatellite = require('./ADESatellite');
const ADESatellites = require('./ADESatellites');
const ADESDBQuery = require('./ADESDBQuery');
const ADEStringList = require('./ADEStringList');
const ADETimebasedQuery = require('./ADETimebasedQuery');
const ADETimebasedPubsub = require('./ADETimebasedPubsub');
const ADETimebasedSubscription = require('./ADETimebasedSubscription');

const StatExecution = require('./statExecution');

module.exports = { // TODO .proto should be collocated with adapters
  Action: { type: 'protobuf', adapter: Action },
  Boolean: { type: 'protobuf', adapter: Bool },
  DataId: { type: 'protobuf', adapter: DataId },
  DcStatus: { type: 'protobuf', adapter: DcStatus },
  Domains: { type: 'protobuf', adapter: Domains },
  FMDCreateDocument: { type: 'protobuf', adapter: FMDCreateDocument },
  FMDDocumentProperty: { type: 'protobuf', adapter: FMDDocumentProperty },
  FMDFileInfo: { type: 'protobuf', adapter: FMDFileInfo },
  FMDFileType: { type: 'protobuf', adapter: FMDFileType },
  FMDGet: { type: 'protobuf', adapter: FMDGet },
  Header: { type: 'protobuf', adapter: Header },
  QueryArguments: { type: 'protobuf', adapter: QueryArguments },
  SendLog: { type: 'protobuf', adapter: SendLog },
  SessionGetTime: { type: 'protobuf', adapter: SessionGetTime },
  Sessions: { type: 'protobuf', adapter: Sessions },
  Status: { type: 'protobuf', adapter: Status },
  String: { type: 'protobuf', adapter: Str },
  TimeInterval: { type: 'protobuf', adapter: TimeInterval },
  Timestamp: { type: 'protobuf', adapter: Timestamp },
  AlarmType: { type: 'protobuf', adapter: AlarmType },
  AlarmMode: { type: 'protobuf', adapter: AlarmMode },
  GroundMonitoringAlarmAckRequest: { type: 'protobuf', adapter: GroundMonitoringAlarmAckRequest },
  OnBoardAlarmAckRequest: { type: 'protobuf', adapter: OnBoardAlarmAckRequest },
  OnBoardAlarm: { type: 'protobuf', adapter: OnBoardAlarm },
  ADEAck: { type: 'protobuf', adapter: ADEAck },
  ADEError: { type: 'protobuf', adapter: ADEError },
  ADEGenericPayload: { type: 'protobuf', adapter: ADEGenericPayload },
  ADEHeader: { type: 'protobuf', adapter: ADEHeader },
  ADEPayload: { type: 'protobuf', adapter: ADEPayload },
  ADEPayloadHeader: { type: 'protobuf', adapter: ADEPayloadHeader },
  ADESatellite: { type: 'protobuf', adapter: ADESatellite },
  ADESatellites: { type: 'protobuf', adapter: ADESatellites },
  ADESDBQuery: { type: 'protobuf', adapter: ADESDBQuery },
  ADEStringList: { type: 'protobuf', adapter: ADEStringList },
  ADETimebasedQuery: { type: 'protobuf', adapter: ADETimebasedQuery },
  ADETimebasedPubsub: { type: 'protobuf', adapter: ADETimebasedPubsub },
  ADETimebasedSubscription: { type: 'protobuf', adapter: ADETimebasedSubscription },
  StatExecution: { type: 'raw', adapter: StatExecution},
};
