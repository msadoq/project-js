import '../common/test';
import map from './map';

const state = {
  timebars: {
    '989ca49b-2a5e-48dc-8adc-475ee2e164c1': {
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
    '58d13bcd-2621-4d7a-b96b-9e3f09494114': {
      id: 'Session 1',
      offset: 0,
      kind: 'Session',
      sessionId: 181,
      color: null,
    },
    '1794dcaf-5c6f-45e1-b8d2-a7f9cb514565': {
      id: 'Session 2',
      offset: 0,
      kind: 'session',
      sessionId: 0,
      color: '#5254a3',
    },
  },
  timebarTimelines: {
    '989ca49b-2a5e-48dc-8adc-475ee2e164c1': [
      '58d13bcd-2621-4d7a-b96b-9e3f09494114',
      '1794dcaf-5c6f-45e1-b8d2-a7f9cb514565',
    ],
  },
  windows: {
    '3652700e-6766-4a28-946a-f78096534bda': {
      title: 'Sup/Sup workspace',
      focusedPage: '876639ec-4511-4c6a-a059-c392f7da0afd',
      pages: [
        '876639ec-4511-4c6a-a059-c392f7da0afd',
      ],
    },
  },
  pages: {
    '876639ec-4511-4c6a-a059-c392f7da0afd': {
      title: 'page Sup/Sup workspace',
      timebarUuid: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
      views: [
        '58ada40b-29a0-4ab3-b326-11d46e1db450',
        'aa77e24f-78e6-4e73-a486-fac1e4c058f9',
      ],
    },
  },
  views: {
    '58ada40b-29a0-4ab3-b326-11d46e1db450': {
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
            name: 'STAT_WILDCARD_TIMELINE',
            id: 'id46',
            connectedData: {
              formula: 'Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>.extractedValue',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: '*',
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
            name: 'STAT_WILDCARD_DOMAIN',
            id: 'id48',
            connectedData: {
              formula: 'Reporting.STAT_WILDCARD_DOMAIN<ReportingParameter>.extractedValue',
              filter: [],
              domain: '*',
              timeline: 'Session 1',
            },
          },
          {
            name: 'STAT_EMPTY_DOMAIN',
            id: 'id49',
            connectedData: {
              formula: 'Reporting.STAT_EMPTY_DOMAIN<ReportingParameter>.extractedValue',
              filter: [],
              domain: '',
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
          {
            name: 'STAT_EMPTY_TIMELINE',
            id: 'id51',
            connectedData: {
              formula: 'Reporting.STAT_EMPTY_TIMELINE<ReportingParameter>.extractedValue',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: '',
            },
          },
          {
            name: 'STAT_INVALID_FORMULA',
            id: 'id52',
            connectedData: {
              formula: 'Reporting.STAT_INVALID_FORMULA',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1',
            },
          },
        ],
      },
    },
    'aa77e24f-78e6-4e73-a486-fac1e4c058f9': {
      type: 'PlotView',
      configuration: {
        type: 'PlotView',
        entryPoints: [
          {
            name: 'STAT_SU_PID',
            id: 'id60',
            connectedDataX: {
              formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
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
                  field: 'monitoringState',
                  operator: '==',
                  operand: 'waiting',
                },
              },
            ],
          },
          {
            name: 'STAT_PARAMETRIC',
            connectedDataX: {
              formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
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
const dataMap = {
  'last@Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_PID',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181,
    },
    filter: [],
    views: ['58ada40b-29a0-4ab3-b326-11d46e1db450'],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarUuid: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902,
        ],
      },
    },
  },
  'range@Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
    structureType: 'range',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_PID',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181,
    },
    filter: [],
    views: ['aa77e24f-78e6-4e73-a486-fac1e4c058f9'],
    localIds: {
      'extractedValue/extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0/0': {
        field: 'extractedValue',
        timebarUuid: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420107056239,
        ],
      },
    },
  },
  'last@Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:10:4': {
    dataId: {
      catalog: 'Reporting',
      comObject: 'ReportingParameter',
      domainId: 4,
      parameterName: 'STAT_WILDCARD_TIMELINE',
      sessionId: 10,
    },
    filter: [],
    views: ['58ada40b-29a0-4ab3-b326-11d46e1db450'],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        expectedInterval: [
          1420106790818,
          1420106843902,
        ],
        field: 'extractedValue',
        offset: 0,
        timebarUuid: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
      },
    },
    structureType: 'last',
  },
};
const viewMap = {
  '58ada40b-29a0-4ab3-b326-11d46e1db450': {
    type: 'TextView',
    structureType: 'last',
    entryPoints: {
      STAT_SU_PID: {
        remoteId: 'last@Reporting.STAT_SU_PID<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902,
        ],
      },
      STAT_WILDCARD_TIMELINE: {
        expectedInterval: [1420106790818, 1420106843902],
        field: 'extractedValue',
        id: 'id46',
        offset: 0,
        remoteId: 'last@Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:10:4',
      },
      STAT_UNKNOW_DOMAIN: {
        error: 'invalid entry point, no domain matches',
      },
      STAT_WILDCARD_DOMAIN: {
        error: 'invalid entry point, domain wildcard not already supported',
      },
      STAT_EMPTY_DOMAIN: {
        error: 'invalid entry point, invalid domain field',
      },
      STAT_UNKNOW_TIMELINE: {
        error: 'invalid entry point, no timeline matches',
      },
      STAT_EMPTY_TIMELINE: {
        error: 'invalid entry point, invalid timeline field',
      },
      STAT_INVALID_FORMULA: {
        error: 'unable to parse this connectedData formula Reporting.STAT_INVALID_FORMULA',
      },
    },
  },
  'aa77e24f-78e6-4e73-a486-fac1e4c058f9': {
    type: 'PlotView',
    structureType: 'range',
    entryPoints: {
      STAT_SU_PID: {
        remoteId: 'range@Reporting.STAT_SU_PID<ReportingParameter>:181:4',
        fieldX: 'extractedValue',
        fieldY: 'extractedValue',
        offset: 0,
        id: 'id60',
        expectedInterval: [
          1420106790818,
          1420107056239,
        ],
      },
      STAT_PARAMETRIC: {
        error: 'parametric entryPoint detected for this view',
      },
    },
  },
};

describe('data:map', () => {
  it('should compute dataMap', () => {
    const r = map(state);
    r.perRemoteId.should.eql(dataMap);
    r.perView.should.eql(viewMap);
  });
});
