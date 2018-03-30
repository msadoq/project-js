// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving DynamicView PlotView and TextView in dataManager.
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Grizzly: autoTick and tickStep are taken into consideration.
// VERSION : 1.1.2 : FA : #6130 : 30/03/2017 : Highlight curve by selecting entry point in the legend.
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Fix tock values problem when panning on first Y Axis.
// VERSION : 1.1.2 : FA : ISIS-FT-2107 : 13/06/2017 : Prep for point labels option on PlotView.
// VERSION : 1.1.2 : DM : #6829 : 22/06/2017 : Working logarithmic scale for Y axes on PlotView.
// VERSION : 1.1.2 : DM : #6829 : 10/07/2017 : PlotView : line[n].yAccessor is not mandatory.
// VERSION : 1.1.2 : DM : #6830 : 20/07/2017 : Carried few changes to Grizzly-PlotView to avoid useless re-renders + removed stuff related to pointLabels.
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';
import _memoize from 'lodash/memoize';
import { select } from 'd3-selection';
import { range } from 'd3-array';
import { format as d3Format } from 'd3-format';
import { axisLeft, axisRight } from 'd3-axis';
import styles from './GrizzlyChart.css';

export default class YAxis extends Component {

  static propTypes = {
    getLabelPosition: PropTypes.func.isRequired,
    yAxisId: PropTypes.string.isRequired,
    xAxisAt: PropTypes.string,
    yAxesAt: PropTypes.string,
    logarithmic: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    yScale: PropTypes.func.isRequired,
    yExtents: PropTypes.arrayOf(
      PropTypes.number
    ).isRequired,
    top: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    yAxisWidth: PropTypes.number.isRequired,
    margin: PropTypes.number.isRequired,
    chartWidth: PropTypes.number.isRequired,
    lines: PropTypes.arrayOf(
      PropTypes.shape({
        lineStyle: PropTypes.string,
        id: PropTypes.string.isRequired,
        yAxis: PropTypes.string.isRequired,
        fill: PropTypes.string,
        strokeWidth: PropTypes.number,
        yAccessor: PropTypes.func,
      })
    ).isRequired,
    showLabels: PropTypes.bool,
    showTicks: PropTypes.bool,
    autoTick: PropTypes.bool,
    tickStep: PropTypes.number,
    showGrid: PropTypes.bool,
    gridStyle: PropTypes.string,
    gridSize: PropTypes.number,
    label: PropTypes.string.isRequired,
    unit: PropTypes.string,
    format: PropTypes.string,
    labelStyle: PropTypes.shape({
      bgColor: PropTypes.string,
      color: PropTypes.string,
      align: PropTypes.string,
      font: PropTypes.string,
      italic: PropTypes.bool,
      bold: PropTypes.bool,
      underline: PropTypes.bool,
      size: PropTypes.number,
    }),
  }

  static defaultProps = {
    unit: '',
    showLabels: false,
    showTicks: true,
    showGrid: true,
    gridStyle: 'Continuous',
    xAxisAt: 'bottom',
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
  }

  componentDidMount() {
    this.draw();
    this.drawLabel();
    this.drawLinesLabel();
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;
    const attrs = ['yAxesAt', 'top', 'height', 'yAxisWidth', 'margin', 'chartWidth',
      'yScale', 'autoTick', 'tickStep'];
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
  }

  drawLinesLabel = () => {
    const {
      lines,
      yAxisId,
      getLabelPosition,
      yAxisWidth,
      showLabels,
      yAxesAt,
    } = this.props;
    if (!showLabels || !lines) {
      return;
    }
    lines.forEach((line) => {
      const el = this[`label-${line.id}-el`];
      const y = getLabelPosition(yAxisId, line.id);
      if (y === null && el) {
        el.setAttribute('style', 'display:none;');
      } else if (el) {
        let style = `background:${line.fill || '#222222'};top:${y}px;`;
        if (yAxesAt === 'left') {
          style += `transform: translate(-102%, -50%);left: ${yAxisWidth}px;`;
        } else {
          style += `transform: translate(102%, -50%);right: ${yAxisWidth}px;`;
        }
        el.setAttribute('style', style);
      }

      // const pointLabels = getPointLabelPosition(yAxisId, line.id);
      // for (let i = 0; i < pointLabels.length; i += 1) {
      // }
    });
  }

  drawLabel = () => {
    const {
      labelStyle,
      height,
      yAxesAt,
    } = this.props;

    let style = 'position:absolute;';
    let transform = '';
    if (yAxesAt === 'left') {
      transform += 'transform: rotate(90deg)';
      style += 'left: 0px;';
    } else {
      transform += 'transform: rotate(-90deg)';
      style += 'right: 0px;';
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
  }

  draw = () => {
    const {
      yAxesAt,
      yAxisWidth,
      yScale,
      chartWidth,
      index,
      showTicks,
      tickStep,
      autoTick,
      format,
      showGrid,
      gridStyle,
      xAxisAt,
      logarithmic,
      yExtents,
    } = this.props;

    const tickFormat = showTicks ?
      this.memoizeFormatter(format) : () => null;

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
      yAxisFunction = axisLeft(yScale);
    } else {
      yAxisFunction = axisRight(yScale);
    }

    if (logarithmic) {
      yAxisFunction = yAxisFunction
        .ticks(8);
    } else if (autoTick) {
      yAxisFunction = yAxisFunction
        .ticks(8);
    } else {
      const offset = yExtents[1] % tickStep;
      const tickValues = this.memoizeRange(
        `${yExtents[0]}-${yExtents[1]}-${tickStep}-${offset}`,
        (yExtents[0] - offset) + tickStep,
        (yExtents[1] - offset) + tickStep,
        tickStep
      );
      yAxisFunction = yAxisFunction
        .tickValues(tickValues);
    }

    yAxisFunction = yAxisFunction
      .tickSize(tickSize)
      .tickFormat(logarithmic ? d => d : tickFormat);

    const yMiniOffset = xAxisAt === 'top' ? 0 : -1;
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
  }

  assignEl = (el) => { this.svgAxisEl = el; }
  assignLabelEl = (el) => { this.labelEl = el; }

  memoizeFormatter = _memoize(f =>
    d => d3Format(f)(d)
  );

  memoizeRange = _memoize((hash, lower, upper, step) =>
    range(lower, upper, step)
  );

  memoizeAssignRef = _memoize(lineId =>
    (el) => { this[`label-${lineId}-el`] = el; }
  )

  render() {
    const {
      height,
      yAxisWidth,
      chartWidth,
      margin,
      yAxesAt,
      showLabels,
      index,
      top,
      showGrid,
      label,
      unit,
      labelStyle,
      lines,
    } = this.props;

    const axisWidth = index === 0 && showGrid ? chartWidth + yAxisWidth : yAxisWidth;

    const divStyle = {};
    divStyle.height = height;
    divStyle.width = axisWidth;
    divStyle.top = top;
    if (yAxesAt === 'left') {
      divStyle.left = margin;
    } else if (yAxesAt === 'right') {
      divStyle.right = margin;
    } else {
      divStyle.left = 0;
    }

    const style = {};
    // vertical position
    style.width = axisWidth;
    style.height = height;

    return (
      <div
        style={divStyle}
        className={styles.yAxisDiv}
      >
        <span
          ref={this.assignLabelEl}
          className={classnames(
            'label',
            styles.yAxisLabel,
            {
              [styles.labelUnderline]: labelStyle.underline,
              [styles.labelBold]: labelStyle.bold,
              [styles.labelItalic]: labelStyle.italic,
            }
          )}
        >
          { label }{ unit.length ? ` (${unit})` : '' }
        </span>
        {
          lines.map(line =>
            <span
              key={line.id}
              className={classnames(
                'label',
                styles.yAxisLineLabel,
                { hidden: !showLabels }
              )}
              ref={this.memoizeAssignRef(line.id)}
            >
              {line.id}
            </span>
          )
        }
        <svg
          style={style}
          ref={this.assignEl}
          className={styles.yAxis}
        />
      </div>
    );
  }
}
