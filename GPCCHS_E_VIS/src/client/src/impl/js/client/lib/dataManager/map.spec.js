import path from 'path';

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
        defaultWidth: 900000
      },
      slideWindow: {
        lower: 1420106702345,
        upper: 1420107144713
      },
      extUpperBound: 1420107500000,
      rulerStart: 1420106041002,
      rulerResolution: 1298.7675070010687,
      speed: 1,
      playingState: 'pause',
      masterId: 'Session 2',
      timelines: [
        '58d13bcd-2621-4d7a-b96b-9e3f09494114',
        '1794dcaf-5c6f-45e1-b8d2-a7f9cb514565'
      ],
      mode: 'Normal'
    }
  },
  timelines: {
    '58d13bcd-2621-4d7a-b96b-9e3f09494114': {
      id: 'Session 1',
      offset: 0,
      kind: 'Session',
      sessionId: 181,
      color: null
    },
    '1794dcaf-5c6f-45e1-b8d2-a7f9cb514565': {
      id: 'Session 2',
      offset: 0,
      kind: 'session',
      sessionId: 0,
      color: '#5254a3'
    }
  },
  windows: {
    '3652700e-6766-4a28-946a-f78096534bda': {
      title: 'Sup/Sup workspace',
      focusedPage: '876639ec-4511-4c6a-a059-c392f7da0afd',
      pages: [
        '876639ec-4511-4c6a-a059-c392f7da0afd'
      ],
      geometry: {
        w: 1310,
        h: 800,
        x: 110,
        y: 10,
        kind: 'Absolute'
      },
      debug: {
        whyDidYouUpdate: false,
        timebarVisibility: true
      },
      isModified: false
    }
  },
  pages: {
    '876639ec-4511-4c6a-a059-c392f7da0afd': {
      title: 'page Sup/Sup workspace',
      timebarHeight: 135,
      timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
      layout: [
        {
          i: '58ada40b-29a0-4ab3-b326-11d46e1db450',
          x: 0,
          y: 0,
          w: 6,
          h: 14
        },
        {
          i: 'aa77e24f-78e6-4e73-a486-fac1e4c058f9',
          x: 6,
          y: 0,
          w: 6,
          h: 14
        }
      ],
      views: [
        '58ada40b-29a0-4ab3-b326-11d46e1db450',
        'aa77e24f-78e6-4e73-a486-fac1e4c058f9'
      ],
      editor: {
        isOpened: false,
        viewId: null,
        viewType: null
      },
      isModified: false,
      path: './pages/pageSupsup.json',
      absolutePath: path.resolve(__dirname, '../../data/pages/pageSupsup.json'),
    }
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
              unit: 'V',
              digits: 5,
              format: 'decimal',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_COMM',
            id: 'id2',
            connectedData: {
              formula: 'Reporting.STAT_SU_COMM<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 5,
              format: 'decimal',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_STATE',
            id: 'id3',
            connectedData: {
              formula: 'Reporting.STAT_SU_STATE<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 5,
              format: 'decimal',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_PPID',
            id: 'id4',
            connectedData: {
              formula: 'Reporting.STAT_SU_PPID<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_PGRP',
            id: 'id5',
            connectedData: {
              formula: 'Reporting.STAT_SU_PGRP<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_SESSION',
            id: 'id6',
            connectedData: {
              formula: 'Reporting.STAT_SU_SESSION<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_TTY_NR',
            id: 'id7',
            connectedData: {
              formula: 'Reporting.STAT_SU_TTY_NR<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'decimal',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_TPGID',
            id: 'id8',
            connectedData: {
              formula: 'Reporting.STAT_SU_TPGID<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_FLAGS',
            id: 'id9',
            connectedData: {
              formula: 'Reporting.STAT_SU_FLAGS<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'hexadecimal',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_MINFLT',
            id: 'id10',
            connectedData: {
              formula: 'Reporting.STAT_SU_MINFLT<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_CMINFLT',
            id: 'id11',
            connectedData: {
              formula: 'Reporting.STAT_SU_CMINFLT<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'hexadecimal',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_MAJFLT',
            id: 'id12',
            connectedData: {
              formula: 'Reporting.STAT_SU_MAJFLT<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_CMAJFLT',
            id: 'id13',
            connectedData: {
              formula: 'Reporting.STAT_SU_CMAJFLT<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_UTIME',
            id: 'id14',
            connectedData: {
              formula: 'Reporting.STAT_SU_UTIME<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_STIME',
            id: 'id15',
            connectedData: {
              formula: 'Reporting.STAT_SU_STIME<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_CUTIME',
            id: 'id16',
            connectedData: {
              formula: 'Reporting.STAT_SU_CUTIME<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_CSTIME',
            id: 'id17',
            connectedData: {
              formula: 'Reporting.STAT_SU_CSTIME<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_PRIORITY',
            id: 'id18',
            connectedData: {
              formula: 'Reporting.STAT_SU_PRIORITY<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_NICE',
            id: 'id19',
            connectedData: {
              formula: 'Reporting.STAT_SU_NICE<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_NUM_THREADS',
            id: 'id20',
            connectedData: {
              formula: 'Reporting.STAT_SU_NUM_THREADS<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_ITREALVALUE',
            id: 'id21',
            connectedData: {
              formula: 'Reporting.STAT_SU_ITREALVALUE<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_STARTTIME',
            id: 'id22',
            connectedData: {
              formula: 'Reporting.STAT_SU_STARTTIME<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_VSIZE',
            id: 'id23',
            connectedData: {
              formula: 'Reporting.STAT_SU_VSIZE<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_RSS',
            id: 'id24',
            connectedData: {
              formula: 'Reporting.STAT_SU_RSS<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_RSSLIM',
            id: 'id25',
            connectedData: {
              formula: 'Reporting.STAT_SU_RSSLIM<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_STARTCODE',
            id: 'id26',
            connectedData: {
              formula: 'Reporting.STAT_SU_STARTCODE<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_ENDCODE',
            id: 'id27',
            connectedData: {
              formula: 'Reporting.STAT_SU_ENDCODE<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_STARTSTACK',
            id: 'id28',
            connectedData: {
              formula: 'Reporting.STAT_SU_STARTSTACK<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_KSTKESP',
            id: 'id29',
            connectedData: {
              formula: 'Reporting.STAT_SU_KSTKESP<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_KSTKEIP',
            id: 'id30',
            connectedData: {
              formula: 'Reporting.STAT_SU_KSTKEIP<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_SIGNAL',
            id: 'id31',
            connectedData: {
              formula: 'Reporting.STAT_SU_SIGNAL<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_BLOCKED',
            id: 'id32',
            connectedData: {
              formula: 'Reporting.STAT_SU_BLOCKED<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_SIGIGNORE',
            id: 'id33',
            connectedData: {
              formula: 'Reporting.STAT_SU_SIGIGNORE<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_SIGCATCH',
            id: 'id34',
            connectedData: {
              formula: 'Reporting.STAT_SU_SIGCATCH<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_WCHAN',
            id: 'id35',
            connectedData: {
              formula: 'Reporting.STAT_SU_WCHAN<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_NSWAP',
            id: 'id36',
            connectedData: {
              formula: 'Reporting.STAT_SU_NSWAP<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_CNSWAP',
            id: 'id37',
            connectedData: {
              formula: 'Reporting.STAT_SU_CNSWAP<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_EXIT_SIGNAL',
            id: 'id38',
            connectedData: {
              formula: 'Reporting.STAT_SU_EXIT_SIGNAL<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_PROCESSOR',
            id: 'id39',
            connectedData: {
              formula: 'Reporting.STAT_SU_PROCESSOR<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_RT_PRIORITY',
            id: 'id40',
            connectedData: {
              formula: 'Reporting.STAT_SU_RT_PRIORITY<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_POLICY',
            id: 'id41',
            connectedData: {
              formula: 'Reporting.STAT_SU_POLICY<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_DELAYACCT_BLKIO_T',
            id: 'id42',
            connectedData: {
              formula: 'Reporting.STAT_SU_DELAYACCT_BLKIO_T<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_GUEST_TIME',
            id: 'id43',
            connectedData: {
              formula: 'Reporting.STAT_SU_GUEST_TIME<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_CGUEST_TIME',
            id: 'id44',
            connectedData: {
              formula: 'Reporting.STAT_SU_CGUEST_TIME<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_START_DATA',
            id: 'id45',
            connectedData: {
              formula: 'Reporting.STAT_SU_START_DATA<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_WILDCARD_TIMELINE',
            id: 'id46',
            connectedData: {
              formula: 'Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: '*'
            }
          },
          {
            name: 'STAT_UNKNOW_DOMAIN',
            id: 'id47',
            connectedData: {
              formula: 'Reporting.STAT_UNKNOW_DOMAIN<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: 'fr',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_WILDCARD_DOMAIN',
            id: 'id48',
            connectedData: {
              formula: 'Reporting.STAT_WILDCARD_DOMAIN<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: '*',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_EMPTY_DOMAIN',
            id: 'id49',
            connectedData: {
              formula: 'Reporting.STAT_EMPTY_DOMAIN<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: '',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_UNKNOW_TIMELINE',
            id: 'id50',
            connectedData: {
              formula: 'Reporting.STAT_UNKNOW_TIMELINE<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session X'
            }
          },
          {
            name: 'STAT_EMPTY_TIMELINE',
            id: 'id51',
            connectedData: {
              formula: 'Reporting.STAT_EMPTY_TIMELINE<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 5,
              format: 'decimal',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: ''
            }
          },
          {
            name: 'STAT_INVALID_FORMULA',
            id: 'id52',
            connectedData: {
              formula: 'Reporting.STAT_INVALID_FORMULA',
              unit: 'V',
              digits: 5,
              format: 'decimal',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          }
        ],
        links: [
          {
            name: 'pageTest',
            path: '../pageTest.json'
          }
        ],
        defaultRatio: {
          length: 5,
          width: 3
        },
        content: ''
      },
      path: '/views/textviewSupsup.json',
      absolutePath: path.resolve(__dirname, '../../data/views/textviewSupsup.json'),
      isModified: false
    },
    'aa77e24f-78e6-4e73-a486-fac1e4c058f9': {
      type: 'PlotView',
      configuration: {
        type: 'PlotView',
        links: [
          {
            name: 'pageSupsup',
            path: './pages/pageSupsup.json'
          }
        ],
        procedures: [],
        defaultRatio: {
          length: 50,
          width: 50
        },
        entryPoints: [
          {
            name: 'STAT_SU_PID',
            id: 'id60',
            connectedDataX: {
              formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
              unit: 's',
              digits: 5,
              format: 'decimal',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1',
              axisId: 'db37ee81-b263-4472-9b58-71eb36f63c5b'
            },
            connectedDataY: {
              formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 5,
              format: 'decimal',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1',
              axisId: 'ac88f9b0-4413-4070-b937-240eb0aa354d'
            },
            objectStyle: {
              line: {
                style: 'Continuous',
                size: 2
              },
              points: {
                style: 'None',
                size: 0
              },
              curveColor: '#FFBF00'
            },
            stateColors: [
              {
                color: '#000000',
                condition: {
                  field: 'monitoringState',
                  operator: '==',
                  operand: 'waiting'
                }
              }
            ]
          },
          {
            name: 'STAT_PARAMETRIC',
            connectedDataX: {
              formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
              unit: 's',
              digits: 5,
              format: 'decimal',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1',
              axisId: 'db37ee81-b263-4472-9b58-71eb36f63c5b'
            },
            connectedDataY: {
              formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 5,
              format: 'decimal',
              filter: [],
              domain: 'fr.cnes.isis',
              timeline: 'Session 1',
              axisId: 'ac88f9b0-4413-4070-b937-240eb0aa354d'
            },
            objectStyle: {
              line: {
                style: 'Continuous',
                size: 2
              },
              points: {
                style: 'None',
                size: 0
              },
              curveColor: '#FFBF00'
            },
            stateColors: [
              {
                color: '#000000',
                condition: {
                  field: 'monitoringState',
                  operator: '==',
                  operand: 'waiting'
                }
              }
            ]
          }
        ],
        grids: [
          {
            xAxisId: 'Time',
            yAxisId: 'VBat',
            line: {
              style: 'Continuous',
              size: 1
            },
            showGrid: true
          }
        ],
        title: 'Plotview Sup/Sup workspace',
        titleStyle: {
          font: 'Arial',
          size: 12,
          bold: false,
          italic: false,
          underline: true,
          strikeOut: false,
          align: 'center',
          color: '#000000'
        },
        backgroundColor: '#FFFFFF',
        legend: {
          style: {
            font: 'Arial',
            size: 12,
            bold: false,
            italic: false,
            underline: false,
            strikeOut: false,
            align: 'left',
            color: '#000000'
          },
          location: 'Top'
        },
        markers: [
          {
            kind: 'Text',
            label: 'VBAT',
            style: {
              font: 'Arial',
              size: 12,
              bold: false,
              italic: false,
              underline: true,
              strikeOut: false,
              align: 'left',
              color: '#000000'
            },
            relativePosX: 5.6,
            relativePosY: 8.9
          }
        ],
        axes: {
          'db37ee81-b263-4472-9b58-71eb36f63c5b': {
            label: 'Time',
            unit: '<DATE>',
            style: {
              font: 'Arial',
              size: 12,
              bold: false,
              italic: false,
              underline: false,
              strikeOut: false,
              align: 'left',
              color: '#000000'
            },
            min: 0,
            max: 10,
            autoLimits: true,
            tickStep: 0.5,
            autoTick: true,
            showTicks: true,
            showTickLabels: true,
            isLogarithmic: false,
            showAxis: true,
            uuid: 'db37ee81-b263-4472-9b58-71eb36f63c5b'
          },
          'ac88f9b0-4413-4070-b937-240eb0aa354d': {
            label: 'VBat',
            unit: 'V',
            style: {
              font: 'Arial',
              size: 12,
              bold: false,
              italic: false,
              underline: false,
              strikeOut: false,
              align: 'left',
              color: '#000000'
            },
            min: -300,
            max: 300,
            autoLimits: false,
            tickStep: 50,
            autoTick: false,
            showTicks: true,
            showTickLabels: true,
            isLogarithmic: false,
            showAxis: true,
            uuid: 'ac88f9b0-4413-4070-b937-240eb0aa354d'
          }
        }
      },
      path: '/views/plotviewSupsup.json',
      absolutePath: path.resolve(__dirname, '../../data/views/plotviewSupsup.json'),
      isModified: false
    }
  },
  domains: [
    {
      itemNamespace: 'Domains',
      name: 'fr.cnes.isis',
      oid: '0051525005151000565215465660515',
      domainId: 1,
      parentDomainId: 0
    },
    {
      itemNamespace: 'Domains',
      name: 'fr.cnes.isis.simupus',
      oid: '0051525005151000565215465660515',
      domainId: 4,
      parentDomainId: 1
    }
  ],
  sessions: [
    {
      name: 'Master',
      id: 0,
      timestamp: {
        ms: 1480426701831,
        ps: null
      },
      delta: 0,
      offsetWithmachineTime: 2373665
    },
    {
      name: 'Session#42',
      id: 42,
      timestamp: {
        ms: 1480426701831,
        ps: null
      },
      delta: 42,
      offsetWithmachineTime: 2373665
    }
  ],
};
const dataMap = {
  'last@Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_PID',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_COMM<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_COMM',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_STATE<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_STATE',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_PPID<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_PPID',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_PGRP<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_PGRP',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_SESSION<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_SESSION',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_TTY_NR<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_TTY_NR',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_TPGID<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_TPGID',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_FLAGS<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_FLAGS',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_MINFLT<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_MINFLT',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_CMINFLT<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_CMINFLT',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_MAJFLT<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_MAJFLT',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_CMAJFLT<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_CMAJFLT',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_UTIME<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_UTIME',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_STIME<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_STIME',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_CUTIME<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_CUTIME',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_CSTIME<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_CSTIME',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_PRIORITY<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_PRIORITY',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_NICE<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_NICE',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_NUM_THREADS<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_NUM_THREADS',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_ITREALVALUE<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_ITREALVALUE',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_STARTTIME<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_STARTTIME',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_VSIZE<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_VSIZE',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_RSS<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_RSS',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_RSSLIM<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_RSSLIM',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_STARTCODE<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_STARTCODE',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_ENDCODE<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_ENDCODE',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_STARTSTACK<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_STARTSTACK',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_KSTKESP<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_KSTKESP',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_KSTKEIP<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_KSTKEIP',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_SIGNAL<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_SIGNAL',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_BLOCKED<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_BLOCKED',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_SIGIGNORE<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_SIGIGNORE',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_SIGCATCH<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_SIGCATCH',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_WCHAN<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_WCHAN',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_NSWAP<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_NSWAP',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_CNSWAP<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_CNSWAP',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_EXIT_SIGNAL<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_EXIT_SIGNAL',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_PROCESSOR<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_PROCESSOR',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_RT_PRIORITY<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_RT_PRIORITY',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_POLICY<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_POLICY',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_DELAYACCT_BLKIO_T<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_DELAYACCT_BLKIO_T',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_GUEST_TIME<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_GUEST_TIME',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_CGUEST_TIME<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_CGUEST_TIME',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'last@Reporting.STAT_SU_START_DATA<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_START_DATA',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      }
    }
  },
  'range@Reporting.STAT_SU_PID<ReportingParameter>:181:4': {
    structureType: 'range',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_PID',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 181
    },
    filter: [],
    localIds: {
      'extractedValue/extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0/0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420107056239
        ]
      }
    }
  },
  'last@Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:0:4': {
    dataId: {
      catalog: 'Reporting',
      comObject: 'ReportingParameter',
      domainId: 4,
      parameterName: 'STAT_WILDCARD_TIMELINE',
      sessionId: 0,
    },
    filter: [],
    localIds: {
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        expectedInterval: [
          1420106790818,
          1420106843902,
        ],
        field: 'extractedValue',
        offset: 0,
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
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
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_COMM: {
        remoteId: 'last@Reporting.STAT_SU_COMM<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id2',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_STATE: {
        remoteId: 'last@Reporting.STAT_SU_STATE<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id3',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_PPID: {
        remoteId: 'last@Reporting.STAT_SU_PPID<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id4',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_PGRP: {
        remoteId: 'last@Reporting.STAT_SU_PGRP<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id5',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_SESSION: {
        remoteId: 'last@Reporting.STAT_SU_SESSION<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id6',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_TTY_NR: {
        remoteId: 'last@Reporting.STAT_SU_TTY_NR<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id7',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_TPGID: {
        remoteId: 'last@Reporting.STAT_SU_TPGID<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id8',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_FLAGS: {
        remoteId: 'last@Reporting.STAT_SU_FLAGS<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id9',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_MINFLT: {
        remoteId: 'last@Reporting.STAT_SU_MINFLT<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id10',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_CMINFLT: {
        remoteId: 'last@Reporting.STAT_SU_CMINFLT<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id11',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_MAJFLT: {
        remoteId: 'last@Reporting.STAT_SU_MAJFLT<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id12',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_CMAJFLT: {
        remoteId: 'last@Reporting.STAT_SU_CMAJFLT<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id13',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_UTIME: {
        remoteId: 'last@Reporting.STAT_SU_UTIME<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id14',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_STIME: {
        remoteId: 'last@Reporting.STAT_SU_STIME<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id15',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_CUTIME: {
        remoteId: 'last@Reporting.STAT_SU_CUTIME<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id16',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_CSTIME: {
        remoteId: 'last@Reporting.STAT_SU_CSTIME<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id17',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_PRIORITY: {
        remoteId: 'last@Reporting.STAT_SU_PRIORITY<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id18',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_NICE: {
        remoteId: 'last@Reporting.STAT_SU_NICE<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id19',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_NUM_THREADS: {
        remoteId: 'last@Reporting.STAT_SU_NUM_THREADS<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id20',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_ITREALVALUE: {
        remoteId: 'last@Reporting.STAT_SU_ITREALVALUE<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id21',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_STARTTIME: {
        remoteId: 'last@Reporting.STAT_SU_STARTTIME<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id22',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_VSIZE: {
        remoteId: 'last@Reporting.STAT_SU_VSIZE<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id23',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_RSS: {
        remoteId: 'last@Reporting.STAT_SU_RSS<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id24',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_RSSLIM: {
        remoteId: 'last@Reporting.STAT_SU_RSSLIM<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id25',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_STARTCODE: {
        remoteId: 'last@Reporting.STAT_SU_STARTCODE<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id26',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_ENDCODE: {
        remoteId: 'last@Reporting.STAT_SU_ENDCODE<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id27',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_STARTSTACK: {
        remoteId: 'last@Reporting.STAT_SU_STARTSTACK<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id28',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_KSTKESP: {
        remoteId: 'last@Reporting.STAT_SU_KSTKESP<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id29',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_KSTKEIP: {
        remoteId: 'last@Reporting.STAT_SU_KSTKEIP<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id30',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_SIGNAL: {
        remoteId: 'last@Reporting.STAT_SU_SIGNAL<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id31',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_BLOCKED: {
        remoteId: 'last@Reporting.STAT_SU_BLOCKED<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id32',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_SIGIGNORE: {
        remoteId: 'last@Reporting.STAT_SU_SIGIGNORE<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id33',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_SIGCATCH: {
        remoteId: 'last@Reporting.STAT_SU_SIGCATCH<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id34',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_WCHAN: {
        remoteId: 'last@Reporting.STAT_SU_WCHAN<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id35',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_NSWAP: {
        remoteId: 'last@Reporting.STAT_SU_NSWAP<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id36',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_CNSWAP: {
        remoteId: 'last@Reporting.STAT_SU_CNSWAP<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id37',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_EXIT_SIGNAL: {
        remoteId: 'last@Reporting.STAT_SU_EXIT_SIGNAL<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id38',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_PROCESSOR: {
        remoteId: 'last@Reporting.STAT_SU_PROCESSOR<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id39',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_RT_PRIORITY: {
        remoteId: 'last@Reporting.STAT_SU_RT_PRIORITY<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id40',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_POLICY: {
        remoteId: 'last@Reporting.STAT_SU_POLICY<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id41',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_DELAYACCT_BLKIO_T: {
        remoteId: 'last@Reporting.STAT_SU_DELAYACCT_BLKIO_T<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id42',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_GUEST_TIME: {
        remoteId: 'last@Reporting.STAT_SU_GUEST_TIME<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id43',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_CGUEST_TIME: {
        remoteId: 'last@Reporting.STAT_SU_CGUEST_TIME<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id44',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_START_DATA: {
        remoteId: 'last@Reporting.STAT_SU_START_DATA<ReportingParameter>:181:4',
        field: 'extractedValue',
        id: 'id45',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_WILDCARD_TIMELINE: {
        expectedInterval: [1420106790818, 1420106843902],
        field: 'extractedValue',
        id: 'id46',
        remoteId: 'last@Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:0:4',
      },
      STAT_UNKNOW_DOMAIN: {
        error: 'invalid entry point, no domain matches'
      },
      STAT_WILDCARD_DOMAIN: {
        error: 'invalid entry point, domain wildcard not already supported'
      },
      STAT_EMPTY_DOMAIN: {
        error: 'invalid entry point, invalid domain field'
      },
      STAT_UNKNOW_TIMELINE: {
        error: 'invalid entry point, no timeline matches'
      },
      STAT_EMPTY_TIMELINE: {
        error: 'invalid entry point, invalid timeline field'
      },
      STAT_INVALID_FORMULA: {
        error: 'unable to parse this connectedData formula Reporting.STAT_INVALID_FORMULA'
      }
    }
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
          1420107056239
        ]
      },
      STAT_PARAMETRIC: {
        error: 'parametric entryPoint detected for this view'
      }
    }
  }
};

describe('data:map', () => {
  it('should compute dataMap', () => {
    const r = map(state);
    r.perRemoteId.should.eql(dataMap);
    r.perView.should.eql(viewMap);
  });
});
