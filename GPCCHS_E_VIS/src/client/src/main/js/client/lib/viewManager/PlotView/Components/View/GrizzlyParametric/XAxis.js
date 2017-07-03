import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import _memoize from 'lodash/memoize';
import { select } from 'd3-selection';
import { range } from 'd3-array';
import { format as d3Format } from 'd3-format';
import { axisTop, axisBottom } from 'd3-axis';
import styles from './GrizzlyChart.css';

export default class XAxis extends Component {

  static propTypes = {
    getLabelPosition: PropTypes.func.isRequired,
    axisId: PropTypes.string.isRequired,
    xAxesAt: PropTypes.string,
    yAxesAt: PropTypes.string,
    logarithmic: PropTypes.bool,
    index: PropTypes.number.isRequired,
    scale: PropTypes.func.isRequired,
    extents: PropTypes.arrayOf(
      PropTypes.number
    ).isRequired,
    side: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    xAxisHeight: PropTypes.number.isRequired,
    margin: PropTypes.number.isRequired,
    chartWidth: PropTypes.number.isRequired,
    lines: PropTypes.arrayOf(
      PropTypes.shape({
        lineStyle: PropTypes.string,
        id: PropTypes.string.isRequired,
        yAxis: PropTypes.shape().isRequired,
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
    showPointLabels: false,
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
      'scale', 'autoTick', 'tickStep', 'showPointLabels'];
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
      axisId,
      getLabelPosition,
      // margin,
      height,
      showLabels,
      index,
      xAxesAt,
    } = this.props;
    if (!showLabels || !lines) {
      return;
    }

    const positions = getLabelPosition(axisId);
    lines.forEach((line) => {
      const el = this[`label-${line.id}-el`];
      const linePosition = positions.find(pos => typeof pos[line.id] !== 'undefined')[line.id];
      if (!linePosition || (linePosition.x === null && el)) {
        el.setAttribute('style', 'display:none;');
      } else if (el) {
        let style = `background:${line.fill || '#222222'};left:${linePosition.x}px;`;
        if (xAxesAt === 'top') {
          style += `transform: translate(-50%, 0%);top: ${8}px;`;
        } else {
          style += `transform: translate(50%, 0%);top: ${index === 0 ? height : 0}px;`;
        }
        el.setAttribute('style', style);
      }
    });
  }

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
  }

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
    } = this.props;

    const tickFormat = showTicks ?
      this.memoizeFormatter(format) : () => null;

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
      xAxisHeight,
      chartWidth,
      yAxesAt,
      xAxesAt,
      margin,
      showLabels,
      index,
      label,
      unit,
      labelStyle,
      lines,
      side,
      // format,
    } = this.props;
    const axisHeight = index === 0 ? height + xAxisHeight : xAxisHeight;

    const divStyle = {};
    divStyle.height = axisHeight;
    divStyle.width = chartWidth;
    if (xAxesAt === 'top') {
      divStyle.top = margin;
    } else {
      divStyle.top = index === 0 ? 0 : margin;
    }

    if (yAxesAt === 'left') {
      divStyle.left = side;
    } else if (yAxesAt === 'right') {
      divStyle.right = side;
    } else {
      divStyle.left = 0;
    }

    const style = {};
    // vertical position
    style.width = chartWidth;
    style.height = xAxisHeight;

    return (
      <div
        style={divStyle}
        className={styles.xAxisDiv}
      >
        <span
          ref={this.assignLabelEl}
          className={classnames(
            'label',
            styles.xAxisLabel,
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
                styles.xAxisLineLabel,
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
          className={styles.xAxis}
        />
      </div>
    );
  }
}
