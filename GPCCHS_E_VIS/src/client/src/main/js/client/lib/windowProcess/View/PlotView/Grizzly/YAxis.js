import React, { PropTypes, PureComponent } from 'react';
import classnames from 'classnames';
import _memoize from 'lodash/memoize';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { axisLeft, axisRight } from 'd3-axis';
import styles from './GrizzlyChart.css';

export default class YAxis extends PureComponent {

  static propTypes = {
    getLabelPosition: PropTypes.func.isRequired,
    yAxisId: PropTypes.string.isRequired,
    xAxisAt: PropTypes.string.isRequired,
    yAxesAt: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    yAxisWidth: PropTypes.number.isRequired,
    margin: PropTypes.number.isRequired,
    chartWidth: PropTypes.number.isRequired,
    lines: PropTypes.arrayOf(
      PropTypes.shape({
        lineStyle: PropTypes.string,
        id: PropTypes.string.isRequired,
        dataSet: PropTypes.string.isRequired,
        yAxis: PropTypes.string.isdataSetsRequired,
        fill: PropTypes.string,
        strokeWidth: PropTypes.number,
        yAccessor: PropTypes.func.isRequired,
      })
    ).isRequired,
    showLabels: PropTypes.bool.isRequired,
    showTicks: PropTypes.bool.isRequired,
    showGrid: PropTypes.bool.isRequired,
    gridStyle: PropTypes.string.isRequired,
    gridSize: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    labelBgColor: PropTypes.string.isRequired,
    labelColor: PropTypes.string.isRequired,
    labelFont: PropTypes.string.isRequired,
    labelItalic: PropTypes.bool.isRequired,
    labelSize: PropTypes.number.isRequired,
    labelUnderline: PropTypes.bool.isRequired,
    labelAlign: PropTypes.string.isRequired,
    labelBold: PropTypes.bool.isRequired,
    yExtends: PropTypes.arrayOf(
      PropTypes.number
    ).isRequired,
  }

  componentDidMount() {
    this.draw();
    this.drawLabel();
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;
    ['yAxesAt', 'top', 'height', 'yAxisWidth', 'margin'].forEach((attr) => {
      if (nextProps[attr] !== this.props[attr]) {
        shouldRender = true;
      }
    });

    if (
      nextProps.yExtends[0] !== this.props.yExtends[0] ||
      nextProps.yExtends[1] !== this.props.yExtends[1]
    ) {
      shouldRender = true;
    }

    // update line label refs's style attribute
    this.drawLinesLabel();

    return shouldRender;
  }

  componentDidUpdate() {
    this.draw();
    this.drawLabel();
  }

  ticksXOffset = 8;

  axisDidDraw = () => {
    const {
      gridSize,
    } = this.props;
    select(this.canvasEl).selectAll('line').attr('stroke-width', gridSize);
  }

  drawLinesLabel = () => {
    const {
      lines,
      yAxisId,
      getLabelPosition,
      yAxisWidth,
      margin,
      showLabels,
      yAxesAt,
    } = this.props;
    if (!showLabels || !lines) {
      return;
    }
    lines.forEach((line) => {
      const y = getLabelPosition(yAxisId, line.id);
      const el = this[`label-${line.id}-el`];
      if (el) {
        let style = `background:${line.fill};top:${y}px;`;
        if (yAxesAt === 'left') {
          style += `transform: translate(-102%, -50%);left: ${margin + yAxisWidth}px;`;
        } else {
          style += `transform: translate(102%, -50%);right: ${margin + yAxisWidth}px;`;
        }
        el.setAttribute('style', style);
      }
    });
  }

  drawLabel = () => {
    const {
      labelBgColor,
      labelColor,
      labelFont,
      labelSize,
      labelAlign,
      height,
      yAxesAt,
      margin,
    } = this.props;

    let style = 'position:absolute;';
    let transform = '';
    if (yAxesAt === 'left') {
      transform += 'transform: rotate(90deg)';
      style += `left: ${margin}px;`;
    } else {
      transform += 'transform: rotate(-90deg)';
      style += `right: ${margin}px;`;
    }
    style += `font-size:${labelSize}px;`;
    style += `font-family:${labelFont};`;
    style += `color:${labelColor};`;
    style += `background:${labelBgColor};`;
    if (labelAlign === 'left') {
      style += 'top: 20px;';
    } else if (labelAlign === 'right') {
      style += `top: ${height - 10}px;`;
      if (yAxesAt === 'left') {
        transform += ' translateX(-70%)';
      } else {
        transform += ' translateX(70%)';
      }
    } else if (labelAlign === 'center') {
      style += `top: ${height / 2}px;`;
    }
    transform += ';';
    this.labelEl.setAttribute('style', `${style};${transform}`);
  }

  draw = () => {
    const {
      yAxesAt,
      height,
      yAxisWidth,
      yExtends,
      chartWidth,
      index,
      showTicks,
      showGrid,
      gridStyle,
      xAxisAt,
    } = this.props;

    const yScale = scaleLinear()
      .domain([yExtends[0], yExtends[1]])
      .range([0, height]);


    const tickFormat = showTicks ? d => d : () => null;

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
    if (yAxesAt === 'right') {
      yAxisFunction = axisRight(yScale);
    } else {
      yAxisFunction = axisLeft(yScale);
    }

    yAxisFunction = yAxisFunction
      .ticks(8)
      .tickSize(tickSize)
      .tickFormat(tickFormat);

    const yMiniOffset = xAxisAt === 'top' ? 0 : -1;
    // style for <svg><g>
    let gStyle = '';
    if (yAxesAt === 'left') {
      gStyle += `transform: translate(${translateX}px, ${yMiniOffset}px);`;
    } else {
      gStyle += `transform: translate(${translateX}px, ${yMiniOffset}px);`;
    }

    this.canvasEl.innerHTML = '';
    const svgGroup = select(this.canvasEl)
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

  assignEl = (el) => { this.canvasEl = el; }
  assignLabelEl = (el) => { this.labelEl = el; }

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
      labelUnderline,
      labelBold,
      labelItalic,
      lines,
    } = this.props;

    const style = {};
    if (yAxesAt === 'left') {
      style.left = margin;
    } else if (yAxesAt === 'right') {
      style.right = margin;
    } else {
      style.left = 0;
    }

    // vertical position
    style.top = top;

    const axisWidth = index === 0 && showGrid ? chartWidth + yAxisWidth : yAxisWidth;

    return (
      <div
        height={height}
        width={axisWidth}
      >
        <span
          ref={this.assignLabelEl}
          className={classnames(
            'label',
            styles.yAxisLabel,
            {
              [styles.labelUnderline]: labelUnderline,
              [styles.labelBold]: labelBold,
              [styles.labelItalic]: labelItalic,
            }
          )}
        >
          {label}
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
          height={height}
          width={axisWidth}
          className={styles.yAxis}
        />
      </div>
    );
  }
}
