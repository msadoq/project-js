import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import _memoize from 'lodash/memoize';
import _throttle from 'lodash/throttle';
import _get from 'lodash/get';
import styles from './GrizzlyChart.css';
import { divStyleType } from './types';

const { number, shape, bool, string, arrayOf, func } = PropTypes;

export default class Zones extends Component {
  static propTypes = {
    yAxes: arrayOf(
      shape
    ).isRequired,
    xAxes: arrayOf(
      shape
    ).isRequired,
    yAxisWidth: number.isRequired,
    xAxisHeight: number.isRequired,
    height: number.isRequired,
    width: number.isRequired,
    yAxesInteractive: bool.isRequired,
    xAxesInteractive: bool.isRequired,
    shiftPressed: bool.isRequired,
    lassoing: bool.isRequired,
    lassoX: number,
    lassoY: number,
    lassoOriginX: number,
    lassoOriginY: number,
    yAxesAt: string.isRequired,
    xAxesAt: string.isRequired,
    divStyle: divStyleType.isRequired,
    setPan: func.isRequired,
    pans: shape().isRequired,
    zoomLevels: shape().isRequired,
    allowYPan: bool.isRequired,
    allowXPan: bool.isRequired,
  };

  static defaultProps = {
    lassoOriginX: 0,
    lassoOriginY: 0,
    lassoX: 0,
    lassoY: 0,
  };

  componentDidMount() {
    this.addedListennersForAxes = [];
    Object.keys(this.memoizedAxesRefs).forEach((key) => {
      this.memoizedAxesRefs[key].addEventListener('touchstart', e => this.onTouchStart(e, key));
      this.memoizedAxesRefs[key].addEventListener('touchend', this.onTouchEnd);
      this.memoizedAxesRefs[key].addEventListener('mousedown', e => this.onMouseDown(e, key));
      this.addedListennersForAxes.push(key);
    });
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;
    [
      'yAxesAt', 'xAxesAt', 'width', 'height', 'ctrlPressed', 'shiftPressed',
      'lassoX', 'lassoY', 'lassoOriginX', 'lassoOriginY',
    ].forEach((attr) => {
      if (nextProps[attr] !== this.props[attr]) {
        shouldRender = true;
      }
    });
    if (nextProps.yAxes.length !== this.props.yAxes.length) {
      shouldRender = true;
    }
    if (nextProps.xAxes.length !== this.props.xAxes.length) {
      shouldRender = true;
    }
    return shouldRender;
  }

  componentDidUpdate() {
    Object.keys(this.memoizedAxesRefs).forEach((key) => {
      if (!this.addedListennersForAxes.find(axisId => axisId === key)) {
        this.memoizedAxesRefs[key].addEventListener('touchstart', e => this.onTouchStart(e, key));
        this.memoizedAxesRefs[key].addEventListener('touchend', this.onTouchEnd);
        this.memoizedAxesRefs[key].addEventListener('mousedown', e => this.onMouseDown(e, key));
        this.addedListennersForAxes.push(key);
      }
    });
  }

  onMouseDown = (e, axisId) => {
    const { pans } = this.props;
    this.setState({
      mouseMoveCursorOriginY: e.clientY,
      mouseMoveCursorOriginX: e.clientX,
      startPan: pans[axisId] || 0,
      panAxisId: axisId,
    });
    e.target.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (e) => {
    const {
      xAxes,
      yAxes,
      setPan,
      zoomLevels,
      allowYPan,
      allowXPan,
    } = this.props;
    const { panAxisId } = this.state;
    const axisZoomLevel = _get(zoomLevels, panAxisId, 1);

    if (allowXPan && xAxes.find(axis => axis.id === panAxisId)) {
      setPan(
        panAxisId,
        this.state.startPan + ((e.clientX - this.state.mouseMoveCursorOriginX) / axisZoomLevel)
      );
    } else if (allowYPan && yAxes.find(axis => axis.id === panAxisId)) {
      setPan(
        panAxisId,
        this.state.startPan + ((this.state.mouseMoveCursorOriginY - e.clientY) / axisZoomLevel)
      );
    }
  }

  onMouseUp = (e) => {
    this.setState({
      mouseMoveCursorOriginY: null,
      mouseMoveCursorOriginX: null,
      startPan: null,
      panAxisId: null,
    });
    e.target.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  onTouchStart = (e, axisId) => {
    const { pans } = this.props;
    this.setState({
      mouseMoveCursorOriginY: e.touches[0].clientY,
      mouseMoveCursorOriginX: e.touches[0].clientX,
      startPan: pans[axisId] || 0,
      panAxisId: axisId,
    });
    e.target.addEventListener('touchmove', this.onTouchMove);
  }

  onTouchMove = (e) => {
    const {
      xAxes,
      yAxes,
      setPan,
      zoomLevels,
      allowYPan,
      allowXPan,
    } = this.props;
    const { panAxisId } = this.state;
    const axisZoomLevel = _get(zoomLevels, panAxisId, 1);

    if (allowXPan && xAxes.find(axis => axis.id === panAxisId)) {
      setPan(
        panAxisId,
        this.state.startPan +
          ((e.touches[0].clientX - this.state.mouseMoveCursorOriginX) / axisZoomLevel)
      );
    } else if (allowYPan && yAxes.find(axis => axis.id === panAxisId)) {
      setPan(
        panAxisId,
        this.state.startPan +
          ((this.state.mouseMoveCursorOriginY - e.touches[0].clientY) / axisZoomLevel)
      );
    }
  }

  onTouchEnd = (e) => {
    this.setState({
      mouseMoveCursorOriginY: null,
      mouseMoveCursorOriginX: null,
      startPan: 0,
      panAxisId: null,
    });
    e.target.removeEventListener('touchmove', this.onTouchMove);
  }

  assignMemoizedAxisRef = _memoize(id =>
    (el) => { this.memoizedAxesRefs[id] = el; }
  )

  render() {
    const {
      width,
      height,
      yAxes,
      xAxes,
      yAxesAt,
      xAxesAt,
      yAxisWidth,
      xAxisHeight,
      shiftPressed,
      yAxesInteractive,
      xAxesInteractive,
      divStyle,
      lassoing,
      lassoX,
      lassoY,
      lassoOriginX,
      lassoOriginY,
    } = this.props;

    if (!this.setPanThrottle) {
      this.setPanThrottle = _throttle(this.props.setPan, 100);
    }

    if (!this.memoizedAxesRefs) {
      this.memoizedAxesRefs = {};
    }

    yAxes.forEach((axis) => {
      if (!this.memoizedAxesRefs[axis.id]) {
        this.memoizedAxesRefs[axis.id] = this.assignMemoizedAxisRef(axis.id);
      }
    });

    xAxes.forEach((axis) => {
      if (!this.memoizedAxesRefs[axis.id]) {
        this.memoizedAxesRefs[axis.id] = this.assignMemoizedAxisRef(axis.id);
      }
    });

    return (
      <div
        className={styles.Zones}
        style={{
          width,
          height,
          top: xAxesAt === 'top' ? xAxisHeight : 0,
        }}
      >
        { /*
          Y Axes area
        */ }
        {yAxesInteractive && !shiftPressed && yAxesAt === 'left' && yAxes.map((axis, index) =>
          <div
            className={classnames(styles.ZonesYAxis, styles.ZonesAxis)}
            ref={this.memoizedAxesRefs[axis.id]}
            key={axis.id}
            style={{
              width: yAxisWidth,
              height: height - (xAxes.length * xAxisHeight),
              top: xAxesAt === 'top' ? (xAxes.length - 1) * xAxisHeight : 0,
              left: ((yAxes.length - 1) * yAxisWidth) - (index * yAxisWidth),
            }}
          />
        )}
        {yAxesInteractive && !shiftPressed && yAxesAt === 'right' && yAxes.map((axis, index) =>
          <div
            className={classnames(styles.ZonesYAxis, styles.ZonesAxis)}
            key={axis.id}
            ref={this.memoizedAxesRefs[axis.id]}
            style={{
              width: yAxisWidth,
              height: height - (xAxes.length * xAxisHeight),
              top: xAxesAt === 'top' ? (xAxes.length - 1) * xAxisHeight : 0,
              right: ((yAxes.length - 1) * yAxisWidth) - (index * yAxisWidth),
            }}
          />
        )}
        {xAxesInteractive && !shiftPressed && xAxesAt === 'top' && xAxes.map((axis, index) =>
          <div
            className={classnames(styles.ZonesXAxis, styles.ZonesAxis)}
            key={axis.id}
            ref={this.memoizedAxesRefs[axis.id]}
            style={{
              height: xAxisHeight,
              width: width - ((xAxes.length - 1) * yAxisWidth),
              left: yAxesAt === 'left' ? yAxes.length * yAxisWidth : 0,
              top: (xAxes.length - index - 1) * xAxisHeight,
            }}
          />
        )}
        {xAxesInteractive && !shiftPressed && xAxesAt === 'bottom' && xAxes.map((axis, index) =>
          <div
            className={classnames(styles.ZonesXAxis, styles.ZonesAxis)}
            key={axis.id}
            ref={this.memoizedAxesRefs[axis.id]}
            style={{
              height: xAxisHeight,
              width: width - ((xAxes.length - 1) * yAxisWidth),
              left: yAxesAt === 'left' ? yAxes.length * yAxisWidth : 0,
              bottom: (xAxes.length - index - 1) * xAxisHeight,
            }}
          />
        )}
        {
          shiftPressed &&
          <div
            className={styles.ZonesChartLasso}
            style={divStyle}
          >
            {
              lassoing &&
              <div className={styles.ZonesChartLassoRectangleDiv}>
                <div
                  className={styles.ZonesChartLassoRectangle}
                  style={{
                    width: Math.abs(lassoX),
                    height: Math.abs(lassoY),
                    top: lassoY < 0 ? lassoOriginY + lassoY : lassoOriginY,
                    left: lassoX < 0 ? lassoOriginX + lassoX : lassoOriginX,
                  }}
                />
              </div>
            }
          </div>
        }
      </div>
    );
  }
}
