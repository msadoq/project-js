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
    chartInteractive: PropTypes.bool.isRequired,
    yAxesInteractive: PropTypes.bool.isRequired,
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
      yAxesInteractive,
      chartInteractive,
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
        { /*
          Y Axes area
        */ }
        {yAxesInteractive && yAxesAt === 'left' && yAxes.map((axis, index) =>
          <div
            className={classnames({
              [styles.ZonesAxisLog]: axis.logarithmic,
              [styles.ZonesAxis]: !axis.logarithmic,
            })}
            key={axis.id}
            style={{
              width: yAxisWidth,
              left: ((yAxes.length - 1) * yAxisWidth) - (index * yAxisWidth),
            }}
          />
        )}
        {yAxesInteractive && yAxesAt === 'right' && yAxes.map((axis, index) =>
          <div
            className={classnames({
              [styles.ZonesAxisLog]: axis.logarithmic,
              [styles.ZonesAxis]: !axis.logarithmic,
            })}
            key={axis.id}
            style={{
              width: yAxisWidth,
              right: ((yAxes.length - 1) * yAxisWidth) - (index * yAxisWidth),
            }}
          />
        )}
        { /*
          Chart area
        */ }
        {chartInteractive && yAxesAt === 'left' && <div
          className={styles.ZonesChart}
          style={{
            width: width - (yAxes.length * yAxisWidth),
            right: 0,
          }}
        />}
        {chartInteractive && yAxesAt === 'right' && <div
          className={styles.ZonesChart}
          style={{
            width: width - (yAxes.length * yAxisWidth),
            left: 0,
          }}
        />}
        {chartInteractive && !yAxesAt && <div
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
