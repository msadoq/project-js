import { scaleLog } from 'd3-scale';
import { drawLinesCanvas } from './LineCanvasCommon';

const _ = require('lodash');

describe('LineCanvasCommon :: drawLinesCanvas', () => {
  const propsStub = {
    current: 1509986030848,
    data: {
      TMMGT_BC_VIRTCHAN3: {
        1509985462348: {
          color: '#FF0000',
          masterTime: 1509985462348,
          refTime: 1509985462348,
          symbol: '139.04578940573927',
          valX: 1509985462368,
          value: 139.04578940573927,
          x: 1509985462348,
        },
        1509985463348: {
          color: '#FF0000',
          masterTime: 1509985463348,
          refTime: 1509985463348,
          symbol: '138.91017655214853',
          valX: 1509985463368,
          value: 138.91017655214853,
          x: 1509985463348,
        },
        1509985464348: {
          color: '#FF00FF',
          masterTime: 1509985464348,
          refTime: 1509985464348,
          symbol: '138.91017655214853',
          valX: 1509985464348,
          value: 138.91017655214853,
          x: 1509985464348,
        },
      },
    },
    divStyle: {
      height: 500,
      left: 0,
      top: 0,
      width: 1000,
    },
    height: 455,
    indexes: {
      TMMGT_BC_VIRTCHAN3: [1509985462348, 1509985463348, 1509985464348],
    },
    lines: [
      {
        colorAccessor: 'color',
        data: {
          1509985462348: {
            color: '#FF0000',
            masterTime: 1509985462348,
            refTime: 1509985462348,
            symbol: '139.04578940573927',
            valX: 1509985462368,
            value: 139.04578940573927,
            x: 1509985462348,
          },
          1509985463348: {
            color: '#FF0000',
            masterTime: 1509985463348,
            refTime: 1509985463348,
            symbol: '138.91017655214853',
            valX: 1509985463368,
            value: 138.91017655214853,
            x: 1509985463348,
          },
          1509985464348: {
            color: '#FF00FF',
            masterTime: 1509985464348,
            refTime: 1509985464348,
            symbol: '138.91017655214853',
            valX: 1509985464348,
            value: 138.91017655214853,
            x: 1509985464348,
          },
        },
        dataAccessor: 'TMMGT_BC_VIRTCHAN3',
        fill: '#FFBF00',
        id: 'TMMGT_BC_VIRTCHAN3',
        indexes: [1509985462348, 1509985463348, 1509985464348],
        lineSize: 2,
        lineStyle: 'Continuous',
        pointSize: 0,
        pointStyle: 'None',
        tooltipFormatter: () => {},
        xAccessor: null,
        xAxisId: 'time',
        xTooltipAccessor: null,
        yAccessor: null,
        yAxis: 'VBat',
        yAxisId: 'VBat',
        yTooltipAccessor: null,
      },
    ],
    parametric: false,
    perfOutput: false,
    showLabelsX: true,
    showLabelsY: true,
    updateLabelPosition: () => null,
    width: 1120,
    xAxesAt: 'bottom',
    xScale: scaleLog()
      .domain([1509985452348, 1509985473348])
      .range([0, 1000])
      .base(10)
      .nice(),
    yScale: scaleLog()
      .domain([120, 150])
      .range([500, 0])
      .base(10)
      .nice(),
  };
  // const propsStub = {
  //   ...propsStub,
  //   {
  //     lines: [
  //       {
  //
  //       }
  //     ],
  //   }
  // }
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
      propsStub.data,
      propsStub.indexes,
      propsStub.current,
      propsStub.parametric,
      propsStub.divStyle,
      ctx
    );
    expect(operations).toMatchSnapshot();
  });
});
