import globalConstants from 'common/constants';
import parseEntryPoint from './parseEntryPoint';

describe('dataManager/last/parseEntryPoint', () => {
  let timelines;
  let domains;
  let entryPoint;
  beforeEach(() => {
    entryPoint = {
      name: 'ATT_BC_STR1VOLTAGE',
      id: 'ep1',
      connectedData: {
        formula: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.extractedValue',
        domain: 'cnes',
        timeline: 'tl1',
        filter: {},
      },
    };
    timelines = [
      { id: 'tl1', sessionId: 'session1', offset: 0 },
      { id: 'tl2', sessionId: 'session2', offset: 10 },
      { id: 'other', sessionId: 'sessionOther', offset: -10 },
      { id: undefined, sessionId: 'invalid', offset: 0 },
    ];
    domains = [
      { domainId: 'd1', name: 'cnes' },
      { domainId: 'd2', name: 'cnes.isis' },
      { domainId: 'd3', name: 'cnes.isis.sat1' },
      { domainId: 'd4', name: 'cnes.isis.sat2' },
      { domainId: 'd5', name: 'cnes.isis.sat2.gun' },
      { domainId: 'invalid', name: undefined },
    ];
  });
  it('no connectedData', () => {
    const ep = parseEntryPoint(domains, timelines,
      { name: 'ATT_BC_STR1VOLTAGE', connectedData: { formula: '' } },
      'Session 1', 'TB1', 'TextView');
    ep.should.eql({ ATT_BC_STR1VOLTAGE: { error: 'unable to parse this connectedData formula ' } });
  });
  it('no timebarUuid', () => {
    const ep = parseEntryPoint(domains, timelines, entryPoint, 'Session 1', '', 'PlotView');
    ep.should.eql({ ATT_BC_STR1VOLTAGE: { error: 'No timebar associated with this entry point' } });
  });
  it('valid', () => {
    parseEntryPoint(domains, timelines, entryPoint, 'Session 1', 'TB1', 'TextView')
    .should.eql({
      ATT_BC_STR1VOLTAGE: {
        id: 'ep1',
        dataId: {
          catalog: 'Reporting',
          parameterName: 'ATT_BC_STR1VOLTAGE',
          comObject: 'ReportingParameter',
          domainId: 'd1',
          sessionId: 'session1',
        },
        field: 'extractedValue',
        offset: 0,
        filter: {},
        localId: 'extractedValue.TB1:0',
        timebarUuid: 'TB1',
        structureType: globalConstants.DATASTRUCTURETYPE_LAST,
        remoteId: 'last@Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>:session1:d1',
        type: 'TextView',
      },
    });
  });
  it('DecommutedPacket valid', () => {
    entryPoint.connectedData.formula =
      'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>';
    parseEntryPoint(domains, timelines, entryPoint, 'Session 1', 'TB1', 'DynamicView')
    .should.eql({
      ATT_BC_STR1VOLTAGE: {
        id: 'ep1',
        dataId: {
          catalog: 'TelemetryPacket',
          parameterName: 'CLCW_TM_NOMINAL',
          comObject: 'DecommutedPacket',
          domainId: 'd1',
          sessionId: 'session1',
        },
        field: undefined,
        offset: 0,
        filter: {},
        localId: 'undefined.TB1:0',
        timebarUuid: 'TB1',
        structureType: globalConstants.DATASTRUCTURETYPE_LAST,
        remoteId: 'last@TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:session1:d1',
        type: 'DynamicView',
      },
    });
  });
});
