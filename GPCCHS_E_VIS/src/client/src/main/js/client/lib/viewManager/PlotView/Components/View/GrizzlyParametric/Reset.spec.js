import React from 'react';
import renderer from 'react-test-renderer';
import Reset from './Reset';

const _each = require('lodash/each');

describe('GrizzlyParametric :: Reset', () => {
  const propsStub = {
    divStyle: {
      height: 1000,
      left: 0,
      top: 0,
      width: 1000,
    },
    yAxesAt: 'left',
    xAxisAt: 'bottom',
    yAxesUniq: [{
      autoLimits: false,
      autoTick: true,
      calculatedExtents: [400, 1595],
      extents: [400, 1595],
      format: '.3f',
      gridSize: 2,
      gridStyle: 'Continuous',
      id: 'vBat',
      label: 'vBat',
      labelStyle: {
        color: '#008',
      },
      logarithmic: false,
      orient: 'top',
      rank: 100,
      scale: () => null,
      showAxis: true,
      showGrid: true,
      showLabels: true,
      showPointLabels: false,
      showTicks: true,
      tickStep: 40,
      unit: 'l',
    }],
    xAxesUniq: [{
      autoLimits: false,
      autoTick: true,
      calculatedExtents: [10, 1009],
      extents: [10, 1009],
      format: '.2f',
      formatAsDate: true,
      gridSize: 1,
      gridStyle: 'Continuous',
      id: 'time',
      label: 'time',
      labelStyle: {
        align: 'center',
        bgColor: '#FFFFFF',
        bold: false,
        color: '#333333',
        font: 'Arial',
        italic: false,
        size: 11,
        underline: false,
      },
      orient: 'top',
      rank: 100,
      scale: () => null,
      showAxis: true,
      showGrid: true,
      showLabels: true,
      showTicks: true,
      tickStep: 20000,
      unit: 'V',
    }],
    resetPan: () => null,
    resetZoomLevel: () => null,
    resetPanAndZoom: () => null,
    zoomLevels: {},
    pans: {},
  };

  const pansStub = [
    {},
    { time: 57.373130250665916 },
    { vBat: 50.294627167791546 },
    { time: 57.373130250665916, vBat: 50.294627167791546 },
  ];

  const zoomLevelsStub = [
    {},
    { time: 1.4641000000000006 },
    { vBat: 1.6105100000000008 },
    { time: 1.4641000000000006, vBat: 1.6105100000000008 },
  ];

  const testReset = (yAxesAt, xAxisAt, multiple, pans, zoomLevels) => {
    const pansKeys = Object.keys(pans).length > 0 ? Object.keys(pans).toString() : 'none';
    const zoomLevelsKeys = Object.keys(zoomLevels).length > 0 ? Object.keys(zoomLevels).toString() : 'none';

    test(`GrizzlyParametric :: Reset :: ${yAxesAt}|${xAxisAt}|${multiple}|${pansKeys}|${zoomLevelsKeys}`, () => {
      const tree = renderer.create(
        <Reset
          multiple={multiple}
          yAxesAt={yAxesAt}
          xAxisAt={xAxisAt}
          yAxesUniq={propsStub.yAxesUniq}
          xAxesUniq={propsStub.xAxesUniq}
          resetPan={propsStub.resetPan}
          resetZoomLevel={propsStub.resetZoomLevel}
          resetPanAndZoom={propsStub.resetPanAndZoom}
          zoomLevels={zoomLevels}
          pans={pans}
          divStyle={propsStub.divStyle}
        />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  };

  _each(['left', 'right'], (yAxisAt) => {
    _each(['top', 'bottom'], (xAxisAt) => {
      _each([true, false], (multiple) => {
        _each(pansStub, (pans) => {
          _each(zoomLevelsStub, (zoomLevels) => {
            testReset(yAxisAt, xAxisAt, multiple, pans, zoomLevels);
          });
        });
      });
    });
  });
});
