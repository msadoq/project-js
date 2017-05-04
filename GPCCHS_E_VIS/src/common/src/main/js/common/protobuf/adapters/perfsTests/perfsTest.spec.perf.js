/* eslint-disable no-console*/
const assert = require('assert');
const { testProtobuf } = require('./index');
const { getReportingParameterProtobuf,
  getIsisAggregationProtobuf,
  getComputedEventProtobuf,
  getCollectionProtobuf,
  getDocumentProtobuf,
  getClcwPacketProtobuf,
  getFolderProtobuf,
  getGroundMonitoringAlarmProtobuf,
  getGroupDefinitionProtobuf,
 } = require('../../../stubs/data/lpisis');

const arraySize = 1000;
const numberIterationDecode = 15;
const tabPerfGlobal = [];

const renderGlobalPerf = () => {
  tabPerfGlobal.sort(comparePerf);
  console.log('--- GLOBAL PERF ON DECODING PROTOBUFF ---\n');
  console.log('# Average on %d iterations, on a batch of %d encoded protobuff', numberIterationDecode, arraySize);
  console.log('# Results ordered by descending ratio of [WITH ADAPTERS/WITHOUT ADAPTERS]\n');
  tabPerfGlobal.map((perf, index) => (console.log('%d - [%s] : %d of ratio', index, perf.type, perf.avg)));
};

const comparePerf = (a, b) => (b.avg - a.avg);

describe('Test performance deprotobuff', () => {
  it('Test ReportingParameter', function () { // eslint-disable-line
    this.timeout(0);
    const perf = testProtobuf('lpisis.decommutedParameter.ReportingParameter', getReportingParameterProtobuf, arraySize, numberIterationDecode);
    tabPerfGlobal.push(perf);
    assert(true);
  });

  it('Test IsisAgregation', function () { // eslint-disable-line
    this.timeout(0);
    const perf = testProtobuf('lpisis.ccsds_mc_aggregation.IsisAggregation', getIsisAggregationProtobuf, arraySize, numberIterationDecode);
    tabPerfGlobal.push(perf);
    assert(true);
  });

  it('Test ComputedEvent', function () { // eslint-disable-line
    this.timeout(0);
    const perf = testProtobuf('lpisis.computedEvent.ComputedEvent', getComputedEventProtobuf, arraySize, numberIterationDecode);
    tabPerfGlobal.push(perf);
    assert(true);
  });

  it('Test Collection', function () { // eslint-disable-line
    this.timeout(0);
    const perf = testProtobuf('lpisis.file.Collection', getCollectionProtobuf, arraySize, numberIterationDecode);
    tabPerfGlobal.push(perf);
    assert(true);
  });

  it('Test Document', function () { // eslint-disable-line
    this.timeout(0);
    const perf = testProtobuf('lpisis.file.Document', getDocumentProtobuf, arraySize, numberIterationDecode);
    tabPerfGlobal.push(perf);
    assert(true);
  });

  it('Test ClcwPacket', function () { // eslint-disable-line
    this.timeout(0);
    const perf = testProtobuf('lpisis.packet.ClcwPacket', getClcwPacketProtobuf, arraySize, numberIterationDecode);
    tabPerfGlobal.push(perf);
    assert(true);
  });

  it('Test Folder', function () { // eslint-disable-line
    this.timeout(0);
    const perf = testProtobuf('lpisis.file.Folder', getFolderProtobuf, arraySize, numberIterationDecode);
    tabPerfGlobal.push(perf);
    assert(true);
  });

  it('Test GroundMonitoringAlarm', function () { // eslint-disable-line
    this.timeout(0);
    const perf = testProtobuf('lpisis.groundAlarm.GroundMonitoringAlarm', getGroundMonitoringAlarmProtobuf, arraySize, numberIterationDecode);
    tabPerfGlobal.push(perf);
    assert(true);
  });

  it('Test GroundMonitoringAlarm', function () { // eslint-disable-line
    this.timeout(0);
    const perf = testProtobuf('lpisis.ccsds_mc.GroupDefinition', getGroupDefinitionProtobuf, arraySize, numberIterationDecode);
    tabPerfGlobal.push(perf);
    assert(true);
  });
  after(renderGlobalPerf);
});


/* eslint-enable no-console */
