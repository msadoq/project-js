import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import _memoize from 'lodash/memoize';
import { select } from 'd3-selection';
import { range } from 'd3-array';
import { format as d3Format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import { axisBottom, axisTop } from 'd3-axis';
import { getZoomLevel, levelsRules } from '../../../../../windowProcess/common/timeFormats';
import styles from './GrizzlyChart.css';
import Axis from './Axis';
import { lineType, labelStyleType } from './types';

const { string, func, bool, arrayOf, number } = PropTypes;

export default class XAxis extends Component {
  static propTypes = {
    getLabelPosition: func.isRequired,
    axisId: string.isRequired,
    xAxesAt: string,
    yAxesAt: string,
    logarithmic: bool,
    index: number.isRequired,
    scale: func.isRequired,
    extents: arrayOf(number).isRequired,
    side: number.isRequired,
    height: number.isRequired,
    xAxisHeight: number.isRequired,
    margin: number.isRequired,
    chartWidth: number.isRequired,
    lines: arrayOf(lineType.isRequired).isRequired,
    showLabels: bool,
    showTicks: bool,
    autoTick: bool,
    tickStep: number,
    showGrid: bool,
    gridStyle: string,
    gridSize: number,
    label: string.isRequired,
    format: string,
    formatAsDate: bool,
    labelStyle: labelStyleType.isRequired,
    yAxisWidth: number.isRequired,
  };

  static defaultProps = {
    logarithmic: false,
    showLabels: false,
    showTicks: true,
    showGrid: true,
    gridStyle: 'Continuous',
    xAxesAt: 'bottom',
    format: '.2f',
    yAxesAt: 'left',
    gridSize: 1,
    tickStep: 8,
    autoTick: false,
    labelStyle: {
      color: '#333333',
      bgColor: '#FFFFFF',
      align: 'center',
      font: 'Arial',
      italic: false,
      bold: false,
      underline: false,
      size: 11,
    },
    formatAsDate: false,
  };

  componentDidMount() {
    this.draw();
    this.drawLabel();
    this.drawLinesLabel();
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;
    const attrs = ['yAxesAt', 'top', 'height', 'yAxisWidth', 'margin', 'chartWidth',
      'scale', 'autoTick', 'tickStep', 'format', 'gridStyle', 'gridSize'];
    for (let i = 0; i < attrs.length; i += 1) {
      if (nextProps[attrs[i]] !== this.props[attrs[i]]) {
        shouldRender = true;
      }
    }

    const linesIds = nextProps.lines.map(l => l.id).join('-');
    if (!this.linesIds || linesIds !== this.linesIds) {
      shouldRender = true;
    }
    this.linesIds = linesIds;

    // update line label refs's style attribute
    if (!shouldRender) {
      this.drawLinesLabel();
    }

    return shouldRender;
  }

  componentDidUpdate() {
    this.draw();
    this.drawLabel();
    this.drawLinesLabel();
  }

  ticksXOffset = 8;

  memoizeTickFormat= _memoize(
    (ms) => {
      const zoomLevel = getZoomLevel(ms);
      const levelRule = levelsRules[zoomLevel];
      return timeFormat(levelRule.formatD3);
    }
  );

  axisDidDraw = () => {
    const {
      gridSize,
    } = this.props;
    select(this.svgAxisEl).selectAll('line').attr('stroke-width', gridSize);
  };

  drawLinesLabel = () => {
    const {
      lines,
      axisId,
      getLabelPosition,
      showLabels,
    } = this.props;
    if (!showLabels || !lines) {
      return;
    }

    const positions = getLabelPosition(axisId);
    lines.forEach((line) => {
      const el = this[`label-${line.id}-el`];
      this.drawLineLabel(line, positions, el);
    });
  };

  /**
   * @param line
   * @param positions
   * @param el
   */
  drawLineLabel = (line, positions, el) => {
    const {
      height,
      index,
      xAxesAt,
    } = this.props;

    let linePosition = positions.find(pos => typeof pos[line.id] !== 'undefined');
    linePosition = linePosition ? linePosition[line.id] : null;
    if (!linePosition || (linePosition.x === null && el)) {
      el.setAttribute('style', 'display:none;');
    } else if (el) {
      let style = `background:${line.fill || '#222222'};left:${linePosition.x}px;`;
      if (xAxesAt === 'top') {
        style += `transform: translate(-50%, 0%);top: ${8}px;`;
      } else {
        style += `transform: translate(-50%, 0%);top: ${index === 0 ? height : 0}px;`;
      }
      el.setAttribute('style', style);
    }
  };

  drawLabel = () => {
    const {
      labelStyle,
      height,
      index,
      xAxesAt,
    } = this.props;

    let style = 'position:absolute;';
    let transform = '';
    style += `font-size:${labelStyle.size}px;`;
    style += `font-family:${labelStyle.font};`;
    style += `color:${labelStyle.color};`;
    style += `background:${labelStyle.bgColor};`;
    if (xAxesAt === 'bottom') {
      if (index === 0) {
        style += `top: ${height}px;`;
      }
      transform += 'transform: translate(-50%, 19px)';
    } else {
      transform += 'transform: translate(-50%, 0px)';
    }
    if (labelStyle.align === 'left') {
      style += 'left: 20px;';
    } else if (labelStyle.align === 'right') {
      style += 'right: 20px;';
    } else if (labelStyle.align === 'center') {
      style += `left: ${height / 2}px;`;
    }
    transform += ';';
    this.labelEl.setAttribute('style', `${style};${transform}`);
  };

  draw = () => {
    const {
      scale,
      xAxisHeight,
      height,
      index,
      showTicks,
      tickStep,
      autoTick,
      format,
      showGrid,
      gridStyle,
      xAxesAt,
      logarithmic,
      extents,
      formatAsDate,
    } = this.props;

    let tickFormat = () => null;
    if (showTicks) {
      if (formatAsDate) {
        tickFormat = this.memoizeTickFormat(extents[1] - extents[0]);
      } else {
        tickFormat = this.memoizeFormatter(format);
      }
    }

    // if showGrid & master axis, axis must be wider
    const tickSize = index === 0 && showGrid ?
      height + this.ticksXOffset : this.ticksXOffset;

    let translateY;
    if (xAxesAt === 'top') {
      translateY = index === 0 && showGrid ?
        (height + xAxisHeight) : xAxisHeight;
    } else {
      translateY = index === 0 && showGrid ?
        -1 : 0;
    }

    let yAxisFunction;
    if (xAxesAt === 'top') {
      yAxisFunction = axisTop(scale);
    } else {
      yAxisFunction = axisBottom(scale);
    }

    if (logarithmic) {
      yAxisFunction = yAxisFunction
        .ticks(8);
    } else if (autoTick) {
      yAxisFunction = yAxisFunction
        .ticks(8);
    } else {
      const offset = extents[1] % tickStep;
      const tickValues = this.memoizeRange(
        `${extents[0]}-${extents[1]}-${tickStep}-${offset}`,
        (extents[0] - offset) + tickStep,
        (extents[1] - offset) + tickStep,
        tickStep
      );
      yAxisFunction = yAxisFunction
        .tickValues(tickValues);
    }

    yAxisFunction = yAxisFunction
      .tickSize(tickSize)
      .tickFormat(logarithmic ? d => d : tickFormat);

    let gStyle = '';
    if (xAxesAt === 'top') {
      gStyle += `transform: translate(0px, ${translateY}px);`;
    } else {
      gStyle += `transform: translate(0px, ${translateY}px);`;
    }

    this.svgAxisEl.innerHTML = '';
    const svgGroup = select(this.svgAxisEl)
      .append('g')
      .attr('style', gStyle)
      .attr('class', classnames(
        styles.xAxisGroup,
        {
          [styles[gridStyle]]: index === 0 && showGrid,
        }
      ));

    yAxisFunction(svgGroup);
    this.axisDidDraw();
  };

  assignEl = (el) => { this.svgAxisEl = el; };
  assignLabelEl = (el) => { this.labelEl = el; };

  memoizeFormatter = _memoize(f =>
    d => d3Format(f)(d)
  );

  memoizeRange = _memoize((hash, lower, upper, step) =>
    range(lower, upper, step)
  );

  memoizeAssignRef = _memoize(lineId =>
    (el) => { this[`label-${lineId}-el`] = el; }
  );

  render() {
    const {
      lines,
      showLabels,
      label,
      height,
      xAxisHeight,
      index,
      showGrid,
      chartWidth,
      yAxisWidth,
      labelStyle,
      margin,
      yAxesAt,
      xAxesAt,
      side,
    } = this.props;

    return (
      <Axis
        direction="horizontal"
        lines={lines}
        showLabels={showLabels}
        label={label}
        height={height}
        xAxisHeight={xAxisHeight}
        index={index}
        showGrid={showGrid}
        chartWidth={chartWidth}
        yAxisWidth={yAxisWidth}
        labelStyle={labelStyle}
        margin={margin}
        yAxesAt={yAxesAt}
        xAxesAt={xAxesAt}
        side={side}
        assignLabelEl={this.assignLabelEl}
        assignEl={this.assignEl}
        memoizeAssignRef={this.memoizeAssignRef}
      />
    );
  }
}
