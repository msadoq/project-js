// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Update some tests . . .
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Modify cachecleanup middleware and its test
// END-HISTORY
// ====================================================================

import configureMockStore from 'redux-mock-store';
import cleanCache from './cacheCleanUp';
import lokiManager from '../../../serverProcess/models/lokiKnownRangesData';

const { mockRegister, mockLoadStubs } = require('../../../common/jest');

const cleanTrigger = 1;
mockRegister();
mockLoadStubs();
const mockStore = configureMockStore([cleanCache(cleanTrigger, lokiManager)]);

const store1 = {
  timebars: {
    tb1: {
      id: 'TB1',
      visuWindow: {
        lower: 7,
        upper: 28,
        current: 12,
        defaultWidth: 900000,
      },
      playingState: 'pause',
      masterId: 'Session 2',
      mode: 'Normal',
    },
  },
  knownRanges: {
    'Reporting.STAT_SU_PID<ReportingParameter>:1:1': {
      flatDataId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
      filters: [],
      intervals: [[10, 20], [30, 40]],
    },
    'Reporting.STAT_SU_PID<ReportingParameter>:1:1:extracted.>.1': {
      flatDataId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
      filters: [],
      intervals: [[10, 20], [50, 60]],
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
  },
  timebarTimelines: {
    tb1: ['tl1'],
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
        'mimic1',
      ],
    },
  },
  MimicViewConfiguration: {
    mimic1: {
      title: 'MimicView Sup/Sup',
      type: 'MimicView',
      entryPoints: [{
        name: 'STAT_SU_PID',
        id: 'id1',
        connectedData: {
          formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
          filter: [],
          domain: 'fr.cnes.isis.simupus',
          timeline: 'Session 1',
        },
      }],
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
          name: 'STAT_SU_PID2',
          id: 'id60',
          connectedData: {
            fieldX: 'groundDate',
            formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
            filter: [{
              field: 'extractedValue',
              operator: '>',
              operand: '1',
            }],
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
    mimic1: {
      type: 'MimicView',
    },
  },
  domains: [
    {
      itemNamespace: 'Domains',
      name: 'fr.cnes.isis.simupus',
      oid: '0051525005151000565215465660515',
      domainId: 1,
      parentDomainId: 1,
    },
  ],
  sessions: [
    {
      name: 'Session#181',
      id: 1,
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

const lambdaAction = () => ({
  type: 'LAMBDA',
});
describe('cacheCleanup', () => {
  const store = mockStore(store1);
  const data = [{
    timestamp: 5,
    payload: 'payload',
  },
  {
    timestamp: 12,
    payload: 'payload',
  },
  {
    timestamp: 25,
    payload: 'payload',
  },
  {
    timestamp: 35,
    payload: 'payload',
  },
  {
    timestamp: 45,
    payload: 'payload',
  }];
  test('cacheClean', () => {
    lokiManager.addRecords('Reporting.STAT_SU_PID<ReportingParameter>:1:1', data);
    store.dispatch(lambdaAction());
    expect(lokiManager.displayCollection('Reporting.STAT_SU_PID<ReportingParameter>:1:1'))
    .toMatchObject([
      {
        timestamp: 12,
      }, {
        timestamp: 25,
      }]);
  });
});
