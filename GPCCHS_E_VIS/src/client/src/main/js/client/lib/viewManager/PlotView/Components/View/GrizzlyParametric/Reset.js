import React, { PropTypes } from 'react';
import _memoize from 'lodash/memoize';
import { Button } from 'react-bootstrap';
import styles from './GrizzlyChart.css';
import { axisType } from './types';

const { shape, string, func, bool, arrayOf } = PropTypes;

export default class Reset extends React.Component {
  static propTypes = {
    divStyle: shape().isRequired,
    multiple: bool,
    yAxesAt: string,
    xAxisAt: string,
    yAxesUniq: arrayOf(axisType.isRequired).isRequired,
    xAxesUniq: arrayOf(axisType.isRequired).isRequired,
    resetPan: func.isRequired,
    resetZoomLevel: func.isRequired,
    resetPanAndZoom: func.isRequired,
    zoomLevels: shape().isRequired,
    pans: shape().isRequired,
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
