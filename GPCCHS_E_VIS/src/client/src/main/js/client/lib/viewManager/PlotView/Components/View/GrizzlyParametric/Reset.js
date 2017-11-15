import React, { PropTypes } from 'react';
import _memoize from 'lodash/memoize';
import { Button } from 'react-bootstrap';
import styles from './GrizzlyChart.css';

export default class Reset extends React.Component {
  static propTypes = {
    divStyle: PropTypes.shape().isRequired,
    multiple: PropTypes.bool,
    yAxesAt: PropTypes.string,
    xAxisAt: PropTypes.string,
    yAxesUniq: PropTypes.arrayOf(
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
    xAxesUniq: PropTypes.arrayOf(
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
    resetPan: PropTypes.func.isRequired,
    resetZoomLevel: PropTypes.func.isRequired,
    resetPanAndZoom: PropTypes.func.isRequired,
    zoomLevels: PropTypes.shape().isRequired,
    pans: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    multiple: false,
    yAxesAt: 'left',
    xAxisAt: 'bottom',
  };

  memoizeResetPan = _memoize(axisId =>
    e => this.props.resetPan(e, axisId)
  );

  memoizeResetZoomLevel = _memoize(axisId =>
    e => this.props.resetZoomLevel(e, axisId)
  );

  shouldRenderResetButton = (zoomLevels, pans) =>
    (Object.keys(pans).length + Object.keys(zoomLevels).length) > 0
  ;

  render() {
    const {
      multiple,
      yAxesAt,
      xAxisAt,
      yAxesUniq,
      xAxesUniq,
      zoomLevels,
      pans,
      divStyle,
    } = this.props;

    if (multiple) {
      return (
        <div
          className={styles.zoomAndPanLabels}
          style={{
            left: yAxesAt === 'left' ? (divStyle.left) + 5 : 5,
            top: xAxisAt === 'top' ? (divStyle.top) + 5 : 5,
          }}
        >
          {
            Object.keys(zoomLevels).map((key) => {
              const yAxis = yAxesUniq.find(a => a.id === key);
              const xAxis = xAxesUniq.find(a => a.id === key);
              if (!xAxis && !yAxis) return null;
              const axis = yAxis || xAxis;
              return (zoomLevels[key] !== 0 &&
                <Button
                  key={key}
                  bsStyle="danger"
                  bsSize="xs"
                  onClick={this.memoizeResetZoomLevel(key)}
                >{`${xAxis ? 'X' : 'Y'} axis ${axis.label} zoomed ${zoomLevels[key].toFixed(2)}px`}</Button>);
            })
          }
          {
            Object.keys(pans).map((key) => {
              const yAxis = yAxesUniq.find(a => a.id === key);
              const xAxis = xAxesUniq.find(a => a.id === key);
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
        </div>
      );
    } else if (this.shouldRenderResetButton(zoomLevels, pans)) {
      return (
        <div
          className={styles.zoomAndPanLabels}
          style={{
            left: yAxesAt === 'left' ? (divStyle.left) + 5 : 5,
            top: xAxisAt === 'top' ? (divStyle.top) + 5 : 5,
          }}
        >
          <Button bsStyle="danger" bsSize="xs" onClick={this.props.resetPanAndZoom}>Reset all</Button>
        </div>
      );
    }

    return null;
  }
}
