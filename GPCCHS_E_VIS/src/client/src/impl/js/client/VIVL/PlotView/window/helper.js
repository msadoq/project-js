import _get from 'lodash/get';
import {
  series
} from 'react-stockcharts';
import {
  timeYear, timeMonth, timeWeek, timeDay,
  timeHour, timeMinute, timeSecond
} from 'd3-time';
import { timeFormat } from 'd3-time-format';

const {
  CircleMarker, SquareMarker, TriangleMarker
} = series;

export const getLineMarker = (pointsStyle) => {
  switch (pointsStyle) {
    case 'Square':
      return SquareMarker;
    case 'Triangle':
      return TriangleMarker;
    case 'Dot':
    case 'None':
    default:
      return CircleMarker;
  }
};

export const getLineMarkerProps = (pointsStyle, pointsSize, props) => {
  let styleProps = {};
  switch (pointsStyle) {
    case 'Square':
      styleProps = { width: pointsSize || 4 };
      break;
    case 'Triangle':
      styleProps = { width: pointsSize || 5 };
      break;
    case 'Dot':
      styleProps = { r: pointsSize || 2 };
      break;
    case 'None':
    default:
      styleProps = { r: 0 };
  }
  return { ...styleProps, ...props };
};

export const getFilteredEntryPoints = (entryPoints = []) => entryPoints
  .filter(ep =>
    ep.name &&
    ep.connectedDataX.formula &&
    ep.connectedDataY.formula
  );

export const getEntryPointsCharts = (config) => {
  const { entryPoints, axes, grids = [] } = config;
  const grid = grids[0];
  const charts = {};
  let mainChart;

  getFilteredEntryPoints(entryPoints).forEach((ep) => {
    const xId = _get(ep, 'connectedDataX.axisId');
    const yId = _get(ep, 'connectedDataY.axisId');
    const isMainChart = grid && grid.xAxisId === xId && grid.yAxisId === yId;
    if (!axes[yId].showAxis) {
      return;
    }
    const refChart = isMainChart ? mainChart : charts[`${xId}${yId}`];
    const line = getLine(ep);
    if (refChart) {
      refChart.yKeys.push(line.key);
      refChart.lines.push(line);
    } else {
      const newChart = {
        xAxis: axes[xId],
        yAxis: axes[yId],
        yKeys: [line.key],
        lines: [line]
      };
      // Associate the grid if x and y match
      if (isMainChart) {
        mainChart = {
          ...newChart,
          grid
        };
      } else {
        charts[`${xId}${yId}`] = newChart;
      }
    }
  });
  const chartArray = Object.values(charts);
  return mainChart ? chartArray.concat([mainChart]) : chartArray;
};

export const getLine = ep => ({
  name: ep.name,
  key: ep.name,
  color: _get(ep, 'objectStyle.curveColor', '#000000'),
  lineStyle: _get(ep, 'objectStyle.line.style', 'Continuous'), // "Continuous", "Dotted", "Dashed"
  lineSize: _get(ep, 'objectStyle.line.size'),
  pointsStyle: _get(ep, 'objectStyle.points.style', 'None'), // "None", "Triangle", "Square", "Dot"
  pointsSize: _get(ep, 'objectStyle.points.size'),
});

export const getLines = entryPoints => getFilteredEntryPoints(entryPoints)
  .map(ep => getLine(ep));

export const getLineStyle = (lineStyle) => {
  switch (lineStyle) {
    case 'Dashed':
      return 'Dash';
    case 'Dotted':
      return 'Dot';
    case 'Continuous':
    case 'None':
    default:
      return 'Solid';
  }
};

const formatMillisecond = timeFormat('.%L');
const formatSecond = timeFormat(':%S');
const formatMinute = timeFormat('%H:%M');
const formatHour = timeFormat('%H %p');
const formatDay = timeFormat('%a %d');
const formatWeek = timeFormat('%b %d');
const formatMonth = timeFormat('%B');
const formatYear = timeFormat('%Y');

/* eslint-disable no-nested-ternary */
export const zoomDateFormat = date => (timeSecond(date) < date ? formatMillisecond
    : timeMinute(date) < date ? formatSecond
    : timeHour(date) < date ? formatMinute
    : timeDay(date) < date ? formatHour
    : timeMonth(date) < date ? (timeWeek(date) < date ? formatDay : formatWeek)
    : timeYear(date) < date ? formatMonth
    : formatYear)(date);

export const fullDateFormat = timeFormat('%Y-%m-%d %H:%M:%S.%L');

export const monitoringStateColors = {
  info: '#FFFF33',        /* jaune */
  warning: '#FF6600',       /* orange */
  alarm: '#FD1C03',       /* rouge orangé */
  severe: '#9900FF',      /* violet */
  critical: '#DD0000',    /* rouge */
  outOfRange: '#999999',  /* gris */
};

/* eslint-disable no-param-reassign */
export const drawBadge = ({
  text,
  font = 'Arial',
  fontHeight = 10,
  margin = 10,
  textColor = '#FFF',
  x = 0,
  y = 0,
  width,
  height,
  radius = 8,
  fillColor = '#F00',
  ctx
}) => {
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = fillColor;

  const w = width || (ctx.measureText(text).width + (margin * 2));
  const h = height || (fontHeight + margin);
  // Set faux rounded corners
  ctx.lineJoin = 'round';
  ctx.lineWidth = radius;

  // Change origin and dimensions to match true size (a stroke makes the shape a bit larger)
  ctx.strokeRect(x + (radius / 2), y + (radius / 2), w - radius, h - radius);
  ctx.fillRect(x + (radius / 2), y + (radius / 2), w - radius, h - radius);

  // ctx.fillRect(0,0,ctx.measureText(str).width+20,30)
  ctx.fillStyle = textColor;
  ctx.font = `${fontHeight}pt ${font}`;
  ctx.fillText(text, x + (margin * 0.9), y + (margin * 1.4));
};
/* eslint-enable no-param-reassign */
