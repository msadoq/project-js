import React, { PropTypes } from 'react';
import _memoize from 'lodash/memoize';
import { scaleLinear } from 'd3-scale';
import styles from './GrizzlyChart.css';
import CurrentCursorCanvas from './CurrentCursorCanvas';
import LineCanvas from './LineCanvas';
import YAxis from './YAxis';
import XAxis from './XAxis';

export default class chart extends React.Component {

  static propTypes = {
    uniqueId: PropTypes.string.isRequired,
    yAxesAt: PropTypes.string.isRequired,
    xAxisAt: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    xExtends: PropTypes.arrayOf(PropTypes.number).isRequired,
    yAxes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        orient: PropTypes.string.isRequired,
        yExtends: PropTypes.array.isRequired,
        master: PropTypes.bool.isRequired,
        autoLimits: PropTypes.bool.isRequired,
      })
    ).isRequired,
    dataSets: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        data: PropTypes.array.isRequired,
      })
    ).isRequired,
    lines: PropTypes.arrayOf(
      PropTypes.shape({
        lineStyle: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        dataSet: PropTypes.string.isRequired,
        yAxis: PropTypes.string.isRequired,
        fill: PropTypes.string.isRequired,
        strokeWidth: PropTypes.number.isRequired,
        yAccessor: PropTypes.func.isRequired,
      })
    ).isRequired,
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;
    Object.keys(nextProps).forEach((k) => {
      if (this.props[k] !== nextProps[k]) {
        shouldRender = true;
      }
    });
    return shouldRender;
  }

  getSortedAndValidYAxes = () => {
    const { yAxes, lines } = this.props;
    const sortedAndValidAxes = yAxes
      .map(axis =>
        ({
          ...axis,
          lines: lines.filter(line => line.yAxis === axis.id),
        })
      )
      .filter(axis => axis.lines.length > 0)
      .sort(axis => axis.master === true);
    return sortedAndValidAxes;
  }

  yAxisWidth = 40;
  xAxisHeight = 40;

  assignEl = (el) => { this.el = el; }

  memoizeYExtends = _memoize((id, orient, lower, upper) =>
    (orient === 'top' ? [upper, lower] : [lower, upper])
  );

  memoizeXScale = _memoize((domainLower, domainUpper, rangeLower, rangeUpper) =>
    scaleLinear()
      .domain([domainLower, domainUpper])
      .range([rangeLower, rangeUpper])
  );

  render() {
    const {
      height,
      width,
      uniqueId,
      yAxesAt,
      xAxisAt,
      current,
      xExtends,
      dataSets,
    } = this.props;

    this.yAxes = this.getSortedAndValidYAxes();

    // Set chartWidth depending on yAxesAt (left/right/other)
    // and number of yAxes
    const chartWidth = ['left', 'right'].includes(yAxesAt) ?
      width - (this.yAxes.length * this.yAxisWidth)
      :
      width;

    // Set chartHeight depending on xAxisAt (top/bottom/other)
    const chartHeight = ['top', 'bottom'].includes(xAxisAt) ?
      height - this.xAxisHeight
      :
      height;

    const xScale = this.memoizeXScale(xExtends[0], xExtends[1], 0, chartWidth);

    const marginTop = xAxisAt === 'top' ? this.xAxisHeight : 0;
    const marginSide = this.yAxes.length * this.yAxisWidth;

    return (
      <div
        className={styles.container}
        height={height}
        width={width}
        id={`chart-${uniqueId}`}
        ref={this.assignEl}
      >
        <CurrentCursorCanvas
          width={chartWidth}
          height={chartHeight}
          xAxisAt={xAxisAt}
          current={current}
          yAxesAt={yAxesAt}
          top={marginTop}
          margin={marginSide}
          xScale={xScale}
        />
        {
          this.yAxes.map(yAxis =>
            <LineCanvas
              key={yAxis.id}
              width={chartWidth}
              height={chartHeight}
              xAxisAt={xAxisAt}
              yAxesAt={yAxesAt}
              top={marginTop}
              margin={marginSide}
              xScale={xScale}
              yExtends={this.memoizeYExtends(
                yAxis.id, yAxis.orient, yAxis.yExtends[0], yAxis.yExtends[1]
              )}
              lines={yAxis.lines}
              dataSets={dataSets}
            />
          )
        }
        {
          ['left', 'right'].includes(yAxesAt) && this.yAxes.map((yAxis, index) =>
            <YAxis
              key={yAxis.id}
              margin={index * this.yAxisWidth}
              yAxisId={yAxis.id}
              yAxisWidth={this.yAxisWidth}
              height={chartHeight}
              xAxisAt={xAxisAt}
              top={marginTop}
              yAxesAt={yAxesAt}
              yExtends={this.memoizeYExtends(
                yAxis.id, yAxis.orient, yAxis.yExtends[0], yAxis.yExtends[1]
              )}
            />
          )
        }
        <XAxis
          margin={marginSide}
          xAxisHeight={this.xAxisHeight}
          height={chartHeight}
          width={chartWidth}
          xAxisAt={xAxisAt}
          yAxesAt={yAxesAt}
          xExtends={xExtends}
        />
      </div>
    );
  }
}
