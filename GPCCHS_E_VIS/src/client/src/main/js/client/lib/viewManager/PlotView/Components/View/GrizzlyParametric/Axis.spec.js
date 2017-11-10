import React from 'react';
import renderer from 'react-test-renderer';
import { scaleLinear } from 'd3-scale';
import Axis from './Axis';

describe('Axis :: render', () => {
  const propsStub = {
    assignEl: () => null,
    assignLabelEl: () => null,
    chartWidth: 1000,
    direction: 'vertical',
    height: 1000,
    index: 0,
    label: 'VBat',
    labelStyle: {
      color: '#333333',
      bgColor: '#FFFFFF',
      align: 'center',
      font: 'Arial',
      italic: false,
      bold: false,
      underline: false,
      size: 11,
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
        xAccessor: null,
        xAxisId: 'time',
        xAxis: {
          autoLimits: false,
          autoTick: true,
          calculatedExtents: [1510306876602, 1510307506602],
          extents: [1510306876602, 1510307506602],
          format: '.2f',
          formatAsDate: true,
          gridSize: 1,
          gridStyle: 'Continuous',
          id: 'time',
          label: 'time',
          labelStyle: {},
          orient: 'top',
          rank: 100,
          scale: scaleLinear()
            .domain([0, 100])
            .range([0, 1000]),
          showAxis: true,
          showGrid: true,
          showLabels: true,
          showTicks: true,
          tickStep: 20000,
          unit: 'V',
        },
        xTooltipAccessor: null,
        yAccessor: null,
        yAxis: {
          autoLimits: false,
          autoTick: true,
          calculatedExtents: [130, 140],
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
          rank: 100,
          scale: scaleLinear()
            .domain([0, 150])
            .range([1000, 0]),
          showAxis: true,
          showGrid: true,
          showLabels: true,
          showTicks: true,
          tickStep: 50,
          unit: 'V',
        },
        yAxisId: 'VBat',
        yTooltipAccessor: null,
      },
    ],
    margin: 0,
    memoizeAssignRef: () => null,
    showGrid: true,
    showLabels: true,
    side: 90,
    xAxesAt: 'bottom',
    xAxisHeight: 40,
    yAxesAt: 'left',
    yAxisWidth: 90,
  };
  test('Axis :: render :: nominal case vertical', () => {
    const tree = renderer.create(
      <Axis {...propsStub} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Axis :: render :: nominal case horizontal', () => {
    const propsStub2 = {
      ...propsStub,
      direction: 'horizontal',
    };
    const tree = renderer.create(
      <Axis {...propsStub2} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
