/* eslint no-unused-expressions: 0 */
import { } from '../../common/test';
import { getViewEntryPoint } from './views';

describe('store:views:selectors', () => {
  const completeState = {
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
        extUpperBound: 1420107500000,
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
        sessionId: 181,
        color: null,
      },
      tl2: {
        id: 'Session 2',
        offset: 0,
        kind: 'session',
        sessionId: 0,
        color: '#5254a3',
      },
    },
    timebarTimelines: {
      tb1: ['tl1', 'tl2'],
    },
    windows: {
      win1: {
        title: 'Sup/Sup workspace',
        focusedPage: 'page1',
        pages: [
          'page1',
        ],
      },
    },
    pages: {
      page1: {
        uuid: 'page1',
        title: 'page Sup/Sup workspace',
        timebarUuid: 'tb1',
        views: [
          'text1',
          'plot1',
          'dynamic1',
        ],
      },
    },
    views: {
      text1: {
        uuid: 'text1',
        type: 'TextView',
        configuration: {
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
      plot1: {
        uuid: 'plot1',
        type: 'PlotView',
        configuration: {
          type: 'PlotView',
          entryPoints: [
            {
              name: 'STAT_SU_PID',
              id: 'id60',
              connectedDataX: {
                formula: 'Reporting.STAT_SU_PID<ReportingParameter>.groundDate',
                filter: [],
                domain: 'fr.cnes.isis.simupus',
                timeline: 'Session 1',
              },
              connectedDataY: {
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
            {
              name: 'STAT_PARAMETRIC',
              connectedDataX: {
                formula: 'Reporting.STAT_SU_PID<ReportingParameter>.groundDate',
                filter: [],
                domain: 'fr.cnes.isis.simupus',
                timeline: 'Session 1',
              },
              connectedDataY: {
                formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
                filter: [],
                domain: 'fr.cnes.isis',
                timeline: 'Session 1',
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
            },
          ],
          title: 'Plotview Sup/Sup workspace',
        },
      },
      dynamic1: {
        uuid: 'dynamic1',
        type: 'DynamicView',
        configuration: {
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
        name: 'Session#42',
        id: 42,
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

  it('getViewEntryPoint', () => {
    getViewEntryPoint(completeState, { viewId: 'text1', epName: 'STAT_SU_PID' }).should.eql({
      id: 'id1',
      dataId: {
        catalog: 'Reporting',
        parameterName: 'STAT_SU_PID',
        comObject: 'ReportingParameter',
        domainId: 4,
        sessionId: 181,
      },
      field: 'extractedValue',
      offset: 0,
      filter: [],
      localId: 'extractedValue.tb1:0',
      timebarUuid: 'tb1',
      structureType: 'last',
      remoteId: 'last@Reporting.STAT_SU_PID<ReportingParameter>:181:4',
      type: 'TextView',
      name: 'STAT_SU_PID',
    });
  });
});
