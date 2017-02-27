import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { scaleLinear } from 'd3-scale';
import _sum from 'lodash/sum';
import { timeFormat } from 'd3-time-format';
import { formatDuration } from '../../../common/timeFormats';
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
    xScale: PropTypes.func.isRequired,
    yAxesAt: PropTypes.string.isRequired,
  }

  state = {
    showTooltip: false,
  }

  componentDidMount() {
    const { yAxes, height } = this.props;
    this.yScales = {};
    yAxes.forEach(axis => this.setYScale(axis.id, axis.yExtents, height));
  }

  shouldComponentUpdate(nextProps, nextState) {
    // SCU has been called by internal this.setState
    if (nextState.linesList) {
      return true;
    }

    let shouldRender = false;
    nextProps.yAxes.forEach((axis, i) => {
      if (
        !this.yScales[axis.id] ||
        nextProps.height !== this.props.height ||
        axis.yExtents[0] !== this.props.yAxes[i].yExtents[0] ||
        axis.yExtents[1] !== this.props.yAxes[i].yExtents[1]
      ) {
        shouldRender = true;
        this.setYScale(axis.id, axis.yExtents, nextProps.height);
      }
    });

    ['yAxesAt', 'top', 'height', 'margin', 'width', 'xScale'].forEach((attr) => {
      if (nextProps[attr] !== this.props[attr]) {
        shouldRender = true;
      }
    });

    return shouldRender;
  }

  setYScale = (axisId, yExtents, height) => {
    this.yScales[axisId] = scaleLinear()
      .domain([yExtents[0], yExtents[1]])
      .range([0, height]);
  }

  assignEl = (el) => { this.el = el; }

  mouseMove = (e) => {
    this.fillAndDisplayTooltip(e);
  }

  mouseLeave = () => {
    this.setState({ showTooltip: false });
  }

  fillAndDisplayTooltip = (e) => {
    const {
      yAxes,
      xScale,
    } = this.props;
    const xInRange = e.clientX - this.el.getBoundingClientRect().left;
    const yInRange = e.clientY - this.el.getBoundingClientRect().top;
    const xInDomain = xScale.invert(xInRange);
    const linesList = {};
    yAxes.forEach((axis) => {
      linesList[axis.id] = [];
      // const yInDomain = this.yScales[axis.id].invert(yInRange);

      const xClosestPacket = axis.data.find(packet => packet.x > xInDomain);
      if (!xClosestPacket) {
        return;
      }
      axis.lines.forEach((line) => {
        if (xClosestPacket[line.id]) {
          const val = line.yAccessor(xClosestPacket);
          const color = line.colorAccessor ?
            line.colorAccessor(xClosestPacket) || line.fill : line.fill;
          linesList[axis.id].push({
            color,
            epColor: line.fill,
            name: line.id,
            value: val ? val.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '',
            offset: xClosestPacket[line.id].x !== xClosestPacket.x ?
              formatDuration(xClosestPacket.x - xClosestPacket[line.id].x) : '',
          });
        }
      });
    });

    this.setState({
      showTooltip: true,
      linesList,
      xInDomain,
      xInRange,
      yInRange,
      tooltipOnRight: xInRange > (this.el.clientWidth / 2),
      tooltipOnBottom: yInRange > (this.el.clientHeight / 2),
    });
  }

  timeFormat = timeFormat('%Y-%m-%d %H:%M:%S.%L')

  tooltipWidth = 350;

  render() {
    const {
      height,
      width,
      yAxesAt,
      top,
      margin,
      tooltipColor,
    } = this.props;
    const {
      showTooltip,
      linesList,
      xInRange,
      xInDomain,
      yInRange,
      tooltipOnRight,
      tooltipOnBottom,
    } = this.state;

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
    tooltipStyle.top = yInRange + 8;
    tooltipStyle.left = xInRange + 8;
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
    }
    if (tooltipOnBottom) {
      tooltipStyle.top = (yInRange - tooltipStyle.height) - 8;
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
                    linesList[axisId].map(line =>
                      <div
                        key={line.name}
                        className={styles.tooltipLine}
                      >
                        <span
                          className={styles.tooltipLineSquare}
                          style={{ background: line.color }}
                        />
                        <p>
                          <span
                            className={styles.tooltipLineName}
                            style={{
                              color: line.epColor,
                            }}
                          >
                            { line.name } :
                          </span>
                          <span
                            className={styles.tooltipLineValue}
                          >
                            { line.value }
                          </span>
                        </p>
                        <span
                          className={classnames(
                            styles.tooltipOffset,
                            {
                              [styles.red]: line.offset[0] === '-',
                              [styles.green]: line.offset[0] && line.offset[0] !== '-',
                            }
                          )}
                        >
                          {' '}{ line.offset }
                        </span>
                      </div>
                    )
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
