import React, { PropTypes, Component } from 'react';
import _memoize from 'lodash/memoize';
import styles from './GrizzlyChart.css';

export default class LinesCanvas extends Component {

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
    data: PropTypes.objectOf(PropTypes.shape),
    showLabels: PropTypes.bool,
    // perfOutput: PropTypes.bool.isRequired,
    lines: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        yAxis: PropTypes.string.isRequired,
        fill: PropTypes.string,
        lineStyle: PropTypes.string,
        lineSize: PropTypes.number,
        pointSize: PropTypes.number,
        pointStyle: PropTypes.string,
        dataAccessor: PropTypes.func,
        yAccessor: PropTypes.func.isRequired,
        colorAccessor: PropTypes.func,
      })
    ).isRequired,
  }

  static defaultProps = {
    showLabels: false,
    data: null,
  }

  componentDidMount() {
    this.draw();
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;

    const attrs = ['yAxesAt', 'top', 'height', 'margin', 'width', 'perfOutput',
      'xScale', 'showLabels', 'data', 'yScale'];
    for (let i = 0; i < attrs.length; i += 1) {
      if (nextProps[attrs[i]] !== this.props[attrs[i]]) {
        shouldRender = true;
      }
    }

    const linesNames = nextProps.lines.map(l => l.name).join('-');
    if (!this.linesNames || linesNames !== this.linesNames) {
      shouldRender = true;
    }
    this.linesNames = linesNames;

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
      // perfOutput,
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

    // let totalPoints = 0;
    // if (perfOutput) console.time();

    // eslint-disable-next-line complexity, "DV6 TBC_CNES Draw function, must not be split"
    lines.forEach((line) => {
      const dataLine = line.dataAccessor && data
        ? line.dataAccessor(data)
        : line.data;
      // if (perfOutput) totalPoints += dataLine.length;
      if (!dataLine) {
        // console.log(`No data for line ${line.id}`);
        return;
      }
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
      for (let i = 0; i < dataLine.length; i += 1) {
        if (line.colorAccessor) {
          const color = line.colorAccessor(dataLine[i]) || fill;
          if (color && color !== lastColor) {
            ctx.stroke();
            lastColor = color;
            ctx.strokeStyle = lastColor;
            ctx.fillStyle = lastColor;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
          }
        }

        lastY = yScale(line.yAccessor ? line.yAccessor(dataLine[i]) : dataLine[i].y);
        lastX = xScale(line.xAccessor ? line.xAccessor(dataLine[i]) : dataLine[i].x);

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
      const lastYPosition = yScale(line.yAccessor(dataLine[dataLine.length - 1]));
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 3]);
      const lastPacket = dataLine[dataLine.length - 1];
      ctx.moveTo(xScale(line.xAccessor ? line.xAccessor(lastPacket) : lastPacket.x), lastYPosition);
      ctx.lineTo(
        xScale(line.xAccessor ? line.xAccessor(dataLine[0]) : dataLine[0].x),
        lastYPosition
      );

      updateLabelPosition(
        axisId,
        line.id,
        (lastYPosition < 0 || lastYPosition > height) ? null : lastYPosition
      );
      ctx.stroke();
    });

    // if (perfOutput) {
    //   console.log(
    //     'axis',
    //     axisId,
    //     'Just drawed',
    //     lines.length,
    //     'lines, about',
    //     totalPoints,
    //     'total points'
    //   );
    //   console.timeEnd();
    // }
  }

  assignEl = (el) => { this.el = el; }

  memoizeStyle = _memoize((hash, margin, top) =>
    ({
      ...margin,
      top,
    })
  );

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

    return (
      <canvas
        ref={this.assignEl}
        height={height}
        width={width}
        className={styles.canvas}
        style={this.memoizeStyle(
          `${top}-${margin.left}-${margin.right}`,
          style,
          top
        )}
      />
    );
  }
}
