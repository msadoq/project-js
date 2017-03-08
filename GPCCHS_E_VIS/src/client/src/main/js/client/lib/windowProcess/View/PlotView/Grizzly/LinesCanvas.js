import React, { PropTypes, PureComponent } from 'react';
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
    yScale: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape).isRequired,
    showLabels: PropTypes.bool,
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
  }

  componentDidMount() {
    this.draw();
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;

    ['yAxesAt', 'top', 'height', 'margin', 'width',
      'xScale', 'showLabels', 'data', 'yScale'].forEach((attr) => {
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
      data,
      xScale,
      updateLabelPosition,
      axisId,
      showLabels,
      yScale,
    } = this.props;

    const ctx = this.el.getContext('2d');

    ctx.clearRect(0, 0, width, height);

    // console.time();

    lines.forEach((line) => {
      // Default values
      const fill = line.fill || '#222222';
      const lineSize = typeof line.lineSize !== 'number' ? 1 : line.lineSize;
      const pointSize = typeof line.pointSize !== 'number' ? 0 : line.pointSize;

      ctx.strokeStyle = fill;
      ctx.fillStyle = fill;
      ctx.lineWidth = lineSize;

      // Only uszed for Dot points
      const fontSize = pointSize * 3;
      ctx.font = `${fontSize}px Arial`;

      if (line.lineStyle === 'Dashed') {
        ctx.setLineDash([6, 2]);
      } else if (line.lineStyle === 'Dotted') {
        ctx.setLineDash([3, 3]);
      } else {
        ctx.setLineDash([2, 0]);
      }

      // Do not draw
      if (!lineSize && (!pointSize || !line.pointStyle)) {
        updateLabelPosition(axisId, line.id, null);
        return;
      }

      // =============== DRAWING
      ctx.beginPath();

      // Point (only if size > 0 AND style not null
      let pointOffset;
      if (line.pointStyle && pointSize) {
        pointOffset = pointSize / 2;
      }

      let lastColor = fill;
      let lastX;
      let lastY;
      for (let i = 0; i < data.length; i += 1) {
        if (line.colorAccessor) {
          const color = line.colorAccessor(data[i]) || fill;
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

        // Draw line
        if (lineSize > 0) {
          ctx.lineTo(lastX, lastY);
        }

        // Draw point
        if (pointOffset && line.pointStyle === 'Square') {
          ctx.fillRect(lastX - pointOffset, lastY - pointOffset, pointSize, pointSize);
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
