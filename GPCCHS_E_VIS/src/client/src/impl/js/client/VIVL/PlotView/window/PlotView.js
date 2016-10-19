import React, { Component, PropTypes } from 'react';
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { ChartCanvas, Chart, series, scale, coordinates, tooltip, axes, helper } from "react-stockcharts";

const { LineSeries, AreaSeries, ScatterSeries, CircleMarker } = series;
const { discontinuousTimeScaleProvider } = scale;
const { CrossHairCursor, MouseCoordinateX, MouseCoordinateY } = coordinates;
const { OHLCTooltip } = tooltip;
const { XAxis, YAxis } = axes;
const { fitWidth } = helper;

export default class PlotView extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    data: PropTypes.any,
    configuration: PropTypes.object.isRequired,
    size: PropTypes.object.isRequired,
    // entryPoints: PropTypes.array.isRequired,
    // axes: PropTypes.array,
    // grids: PropTypes.array,
    // titleStyle: PropTypes.object,
    // links: PropTypes.array,
    // procedures: PropTypes.array,
    // defaultRatio: PropTypes.object,
    // legend: PropTypes.object,
    // markers: PropTypes.array,
  };
  state = { rows: [] };
  maxPoints = 1000;
  maxY = 10000;
  minY = 0;
  date = new Date();
  componentWillMount() {
    this.reRender();
    // setInterval(() => {
    //   this.state.rows.shift()
    //   this.setState({
    //     rows: [...this.state.rows, this.getRandomRow()]
    //   })
    // }, 1000)
  }
  getRandomYValue() {
    return Math.floor(Math.random() * (this.maxY - this.minY)) + this.minY;
  }
  getRandomRow() {
    let row = {
      date: new Date(this.date.setDate(this.date.getDate() + 1)),
      close: this.getRandomYValue()
    };
    return row;
  }
  getRandomRows() {
    let rows = [];
    for (let i = 0; i < this.maxPoints; i++) {
      rows.push(this.getRandomRow());
    }
    return rows;
  }
  reRender() {
    this.date = new Date();
    this.setState({
      rows: this.getRandomRows()
    });
  }
  render() {
    const { rows: data } = this.state;
    const { size, ratio = 2 } = this.props;
    return (
      <div>
        ok plot view
        size: {size.width}x{size.height}
        {this.props.viewId}
        <ChartCanvas
          ratio={ratio} width={size.width} height={size.height}
          margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
          seriesName="MSFT"
          data={data}
          type="hybrid"
          xAccessor={d => d.date} xScaleProvider={discontinuousTimeScaleProvider}
          xExtents={[data[0].date, data[data.length - 1].date]}
        >
          <Chart id={0} yExtents={d => d.close}>
            <XAxis axisAt="bottom" orient="bottom" />
            <YAxis axisAt="right" orient="right" ticks={5} />
            <LineSeries yAccessor={d => d.close} />
            <ScatterSeries yAccessor={d => d.close} marker={CircleMarker} markerProps={{ r: 2 }} />
          </Chart>
        </ChartCanvas>
      </div>
    );
  }
}
