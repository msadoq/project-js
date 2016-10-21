import React, { Component, PropTypes } from 'react';
import _get from 'lodash/get';
import _map from 'lodash/map';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import { ChartCanvas, Chart, series, scale, coordinates, axes } from 'react-stockcharts';

const { LineSeries, ScatterSeries, CircleMarker } = series;
const { discontinuousTimeScaleProvider } = scale;
const { CrossHairCursor, MouseCoordinateX, MouseCoordinateY, CurrentCoordinate } = coordinates;
const { XAxis, YAxis } = axes;

function renderLines(lines = []) {
  return lines.map(({ key, color }) => (
    <div key={key}>
      <LineSeries
        key={`line${key}`}
        yAccessor={d => d[key]}
        stroke={color}
      />
      <ScatterSeries
        key={`scatter${key}`}
        yAccessor={d => d[key]}
        marker={CircleMarker}
        markerProps={{ r: 1, stroke: color }}
      />
      <CurrentCoordinate
        key={`coordinate${key}`}
        yAccessor={d => d[key]}
        fill={color}
      />
    </div>
  ));
}

export default class PlotView extends Component {
  static propTypes = {
    data: PropTypes.any,
    // @TODO maknig sure we have input data
    // data: React.PropTypes.shape({
    //   lines: React.PropTypes.array.isRequired,
    //   columns: React.PropTypes.array.isRequired
    // }),
    // configuration: PropTypes.object.isRequired,
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
  yExtents = d => _map(this.props.data.lines, ({ key }) => _get(d, [key]));
  render() {
    const { size, data } = this.props;
    const { width, height } = size;
    const { lines, columns = [] } = data;

    if (!lines || !lines.length || !columns.length) {
      return <div>sorry</div>; // TODO : clean message
    }

    const xExtents = [
      _get(columns, '[0].x'),
      _get(columns, [(columns.length - 1), 'x']),
    ];

    return (
      <div>
        <ChartCanvas
          ratio={2}
          width={width}
          height={height - 50}
          margin={{ left: 10, right: 60, top: 20, bottom: 20 }}
          seriesName="PlotView"
          data={columns}
          type="hybrid"
          xAccessor={d => d.x}
          xScaleProvider={discontinuousTimeScaleProvider}
          xExtents={xExtents}
        >
          <Chart
            id={1}
            yExtents={this.yExtents}
          >
            <XAxis axisAt="bottom" orient="bottom" />
            <YAxis axisAt="right" orient="right" ticks={5} />
            <MouseCoordinateX
              at="bottom"
              orient="bottom"
              displayFormat={timeFormat('%Y-%m-%d')}
            />
            <MouseCoordinateY
              at="right"
              orient="right"
              displayFormat={format('.2f')}
            />
            {renderLines(lines) }
          </Chart>
          <CrossHairCursor />
        </ChartCanvas>
      </div>
    );
  }
}
