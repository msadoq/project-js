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
    allowZoom: PropTypes.bool,
    allowYZoom: PropTypes.bool,
    allowYPan: PropTypes.bool,
    allowPan: PropTypes.bool,
    allowLasso: PropTypes.bool,
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
        logSettings: PropTypes.shape(),
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
    allowLasso: true,
    tooltipColor: 'white',
    perfOutput: false,
  }

  state = {
    zoomLevel: 1,
    pan: 0,
    yZoomLevels: {},
    yPans: {},
    ctrlPressed: false,
    shiftPressed: false,
    panning: false,
    lassoing: false,
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
    if (this.el && this.el.parentElement.querySelector(':hover')) {
      if (e.keyCode === 17) {
        this.setState({
          ctrlPressed: true,
        });
      } else if (e.keyCode === 16) {
        this.setState({
          shiftPressed: true,
        });
      }
    }
  }

  onKeyUp = (e) => {
    const { ctrlPressed, shiftPressed } = this.state;
    if (ctrlPressed && e.keyCode === 17) {
      this.setState({
        ctrlPressed: false,
      });
    } else if (shiftPressed && e.keyCode === 16) {
      this.setState({
        shiftPressed: false,
      });
    }
  }

  onWheel = (e) => {
    e.preventDefault();
    const { allowZoom, allowYZoom } = this.props;
    const { zoomLevel, yZoomLevels, ctrlPressed } = this.state;

    if (ctrlPressed) {
      const hoveredAxisId = this.wichAxisIsHovered(e);
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
    const { allowPan, allowYPan, allowLasso } = this.props;
    const { pan, yPans, ctrlPressed, shiftPressed } = this.state;

    if (!ctrlPressed && !shiftPressed) {
      return;
    }
    if (!this.onMouseMoveThrottle) {
      this.onMouseMoveThrottle = _throttle(this.onMouseMove, 100);
    }
    const hoveredAxisId = this.wichAxisIsHovered(e);
    if (ctrlPressed && allowYPan && hoveredAxisId) {
      const yPan = _get(yPans, hoveredAxisId, 0);
      this.setState({
        mouseMoveCursorOriginY: e.pageY,
        panAxisId: hoveredAxisId,
        yPanOrigin: yPan,
      });
      document.addEventListener('mousemove', this.onMouseMoveThrottle);
      document.addEventListener('mouseup', this.onMouseUp);
    } else if (ctrlPressed && allowPan && !hoveredAxisId) {
      this.setState({
        mouseMoveCursorOriginX: e.pageX,
        xPanOrigin: pan,
        panning: true,
      });
      document.addEventListener('mousemove', this.onMouseMoveThrottle);
      document.addEventListener('mouseup', this.onMouseUp);
    } else if (shiftPressed && allowLasso && !hoveredAxisId) {
      this.setState({
        mouseMoveCursorOriginX: e.pageX,
        mouseMoveCursorOriginY: e.pageY,
        lassoOriginX: (e.pageX - this.el.getBoundingClientRect().left) - (this.divStyle.left || 0),
        lassoOriginY: (e.pageY - this.el.getBoundingClientRect().top) - this.divStyle.top,
        lassoing: true,
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
      lassoing,
      panning,
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
    } else if (panning) {
      this.setState({
        pan: xPanOrigin + ((e.pageX - mouseMoveCursorOriginX) / zoomLevel),
      });
    } else if (lassoing) {
      this.setState({
        lassoX: e.pageX - mouseMoveCursorOriginX,
        lassoY: e.pageY - mouseMoveCursorOriginY,
      });
    }
  }

  onMouseUp = (e) => {
    e.preventDefault();
    const {
      yZoomLevels,
      lassoing,
      zoomLevel,
      yPans,
      pan,
    } = this.state;
    let {
      lassoX,
      lassoY,
      lassoOriginX,
      lassoOriginY,
    } = this.state;

    if (lassoing) {
      // Lasso might not be right-bottom oriented
      if (lassoX < 0) {
        lassoOriginX += lassoX;
        lassoX = Math.abs(lassoX);
      }
      if (lassoY < 0) {
        lassoOriginY += lassoY;
        lassoY = Math.abs(lassoY);
      }
      // Zoom on X axis
      const zoomX = this.divStyle.width / lassoX;

      // Zoom on all Y axes
      const newYZoomLevels = {};
      this.yAxes.forEach((axis) => {
        const zoomY = this.divStyle.height / lassoY;
        const zoomLevelY = zoomY * _get(yZoomLevels, axis.id, 1);
        newYZoomLevels[axis.id] = zoomLevelY;
      });

      // Pan on X axis
      const centerX = lassoOriginX + (lassoX / 2);
      const toPanX = (this.divStyle.width / 2) - centerX;

      // Pan on all Y axes
      const newYPans = {};
      this.yAxes.forEach((axis) => {
        const panY = _get(yPans, axis.id, 0);
        const centerY = lassoOriginY + (lassoY / 2);
        const toPanY = (this.divStyle.height / 2) - centerY;
        newYPans[axis.id] = panY - (toPanY / _get(yZoomLevels, axis.id, 1));
      });

      this.setState({
        pan: pan + (toPanX / zoomLevel),
        zoomLevel: zoomX * zoomLevel,
        yZoomLevels: newYZoomLevels,
        yPans: newYPans,
        panAxisId: null,
        lassoing: false,
        shiftPressed: false,
        panning: false,
      });
    } else {
      this.setState({
        panAxisId: null,
        lassoing: false,
        panning: false,
      });
    }
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
        const logBase = _get(axis, ['logSettings', 'base'], 10);
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
        } else if (axis.logarithmic) {
          const factor = logBase ** Math.floor(Math.log10(zoomLevel ** 5));
          const panPower = pan < 0 ? -Math.floor(Math.abs(pan) / 40) : Math.floor(pan / 40);
          const yExtendsLower = (logBase ** panPower) * (_get(axis, ['logSettings', 'min'], 1) / factor);
          const yExtendsUpper = (logBase ** panPower) * (_get(axis, ['logSettings', 'max'], 10000000) * factor);
          if (!this.yExtents[axis.id]) {
            this.yExtents[axis.id] = _memoize(
              (hash, orient, lower, upper) =>
                (orient === 'top' ? [lower, upper] : [upper, lower])
            );
          }
          yExtents = this.yExtents[axis.id](
            `${axis.orient}-${yExtendsLower}-${yExtendsUpper}`,
            axis.orient,
            yExtendsLower,
            yExtendsUpper
          );
        } else {
          const center = (axis.yExtents[0] + axis.yExtents[1]) / 2;
          const range = axis.yExtents[1] - axis.yExtents[0];
          const zoomedRange = range / zoomLevel;
          const scaledPan = (pan / this.chartHeight) * range * -1;
          const pannedCenter = center + scaledPan;
          const yExtendsLower = pannedCenter - (zoomedRange / 2);
          const yExtendsUpper = pannedCenter + (zoomedRange / 2);
          // First render, instanciate one memoize method per Y axis
          if (!this.yExtents[axis.id]) {
            this.yExtents[axis.id] = _memoize(
              (hash, orient, lower, upper) =>
                (orient === 'top' ? [lower, upper] : [upper, lower])
            );
          }
          yExtents = this.yExtents[axis.id](
            `${axis.orient}-${yExtendsLower}-${yExtendsUpper}`,
            axis.orient,
            yExtendsLower,
            yExtendsUpper
          );
        }

        // First render, instanciate one memoize method per Y axis
        if (!this.yScales[axis.id]) {
          this.yScales[axis.id] = _memoize(
            (hash, yExtentsLower, yExtentsUpper, height, logarithmic, base) => {
              if (logarithmic) {
                return scaleLog()
                  .domain([yExtentsLower, yExtentsUpper])
                  .range([height, 0])
                  .base(base)
                  .nice();
              }
              return scaleLinear()
                .domain([yExtentsUpper, yExtentsLower])
                .range([0, height]);
            }
          );
        }
        const yScale = this.yScales[axis.id](
          `${yExtents[0]}-${yExtents[1]}-${this.chartHeight}-${axis.logarithmic}-${logBase}`,
          yExtents[0],
          yExtents[1],
          this.chartHeight,
          axis.logarithmic,
          logBase
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
      lassoX,
      lassoY,
      shiftPressed,
      lassoing,
      lassoOriginX,
      lassoOriginY,
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
    this.divStyle = this.memoizeBackgroundDivStyle(
      `${marginTop}-${marginSide}-${yAxesAt}-${this.chartWidth}-${this.chartHeight}`,
      marginTop,
      marginSide,
      yAxesAt,
      this.chartWidth,
      this.chartHeight
    );

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
        { enableTooltip && <Tooltip
          tooltipColor={tooltipColor}
          yAxes={this.yAxes}
          width={this.chartWidth}
          height={this.chartHeight}
          current={current}
          xScale={xScale}
          xFormat={format}
          yAxesAt={yAxesAt}
          xAxisAt={xAxisAt}
          yAxisWidth={this.yAxisWidth}
          divStyle={this.divStyle}
        /> }
        <div
          className={classnames('Background', styles.Background)}
          style={this.divStyle}
        />
        <CurrentCursorCanvas
          width={this.chartWidth}
          height={this.chartHeight}
          divStyle={this.divStyle}
          xAxisAt={xAxisAt}
          current={current}
          xScale={xScale}
        />
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
        {
          this.yAxes.map(yAxis =>
            <LinesCanvas
              key={yAxis.id}
              width={this.chartWidth}
              height={this.chartHeight}
              xScale={xScale}
              yScale={yAxis.yScale}
              showLabels={yAxis.showLabels}
              axisId={yAxis.id}
              data={yAxis.data}
              lines={yAxis.lines}
              updateLabelPosition={this.updateLabelPosition}
              perfOutput={perfOutput}
              divStyle={this.divStyle}
            />
          )
        }
        <Zones
          xAxisAt={xAxisAt}
          lassoX={lassoX}
          lassoY={lassoY}
          lassoOriginX={lassoOriginX}
          lassoOriginY={lassoOriginY}
          lassoing={lassoing}
          shiftPressed={shiftPressed}
          xAxisHeight={this.xAxisHeight}
          ctrlPressed={ctrlPressed}
          yAxes={this.yAxes}
          yAxisWidth={this.yAxisWidth}
          yAxesAt={yAxesAt}
          yAxesInteractive={allowYZoom || allowYPan}
          chartInteractive={allowZoom || allowPan}
          height={this.chartHeight}
          width={width}
          divStyle={this.divStyle}
        />
      </div>
    );
  }
}
