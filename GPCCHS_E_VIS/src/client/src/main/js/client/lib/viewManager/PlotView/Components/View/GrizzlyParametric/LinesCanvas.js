import React, { PropTypes, Component } from 'react';
import styles from './GrizzlyChart.css';

export default class LinesCanvas extends Component {

  static propTypes = {
    updateLabelPosition: PropTypes.func.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    showLabelsX: PropTypes.bool,
    showLabelsY: PropTypes.bool,
    perfOutput: PropTypes.bool,
    data: PropTypes.objectOf(PropTypes.shape).isRequired,
    indexes: PropTypes.objectOf(PropTypes.shape).isRequired,
    current: PropTypes.number.isRequired,
    lines: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        xAxisId: PropTypes.string.isRequired,
        yAxisId: PropTypes.string.isRequired,
        fill: PropTypes.string,
        lineStyle: PropTypes.string,
        lineSize: PropTypes.number,
        pointSize: PropTypes.number,
        pointStyle: PropTypes.string,
        xAccessor: PropTypes.func,
        yAccessor: PropTypes.func,
        colorAccessor: PropTypes.string,
      })
    ).isRequired,
    divStyle: PropTypes.shape().isRequired,
    parametric: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    showLabelsX: false,
    showLabelsY: false,
    perfOutput: false,
  }

  componentDidMount() {
    this.draw();
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;

    const attrs = ['yAxesAt', 'perfOutput', 'xScale', 'yScale', 'showLabelsX', 'showLabelsY',
      'yScale', 'indexes', 'data', 'divStyle', 'parametric', 'current'];
    for (let i = 0; i < attrs.length; i += 1) {
      if (nextProps[attrs[i]] !== this.props[attrs[i]]) {
        shouldRender = true;
      }
    }

    if (!this.linesObject) {
      shouldRender = true;
    }
    const linesObject = {};
    nextProps.lines.forEach((l) => {
      if (this.linesObject && l !== this.linesObject[l.name]) {
        shouldRender = true;
      }
      linesObject[l.name] = l;
    });
    this.linesObject = linesObject;

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
      perfOutput,
      lines,
      updateLabelPosition,
      showLabelsX,
      showLabelsY,
      yScale,
      xScale,
      data,
      indexes,
      current,
      parametric,
      divStyle,
    } = this.props;

    const ctx = this.el.getContext('2d');

    ctx.clearRect(0, 0, divStyle.width, divStyle.height);

    let totalPoints = 0;
    // eslint-disable-next-line no-console, "DV6 TBC_CNES Perf logging"
    if (perfOutput) console.time();

    // eslint-disable-next-line complexity, "DV6 TBC_CNES Draw function, must not be split"
    lines.forEach((line) => {
      const lineIndexes = indexes[line.id];
      const lineData = data[line.id];
      if (perfOutput) totalPoints += lineIndexes.length;
      if (!lineData || !lineIndexes) {
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
        updateLabelPosition(line.yAxisId, line.xAxisId, line.id, null);
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
      const lineIndexesLength = lineIndexes.length;
      for (let i = 0; i < lineIndexesLength; i += 1) {
        const index = lineIndexes[i];
        const packet = lineData[index];
        const previousPacket = lineData[lineIndexes[i - 1]];
        const nextPacket = lineData[lineIndexes[i + 1]];
        if (!packet) {
          return;
        }
        if (line.colorAccessor) {
          const color = lineData[index][line.colorAccessor] || fill;
          if (color && color !== lastColor) {
            ctx.stroke();
            lastColor = color;
            ctx.strokeStyle = lastColor;
            ctx.fillStyle = lastColor;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
          }
        }

        const x = line.xAccessor ? line.xAccessor(packet) : packet.x;
        const y = line.yAccessor ? line.yAccessor(packet) : packet.value;

        // Current cursor drawing
        if (
          parametric &&
          current &&
          previousPacket &&
          (
            // current is between two packets (past)
            (previousPacket.masterTime < current && packet.masterTime > current) ||
            // current is above the last known packet (often real time)
            (!nextPacket && packet.masterTime < current)
          )
        ) {
          ctx.stroke();
          ctx.beginPath();
          ctx.font = `${fontSize * 2}px Arial`;
          ctx.fillStyle = '#1E2';
          ctx.strokeStyle = '#1E2';
          ctx.fillText('O', lastX - (pointOffset * 1.5), lastY + (fontSize / 1.5));
          ctx.stroke();
          ctx.beginPath();
          ctx.font = `${fontSize}px Arial`;
          ctx.strokeStyle = lastColor;
          ctx.fillStyle = lastColor;
          ctx.moveTo(lastX, lastY);
        }

        lastY = yScale(y);
        lastX = xScale(x);

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
      if (!showLabelsX && !showLabelsY) {
        return;
      }

      // Horizontal line
      const lastPacket = lineData[lineIndexes[lineIndexesLength - 1]];
      const lastXPosition = xScale(line.xAccessor ? line.xAccessor(lastPacket) : lastPacket.x);
      const lastYPosition = yScale(line.yAccessor ? line.yAccessor(lastPacket) : lastPacket.value);
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 3]);
      ctx.moveTo(lastXPosition, lastYPosition);
      ctx.lineTo(
        0,
        lastYPosition
      );
      ctx.moveTo(lastXPosition, lastYPosition);
      ctx.lineTo(
        lastXPosition,
        divStyle.height
      );

      updateLabelPosition(
        line.xAxisId,
        line.yAxisId,
        line.id,
        {
          x: (lastXPosition < 0 || lastXPosition > divStyle.width) ? null : lastXPosition,
          y: (lastYPosition < 0 || lastYPosition > divStyle.height) ? null : lastYPosition,
        }
      );

      ctx.stroke();
    });

    if (perfOutput) {
      // eslint-disable-next-line no-console, "DV6 TBC_CNES Perf logging"
      console.log(
        'axis pair',
        `{lines[0].xAxisId}-${lines[0].yAxisId}`,
        'Just drawed',
        lines.length,
        'lines, about',
        totalPoints,
        'total points'
      );
      // eslint-disable-next-line no-console, "DV6 TBC_CNES Perf logging"
      console.timeEnd();
    }
  }

  assignEl = (el) => { this.el = el; }

  render() {
    const {
      divStyle,
    } = this.props;

    return (
      <canvas
        ref={this.assignEl}
        height={divStyle.height}
        width={divStyle.width}
        className={styles.canvas}
        style={divStyle}
      />
    );
  }
}
