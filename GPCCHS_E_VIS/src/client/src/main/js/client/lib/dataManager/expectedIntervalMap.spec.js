import u from 'updeep';
import '../common/test';
import expectedIntervalSelector, { intervalPerRemoteId, expectedIntervalMap } from './expectedIntervalMap';


describe('dataManager/expectedIntervalMap', () => {
  let state;
  beforeEach(() => {
    state = {
      timebars: {
        tb1: {
          id: 'TB1',
          visuWindow: {
            lower: 1420106790818,
            upper: 1420107056239,
            current: 1420106843902,
            defaultWidth: 900000,
          },
          slideWindow: {
            lower: 1420106702345,
            upper: 1420107144713,
          },
          rulerStart: 1420106041002,
          rulerResolution: 1298.7675070010687,
          speed: 1,
          playingState: 'pause',
          masterId: 'Session 2',
          mode: 'Normal',
        },
      },
      timelines: {
        tl1: {
          id: 'Session 1',
          offset: 0,
          sessionName: 'session#42',
        },
        tl2: {
          id: 'Session 2',
          offset: 0,
          sessionName: 'Master',
        },
      },
      timebarTimelines: {
        tb1: ['tl1', 'tl2'],
      },
      pages: {
        page1: {
          title: 'page Sup/Sup workspace',
          timebarUuid: 'tb1',
          views: ['v1', 'v2'],
        },
      },
      views: {
        v1: {
          type: 'TextView',
          configuration: {
            title: 'TextView Sup/Sup',
            type: 'TextView',
            entryPoints: [{
              name: 'STAT_SU_PID',
              id: 'id1',
              connectedData: {
                formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
                filter: [],
                domain: 'fr.cnes.isis.simupus',
                timeline: 'Session 1',
              },
            }, {
              name: 'STAT_WILDCARD_TIMELINE',
              id: 'id46',
              connectedData: {
                formula: 'Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>.extractedValue',
                filter: [],
                domain: 'fr.cnes.isis.simupus',
                timeline: '*',
              },
            }, {
              name: 'STAT_UNKNOW_DOMAIN',
              id: 'id47',
              connectedData: {
                formula: 'Reporting.STAT_UNKNOW_DOMAIN<ReportingParameter>.extractedValue',
                filter: [],
                domain: 'fr',
                timeline: 'Session 1',
              },
            }, {
              name: 'STAT_WILDCARD_DOMAIN',
              id: 'id48',
              connectedData: {
                formula: 'Reporting.STAT_WILDCARD_DOMAIN<ReportingParameter>.extractedValue',
                filter: [],
                domain: '*',
                timeline: 'Session 1',
              },
            }, {
              name: 'STAT_EMPTY_DOMAIN',
              id: 'id49',
              connectedData: {
                formula: 'Reporting.STAT_EMPTY_DOMAIN<ReportingParameter>.extractedValue',
                filter: [],
                domain: '',
                timeline: 'Session 1',
              },
            }, {
              name: 'STAT_UNKNOW_TIMELINE',
              id: 'id50',
              connectedData: {
                formula: 'Reporting.STAT_UNKNOW_TIMELINE<ReportingParameter>.extractedValue',
                filter: [],
                domain: 'fr.cnes.isis.simupus',
                timeline: 'Session X',
              },
            }, {
              name: 'STAT_EMPTY_TIMELINE',
              id: 'id51',
              connectedData: {
                formula: 'Reporting.STAT_EMPTY_TIMELINE<ReportingParameter>.extractedValue',
                filter: [],
                domain: 'fr.cnes.isis.simupus',
                timeline: '',
              },
            }, {
              name: 'STAT_INVALID_FORMULA',
              id: 'id52',
              connectedData: {
                formula: 'Reporting.STAT_INVALID_FORMULA',
                filter: [],
                domain: 'fr.cnes.isis.simupus',
                timeline: 'Session 1',
              },
            }],
          },
        },
        v2: {
          type: 'PlotView',
          configuration: {
            type: 'PlotView',
            entryPoints: [{
              name: 'STAT_SU_PID',
              id: 'id60',
              connectedData: {
                formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
                fieldX: 'groundDate',
                filter: [],
                domain: 'fr.cnes.isis.simupus',
                timeline: 'Session 1',
              },
              stateColors: [{
                color: '#000000',
                condition: {
                  field: 'monitoringState',
                  operator: '==',
                  operand: 'waiting',
                },
              }],
            }, {
              name: 'STAT_PARAMETRIC',
              connectedData: {
                formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
                fieldX: 'extractedValue',
                filter: [],
                domain: 'fr.cnes.isis',
                timeline: 'Session 1',
              },
              stateColors: [{
                color: '#000000',
                condition: {
                  field: 'monitoringState',
                  operator: '==',
                  operand: 'waiting',
                },
              }],
            }],
            title: 'Plotview Sup/Sup workspace',
          },
        },
      },
      domains: [{
        itemNamespace: 'Domains',
        name: 'fr.cnes.isis',
        oid: 'dom2',
        domainId: 1,
        parentDomainId: 0,
      }, {
        itemNamespace: 'Domains',
        name: 'fr.cnes.isis.simupus',
        oid: 'dom1',
        domainId: 4,
        parentDomainId: 1,
      }],
      sessions: [{
        name: 'Master',
        id: 0,
        timestamp: {
          ms: 1480426701831,
          ps: null,
        },
        delta: 0,
        offsetWithmachineTime: 2373665,
      }, {
        name: 'Session#181',
        id: 181,
        timestamp: {
          ms: 1480426701831,
          ps: null,
        },
        delta: 42,
        offsetWithmachineTime: 2373665,
      }],
      masterSession: {
        sessionId: 10,
      },
    };
  });

  const epValid = {
    id: 'id60',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_PID',
      comObject: 'ReportingParameter',
      domainId: 4,
      domain: 'fr.cnes.isis.simupus',
      sessionName: 'Session#181',
      sessionId: 181,
    },
    fieldX: 'groundDate',
    fieldY: 'extractedValue',
    offset: 0,
    filter: [],
    localId: 'groundDate/extractedValue.tb1:0/0',
    timebarUuid: 'tb1',
    structureType: 'range',
    remoteId: 'range@Reporting.STAT_SU_PID<ReportingParameter>:181:4',
    type: 'PlotView',
  };
  const epValidData = {
    dataId: epValid.dataId,
    filter: epValid.filter,
    localIds: {
      [epValid.localId]: {
        fieldX: epValid.fieldX,
        fieldY: epValid.fieldY,
        offset: epValid.offset,
        timebarUuid: epValid.timebarUuid,
        viewType: 'PlotView',
      },
      'onBoardDate/rawValue.tb1:10/10': {
        fieldX: 'onBoardDate',
        fieldY: 'rawValue',
        offset: 10,
        timebarUuid: epValid.timebarUuid,
        viewType: 'PlotView',
      },
    },
    structureType: epValid.structureType,
    views: ['plot1'],
  };
  const perRemoteIdMap = {
    'last@Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
      structureType: 'last',
      dataId: {
        catalog: 'Reporting',
        parameterName: 'STAT_SU_PID',
        comObject: 'ReportingParameter',
        domainId: 4,
        domain: 'fr.cnes.isis.simupus',
        sessionId: 181,
        sessionName: 'Session#181',
      },
      filter: [],
      localIds: {
        'extractedValue.tb1:0': {
          field: 'extractedValue',
          offset: 0,
          timebarUuid: 'tb1',
          viewType: 'TextView',
        },
      },
      views: ['text'],
    },
    'last@Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:10:4': {
      structureType: 'last',
      dataId: {
        catalog: 'Reporting',
        parameterName: 'STAT_WILDCARD_TIMELINE',
        comObject: 'ReportingParameter',
        domainId: 4,
        domain: 'fr.cnes.isis.simupus',
        sessionId: 10,
      },
      filter: [],
      localIds: {
        'extractedValue.tb1:0': {
          field: 'extractedValue',
          offset: 0,
          timebarUuid: 'tb1',
          viewType: 'TextView',
        },
      },
      views: ['text'],
    },
    'range@Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
      structureType: 'range',
      dataId: {
        catalog: 'Reporting',
        parameterName: 'STAT_SU_PID',
        comObject: 'ReportingParameter',
        domainId: 4,
        domain: 'fr.cnes.isis.simupus',
        sessionId: 181,
        sessionName: 'Session#181',
      },
      filter: [],
      localIds: {
        'groundDate/extractedValue.tb1:0/0': {
          fieldX: 'groundDate',
          fieldY: 'extractedValue',
          offset: 0,
          timebarUuid: 'tb1',
          viewType: 'PlotView',
        },
      },
      views: ['plot'],
    },
  };

  it('One remoteIdData ok', () => {
    intervalPerRemoteId(state.timebars, epValidData).should.eql({
      'groundDate/extractedValue.tb1:0/0': {
        expectedInterval: [1420106790818, 1420107056239],
      },
      'onBoardDate/rawValue.tb1:10/10': {
        expectedInterval: [1420106790808, 1420107056229],
      },
    });
  });
  it('invalid timebarUuid', () => {
    epValidData.localIds['onBoardDate/rawValue.tb1:10/10'].timebarUuid = 'invalid';
    intervalPerRemoteId(state.timebars, epValidData).should.eql({
      'groundDate/extractedValue.tb1:0/0': {
        expectedInterval: [1420106790818, 1420107056239],
      },
      'onBoardDate/rawValue.tb1:10/10': {
        error: 'invalid timebar',
      },
    });
  });
  it('perRemoteIdMap empty', () => {
    expectedIntervalMap(state.timebars, {}).should.eql({});
  });
  it('perRemoteIdMap valid', () => {
    expectedIntervalMap(state.timebars, perRemoteIdMap).should.eql({
      'last@Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
        'extractedValue.tb1:0': {
          expectedInterval: [1420106790818, 1420106843902],
        },
      },
      'last@Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:10:4': {
        'extractedValue.tb1:0': {
          expectedInterval: [1420106790818, 1420106843902],
        },
      },
      'range@Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
        'groundDate/extractedValue.tb1:0/0': {
          expectedInterval: [1420106790818, 1420107056239],
        },
      },
    });
  });
  it('memoization', () => {
    expectedIntervalSelector.resetRecomputations();
    expectedIntervalSelector(state, { perRemoteIdMap });
    expectedIntervalSelector.recomputations().should.eql(1);
    expectedIntervalSelector(state, { perRemoteIdMap });
    expectedIntervalSelector.recomputations().should.eql(1);
    const newState = u({ timebars: { tb1: { visuWindow: { lower: 1420106790828 } } } }, state);
    expectedIntervalSelector(newState, { perRemoteIdMap }).should.eql({
      'last@Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
        'extractedValue.tb1:0': {
          expectedInterval: [1420106790828, 1420106843902],
        },
      },
      'last@Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:10:4': {
        'extractedValue.tb1:0': {
          expectedInterval: [1420106790828, 1420106843902],
        },
      },
      'range@Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
        'groundDate/extractedValue.tb1:0/0': {
          expectedInterval: [1420106790828, 1420107056239],
        },
      },
    });
    expectedIntervalSelector.recomputations().should.eql(2);
  });
});
