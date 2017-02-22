export function getZoomLevel(msWidth) {
  const zoomLevels = levelsRules.map(d => d.duration);
  let zoomLevel = zoomLevels.findIndex(v => msWidth >= v);
  if (zoomLevel === -1) {
    zoomLevel = zoomLevels.length - 1;
  }
  return zoomLevel;
}

const day = 1000 * 60 * 60 * 24;
const hour = 1000 * 60 * 60;
const min = 1000 * 60;
const sec = 1000;

export const levelsRules = [
  {
    duration: day * 365 * 10,
    startOf: 'year',
    add: [1, 'year'],
    // Format used by moment JS (Timebar)
    format: 'YYYY',
    // Format used by d3 JS (PlotView)
    formatD3: '%Y',
  },
  {
    duration: day * 365 * 2,
    startOf: 'year',
    add: [6, 'months'],
    format: 'YYYY[-]MM',
    formatD3: '%Y-%m',
  },
  {
    duration: day * 365,
    startOf: 'year',
    add: [2, 'month'],
    format: 'YYYY[-]MM[-]DD',
    formatD3: '%Y-%m-%d',
  },
  {
    duration: day * 120,
    startOf: 'year',
    add: [1, 'month'],
    format: 'YYYY[-]MM[-]DD',
    formatD3: '%Y-%m-%d',
  },
  {
    duration: day * 60,
    startOf: 'month',
    add: [15, 'day'],
    format: 'YYYY[-]MM[-]DD HH[:]mm',
    formatD3: '%Y-%m-%d %H:%M',
  },
  {
    duration: day * 30,
    startOf: 'month',
    add: [8, 'day'],
    format: 'YYYY[-]MM[-]DD HH[:]mm',
    formatD3: '%Y-%m-%d %H:%M',
  },
  {
    duration: day * 15,
    startOf: 'month',
    add: [4, 'day'],
    format: 'YYYY[-]MM[-]DD HH[:]mm',
    formatD3: '%Y-%m-%d %H:%M',
  },
  // level 5
  {
    duration: day * 7,
    startOf: 'month',
    add: [2, 'day'],
    format: 'YYYY[-]MM[-]DD HH[:]mm',
    formatD3: '%Y-%m-%d %H:%M',
  },
  {
    duration: day * 3,
    startOf: 'day',
    add: [12, 'hour'],
    format: 'MM[-]DD HH[:]mm',
    formatD3: '%m-%d %H:%M',
  },
  {
    duration: day,
    startOf: 'day',
    add: [6, 'hour'],
    format: 'MM[-]DD HH[:]mm',
    formatD3: '%m-%d %H:%M',
  },
  {
    duration: 12 * hour,
    startOf: 'day',
    add: [2, 'hour'],
    format: 'MM[-]DD HH[:]mm',
    formatD3: '%m-%d %H:%M',
  },
  {
    duration: 6 * hour,
    startOf: 'hour',
    add: [30, 'minute'],
    format: 'HH[:]mm',
    formatD3: '%H:%M',
  },
  // level 10
  {
    duration: 2 * hour,
    startOf: 'hour',
    add: [15, 'minute'],
    format: 'HH[:]mm',
    formatD3: '%H:%M',
  },
  {
    duration: min * 40,
    startOf: 'hour',
    add: [5, 'minute'],
    format: 'HH[:]mm',
    formatD3: '%H:%M',
  },
  {
    duration: min * 20,
    startOf: 'hour',
    add: [2, 'minute'],
    format: 'HH[:]mm',
    formatD3: '%H:%M',
  },
  {
    duration: min * 10,
    startOf: 'minute',
    add: [1, 'minute'],
    format: 'HH[:]mm',
    formatD3: '%H:%M',
  },
  {
    duration: min * 5,
    startOf: 'minute',
    add: [30, 'second'],
    format: 'HH[:]mm[:]ss',
    formatD3: '%H:%M:%S',
  },
  // level 15
  {
    duration: min * 2,
    startOf: 'minute',
    add: [20, 'second'],
    format: 'HH[:]mm[:]ss',
    formatD3: '%H:%M:%S',
  },
  {
    duration: min,
    startOf: 'minute',
    add: [10, 'second'],
    format: 'HH[:]mm[:]ss',
    formatD3: '%H:%M:%S',
  },
  {
    duration: sec * 30,
    startOf: 'minute',
    add: [5, 'second'],
    format: 'mm[:]ss',
    formatD3: '%M:%S',
  },
  {
    duration: sec * 10,
    startOf: 'minute',
    add: [2, 'second'],
    format: 'mm[:]ss',
    formatD3: '%M:%S',
  },
  {
    duration: sec * 5,
    startOf: 'second',
    add: [1, 'second'],
    format: 'mm[:]ss',
    formatD3: '%M:%S',
  },
  // level 20
  {
    duration: sec * 2,
    startOf: 'second',
    add: [500, 'ms'],
    format: 'mm[:]ss[.]SSS',
    formatD3: '%M:%S.%L',
  },
  {
    duration: sec,
    startOf: 'second',
    add: [200, 'ms'],
    format: 'mm[:]ss[.]SSS',
    formatD3: '%M:%S.%L',
  },
  {
    duration: sec / 2,
    startOf: 'second',
    add: [100, 'ms'],
    format: 'mm[:]ss[.]SSS',
    formatD3: '%M:%S.%L',
  },
  {
    duration: sec / 4,
    startOf: 'second',
    add: [50, 'ms'],
    format: 'mm[:]ss[.]SSS',
    formatD3: '%M:%S.%L',
  },
];
