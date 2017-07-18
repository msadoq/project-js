import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import styles from './GrizzlyChart.css';

export default class Zones extends Component {

  static propTypes = {
    yAxes: PropTypes.arrayOf(
      PropTypes.shape
    ).isRequired,
    xAxes: PropTypes.arrayOf(
      PropTypes.shape
    ).isRequired,
    yAxisWidth: PropTypes.number.isRequired,
    xAxisHeight: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    yAxesInteractive: PropTypes.bool.isRequired,
    xAxesInteractive: PropTypes.bool.isRequired,
    ctrlPressed: PropTypes.bool.isRequired,
    yAxesAt: PropTypes.string.isRequired,
    xAxesAt: PropTypes.string.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;
    ['yAxesAt', 'xAxesAt', 'width', 'height', 'ctrlPressed'].forEach((attr) => {
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
      ctrlPressed,
      yAxesInteractive,
      xAxesInteractive,
    } = this.props;

    return (
      <div
        className={classnames(
          styles.Zones,
          {
            hidden: !ctrlPressed,
          }
        )}
        style={{
          width,
          height,
          top: xAxesAt === 'top' ? xAxisHeight : 0,
        }}
      >
        { /*
          Y Axes area
        */ }
        {yAxesInteractive && yAxesAt === 'left' && yAxes.map((axis, index) =>
          <div
            className={classnames(styles.ZonesYAxis, {
              [styles.ZonesAxisLog]: axis.logarithmic,
              [styles.ZonesAxis]: !axis.logarithmic,
            })}
            key={axis.id}
            style={{
              width: yAxisWidth,
              height: height - (xAxes.length * xAxisHeight),
              top: xAxesAt === 'top' ? (xAxes.length - 1) * xAxisHeight : 0,
              left: ((yAxes.length - 1) * yAxisWidth) - (index * yAxisWidth),
            }}
          />
        )}
        {yAxesInteractive && yAxesAt === 'right' && yAxes.map((axis, index) =>
          <div
            className={classnames(styles.ZonesYAxis, {
              [styles.ZonesAxisLog]: axis.logarithmic,
              [styles.ZonesAxis]: !axis.logarithmic,
            })}
            key={axis.id}
            style={{
              width: yAxisWidth,
              height: height - (xAxes.length * xAxisHeight),
              top: xAxesAt === 'top' ? (xAxes.length - 1) * xAxisHeight : 0,
              right: ((yAxes.length - 1) * yAxisWidth) - (index * yAxisWidth),
            }}
          />
        )}
        {xAxesInteractive && xAxesAt === 'top' && xAxes.map((axis, index) =>
          <div
            className={classnames(styles.ZonesXAxis, {
              [styles.ZonesAxisLog]: axis.logarithmic,
              [styles.ZonesAxis]: !axis.logarithmic,
            })}
            key={axis.id}
            style={{
              height: xAxisHeight,
              width: width - ((xAxes.length - 1) * yAxisWidth),
              left: yAxesAt === 'left' ? yAxes.length * yAxisWidth : 0,
              top: (yAxes.length - index - 1) * xAxisHeight,
            }}
          />
        )}
        {xAxesInteractive && xAxesAt === 'bottom' && xAxes.map((axis, index) =>
          <div
            className={classnames(styles.ZonesXAxis, {
              [styles.ZonesAxisLog]: axis.logarithmic,
              [styles.ZonesAxis]: !axis.logarithmic,
            })}
            key={axis.id}
            style={{
              height: xAxisHeight,
              width: width - ((xAxes.length - 1) * yAxisWidth),
              left: yAxesAt === 'left' ? yAxes.length * yAxisWidth : 0,
              bottom: (yAxes.length - index - 1) * xAxisHeight,
            }}
          />
        )}
      </div>
    );
  }
}
