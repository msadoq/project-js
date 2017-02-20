import React, { PropTypes, PureComponent } from 'react';
import classnames from 'classnames';
import { select } from 'd3-selection';
import { scaleTime } from 'd3-scale';
import { axisBottom, axisTop } from 'd3-axis';
import styles from './GrizzlyChart.css';

export default class XAxis extends PureComponent {

  static propTypes = {
    yAxesAt: PropTypes.string.isRequired,
    xAxisAt: PropTypes.string.isRequired,
    xAxisHeight: PropTypes.number.isRequired,
    showGrid: PropTypes.bool,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.number.isRequired,
    gridStyle: PropTypes.string,
    gridSize: PropTypes.number,
    xExtends: PropTypes.arrayOf(
      PropTypes.number
    ).isRequired,
  }

  static defaultProps = {
    showGrid: true,
    gridStyle: 'Continuous',
    gridSize: 1,
  }

  componentDidMount() {
    this.draw();
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;
    ['yAxesAt', 'xAxisAt', 'height', 'width', 'margin', 'gridStyle', 'gridSize'].forEach((attr) => {
      if (nextProps[attr] !== this.props[attr]) {
        shouldRender = true;
      }
    });

    if (
      nextProps.xExtends[0] !== this.props.xExtends[0] ||
      nextProps.xExtends[1] !== this.props.xExtends[1]
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

  draw = () => {
    const {
      xAxisAt,
      xAxisHeight,
      xExtends,
      width,
      height,
      gridStyle,
      showGrid,
    } = this.props;
    const xScale = scaleTime()
      .domain([new Date(xExtends[0]), new Date(xExtends[1])])
      .range([0, width]);

    const axisHeight = xAxisAt === 'top' ? height + this.ticksYOffset : height + this.ticksYOffset;

    let xAxisFunction;
    if (xAxisAt === 'top') {
      xAxisFunction = axisTop(xScale);
    } else {
      xAxisFunction = axisBottom(xScale);
    }

    xAxisFunction = xAxisFunction
      .ticks(8)
      .tickSize(showGrid ? axisHeight : this.ticksYOffset);

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
      .attr('style', gStyle)
      .attr('class', classnames(
        styles.xAxisGroup,
        styles[gridStyle]
      ));

    xAxisFunction(svgGroup);
    this.axisDidDraw();
  }

  assignEl = (el) => { this.el = el; }

  render() {
    const {
      margin,
      width,
      height,
      yAxesAt,
      showGrid,
      xAxisHeight,
    } = this.props;

    const style = {};
    if (showGrid) {
      style.top = 0;
      style.height = height + xAxisHeight;
    } else {
      style.top = height;
      style.height = xAxisHeight;
    }
    style.width = width;

    if (yAxesAt === 'left') {
      style.left = margin;
    } else if (yAxesAt === 'right') {
      style.right = margin;
    }

    return (
      <svg
        style={style}
        ref={this.assignEl}
        className={styles.xAxis}
      />
    );
  }
}
