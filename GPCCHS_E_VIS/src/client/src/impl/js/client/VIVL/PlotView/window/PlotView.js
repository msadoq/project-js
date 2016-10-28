import React, { PureComponent, PropTypes } from 'react';
import _get from 'lodash/get';
import _map from 'lodash/map';
import SizeMe from 'react-sizeme';
import { format } from 'd3-format';
import { scaleTime } from 'd3-scale';
import { timeFormat } from 'd3-time-format';
import {
  ChartCanvas, Chart, series,
  coordinates, axes, tooltip
} from 'react-stockcharts';
import { SquareMarker, TriangleMarker } from './markers.js';

const { LineSeries, ScatterSeries, CircleMarker } = series;
const { HoverTooltip } = tooltip;
const {
  CrossHairCursor, MouseCoordinateX,
  MouseCoordinateY, CurrentCoordinate
} = coordinates;
const { XAxis, YAxis } = axes;

class PlotView extends PureComponent {
  static propTypes = {
    size: PropTypes.shape({
      width: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
      height: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    }),
    data: PropTypes.shape({
      lines: PropTypes.array, // eslint-disable-line react/no-unused-prop-types
      columns: PropTypes.array, // eslint-disable-line react/no-unused-prop-types
    }),
    visuWindow: PropTypes.shape({
      lower: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
      current: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
      upper: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    }).isRequired,
    configuration: PropTypes.object.isRequired,
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

  getLines = () => _map(
    this.props.configuration.entryPoints,
    ep => ({
      name: ep.name,
      key: ep.name,
      color: ep.curveColour,
      lineStyle: ep.lineStyle, // "Continuous", "Dotted", "Dashed"
      pointsStyle: ep.pointsStyle // "None", "Triangle", "Square", "Dot"
    })
  );

  dateFormat = timeFormat('%Y-%m-%d %H:%M:%S.%L');

  yExtents = d => _map(this.getLines(), ({ key }) => _get(d, [key, 'value']));

  handleTooltipContent = ({ currentItem, xAccessor }) => {
    const { data: { lines = []} = {} } = this.props;
    return {
      x: this.dateFormat(xAccessor(currentItem)),
      y: lines.map(line => ({
        label: line.name,
        value: currentItem[line.key],
        stroke: line.color
      }))
    };
  };

  getLineMarker(pointsStyle) {
    switch (pointsStyle) {
      case 'Square':
        return SquareMarker;
      case 'Triangle':
        return TriangleMarker;
      case 'Dot':
      case 'None':
      default:
        return CircleMarker;
    }
  }

  getLineMarkerProps(pointsStyle, props) {
    let styleProps = {};
    switch (pointsStyle) {
      case 'Square':
        styleProps = { width: 2, height: 2 };
      case 'Triangle':
        styleProps = {};
      case 'Dot':
      case 'None':
      default:
        styleProps = { r: 1 };
    }
    return { ...styleProps, ...props };
  }

  renderLines = lines => lines.map(({
    key, color, pointsStyle
  }) => (
      <div key={key}>
        <LineSeries
          key={`line${key}`}
          yAccessor={d => _get(d, [key, 'value'], 50) }
          stroke={color}
          />
        <ScatterSeries
          key={`scatter${key}`}
          yAccessor={d => _get(d, [key, 'value'], 50) }
          marker={this.getLineMarker(pointsStyle) }
          markerProps={this.getLineMarkerProps(pointsStyle, {
            stroke: color
          }) }
          />
        <CurrentCoordinate
          key={`coordinate${key}`}
          yAccessor={d => _get(d, [key, 'value'], 50) }
          fill={color}
          />
      </div>
    ));
  render() {
    console.log('render PlotView', this.props.configuration.entryPoints);
    const { size, data, visuWindow } = this.props;
    // const { lines, columns } = data;
    const { columns } = data;
    const { lower, /* current, */ upper } = visuWindow;
    const { width, height } = size;

    if (width <= 0 || height <= 0) {
      console.log('plot view has invisible size', width, height);
      return <div>invisible</div>;
    }

    // TODO : factorize in container
    const lines = this.getLines();
    // TODO : end

    // TODO : display X time for each data value object instead of master timestamp

    // TODO : clean message
    if (!lines || !lines.length || !columns || !columns.length || columns.length < 2) {
      console.log('plot view has nothing to do');
      if (!lines || !lines.length) {
        return <div>invalid view configuration</div>;
      }
      if (!columns || !columns.length || columns.length < 2) {
        return <div>no data to render</div>;
      }
    }

    // TODO view.plotBackgroundColour
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
          xAccessor={d => new Date(d.x) }
          xScale={scaleTime() }
          xExtents={[new Date(lower), new Date(upper)]}
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
              displayFormat={format('.2f') }
              />
            {this.renderLines(lines) }
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
