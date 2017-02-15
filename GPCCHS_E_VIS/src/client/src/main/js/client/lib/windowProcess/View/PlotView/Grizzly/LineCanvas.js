import React, { PropTypes, PureComponent } from 'react';
import { scaleLinear } from 'd3-scale';
import styles from './GrizzlyChart.css';

export default class LineCanvas extends PureComponent {

  static propTypes = {
    yAxesAt: PropTypes.string.isRequired,
    top: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    xScale: PropTypes.func.isRequired,
    yExtends: PropTypes.arrayOf(
      PropTypes.number
    ).isRequired,
    lines: PropTypes.arrayOf(
      PropTypes.shape({
        lineStyle: PropTypes.string,
        id: PropTypes.string.isRequired,
        dataSet: PropTypes.string.isRequired,
        yAxis: PropTypes.string.isdataSetsRequired,
        fill: PropTypes.string,
        strokeWidth: PropTypes.number,
        yAccessor: PropTypes.func.isRequired,
      })
    ).isRequired,
  }

  componentDidMount() {
    this.draw();
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;

    ['yAxesAt', 'top', 'height', 'margin', 'width', 'xScale'].forEach((attr) => {
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
      xScale,
    } = this.props;

    const yScale = scaleLinear()
      .domain([yExtends[0], yExtends[1]])
      .range([0, height]);

    const ctx = this.el.getContext('2d');

    ctx.clearRect(0, 0, width, height);

    lines.forEach((line) => {
      // Change style depending on line properties
      ctx.strokeStyle = line.fill || '#000000';
      ctx.lineWidth = line.strokeWidth || 4;
      if (line.lineStyle === 'Dashed') {
        ctx.setLineDash([6, 2]);
      } else if (line.lineStyle === 'Dotted') {
        ctx.setLineDash([3, 3]);
      } else {
        ctx.setLineDash([2, 0]);
      }

      // =============== DRAWING
      ctx.beginPath();
      line.data.forEach((data) => {
        const y = yScale(line.yAccessor(data));
        ctx.lineTo(xScale(data.x), y);
      });
      ctx.stroke();
      // ===============
    });
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
