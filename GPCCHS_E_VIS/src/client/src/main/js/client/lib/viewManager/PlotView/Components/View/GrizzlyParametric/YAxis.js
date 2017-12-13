// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6829 : 30/06/2017 : Grizzly parametric first draft 1.0
// VERSION : 1.1.2 : DM : #6829 : 03/07/2017 : Grizzly Parametric, second draft, X axes top/bottom, Y axes right/left. 1.1
// VERSION : 1.1.2 : DM : #6829 : 04/07/2017 : Grizzly parametric version 1.3 : magnet points.
// VERSION : 1.1.2 : DM : #6829 : 06/07/2017 : Added format X and Y to tooltip. Grizzly Parametric.
// END-HISTORY
// ====================================================================

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import _memoize from 'lodash/memoize';
import { select } from 'd3-selection';
import { range } from 'd3-array';
import { format as d3Format } from 'd3-format';
import { axisLeft, axisRight } from 'd3-axis';
import styles from './GrizzlyChart.css';
import Axis from './Axis';
import { lineType, labelStyleType } from './types';

const { string, func, bool, arrayOf, number } = PropTypes;

export default class YAxis extends Component {
  static propTypes = {
    getLabelPosition: func.isRequired,
    axisId: string.isRequired,
    xAxesAt: string,
    yAxesAt: string,
    logarithmic: bool,
    index: number.isRequired,
    scale: func.isRequired,
    extents: arrayOf(number).isRequired,
    height: number.isRequired,
    yAxisWidth: number.isRequired,
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
    xAxisHeight: number.isRequired,
    side: number.isRequired,
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
      'scale', 'autoTick', 'tickStep', 'format', 'gridStyle', 'gridSize', 'showGrid'];
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
      yAxisWidth,
      yAxesAt,
    } = this.props;

    let linePosition = positions.find(pos => typeof pos[line.id] !== 'undefined');
    linePosition = linePosition ? linePosition[line.id] : null;
    if (!linePosition || (linePosition.y === null && el)) {
      el.setAttribute('style', 'display:none;');
    } else if (el) {
      let style = `background:${line.fill || '#222222'};top:${linePosition.y}px;`;
      if (yAxesAt === 'left') {
        style += `transform: translate(-102%, -50%);left: ${yAxisWidth - 8}px;`;
      } else {
        style += `transform: translate(102%, -50%);right: ${yAxisWidth - 8}px;`;
      }
      el.setAttribute('style', style);
    }
  };

  drawLabel = () => {
    const {
      labelStyle,
      height,
      chartWidth,
      index,
      yAxesAt,
    } = this.props;

    let style = 'position:absolute;';
    let transform = '';
    if (yAxesAt === 'left') {
      transform += 'transform: rotate(90deg)';
      style += 'left: 0px;';
    } else {
      transform += 'transform: rotate(-90deg)';
      if (index === 0) {
        style += `left: ${chartWidth}px;`;
      } else {
        style += 'right: 0px;';
      }
    }
    style += `font-size:${labelStyle.size}px;`;
    style += `font-family:${labelStyle.font};`;
    style += `color:${labelStyle.color};`;
    style += `background:${labelStyle.bgColor};`;
    if (labelStyle.align === 'left') {
      style += 'top: 20px;';
    } else if (labelStyle.align === 'right') {
      style += `top: ${height - 10}px;`;
      if (yAxesAt === 'left') {
        transform += ' translateX(-70%)';
      } else {
        transform += ' translateX(70%)';
      }
    } else if (labelStyle.align === 'center') {
      style += `top: ${height / 2}px;`;
    }
    transform += ';';
    this.labelEl.setAttribute('style', `${style};${transform}`);
  };

  draw = () => {
    const {
      yAxesAt,
      yAxisWidth,
      scale,
      chartWidth,
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
      chartWidth + this.ticksXOffset : this.ticksXOffset;

    let translateX;
    if (yAxesAt === 'left') {
      translateX = index === 0 && showGrid ?
        (chartWidth + yAxisWidth) : yAxisWidth;
    } else {
      translateX = index === 0 && showGrid ?
        -1 : 0;
    }

    let yAxisFunction;
    if (yAxesAt === 'left') {
      yAxisFunction = axisLeft(scale);
    } else {
      yAxisFunction = axisRight(scale);
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

    const yMiniOffset = xAxesAt === 'top' ? 0 : -1;
    // style for <svg><g>
    let gStyle = '';
    if (yAxesAt === 'left') {
      gStyle += `transform: translate(${translateX}px, ${yMiniOffset}px);`;
    } else {
      gStyle += `transform: translate(${translateX}px, ${yMiniOffset}px);`;
    }

    this.svgAxisEl.innerHTML = '';
    const svgGroup = select(this.svgAxisEl)
      .append('g')
      .attr('style', gStyle)
      .attr('class', classnames(
        styles.yAxisGroup,
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
        direction="vertical"
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
