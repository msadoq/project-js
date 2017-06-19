import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import _memoize from 'lodash/memoize';
import { select } from 'd3-selection';
import { scaleTime } from 'd3-scale';
import { timeFormat } from 'd3-time-format';
import { axisBottom, axisTop } from 'd3-axis';
import { levelsRules, getZoomLevel } from '../../../../../windowProcess/common/timeFormats';
import styles from './GrizzlyChart.css';

export default class XAxis extends Component {

  static propTypes = {
    yAxesAt: PropTypes.string,
    xAxisAt: PropTypes.string,
    pointLabels: PropTypes.objectOf(PropTypes.shape()).isRequired,
    xAxisHeight: PropTypes.number.isRequired,
    showGrid: PropTypes.bool,
    showTicks: PropTypes.bool,
    autoTick: PropTypes.bool,
    tickStep: PropTypes.number,
    yAxes: PropTypes.arrayOf(
      PropTypes.shape()
    ).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.number.isRequired,
    gridStyle: PropTypes.string,
    gridSize: PropTypes.number,
    xExtents: PropTypes.arrayOf(
      PropTypes.number
    ).isRequired,
  }

  static defaultProps = {
    yAxesAt: 'left',
    xAxisAt: 'bottom',
    showGrid: true,
    gridStyle: 'Continuous',
    gridSize: 1,
    showTicks: true,
    autoTick: true,
    tickStep: 2000,
    showPointLabels: false,
  }

  componentDidMount() {
    this.draw();
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;
    const attrs = ['yAxesAt', 'xAxisAt', 'height', 'width', 'margin',
      'gridStyle', 'gridSize', 'showTicks', 'autoTick', 'tickStep',
      'pointLabels'];
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

  draw = () => {
    const {
      xAxisAt,
      xAxisHeight,
      xExtents,
      width,
      height,
      gridStyle,
      showGrid,
      showTicks,
      autoTick,
      tickStep,
    } = this.props;

    const xScale = scaleTime()
      .domain([new Date(xExtents[0]), new Date(xExtents[1])])
      .range([0, width]);

    const axisHeight = xAxisAt === 'top' ? height + this.ticksYOffset : height + this.ticksYOffset;

    let xAxisFunction;
    if (xAxisAt === 'top') {
      xAxisFunction = axisTop(xScale);
    } else {
      xAxisFunction = axisBottom(xScale);
    }

    xAxisFunction = xAxisFunction
      .ticks(autoTick ? 8 : Math.round((xExtents[1] - xExtents[0]) / tickStep))
      .tickFormat(this.tickFormat)
      .tickSize(showGrid ? axisHeight : this.ticksYOffset);

    let gStyle = '';
    if (xAxisAt === 'top') {
      gStyle += `transform: translate(0px, ${xAxisHeight - 8}px)`;
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

  memoizeStyle = _memoize((hash, width, height, top, xAxisAt) =>
    ({
      width,
      height,
      top: xAxisAt === 'bottom' ? top : 0,
    })
  );
  memoizeDivStyle = _memoize((hash, width, height, top, right, left, xAxisAt) =>
    ({
      width,
      height,
      top: xAxisAt === 'bottom' ? top : 0,
      right,
      left,
    })
  );

  memoizeTickFormat= _memoize(
    (ms) => {
      const zoomLevel = getZoomLevel(ms);
      const levelRule = levelsRules[zoomLevel];
      return timeFormat(levelRule.formatD3);
    }
  )

  render() {
    const {
      margin,
      width,
      height,
      yAxesAt,
      showGrid,
      xAxisHeight,
      pointLabels,
      yAxes,
      xExtents,
      xAxisAt,
    } = this.props;

    this.tickFormat = this.memoizeTickFormat(xExtents[1] - xExtents[0]);

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
      <div
        className={styles.xAxis}
        style={this.memoizeDivStyle(
          `${s.width}-${s.height}-${s.top}-${s.right}-${s.left}-${xAxisAt}`,
          s.width,
          s.height,
          s.top,
          s.right,
          s.left,
          xAxisAt
        )}
      >
        {
          yAxes.map(yAxis =>
            yAxis.showPointLabels &&
            pointLabels[yAxis.id] &&
            yAxis.lines.map(line =>
              pointLabels[yAxis.id][line.id] &&
              pointLabels[yAxis.id][line.id].map(point =>
                <span
                  key={`${line.id}-${point.x}-${point.y}`}
                  style={{
                    display: point.xPos < 0 || point.xPos > width ? 'none' : 'block',
                    background: point.color,
                    color: '#FFF',
                    left: `${point.xPos}px`,
                    transform: xAxisAt === 'bottom' ? 'translate(-50%, 18%)' : 'translate(102%, -50%)',
                  }}
                  className={classnames(
                    'label',
                    styles.xAxisPointLabel
                  )}
                >
                  {this.tickFormat(point.x)}
                </span>
              )
            )
          )
        }
        <svg
          style={this.memoizeStyle(
            `${s.width}-${s.height}-${s.top}-${xAxisAt}`,
            s.width,
            s.height,
            s.top,
            xAxisAt
          )}
          ref={this.assignEl}
        />
      </div>
    );
  }
}
