// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving DynamicView PlotView and TextView in dataManager.
// VERSION : 1.1.2 : DM : #6829 : 22/06/2017 : Working logarithmic scale for Y axes on PlotView.
// VERSION : 1.1.2 : DM : #6835 : 14/09/2017 : Added support for alsso functionnality in both Grizzly and GrizzlyParametric. Fixed few bugs. Added a fake PlotViewParametricFake file to test GrizzlyParametric.
// VERSION : 1.1.2 : DM : #6835 : 15/09/2017 : Added defaultProps for new lasso props on Grizzly and GrizzlyParametric.
// END-HISTORY
// ====================================================================

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
    lassoX: PropTypes.number,
    lassoY: PropTypes.number,
    lassoOriginX: PropTypes.number,
    lassoOriginY: PropTypes.number,
    shiftPressed: PropTypes.bool.isRequired,
    lassoing: PropTypes.bool.isRequired,
    divStyle: PropTypes.shape().isRequired,
  }

  static defaultProps = {
    lassoOriginX: 0,
    lassoOriginY: 0,
    lassoX: 0,
    lassoY: 0,
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;
    ['yAxesAt', 'xAxisAt', 'width', 'height', 'ctrlPressed', 'shiftPressed', 'lassoX', 'lassoY'].forEach((attr) => {
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
      divStyle,
      shiftPressed,
      lassoing,
      lassoX,
      lassoY,
      lassoOriginX,
      lassoOriginY,
    } = this.props;

    return (
      <div
        className={classnames(
          styles.Zones,
          {
            hidden: !ctrlPressed && !shiftPressed,
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
        {yAxesInteractive && !shiftPressed && yAxesAt === 'left' && yAxes.map((axis, index) =>
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
        {yAxesInteractive && !shiftPressed && yAxesAt === 'right' && yAxes.map((axis, index) =>
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
        {
          chartInteractive && !shiftPressed &&
          <div
            className={styles.ZonesChart}
            style={divStyle}
          />
        }
        {
          chartInteractive && shiftPressed &&
          <div
            className={styles.ZonesChartLasso}
            style={divStyle}
          />
        }
        {
          chartInteractive && lassoing &&
          <div className={styles.ZonesChartLassoRectangleDiv} style={divStyle}>
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
    );
  }
}
