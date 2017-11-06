import React, { PropTypes } from 'react';
import classnames from 'classnames';
import _memoize from 'lodash/memoize';
import _max from 'lodash/max';
import _min from 'lodash/min';
import _set from 'lodash/set';
import _get from 'lodash/get';
import _uniq from 'lodash/uniq';
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

export default class Chart extends React.Component {

  static propTypes = {
    yAxesAt: PropTypes.string,
    xAxisAt: PropTypes.string,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    enableTooltip: PropTypes.bool,
    tooltipColor: PropTypes.string,
    allowXZoom: PropTypes.bool,
    allowYZoom: PropTypes.bool,
    allowYPan: PropTypes.bool,
    allowXPan: PropTypes.bool,
    allowLasso: PropTypes.bool,
    perfOutput: PropTypes.bool,
    parametric: PropTypes.bool,
    additionalStyle: PropTypes.shape({}).isRequired,
    xAxes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        orient: PropTypes.string.isRequired,
        extents: PropTypes.array.isRequired,
        autoLimits: PropTypes.bool.isRequired,
        showAxis: PropTypes.bool.isRequired,
        showLabels: PropTypes.bool,
        showTicks: PropTypes.bool,
        autoTick: PropTypes.bool,
        tickStep: PropTypes.number,
        showGrid: PropTypes.bool,
        gridStyle: PropTypes.string,
        gridSize: PropTypes.number,
        unit: PropTypes.string,
        label: PropTypes.string.isRequired,
        format: PropTypes.string,
        labelStyle: PropTypes.shape,
        formatAsDate: PropTypes.bool,
      })
    ).isRequired,
    yAxes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        orient: PropTypes.string.isRequired,
        extents: PropTypes.array.isRequired,
        autoLimits: PropTypes.bool.isRequired,
        showAxis: PropTypes.bool.isRequired,
        showLabels: PropTypes.bool,
        showTicks: PropTypes.bool,
        autoTick: PropTypes.bool,
        tickStep: PropTypes.number,
        showGrid: PropTypes.bool,
        gridStyle: PropTypes.string,
        gridSize: PropTypes.number,
        unit: PropTypes.string,
        label: PropTypes.string.isRequired,
        format: PropTypes.string,
        labelStyle: PropTypes.shape,
        formatAsDate: PropTypes.bool,
      })
    ).isRequired,
    lines: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.objectOf(PropTypes.shape),
        indexes: PropTypes.arrayOf(PropTypes.number),
        id: PropTypes.string.isRequired,
        yAxisId: PropTypes.string.isRequired,
        xAxisId: PropTypes.string.isRequired,
        fill: PropTypes.string,
        lineStyle: PropTypes.string,
        lineSize: PropTypes.number,
        pointSize: PropTypes.number,
        pointStyle: PropTypes.string,
        xAccessor: PropTypes.func,
        yAccessor: PropTypes.func,
        xTooltipAccessor: PropTypes.func,
        yTooltipAccessor: PropTypes.func,
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
    allowXZoom: true,
    allowXPan: true,
    allowLasso: true,
    tooltipColor: 'white',
    perfOutput: false,
    parametric: false,
  }

  state = {
    zoomLevels: {},
    pans: {},
    ctrlPressed: false,
    shiftPressed: false,
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
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
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
    const { allowXZoom, allowYZoom } = this.props;
    const { zoomLevels, ctrlPressed } = this.state;

    if (ctrlPressed) {
      const hoveredAxis = this.wichAxisIsHovered(e);
      const hoveredAxisId = hoveredAxis ? hoveredAxis[0] : null;
      if (hoveredAxisId && ((allowXZoom && hoveredAxis[2] === 'X') || (allowYZoom && hoveredAxis[2] === 'Y'))) {
        const zoomLevel = _get(zoomLevels, hoveredAxisId, 1);
        const newZoomLevels = {
          ...zoomLevels,
          [hoveredAxisId]: zoomLevel * (e.deltaY > 0 ? 0.9 : 1.1),
        };
        this.setState({
          zoomLevels: newZoomLevels,
        });
      }
    }
  }

  onMouseDown = (e) => {
    e.preventDefault();
    const { allowXZoom, allowYZoom, allowLasso } = this.props;
    const { pans, ctrlPressed, shiftPressed } = this.state;
    if (!this.onMouseMoveThrottle) {
      this.onMouseMoveThrottle = _throttle(this.onMouseMove, 100);
    }
    const hoveredAxis = this.wichAxisIsHovered(e);
    const hoveredAxisId = hoveredAxis ? hoveredAxis[0] : null;
    const hoveredAxisType = hoveredAxis ? hoveredAxis[2] : null;
    if (ctrlPressed && hoveredAxisId && ((allowXZoom && hoveredAxis[2] === 'X') || (allowYZoom && hoveredAxis[2] === 'Y'))) {
      const pan = _get(pans, hoveredAxisId, 0);
      this.setState({
        mouseMoveCursorOriginY: e.pageY,
        mouseMoveCursorOriginX: e.pageX,
        panAxisId: hoveredAxisId,
        panAxisType: hoveredAxisType,
        panOrigin: pan,
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
      mouseMoveCursorOriginY,
      panAxisId,
      panAxisType,
      pans,
      panOrigin,
      zoomLevels,
      lassoing,
    } = this.state;
    if (panAxisId) {
      const axisZoomLevel = _get(zoomLevels, panAxisId, 1);
      const newPans = {
        ...pans,
        [panAxisId]: panAxisType === 'X' ?
          panOrigin + ((e.pageX - mouseMoveCursorOriginX) / axisZoomLevel) :
          panOrigin + ((mouseMoveCursorOriginY - e.pageY) / axisZoomLevel),
      };
      this.setState({
        pans: newPans,
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
      lassoing,
      zoomLevels,
      pans,
    } = this.state;
    let {
      lassoOriginX,
      lassoOriginY,
      lassoX,
      lassoY,
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
      const newPans = {};
      const newZoomLevels = {};

      // Zoom on X axis
      const zoomX = this.divStyle.width / lassoX;
      const zoomY = this.divStyle.height / lassoY;

      // Zoom on all Y axes
      this.yAxesUniq.forEach((axis) => {
        const zoomLevelY = zoomY * _get(zoomLevels, axis.id, 1);
        newZoomLevels[axis.id] = zoomLevelY;
      });

      // Zoom on all X axes
      this.xAxesUniq.forEach((axis) => {
        const zoomLevelX = zoomX * _get(zoomLevels, axis.id, 1);
        newZoomLevels[axis.id] = zoomLevelX;
      });

      // Pan on all X axes
      this.xAxesUniq.forEach((axis) => {
        const panX = _get(pans, axis.id, 0);
        const centerX = lassoOriginX + (lassoX / 2);
        const toPanX = (this.divStyle.width / 2) - centerX;
        newPans[axis.id] = panX + (toPanX / _get(zoomLevels, axis.id, 1));
      });

      // Pan on all Y axes
      this.yAxesUniq.forEach((axis) => {
        const panY = _get(pans, axis.id, 0);
        const centerY = lassoOriginY + (lassoY / 2);
        const toPanY = (this.divStyle.height / 2) - centerY;
        newPans[axis.id] = panY - (toPanY / _get(zoomLevels, axis.id, 1));
      });

      this.setState({
        zoomLevels: newZoomLevels,
        pans: newPans,
        panAxisId: null,
        lassoing: false,
        shiftPressed: false,
        panning: false,
        lassoX: 0,
        lassoY: 0,
      });
    } else {
      this.setState({
        panAxisId: null,
        panOrigin: null,
        mouseMoveCursorOriginX: null,
        mouseMoveCursorOriginY: null,
      });
    }
    document.removeEventListener('mousemove', this.onMouseMoveThrottle);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  // eslint-disable-next-line complexity, "DV6 TBC_CNES axes sorting, must not be split"
  getSortedAndValidPairs = () => {
    const {
      yAxes,
      xAxes,
      lines,
    } = this.props;
    const {
      zoomLevels,
      pans,
    } = this.state;
    const linesWithValidAxes = [];
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const xAxis = xAxes.find(axis => axis.id === line.xAxisId);
      const yAxis = yAxes.find(axis => axis.id === line.yAxisId);
      if (xAxis && xAxis.showAxis && yAxis && yAxis.showAxis) {
        line.xAxis = xAxis;
        line.yAxis = yAxis;
        linesWithValidAxes.push(line);
      }
    }
    const yAxesUniq = [];
    const linesUniq = [];
    const xAxesUniq = [];
    const pairs = {};
    for (let i = 0; i < linesWithValidAxes.length; i += 1) {
      const line = lines[i];
      linesUniq.push(line);
      const pairLines = linesWithValidAxes.filter(
        l => l.xAxis.id === line.xAxis.id && l.yAxis.id === line.yAxis.id
      );
      // Extents [lower, upper] for x and y axes
      for (let j = 0; j < [line.xAxis, line.yAxis].length; j += 1) {
        const axis = [line.xAxis, line.yAxis][j];
        const logBase = _get(axis, ['logSettings', 'base'], 10);
        const isXAxis = j === 0;
        const zoomLevel = _get(zoomLevels, axis.id, 1);
        const pan = _get(pans, axis.id, 0);
        if (axis.autoLimits) {
          if (!this.extentsAutoLimits[axis.id]) {
            this.extentsAutoLimits[axis.id] = _memoize(
              (hash, extentsLower, extentsUpper, orient, liness, data) => {
                const values = [];
                for (let k = 0; k < liness.length; k += 1) {
                  for (let l = 0; l < data.length; l += 1) {
                    if (data[l].x >= extentsLower && data[l].x <= extentsUpper) {
                      values.push(
                        liness[k].yAccessor ? liness[k].yAccessor(data[l]) : data[l].value
                      );
                    }
                  }
                }

                const lowerR = _min(values);
                const upperR = _max(values);

                return orient === 'top' ? [upperR, lowerR] : [lowerR, upperR];
              }
            );
          }
          axis.calculatedExtents = this.extentsAutoLimits[axis.id](
            `${axis.extents[0]}-${axis.extents[1]}-${axis.orient}`,
            axis.extents[0],
            axis.extents[1],
            axis.orient,
            pairLines,
            line.data
          );
        } else if (axis.logarithmic) {
          const factor = logBase ** Math.floor(Math.log10(zoomLevel ** 5));
          const panPower = pan < 0 ? -Math.floor(Math.abs(pan) / 40) : Math.floor(pan / 40);
          const extendsLower = (logBase ** panPower) * (_get(axis, ['logSettings', 'min'], 1) / factor);
          const extendsUpper = (logBase ** panPower) * (_get(axis, ['logSettings', 'max'], 10000000) * factor);
          if (!this.extents[axis.id]) {
            this.extents[axis.id] = _memoize(
              (hash, orient, lower, upper) =>
                (orient === 'top' ? [lower, upper] : [upper, lower])
            );
          }
          axis.calculatedExtents = this.extents[axis.id](
            `${axis.orient}-${extendsLower}-${extendsUpper}`,
            axis.orient,
            extendsLower,
            extendsUpper
          );
        } else {
          // First render, instanciate one memoize method per Y axis
          if (!this.extents[axis.id]) {
            this.extents[axis.id] = _memoize(
              (hash, orient, lower, upper) =>
                (orient === 'top' ? [lower, upper] : [upper, lower])
            );
          }
          const center = (axis.extents[0] + axis.extents[1]) / 2;
          const range = axis.extents[1] - axis.extents[0];
          const zoomedRange = range / zoomLevel;
          const scaledPan = (pan / (isXAxis ? this.chartWidth : this.chartHeight)) * range * -1;
          const pannedCenter = center + scaledPan;
          const extentsLower = pannedCenter - (zoomedRange / 2);
          const extentsUpper = pannedCenter + (zoomedRange / 2);

          axis.calculatedExtents = this.extents[axis.id](
            `${axis.id}-${axis.orient}-${extentsLower}-${extentsUpper}`,
            axis.orient,
            extentsLower,
            extentsUpper
          );
        }

        if (!this.scales[axis.id]) {
          this.scales[axis.id] = _memoize(
            (hash, extentsLower, extentsUpper, height, logarithmic, base) => {
              if (logarithmic) {
                return scaleLog()
                  .domain([extentsLower, extentsUpper])
                  .range([height, 0])
                  .base(base)
                  .nice();
              }
              return scaleLinear()
                // Invert for Y axis because it goes by default from top to bottom
                .domain(isXAxis ? [extentsLower, extentsUpper] : [extentsUpper, extentsLower])
                .range([0, height]);
            }
          );
        }
        axis.scale = this.scales[axis.id](
          `${axis.calculatedExtents[0]}-${axis.calculatedExtents[1]}-${this.chartHeight}-${axis.logarithmic}`,
          axis.calculatedExtents[0],
          axis.calculatedExtents[1],
          isXAxis ? this.chartWidth : this.chartHeight,
          axis.logarithmic,
          logBase
        );

        axis.rank = axis.showGrid ? 100 : axis.id.length;
      }

      yAxesUniq.push(line.yAxis);
      xAxesUniq.push(line.xAxis);
      const pairId = `${line.xAxis.id}-${line.yAxis.id}`;
      if (!pairs[pairId]) {
        pairs[pairId] = {
          lines: [],
          data: {},
          indexes: {},
          xAxis: line.xAxis,
          yAxis: line.yAxis,
        };
      }
      pairs[pairId].lines.push(line);
      pairs[pairId].data[line.id] = line.data;
      pairs[pairId].indexes[line.id] = line.indexes;
    }

    this.yAxesUniq = _uniq(yAxesUniq).sort(a => a.rank);
    this.xAxesUniq = _uniq(xAxesUniq).sort(a => a.rank);
    this.linesUniq = _uniq(linesUniq);
    return pairs;
  }

  getLabelPosition = (axisId) => {
    const labelsPositionConcerned =
      Object.values(this.labelsPosition || {}).filter(lp => lp.concernedAxes.includes(axisId));
    return labelsPositionConcerned;
  }

  extents = {};
  extentsAutoLimits = {};
  scales = {};

  wichAxisIsHovered = (e) => {
    const {
      yAxesAt,
      xAxisAt,
      width,
      height,
    } = this.props;
    const xPositionPx = e.clientX - this.el.getBoundingClientRect().left;
    const yPositionPx = e.clientY - this.el.getBoundingClientRect().top;
    if (this.yAxesUniq.length === 0) {
      return null;
    }
    // let axisId = null;
    const axisBounds = [];
    if (yAxesAt === 'left') {
      const offsetWithYAxes = xPositionPx - (this.yAxesUniq.length * this.yAxisWidth);
      if (offsetWithYAxes > 0) {
        if (xAxisAt === 'top') {
          this.xAxesUniq.forEach((axis, index) => {
            const bound = (this.xAxesUniq.length * this.xAxisHeight) - (index * this.xAxisHeight);
            axisBounds.push([
              axis.id,
              bound - yPositionPx,
              'X',
            ]);
          });
        } else {
          this.xAxesUniq.forEach((axis, index) => {
            const bound =
              height - ((this.xAxesUniq.length - index) * this.xAxisHeight);
            axisBounds.push([
              axis.id,
              yPositionPx - bound,
              'X',
            ]);
          });
        }
      } else {
        this.yAxesUniq.forEach((axis, index) => {
          const bound = (this.yAxesUniq.length * this.yAxisWidth) - (index * this.yAxisWidth);
          axisBounds.push([
            axis.id,
            bound - xPositionPx,
            'Y',
          ]);
        });
      }
    } else if (yAxesAt === 'right') {
      const offsetWithYAxes = (this.yAxesUniq.length * this.yAxisWidth) - (width - xPositionPx);
      if (offsetWithYAxes < 0) {
        if (xAxisAt === 'top') {
          this.xAxesUniq.forEach((axis, index) => {
            const bound = (this.xAxesUniq.length * this.xAxisHeight) - (index * this.xAxisHeight);
            axisBounds.push([
              axis.id,
              bound - yPositionPx,
              'X',
            ]);
          });
        } else {
          this.xAxesUniq.forEach((axis, index) => {
            const bound =
              height - ((this.xAxesUniq.length - index) * this.xAxisHeight);
            axisBounds.push([
              axis.id,
              yPositionPx - bound,
              'X',
            ]);
          });
        }
      } else {
        this.yAxesUniq.forEach((axis, index) => {
          const bound =
            (width - (this.yAxesUniq.length * this.yAxisWidth)) + (index * this.yAxisWidth);
          axisBounds.push([
            axis.id,
            xPositionPx - bound,
            'Y',
          ]);
        });
      }
    }

    const foundAxis = axisBounds
      .filter(ab => ab[1] > 0)
      .sort(ab => ab[1])[0];
    return foundAxis;
  }

  resetZoomLevel = (e) => {
    e.preventDefault();
    this.setState({ zoomLevel: 1 });
  }

  updateLabelPosition = (xAxisId, yAxisId, lineId, positions) => {
    if (!this.labelsPosition) {
      this.labelsPosition = {};
    }
    this.labelsPosition = _set(
      this.labelsPosition,
      [`${xAxisId}-${yAxisId}`, 'concernedAxes'],
      [xAxisId, yAxisId]
    );
    this.labelsPosition = _set(
      this.labelsPosition,
      [`${xAxisId}-${yAxisId}`, lineId],
      positions
    );
  }

  updatePointLabelsPosition = (yAxisId, points) => {
    if (!this.pointLabels) {
      this.pointLabels = {};
    }
    _set(this.pointLabels, yAxisId, points);
  }

  yAxisWidth = 90;
  xAxisHeight = 40;

  assignEl = (el) => { this.el = el; }

  resetPan = (e, axisId) => {
    e.preventDefault();
    const { pans } = this.state;
    this.setState({
      pans: {
        ...pans,
        [axisId]: 0,
      },
    });
  }

  resetZoomLevel = (e, axisId) => {
    e.preventDefault();
    const { zoomLevels } = this.state;
    this.setState({
      zoomLevels: {
        ...zoomLevels,
        [axisId]: 1,
      },
    });
  }

  memoizeResetPan = _memoize(axisId =>
    e => this.resetPan(e, axisId)
  )

  memoizeResetZoomLevel= _memoize(axisId =>
    e => this.resetZoomLevel(e, axisId)
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
      yAxes,
      xAxes,
      allowYPan,
      allowYZoom,
      allowXPan,
      allowXZoom,
      perfOutput,
      additionalStyle,
      enableTooltip,
      tooltipColor,
      current,
      parametric,
    } = this.props;

    const {
      zoomLevels,
      pans,
      ctrlPressed,
      lassoX,
      lassoY,
      shiftPressed,
      lassoing,
      lassoOriginX,
      lassoOriginY,
    } = this.state;

    // This is an estimation on first render since this.getSortedAndValidPairs needs this.chartHeight
    // to calculate y scales
    if (!this.chartHeight) {
      this.chartHeight = height - (xAxes.length * this.xAxisHeight);
    }
    if (!this.chartWidth) {
      this.chartWidth = width - (yAxes.length * this.yAxisWidth);
    }
    this.pairs = this.getSortedAndValidPairs();

    // Set chartHeight depending on xAxisAt (top/bottom/other)
    this.chartHeight = ['top', 'bottom'].includes(xAxisAt) ?
      height - (this.xAxesUniq.length * this.xAxisHeight)
      :
      height;

    // Set chartWidth depending on yAxesAt (left/right/other)
    // and number of yAxes
    this.chartWidth = ['left', 'right'].includes(yAxesAt) ?
      width - (this.yAxesUniq.length * this.yAxisWidth)
      :
      width;

    const marginTop = xAxisAt === 'top' ? (this.xAxesUniq.length * this.xAxisHeight) : 0;
    const marginSide = this.yAxesUniq.length * this.yAxisWidth;

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
            top: xAxisAt === 'top' ? (this.xAxesUniq.length * this.xAxisHeight) + 5 : 5,
          }}
        >
          {
            Object.keys(pans).map((key) => {
              const yAxis = this.yAxesUniq.find(a => a.id === key);
              const xAxis = this.xAxesUniq.find(a => a.id === key);
              if (!xAxis && !yAxis) return null;
              const axis = yAxis || xAxis;
              return (pans[key] !== 0 &&
              <Button
                key={key}
                bsStyle="danger"
                bsSize="xs"
                onClick={this.memoizeResetPan(key)}
              >{`${xAxis ? 'X' : 'Y'} axis ${axis.label} panned ${pans[key].toFixed(2)}px`}</Button>);
            })
          }
          {
            Object.keys(zoomLevels).map((key) => {
              const yAxis = this.yAxesUniq.find(a => a.id === key);
              const xAxis = this.xAxesUniq.find(a => a.id === key);
              if (!xAxis && !yAxis) return null;
              const axis = yAxis || xAxis;
              return (zoomLevels[key] !== 1 &&
              <Button
                key={key}
                bsStyle="danger"
                bsSize="xs"
                onClick={this.memoizeResetZoomLevel(key)}
              >{`${xAxis ? 'X' : 'Y'} axis ${axis.label} zoomed ${(zoomLevels[key]).toFixed(2)}x`}</Button>);
            })
          }
        </div>
        <div
          className={classnames('Background', styles.Background)}
          style={this.divStyle}
        />
        {
          ['left', 'right'].includes(yAxesAt) && this.yAxesUniq.map((yAxis, index) =>
            <YAxis
              key={yAxis.id}
              index={index}
              margin={((this.yAxesUniq.length - 1) * this.yAxisWidth) - (index * this.yAxisWidth)}
              lines={this.linesUniq.filter(l => l.yAxisId === yAxis.id)}
              axisId={yAxis.id}
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
              xAxisHeight={this.xAxisHeight}
              chartWidth={this.chartWidth}
              height={this.chartHeight}
              allowYPan={allowYPan}
              xAxesAt={xAxisAt}
              top={marginTop}
              yAxesAt={yAxesAt}
              scale={yAxis.scale}
              extents={yAxis.extents}
              label={yAxis.label}
              labelStyle={yAxis.labelStyle}
              formatAsDate={yAxis.formatAsDate}
              getLabelPosition={this.getLabelPosition}
            />
          )
        }
        {
          ['top', 'bottom'].includes(xAxisAt) && this.xAxesUniq.map((xAxis, index) =>
            <XAxis
              key={xAxis.id}
              index={index}
              margin={xAxisAt === 'top' ? (this.xAxesUniq.length - index - 1) * this.xAxisHeight : index * this.xAxisHeight}
              lines={this.linesUniq.filter(l => l.xAxisId === xAxis.id)}
              top={marginTop}
              side={this.yAxesUniq.length * this.yAxisWidth}
              axisId={xAxis.id}
              format={xAxis.format}
              showLabels={xAxis.showLabels}
              showTicks={xAxis.showTicks}
              autoTick={xAxis.autoTick}
              tickStep={xAxis.tickStep}
              showGrid={xAxis.showGrid}
              gridStyle={xAxis.gridStyle}
              axisLabel={xAxis.axisLabel}
              gridSize={xAxis.gridSize}
              logarithmic={xAxis.logarithmic}
              xAxisHeight={this.xAxisHeight}
              chartWidth={this.chartWidth}
              height={this.chartHeight}
              allowYPan={allowYPan}
              xAxesAt={xAxisAt}
              yAxesAt={yAxesAt}
              scale={xAxis.scale}
              extents={xAxis.extents}
              label={xAxis.label}
              labelStyle={xAxis.labelStyle}
              formatAsDate={xAxis.formatAsDate}
              getLabelPosition={this.getLabelPosition}
            />
          )
        }
        {
          Object.keys(this.pairs).map((key) => {
            const pair = this.pairs[key];
            return (
              <LinesCanvas
                key={key}
                width={this.chartWidth}
                height={this.chartHeight}
                xAxesAt={xAxisAt}
                xScale={pair.xAxis.scale}
                yScale={pair.yAxis.scale}
                showLabelsX={pair.xAxis.showLabels}
                showLabelsY={pair.yAxis.showLabels}
                lines={pair.lines}
                indexes={pair.indexes}
                data={pair.data}
                updateLabelPosition={this.updateLabelPosition}
                perfOutput={perfOutput}
                divStyle={this.divStyle}
                current={current}
                parametric={parametric}
              />
            );
          })
        }
        {
          !parametric && this.xAxesUniq[0] &&
          <CurrentCursorCanvas
            current={current}
            width={this.chartWidth}
            height={this.chartHeight}
            divStyle={this.divStyle}
            xScale={this.xAxesUniq[0].scale}
          />
        }
        {
          enableTooltip &&
          <Tooltip
            tooltipColor={tooltipColor}
            yAxesUniq={this.yAxesUniq}
            xAxesUniq={this.xAxesUniq}
            pairs={this.pairs}
            width={this.chartWidth}
            height={this.chartHeight}
            yAxesAt={yAxesAt}
            xAxesAt={xAxisAt}
            yAxisWidth={this.yAxisWidth}
            xAxisHeight={this.xAxisHeight}
            divStyle={this.divStyle}
          />
        }
        {
          <Zones
            ctrlPressed={ctrlPressed}
            shiftPressed={shiftPressed}
            lassoX={lassoX}
            lassoY={lassoY}
            lassoOriginX={lassoOriginX}
            lassoOriginY={lassoOriginY}
            lassoing={lassoing}
            yAxes={this.yAxesUniq}
            xAxes={this.xAxesUniq}
            xAxisHeight={this.xAxisHeight}
            yAxisWidth={this.yAxisWidth}
            yAxesAt={yAxesAt}
            xAxesAt={xAxisAt}
            yAxesInteractive={allowYZoom || allowYPan}
            xAxesInteractive={allowXZoom || allowXPan}
            height={height}
            width={width}
            divStyle={this.divStyle}
          />
        }
      </div>
    );
  }
}
