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
    yExtends: PropTypes.arrayOf(
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
    },
  }

  componentDidMount() {
    this.draw();
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;

    ['yAxesAt', 'top', 'height', 'margin', 'width', 'xScale', 'showLabels'].forEach((attr) => {
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

  draw = () => {
    const {
      height,
      width,
      lines,
      yExtends,
      data,
      xScale,
      updateLabelPosition,
      axisId,
      showLabels,
    } = this.props;
    const yScale = scaleLinear()
      .domain([yExtends[0], yExtends[1]])
      .range([0, height]);

    const ctx = this.el.getContext('2d');

    ctx.clearRect(0, 0, width, height);

    // console.time();

    lines.forEach((line) => {
      // Change style depending on line properties
      ctx.strokeStyle = line.fill;
      ctx.fillStyle = line.fill;
      ctx.lineWidth = line.lineSize;
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

      data.forEach((dataLine) => {
        const y = yScale(line.yAccessor(dataLine));
        const x = xScale(dataLine.x);
        if (line.lineSize > 0) {
          ctx.lineTo(x, y);
        }

        // draw point
        if (pointOffset) {
          ctx.fillRect(x - pointOffset, y - pointOffset, line.pointSize, line.pointSize);
        }
      });
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
