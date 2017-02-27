import globalConstants from 'common/constants';
import parseEntryPoint from './parseEntryPoint';

describe('dataManager/range/parseEntryPoint', () => {
  let timelines;
  let domains;
  let entryPoint;
  beforeEach(() => {
    entryPoint = {
      name: 'ATT_BC_STR1VOLTAGE',
      id: 'ep1',
      connectedDataX: {
        formula: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.groundDate',
        domain: 'cnes',
        timeline: 'tl1',
        filter: {},
      },
      connectedDataY: {
        formula: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.extractedValue',
        domain: 'cnes',
        timeline: 'tl1',
        filter: {},
      },
      stateColors: [
        {
          color: '#000000',
          condition: {
            field: 'monitoringState',
            operator: '==',
            operand: 'waiting',
          },
        },
      ],
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
    entryPoint.connectedDataX = { formula: '' };
    const ep = parseEntryPoint(domains, timelines, entryPoint, 'Session 1', 'TB1', 'TextView');
    ep.should.eql({ ATT_BC_STR1VOLTAGE: { error: 'unable to parse this connectedData formula ' } });
  });
  it('no timebarUuid', () => {
    const ep = parseEntryPoint(domains, timelines, entryPoint, 'Session 1', '', 'TextView');
    ep.should.eql({ ATT_BC_STR1VOLTAGE: { error: 'No timebar associated with this entry point' } });
  });
  it('valid', () => {
    parseEntryPoint(domains, timelines, entryPoint, 'Session 1', 'TB1', 'PlotView')
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
        fieldX: 'groundDate',
        fieldY: 'extractedValue',
        offset: 0,
        filter: {},
        localId: 'groundDate/extractedValue.TB1:0/0',
        timebarUuid: 'TB1',
        structureType: globalConstants.DATASTRUCTURETYPE_RANGE,
        remoteId: 'range@Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>:session1:d1',
        type: 'PlotView',
        stateColors: [
          {
            color: '#000000',
            condition: {
              field: 'monitoringState',
              operator: '==',
              operand: 'waiting',
            },
          },
        ],
      },
    });
  });
});
