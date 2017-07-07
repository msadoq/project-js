import u from 'updeep';
import map, { getPerRemoteIdMap, getPerViewMap } from './map';

global.testConfig.DEFAULT_FIELD = JSON.stringify({ ReportingParameter: 'extractedValue' });

describe('data:map', () => {
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
          kind: 'Session',
          sessionName: 'Session#181',
          color: null,
        },
        tl2: {
          id: 'Session 2',
          offset: 0,
          kind: 'session',
          sessionId: 'Master',
          color: '#5254a3',
        },
      },
      timebarTimelines: {
        tb1: ['tl1', 'tl2'],
      },
      windows: {
        win1: {
          isLoaded: true,
          title: 'Sup/Sup workspace',
          focusedPage: 'page1',
          pages: [
            'page1',
          ],
        },
      },
      pages: {
        page1: {
          title: 'page Sup/Sup workspace',
          timebarUuid: 'tb1',
          views: [
            'text1',
            'plot1',
            'dynamic1',
          ],
        },
      },
      TextViewConfiguration: {
        text1: {
          title: 'TextView Sup/Sup',
          type: 'TextView',
          entryPoints: [
            {
              name: 'STAT_SU_PID',
              id: 'id1',
              connectedData: {
                formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
                filter: [],
                domain: 'fr.cnes.isis.simupus',
                timeline: 'Session 1',
              },
            },
            {
              name: 'STAT_UNKNOW_DOMAIN',
              id: 'id47',
              connectedData: {
                formula: 'Reporting.STAT_UNKNOW_DOMAIN<ReportingParameter>.extractedValue',
                filter: [],
                domain: 'fr',
                timeline: 'Session 1',
              },
            },
            {
              name: 'STAT_UNKNOW_TIMELINE',
              id: 'id50',
              connectedData: {
                formula: 'Reporting.STAT_UNKNOW_TIMELINE<ReportingParameter>.extractedValue',
                filter: [],
                domain: 'fr.cnes.isis.simupus',
                timeline: 'Session X',
              },
            },
          ],
        },
      },
      PlotViewConfiguration: {
        plot1: {
          entryPoints: [
            {
              name: 'STAT_SU_PID',
              id: 'id60',
              connectedData: {
                formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
                fieldX: 'groundDate',
                filter: [],
                domain: 'fr.cnes.isis.simupus',
                timeline: 'Session 1',
              },
              stateColors: [
                {
                  color: '#000000',
                  condition: {
                    field: 'extractedValue',
                    operator: '>',
                    operand: '1',
                  },
                },
              ],
            },
            {
              name: 'STAT_SU_PID',
              id: 'id60',
              // connectedDataX: {
              //   formula: 'Reporting.STAT_SU_PID<ReportingParameter>.groundDate',
              //   filter: [],
              //   domain: 'fr.cnes.isis.simupus',
              //   timeline: 'Session 1',
              // },
              connectedData: {
                fieldX: 'groundDate',
                formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
                filter: [],
                domain: 'fr.cnes.isis.simupus',
                timeline: 'Session 1',
              },
              stateColors: [
                {
                  color: '#000000',
                  condition: {
                    field: 'extractedValue',
                    operator: '>',
                    operand: '1',
                  },
                },
              ],
            },
            // {
            //   name: 'STAT_PARAMETRIC',
            //   connectedData: {
            //     formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
            //     fieldX: 'groundDate',
            //     filter: [],
            //     domain: 'fr.cnes.isis',
            //     timeline: 'Session 1',
            //   },
            //   stateColors: [
            //     {
            //       color: '#000000',
            //       condition: {
            //         field: 'monitoringState',
            //         operator: '==',
            //         operand: 'waiting',
            //       },
            //     },
            //   ],
            // },
          ],
          title: 'Plotview Sup/Sup workspace',
        },
      },
      DynamicViewConfiguration: {
        dynamic1: {
          type: 'DynamicView',
          entryPoints: [{
            connectedData: {
              formula: 'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1',
            },
            name: 'dynamicEP',
            id: 'id70',
            stateColors: [{
              color: '#000000',
              condition: {
                field: 'monitoringState',
                operator: '==',
                operand: 'waiting',
              },
            }],
          }],
        },
      },
      views: {
        text1: {
          type: 'TextView',
        },
        plot1: {
          type: 'PlotView',
        },
        dynamic1: {
          type: 'DynamicView',
        },
      },
      domains: [
        {
          itemNamespace: 'Domains',
          name: 'fr.cnes.isis',
          oid: '0051525005151000565215465660515',
          domainId: 1,
          parentDomainId: 0,
        },
        {
          itemNamespace: 'Domains',
          name: 'fr.cnes.isis.simupus',
          oid: '0051525005151000565215465660515',
          domainId: 4,
          parentDomainId: 1,
        },
      ],
      sessions: [
        {
          name: 'Master',
          id: 0,
          timestamp: {
            ms: 1480426701831,
            ps: null,
          },
          delta: 0,
          offsetWithmachineTime: 2373665,
        },
        {
          name: 'Session#181',
          id: 181,
          timestamp: {
            ms: 1480426701831,
            ps: null,
          },
          delta: 42,
          offsetWithmachineTime: 2373665,
        },
      ],
      masterSession: {
        sessionId: 10,
      },
    };
  });
  const dataMap = {
    'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4': {
      dataId: {
        catalog: 'TelemetryPacket',
        parameterName: 'CLCW_TM_NOMINAL',
        comObject: 'DecommutedPacket',
        domainId: 4,
        domain: 'fr.cnes.isis.simupus',
        sessionId: 181,
        sessionName: 'Session#181',
      },
      views: ['dynamic1'],
      localIds: {
        'undefined.tb1:0:#000000.monitoringState.==.waiting': {
          timebarUuid: 'tb1',
          offset: 0,
          viewType: 'DynamicView',
        },
      },
    },
    'Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
      dataId: {
        catalog: 'Reporting',
        parameterName: 'STAT_SU_PID',
        comObject: 'ReportingParameter',
        domainId: 4,
        domain: 'fr.cnes.isis.simupus',
        sessionId: 181,
        sessionName: 'Session#181',
      },
      views: ['text1', 'plot1'],
      filters: [],
      localIds: {
        'groundDate/extractedValue.tb1:0': {
          fieldX: 'groundDate',
          fieldY: 'extractedValue',
          timebarUuid: 'tb1',
          offset: 0,
          viewType: 'PlotView',
        },
        'extractedValue.tb1:0': {
          field: 'extractedValue',
          timebarUuid: 'tb1',
          offset: 0,
          viewType: 'TextView',
        },
      },
    },
  };
  const viewMap = {
    text1: {
      type: 'TextView',
      entryPoints: {
        STAT_SU_PID: {
          id: 'id1',
          dataId: {
            catalog: 'Reporting',
            parameterName: 'STAT_SU_PID',
            comObject: 'ReportingParameter',
            domainId: 4,
            domain: 'fr.cnes.isis.simupus',
            sessionId: 181,
            sessionName: 'Session#181',
          },
          field: 'extractedValue',
          offset: 0,
          filters: [],
          localId: 'extractedValue.tb1:0',
          timebarUuid: 'tb1',
          remoteId: 'Reporting.STAT_SU_PID<ReportingParameter>:181:4',
          type: 'TextView',
        },
        STAT_UNKNOW_DOMAIN: {
          error: 'invalid entry point, no domain matches',
        },
        STAT_UNKNOW_TIMELINE: {
          error: 'invalid entry point, no timeline matches',
        },
      },
    },
    plot1: {
      type: 'PlotView',
      entryPoints: {
        STAT_SU_PID: {
          id: 'id60',
          dataId: {
            catalog: 'Reporting',
            parameterName: 'STAT_SU_PID',
            comObject: 'ReportingParameter',
            domainId: 4,
            domain: 'fr.cnes.isis.simupus',
            sessionId: 181,
            sessionName: 'Session#181',
          },
          fieldX: 'groundDate',
          fieldY: 'extractedValue',
          offset: 0,
          filters: [],
          localId: 'groundDate/extractedValue.tb1:0',
          timebarUuid: 'tb1',
          remoteId: 'Reporting.STAT_SU_PID<ReportingParameter>:181:4',
          type: 'PlotView',
          stateColors: [{
            color: '#000000',
            condition: {
              field: 'extractedValue',
              operator: '>',
              operand: '1',
            },
          }],
        },
        // STAT_PARAMETRIC: { error: 'parametric entryPoint detected for this view' },
      },
    },
    dynamic1: {
      type: 'DynamicView',
      entryPoints: {
        dynamicEP: {
          id: 'id70',
          dataId: {
            catalog: 'TelemetryPacket',
            parameterName: 'CLCW_TM_NOMINAL',
            comObject: 'DecommutedPacket',
            domainId: 4,
            domain: 'fr.cnes.isis.simupus',
            sessionId: 181,
            sessionName: 'Session#181',
          },
          offset: 0,
          localId: 'undefined.tb1:0:#000000.monitoringState.==.waiting',
          timebarUuid: 'tb1',
          remoteId: 'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4',
          type: 'DynamicView',
          stateColors: [{
            color: '#000000',
            condition: {
              field: 'monitoringState',
              operator: '==',
              operand: 'waiting',
            },
          }],
        },
      },
    },
  };

  const intervalMap = {
    'Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
      'extractedValue.tb1:0': {
        expectedInterval: [1420106790818, 1420106843902],
      },
      'groundDate/extractedValue.tb1:0': {
        expectedInterval: [1420106790818, 1420107056239],
      },
    },
    'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4': {
      'undefined.tb1:0:#000000.monitoringState.==.waiting': {
        expectedInterval: [1420106790818, 1420106843902],
      },
    },
  };
  test('should compute dataMap', () => {
    const r = map(state);
    expect(r.perRemoteId).toEqual(dataMap);
    expect(r.perView).toEqual(viewMap);
    expect(r.expectedIntervals).toEqual(intervalMap);
  });
  test('memoization map', () => {
    map.resetRecomputations();
    getPerRemoteIdMap.resetRecomputations();
    getPerViewMap.resetRecomputations();
    expect(map.recomputations()).toEqual(0);
    map(state);
    expect(map.recomputations()).toEqual(1);
    map(state);
    expect(map.recomputations()).toEqual(1);
    const newState = u({ timebars: { tb1: { visuWindow: { lower: 1420106790838 } } } }, state);
    map(newState);
    // Only intervals have to be recomputed
    expect(map.recomputations()).toEqual(2);
    expect(getPerRemoteIdMap.recomputations()).toEqual(1);
    expect(getPerViewMap.recomputations()).toEqual(1);
  });
});
