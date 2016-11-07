/* eslint-disable */
import React, { PropTypes } from "react";

import { hexToRGBA, functor } from 'react-stockcharts/lib/utils';

function Square(props) {
	const {
    className, stroke, strokeWidth,
    opacity, fill, point, width:w
  } = props;

  const width = functor(w)(point.datum);
  const x = point.x - (width / 2);
  const y = point.y - (width / 2);

	return (
		<rect
      className={className}
			x={x}
      y={y}
			stroke={stroke}
      strokeWidth={strokeWidth}
			fillOpacity={opacity}
      fill={fill}
      width={width}
      height={width}
    />
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
	]).isRequired
};

Square.defaultProps = {
	stroke: "#4682B4",
	strokeWidth: 1,
	opacity: 0.5,
	fill: "#4682B4",
	className: "react-stockcharts-marker-rect",
};

Square.drawOnCanvas = (props, point, ctx) => {
	const { stroke, fill, opacity, strokeWidth } = props;

	ctx.strokeStyle = stroke;
	ctx.lineWidth = strokeWidth;

	if (fill !== "none") {
		ctx.fillStyle = hexToRGBA(fill, opacity);
	}

	Square.drawOnCanvasWithNoStateChange(props, point, ctx);
};


Square.drawOnCanvasWithNoStateChange = (props, point, ctx) => {
	const { width:w } = props;
  const width = functor(w)(point.datum);
  const x = point.x - (width / 2);
  const y = point.y - (width / 2);

	ctx.beginPath();
  ctx.rect(x, y, width, width);
	ctx.stroke();
	ctx.fill();
};

export default Square;
