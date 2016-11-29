import '../common/test';
import { perRemoteId, perView } from './map';

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
      absolutePath: '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/impl/js/client/data/pages/pageSupsup.json'
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
            name: 'STAT_SU_END_DATA',
            connectedData: {
              formula: 'Reporting.STAT_SU_END_DATA<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_START_BRK',
            connectedData: {
              formula: 'Reporting.STAT_SU_START_BRK<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_ARG_START',
            connectedData: {
              formula: 'Reporting.STAT_SU_ARG_START<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_ARG_END',
            connectedData: {
              formula: 'Reporting.STAT_SU_ARG_END<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 8,
              format: '',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_ENV_START',
            connectedData: {
              formula: 'Reporting.STAT_SU_ENV_START<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 2,
              format: 'scientific',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_ENV_END',
            connectedData: {
              formula: 'Reporting.STAT_SU_ENV_END<ReportingParameter>.extractedValue',
              unit: 'V',
              digits: 5,
              format: 'decimal',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1'
            }
          },
          {
            name: 'STAT_SU_EXIT_CODE',
            connectedData: {
              formula: 'Reporting.STAT_SU_EXIT_CODE<ReportingParameter>.extractedValue',
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
        content: [
          '<style>',
          '  .frame { color: #3333ff; background-color: #c5ccd3; font-weight: bolder; text-align: center; }',
          '  .smallFrame td { width: 200px; height: 20px; border-radius: 5px; align: center; border: 1px solid #0000cd; padding: 10px; background-color: black; color: #00ff00; font-weight: bold;}',
          '  tr { font-size: 1.2rem; valign: center; border: 1px solid #374048; padding: 5px;}',
          '  th { font-size: 1.2rem; color: black; background-color: #c5ccd3; align: center; border: 1px solid #374048; padding: 5px; font-weight: bolder;}',
          '  .frame .smallFrame { background-color:  #c5ccd3;  text-align: left; padding: 5px; }',
          '</style>',
          '<table>',
          '<tbody>',
          '<th>Name</th><th>Value</th>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_PID</th><td>{{STAT_SU_PID}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_COMM</th><td>{{STAT_SU_COMM}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_STATE</th><td>{{STAT_SU_STATE}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_PPID</th><td>{{STAT_SU_PPID}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_PGRP</th><td>{{STAT_SU_PGRP}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_SESSION</th><td>{{STAT_SU_SESSION}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_TTY_NR</th><td>{{STAT_SU_TTY_NR}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_TPGID</th><td>{{STAT_SU_TPGIDSTAT_SU_TPGID}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_FLAGS</th><td>{{STAT_SU_FLAGS}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_MINFLT</th><td>{{STAT_SU_MINFLT}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_CMINFLT</th><td>{{STAT_SU_CMINFLT}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_MAJFLT</th><td>{{STAT_SU_MAJFLT}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_CMAJFLT</th><td>{{STAT_SU_CMAJFLT}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_UTIME</th><td>{{STAT_SU_UTIME}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_STIME</th><td>{{STAT_SU_STIME}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_CUTIME</th><td>{{STAT_SU_CUTIME}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_CSTIME</th><td>{{STAT_SU_CSTIME}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_PRIORITY</th><td>{{STAT_SU_PRIORITY}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_NICE</th><td>{{STAT_SU_NICE}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_NUM_THREADS</th><td>{{STAT_SU_NUM_THREADS}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_ITREALVALUE</th><td>{{STAT_SU_ITREALVALUE}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_STARTTIME</th><td>{{STAT_SU_STARTTIME}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_VSIZE</th><td>{{STAT_SU_VSIZE}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_RSS</th><td>{{STAT_SU_RSS}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_RSSLIM</th><td>{{STAT_SU_RSSLIM}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_STARTCODE</th><td>{{STAT_SU_STARTCODE}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_ENDCODE</th><td>{{STAT_SU_ENDCODE}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_STARTSTACK</th><td>{{STAT_SU_STARTSTACK}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_KSTKESP</th><td>{{STAT_SU_KSTKESP}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_KSTKEIP</th><td>{{STAT_SU_KSTKEIP}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_SIGNAL</th><td>{{STAT_SU_SIGNAL}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_BLOCKED</th><td>{{STAT_SU_BLOCKED}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_SIGIGNORE</th><td>{{STAT_SU_SIGIGNORE}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_SIGCATCH</th><td>{{STAT_SU_SIGCATCH}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_WCHAN</th><td>{{STAT_SU_WCHAN}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_NSWAP</th><td>{{STAT_SU_NSWAP}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_CNSWAP</th><td>{{STAT_SU_CNSWAP}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_EXIT_SIGNAL</th><td>{{STAT_SU_EXIT_SIGNAL}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_PROCESSOR</th><td>{{STAT_SU_PROCESSOR}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_RT_PRIORITY</th><td>{{STAT_SU_RT_PRIORITY}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_POLICY</th><td>{{STAT_SU_POLICY}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_DELAYACCT_BLKIO_T</th><td>{{STAT_SU_DELAYACCT_BLKIO_T}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_GUEST_TIME</th><td>{{STAT_SU_GUEST_TIME}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_CGUEST_TIME</th><td>{{STAT_SU_CGUEST_TIME}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_START_DATA</th><td>{{STAT_SU_START_DATA}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_END_DATA</th><td>{{STAT_SU_END_DATA}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_START_BRK</th><td>{{STAT_SU_START_BRK}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_ARG_START</th><td>{{STAT_SU_ARG_START}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_ARG_END</th><td>{{STAT_SU_ARG_END}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_ENV_START</th><td>{{STAT_SU_ENV_START}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_ENV_END</th><td>{{STAT_SU_ENV_END}}</td>',
          '</tr>',
          "<tr class='smallFrame'>",
          '<th>STAT_SU_EXIT_CODE</th><td>{{STAT_SU_EXIT_CODE}}</td>',
          '</tr>',
          '</tr>',
          '</tbody>',
          '</table>'
        ]
      },
      path: '/views/textviewSupsup.json',
      absolutePath: '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/impl/js/client/data/views/textviewSupsup.json',
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
              curveColour: '#FFBF00'
            },
            stateColours: [
              {
                colour: '#000000',
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
          colour: '#000000'
        },
        plotBackgroundColour: '#FFFFFF',
        legend: {
          style: {
            font: 'Arial',
            size: 12,
            bold: false,
            italic: false,
            underline: false,
            strikeOut: false,
            align: 'left',
            colour: '#000000'
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
              colour: '#000000'
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
              colour: '#000000'
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
              colour: '#000000'
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
      absolutePath: '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/impl/js/client/data/views/plotviewSupsup.json',
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
  'last@Reporting.STAT_SU_END_DATA<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_END_DATA',
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
  'last@Reporting.STAT_SU_START_BRK<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_START_BRK',
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
  'last@Reporting.STAT_SU_ARG_START<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_ARG_START',
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
  'last@Reporting.STAT_SU_ARG_END<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_ARG_END',
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
  'last@Reporting.STAT_SU_ENV_START<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_ENV_START',
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
  'last@Reporting.STAT_SU_ENV_END<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_ENV_END',
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
  'last@Reporting.STAT_SU_EXIT_CODE<ReportingParameter>:181:4': {
    structureType: 'last',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'STAT_SU_EXIT_CODE',
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
      'extractedValue.989ca49b-2a5e-48dc-8adc-475ee2e164c1:0': {
        field: 'extractedValue',
        timebarId: '989ca49b-2a5e-48dc-8adc-475ee2e164c1',
        offset: 0,
        expectedInterval: [
          1420106790818,
          1420107056239
        ]
      }
    }
  }
};
const viewMap = {
  '58ada40b-29a0-4ab3-b326-11d46e1db450': {
    type: 'TextView',
    structureType: 'last',
    entryPoints: {
      STAT_SU_PID: {
        remoteId: 'last@Reporting.STAT_SU_PID<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_COMM: {
        remoteId: 'last@Reporting.STAT_SU_COMM<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_STATE: {
        remoteId: 'last@Reporting.STAT_SU_STATE<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_PPID: {
        remoteId: 'last@Reporting.STAT_SU_PPID<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_PGRP: {
        remoteId: 'last@Reporting.STAT_SU_PGRP<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_SESSION: {
        remoteId: 'last@Reporting.STAT_SU_SESSION<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_TTY_NR: {
        remoteId: 'last@Reporting.STAT_SU_TTY_NR<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_TPGID: {
        remoteId: 'last@Reporting.STAT_SU_TPGID<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_FLAGS: {
        remoteId: 'last@Reporting.STAT_SU_FLAGS<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_MINFLT: {
        remoteId: 'last@Reporting.STAT_SU_MINFLT<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_CMINFLT: {
        remoteId: 'last@Reporting.STAT_SU_CMINFLT<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_MAJFLT: {
        remoteId: 'last@Reporting.STAT_SU_MAJFLT<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_CMAJFLT: {
        remoteId: 'last@Reporting.STAT_SU_CMAJFLT<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_UTIME: {
        remoteId: 'last@Reporting.STAT_SU_UTIME<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_STIME: {
        remoteId: 'last@Reporting.STAT_SU_STIME<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_CUTIME: {
        remoteId: 'last@Reporting.STAT_SU_CUTIME<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_CSTIME: {
        remoteId: 'last@Reporting.STAT_SU_CSTIME<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_PRIORITY: {
        remoteId: 'last@Reporting.STAT_SU_PRIORITY<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_NICE: {
        remoteId: 'last@Reporting.STAT_SU_NICE<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_NUM_THREADS: {
        remoteId: 'last@Reporting.STAT_SU_NUM_THREADS<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_ITREALVALUE: {
        remoteId: 'last@Reporting.STAT_SU_ITREALVALUE<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_STARTTIME: {
        remoteId: 'last@Reporting.STAT_SU_STARTTIME<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_VSIZE: {
        remoteId: 'last@Reporting.STAT_SU_VSIZE<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_RSS: {
        remoteId: 'last@Reporting.STAT_SU_RSS<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_RSSLIM: {
        remoteId: 'last@Reporting.STAT_SU_RSSLIM<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_STARTCODE: {
        remoteId: 'last@Reporting.STAT_SU_STARTCODE<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_ENDCODE: {
        remoteId: 'last@Reporting.STAT_SU_ENDCODE<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_STARTSTACK: {
        remoteId: 'last@Reporting.STAT_SU_STARTSTACK<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_KSTKESP: {
        remoteId: 'last@Reporting.STAT_SU_KSTKESP<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_KSTKEIP: {
        remoteId: 'last@Reporting.STAT_SU_KSTKEIP<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_SIGNAL: {
        remoteId: 'last@Reporting.STAT_SU_SIGNAL<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_BLOCKED: {
        remoteId: 'last@Reporting.STAT_SU_BLOCKED<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_SIGIGNORE: {
        remoteId: 'last@Reporting.STAT_SU_SIGIGNORE<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_SIGCATCH: {
        remoteId: 'last@Reporting.STAT_SU_SIGCATCH<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_WCHAN: {
        remoteId: 'last@Reporting.STAT_SU_WCHAN<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_NSWAP: {
        remoteId: 'last@Reporting.STAT_SU_NSWAP<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_CNSWAP: {
        remoteId: 'last@Reporting.STAT_SU_CNSWAP<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_EXIT_SIGNAL: {
        remoteId: 'last@Reporting.STAT_SU_EXIT_SIGNAL<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_PROCESSOR: {
        remoteId: 'last@Reporting.STAT_SU_PROCESSOR<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_RT_PRIORITY: {
        remoteId: 'last@Reporting.STAT_SU_RT_PRIORITY<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_POLICY: {
        remoteId: 'last@Reporting.STAT_SU_POLICY<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_DELAYACCT_BLKIO_T: {
        remoteId: 'last@Reporting.STAT_SU_DELAYACCT_BLKIO_T<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_GUEST_TIME: {
        remoteId: 'last@Reporting.STAT_SU_GUEST_TIME<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_CGUEST_TIME: {
        remoteId: 'last@Reporting.STAT_SU_CGUEST_TIME<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_START_DATA: {
        remoteId: 'last@Reporting.STAT_SU_START_DATA<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_END_DATA: {
        remoteId: 'last@Reporting.STAT_SU_END_DATA<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_START_BRK: {
        remoteId: 'last@Reporting.STAT_SU_START_BRK<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_ARG_START: {
        remoteId: 'last@Reporting.STAT_SU_ARG_START<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_ARG_END: {
        remoteId: 'last@Reporting.STAT_SU_ARG_END<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_ENV_START: {
        remoteId: 'last@Reporting.STAT_SU_ENV_START<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_ENV_END: {
        remoteId: 'last@Reporting.STAT_SU_ENV_END<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
      },
      STAT_SU_EXIT_CODE: {
        remoteId: 'last@Reporting.STAT_SU_EXIT_CODE<ReportingParameter>:181:4',
        field: 'extractedValue',
        expectedInterval: [
          1420106790818,
          1420106843902
        ]
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
        expectedInterval: [
          1420106790818,
          1420107056239
        ]
      }
    }
  }
};

describe.only('data:map', () => {
  it('should compute dataMap by remoteIds', () => {
    perRemoteId(state).should.eql(dataMap);
  });
  it('should compute viewMap by remoteIds', () => {
    perView(state).should.eql(viewMap);
  });
});
