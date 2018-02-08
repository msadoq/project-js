import {
  byTimestamp,
  byPointTimestamp,
  OMG,
  recomputeParametricAffectedPoints,
  insertInParametric,
  insertNewDrawablePoints,
  insertInTimeValueList,
  insertTimeValuesInParametric,
} from './parametricPlot';

describe('viewManager/PlotView/store/parametricPlot', () => {
  test('byTimestamp', () => {
    const timeValueA = { timestamp: 20, value: 600 };
    const timeValueB = { timestamp: 30, value: 1234 };

    expect(byTimestamp(timeValueA, timeValueB)).toBeLessThan(0);
    expect(byTimestamp(timeValueB, timeValueA)).toBeGreaterThan(0);
    expect(byTimestamp(timeValueA, timeValueA)).toBe(0);
  });


  test('byPointTimestamp', () => {
    const pointA = {
      x: { timestamp: 25, value: 12345 },
      y: { interval: [20, 40], value: null },
    };

    const pointB = {
      x: { timestamp: 35, value: 12345 },
      y: { interval: [20, 40], value: null },
    };

    const pointC = {
      x: { interval: [20, 40], value: 12345 },
      y: { timestamp: 30, value: null },
    };

    const pointD = {
      x: { interval: 30, value: 12345 },
      y: { timestamp: 30, value: null },
    };


    expect(byPointTimestamp(pointA, pointA)).toBe(0);
    expect(byPointTimestamp(pointA, pointB)).toBeLessThan(0);
    expect(byPointTimestamp(pointA, pointC)).toBeLessThan(0);
    expect(byPointTimestamp(pointA, pointD)).toBeLessThan(0);

    expect(byPointTimestamp(pointB, pointA)).toBeGreaterThan(0);
    expect(byPointTimestamp(pointB, pointB)).toBe(0);
    expect(byPointTimestamp(pointB, pointC)).toBeGreaterThan(0);
    expect(byPointTimestamp(pointB, pointD)).toBeGreaterThan(0);

    expect(byPointTimestamp(pointC, pointA)).toBeGreaterThan(0);
    expect(byPointTimestamp(pointC, pointB)).toBeLessThan(0);
    expect(byPointTimestamp(pointC, pointC)).toBe(0);
    expect(byPointTimestamp(pointC, pointD)).toBe(0);

    expect(byPointTimestamp(pointD, pointA)).toBeGreaterThan(0);
    expect(byPointTimestamp(pointD, pointB)).toBeLessThan(0);
    expect(byPointTimestamp(pointD, pointC)).toBe(0);
    expect(byPointTimestamp(pointD, pointD)).toBe(0);
  });


  test('OMG', () => {
    const timeValueLists = {
      x: [],
      y: [
        { timestamp: 20, value: 600 },
        { timestamp: 40, value: 800 },
      ],
    };
    const pointIntervalY = {
      x: { timestamp: 25, value: 12345 },
      y: { interval: [20, 40], value: null },
    };
    const pointIntervalX = {
      x: { interval: [20, 40], value: 12345 },
      y: { timestamp: 25, value: null },
    };
    const pointDoubleTimestamp = {
      x: { timestamp: 25, value: 12345 },
      y: { timestamp: 25, value: null },
    };

    expect(OMG(timeValueLists, pointIntervalY)).toEqual({
      x: { timestamp: 25, value: 12345 },
      y: { interval: [20, 40], value: 650 },
    });
    expect(() => OMG(timeValueLists, pointIntervalX)).toThrow('never happen');
    expect(OMG(timeValueLists, pointDoubleTimestamp)).toEqual(pointDoubleTimestamp);
  });


  test('insertInTimeValueList', () => {
    const timeValueList = [
      { timestamp: 20, value: 600 },
      { timestamp: 40, value: 800 },
    ];
    insertInTimeValueList({ timestamp: 25, value: 1234 }, timeValueList);
    insertInTimeValueList({ timestamp: 11, value: 4321 }, timeValueList);
    insertInTimeValueList({ timestamp: 42, value: 5467 }, timeValueList);

    expect(timeValueList).toEqual([
      { timestamp: 11, value: 4321 },
      { timestamp: 20, value: 600 },
      { timestamp: 25, value: 1234 },
      { timestamp: 40, value: 800 },
      { timestamp: 42, value: 5467 },
    ]);
  });


  test('recomputeParametricAffectedPoints', () => {
    const timeValueLists = {
      x: [{ timestamp: 25, value: 1234 }],
      y: [
        { timestamp: 20, value: 600 },
        { timestamp: 30, value: 400 },
        { timestamp: 40, value: 800 },
      ],
    };
    const parametric = [{
      x: { timestamp: 25, value: 1234 },
      y: { interval: [20, 40], value: 650 },
    }];
    const timeValue = { timestamp: 30, value: 400 };
    const type = 'y';
    recomputeParametricAffectedPoints(timeValueLists, parametric, timeValue, type);

    expect(parametric).toEqual([{
      x: { timestamp: 25, value: 1234 },
      y: { interval: [20, 30], value: 500 },
    }]);
  });


  test('insertInParametric', () => {
    // === Case nothing to do === //
    let timeValueLists = {
      x: [
        { timestamp: 25, value: 1234 },
      ],
      y: [
        { timestamp: 20, value: 600 },
        { timestamp: 30, value: 400 },
        { timestamp: 40, value: 800 },
      ],
    };
    let parametric = [{
      x: { timestamp: 25, value: 1234 },
      y: { interval: [20, 30], value: 500 },
    }];
    let timeValue = { timestamp: 30, value: 400 };
    let type = 'y';
    insertInParametric(timeValueLists, parametric, timeValue, type);

    expect(parametric).toEqual([{
      x: { timestamp: 25, value: 1234 },
      y: { interval: [20, 30], value: 500 },
    }]);

    // === Case new point to insert === //
    timeValueLists = {
      x: [
        { timestamp: 25, value: 1234 },
        { timestamp: 35, value: 4321 },
      ],
      y: [
        { timestamp: 20, value: 600 },
        { timestamp: 30, value: 400 },
        { timestamp: 40, value: 800 },
      ],
    };
    parametric = [{
      x: { timestamp: 25, value: 1234 },
      y: { interval: [20, 30], value: 500 },
    }];
    timeValue = { timestamp: 35, value: 4321 };
    type = 'x';
    insertInParametric(timeValueLists, parametric, timeValue, type);

    expect(parametric).toEqual([
      {
        x: { timestamp: 25, value: 1234 },
        y: { interval: [20, 30], value: 500 },
      }, {
        x: { timestamp: 35, value: 4321 },
        y: { interval: [30, 40], value: 600 },
      },
    ]);
  });


  test('insertNewDrawablePoints', () => {
    const timeValueLists = {
      x: [
        { timestamp: 25, value: 100 },
      ],
      y: [
        { timestamp: 20, value: 600 },
        { timestamp: 30, value: 400 },
        { timestamp: 40, value: 800 },
      ],
    };

    const parametric = [{
      x: { timestamp: 25, value: 100 },
      y: { interval: [20, 30], value: 500 },
    }];

    // === Case nothing to do === //
    let timeValue = { timestamp: 35, value: 400 };
    let type = 'y';
    let allTimeValueLists = {
      old: timeValueLists,
      new: {
        x: [
          { timestamp: 25, value: 100 },
        ],
        y: [
          { timestamp: 20, value: 600 },
          { timestamp: 30, value: 400 },
          timeValue,
          { timestamp: 40, value: 800 },
        ],
      },
    };

    insertNewDrawablePoints(allTimeValueLists, parametric, timeValue, type);
    expect(parametric).toEqual([{
      x: { timestamp: 25, value: 100 },
      y: { interval: [20, 30], value: 500 },
    }]);

    // === Case nothing to do === //
    timeValue = { timestamp: 50, value: 400 };
    type = 'y';
    allTimeValueLists = {
      old: timeValueLists,
      new: {
        x: [
          { timestamp: 25, value: 100 },
        ],
        y: [
          { timestamp: 20, value: 600 },
          { timestamp: 30, value: 400 },
          { timestamp: 40, value: 800 },
          timeValue,
        ],
      },
    };

    insertNewDrawablePoints(allTimeValueLists, parametric, timeValue, type);
    expect(parametric).toEqual([{
      x: { timestamp: 25, value: 100 },
      y: { interval: [20, 30], value: 500 },
    }]);

    // === Case nothing to do === //
    timeValue = { timestamp: 45, value: 500 };
    type = 'x';
    allTimeValueLists = {
      old: timeValueLists,
      new: {
        x: [
          { timestamp: 25, value: 100 },
          timeValue,
        ],
        y: [
          { timestamp: 20, value: 600 },
          { timestamp: 30, value: 400 },
          { timestamp: 40, value: 800 },
        ],
      },
    };

    insertNewDrawablePoints(allTimeValueLists, parametric, timeValue, type);
    expect(parametric).toEqual([
      {
        x: { timestamp: 25, value: 100 },
        y: { interval: [20, 30], value: 500 },
      }, {
        x: { interval: [25, 45], value: 200 },
        y: { timestamp: 30, value: 400 },
      }, {
        x: { interval: [25, 45], value: 400 },
        y: { timestamp: 40, value: 800 },
      },
    ]);
  });


  test('insertTimeValuesInParametric', () => {
    const xList = [{ timestamp: 25, value: 1234 }];
    const yList = [{ timestamp: 20, value: 600 }, { timestamp: 40, value: 800 }];
    const parametric = [{
      x: { timestamp: 25, value: 1234 },
      y: { interval: [20, 40], value: 650 },
    }];
    const newTimeValuesX = [
      { timestamp: 10, value: 100 },
      { timestamp: 50, value: 500 },
      { timestamp: 40, value: 300 },
    ];
    const newTimeValuesY = [
      { timestamp: 25, value: 400 },
      { timestamp: 15, value: 200 },
      { timestamp: 35, value: 600 },
    ];

    const result = insertTimeValuesInParametric(
      xList,
      yList,
      parametric,
      newTimeValuesX,
      newTimeValuesY
    );

    // === test insertTimeValuesInParametric does not mutate === //
    expect(xList).toEqual([{ timestamp: 25, value: 1234 }]);
    expect(yList).toEqual([{ timestamp: 20, value: 600 }, { timestamp: 40, value: 800 }]);
    expect(parametric).toEqual([{
      x: { timestamp: 25, value: 1234 },
      y: { interval: [20, 40], value: 650 },
    }]);
    expect(newTimeValuesX).toEqual([
      { timestamp: 10, value: 100 },
      { timestamp: 50, value: 500 },
      { timestamp: 40, value: 300 },
    ]);
    expect(newTimeValuesY).toEqual([
      { timestamp: 25, value: 400 },
      { timestamp: 15, value: 200 },
      { timestamp: 35, value: 600 },
    ]);

    // check result
    expect(result).toEqual({
      parametric: [
        {
          x: { interval: [10, 25], value: 478 },
          y: { timestamp: 15, value: 200 },
        }, {
          x: { interval: [10, 25], value: 856 },
          y: { timestamp: 20, value: 600 },
        }, {
          x: { timestamp: 25, value: 1234 },
          y: { timestamp: 25, value: 400 },
        }, {
          x: { interval: [25, 40], value: 611.3333333333334 },
          y: { timestamp: 35, value: 600 },
        }, {
          x: { timestamp: 40, value: 300 },
          y: { timestamp: 40, value: 800 },
        },
      ],
      x: [
        { timestamp: 10, value: 100 },
        { timestamp: 25, value: 1234 },
        { timestamp: 40, value: 300 },
        { timestamp: 50, value: 500 },
      ],
      y: [
        { timestamp: 15, value: 200 },
        { timestamp: 20, value: 600 },
        { timestamp: 25, value: 400 },
        { timestamp: 35, value: 600 },
        { timestamp: 40, value: 800 },
      ],
    });
  });
});
