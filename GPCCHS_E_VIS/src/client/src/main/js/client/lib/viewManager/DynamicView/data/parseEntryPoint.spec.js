import globalConstants from 'common/constants';
import parseEntryPoint from './parseEntryPoint';

describe('viewManager/DynamicView/data/parseEntryPoint', () => {
  let timelines;
  let domains;
  let entryPoint;
  let sessions;
  beforeEach(() => {
    entryPoint = {
      name: 'ATT_BC_STR1VOLTAGE',
      id: 'ep1',
      connectedData: {
        formula: 'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>',
        domain: 'cnes',
        timeline: 'tl1',
        filter: [],
      },
    };
    timelines = [
      { id: 'tl1', sessionName: 'session1', offset: 0 },
      { id: 'tl2', sessionName: 'session2', offset: 10 },
      { id: 'other', sessionName: 'sessionOther', offset: -10 },
      { id: undefined, sessionName: 'invalid', offset: 0 },
    ];
    sessions = [
      { name: 'session1', id: 1 },
      { name: 'session2', id: 2 },
      { name: 'sessionOther', id: 3 },
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
    const ep = parseEntryPoint(domains, sessions, timelines,
      { name: 'ATT_BC_STR1VOLTAGE', connectedData: { formula: '' } },
      'Session 1', 'TB1', 'TextView');
    ep.should.eql({ ATT_BC_STR1VOLTAGE: { error: 'unable to parse this connectedData formula ' } });
  });
  it('no timebarUuid', () => {
    const ep = parseEntryPoint(domains, sessions, timelines, entryPoint, 'Session 1', '', 'PlotView');
    ep.should.eql({ ATT_BC_STR1VOLTAGE: { error: 'No timebar associated with this entry point' } });
  });
  it('DecommutedPacket valid', () => {
    parseEntryPoint(domains, sessions, timelines, entryPoint, 10, 'TB1', 'DynamicView')
    .should.eql({
      ATT_BC_STR1VOLTAGE: {
        id: 'ep1',
        dataId: {
          catalog: 'TelemetryPacket',
          parameterName: 'CLCW_TM_NOMINAL',
          comObject: 'DecommutedPacket',
          domainId: 'd1',
          domain: 'cnes',
          sessionId: 1,
          sessionName:'session1',
        },
        offset: 0,
        localId: 'undefined.TB1:0',
        timebarUuid: 'TB1',
        remoteId: 'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:1:d1',
        type: 'DynamicView',
      },
    });
  });
});
