// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6829 : 30/06/2017 : Grizzly parametric first draft 1.0
// VERSION : 1.1.2 : DM : #6829 : 04/07/2017 : Few tooltip revisions + Zones.
// VERSION : 1.1.2 : DM : #6830 : 25/07/2017 : Parametric PlotView : logarithmic axes available.
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
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
    shiftPressed: PropTypes.bool.isRequired,
    lassoing: PropTypes.bool.isRequired,
    lassoX: PropTypes.number,
    lassoY: PropTypes.number,
    lassoOriginX: PropTypes.number,
    lassoOriginY: PropTypes.number,
    yAxesAt: PropTypes.string.isRequired,
    xAxesAt: PropTypes.string.isRequired,
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
          top: xAxesAt === 'top' ? xAxisHeight : 0,
        }}
      >
        { /*
          Y Axes area
        */ }
        {yAxesInteractive && !shiftPressed && yAxesAt === 'left' && yAxes.map((axis, index) =>
          <div
            className={classnames(styles.ZonesYAxis, styles.ZonesAxis)}
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
