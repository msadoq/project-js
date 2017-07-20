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
    margin: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    yAxisWidth: PropTypes.number.isRequired,
    xScale: PropTypes.func.isRequired,
    yAxesAt: PropTypes.string.isRequired,
    xAxisAt: PropTypes.string.isRequired,
    current: PropTypes.number.isRequired,
    parametric: PropTypes.bool.isRequired,
    xFormat: PropTypes.string.isRequired,
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
        const dataLine = (line.dataAccessor && axis.data) ?
          axis.data[line.dataAccessor] : line.data;
        if (!dataLine) {
          return;
        }
        const index = _sortedIndexBy(dataLine, { x: xInDomain }, o => o.x);
        if (!index) {
          return;
        }
        const xClosestPacket = dataLine[index];
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
      top,
      margin,
      tooltipColor,
      yAxes,
      yAxisWidth,
      xAxisAt,
      parametric,
      xFormat,
    } = this.props;
    const {
      showTooltip,
      linesList,
      xInRange,
      xInDomain,
      yInRange,
      tooltipOnRight,
      tooltipOnBottom,
    } = this.pseudoState;

    const style = {};
    // horizontal position
    if (yAxesAt === 'left') {
      style.left = margin;
    } else if (yAxesAt === 'right') {
      style.right = margin;
    }
      // vertical position
    style.top = top;
    style.width = width;
    style.height = height;

    const tooltiLinesToDisplay = linesList && Object.values(linesList).length;
    const tooltipStyle = { width: this.tooltipWidth };
    tooltipStyle.opacity = showTooltip ? 1 : 0;
    tooltipStyle.height = tooltiLinesToDisplay ?
        (_sum(Object.values(linesList).map(a => a.length)) * 21)
          + (Object.values(linesList).length * 26)
          + 30
        :
        0;
    tooltipStyle.minHeight = tooltiLinesToDisplay ?
      30 + (Object.values(linesList).length * 55) : 55;
    tooltipStyle.transform = '';
    if (tooltipOnRight) {
      tooltipStyle.left = (xInRange - this.tooltipWidth) - 8;
    } else {
      tooltipStyle.left = xInRange + 8;
    }
    if (tooltipOnBottom) {
      tooltipStyle.top = (yInRange - tooltipStyle.height) - 16;
    } else {
      tooltipStyle.top = yInRange + 8;
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
        style={style}
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
              parametric ?
              this.memoizeXFormatter(xFormat)(xInDomain) : this.timeFormat(new Date(xInDomain))
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
              <h5>{this.timeFormat(new Date(xInDomain))}</h5>
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
