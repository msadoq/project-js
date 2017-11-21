import { PropTypes } from 'react';

const { shape, number, string, func, bool, array, arrayOf, objectOf } = PropTypes;

export const axisType = shape({
  id: string.isRequired,
  orient: string.isRequired,
  extents: array.isRequired,
  autoLimits: bool.isRequired,
  showAxis: bool.isRequired,
  showLabels: bool,
  showTicks: bool,
  autoTick: bool,
  tickStep: number,
  showGrid: bool,
  gridStyle: string,
  gridSize: number,
  unit: string,
  label: string.isRequired,
  format: string,
  labelStyle: shape,
  formatAsDate: bool,
});

export const lineType = shape({
  data: objectOf(shape),
  indexes: arrayOf(number),
  id: string.isRequired,
  yAxisId: string.isRequired,
  xAxisId: string.isRequired,
  fill: string,
  lineStyle: string,
  lineSize: number,
  pointSize: number,
  pointStyle: string,
  dataAccessor: string,
  stopInstruction: func,
  xAccessor: func,
  yAccessor: func,
  xTooltipAccessor: func,
  yTooltipAccessor: func,
  colorAccessor: string,
  tooltipFormatter: func,
});

export const labelStyleType = shape({
  bgColor: string,
  color: string,
  align: string,
  font: string,
  italic: bool,
  bold: bool,
  underline: bool,
  size: number,
});

export const divStyleType = shape({
  top: number.isRequired,
  width: number.isRequired,
  height: number.isRequired,
  left: number,
  right: number,
});
