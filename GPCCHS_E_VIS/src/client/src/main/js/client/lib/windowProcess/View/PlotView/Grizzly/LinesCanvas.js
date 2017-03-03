import React, { PropTypes, PureComponent } from 'react';
import { scaleLinear } from 'd3-scale';
import styles from './GrizzlyChart.css';

export default class LinesCanvas extends PureComponent {

  static propTypes = {
    updateLabelPosition: PropTypes.func.isRequired,
    axisId: PropTypes.string.isRequired,
    yAxesAt: PropTypes.string.isRequired,
    top: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    xScale: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape).isRequired,
    showLabels: PropTypes.bool,
    yExtents: PropTypes.arrayOf(
      PropTypes.number
    ).isRequired,
    lines: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        yAxis: PropTypes.string.isRequired,
        fill: PropTypes.string,
        lineStyle: PropTypes.string,
        lineSize: PropTypes.number,
        pointSize: PropTypes.number,
        pointStyle: PropTypes.string,
        yAccessor: PropTypes.func.isRequired,
        colorAccessor: PropTypes.func,
      })
    ).isRequired,
  }

  static defaultProps = {
    showLabels: false,
    lines: {
      fill: '#222222',
      lineSize: 0,
      lineStyle: 'Continuous',
      pointSize: 0,
      pointStyle: null,
      colorAccessor: null,
    },
  }

  componentDidMount() {
    this.draw();
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;

    ['yAxesAt', 'top', 'height', 'margin', 'width',
      'xScale', 'showLabels', 'data'].forEach((attr) => {
        if (nextProps[attr] !== this.props[attr]) {
          shouldRender = true;
        }
      });

    if (nextProps.lines.length !== this.props.lines.length) {
      shouldRender = true;
    }

    return shouldRender;
  }

  componentDidUpdate() {
    this.draw();
  }

  drawTriangle = (ctx, lastX, lastY, pointOffset) => {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY - pointOffset);
    ctx.lineTo(lastX - pointOffset, lastY + pointOffset);
    ctx.lineTo(lastX + pointOffset, lastY + pointOffset);
    ctx.lineTo(lastX, lastY - pointOffset);
    ctx.fill();
    ctx.stroke();
  }

  draw = () => {
    const {
      height,
      width,
      lines,
      yExtents,
      data,
      xScale,
      updateLabelPosition,
      axisId,
      showLabels,
    } = this.props;
    const yScale = scaleLinear()
      .domain([yExtents[0], yExtents[1]])
      .range([0, height]);

    const ctx = this.el.getContext('2d');

    ctx.clearRect(0, 0, width, height);

    // console.time();

    lines.forEach((line) => {
      // Change style depending on line properties
      ctx.strokeStyle = line.fill;
      ctx.fillStyle = line.fill;
      ctx.lineWidth = line.lineSize;
      // Only uszed for Dot points
      const fontSize = line.pointSize * 3;
      ctx.font = `${fontSize}px Arial`;
      if (line.lineStyle === 'Dashed') {
        ctx.setLineDash([6, 2]);
      } else if (line.lineStyle === 'Dotted') {
        ctx.setLineDash([3, 3]);
      } else {
        ctx.setLineDash([2, 0]);
      }

      // Do not draw
      if (!line.lineSize && (!line.pointSize || !line.pointStyle)) {
        updateLabelPosition(axisId, line.id, null);
        return;
      }

      // =============== DRAWING
      ctx.beginPath();

      // Point (only if size > 0 AND style not null
      let pointOffset;
      if (line.pointStyle && line.pointSize) {
        pointOffset = line.pointSize / 2;
      }

      let lastColor = line.fill;
      let lastX;
      let lastY;
      for (let i = 0; i < data.length; i += 1) {
        if (line.colorAccessor) {
          const color = line.colorAccessor(data[i]) || line.fill;
          if (color && color !== lastColor) {
            ctx.stroke();
            lastColor = color;
            ctx.strokeStyle = lastColor;
            ctx.fillStyle = lastColor;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
          }
        }

        lastY = yScale(line.yAccessor(data[i]));
        lastX = xScale(data[i].x);

        if (line.lineSize > 0) {
          ctx.lineTo(lastX, lastY);
        }

        // draw point
        if (pointOffset && line.pointStyle === 'Square') {
          ctx.fillRect(lastX - pointOffset, lastY - pointOffset, line.pointSize, line.pointSize);
        } else if (pointOffset && line.pointStyle === 'Dot') {
          ctx.fillText('•', lastX - pointOffset, lastY + (fontSize / 3));
        } else if (pointOffset && line.pointStyle === 'Triangle') {
          ctx.stroke();
          this.drawTriangle(ctx, lastX, lastY, pointOffset);
          ctx.beginPath();
          ctx.moveTo(lastX, lastY);
        }
      }

      ctx.stroke();

      if (!showLabels) {
        return;
      }

      // Horizontal line
      const lastYPosition = yScale(line.yAccessor(data[data.length - 1]));
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 3]);
      ctx.moveTo(xScale(data[data.length - 1].x), lastYPosition);
      ctx.lineTo(
        xScale(data[0].x),
        lastYPosition
      );
      updateLabelPosition(axisId, line.id, lastYPosition);
      ctx.stroke();
      // ===============
    });

    // console.log(
    //   'Just drawed',
    //   lines.length,
    //   'lines',
    //   data.length * lines.length,
    //   'total points'
    // );
    // console.timeEnd();
  }

  assignEl = (el) => { this.el = el; }

  render() {
    const {
      height,
      width,
      yAxesAt,
      top,
      margin,
    } = this.props;

    const style = {};
    // horizontal position
    if (yAxesAt === 'left') {
      style.left = margin;
    } else if (yAxesAt === 'right') {
      style.right = margin;
    }

    // vertical position
    style.top = top;

    return (
      <canvas
        ref={this.assignEl}
        height={height}
        width={width}
        className={styles.canvas}
        style={style}
      />
    );
  }
}
