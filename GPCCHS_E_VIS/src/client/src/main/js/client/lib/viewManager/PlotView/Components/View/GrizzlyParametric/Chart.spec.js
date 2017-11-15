import { getExtentsEdgesForAxis,
  memoizeExtentsAutolimit,
  memoizeExtents,
  memoizeBackgroundDivStyle,
  memoizeScales,
  getLinesWithValidAxes } from './Chart';

const chartWidth = 100;
const chartHeight = 100;
const isXAxis = true;

describe('GrizzlyParametric :: Chart :: getExtentsEdgesForAxis', () => {
  test('GrizzlyParametric :: Chart :: getExtentsEdgesForAxis :: reset', () => {
    const axis = {
      extents: [0, 100],
    };
    const zoomLevel = 1;
    const pan = 0;
    const { extentsUpper, extentsLower } = getExtentsEdgesForAxis(
      axis.extents[0],
      axis.extents[1],
      zoomLevel,
      pan,
      isXAxis,
      chartWidth,
      chartHeight
    );
    expect(extentsLower).toBe(0);
    expect(extentsUpper).toBe(100);
  });
  test('GrizzlyParametric :: Chart :: getExtentsEdgesForAxis :: pan 50%', () => {
    const axis = {
      extents: [0, 100],
    };
    const zoomLevel = 1;
    const pan = -50;
    const { extentsUpper, extentsLower } = getExtentsEdgesForAxis(
      axis.extents[0],
      axis.extents[1],
      zoomLevel,
      pan,
      isXAxis,
      chartWidth,
      chartHeight
    );
    expect(extentsLower).toBe(50);
    expect(extentsUpper).toBe(150);
  });
  test('GrizzlyParametric :: Chart :: getExtentsEdgesForAxis :: pan -50%', () => {
    const axis = {
      extents: [0, 100],
    };
    const zoomLevel = 1;
    const pan = 50;
    const { extentsUpper, extentsLower } = getExtentsEdgesForAxis(
      axis.extents[0],
      axis.extents[1],
      zoomLevel,
      pan,
      isXAxis,
      chartWidth,
      chartHeight
    );
    expect(extentsLower).toBe(-50);
    expect(extentsUpper).toBe(50);
  });
  test('GrizzlyParametric :: Chart :: getExtentsEdgesForAxis :: zoom in', () => {
    const axis = {
      extents: [0, 100],
    };
    const zoomLevel = 2;
    const pan = 0;
    const { extentsUpper, extentsLower } = getExtentsEdgesForAxis(
      axis.extents[0],
      axis.extents[1],
      zoomLevel,
      pan,
      isXAxis,
      chartWidth,
      chartHeight
    );
    expect(extentsLower).toBe(25);
    expect(extentsUpper).toBe(75);
  });
  test('GrizzlyParametric :: Chart :: getExtentsEdgesForAxis :: zoom out', () => {
    const axis = {
      extents: [0, 100],
    };
    const zoomLevel = 0.5;
    const pan = 0;
    const { extentsUpper, extentsLower } = getExtentsEdgesForAxis(
      axis.extents[0],
      axis.extents[1],
      zoomLevel,
      pan,
      isXAxis,
      chartWidth,
      chartHeight
    );
    expect(extentsLower).toBe(-50);
    expect(extentsUpper).toBe(150);
  });
});
describe('GrizzlyParametric :: Chart :: memoizeExtentsAutolimit', () => {
  test('GrizzlyParametric :: Chart :: memoizeExtentsAutolimit :: nominal case', () => {
    const func = memoizeExtentsAutolimit();
    const args = [
      '10-100-top',
      10,
      100,
      'bottom',
      [{}],
      [
        { x: 10, value: 10 },
        { x: 20, value: 30 },
        { x: 40, value: 40 },
      ],
    ];
    const result1 = func(...args);
    expect(result1).toEqual([10, 40]);
    const result2 = func(...args);
    expect(result1).toEqual(result2);
  });
  test('GrizzlyParametric :: Chart :: memoizeExtentsAutolimit :: remove out of boud points', () => {
    const func = memoizeExtentsAutolimit();
    const args = [
      '10-100-top',
      10,
      100,
      'bottom',
      [{}],
      [
        { x: 0, value: 0 },
        { x: 10, value: 10 },
        { x: 20, value: 30 },
        { x: 40, value: 40 },
        { x: 140, value: 140 },
      ],
    ];
    const result1 = func(...args);
    expect(result1).toEqual([10, 40]);
    const result2 = func(...args);
    expect(result1).toEqual(result2);
  });
});
describe('GrizzlyParametric :: Chart :: memoizeExtents', () => {
  test('GrizzlyParametric :: Chart :: memoizeExtents :: nominal case', () => {
    const func = memoizeExtents();
    const args = [
      '10-100-bottom',
      'bottom',
      10,
      100,
    ];
    const result1 = func(...args);
    expect(result1).toEqual([100, 10]);
    const result2 = func(...args);
    expect(result1).toEqual(result2);
  });
  test('GrizzlyParametric :: Chart :: memoizeExtents :: inverse', () => {
    const func = memoizeExtents();
    const args = [
      '10-100-top',
      'top',
      10,
      100,
    ];
    const result1 = func(...args);
    expect(result1).toEqual([10, 100]);
    const result2 = func(...args);
    expect(result1).toEqual(result2);
  });
});
describe('GrizzlyParametric :: Chart :: memoizeBackgroundDivStyle', () => {
  test('GrizzlyParametric :: Chart :: memoizeBackgroundDivStyle :: nominal case', () => {
    const func = memoizeBackgroundDivStyle;
    const args = [
      '0-90-left-910-460',
      0,
      90,
      'left',
      910,
      460,
    ];
    const result1 = func(...args);
    expect(result1).toEqual({ height: 460, left: 90, top: 0, width: 910 });
    const result2 = func(...args);
    expect(result1).toEqual(result2);
  });
  test('GrizzlyParametric :: Chart :: memoizeBackgroundDivStyle :: right', () => {
    const func = memoizeBackgroundDivStyle;
    const args = [
      '0-90-right-910-460',
      0,
      90,
      'right',
      910,
      460,
    ];
    const result1 = func(...args);
    expect(result1).toEqual({ height: 460, right: 90, top: 0, width: 910 });
    const result2 = func(...args);
    expect(result1).toEqual(result2);
  });
});
describe('GrizzlyParametric :: Chart :: memoizeScales', () => {
  test('GrizzlyParametric :: Chart :: memoizeScales :: nominal case', () => {
    const func = memoizeScales();
    const args = [
      '400-1595-460-false',
      400,
      1595,
      false,
      460,
      false,
      10,
    ];
    const result1 = func(...args);
    const result2 = func(...args);
    expect(result1).toEqual(result2);
  });
});
describe('GrizzlyParametric :: Chart :: memoizeScales', () => {
  test('GrizzlyParametric :: Chart :: memoizeScales :: nominal case', () => {
    const func = memoizeScales();
    const args = [
      '400-1595-460-false',
      400,
      1595,
      false,
      460,
      false,
      10,
    ];
    const result1 = func(...args);
    const result2 = func(...args);
    expect(result1).toEqual(result2);
  });
});
describe('GrizzlyParametric :: Chart :: getLinesWithValidAxes', () => {
  test('GrizzlyParametric :: Chart :: getLinesWithValidAxes :: nominal case', () => {
    const lines = [{
      xAxisId: 'time',
      yAxisId: 'vBat',
    }];
    const xAxes = [{
      id: 'time',
      showAxis: true,
    }];
    const yAxes = [{
      id: 'vBat',
      showAxis: true,
    }];
    const linesWithValidAxes = getLinesWithValidAxes(yAxes, xAxes, lines);
    expect(linesWithValidAxes).toEqual([{
      xAxisId: 'time',
      yAxisId: 'vBat',
      xAxis: { id: 'time', showAxis: true },
      yAxis: { id: 'vBat', showAxis: true },
    }]);
  });
  test('GrizzlyParametric :: Chart :: getLinesWithValidAxes :: remove invalid axes', () => {
    const lines = [{
      xAxisId: 'time',
      yAxisId: 'vBat',
    }];
    const xAxes = [{
      id: 'time',
      showAxis: true,
    }, {
      id: 'time2',
      showAxis: true,
    }];
    const yAxes = [{
      id: 'vBat',
      showAxis: true,
    }, {
      id: 'vBat',
      showAxis: true,
    }];
    const linesWithValidAxes = getLinesWithValidAxes(yAxes, xAxes, lines);
    expect(linesWithValidAxes).toEqual([{
      xAxisId: 'time',
      yAxisId: 'vBat',
      xAxis: { id: 'time', showAxis: true },
      yAxis: { id: 'vBat', showAxis: true },
    }]);
  });
  test('GrizzlyParametric :: Chart :: getLinesWithValidAxes :: hide axis', () => {
    const lines = [{
      xAxisId: 'time',
      yAxisId: 'vBat',
    }];
    const xAxes = [{
      id: 'time',
      showAxis: false,
    }];
    const yAxes = [{
      id: 'vBat',
      showAxis: true,
    }];
    const linesWithValidAxes = getLinesWithValidAxes(yAxes, xAxes, lines);
    expect(linesWithValidAxes).toEqual([]);
  });
});
