import React, { PropTypes, Component } from 'react';
import _memoize from 'lodash/memoize';
import _max from 'lodash/max';
import _min from 'lodash/min';
import _set from 'lodash/set';
import _get from 'lodash/get';
import classnames from 'classnames';
import _throttle from 'lodash/throttle';
import { scaleLinear, scaleLog } from 'd3-scale';
import { Button } from 'react-bootstrap';
import styles from './GrizzlyChart.css';
import CurrentCursorCanvas from './CurrentCursorCanvas';

import LinesCanvas from './LinesCanvas';
import Tooltip from './Tooltip';
import YAxis from './YAxis';
import XAxis from './XAxis';
import XAxisParametric from './XAxisParametric';
import Zones from './Zones';

export default class Chart extends Component {

  static propTypes = {
    yAxesAt: PropTypes.string,
    xAxisAt: PropTypes.string,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    enableTooltip: PropTypes.bool,
    tooltipColor: PropTypes.string,
    parametric: PropTypes.bool,
    allowZoom: PropTypes.bool,
    allowYZoom: PropTypes.bool,
    allowYPan: PropTypes.bool,
    allowPan: PropTypes.bool,
    perfOutput: PropTypes.bool,
    additionalStyle: PropTypes.shape({}).isRequired,
    xAxis: PropTypes.shape({
      xExtents: PropTypes.arrayOf(PropTypes.number).isRequired,
      showTicks: PropTypes.bool,
      autoTick: PropTypes.bool,
      tickStep: PropTypes.number,
      format: PropTypes.string,
    }).isRequired,
    yAxes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        orient: PropTypes.string.isRequired,
        data: PropTypes.objectOf(PropTypes.shape),
        yExtents: PropTypes.array.isRequired,
        autoLimits: PropTypes.bool.isRequired,
        showAxis: PropTypes.bool.isRequired,
        showLabels: PropTypes.bool,
        showTicks: PropTypes.bool,
        autoTick: PropTypes.bool,
        tickStep: PropTypes.number,
        showGrid: PropTypes.bool,
        showPointLabels: PropTypes.bool,
        gridStyle: PropTypes.string,
        gridSize: PropTypes.number,
        unit: PropTypes.string,
        label: PropTypes.string.isRequired,
        format: PropTypes.string,
        labelStyle: PropTypes.shape,
      })
    ).isRequired,
    lines: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.arrayOf(PropTypes.shape),
        id: PropTypes.string.isRequired,
        yAxis: PropTypes.string.isRequired,
        fill: PropTypes.string,
        lineStyle: PropTypes.string,
        lineSize: PropTypes.number,
        pointSize: PropTypes.number,
        pointStyle: PropTypes.string,
        dataAccessor: PropTypes.string,
        yAccessor: PropTypes.func,
        xAccessor: PropTypes.func,
        colorAccessor: PropTypes.string,
        tooltipFormatter: PropTypes.func,
      })
    ).isRequired,
  }

  static defaultProps = {
    yAxesAt: 'left',
    xAxisAt: 'bottom',
    enableTooltip: true,
    allowYPan: true,
    allowYZoom: true,
    allowZoom: true,
    allowPan: true,
    tooltipColor: 'white',
    perfOutput: false,
    parametric: false,
  }

  state = {
    zoomLevel: 1,
    pan: 0,
    yZoomLevels: {},
    yPans: {},
    ctrlPressed: false,
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
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
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onKeyDown = (e) => {
    if (e.keyCode === 17 && this.el && this.el.parentElement.querySelector(':hover')) {
      this.setState({
        ctrlPressed: true,
      });
    }
  }

  onKeyUp = (e) => {
    const { ctrlPressed } = this.state;
    if (ctrlPressed && e.keyCode === 17) {
      this.setState({
        ctrlPressed: false,
      });
    }
  }

  onWheel = (e) => {
    e.preventDefault();
    const { allowZoom, allowYZoom, yAxes } = this.props;
    const { zoomLevel, yZoomLevels, ctrlPressed } = this.state;

    if (ctrlPressed) {
      const hoveredAxisId = this.wichAxisIsHovered(e);
      if (hoveredAxisId && _get(yAxes.find(a => a.id === hoveredAxisId), 'logarithmic')) {
        return;
      }
      if (allowYZoom && hoveredAxisId) {
        const yZoomLevel = _get(yZoomLevels, hoveredAxisId, 1);
        const newYZoomLevels = {
          ...yZoomLevels,
          [hoveredAxisId]: yZoomLevel * (e.deltaY > 0 ? 0.9 : 1.1),
        };
        this.setState({
          yZoomLevels: newYZoomLevels,
        });
      } else if (allowZoom) {
        this.setState({
          zoomLevel: (zoomLevel * (e.deltaY > 0 ? 0.9 : 1.1)).toFixed(2),
        });
      }
    }
  }

  onMouseDown = (e) => {
    e.preventDefault();
    const { allowPan, allowYPan, yAxes } = this.props;
    const { pan, yPans, ctrlPressed } = this.state;
    if (!ctrlPressed) {
      return;
    }
    if (!this.onMouseMoveThrottle) {
      this.onMouseMoveThrottle = _throttle(this.onMouseMove, 100);
    }
    const hoveredAxisId = this.wichAxisIsHovered(e);
    if (hoveredAxisId && _get(yAxes.find(a => a.id === hoveredAxisId), 'logarithmic')) {
      return;
    }
    if (allowYPan && hoveredAxisId) {
      const yPan = _get(yPans, hoveredAxisId, 0);
      this.setState({
        mouseMoveCursorOriginY: e.pageY,
        panAxisId: hoveredAxisId,
        yPanOrigin: yPan,
      });
      document.addEventListener('mousemove', this.onMouseMoveThrottle);
      document.addEventListener('mouseup', this.onMouseUp);
    } else if (allowPan && !hoveredAxisId) {
      this.setState({
        mouseMoveCursorOriginX: e.pageX,
        xPanOrigin: pan,
      });
      document.addEventListener('mousemove', this.onMouseMoveThrottle);
      document.addEventListener('mouseup', this.onMouseUp);
    }
  }

  onMouseMove = (e) => {
    e.preventDefault();
    const {
      mouseMoveCursorOriginX,
      xPanOrigin,
      zoomLevel,
      panAxisId,
      mouseMoveCursorOriginY,
      yPans,
      yPanOrigin,
      yZoomLevels,
    } = this.state;

    if (panAxisId) {
      const axisZoomLevel = _get(yZoomLevels, panAxisId, 1);
      const newYPans = {
        ...yPans,
        [panAxisId]: yPanOrigin + ((mouseMoveCursorOriginY - e.pageY) / axisZoomLevel),
      };
      this.setState({
        yPans: newYPans,
      });
    } else {
      this.setState({
        pan: xPanOrigin + ((e.pageX - mouseMoveCursorOriginX) / zoomLevel),
      });
    }
  }

  onMouseUp = (e) => {
    e.preventDefault();
    this.setState({
      panAxisId: null,
    });
    document.removeEventListener('mousemove', this.onMouseMoveThrottle);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  getSortedAndValidYAxes = () => {
    const {
      yAxes,
      lines,
      xAxis: { xExtents },
    } = this.props;
    const {
      yZoomLevels,
      yPans,
    } = this.state;

    return yAxes
      .map((axis) => {
        const zoomLevel = _get(yZoomLevels, axis.id, 1);
        const pan = _get(yPans, axis.id, 0);
        const axisLines = lines
          .filter(line => line.yAxis === axis.id);
        // let's calculate lower and upper limits of the yAxis
        let yExtents;
        if (axis.autoLimits) {
          if (!this.yExtentsAutoLimits[axis.id]) {
            this.yExtentsAutoLimits[axis.id] = _memoize(
              (hash, yExtentsLower, yExtentsUpper, orient, liness, data) => {
                const values = [];
                for (let i = 0; i < liness.length; i += 1) {
                  for (let j = 0; j < data.length; j += 1) {
                    if (data[j].x >= yExtentsLower && data[j].x <= yExtentsUpper) {
                      values.push(liness[i].yAccessor(data[j]));
                    }
                  }
                }

                const lowerR = _min(values);
                const upperR = _max(values);

                return orient === 'top' ? [upperR, lowerR] : [lowerR, upperR];
              }
            );
          }
          yExtents = this.yExtentsAutoLimits[axis.id](
            `${xExtents[0]}-${xExtents[1]}-${axis.orient}`,
            xExtents[0],
            xExtents[1],
            axis.orient,
            axisLines,
            axis.data
          );
        } else {
          const center = (axis.yExtents[0] + axis.yExtents[1]) / 2;
          const range = axis.yExtents[1] - axis.yExtents[0];
          const zoomedRange = range / zoomLevel;
          const scaledPan = (pan / this.chartHeight) * range * -1;
          const pannedCenter = center + scaledPan;
          const xExtendsLower = pannedCenter - (zoomedRange / 2);
          const xExtendsUpper = pannedCenter + (zoomedRange / 2);
          // First render, instanciate one memoize method per Y axis
          if (!this.yExtents[axis.id]) {
            this.yExtents[axis.id] = _memoize(
              (hash, orient, lower, upper) =>
                (orient === 'top' ? [lower, upper] : [upper, lower])
            );
          }
          yExtents = this.yExtents[axis.id](
            `${axis.id}-${axis.orient}-${xExtendsLower}-${xExtendsUpper}`,
            axis.orient,
            xExtendsLower,
            xExtendsUpper
          );
        }

        // First render, instanciate one memoize method per Y axis
        if (!this.yScales[axis.id]) {
          this.yScales[axis.id] = _memoize(
            (hash, yExtentsLower, yExtentsUpper, height, logarithmic) => {
              if (logarithmic) {
                return scaleLog()
                  .domain([0.1, 1000000000])
                  .range([height, 0])
                  .nice();
              }
              return scaleLinear()
                .domain([yExtentsUpper, yExtentsLower])
                .range([0, height]);
            }
          );
        }
        const yScale = this.yScales[axis.id](
          `${yExtents[0]}-${yExtents[1]}-${this.chartHeight}-${axis.logarithmic}`,
          yExtents[0],
          yExtents[1],
          this.chartHeight,
          axis.logarithmic
        );

        // rank axes to sort them and define the master / grid showing one
        let rank = 0;
        if (axis.showGrid) rank += 2;

        return {
          ...axis,
          lines: axisLines,
          yExtents,
          yScale,
          rank,
        };
      })
      .filter(axis => axis.showAxis && axis.lines.length > 0)
      .sort((a, b) => b.rank - a.rank);
  }

  getLabelPosition = (yAxisId, lineId) =>
    _get(this.labelsPosition, [yAxisId, lineId], null);

  yExtents = {};
  yExtentsAutoLimits = {};
  yScales = {};

  wichAxisIsHovered = (e) => {
    const {
      yAxesAt,
      width,
    } = this.props;
    const xPositionPx = e.clientX - this.el.getBoundingClientRect().left;
    if (this.yAxes.length === 0) {
      return null;
    }
    // let axisId = null;
    const axisBounds = [];
    if (yAxesAt === 'left') {
      this.yAxes.forEach((axis, index) => {
        const bound = (this.yAxes.length * this.yAxisWidth) - (index * this.yAxisWidth);
        axisBounds.push([
          axis.id,
          bound - xPositionPx,
        ]);
      });
    } else if (yAxesAt === 'right') {
      this.yAxes.forEach((axis, index) => {
        const bound = (width - (this.yAxes.length * this.yAxisWidth)) + (index * this.yAxisWidth);
        axisBounds.push([
          axis.id,
          xPositionPx - bound,
        ]);
      });
    }

    const foundAxis = axisBounds
      .filter(ab => ab[1] > 0)
      .sort(ab => ab[1])[0];

    return foundAxis ? foundAxis[0] : null;
  }

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

  memoizeXScale = _memoize((hash, domainLower, domainUpper, rangeUpper) =>
    scaleLinear()
      .domain([domainLower, domainUpper])
      .range([0, rangeUpper])
  );

  memoizeCalculatedXExtents =
    _memoize((hash, xExtentsLower, xExtentsUpper, pan, zoomLevel, chartWidth) => {
      let newXExtents = [xExtentsLower, xExtentsUpper];

      let panMs = 0;
      if (pan !== 0) {
        panMs = (pan / chartWidth) * (newXExtents[0] - newXExtents[1]);
        panMs = parseFloat(panMs.toFixed(2));
      }

      if (zoomLevel !== 1) {
        const xExtentsMs = newXExtents[1] - newXExtents[0];
        const zoomOffsetMs = xExtentsMs -
            (xExtentsMs / zoomLevel);

        newXExtents = [
          (newXExtents[0] + (zoomOffsetMs / 2)),
          (newXExtents[1] - (zoomOffsetMs / 2)),
        ];
      }

      if (pan !== 0) {
        newXExtents = [
          newXExtents[0] + panMs,
          newXExtents[1] + panMs,
        ];
      }
      return [newXExtents, panMs];
    }
  );

  assignEl = (el) => { this.el = el; }

  resetYPan = (e, axisId) => {
    e.preventDefault();
    const { yPans } = this.state;
    this.setState({
      yPans: {
        ...yPans,
        [axisId]: 0,
      },
    });
  }

  resetYZoomLevel = (e, axisId) => {
    e.preventDefault();
    const { yZoomLevels } = this.state;
    this.setState({
      yZoomLevels: {
        ...yZoomLevels,
        [axisId]: 1,
      },
    });
  }

  memoizeResetYPan = _memoize(axisId =>
    e => this.resetYPan(e, axisId)
  )

  memoizeResetYZoomLevel= _memoize(axisId =>
    e => this.resetYZoomLevel(e, axisId)
  )

  memoizeBackgroundDivStyle = _memoize(
    (hash, marginTop, marginSide, yAxesAt, width, height) => {
      const style = {};
      if (yAxesAt === 'left') {
        style.left = marginSide;
      } else if (yAxesAt === 'right') {
        style.right = marginSide;
      }
      return {
        ...style,
        top: marginTop,
        width,
        height,
      };
    }
  );

  render() {
    const {
      height,
      parametric,
      width,
      yAxesAt,
      xAxisAt,
      current,
      xAxis: {
        xExtents,
        showTicks,
        autoTick,
        tickStep,
        format,
      },
      enableTooltip,
      tooltipColor,
      allowYPan,
      allowYZoom,
      allowPan,
      allowZoom,
      perfOutput,
      additionalStyle,
    } = this.props;

    const {
      zoomLevel,
      pan,
      yZoomLevels,
      yPans,
      ctrlPressed,
    } = this.state;

    // Set chartHeight depending on xAxisAt (top/bottom/other)
    this.chartHeight = ['top', 'bottom'].includes(xAxisAt) ?
      height - this.xAxisHeight
      :
      height;

    this.yAxes = this.getSortedAndValidYAxes();

    // Set chartWidth depending on yAxesAt (left/right/other)
    // and number of yAxes
    this.chartWidth = ['left', 'right'].includes(yAxesAt) ?
      width - (this.yAxes.length * this.yAxisWidth)
      :
      width;

    const memoized = this.memoizeCalculatedXExtents(
      `${xExtents[0]}-${xExtents[1]}-${pan}-${zoomLevel}-${this.chartWidth}`,
      xExtents[0],
      xExtents[1],
      pan,
      zoomLevel,
      this.chartWidth
    );
    const calculatedXExtents = memoized[0];
    const panMs = memoized[1];

    const xScale = this.memoizeXScale(
      `${calculatedXExtents[0]}-${calculatedXExtents[1]}-${this.chartWidth}`,
      calculatedXExtents[0],
      calculatedXExtents[1],
      this.chartWidth
    );

    const marginTop = xAxisAt === 'top' ? this.xAxisHeight : 0;
    const marginSide = this.yAxes.length * this.yAxisWidth;

    return (
      <div
        className={styles.container}
        onWheel={this.onWheel}
        onMouseDown={this.onMouseDown}
        style={{
          ...additionalStyle,
          height,
          width,
        }}
        ref={this.assignEl}
      >
        <div
          className={styles.zoomAndPanLabels}
          style={{
            left: yAxesAt === 'left' ? marginSide + 5 : 5,
            top: xAxisAt === 'top' ? this.xAxisHeight + 5 : 5,
          }}
        >
          {
            Object.keys(yPans).map((key) => {
              const axis = this.yAxes.find(a => a.id === key);
              if (!axis) return null;
              const axisLabel = axis.label;
              return (yPans[key] !== 0 &&
              <Button
                key={key}
                bsStyle="danger"
                bsSize="xs"
                onClick={this.memoizeResetYPan(key)}
              >{`Y axis ${axisLabel} panned ${yPans[key].toFixed(2)}px`}</Button>);
            })
          }
          {
            Object.keys(yZoomLevels).map((key) => {
              const axis = this.yAxes.find(a => a.id === key);
              if (!axis) return null;
              const axisLabel = axis.label;
              return (yZoomLevels[key] !== 1 &&
              <Button
                key={key}
                bsStyle="danger"
                bsSize="xs"
                onClick={this.memoizeResetYZoomLevel(key)}
              >{`Y axis ${axisLabel} zoomed ${(yZoomLevels[key]).toFixed(2)}x`}</Button>);
            })
          }
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
          parametric={parametric}
          width={this.chartWidth}
          height={this.chartHeight}
          xAxisAt={xAxisAt}
          current={current}
          yAxesAt={yAxesAt}
          top={marginTop}
          margin={marginSide}
          xScale={xScale}
        />
        { enableTooltip && <Tooltip
          parametric={parametric}
          tooltipColor={tooltipColor}
          yAxes={this.yAxes}
          width={this.chartWidth}
          height={this.chartHeight}
          top={marginTop}
          current={current}
          margin={marginSide}
          xScale={xScale}
          xFormat={format}
          yAxesAt={yAxesAt}
          xAxisAt={xAxisAt}
          yAxisWidth={this.yAxisWidth}
        /> }
        <div
          className={classnames('Background', styles.Background)}
          style={this.memoizeBackgroundDivStyle(
            `${marginTop}-${marginSide}-${yAxesAt}-${this.chartWidth}-${this.chartHeight}`,
            marginTop,
            marginSide,
            yAxesAt,
            this.chartWidth,
            this.chartHeight
          )}
        />
        {
          this.yAxes.map(yAxis =>
            <LinesCanvas
              parametric={parametric}
              key={yAxis.id}
              width={this.chartWidth}
              height={this.chartHeight}
              xAxisAt={xAxisAt}
              yAxesAt={yAxesAt}
              top={marginTop}
              margin={marginSide}
              xScale={xScale}
              yScale={yAxis.yScale}
              showLabels={yAxis.showLabels}
              axisId={yAxis.id}
              data={yAxis.data}
              lines={yAxis.lines}
              updateLabelPosition={this.updateLabelPosition}
              perfOutput={perfOutput}
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
              format={yAxis.format}
              showLabels={yAxis.showLabels}
              showTicks={yAxis.showTicks}
              autoTick={yAxis.autoTick}
              tickStep={yAxis.tickStep}
              showGrid={yAxis.showGrid}
              gridStyle={yAxis.gridStyle}
              axisLabel={yAxis.axisLabel}
              gridSize={yAxis.gridSize}
              logarithmic={yAxis.logarithmic}
              yAxisWidth={this.yAxisWidth}
              chartWidth={this.chartWidth}
              allowYPan={allowYPan}
              height={this.chartHeight}
              xAxisAt={xAxisAt}
              top={marginTop}
              yAxesAt={yAxesAt}
              yScale={yAxis.yScale}
              yExtents={yAxis.yExtents}
              label={yAxis.label}
              unit={yAxis.unit}
              labelStyle={yAxis.labelStyle}
              getLabelPosition={this.getLabelPosition}
            />
          )
        }
        {
          parametric ?
            <XAxisParametric
              xScale={xScale}
              yAxesAt={yAxesAt}
              xAxisAt={xAxisAt}
              xAxisHeight={this.xAxisHeight}
              showGrid={_get(this.yAxes, '0.showGrid')}
              showTicks={showTicks}
              autoTick={autoTick}
              tickStep={tickStep}
              width={this.chartWidth}
              height={this.chartHeight}
              margin={marginSide}
              gridStyle={_get(this.yAxes, '0.gridStyle')}
              gridSize={_get(this.yAxes, '0.gridSize')}
              format={'.2f'}
              xExtents={calculatedXExtents}
            />
            :
            <XAxis
              showGrid={_get(this.yAxes, '0.showGrid')}
              gridStyle={_get(this.yAxes, '0.gridStyle')}
              gridSize={_get(this.yAxes, '0.gridSize')}
              showTicks={showTicks}
              autoTick={autoTick}
              tickStep={tickStep}
              margin={marginSide}
              xAxisHeight={this.xAxisHeight}
              height={this.chartHeight}
              width={this.chartWidth}
              xAxisAt={xAxisAt}
              yAxesAt={yAxesAt}
              xExtents={calculatedXExtents}
            />
        }
        <Zones
          xAxisAt={xAxisAt}
          xAxisHeight={this.xAxisHeight}
          ctrlPressed={ctrlPressed}
          yAxes={this.yAxes}
          yAxisWidth={this.yAxisWidth}
          yAxesAt={yAxesAt}
          yAxesInteractive={allowYZoom || allowYPan}
          chartInteractive={allowZoom || allowPan}
          height={this.chartHeight}
          width={width}
        />
      </div>
    );
  }
}
