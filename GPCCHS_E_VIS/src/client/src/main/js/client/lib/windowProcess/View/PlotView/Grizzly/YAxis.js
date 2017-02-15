import React, { PropTypes, PureComponent } from 'react';
import classnames from 'classnames';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { axisLeft, axisRight } from 'd3-axis';
import styles from './GrizzlyChart.css';

export default class YAxis extends PureComponent {

  static propTypes = {
    xAxisAt: PropTypes.string.isRequired,
    yAxesAt: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    yAxisWidth: PropTypes.number.isRequired,
    margin: PropTypes.number.isRequired,
    chartWidth: PropTypes.number.isRequired,
    showTicks: PropTypes.bool.isRequired,
    showGrid: PropTypes.bool.isRequired,
    gridStyle: PropTypes.string.isRequired,
    gridSize: PropTypes.string.isRequired,
    yExtends: PropTypes.arrayOf(
      PropTypes.number
    ).isRequired,
  }

  componentDidMount() {
    this.draw();
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;
    ['yAxesAt', 'top', 'height', 'yAxisWidth', 'margin'].forEach((attr) => {
      if (nextProps[attr] !== this.props[attr]) {
        shouldRender = true;
      }
    });

    if (
      nextProps.yExtends[0] !== this.props.yExtends[0] ||
      nextProps.yExtends[1] !== this.props.yExtends[1]
    ) {
      shouldRender = true;
    }

    return shouldRender;
  }

  componentDidUpdate() {
    this.draw();
  }

  ticksXOffset = 8;

  axisDidDraw = () => {
    const {
      gridSize,
    } = this.props;
    select(this.el).selectAll('line').attr('stroke-width', gridSize);
  }

  draw = () => {
    const {
      yAxesAt,
      height,
      yAxisWidth,
      yExtends,
      chartWidth,
      index,
      showTicks,
      showGrid,
      gridStyle,
      xAxisAt,
    } = this.props;

    const yScale = scaleLinear()
      .domain([yExtends[0], yExtends[1]])
      .range([0, height]);


    const tickFormat = showTicks ? d => d : () => null;

    // if showGrid & master axis, axis must be wider
    const tickSize = index === 0 && showGrid ?
      chartWidth + this.ticksXOffset : this.ticksXOffset;

    let translateX;
    if (yAxesAt === 'left') {
      translateX = index === 0 && showGrid ?
        (chartWidth + yAxisWidth) : yAxisWidth;
    } else {
      translateX = index === 0 && showGrid ?
        -1 : 0;
    }

    let yAxisFunction;
    if (yAxesAt === 'right') {
      yAxisFunction = axisRight(yScale);
    } else {
      yAxisFunction = axisLeft(yScale);
    }

    yAxisFunction = yAxisFunction
      .ticks(8)
      .tickSize(tickSize)
      .tickFormat(tickFormat);

    const yMiniOffset = xAxisAt === 'top' ? 0 : -1;
    // style for <svg><g>
    let gStyle = '';
    if (yAxesAt === 'left') {
      gStyle += `transform: translate(${translateX}px, ${yMiniOffset}px);`;
    } else {
      gStyle += `transform: translate(${translateX}px, ${yMiniOffset}px);`;
    }

    this.el.innerHTML = '';
    const svgGroup = select(this.el)
      .append('g')
      .attr('style', gStyle)
      .attr('class', classnames(
        styles.yAxisGroup,
        {
          [styles[gridStyle]]: index === 0 && showGrid,
        }
      ));

    yAxisFunction(svgGroup);
    this.axisDidDraw();
  }

  assignEl = (el) => { this.el = el; }

  render() {
    const {
      height,
      yAxisWidth,
      chartWidth,
      margin,
      yAxesAt,
      index,
      top,
      showGrid,
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

    const axisWidth = index === 0 && showGrid ? chartWidth + yAxisWidth : yAxisWidth;

    return (
      <svg
        style={style}
        ref={this.assignEl}
        height={height}
        width={axisWidth}
        className={styles.yAxis}
      />
    );
  }
}
