import React, { PropTypes, PureComponent } from 'react';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { axisLeft, axisRight } from 'd3-axis';
import styles from './GrizzlyChart.css';

export default class YAxis extends PureComponent {

  static propTypes = {
    yAxesAt: PropTypes.string.isRequired,
    top: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    yAxisWidth: PropTypes.number.isRequired,
    margin: PropTypes.number.isRequired,
    yExtends: PropTypes.arrayOf(
      PropTypes.number
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
      yAxesAt,
      height,
      yAxisWidth,
      yExtends,
    } = this.props;

    const yScale = scaleLinear()
      .domain([yExtends[0], yExtends[1]])
      .range([0, height]);

    let yAxisFunction;
    if (yAxesAt === 'right') {
      yAxisFunction = axisRight(yScale).ticks(5);
    } else {
      yAxisFunction = axisLeft(yScale).ticks(5);
    }

    // style for <svg><g>
    let gStyle = '';
    if (yAxesAt === 'left') {
      gStyle += `transform: translate(${yAxisWidth - 1}px, 0px);`;
    } else if (yAxesAt === 'right') {
      gStyle += 'transform: translate(0px, 0px);';
    }

    this.el.innerHTML = '';
    const svgGroup = select(this.el)
      .append('g')
      .attr('style', gStyle)
      .attr('class', styles.yAxisGroup);

    yAxisFunction(svgGroup);
  }

  assignEl = (el) => { this.el = el; }

  render() {
    const {
      height,
      yAxisWidth,
      margin,
      yAxesAt,
      top,
    } = this.props;

    const style = {};
    if (yAxesAt === 'left') {
      style.left = margin;
    } else if (yAxesAt === 'right') {
      style.right = margin;
    } else {
      style.left = 0;
    }

    // vertical position
    style.top = top;

    return (
      <svg
        style={style}
        ref={this.assignEl}
        height={height}
        width={yAxisWidth}
        className={styles.yAxis}
      />
    );
  }
}
