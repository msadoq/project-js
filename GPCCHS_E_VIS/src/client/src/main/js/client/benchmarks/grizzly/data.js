// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #7281 : 18/07/2017 : Added bench for color changing only 3 times, + fixed
//  webpack error.
// VERSION : 1.1.2 : DM : #7281 : 18/07/2017 : First benchmark of Grizzly charting lib used in
//  PlotView.
// VERSION : 2.0.0 : FA : #9028 : 13/11/2017 : fix benchmark grizzly + .
// VERSION : 2.0.0 : DM : #6818 : 21/11/2017 : add stop instruction to grizzly & update tests
//  (obsolete data)
// VERSION : 2.0.0 : FA : #10311 : 19/01/2018 : Fix lint issues in benchmarks/ folder
// END-HISTORY
// ====================================================================

export const data = (length, value) => {
  const points = {};
  for (let i = 0; i < length; i += 1) {
    const x = 10 + i;
    const val = value + ((15 * i) % 1000);
    points[x] = {
      x,
      value: val,
      masterTime: x,
      refTime: x,
      symbol: val.toString(),
      valX: x,
      isObsolete: (i % 5 === 0),
    };
  }
  return points;
};

export const dataColorRandom = (length, value, colors) => {
  const points = {};
  for (let i = 0; i < length; i += 1) {
    const x = 10 + i;
    const val = value + ((15 * i) % 1000);
    points[x] = {
      x,
      value: val,
      masterTime: x,
      refTime: x,
      symbol: val.toString(),
      valX: x,
      color: `#AA${colors[Math.round(Math.random() * 14)]}`,
      isObsolete: (i % 100 === 0),
    };
  }
  return points;
};


export const data1000Points = () => data(1000, 500);

export const data1000Points2 = () => data(1000, 1100);

export const data10000Points = () => data(10000, 500);

export const data10000Points2 = () => data(10000, 1100);

export const data25000Points = () => data(25000, 600);

export const data25000Points2 = () => data(25000, 600);

export const data10000PointsColorChanging = () => dataColorRandom(10000, 500, ['0', '1', '2', '3', '4', '5', '6', '7', '9', 'A', 'C', 'D', 'E', 'F']);

export const data10000Points4Colors = () => dataColorRandom(10000, 500, ['0', '6', 'A', 'F']);
