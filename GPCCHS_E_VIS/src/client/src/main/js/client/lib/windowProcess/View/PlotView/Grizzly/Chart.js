import React, { PropTypes } from 'react';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { axisLeft, axisBottom, axisRight } from 'd3-axis';
// import styles from './GrizzlyChart';
export default class chart extends React.Component {

  static propTypes = {
    uniqueId: PropTypes.string.isRequired,
    yAxesAt: PropTypes.string.isRequired,
    xAxisAt: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    xExtends: PropTypes.arrayOf(PropTypes.number).isRequired,
    yAxes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        orient: PropTypes.string.isRequired,
        yExtends: PropTypes.array.isRequired,
        master: PropTypes.bool.isRequired,
        autoLimits: PropTypes.bool.isRequired,
      })
    ).isRequired,
    dataSets: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        data: PropTypes.array.isRequired,
      })
    ).isRequired,
    lines: PropTypes.arrayOf(
      PropTypes.shape({
        lineStyle: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        dataSet: PropTypes.string.isRequired,
        yAxis: PropTypes.string.isRequired,
        fill: PropTypes.string.isRequired,
        strokeWidth: PropTypes.number.isRequired,
        yAccessor: PropTypes.func.isRequired,
      })
    ).isRequired,
  }

  componentDidMount() {
    this.draw();
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;
    Object.entries(nextProps).forEach((p) => {
      if (this.props[p[0]] !== p[1]) {
        shouldRender = true;
      }
    });
    if (shouldRender) {
      this.draw();
    }
    return false;
  }

  getYAxes = () => {
    const { lines, yAxes } = this.props;
    const axes = [];
    lines.forEach((l) => {
      const foundAxis = yAxes.find(axis => axis.id === l.yAxis);
      if (foundAxis && !axes.find(a => a.id === foundAxis.id)) {
        axes.push(foundAxis);
      }
    });
    return axes;
  }

  getSortedYAxes = (yAxes) => {
    const sortedAxes = [];
    yAxes.filter(a => !a.master).forEach((a) => {
      sortedAxes.push(a.id);
    });
    yAxes.filter(a => a.master).forEach((a) => {
      sortedAxes.push(a.id);
    });
    return sortedAxes;
  }

  yAxisWidth = 40;
  xAxisHeight = 40;

  createOrFindCanvas = (line, chartWidth, chartHeight, canvasMustBeCleared) => {
    const {
      uniqueId,
      yAxesAt,
      xAxisAt,
    } = this.props;

    const canvas = document.getElementById(`${uniqueId}-chart-for-axis-${line.yAxis}`);
    if (canvas) {
      if (canvasMustBeCleared) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, chartWidth, chartHeight);
      }
      return canvas;
    }
    const canvasEl = document.createElement('canvas');
    canvasEl.setAttribute('height', chartHeight);
    canvasEl.setAttribute('id', `${uniqueId}-chart-for-axis-${line.yAxis}`);
    canvasEl.setAttribute('class', 'chart-canvas');
    canvasEl.setAttribute('width', chartWidth);

    let style = 'position: absolute;';

    // horizontal position
    if (yAxesAt === 'left') {
      style += 'right: 0px;';
    } else if (yAxesAt === 'right') {
      style += 'left: 0px;';
    } else {
      style += 'left: 0px;';
    }
      // vertical position
    if (xAxisAt === 'bottom') {
      style += 'top: 0px;';
    } else if (xAxisAt === 'top') {
      style += 'bottom: 0px;';
    }
    canvasEl.setAttribute('style', style);

    this.el.appendChild(canvasEl);
    return canvasEl;
  }

  redimension = () => {
    const {
      width,
      height,
    } = this.props;

    if (width !== this.width || height !== this.height) {
      this.el.setAttribute('width', width + 1);
      this.el.setAttribute('width', height + 1);
      this.width = width;
      this.height = height;
    }
  }

  draw = () => {
    const {
      width,
      height,
      xExtends,
      dataSets,
      lines,
      yAxesAt,
      xAxisAt,
      current,
    } = this.props;

    this.redimension();

    const yAxes = this.getYAxes();

    // Set chartWidth depending on yAxesAt (left/right/other)
    // and number of yAxes
    const chartWidth = ['left', 'right'].includes(yAxesAt) ?
      width - (yAxes.length * this.yAxisWidth)
      :
      width;

    // Set chartHeight depending on xAxisAt (top/bottom/other)
    const chartHeight = ['top', 'bottom'].includes(xAxisAt) ?
      height - this.xAxisHeight
      :
      height;

    const xScale = scaleLinear()
      .domain([xExtends[0], xExtends[1]])
      .range([0, chartWidth]);

    // only clear canvas once per yAxis
    const processedYAxes = [];
    let currentHasBeenDrawn = false;

    lines.forEach((line) => {
      // Get data
      let datas = dataSets.find(d => d.id === line.dataSet);
      if (!datas) {
        console.log(`Line ${line.name} render error : data not found`);
        return;
      }
      datas = datas.data;

      // Get yAxis
      const yAxis = yAxes.find(d => d.id === line.yAxis);
      if (!yAxis) {
        console.log(`Line ${line.name} render error : yAxis not found`);
        return;
      }

      const yExtends = yAxis.yExtends;

      const canvas = this.createOrFindCanvas(
        line,
        chartWidth,
        chartHeight,
        !processedYAxes.find(c => c === yAxis.id)
      );

      const ctx = canvas.getContext('2d');

      // Draw current cursor vertical bar
      if (!currentHasBeenDrawn) {
        ctx.beginPath();
        ctx.strokeStyle = '#11EE22';
        ctx.lineWidth = 3;
        ctx.moveTo(xScale(current), 0);
        ctx.lineTo(xScale(current), chartHeight);
        ctx.stroke();
        currentHasBeenDrawn = true;
      }

      const yScale = scaleLinear()
        .domain(yAxis.orient === 'top' ? [yExtends[1], yExtends[0]] : [yExtends[0], yExtends[1]])
        .range([0, chartHeight]);

      ctx.strokeStyle = line.fill || '#000000';
      ctx.lineWidth = line.strokeWidth || 4;
      if (line.lineStyle === 'Dashed') {
        ctx.setLineDash([4, 2]);
      }

      ctx.beginPath();
      datas.forEach((data) => {
        const y = yScale(line.yAccessor(data));
        ctx.lineTo(xScale(data.x), y);
      });
      ctx.stroke();

      if (!processedYAxes.includes(yAxis.id)) {
        this.drawYAxis(yAxis.id, yScale, chartHeight, chartWidth, yAxes);
      }
      processedYAxes.push(yAxis.id);
    });

    this.drawXAxis(xScale, chartHeight, chartWidth, yAxes);
  }

  drawYAxis = (yAxisId, yScale, chartHeight, chartWidth, yAxes) => {
    const {
      xAxisAt,
      yAxesAt,
      uniqueId,
    } = this.props;

    let yAxis;
    if (yAxesAt === 'right') {
      yAxis = axisRight(yScale).ticks(5);
    } else {
      yAxis = axisLeft(yScale).ticks(5);
    }

    select(`.chart-${uniqueId}-ychart-${yAxisId}`).remove();
    const svg = select(`#chart-${uniqueId}`)
      .append('svg')
      .attr('class', `chart-${uniqueId}-ychart-${yAxisId}`);

    // style for <svg>
    let style = `position: absolute;height:${chartHeight}px;width:${this.yAxisWidth}px;`;
    if (xAxisAt === 'bottom') {
      style += 'top:0px;';
    } else if (xAxisAt === 'top') {
      style += 'bottom:0px;';
    } else {
      style += 'top:0px;';
    }

    const index = this.getSortedYAxes(yAxes).indexOf(yAxisId);

    // style for <svg><g>
    let gStyle = '';
    if (yAxesAt === 'left') {
      style += `left: ${index * this.yAxisWidth}px;`;
      gStyle += `transform: translate(${this.yAxisWidth - 1}px, 0px);`;
    } else if (yAxesAt === 'right') {
      style += `right: ${index * this.yAxisWidth}px;`;
      gStyle += 'transform: translate(0px, 0px);';
    } else {
      return;
    }

    svg.attr('style', style)
      .append('g')
      .attr('style', gStyle)
      .attr('class', 'y axis')
      .call(yAxis);
  }

  drawXAxis = (xScale, chartHeight, chartWidth, yAxes) => {
    const {
      xAxisAt,
      yAxesAt,
      uniqueId,
    } = this.props;

    const xAxis = axisBottom(xScale)
      .tickPadding(10);

    select(`.chart-${uniqueId}-xchart`).remove();
    const svg = select(`#chart-${uniqueId}`)
      .append('svg')
      .attr('class', `chart-${uniqueId}-xchart`);

    // style for <svg>
    let style = `position: absolute;height:${this.xAxisHeight}px;width:${chartWidth}px;`;
    if (xAxisAt === 'bottom') {
      style += 'bottom:0px;';
    } else if (xAxisAt === 'top') {
      style += 'top:0px;';
    } else {
      return;
    }

    if (yAxesAt === 'left') {
      style += `left: ${yAxes.length * this.yAxisWidth}px;`;
    } else {
      style += 'left: 0px;';
    }

    svg.attr('style', style)
        .append('g')
        .attr('class', 'x axis')
        .call(xAxis);
  }

  render() {
    const {
      height,
      width,
      uniqueId,
    } = this.props;

    return (
      <div height={height} width={width} id={`chart-${uniqueId}`} ref={(el) => { this.el = el; }} />
    );
  }
}
