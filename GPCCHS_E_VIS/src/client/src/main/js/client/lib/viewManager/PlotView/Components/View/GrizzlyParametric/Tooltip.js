import React, { PropTypes } from 'react';
import classnames from 'classnames';
import _sum from 'lodash/sum';
import _memoize from 'lodash/memoize';
import _throttle from 'lodash/throttle';
import { timeFormat } from 'd3-time-format';
import { format as d3Format } from 'd3-format';
import { levelsRules, getZoomLevel } from 'windowProcess/common/timeFormats';
import styles from './GrizzlyChart.css';
import { divStyleType } from './types';

const { shape, string, arrayOf, number } = PropTypes;
export default class Tooltip extends React.Component {
  static propTypes = {
    yAxesUniq: arrayOf(
      shape
    ).isRequired,
    xAxesUniq: arrayOf(
      shape
    ).isRequired,
    pairs: shape().isRequired,
    tooltipColor: string.isRequired,
    height: number.isRequired,
    width: number.isRequired,
    yAxisWidth: number.isRequired,
    xAxisHeight: number.isRequired,
    yAxesAt: string.isRequired,
    xAxesAt: string.isRequired,
    divStyle: divStyleType.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    if (!this.pseudoState.showTooltip) {
      return false;
    }

    let shouldRender = false;

    ['yAxesAt', 'top', 'height', 'margin', 'width'].forEach((attr) => {
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
    const {
      divStyle,
    } = this.props;
    const clientX = e.clientX;
    const clientY = e.clientY;
    const x = clientX === null ? this.pseudoState.clientX : clientX;
    const xInRange = x - this.el.getBoundingClientRect().left;
    const y = clientY === null ? this.pseudoState.clientY : clientY;
    const yInRange = y - this.el.getBoundingClientRect().top;
    if (
      yInRange < 0 || yInRange > divStyle.height ||
      xInRange < 0 || xInRange > divStyle.width
    ) {
      this.pseudoState = { showTooltip: false };
      this.forceUpdate();
      return;
    }
    this.throttleFillAndDisplayTooltip(xInRange, yInRange, x, y, true);
  }

  mouseLeave = () => {
    this.pseudoState = { showTooltip: false };
    this.forceUpdate();
  }

  throttleFillAndDisplayTooltip = _throttle(
    (a, b, c, d, e) => this.fillAndDisplayTooltip(a, b, c, d, e),
    40,
    { leading: true, trailing: true }
  );

  fillAndDisplayTooltip = (xInRange, yInRange, x, y, forceRender = false) => {
    const {
      pairs,
    } = this.props;

    const linesList = {};
    const pairKeys = Object.keys(pairs);
    pairKeys.forEach((key) => {
      const pair = pairs[key];
      if (!pair.lines) {
        return;
      }
      const xInDomain = pair.xAxis.scale.invert(xInRange);
      const yInDomain = pair.yAxis.scale.invert(yInRange);
      const xFormat = d3Format(pair.xAxis.format || '.2f');
      const yFormat = d3Format(pair.yAxis.format || '.2f');
      linesList[key] = {};
      for (let i = 0; i < pair.lines.length; i += 1) {
        const line = pair.lines[i];
        const distances = [];
        if (line && line.indexes) {
          for (let j = 0; j < line.indexes.length; j += 1) {
            const distanceX = line.data[line.indexes[j]].x - xInDomain;
            const distanceY = line.data[line.indexes[j]].value - yInDomain;
            const distance = Math.sqrt((distanceX ** 2) + (distanceY ** 2));
            distances.push(distance);
          }

          const minIndex = distances.reduce(
            (iMin, dist, k, arr) => (dist < arr[iMin] ? k : iMin),
            0
          );
          const lineDataAtIndex = line.data[line.indexes[minIndex]];
          const xAtIndex = line.xAccessor ? line.xAccessor(lineDataAtIndex) : lineDataAtIndex.x;
          const yAtIndex = line.yAccessor ? line.yAccessor(lineDataAtIndex) : lineDataAtIndex.value;

          linesList[key][line.id] = {
            ...line.data[minIndex],
            x: line.xTooltipAccessor ? line.xTooltipAccessor(lineDataAtIndex) : xFormat(xAtIndex),
            y: line.yTooltipAccessor ? line.yTooltipAccessor(lineDataAtIndex) : yFormat(yAtIndex),
            xInRange: pair.xAxis.scale(xAtIndex),
            yInRange: pair.yAxis.scale(yAtIndex),
            foundColor: line.colorAccessor ? lineDataAtIndex[line.colorAccessor] : null,
            lineColor: line.fill || '#222222',
            id: line.id,
          };
        }
      }
    });

    const futureState = {
      showTooltip: true,
      linesList,
      // xInDomain,
      xInRange,
      yInRange,
      tooltipOnRight: xInRange > (this.el.clientWidth / 2),
      tooltipOnBottom: yInRange > (this.el.clientHeight / 2),
      clientX: x,
      clientY: y,
    };

    this.pseudoState = futureState;

    if (forceRender) {
      this.forceUpdate();
    }
  }

  memoizeFormatter = _memoize((ms, formatAsDate, format) => {
    if (formatAsDate) {
      const zoomLevel = getZoomLevel(ms);
      const levelRule = levelsRules[zoomLevel];
      return timeFormat(levelRule.formatD3);
    }
    return d => d3Format(format)(d);
  });

  timeFormat = timeFormat('%Y-%m-%d %H:%M:%S.%L')

  tooltipWidth = 350;

  render() {
    const {
      height,
      width,
      yAxesAt,
      xAxesAt,
      tooltipColor,
      yAxesUniq,
      xAxesUniq,
      yAxisWidth,
      xAxisHeight,
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

    if (this.pseudoState.showTooltip) {
      this.fillAndDisplayTooltip(null, null, null, null, false);
    }
    if (!this.axesFormatters) {
      this.axesFormatters = {};
    }

    const tooltiLinesToDisplay = linesList && Object.values(linesList).length;
    const tooltipStyle = { width: this.tooltipWidth };
    tooltipStyle.opacity = showTooltip ? 1 : 0;
    const pairs = tooltiLinesToDisplay && Object.values(linesList);
    tooltipStyle.height = tooltiLinesToDisplay ?
      (_sum(pairs.map(a => Object.keys(a).length)) * 21)
        + (Object.keys(linesList).length * 26)
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
          tooltiLinesToDisplay &&
          <span
            className={styles.tooltipCircle}
            style={{
              opacity: showTooltip ? 1 : 0,
              left: xInRange,
              top: yInRange,
            }}
          />
        }
        {
          ['left', 'right'].includes(yAxesAt) && yAxesUniq.map((axis, index) => {
            const yLabelStyle = {};
            if (!this.axesFormatters[axis.id]) {
              this.axesFormatters[`${axis.id}-y`] = this.memoizeFormatter(
                axis.extents[1] - axis.extents[0],
                axis.formatAsDate,
                axis.format || '.2f'
              );
            }
            if (yAxesAt === 'left') {
              yLabelStyle.left = ((index * yAxisWidth) * -1) - 8;
              yLabelStyle.transform = 'translate(-100%, -50%)';
            } else {
              yLabelStyle.right = ((index * yAxisWidth) * -1) - 8;
              yLabelStyle.transform = 'translate(100%, -50%)';
            }
            return (
              <span
                key={`Y-label-${axis.id}`}
                className={classnames('label', styles.tooltipYLabel)}
                style={{
                  opacity: showTooltip ? 1 : 0,
                  ...yLabelStyle,
                  top: yInRange,
                }}
              >
                {this.axesFormatters[`${axis.id}-y`](axis.scale.invert(yInRange))}
              </span>
            );
          })
        }
        {
          ['top', 'bottom'].includes(xAxesAt) && xAxesUniq.map((axis, index) => {
            if (!this.axesFormatters[axis.id]) {
              this.axesFormatters[`${axis.id}-x`] = this.memoizeFormatter(
                axis.extents[1] - axis.extents[0],
                axis.formatAsDate,
                axis.format || '.2f'
              );
            }
            const xLabelStyle = {};
            if (xAxesAt === 'top') {
              xLabelStyle.top = (index * xAxisHeight * -1) - 8;
              xLabelStyle.transform = 'translate(-50%, -100%)';
            } else {
              xLabelStyle.top = height + ((xAxesUniq.length - index - 1) * xAxisHeight) + 8;
              xLabelStyle.transform = 'translate(-50%, 0%)';
            }
            return (
              <span
                key={`X-label-${axis.id}`}
                className={classnames('label', styles.tooltipXLabel)}
                style={{
                  opacity: showTooltip ? 1 : 0,
                  ...xLabelStyle,
                  left: xInRange,
                }}
              >
                {this.axesFormatters[`${axis.id}-x`](axis.scale.invert(xInRange))}
              </span>
            );
          })
        }
        {
          tooltiLinesToDisplay &&
          Object.keys(linesList).map((pairId) => {
            const lineIds = Object.keys(linesList[pairId]);
            return (
              lineIds.map(lineId =>
                <span
                  key={`${pairId}-${lineId}`}
                  className={styles.tooltipLinePoint}
                  style={{
                    background: linesList[pairId][lineId].lineColor,
                    left: linesList[pairId][lineId].xInRange,
                    top: linesList[pairId][lineId].yInRange,
                  }}
                />
              )
            );
          })
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
              <h5>{this.timeFormat(new Date(xInDomain))}</h5>
            }
            {
              Object.keys(linesList).map((pairId) => {
                const lineIds = Object.keys(linesList[pairId]);
                return (
                  <div key={pairId} >
                    <h5 className={styles.tooltipAxisLabel} >
                      {pairId}
                    </h5>
                    {
                      Object.keys(linesList[pairId]).length === 0 &&
                      <p className={styles.tooltipNoData}>No data</p>
                    }
                    {
                      lineIds.map((lineId) => {
                        const line = linesList[pairId][lineId];
                        return (
                          <div
                            key={line.id}
                            className={styles.tooltipLine}
                          >
                            <span
                              className={styles.tooltipLineSquare}
                              style={{ background: line.foundColor || line.lineColor }}
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
                                X : { line.x } Y : { line.y }
                              </span>
                            </p>
                          </div>
                        );
                      })
                    }
                  </div>
                );
              })
            }
          </div>
        }
      </div>
    );
  }
}
