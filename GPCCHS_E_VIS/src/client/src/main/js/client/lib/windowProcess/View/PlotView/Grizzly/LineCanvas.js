import React, { PropTypes, PureComponent } from 'react';
import { scaleLinear } from 'd3-scale';
import styles from './GrizzlyChart.css';

export default class LineCanvas extends PureComponent {

  static propTypes = {
    yAxesAt: PropTypes.string.isRequired,
    margin: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    xScale: PropTypes.func.isRequired,
    dataSets: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        data: PropTypes.array.isRequired,
      })
    ).isRequired,
    yExtends: PropTypes.arrayOf(
      PropTypes.number
    ).isRequired,
    lines: PropTypes.arrayOf(
      PropTypes.shape({
        lineStyle: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        dataSet: PropTypes.string.isRequired,
        yAxis: PropTypes.string.isdataSetsRequired,
        fill: PropTypes.string.isRequired,
        strokeWidth: PropTypes.number.isRequired,
        yAccessor: PropTypes.func.isRequired,
      })
    ).isRequired,
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw = () => {
    const {
      height,
      width,
      lines,
      dataSets,
      yExtends,
      xScale,
    } = this.props;

    const yScale = scaleLinear()
      .domain([yExtends[0], yExtends[1]])
      .range([0, height]);

    const ctx = this.el.getContext('2d');

    ctx.clearRect(0, 0, width, height);

    lines.forEach((line) => {
      let datas = dataSets.find(d => d.id === line.dataSet);
      if (!datas) {
        console.log(`Line ${line.name} render error : data not found`);
        return;
      }
      datas = datas.data;

      // Change style depending on line properties
      ctx.strokeStyle = line.fill || '#000000';
      ctx.lineWidth = line.strokeWidth || 4;
      if (line.lineStyle === 'Dashed') {
        ctx.setLineDash([4, 2]);
      }

      // =============== DRAWING
      ctx.beginPath();
      datas.forEach((data) => {
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
      style.left = `${margin}px`;
    } else if (yAxesAt === 'right') {
      style.right = `${margin}px`;
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
