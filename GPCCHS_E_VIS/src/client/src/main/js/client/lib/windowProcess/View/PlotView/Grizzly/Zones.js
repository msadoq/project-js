import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import styles from './GrizzlyChart.css';

export default class Zones extends Component {

  static propTypes = {
    yAxes: PropTypes.arrayOf(
      PropTypes.shape
    ).isRequired,
    yAxisWidth: PropTypes.number.isRequired,
    xAxisHeight: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    ctrlPressed: PropTypes.bool.isRequired,
    yAxesAt: PropTypes.string.isRequired,
    xAxisAt: PropTypes.string.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;
    ['yAxesAt', 'xAxisAt', 'width', 'height', 'ctrlPressed'].forEach((attr) => {
      if (nextProps[attr] !== this.props[attr]) {
        shouldRender = true;
      }
    });
    if (nextProps.yAxes.length !== this.props.yAxes.length) {
      shouldRender = true;
    }
    return shouldRender;
  }

  render() {
    const {
      width,
      height,
      yAxes,
      yAxesAt,
      xAxisAt,
      yAxisWidth,
      xAxisHeight,
      ctrlPressed,
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
          top: xAxisAt === 'top' ? xAxisHeight : 0,
        }}
      >
        {yAxesAt === 'left' && yAxes.map((axis, index) =>
          <div
            className={styles.ZonesAxis}
            key={axis.id}
            style={{
              width: yAxisWidth,
              left: ((yAxes.length - 1) * yAxisWidth) - (index * yAxisWidth),
            }}
          />
        )}
        {yAxesAt === 'left' && <div
          className={styles.ZonesChart}
          style={{
            width: width - (yAxes.length * yAxisWidth),
            right: 0,
          }}
        />}
        {yAxesAt === 'right' && yAxes.map((axis, index) =>
          <div
            className={styles.ZonesAxis}
            key={axis.id}
            style={{
              width: yAxisWidth,
              right: ((yAxes.length - 1) * yAxisWidth) - (index * yAxisWidth),
            }}
          />
        )}
        {yAxesAt === 'right' && <div
          className={styles.ZonesChart}
          style={{
            width: width - (yAxes.length * yAxisWidth),
            left: 0,
          }}
        />}
        {!yAxesAt && <div
          className={styles.ZonesChart}
          style={{
            width,
            left: 0,
          }}
        />}
      </div>
    );
  }
}
