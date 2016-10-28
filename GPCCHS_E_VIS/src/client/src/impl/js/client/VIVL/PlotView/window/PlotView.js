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

import debug from '../../../lib/common/debug/windowDebug';
import { SquareMarker, TriangleMarker } from './markers';

const logger = debug('view:plot');

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
        break;
      case 'Triangle':
        styleProps = {};
        break;
      case 'Dot':
      case 'None':
      default:
        styleProps = { r: 1 };
    }
    return { ...styleProps, ...props };
  }

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
    const { data: { lines = [] } = {} } = this.props;
    return {
      x: this.dateFormat(xAccessor(currentItem)),
      y: lines.map(line => ({
        label: line.name,
        value: _get(currentItem, [line.key, 'value']),
        stroke: line.color,
      })),
    };
  };

  shouldRender() {
    const { size, data } = this.props;

    if (size.width <= 0 || size.height <= 0) {
      return `invisible size received ${size.width}x${size.height}`;
    }
    if (!data.columns || !data.columns.length || data.columns.length < 2) {
      return 'no point';
    }
    if (data.columns.length < 2) {
      return 'only one point';
    }

    const lines = this.getLines();
    if (!lines || !lines.length) {
      return 'invalid view configuration';
    }
  }

  xAccessor = (d) => {
    if (typeof d === 'undefined' || typeof d.x === 'undefined') {
      logger.warn('empty point received');
      return new Date();
    }

    return new Date(d.x);
  };

  renderLines = () => {
    const lines = this.getLines();
    return lines.map(({ key, color, pointsStyle }) => (
      <div key={key}>
        <LineSeries
          key={`line${key}`}
          yAccessor={d => _get(d, [key, 'value'], 50)}
          stroke={color}
        />
        <ScatterSeries
          key={`scatter${key}`}
          yAccessor={d => _get(d, [key, 'value'], 50)}
          marker={this.getLineMarker(pointsStyle)}
          markerProps={this.getLineMarkerProps(pointsStyle, { stroke: color })}
        />
        <CurrentCoordinate
          key={`coordinate${key}`}
          yAccessor={d => _get(d, [key, 'value'], 50)}
          fill={color}
        />
      </div>
    ));
  };

  render() {
    logger.debug('render');

    const { size, data, visuWindow } = this.props;
    const { columns } = data;
    const { lower, upper } = visuWindow;
    const { width, height } = size;

    const noRender = this.shouldRender();
    if (noRender) {
      logger.warn('no render due to', noRender);
      // TODO : clean message component
      return <div>unable to render plot: {noRender}</div>;
    }

    // TODO : display X time for each data value object instead of master timestamp tooltip
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
          xAccessor={this.xAccessor}
          xScale={scaleTime()}
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
              displayFormat={format('.2f')}
            />
            {this.renderLines()}
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
