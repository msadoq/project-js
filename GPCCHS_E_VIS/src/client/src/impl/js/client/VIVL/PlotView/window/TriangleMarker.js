/* eslint-disable */
import React, { PropTypes } from "react";

import { hexToRGBA, functor } from 'react-stockcharts/lib/utils';

function Triangle(props) {
	const {
    className, stroke, strokeWidth,
    opacity, fill, point, width:w
  } = props;

  const width = functor(w)(point.datum);
  const w2 = width / 2;
  const w4 = width / 4;
  const innerHypotenuse = w2 * (1 / Math.cos(30 * Math.PI / 180));
  const innerOpposite = w2 * (1 / Math.tan(60 * Math.PI / 180));
  const x = point.x;
  const y = point.y - w4;

  const points = `${x} ${y - innerHypotenuse}, ${x + w2} ${y + innerOpposite}, ${x - w2} ${y + innerOpposite}`;

	return (
		<polygon
      className={className}
      points={points}
			stroke={stroke}
      strokeWidth={strokeWidth}
			fillOpacity={opacity}
      fill={fill}
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
	width: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.func
	]).isRequired
};

Triangle.defaultProps = {
	stroke: "#4682B4",
	strokeWidth: 1,
	opacity: 0.5,
	fill: "#4682B4",
	className: "react-stockcharts-marker-triangle",
};

Triangle.drawOnCanvas = (props, point, ctx) => {
	const { stroke, fill, opacity, strokeWidth } = props;

	ctx.strokeStyle = stroke;
	ctx.lineWidth = strokeWidth;

	if (fill !== "none") {
		ctx.fillStyle = hexToRGBA(fill, opacity);
	}

	Triangle.drawOnCanvasWithNoStateChange(props, point, ctx);
};


Triangle.drawOnCanvasWithNoStateChange = (props, point, ctx) => {
	const { width:w } = props;

  const width = functor(w)(point.datum);
  const w2 = width / 2;
  const w4 = width / 4;
  const innerHypotenuse = w2 * (1 / Math.cos(30 * Math.PI / 180));
  const innerOpposite = w2 * (1 / Math.tan(60 * Math.PI / 180));
  const x = point.x;
  const y = point.y - w4;


	ctx.beginPath();
  ctx.moveTo(x, y - innerOpposite);
  ctx.lineTo(x + w2, y + innerHypotenuse);
  ctx.lineTo(x - w2, y + innerHypotenuse);
	ctx.stroke();
	ctx.fill();
};

export default Triangle;
