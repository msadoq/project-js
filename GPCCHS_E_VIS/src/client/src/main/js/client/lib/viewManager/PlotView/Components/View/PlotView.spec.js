import { getUniqAxes, getUniqueEpId, parseDragData } from './PlotView';

describe('PlotView :: getUniqAxes', () => {
  const propsStub = {
    entryPoints: [
      {
        parametric: false,
        connectedData: {
          axisId: 'VBat',
          stringParameter: false,
          defaultY: 1,
        },
        connectedDataParametric: {
          xAxisId: '',
          yAxisId: '',
        },
        name: 'TMMGT_BC_VIRTCHAN3',
      }, {
        parametric: false,
        connectedData: {
          axisId: 'VBat',
          stringParameter: false,
          defaultY: 1,
        },
        connectedDataParametric: {
          xAxisId: '',
          yAxisId: '',
        },
        name: 'ATT_BC_REVTCOUNT1',
      },
    ],
    axes: {
      VBat: {
        id: 'VBat',
        autoLimits: false,
        min: 130,
        max: 140,
        showAxis: true,
        showLabels: true,
        showTicks: true,
        autoTick: true,
        tickStep: 50,
        unit: 'V',
        label: 'VBat',
        style: {
          align: 'left',
          bold: false,
          color: '#FFF',
          font: 'Arial',
          italic: false,
          size: 12,
          strikeOut: false,
          underline: false,
        },
        logarithmic: false,
        logSettings: {
          base: 10,
          max: 1000000000,
          min: 0.1,
        },
      },
      time: {
        id: 'time',
        autoLimits: false,
        min: 10,
        max: 0,
        showAxis: true,
        showLabels: true,
        showTicks: true,
        autoTick: true,
        tickStep: 0.5,
        unit: 's',
        label: 'Time',
        style: {
          align: 'left',
          bold: false,
          color: '#FFF',
          font: 'Arial',
          italic: false,
          size: 12,
          strikeOut: false,
          underline: false,
        },
        logarithmic: false,
        logSettings: {
          base: 10,
          max: 1000000000,
          min: 0.1,
        },
      },
    },
    grids: [
      {
        showGrid: true,
        xAxisId: 'time',
        yAxisId: 'VBat',
        line: {
          style: 'Continuous',
          size: 1,
        },
      },
    ],
    data: {
      min: {
        ATT_BC_REVTCOUNT1: 131.90001158377595,
        TMMGT_BC_VIRTCHAN3: 137.77041306585005,
      },
      max: {
        ATT_BC_REVTCOUNT1: 133.8999967286256,
        TMMGT_BC_VIRTCHAN3: 139.28653991010538,
      },
    },
    visuWindow: {
      lower: 1510826627093,
      upper: 1510827257093,
    },
  };
  // @todo test parametric
  test('PlotView :: getUniqAxes :: nominal case', () => {
    const { xAxes, yAxes } = getUniqAxes(
      propsStub.entryPoints,
      propsStub.axes,
      propsStub.grids,
      propsStub.data,
      propsStub.visuWindow
    );
    expect(xAxes).toEqual([{
      autoLimits: false,
      autoTick: true,
      extents: [1510826627093, 1510827257093],
      format: '.2f',
      formatAsDate: true,
      gridSize: 1,
      gridStyle: 'Continuous',
      id: 'time',
      label: 'time',
      labelStyle: {},
      orient: 'top',
      showAxis: true,
      showGrid: true,
      showLabels: true,
      showTicks: true,
      tickStep: 20000,
      unit: 'V',
    }]);
    expect(yAxes).toEqual([{
      autoLimits: false,
      autoTick: true,
      extents: [130, 140],
      format: '.3f',
      formatAsDate: false,
      gridSize: 1,
      gridStyle: 'Continuous',
      id: 'VBat',
      label: 'VBat',
      labelStyle: {
        align: 'left',
        bold: false,
        color: '#FFF',
        font: 'Arial',
        italic: false,
        size: 12,
        strikeOut: false,
        underline: false,
      },
      logSettings: {
        base: 10,
        max: 1000000000,
        min: 0.1,
      },
      logarithmic: false,
      orient: 'top',
      showAxis: true,
      showGrid: true,
      showLabels: true,
      showTicks: true,
      tickStep: 50,
      unit: 'V',
    }]);
  });
});
describe('PlotView :: getUniqueEpId', () => {
  const propsStub = {
    entryPoints: [
      {
        parametric: false,
        connectedData: {
          axisId: 'VBat',
          stringParameter: false,
          defaultY: 1,
        },
        connectedDataParametric: {
          xAxisId: '',
          yAxisId: '',
        },
        name: 'TMMGT_BC_VIRTCHAN3',
      }, {
        parametric: false,
        connectedData: {
          axisId: 'VBat',
          stringParameter: false,
          defaultY: 1,
        },
        connectedDataParametric: {
          xAxisId: '',
          yAxisId: '',
        },
        name: 'ATT_BC_REVTCOUNT1',
      },
    ],
    id: 'entryPoints',
  };
  // @todo test parametric
  test('PlotView :: getUniqueEpId :: entryPoints', () => {
    const newId = getUniqueEpId(
      propsStub.id,
      propsStub.entryPoints
    );
    expect(newId).toBe('entryPoints');
  });
  test('PlotView :: getUniqueEpId :: TMMGT_BC_VIRTCHAN3', () => {
    const newId = getUniqueEpId(
      'TMMGT_BC_VIRTCHAN3',
      propsStub.entryPoints
    );
    expect(newId).toBe('TMMGT_BC_VIRTCHAN3_2');
  });
  test('PlotView :: getUniqueEpId :: ATT_BC_REVTCOUNT1', () => {
    const newId = getUniqueEpId(
      'ATT_BC_REVTCOUNT1',
      propsStub.entryPoints
    );
    expect(newId).toBe('ATT_BC_REVTCOUNT1_2');
  });
});
describe('PlotView :: parseDragData', () => {
  const propsStub = {
    data: {
      catalogName: 'Reporting',
      comObjects: ['ReportingParameter'],
      item: 'ATT_BC_REVTCOUNT1',
      name: 'EntryPoint',
      nameSpace: '',
      sessionName: '',
    },
    id: 'entryPoint',
    defaultTimelineId: 'Session 1',
  };
  // @todo test parametric
  test('PlotView :: parseDragData', () => {
    const newId = parseDragData(
      propsStub.data,
      propsStub.defaultTimelineId,
      propsStub.id
    );
    expect(newId).toEqual({
      name: 'Session 1',
      connectedData: {
        formula: 'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>.extractedValue',
        fieldX: 'onboardDate',
        timeline: 'entryPoint',
      },
    });
  });
});