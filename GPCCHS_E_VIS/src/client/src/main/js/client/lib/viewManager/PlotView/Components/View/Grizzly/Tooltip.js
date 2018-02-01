// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving DynamicView PlotView and TextView in dataManager.
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Using binary search to determine position of tooltip.
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Format tooltip line function is given in props, and no longer resides in Tooltip.
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Adapting PlotView and Grizzly for the new data structure.
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Fix tooltip renders on every tick. Now doesn't render if showTooltip is false.
// VERSION : 1.1.2 : DM : #6302 : 03/04/2017 : Add comment and fix coding convetions warning and un-needed relaxations
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : Tooltip renders on each ticks. Even if mouse doesn't move.
// VERSION : 1.1.2 : DM : #5828 : 02/05/2017 : PlotView : Tooltip value updates when play and mouse not moving.
// VERSION : 1.1.2 : DM : #6835 : 31/05/2017 : First draft for parametric PlotView, x axis becomes basic axis with numb values.
// VERSION : 1.1.2 : FA : #7185 : 06/07/2017 : Fix lint errors and warnings
// VERSION : 1.1.2 : DM : #6829 : 10/07/2017 : PlotView default yAccessor : .value instead of .y
// VERSION : 1.1.2 : DM : #6835 : 18/07/2017 : PlotView's lines take string instead of function for colorAccessor attribute.
// VERSION : 1.1.2 : DM : #6830 : 20/07/2017 : Carried few changes to Grizzly-PlotView to avoid useless re-renders + removed stuff related to pointLabels.
// VERSION : 1.1.2 : DM : #6830 : 20/07/2017 : Grizzly/PlotView : having only one method on Chart to calculate position styles for ToolTip, LinesCanvas and Background divs.
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : DM : #6835 : 25/08/2017 : No parametric bool prop in Grizzly, there is a dedicated GrizzlyParametric. Curves must be above grid.
// VERSION : 1.1.2 : DM : #6835 : 28/08/2017 : PlotView is never parametric, fixed positionned tooltip in Parametric and PlotView.
// VERSION : 1.1.2 : DM : #6835 : 08/09/2017 : Simplified style for canvas divs and tooltip divs, calculated only once in main Chart component.
// VERSION : 1.1.2 : FA : #7776 : 13/09/2017 : update of plot view tooltip
// VERSION : 1.1.2 : FA : #7776 : 13/09/2017 : Fix plot drawing when timeline has offset
// VERSION : 1.1.2 : DM : #6835 : 14/09/2017 : On Grizzly and GrizzlyParametric, tooltip goes on right or left, always avoiding hovering cursor.
// VERSION : 1.1.2 : FA : #7814 : 18/09/2017 : Handling data differently in PlotView : using indexes to iterate.
// END-HISTORY
// ====================================================================

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import _sum from 'lodash/sum';
import _memoize from 'lodash/memoize';
import _sortedIndexBy from 'lodash/sortedIndexBy';
import { timeFormat } from 'd3-time-format';
import { format as d3Format } from 'd3-format';
import styles from './GrizzlyChart.css';

export default class Tooltip extends React.Component {

  static propTypes = {
    yAxes: PropTypes.arrayOf(
      PropTypes.shape
    ).isRequired,
    tooltipColor: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    yAxisWidth: PropTypes.number.isRequired,
    xScale: PropTypes.func.isRequired,
    yAxesAt: PropTypes.string.isRequired,
    xAxisAt: PropTypes.string.isRequired,
    current: PropTypes.number.isRequired,
    divStyle: PropTypes.shape().isRequired,
  }

  shouldComponentUpdate(nextProps) {
    if (!this.pseudoState.showTooltip) {
      return false;
    }
    if (nextProps.current !== this.props.current) {
      return true;
    }

    let shouldRender = false;
    nextProps.yAxes.forEach((axis, i) => {
      if (
        nextProps.height !== this.props.height ||
        axis.yExtents[0] !== this.props.yAxes[i].yExtents[0] ||
        axis.yExtents[1] !== this.props.yAxes[i].yExtents[1]
      ) {
        shouldRender = true;
      }
    });

    ['yAxesAt', 'top', 'height', 'margin', 'width', 'xScale'].forEach((attr) => {
      if (nextProps[attr] !== this.props[attr]) {
        shouldRender = true;
      }
    });

    return shouldRender;
  }

  assignEl = (el) => { this.el = el; }

  pseudoState = {
    showTooltip: false,
  }

  memoizeXFormatter = _memoize(f =>
    d => d3Format(f)(d)
  );

  mouseMove = (e) => {
    this.fillAndDisplayTooltip(e, true);
  }

  mouseLeave = () => {
    this.pseudoState = { showTooltip: false };
    this.forceUpdate();
  }

  fillAndDisplayTooltip = (e, forceRender = false) => {
    const {
      yAxes,
      xScale,
    } = this.props;

    const yInRange = (e ? e.clientY : this.pseudoState.clientY) -
      this.el.getBoundingClientRect().top;
    const xInRange = (e ? e.clientX : this.pseudoState.clientX) -
      this.el.getBoundingClientRect().left;
    const xInDomain = xScale.invert(xInRange);

    const linesList = {};

    yAxes.forEach((axis) => {
      linesList[axis.id] = [];

      axis.lines.forEach((line) => {
        const dataIndexes = (line.dataAccessor && axis.indexes) ?
          axis.indexes[line.dataAccessor] : line.indexes;
        const dataLine = (line.dataAccessor && axis.data) ?
          axis.data[line.dataAccessor] : line.data;
        if (!dataLine) {
          return;
        }
        const index = _sortedIndexBy(dataIndexes, xInDomain);
        if (!index) {
          return;
        }
        const xClosestPacket = dataLine[dataIndexes[index]];
        if (xClosestPacket) {
          const val = line.yAccessor ? line.yAccessor(xClosestPacket) : xClosestPacket.value;
          const x = line.xAccessor ? line.xAccessor(xClosestPacket) : xClosestPacket.x;
          linesList[axis.id].push({
            foundColor: line.colorAccessor ? xClosestPacket[line.colorAccessor] : null,
            lineColor: line.fill || '#222222',
            id: line.id,
            value: val,
            x,
            formattedValue: this.memoizeFormatter(axis.format || '.2f')(val),
            packet: xClosestPacket,
            formatter: this.memoizeFormatter(axis.format || '.2f'),
          });
        }
      });
    });

    const futureState = {
      showTooltip: true,
      linesList,
      xInDomain,
      xInRange,
      yInRange,
      tooltipOnRight: xInRange > (this.el.clientWidth / 2),
      tooltipOnBottom: yInRange > (this.el.clientHeight / 2),
      clientX: e ? e.clientX : this.pseudoState.clientX,
      clientY: e ? e.clientY : this.pseudoState.clientY,
    };

    this.pseudoState = futureState;

    if (forceRender) {
      this.forceUpdate();
    }
  }

  memoizeFormatter = _memoize(f =>
    d => d3Format(f)(d)
  );

  timeFormat = timeFormat('%Y-%m-%d %H:%M:%S.%L')

  tooltipWidth = 350;
  // eslint-disable-next-line complexity, "DV6 TBC_CNES Calculate Tooltip position need complexity"
  render() {
    if (this.pseudoState.showTooltip) {
      this.fillAndDisplayTooltip(null, false);
    }
    const {
      height,
      width,
      yAxesAt,
      tooltipColor,
      yAxes,
      yAxisWidth,
      xAxisAt,
      divStyle,
    } = this.props;
    const {
      showTooltip,
      linesList,
      xInRange,
      xInDomain,
      yInRange,
      tooltipOnRight,
    } = this.pseudoState;

    const tooltiLinesToDisplay = linesList && Object.values(linesList).length;
    const tooltipStyle = { width: this.tooltipWidth };
    tooltipStyle.opacity = showTooltip ? 1 : 0;
    tooltipStyle.height = tooltiLinesToDisplay ?
        (_sum(Object.values(linesList).map(a => a.length)) * 35)
          + (Object.values(linesList).length * 26)
          + 30
        :
        0;
    tooltipStyle.minHeight = tooltiLinesToDisplay ?
      30 + (Object.values(linesList).length * 55) : 55;
    tooltipStyle.transform = '';
    tooltipStyle.top = 10;
    if (tooltipOnRight) {
      tooltipStyle.left = 10;
    } else {
      tooltipStyle.right = 10;
    }

    const xLabelStyle = {
      transform: '',
    };
    if (xInRange > width - 64) {
      xLabelStyle.right = 0;
    } else if (xInRange < 64) {
      xLabelStyle.left = 0;
    } else {
      xLabelStyle.left = xInRange;
      xLabelStyle.transform += 'translateX(-50%) ';
    }

    if (xAxisAt === 'bottom') {
      xLabelStyle.bottom = -8;
      xLabelStyle.transform += 'translateY(100%)';
    } else {
      xLabelStyle.top = -8;
      xLabelStyle.transform += 'translateY(-100%)';
    }

    return (
      <div
        onMouseMove={this.mouseMove}
        onMouseLeave={this.mouseLeave}
        ref={this.assignEl}
        className={styles.tooltipDiv}
        style={divStyle}
      >
        {
          tooltiLinesToDisplay &&
          <span
            className={styles.tooltipVerticalCursor}
            style={{
              opacity: showTooltip ? 1 : 0,
              left: xInRange,
              height,
            }}
          />
        }
        {
          ['left', 'right'].includes(yAxesAt) && yAxes.map((axis, index) => {
            const yLabelStyle = {};
            if (yAxesAt === 'left') {
              yLabelStyle.left = ((index * yAxisWidth) * -1) - 8;
              yLabelStyle.transform = 'translate(-100%, -50%)';
            } else {
              yLabelStyle.right = ((index * yAxisWidth) * -1) - 8;
              yLabelStyle.transform = 'translate(100%, -50%)';
            }
            return (
              <span
                key={axis.id}
                className={classnames('label', styles.tooltipYLabel)}
                style={{
                  opacity: showTooltip ? 1 : 0,
                  ...yLabelStyle,
                  top: yInRange,
                }}
              >
                {this.memoizeFormatter(axis.format || '.2f')(
                  axis.yScale.invert(yInRange)
                )}
              </span>
            );
          })
        }
        {
          tooltiLinesToDisplay &&
          <span
            className={styles.tooltipHorizontalCursor}
            style={{
              opacity: showTooltip ? 1 : 0,
              width,
              top: yInRange,
            }}
          />
        }
        {
          <span
            className={classnames('label', styles.tooltipXLabel)}
            style={{
              opacity: showTooltip ? 1 : 0,
              ...xLabelStyle,
            }}
          >
            {
              this.timeFormat(new Date(xInDomain))
            }
          </span>
        }
        {
          tooltiLinesToDisplay &&
          <div
            className={classnames(
              styles.tooltip,
              {
                [styles.tooltipBlack]: tooltipColor === 'black',
                [styles.tooltipBlue]: tooltipColor === 'blue',
              }
            )}
            style={tooltipStyle}
          >
            {
              xInDomain &&
              <h5>Visualization time: {this.timeFormat(new Date(xInDomain))}</h5>
            }
            {
              Object.keys(linesList).map(axisId =>
                <div key={axisId} >
                  <h5 className={styles.tooltipAxisLabel} >
                    Axis {axisId}
                  </h5>
                  {
                    linesList[axisId].length === 0 &&
                    <p className={styles.tooltipNoData}>No data</p>
                  }
                  {
                    linesList[axisId].map((line) => {
                      const propsAxis = yAxes.find(a => a.id === axisId);
                      const propsLine = propsAxis.lines.find(l => l.id === line.id);
                      return (propsLine && propsLine.tooltipFormatter ?
                        propsLine.tooltipFormatter(
                          line.id,
                          line.foundColor,
                          line.lineColor,
                          line.value,
                          line.x,
                          line.formattedValue,
                          line.formatter,
                          line.packet
                        )
                        :
                        (<div
                          key={line.id}
                          className={styles.tooltipLine}
                        >
                          <span
                            className={styles.tooltipLineSquare}
                            style={{ background: line.foundColor }}
                          />
                          <p>
                            <span
                              className={styles.tooltipLineName}
                              style={{
                                color: line.lineColor,
                              }}
                            >
                              { line.id } :
                            </span>
                            <span
                              className={styles.tooltipLineValue}
                            >
                              { line.formattedValue }
                            </span>
                          </p>
                        </div>)
                      );
                    })
                  }
                </div>
              )
            }
          </div>
        }
      </div>
    );
  }
}
