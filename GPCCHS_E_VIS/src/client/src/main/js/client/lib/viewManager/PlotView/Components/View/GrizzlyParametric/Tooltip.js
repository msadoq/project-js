import React, { PropTypes } from 'react';
import classnames from 'classnames';
import _sum from 'lodash/sum';
import _memoize from 'lodash/memoize';
import { timeFormat } from 'd3-time-format';
import { format as d3Format } from 'd3-format';
import styles from './GrizzlyChart.css';

export default class Tooltip extends React.Component {

  static propTypes = {
    yAxesUniq: PropTypes.arrayOf(
      PropTypes.shape
    ).isRequired,
    xAxesUniq: PropTypes.arrayOf(
      PropTypes.shape
    ).isRequired,
    pairs: PropTypes.shape().isRequired,
    tooltipColor: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    yAxisWidth: PropTypes.number.isRequired,
    xAxisHeight: PropTypes.number.isRequired,
    yAxesAt: PropTypes.string.isRequired,
    xAxesAt: PropTypes.string.isRequired,
    divStyle: PropTypes.shape().isRequired,
  }

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
    this.fillAndDisplayTooltip(e, true);
  }

  mouseLeave = () => {
    this.pseudoState = { showTooltip: false };
    this.forceUpdate();
  }

  fillAndDisplayTooltip = (e, forceRender = false) => {
    const {
      pairs,
    } = this.props;

    const y = e ? e.clientY : this.pseudoState.clientY;
    const yInRange = y - this.el.getBoundingClientRect().top;
    const x = e ? e.clientX : this.pseudoState.clientX;
    const xInRange = x - this.el.getBoundingClientRect().left;
    const linesList = {};
    const pairKeys = Object.keys(pairs);
    pairKeys.forEach((key) => {
      const pair = pairs[key];
      const xInDomain = pair.xAxis.scale.invert(xInRange);
      const yInDomain = pair.yAxis.scale.invert(yInRange);
      const xFormat = d3Format(pair.xAxis.format || '.2f');
      const yFormat = d3Format(pair.yAxis.format || '.2f');
      linesList[key] = {};
      for (let i = 0; i < pair.lines.length; i += 1) {
        const line = pair.lines[i];
        const distances = [];
        for (let j = 0; j < line.data.length; j += 1) {
          const distanceX = line.data[j].x - xInDomain;
          const distanceY = line.data[j].y - yInDomain;
          distances.push(Math.sqrt((distanceX ** 2) + (distanceY ** 2)));
        }
        const minIndex = distances.reduce(
          (iMin, dist, k, arr) => (dist < arr[iMin] ? k : iMin),
          0
        );
        linesList[key][line.id] = {
          ...line.data[minIndex],
          x: xFormat(line.data[minIndex].x),
          y: yFormat(line.data[minIndex].y),
          xInRange: pair.xAxis.scale(line.data[minIndex].x),
          yInRange: pair.yAxis.scale(line.data[minIndex].y),
          foundColor: line.colorAccessor ? line.colorAccessor(line.data[minIndex]) : null,
          lineColor: line.fill || '#222222',
          id: line.id,
        };
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

  render() {
    if (this.pseudoState.showTooltip) {
      this.fillAndDisplayTooltip(null, false);
    }
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
          ['left', 'right'].includes(yAxesAt) && yAxesUniq.map((axis, index) => {
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
                key={`Y-label-${axis.id}`}
                className={classnames('label', styles.tooltipYLabel)}
                style={{
                  opacity: showTooltip ? 1 : 0,
                  ...yLabelStyle,
                  top: yInRange,
                }}
              >
                {this.memoizeFormatter(axis.format || '.2f')(
                  axis.scale.invert(yInRange)
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
          ['top', 'bottom'].includes(xAxesAt) && xAxesUniq.map((axis, index) => {
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
                {this.memoizeFormatter(axis.format || '.2f')(
                  axis.scale.invert(xInRange)
                )}
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
