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

export default class Chart extends React.Component {

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
        autoLimits: PropTypes.bool.isRequired,
        showAxis: PropTypes.bool.isRequired,
        showTicks: PropTypes.bool.isRequired,
        showGrid: PropTypes.bool.isRequired,
        gridStyle: PropTypes.string.isRequired,
        gridSize: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        labelBgColor: PropTypes.string.isRequired,
        labelColor: PropTypes.string.isRequired,
        labelFont: PropTypes.string.isRequired,
        labelItalic: PropTypes.bool.isRequired,
        labelSize: PropTypes.number.isRequired,
        labelBold: PropTypes.bool.isRequired,
        labelUnderline: PropTypes.bool.isRequired,
        labelAlign: PropTypes.string.isRequired,
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

        // rank axes to sort them and define the master / grid showing one
        let rank = 0;
        if (axis.showGrid) rank += 2;

        return {
          ...axis,
          lines: axisLines,
          yExtends,
          // rank
          rank,
        };
      })
      .filter(axis => axis.lines.length > 0 && axis.showAxis)
      .sort((a, b) => b.rank - a.rank);
    return sortedAndValidAxes;
  }

  yAxisWidth = 60;
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
              index={index}
              margin={((this.yAxes.length - 1) * this.yAxisWidth) - (index * this.yAxisWidth)}
              yAxisId={yAxis.id}
              showTicks={yAxis.showTicks}
              showGrid={yAxis.showGrid}
              gridStyle={yAxis.gridStyle}
              axisLabel={yAxis.axisLabel}
              gridSize={yAxis.gridSize}
              yAxisWidth={this.yAxisWidth}
              chartWidth={chartWidth}
              height={chartHeight}
              xAxisAt={xAxisAt}
              top={marginTop}
              yAxesAt={yAxesAt}
              yExtends={yAxis.yExtends}
              label={yAxis.label}
              labelBgColor={yAxis.labelBgColor}
              labelColor={yAxis.labelColor}
              labelFont={yAxis.labelFont}
              labelItalic={yAxis.labelItalic}
              labelSize={yAxis.labelSize}
              labelUnderline={yAxis.labelUnderline}
              labelAlign={yAxis.labelAlign}
              labelBold={yAxis.labelBold}
            />
          )
        }
        <XAxis
          gridStyle={this.yAxes[0].gridStyle}
          gridSize={this.yAxes[0].gridSize}
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
