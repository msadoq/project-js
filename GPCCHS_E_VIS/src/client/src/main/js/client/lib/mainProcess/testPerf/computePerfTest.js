const { testProtobuf } = require('common/protobuf/adapters/perfsTests/index');
const { getReportingParameterProtobuf,
  getIsisAggregationProtobuf,
  getComputedEventProtobuf,
  getCollectionProtobuf,
  getDocumentProtobuf,
  getClcwPacketProtobuf,
  getFolderProtobuf,
  getGroundMonitoringAlarmProtobuf,
  getGroupDefinitionProtobuf,
 } = require('common/stubs/data/lpisis');

const arraySize = 1000;
const numberIterationDecode = 15;
const tabPerfGlobal = [];

export default function perfTest() {
  tabPerfGlobal.push(testProtobuf('lpisis.file.Folder', getFolderProtobuf, arraySize, numberIterationDecode));
  tabPerfGlobal.push(testProtobuf('lpisis.decommutedParameter.ReportingParameter', getReportingParameterProtobuf, arraySize, numberIterationDecode));
  tabPerfGlobal.push(testProtobuf('lpisis.ccsds_mc_aggregation.IsisAggregation', getIsisAggregationProtobuf, arraySize, numberIterationDecode));
  tabPerfGlobal.push(testProtobuf('lpisis.computedEvent.ComputedEvent', getComputedEventProtobuf, arraySize, numberIterationDecode));
  tabPerfGlobal.push(testProtobuf('lpisis.file.Collection', getCollectionProtobuf, arraySize, numberIterationDecode));
  tabPerfGlobal.push(testProtobuf('lpisis.file.Document', getDocumentProtobuf, arraySize, numberIterationDecode));
  tabPerfGlobal.push(testProtobuf('lpisis.packet.ClcwPacket', getClcwPacketProtobuf, arraySize, numberIterationDecode));
  tabPerfGlobal.push(testProtobuf('lpisis.groundAlarm.GroundMonitoringAlarm', getGroundMonitoringAlarmProtobuf, arraySize, numberIterationDecode));
  tabPerfGlobal.push(testProtobuf('lpisis.ccsds_mc.GroupDefinition', getGroupDefinitionProtobuf, arraySize, numberIterationDecode));
}
