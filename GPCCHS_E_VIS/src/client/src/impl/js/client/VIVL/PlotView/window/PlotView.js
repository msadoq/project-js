import React, { Component, PropTypes } from 'react';
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { schemeCategory10 as colors } from "d3-scale";
import { ChartCanvas, Chart, series, scale, coordinates, tooltip, axes, helper } from "react-stockcharts";

const { LineSeries, AreaSeries, ScatterSeries, CircleMarker } = series;
const { discontinuousTimeScaleProvider } = scale;
const { CrossHairCursor, MouseCoordinateX, MouseCoordinateY, CurrentCoordinate } = coordinates;
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
  margin = { left: 10, right: 60, top: 20, bottom: 20 };
  maxPoints = 500;
  maxY = 10000;
  minY = 0;
  date = new Date();
  componentWillMount() {
    // random number of lines
    this.lines = Math.floor(Math.random() * (5 - 1)) + 1;
    this.reRender();
    // setInterval(() => {
    //   this.state.rows.shift()
    //   this.setState({
    //     rows: [...this.state.rows, this.getRandomRow()]
    //   })
    // }, 1000)
  }
  getRandomYValue() {
    if (Math.floor(Math.random() * 100) > 66) {
      return undefined;
    }
    return Math.floor(Math.random() * (this.maxY - this.minY)) + this.minY;
  }
  getRandomRow() {
    let row = {
      date: new Date(this.date.setDate(this.date.getDate() + 1))
    };
    for (let i = 0; i < this.lines; i++) {
      row[`value${i}`] = this.getRandomYValue();
    }
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
  getLines() {
    const lines = [];
    for (let i = 0; i < this.lines; i++) {
      lines.push(<LineSeries
        key={`line${i}`}
        yAccessor={d => d[`value${i}`]}
        stroke={colors[i]}
        />);
      lines.push(<ScatterSeries
        key={`scatter${i}`}
        yAccessor={d => d[`value${i}`]}
        marker={CircleMarker}
        markerProps={{ r: 1, stroke: colors[i] }}
        />);
      lines.push(<CurrentCoordinate
        key={`coordinate${i}`}
        yAccessor={d => d[`value${i}`]}
        fill={colors[i]}
        />);
    }
    return lines;
  }
  render() {
    const { rows: data } = this.state;
    const { size, ratio = 2 } = this.props;

    const Lines = this.getLines();

    return (
      <div>
        <ChartCanvas
          ratio={ratio}
          width={size.width}
          height={size.height - 50}
          margin={this.margin}
          seriesName="PlotView"
          data={data}
          type="hybrid"
          xAccessor={d => d.date} xScaleProvider={discontinuousTimeScaleProvider}
          xExtents={[data[0].date, data[data.length - 1].date]}
          >
          <Chart id={1} yExtents={d => {
            const data = [];
            for (let i = 0; i < this.lines; i++) {
              data.push(d[`value${i}`]);
            }
            return data
          } }>
            <XAxis axisAt="bottom" orient="bottom" />
            <YAxis axisAt="right" orient="right" ticks={5} />
            <MouseCoordinateX
              at="bottom"
              orient="bottom"
              displayFormat={timeFormat("%Y-%m-%d")} />
            <MouseCoordinateY
              at="right"
              orient="right"
              displayFormat={format(".2f")} />
            {Lines}
          </Chart>
          <CrossHairCursor />
        </ChartCanvas>
      </div>
    );
  }
}
