const compareStructure = require('./compareStructure');
const dataStructure = require('./dataStructure');
const headerStructure = require('./headerStructure');
const initialiseStructure = require('./initialiseStructure');
const pus005Model = require('./pus005Model');
const pus005OnBoardEvent = require('./pus005OnBoardEvent');
const pus011Apid = require('./pus011Apid');
const pus011Command = require('./pus011Command');
const pus011CommandParameter = require('./pus011CommandParameter');
const pus011Model = require('./pus011Model');
const pus011SubSchedule = require('./pus011SubSchedule');
const pus011TimeShift = require('./pus011TimeShift');
const pus012Model = require('./pus012Model');
const pus012MonitoringCheckProperties = require('./pus012MonitoringCheckProperties');
const pus012ParameterMonitoringDefinition = require('./pus012ParameterMonitoringDefinition');
const pus013Ldt = require('./pus013Ldt');
const pus013LdtPart = require('./pus013LdtPart');
const pus013Model = require('./pus013Model');
const pus014ForwardedPacket = require('./pus014ForwardedPacket');
const pus014Model = require('./pus014Model');
const pus015Model = require('./pus015Model');
const pus015Packet = require('./pus015Packet');
const pus015PacketStore = require('./pus015PacketStore');
const pus018Model = require('./pus018Model');
const pus018Obcp = require('./pus018Obcp');
const pus019EventAction = require('./pus019EventAction');
const pus019Model = require('./pus019Model');
const pus140Model = require('./pus140Model');
const pus140Parameter = require('./pus140Parameter');
const pus142FunctionalMonitoring = require('./pus142FunctionalMonitoring');
const pus142Model = require('./pus142Model');
const pus142ParameterMonitoringDefinition = require('./pus142ParameterMonitoringDefinition');
const pus144Model = require('./pus144Model');
const pus144OnboardFile = require('./pus144OnboardFile');
const pusElementList = require('./pusElementList');
const pusMmeModel = require('./pusMmeModel');
const pusMmePacket = require('./pusMmePacket');
const pusMmePacketParameter = require('./pusMmePacketParameter');
const pusMmePacketStore = require('./pusMmePacketStore');
const pusParameter = require('./pusParameter');
const pusServiceApid = require('./pusServiceApid');
const pusValue = require('./pusValue');
const resetStructure = require('./resetStructure');
const subscribeStructure = require('./subscribeStructure');
const synchoniseStructure = require('./synchoniseStructure');
const unsubscribeStructure = require('./unsubscribeStructure');
module.exports = {
CompareStructure : { type: 'protobuf', adapter: compareStructure },
DataStructure : { type: 'protobuf', adapter: dataStructure },
HeaderStructure : { type: 'protobuf', adapter: headerStructure },
InitialiseStructure : { type: 'protobuf', adapter: initialiseStructure },
Pus005Model : { type: 'protobuf', adapter: pus005Model },
Pus005OnBoardEvent : { type: 'protobuf', adapter: pus005OnBoardEvent },
Pus011Apid : { type: 'protobuf', adapter: pus011Apid },
Pus011Command : { type: 'protobuf', adapter: pus011Command },
Pus011CommandParameter : { type: 'protobuf', adapter: pus011CommandParameter },
Pus011Model : { type: 'protobuf', adapter: pus011Model },
Pus011SubSchedule : { type: 'protobuf', adapter: pus011SubSchedule },
Pus011TimeShift : { type: 'protobuf', adapter: pus011TimeShift },
Pus012Model : { type: 'protobuf', adapter: pus012Model },
Pus012MonitoringCheckProperties : { type: 'protobuf', adapter: pus012MonitoringCheckProperties },
Pus012ParameterMonitoringDefinition : { type: 'protobuf', adapter: pus012ParameterMonitoringDefinition },
Pus013Ldt : { type: 'protobuf', adapter: pus013Ldt },
Pus013LdtPart : { type: 'protobuf', adapter: pus013LdtPart },
Pus013Model : { type: 'protobuf', adapter: pus013Model },
Pus014ForwardedPacket : { type: 'protobuf', adapter: pus014ForwardedPacket },
Pus014Model : { type: 'protobuf', adapter: pus014Model },
Pus015Model : { type: 'protobuf', adapter: pus015Model },
Pus015Packet : { type: 'protobuf', adapter: pus015Packet },
Pus015PacketStore : { type: 'protobuf', adapter: pus015PacketStore },
Pus018Model : { type: 'protobuf', adapter: pus018Model },
Pus018Obcp : { type: 'protobuf', adapter: pus018Obcp },
Pus019EventAction : { type: 'protobuf', adapter: pus019EventAction },
Pus019Model : { type: 'protobuf', adapter: pus019Model },
Pus140Model : { type: 'protobuf', adapter: pus140Model },
Pus140Parameter : { type: 'protobuf', adapter: pus140Parameter },
Pus142FunctionalMonitoring : { type: 'protobuf', adapter: pus142FunctionalMonitoring },
Pus142Model : { type: 'protobuf', adapter: pus142Model },
Pus142ParameterMonitoringDefinition : { type: 'protobuf', adapter: pus142ParameterMonitoringDefinition },
Pus144Model : { type: 'protobuf', adapter: pus144Model },
Pus144OnboardFile : { type: 'protobuf', adapter: pus144OnboardFile },
PusElementList : { type: 'protobuf', adapter: pusElementList },
PusMmeModel : { type: 'protobuf', adapter: pusMmeModel },
PusMmePacket : { type: 'protobuf', adapter: pusMmePacket },
PusMmePacketParameter : { type: 'protobuf', adapter: pusMmePacketParameter },
PusMmePacketStore : { type: 'protobuf', adapter: pusMmePacketStore },
PusParameter : { type: 'protobuf', adapter: pusParameter },
PusServiceApid : { type: 'protobuf', adapter: pusServiceApid },
PusValue : { type: 'protobuf', adapter: pusValue },
ResetStructure : { type: 'protobuf', adapter: resetStructure },
SubscribeStructure : { type: 'protobuf', adapter: subscribeStructure },
SynchoniseStructure : { type: 'protobuf', adapter: synchoniseStructure },
UnsubscribeStructure : { type: 'protobuf', adapter: unsubscribeStructure },
};