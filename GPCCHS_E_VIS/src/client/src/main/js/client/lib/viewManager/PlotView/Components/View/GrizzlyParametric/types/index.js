import PropTypes from 'prop-types';

export const axisType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  orient: PropTypes.string.isRequired,
  extents: PropTypes.array.isRequired,
  autoLimits: PropTypes.bool.isRequired,
  showAxis: PropTypes.bool.isRequired,
  showLabels: PropTypes.bool,
  showTicks: PropTypes.bool,
  autoTick: PropTypes.bool,
  tickStep: PropTypes.number,
  showGrid: PropTypes.bool,
  gridStyle: PropTypes.string,
  gridSize: PropTypes.number,
  unit: PropTypes.string,
  label: PropTypes.string.isRequired,
  format: PropTypes.string,
  labelStyle: PropTypes.shape,
  formatAsDate: PropTypes.bool,
});

export const lineType = PropTypes.shape({
  data: PropTypes.objectOf(PropTypes.shape),
  indexes: PropTypes.arrayOf(PropTypes.number),
  id: PropTypes.string.isRequired,
  yAxisId: PropTypes.string.isRequired,
  xAxisId: PropTypes.string.isRequired,
  fill: PropTypes.string,
  lineStyle: PropTypes.string,
  lineSize: PropTypes.number,
  pointSize: PropTypes.number,
  pointStyle: PropTypes.string,
  dataAccessor: PropTypes.string,
  stopInstruction: PropTypes.func,
  xAccessor: PropTypes.func,
  yAccessor: PropTypes.func,
  xTooltipAccessor: PropTypes.func,
  yTooltipAccessor: PropTypes.func,
  colorAccessor: PropTypes.string,
  tooltipFormatter: PropTypes.func,
});

export const labelStyleType = PropTypes.shape({
  bgColor: PropTypes.string,
  color: PropTypes.string,
  align: PropTypes.string,
  font: PropTypes.string,
  italic: PropTypes.bool,
  bold: PropTypes.bool,
  underline: PropTypes.bool,
  size: PropTypes.number,
});

export const divStyleType = PropTypes.shape({
  top: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  left: PropTypes.number,
  right: PropTypes.number,
});
