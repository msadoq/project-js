import React, { PropTypes } from 'react';
import _memoize from 'lodash/memoize';
import _max from 'lodash/max';
import _min from 'lodash/min';
import _set from 'lodash/set';
import _get from 'lodash/get';
import _throttle from 'lodash/throttle';
import { scaleLinear } from 'd3-scale';
import { Button } from 'react-bootstrap';
import styles from './GrizzlyChart.css';
import CurrentCursorCanvas from './CurrentCursorCanvas';
import LinesCanvas from './LinesCanvas';
import Tooltip from './Tooltip';
import YAxis from './YAxis';
import XAxis from './XAxis';

export default class Chart extends React.Component {

  static propTypes = {
    yAxesAt: PropTypes.string.isRequired,
    xAxisAt: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    enableTooltip: PropTypes.bool,
    tooltipColor: PropTypes.string,
    allowZoom: PropTypes.bool,
    allowPan: PropTypes.bool,
    xExtends: PropTypes.arrayOf(PropTypes.number).isRequired,
    yAxes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        orient: PropTypes.string.isRequired,
        data: PropTypes.array.isRequired,
        yExtends: PropTypes.array.isRequired,
        autoLimits: PropTypes.bool.isRequired,
        showAxis: PropTypes.bool.isRequired,
        showLabels: PropTypes.bool,
        showTicks: PropTypes.bool,
        showGrid: PropTypes.bool,
        gridStyle: PropTypes.string,
        gridSize: PropTypes.number,
        unit: PropTypes.string,
        label: PropTypes.string.isRequired,
        labelStyle: PropTypes.shape,
      })
    ).isRequired,
    lines: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        yAxis: PropTypes.string.isRequired,
        fill: PropTypes.string,
        lineStyle: PropTypes.string,
        lineSize: PropTypes.number,
        pointSize: PropTypes.number,
        pointStyle: PropTypes.string,
        yAccessor: PropTypes.func.isRequired,
        colorAccessor: PropTypes.func,
      })
    ).isRequired,
  }

  static defaultProps = {
    enableTooltip: true,
    allowZoom: true,
    allowPan: true,
    tooltipColor: 'white',
  }

  state = {
    zoomLevel: 1,
    pan: 0,
  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldRender = false;
    Object.keys(nextProps).forEach((k) => {
      if (this.props[k] !== nextProps[k]) {
        shouldRender = true;
      }
    });
    Object.keys(nextState).forEach((k) => {
      if (this.state[k] !== nextState[k]) {
        shouldRender = true;
      }
    });
    return shouldRender;
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMoveThrottle);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onWheel = (e) => {
    e.preventDefault();
    const { allowZoom } = this.props;
    const { zoomLevel } = this.state;
    if (allowZoom && e.ctrlKey) {
      this.setState({
        zoomLevel: (zoomLevel * (e.deltaY > 0 ? 0.9 : 1.1)).toFixed(2),
      });
    }
  }

  onMouseDown = (e) => {
    e.preventDefault();
    const { allowPan } = this.props;
    const { pan } = this.state;
    if (!allowPan) {
      return;
    }
    this.setState({
      mouseMoveCursorOrigin: e.pageX,
      panOrigin: pan,
    });

    if (!this.onMouseMoveThrottle) {
      this.onMouseMoveThrottle = _throttle(this.onMouseMove, 100);
    }

    document.addEventListener('mousemove', this.onMouseMoveThrottle);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (e) => {
    e.preventDefault();
    const { mouseMoveCursorOrigin, panOrigin, zoomLevel } = this.state;
    this.setState({
      pan: panOrigin + ((e.pageX - mouseMoveCursorOrigin) / zoomLevel),
    });
  }

  onMouseUp = (e) => {
    e.preventDefault();
    document.removeEventListener('mousemove', this.onMouseMoveThrottle);
  }

  getSortedAndValidYAxes = () => {
    const {
      yAxes,
      lines,
      xExtends,
    } = this.props;

    const sortedAndValidAxes = yAxes
      .map((axis) => {
        const axisLines = lines
          .filter(line => line.yAxis === axis.id);

        // let's calculate lower and upper limits of the yAxis
        let yExtends;
        if (axis.autoLimits) {
          yExtends = this.memoizeYExtendsAutoLimits(
            xExtends[0],
            xExtends[1],
            axis.orient,
            axisLines,
            axis.data
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

  getLabelPosition = (yAxisId, lineId) =>
    _get(this.labelsPosition, [yAxisId, lineId], null);

  resetZoomLevel = (e) => {
    e.preventDefault();
    this.setState({ zoomLevel: 1 });
  }

  resetPan = (e) => {
    e.preventDefault();
    this.setState({ pan: 0 });
  }

  updateLabelPosition = (yAxisId, lineId, yPosition) => {
    if (!this.labelsPosition) {
      this.labelsPosition = {};
    }
    _set(this.labelsPosition, [yAxisId, lineId], yPosition);
  }

  yAxisWidth = 90;
  xAxisHeight = 40;

  memoizeYExtendsAutoLimits = _memoize(
    (yExtendsLower, yExtendsUpper, orient, lines, data) => {
      const values = [];
      for (let i = 0; i < lines.length; i += 1) {
        for (let j = 0; j < data.length; j += 1) {
          if (data[j].x >= yExtendsLower && data[j].x <= yExtendsUpper) {
            values.push(lines[i].yAccessor(data[j]));
          }
        }
      }

      const lowerR = _min(values);
      const upperR = _max(values);

      return orient === 'top' ? [upperR, lowerR] : [lowerR, upperR];
    },
    (a, b, c) =>
      JSON.stringify([a, b, c])
    )

  memoizeYExtends = _memoize((id, orient, lower, upper) =>
    (orient === 'top' ? [upper, lower] : [lower, upper]),
    (...args) => JSON.stringify(args)
  );

  memoizeXScale = _memoize((domainLower, domainUpper, rangeLower, rangeUpper) =>
    scaleLinear()
      .domain([domainLower, domainUpper])
      .range([rangeLower, rangeUpper]),
    (...args) => JSON.stringify(args)
  );

  memoizeCalculatedXExtends =
    _memoize((xExtendsLower, xExtendsUpper, pan, zoomLevel, chartWidth) => {
      let newXExtends = [xExtendsLower, xExtendsUpper];

      let panMs = 0;
      if (pan !== 0) {
        panMs = (pan / chartWidth) * (newXExtends[0] - newXExtends[1]);
        panMs = parseFloat(panMs.toFixed(2));
      }

      if (zoomLevel !== 1) {
        const xExtendsMs = newXExtends[1] - newXExtends[0];
        const zoomOffsetMs = xExtendsMs -
            (xExtendsMs / zoomLevel);

        newXExtends = [
          (newXExtends[0] + (zoomOffsetMs / 2)),
          (newXExtends[1] - (zoomOffsetMs / 2)),
        ];
      }

      if (pan !== 0) {
        newXExtends = [
          newXExtends[0] + panMs,
          newXExtends[1] + panMs,
        ];
      }
      return [newXExtends, panMs];
    },
    (...args) => JSON.stringify(args)
    );

  assignEl = (el) => { this.el = el; }

  render() {
    const {
      height,
      width,
      yAxesAt,
      xAxisAt,
      current,
      xExtends,
      enableTooltip,
      tooltipColor,
    } = this.props;

    const { zoomLevel, pan } = this.state;

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

    const memoized =
      this.memoizeCalculatedXExtends(xExtends[0], xExtends[1], pan, zoomLevel, chartWidth);
    const calculatedXExtends = memoized[0];
    const panMs = memoized[1];

    const xScale =
      this.memoizeXScale(calculatedXExtends[0], calculatedXExtends[1], 0, chartWidth);

    const marginTop = xAxisAt === 'top' ? this.xAxisHeight : 0;
    const marginSide = this.yAxes.length * this.yAxisWidth;

    return (
      <div
        className={styles.container}
        onWheel={this.onWheel}
        onMouseDown={this.onMouseDown}
        style={{
          height,
          width,
        }}
        ref={this.assignEl}
      >
        <div
          className={styles.zoomAndPanLabels}
          style={{
            left: yAxesAt === 'left' ? marginSide + 5 : 5,
          }}
        >
          {
            zoomLevel !== 1 &&
            <Button
              bsStyle="danger"
              bsSize="xs"
              onClick={this.resetZoomLevel}
            >Zoomed {zoomLevel}x</Button>
          }
          {
            panMs !== 0 &&
            <Button
              bsStyle="danger"
              bsSize="xs"
              onClick={this.resetPan}
            >Panned {panMs}ms</Button>
          }
        </div>
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
        { enableTooltip && <Tooltip
          tooltipColor={tooltipColor}
          yAxes={this.yAxes}
          width={chartWidth}
          height={chartHeight}
          top={marginTop}
          margin={marginSide}
          xScale={xScale}
          yAxesAt={yAxesAt}
        /> }
        {
          this.yAxes.map(yAxis =>
            <LinesCanvas
              key={yAxis.id}
              width={chartWidth}
              height={chartHeight}
              xAxisAt={xAxisAt}
              yAxesAt={yAxesAt}
              top={marginTop}
              margin={marginSide}
              xScale={xScale}
              showLabels={yAxis.showLabels}
              yExtends={yAxis.yExtends}
              axisId={yAxis.id}
              data={yAxis.data}
              lines={yAxis.lines}
              updateLabelPosition={this.updateLabelPosition}
            />
          )
        }
        {
          ['left', 'right'].includes(yAxesAt) && this.yAxes.map((yAxis, index) =>
            <YAxis
              key={yAxis.id}
              index={index}
              margin={((this.yAxes.length - 1) * this.yAxisWidth) - (index * this.yAxisWidth)}
              lines={yAxis.lines}
              yAxisId={yAxis.id}
              showLabels={yAxis.showLabels}
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
              unit={yAxis.unit}
              labelStyle={yAxis.labelStyle}
              getLabelPosition={this.getLabelPosition}
            />
          )
        }
        <XAxis
          showGrid={_get(this.yAxes, '0.showGrid')}
          gridStyle={_get(this.yAxes, '0.gridStyle')}
          gridSize={_get(this.yAxes, '0.gridSize')}
          margin={marginSide}
          xAxisHeight={this.xAxisHeight}
          height={chartHeight}
          width={chartWidth}
          xAxisAt={xAxisAt}
          yAxesAt={yAxesAt}
          xExtends={calculatedXExtends}
        />
      </div>
    );
  }
}
