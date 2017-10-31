import configureMockStore from 'redux-mock-store';
import injectData from './injectData';
import * as types from '../../types';
import dataMapGenerator from '../../../dataManager/map';


const { mockRegister, mockLoadStubs } = require('../../../common/jest');

mockRegister();
mockLoadStubs();
const mockStore = configureMockStore([injectData()]);

const store1 = {
  timebars: {
    tb1: {
      id: 'TB1',
      visuWindow: {
        lower: 1420106790818,
        upper: 1420107056239,
        current: 1420106843902,
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
      intervals: [[10, 20], [1420106790800, 1420106790850]],
    },
    'Reporting.STAT_SU_PID<ReportingParameter>:1:1:extracted.>.1': {
      flatDataId: 'Reporting.STAT_SU_PID<ReportingParameter>:1:1',
      filters: [],
      intervals: [[10, 20], [1420106790800, 1420106790850]],
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
        //         operator: '=',
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
            operator: '=',
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

describe('store:middlewares:injectData', () => {
  const timestamp = '1502433311413';
  const data = {
    'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4': {
      [timestamp]: {
        truc: 'truc',
      },
    },
  };
  const injectNewData = () => ({
    type: types.NEW_DATA,
    payload: {
      data,
    },
  });

  test('First inject : no previous dataMap', () => {
    const store = mockStore(store1);
    const dataMap = dataMapGenerator(store);
    store.dispatch(injectNewData());
    const actions = store.getActions();
    expect(actions[1]).toHaveProperty('type', 'INJECT_DATA_RANGE');
    expect(actions[1].payload.oldViewMap).toMatchObject({});
    expect(actions[1].payload.newViewMap).toMatchObject(dataMap.perView);
    expect(actions[1].payload.oldExpectedRangeIntervals).toMatchObject({});
    expect(actions[1].payload.newExpectedRangeIntervals)
    .toMatchObject(dataMap.expectedRangeIntervals);
    // expect(actions[0].payload.dataToInject).toMatchObject([data]);

    expect(actions[2]).toHaveProperty('type', 'INJECT_DATA_LAST');
    expect(actions[2].payload.oldViewMap).toMatchObject({});
    expect(actions[2].payload.newViewMap).toMatchObject(dataMap.perView);
    expect(actions[2].payload.oldExpectedLastIntervals).toMatchObject({});
    expect(actions[2].payload.newExpectedLastIntervals)
    .toMatchObject(dataMap.expectedLastIntervals);
    // expect(actions[1].payload.dataToInject).toMatchObject([data]);
  });
});
