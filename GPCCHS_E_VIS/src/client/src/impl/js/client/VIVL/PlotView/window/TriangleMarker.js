import React, { PropTypes } from 'react';

import { hexToRGBA, functor } from 'react-stockcharts/lib/utils';

function Triangle(props) {
  const { className, stroke, strokeWidth, opacity, fill, point, r } = props;
  const radius = functor(r)(point.datum);
  return (
    <rect
      className={className}
      cx={point.x} cy={point.y}
      stroke={stroke} strokeWidth={strokeWidth}
      fillOpacity={opacity} fill={fill} r={radius}
    />
  );
}

Triangle.propTypes = {
  stroke: PropTypes.string,
  fill: PropTypes.string.isRequired,
  opacity: PropTypes.number.isRequired,
  point: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    datum: PropTypes.object.isRequired,
  }).isRequired,
  className: PropTypes.string,
  strokeWidth: PropTypes.number,
  r: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func
  ]).isRequired
};

Triangle.defaultProps = {
  stroke: '#4682B4',
  strokeWidth: 1,
  opacity: 0.5,
  fill: '#4682B4',
  className: 'react-stockcharts-marker-circle',
};

Triangle.drawOnCanvas = (props, point, ctx) => {
  const newCtx = { ...ctx };
  const { stroke, fill, opacity, strokeWidth } = props;

  newCtx.strokeStyle = stroke;
  newCtx.lineWidth = strokeWidth;

  if (fill !== 'none') {
    newCtx.fillStyle = hexToRGBA(fill, opacity);
  }

  Triangle.drawOnCanvasWithNoStateChange(props, point, newCtx);
};


Triangle.drawOnCanvasWithNoStateChange = (props, point, ctx) => {
  const { r } = props;
  const radius = functor(r)(point.datum);

  ctx.moveTo(point.x, point.y);
  ctx.beginPath();
  ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
  ctx.stroke();
  ctx.fill();
};

export default Triangle;
