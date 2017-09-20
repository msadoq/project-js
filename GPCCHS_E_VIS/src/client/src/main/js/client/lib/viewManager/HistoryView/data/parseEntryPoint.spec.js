import cloneDeep from 'lodash/cloneDeep';
import globalConstants from '../../../constants';
import parseEntryPoint from './parseEntryPoint';

describe('viewManager/HistoryView/data/parseEntryPoint', () => {
  let timelines;
  let domains;
  let entryPoint;
  let sessions;
  beforeEach(() => {
    entryPoint = {
      name: 'ATT_BC_STR1VOLTAGE',
      id: 'ep1',
      connectedData: {
        formula: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
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
  test('no connectedData', () => {
    const ep = parseEntryPoint(domains, sessions, timelines,
      { name: 'ATT_BC_STR1VOLTAGE', connectedData: { formula: '' } },
      'Session 1', 'TB1', 'HistoryView');
    expect(ep).toEqual(
      { ATT_BC_STR1VOLTAGE: { error: 'unable to parse this connectedData formula ' } }
    );
  });
  test('no timebarUuid', () => {
    const ep = parseEntryPoint(domains, sessions, timelines, entryPoint, 'Session 1', '', 'HistoryView');
    expect(ep).toEqual(
      { ATT_BC_STR1VOLTAGE: { error: 'No timebar associated with this entry point' } }
    );
  });
  test('valid', () => {
    expect(
      parseEntryPoint(domains, sessions, timelines, entryPoint, 'Session 1', 'TB1', 'HistoryView')
    ).toEqual({
      ATT_BC_STR1VOLTAGE: {
        id: 'ep1',
        dataId: {
          catalog: 'Reporting',
          parameterName: 'ATT_BC_STR1VOLTAGE',
          comObject: 'ReportingParameter',
          domainId: 'd1',
          domain: 'cnes',
          sessionId: 1,
          sessionName: 'session1',
        },
        offset: 0,
        filters: [],
        localId: 'undefined.TB1:0',
        timebarUuid: 'TB1',
        tbdId: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>:1:d1',
        type: 'HistoryView',
      },
    });
  });
  test('valid with filters', () => {
    const ep1 = cloneDeep(entryPoint);
    ep1.connectedData.filter.push({ field: 'raw', operator: '=', operand: '2' });

    expect(
      parseEntryPoint(domains, sessions, timelines, ep1, 'Session 1', 'TB1', 'HistoryView')
    ).toEqual({
      ATT_BC_STR1VOLTAGE: {
        id: 'ep1',
        dataId: {
          catalog: 'Reporting',
          parameterName: 'ATT_BC_STR1VOLTAGE',
          comObject: 'ReportingParameter',
          domainId: 'd1',
          domain: 'cnes',
          sessionId: 1,
          sessionName: 'session1',
        },
        offset: 0,
        filters: [{ field: 'raw', operator: '=', operand: '2' }],
        localId: 'undefined.TB1:0',
        timebarUuid: 'TB1',
        tbdId: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>:1:d1:raw.=.2',
        type: 'HistoryView',
      },
    });
  });
  test('wilcard => view data', () => {
    entryPoint.connectedData.timeline = '*';
    entryPoint.connectedData.domain = '*';
    expect(
      parseEntryPoint(domains, sessions, timelines, entryPoint, 'Session 1', 'TB1', 'HistoryView',
        'cnes.isis', undefined, undefined, 'session2')
    ).toEqual({
      ATT_BC_STR1VOLTAGE: {
        id: 'ep1',
        dataId: {
          catalog: 'Reporting',
          parameterName: 'ATT_BC_STR1VOLTAGE',
          comObject: 'ReportingParameter',
          domainId: 'd2',
          domain: 'cnes.isis',
          sessionId: 2,
          sessionName: 'session2',
        },
        offset: 0,
        filters: [],
        localId: 'undefined.TB1:0',
        timebarUuid: 'TB1',
        tbdId: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>:2:d2',
        type: 'HistoryView',
      },
    });
  });
  test('wilcard => page data', () => {
    entryPoint.connectedData.timeline = '*';
    entryPoint.connectedData.domain = '*';
    expect(
      parseEntryPoint(domains, sessions, timelines, entryPoint, 'Session 1', 'TB1', 'HistoryView',
        undefined, 'cnes.isis', undefined, undefined, 'session2')
    ).toEqual({
      ATT_BC_STR1VOLTAGE: {
        id: 'ep1',
        dataId: {
          catalog: 'Reporting',
          parameterName: 'ATT_BC_STR1VOLTAGE',
          comObject: 'ReportingParameter',
          domainId: 'd2',
          domain: 'cnes.isis',
          sessionId: 2,
          sessionName: 'session2',
        },
        offset: 0,
        filters: [],
        localId: 'undefined.TB1:0',
        timebarUuid: 'TB1',
        tbdId: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>:2:d2',
        type: 'HistoryView',
      },
    });
  });
  test('wilcard => workspace data', () => {
    entryPoint.connectedData.timeline = '*';
    entryPoint.connectedData.domain = '*';
    expect(
      parseEntryPoint(domains, sessions, timelines, entryPoint, 'Session 1', 'TB1', 'HistoryView',
        undefined, undefined, 'cnes.isis', undefined, undefined, 'session2')
    ).toEqual({
      ATT_BC_STR1VOLTAGE: {
        id: 'ep1',
        dataId: {
          catalog: 'Reporting',
          parameterName: 'ATT_BC_STR1VOLTAGE',
          comObject: 'ReportingParameter',
          domainId: 'd2',
          domain: 'cnes.isis',
          sessionId: 2,
          sessionName: 'session2',
        },
        offset: 0,
        filters: [],
        localId: 'undefined.TB1:0',
        timebarUuid: 'TB1',
        tbdId: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>:2:d2',
        type: 'HistoryView',
      },
    });
  });
});
