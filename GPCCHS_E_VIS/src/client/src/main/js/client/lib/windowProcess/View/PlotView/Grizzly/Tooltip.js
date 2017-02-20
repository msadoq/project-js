import React, { PropTypes } from 'react';
import { scaleLinear } from 'd3-scale';
import _sum from 'lodash/sum';
import styles from './GrizzlyChart.css';

export default class Tooltip extends React.Component {

  static propTypes = {
    yAxes: PropTypes.arrayOf(
      PropTypes.shape
    ).isRequired,
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
    yAxes.forEach(axis => this.setYScale(axis.id, axis.yExtends, height));
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
        axis.yExtends[0] !== this.props.yAxes[i].yExtends[0] ||
        axis.yExtends[1] !== this.props.yAxes[i].yExtends[1]
      ) {
        shouldRender = true;
        this.setYScale(axis.id, axis.yExtends, nextProps.height);
      }
    });

    ['yAxesAt', 'top', 'height', 'margin', 'width', 'xScale'].forEach((attr) => {
      if (nextProps[attr] !== this.props[attr]) {
        shouldRender = true;
      }
    });

    return shouldRender;
  }

  setYScale = (axisId, yExtends, height) => {
    this.yScales[axisId] = scaleLinear()
      .domain([yExtends[0], yExtends[1]])
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
      const data = axis.lines[0].data;
      const xClosestPacket = data.find(packet => packet.x > xInDomain);
      if (!xClosestPacket) {
        return;
      }
      axis.lines.forEach((line) => {
        if (xClosestPacket[line.id]) {
          const val = xClosestPacket[line.id].value;
          linesList[axis.id].push({
            color: line.fill,
            name: line.id,
            value: val.toLocaleString('en-US', { minimumFractionDigits: 2 }),
          });
        }
      });
    });

    this.setState({
      showTooltip: true,
      linesList,
      xInRange,
      yInRange,
      tooltipOnRight: xInRange > (this.el.clientWidth / 2),
      tooltipOnBottom: yInRange > (this.el.clientHeight / 2),
    });
  }

  tooltipWidth = 300;

  render() {
    const {
      height,
      width,
      yAxesAt,
      top,
      margin,
    } = this.props;
    const {
      showTooltip,
      linesList,
      xInRange,
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
        (_sum(Object.values(linesList).map(a => a.length)) * 19)
        + (Object.values(linesList).length * 26)
        :
        0;
    tooltipStyle.minHeight = tooltiLinesToDisplay ? Object.values(linesList).length * 55 : 55;
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
        className={styles.tooltipCanvas}
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
            className={styles.tooltip}
            style={tooltipStyle}
          >
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
                      <div key={line.name} >
                        <span
                          className={styles.tooltipLineSquare}
                          style={{ background: line.color }}
                        />
                        <span
                          className={styles.tooltipLineName}
                        >
                          { line.name } :
                        </span>
                        <span
                          className={styles.tooltipLineValue}
                        >
                          { line.value }
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
