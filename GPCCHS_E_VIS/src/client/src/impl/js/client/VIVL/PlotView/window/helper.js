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

export const getLines = (entryPoints = []) => entryPoints.map(ep => ({
  name: ep.name,
  key: ep.name,
  color: ep.objectStyle.curveColour,
  lineStyle: ep.objectStyle.line.style, // "Continuous", "Dotted", "Dashed"
  lineSize: ep.objectStyle.line.size,
  pointsStyle: ep.objectStyle.points.style, // "None", "Triangle", "Square", "Dot"
  pointsSize: ep.objectStyle.points.size,
}));

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
