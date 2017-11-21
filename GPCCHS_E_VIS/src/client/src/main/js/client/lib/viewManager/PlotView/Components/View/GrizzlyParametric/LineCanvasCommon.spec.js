import { scaleLinear } from 'd3-scale';
import { drawLinesCanvas } from './LineCanvasCommon';

const _ = require('lodash');

describe('LineCanvasCommon :: drawLinesCanvas', () => {
  const propsStub = {
    current: 1509986030848,
    divStyle: {
      height: 1000,
      left: 0,
      top: 0,
      width: 1000,
    },
    height: 1000,
    indexes: {
      TMMGT_BC_VIRTCHAN3: [1509985461000, 1509985462000, 1509985463000, 1509985464000],
    },
    lines: [
      {
        colorAccessor: 'color',
        data: {
          1509985461000: {
            color: '#000000',
            masterTime: 1509985461000,
            refTime: 1509985461000,
            symbol: '131',
            valX: 1509985461000,
            value: 10,
            x: 10,
          },
          1509985462000: {
            color: '#F00000',
            masterTime: 1509985462000,
            refTime: 1509985462000,
            symbol: '132',
            valX: 1509985462000,
            value: 20,
            x: 20,
          },
          1509985463000: {
            color: '#FF0000',
            masterTime: 1509985463000,
            refTime: 1509985463000,
            symbol: '133',
            valX: 1509985463000,
            value: 30,
            x: 30,
          },
          1509985464000: {
            color: '#FFF000',
            masterTime: 1509985464000,
            refTime: 1509985464000,
            symbol: '134',
            valX: 1509985464000,
            value: 40,
            x: 40,
          },
        },
        dataAccessor: 'TMMGT_BC_VIRTCHAN3',
        fill: '#000000',
        id: 'TMMGT_BC_VIRTCHAN3',
        indexes: [1509985461000, 1509985462000, 1509985463000, 1509985464000],
        lineSize: 2,
        lineStyle: 'Continuous',
        pointSize: 10,
        pointStyle: 'Dot',
        tooltipFormatter: () => {},
        stopInstruction: packet => (packet.isObsolete || false),
        xAccessor: null,
        xAxisId: 'time',
        xTooltipAccessor: null,
        yAccessor: null,
        yAxis: 'VBat',
        yAxisId: 'VBat',
        yTooltipAccessor: null,
      },
    ],
    parametric: true,
    perfOutput: false,
    showLabelsX: true,
    showLabelsY: true,
    updateLabelPosition: () => null,
    width: 1000,
    xAxesAt: 'bottom',
    xScale: scaleLinear()
      .domain([0, 100])
      .range([0, 1000]),
    yScale: scaleLinear()
      .domain([0, 100])
      .range([1000, 0]),
  };
  const operations = [];
  const getContext = () => {
    const handler = {
      get: (target, property) => (...args) => operations.push(_.padEnd(property, 20) + args.join('|')),
      set: (target, property, value) => operations.push(_.padEnd(property, 20) + value),
    };
    return new Proxy({}, handler);
  };

  test('LineCanvasCommon :: drawLinesCanvas :: nominal case', () => {
    const ctx = getContext();
    drawLinesCanvas(
      propsStub.perfOutput,
      propsStub.lines,
      propsStub.updateLabelPosition,
      false,
      false,
      propsStub.yScale,
      propsStub.xScale,
      propsStub.indexes,
      propsStub.current,
      propsStub.parametric,
      propsStub.divStyle,
      ctx
    );
    expect(operations).toMatchSnapshot();
  });
  test('LineCanvasCommon :: drawLinesCanvas :: obsolete data 1', () => {
    const ctx = getContext();
    const lines = propsStub.lines;
    lines[0].data[1509985461000].isObsolete = true;
    drawLinesCanvas(
      propsStub.perfOutput,
      lines,
      propsStub.updateLabelPosition,
      false,
      false,
      propsStub.yScale,
      propsStub.xScale,
      propsStub.indexes,
      propsStub.current,
      propsStub.parametric,
      propsStub.divStyle,
      ctx
    );
    expect(operations).toMatchSnapshot();
  });
  test('LineCanvasCommon :: drawLinesCanvas :: obsolete data 2', () => {
    const ctx = getContext();
    const lines = propsStub.lines;
    lines[0].data[1509985462000].isObsolete = true;
    drawLinesCanvas(
      propsStub.perfOutput,
      lines,
      propsStub.updateLabelPosition,
      false,
      false,
      propsStub.yScale,
      propsStub.xScale,
      propsStub.indexes,
      propsStub.current,
      propsStub.parametric,
      propsStub.divStyle,
      ctx
    );
    expect(operations).toMatchSnapshot();
  });
});
