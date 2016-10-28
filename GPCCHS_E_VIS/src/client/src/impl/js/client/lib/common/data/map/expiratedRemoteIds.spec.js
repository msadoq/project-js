/* eslint no-unused-expressions: 0 */

import { getStore } from '../../test';
import expirationsMap from './expiratedRemoteIds';
import visibleDataMap from './visibleRemoteIds';

const OFFSET = 0;
const VISU_WINDOW = [1420106400000, 1420107300000];

const flattenFilter = filter => `${filter.field}.${filter.operator}.${filter.operand}`;
const FILTER1 = {
  field: 'convertedValue',
  operator: '!=',
  operand: '0'
};
const FILTER2 = {
  field: 'groundDate',
  operator: '>=',
  operand: '42'
};

const PARAMETER_NAME = 'ATT_BC_STR1VOLTAGE';
const PARAMETER = `Reporting.${PARAMETER_NAME}<ReportingParameter>`;

const DOMAIN = 'fr.cnes.sat1';
const DOMAIN_ID = 27;
const TL = 'Session 1';
const SESSION_ID = 1;

const DATA_ID = `${PARAMETER}:${SESSION_ID}:${DOMAIN_ID}`;

const REMOTE_ID1 = `${DATA_ID}:${flattenFilter(FILTER1)}`;
const REMOTE_ID2 = `${DATA_ID}:${flattenFilter(FILTER2)}`;
const REMOTE_ID3 = `${DATA_ID}`;

const testState = {
  timebars: {
    '30bb6825-880b-4670-9422-d18a88036cbe': {
      id: 'TB1',
      visuWindow: {
        lower: VISU_WINDOW[0],
        upper: VISU_WINDOW[1],
        current: (VISU_WINDOW[0] + VISU_WINDOW[1]) / 2,
        defaultWidth: VISU_WINDOW[1] - VISU_WINDOW[0]
      },
      slideWindow: {
        lower: VISU_WINDOW[0],
        upper: VISU_WINDOW[1]
      },
      extUpperBound: VISU_WINDOW[1],
      rulerStart: VISU_WINDOW[0],
      rulerResolution: 11250,
      speed: 1,
      playingState: 'pause',
      masterId: 'Session 1',
      timelines: [
        '4a991cf8-ecc3-408d-a1e2-9e0df26c627c'
      ]
    }
  },
  timelines: {
    '4a991cf8-ecc3-408d-a1e2-9e0df26c627c': {
      id: TL,
      offset: OFFSET,
      kind: 'Session',
      sessionId: SESSION_ID
    }
  },
  windows: {
    'a65804a4-2c48-48c5-a141-376168d3bcd3': {
      title: 'window example Small',
      focusedPage: '6e418eff-f634-4a8d-8479-7e3d606948bf',
      pages: [
        '6e418eff-f634-4a8d-8479-7e3d606948bf'
      ],
      geometry: {
        w: 1310,
        h: 800,
        x: 110,
        y: 10,
        kind: 'Absolute'
      }
    }
  },
  pages: {
    '6e418eff-f634-4a8d-8479-7e3d606948bf': {
      title: 'page example 1',
      timebarId: '30bb6825-880b-4670-9422-d18a88036cbe',
      layout: [{
        i: '41fa1d7f-5076-424a-a6d0-51c3f96d1e8c',
        x: 0,
        y: 0,
        w: 12,
        h: 12
      }],
      views: [
        '41fa1d7f-5076-424a-a6d0-51c3f96d1e8c'
      ],
      editor: {
        isOpened: false,
        viewId: null,
        viewType: null,
        configuration: null
      }
    }
  },
  views: {
    '41fa1d7f-5076-424a-a6d0-51c3f96d1e8c': {
      title: 'Unknown',
      type: 'PlotView',
      configuration: {
        type: 'PlotView',
        links: [{
          name: 'page1',
          path: './pages/page1.json'
        }],
        procedures: [

        ],
        defaultRatio: {
          length: 50,
          width: 50
        },
        entryPoints: [{
          name: PARAMETER_NAME,
          connectedDataX: {
            formula: `${PARAMETER}.groundDate`,
            unit: 's',
            digits: 5,
            format: 'decimal',
            domain: DOMAIN,
            timeline: TL,
            axisId: 'Time'
          },
          connectedDataY: {
            formula: `${PARAMETER}.extractedValue`,
            unit: 'V',
            digits: 5,
            format: 'decimal',
            domain: DOMAIN,
            timeline: TL,
            axisId: 'VBat'
          },
        }, {
          name: PARAMETER_NAME,
          connectedDataX: {
            formula: `${PARAMETER}.groundDate`,
            unit: 's',
            digits: 5,
            format: 'decimal',
            filter: [FILTER1],
            domain: DOMAIN,
            timeline: TL,
            axisId: 'Time'
          },
          connectedDataY: {
            formula: `${PARAMETER}.extractedValue`,
            unit: 'V',
            digits: 5,
            format: 'decimal',
            filter: [FILTER1],
            domain: DOMAIN,
            timeline: TL,
            axisId: 'Time'
          },
        }],
        axes: [{
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
          showAxis: true
        }, {
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
          showAxis: true
        }],
        grids: [{
          xAxisId: 'Time',
          yAxisId: 'VBat',
          lineStyle: 'Continuous',
          width: 1,
          showGrid: true
        }],
        title: 'VIMA Plot example 1',
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
        markers: [{
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
        }]
      }
    }
  },
  domains: [
    {
      itemNamespace: 'Domains',
      name: 'fr.cnes.sat1',
      oid: '0051525005151000565215465660515',
      domainId: 27,
      parentDomainId: 98
    }, {
      itemNamespace: 'Domains',
      name: 'fr.cnes.sat1.ion',
      oid: '0051525005151000565215465660515',
      domainId: 42,
      parentDomainId: 27
    }
  ],
  dataRequests: {
    [REMOTE_ID2]: [
      VISU_WINDOW
    ],
    [REMOTE_ID3]: [
      [
        VISU_WINDOW[0] - 1e5,
        VISU_WINDOW[1]
      ]
    ],
    [REMOTE_ID1]: [
      VISU_WINDOW
    ]
  }
};

describe('data:expirationsMap', () => {
  const store = getStore(testState);
  const map = visibleDataMap(store.getState());

  it('works', () => {
    const expiredRequests = expirationsMap(store.getState(), map);
    expiredRequests.should.have.properties({
      [REMOTE_ID2]: { intervals: [VISU_WINDOW] },
      [REMOTE_ID3]: { intervals: [[VISU_WINDOW[0] - 1e5, VISU_WINDOW[0]]] },
    });
  });
});
