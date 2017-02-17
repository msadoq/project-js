import React, { PropTypes } from 'react';
import _memoize from 'lodash/memoize';
import _max from 'lodash/max';
import _min from 'lodash/min';
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
    const {
      yAxes,
      lines,
      dataSets,
      xExtends,
    } = this.props;

    const linesWidthData = lines
      .map((line) => {
        const foundDataset = dataSets.find(d => d.id === line.dataSet);
        return {
          ...line,
          data: foundDataset ? foundDataset.data : undefined,
        };
      })
      .filter(line => typeof line.data !== 'undefined');

    const sortedAndValidAxes = yAxes
      .map((axis) => {
        const axisLines = linesWidthData.filter(line => line.yAxis === axis.id);

        // let's calculate lower and upper limits of the yAxis
        let yExtends;
        if (axis.autoLimits) {
          yExtends = this.memoizeYExtendsAutoLimits(
            xExtends[0],
            xExtends[1],
            axis.orient,
            axisLines
          );
        } else {
          yExtends = this.memoizeYExtends(
            axis.id,
            axis.orient,
            axis.yExtends[0],
            axis.yExtends[1]
          );
        }

        return {
          ...axis,
          lines: axisLines,
          yExtends,
        };
      })
      .filter(axis => axis.lines.length > 0)
      .sort(axis => axis.master === true);
    return sortedAndValidAxes;
  }

  yAxisWidth = 40;
  xAxisHeight = 40;

  memoizeYExtendsAutoLimits = (yExtendsLower, yExtendsUpper, orient, lines) => {
    if (!this.YExtendsAutoLimits) {
      this.YExtendsAutoLimits = _memoize((yExtendsLowerM, yExtendsUpperM, orientM) => {
        const values = [];
        lines
          .forEach(
            line => line.data.forEach((d) => {
              if (d.x < yExtendsLowerM || d.x > yExtendsUpperM) {
                return;
              }
              values.push(line.yAccessor(d));
            })
          );

        const lowerR = _min(values);
        const upperR = _max(values);
        return orientM === 'top' ? [upperR, lowerR] : [lowerR, upperR];
      });
    }
    return this.YExtendsAutoLimits(yExtendsLower, yExtendsUpper, orient);
  }

  memoizeYExtends = _memoize((id, orient, lower, upper) =>
    (orient === 'top' ? [upper, lower] : [lower, upper])
  );

  memoizeXScale = _memoize((domainLower, domainUpper, rangeLower, rangeUpper) =>
    scaleLinear()
      .domain([domainLower, domainUpper])
      .range([rangeLower, rangeUpper])
  );

  assignEl = (el) => { this.el = el; }

  render() {
    const {
      height,
      width,
      uniqueId,
      yAxesAt,
      xAxisAt,
      current,
      xExtends,
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
              yExtends={yAxis.yExtends}
              lines={yAxis.lines}
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
              yExtends={yAxis.yExtends}
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
