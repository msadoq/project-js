import React, { PropTypes, PureComponent } from 'react';
import { select } from 'd3-selection';
import { scaleTime } from 'd3-scale';
import { axisBottom, axisTop } from 'd3-axis';
import styles from './GrizzlyChart.css';

export default class XAxis extends PureComponent {

  static propTypes = {
    yAxesAt: PropTypes.string.isRequired,
    xAxisAt: PropTypes.string.isRequired,
    xAxisHeight: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.number.isRequired,
    xExtends: PropTypes.arrayOf(
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
      xAxisAt,
      xAxisHeight,
      xExtends,
      width,
    } = this.props;

    const xScale = scaleTime()
      .domain([new Date(xExtends[0]), new Date(xExtends[1])])
      .range([0, width]);

    let xAxisFunction;
    if (xAxisAt === 'top') {
      xAxisFunction = axisTop(xScale).ticks(5);
    } else {
      xAxisFunction = axisBottom(xScale).ticks(5);
    }

    let gStyle = '';
    if (xAxisAt === 'top') {
      gStyle += `transform(0px, ${xAxisHeight}px)`;
    } else {
      gStyle += `transform(0px, ${-xAxisHeight}px)`;
    }

    this.el.innerHTML = '';
    const svgGroup = select(this.el)
      .append('g')
      .attr('height', xAxisHeight)
      .attr('style', gStyle)
      .attr('class', styles.xAxisGroup);

    xAxisFunction(svgGroup);
  }

  assignEl = (el) => { this.el = el; }

  render() {
    const {
      xAxisHeight,
      margin,
      width,
      height,
      yAxesAt,
      xAxisAt,
    } = this.props;

    const style = {};
    if (xAxisAt === 'top') {
      style.top = 0;
    } else {
      style.top = height;
    }

    if (yAxesAt === 'left') {
      style.left = margin;
    } else if (yAxesAt === 'right') {
      style.right = margin;
    }

    return (
      <svg
        style={style}
        ref={this.assignEl}
        height={xAxisHeight}
        width={width}
        className={styles.xAxis}
      />
    );
  }
}
