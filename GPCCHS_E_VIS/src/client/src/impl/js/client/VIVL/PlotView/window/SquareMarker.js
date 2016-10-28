import React, { PropTypes } from "react";

import { hexToRGBA, functor } from "react-stockcharts/lib/utils";

function Square(props) {
  const {
    className, stroke, strokeWidth, opacity,
    fill, point, width, height
  } = props;

  return (
    <rect className={className}
      cx={point.x} cy={point.y}
      stroke={stroke} strokeWidth={strokeWidth}
      fillOpacity={opacity} fill={fill}
      width={functor(width)(point.datum)}
      height={functor(height)(point.datum)} />
  );
}

Square.propTypes = {
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
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func
  ]).isRequired,
	height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func
  ]).isRequired
};

Square.defaultProps = {
  stroke: "red",
  strokeWidth: 1,
  opacity: 0.5,
  fill: "#4682B4",
  className: "react-stockcharts-marker-rect",
};

Square.drawOnCanvas = (props, point, ctx) => {

  var { stroke, fill, opacity, strokeWidth } = props;

  ctx.strokeStyle = stroke;
  ctx.lineWidth = strokeWidth;

  if (fill !== "none") {
    ctx.fillStyle = hexToRGBA(fill, opacity);
  }

  Square.drawOnCanvasWithNoStateChange(props, point, ctx);
};


Square.drawOnCanvasWithNoStateChange = (props, point, ctx) => {

  var { r } = props;
  var radius = functor(r)(point.datum);

  ctx.moveTo(point.x, point.y);
  ctx.beginPath();
  ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
  ctx.stroke();
  ctx.fill();
};

export default Square;
