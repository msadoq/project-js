import React, { Component, PropTypes } from 'react';
import _get from 'lodash/get';
import _map from 'lodash/map';
import SizeMe from 'react-sizeme';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import {
  ChartCanvas, Chart, series, scale,
  coordinates, axes, tooltip
} from 'react-stockcharts';

const { LineSeries, ScatterSeries, CircleMarker } = series;
const { discontinuousTimeScaleProvider } = scale;
const { HoverTooltip } = tooltip;
const {
  CrossHairCursor, MouseCoordinateX,
  MouseCoordinateY, CurrentCoordinate
} = coordinates;
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

class PlotView extends Component {
  static propTypes = {
    size: PropTypes.shape({
      width: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
      height: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    }),
    data: PropTypes.shape({
      lines: PropTypes.array,
      columns: PropTypes.object,
    }),
    // configuration: PropTypes.object.isRequired,
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
  static defaultProps = {
    data: {
      lines: [],
      columns: [],
    },
  };
  dateFormat = timeFormat('%Y-%m-%d %H:%M:%S.%L');

  yExtents = d => _map(this.props.data.lines, ({ key }) => _get(d, [key]));

  handleTooltipContent = ({ currentItem, xAccessor }) => {
    const { data: { lines = [] } = {} } = this.props;
    return {
      x: this.dateFormat(xAccessor(currentItem)),
      y: lines.map(line => ({
        label: line.name,
        value: currentItem[line.key],
        stroke: line.color
      }))
    };
  }

  render() {
    const { size, data } = this.props;
    const { lines, columns } = data;
    const { width, height } = size;

    // TODO : clean message
    if (!lines || !lines.length || !columns.length) {
      console.log('plot view has nothing to do');
      if (!lines || !lines.length) {
        return <div>invalid view configuration</div>;
      }
      if (!columns.length) {
        return <div>no data to render</div>;
      }
    }

    const xExtents = [
      _get(columns, '[0].x'),
      _get(columns, [(columns.length - 1), 'x']),
    ];

    return (
      <div style={{ height: '100%' }}>
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
            <XAxis axisAt="bottom" orient="bottom" ticks={5} />
            <YAxis axisAt="right" orient="right" ticks={5} />
            <MouseCoordinateX
              at="bottom"
              orient="bottom"
              rectWidth={150}
              displayFormat={this.dateFormat}
            />
            <MouseCoordinateY
              at="right"
              orient="right"
              displayFormat={format('.2f')}
            />
            {renderLines(lines) }
          </Chart>
          <CrossHairCursor />
          <HoverTooltip
            tooltipContent={this.handleTooltipContent}
            opacity={1}
            fill="#FFFFFF"
            bgwidth={300}
          />
        </ChartCanvas>
      </div>
    );
  }
}

export default SizeMe({ monitorHeight: true })(PlotView); // eslint-disable-line new-cap
