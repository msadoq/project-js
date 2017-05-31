import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import _memoize from 'lodash/memoize';
import { select } from 'd3-selection';
import { format as d3Format } from 'd3-format';
import { range } from 'd3-array';
import { axisBottom, axisTop } from 'd3-axis';
import styles from './GrizzlyChart.css';

export default class XAxisParametric extends Component {

  static propTypes = {
    xScale: PropTypes.func.isRequired,
    yAxesAt: PropTypes.string,
    xAxisAt: PropTypes.string,
    xAxisHeight: PropTypes.number.isRequired,
    showGrid: PropTypes.bool,
    showTicks: PropTypes.bool,
    autoTick: PropTypes.bool,
    tickStep: PropTypes.number,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.number.isRequired,
    gridStyle: PropTypes.string,
    gridSize: PropTypes.number,
    format: PropTypes.string,
    xExtents: PropTypes.arrayOf(
      PropTypes.number
    ).isRequired,
  }

  static defaultProps = {
    yAxesAt: 'left',
    xAxisAt: 'bottom',
    format: '.2f',
    showGrid: true,
    gridStyle: 'Continuous',
    gridSize: 1,
    showTicks: true,
    autoTick: true,
    tickStep: 2000,
  }

  componentDidMount() {
    this.draw();
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;
    const attrs = ['xScale', 'xAxisAt', 'yAxesAt', 'xAxisHeight', 'showGrid', 'format',
      'showTicks', 'autoTick', 'tickStep', 'width', 'height', 'margin', 'gridStyle', 'gridSize'];
    for (let i = 0; i < attrs.length; i += 1) {
      if (nextProps[attrs[i]] !== this.props[attrs[i]]) {
        shouldRender = true;
      }
    }

    if (
      nextProps.xExtents[0] !== this.props.xExtents[0] ||
      nextProps.xExtents[1] !== this.props.xExtents[1]
    ) {
      shouldRender = true;
    }

    return shouldRender;
  }

  componentDidUpdate() {
    this.draw();
  }

  ticksYOffset = 8;

  axisDidDraw = () => {
    const {
      gridSize,
    } = this.props;
    select(this.el).selectAll('line').attr('stroke-width', gridSize);
  }

  memoizeRange = _memoize((hash, lower, upper, step) =>
    range(lower, upper, step)
  );

  memoizeFormatter = _memoize(f =>
    d => d3Format(f)(d)
  );

  ticksXOffset = 8;

  draw = () => {
    const {
      xScale,
      width,
      height,
      showTicks,
      tickStep,
      autoTick,
      format,
      showGrid,
      gridStyle,
      xAxisAt,
      xExtents,
      xAxisHeight,
    } = this.props;

    const tickFormat = showTicks ?
      this.memoizeFormatter(format) : () => null;

    let xAxisFunction;
    if (xAxisAt === 'top') {
      xAxisFunction = axisTop(xScale);
    } else {
      xAxisFunction = axisBottom(xScale);
    }

    // if showGrid & master axis, axis must be wider
    const tickSize = showGrid ?
      height + this.ticksXOffset : this.ticksXOffset;


    if (autoTick) {
      xAxisFunction = xAxisFunction
        .ticks(8);
    } else {
      const offset = xExtents[1] % tickStep;
      const tickValues = this.memoizeRange(
        `${xExtents[0]}-${xExtents[1]}-${tickStep}-${offset}`,
        (xExtents[0] - offset) + tickStep,
        (xExtents[1] - offset) + tickStep,
        tickStep
      );
      xAxisFunction = xAxisFunction
        .tickValues(tickValues);
    }

    xAxisFunction = xAxisFunction
      .tickSize(tickSize)
      .tickFormat(tickFormat);

    let gStyle = '';
    if (xAxisAt === 'top') {
      gStyle += `transform: translate(0px, ${(height + xAxisHeight)}px)`;
    } else {
      gStyle += `transform: translate(0px, ${0}px)`;
    }

    this.el.innerHTML = '';
    const svgGroup = select(this.el)
      .append('g')
      .attr('height', height + xAxisHeight)
      .attr('width', width)
      .attr('style', gStyle)
      .attr('class', classnames(
        styles.xAxisGroup,
        styles[gridStyle],
        {
          [styles.xAxisHideTicks]: !showTicks,
        }
      ));

    xAxisFunction(svgGroup);
    this.axisDidDraw();
  }

  assignEl = (el) => { this.el = el; }

  memoizeStyle = _memoize((hash, width, height, top, right, left) =>
    ({
      width,
      height,
      top,
      right,
      left,
    })
  );

  render() {
    const {
      margin,
      width,
      height,
      yAxesAt,
      showGrid,
      xAxisHeight,
    } = this.props;

    const s = {};
    if (showGrid) {
      s.top = 0;
      s.height = height + xAxisHeight;
    } else {
      s.top = height;
      s.height = xAxisHeight;
    }
    s.width = width;

    if (yAxesAt === 'left') {
      s.left = margin;
    } else if (yAxesAt === 'right') {
      s.right = margin;
    }

    return (
      <svg
        style={this.memoizeStyle(
          `${s.width}-${s.height}-${s.top}-${s.right}-${s.left}`,
          s.width,
          s.height,
          s.top,
          s.right,
          s.left
        )}
        ref={this.assignEl}
        className={styles.xAxis}
      />
    );
  }
}
