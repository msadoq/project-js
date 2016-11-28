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

const logger = debug('view:plot');

const {
  LineSeries, ScatterSeries, CircleMarker,
  SquareMarker, TriangleMarker, StraightLine
} = series;
const { HoverTooltip } = tooltip;
const {
  CrossHairCursor, MouseCoordinateX,
  MouseCoordinateY, CurrentCoordinate
} = coordinates;
const { XAxis, YAxis } = axes;

const getLineMarker = (pointsStyle) => {
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
};

const getLineMarkerProps = (pointsStyle, pointsSize, props) => {
  let styleProps = {};
  switch (pointsStyle) {
    case 'Square':
      styleProps = { width: pointsSize || 4 };
      break;
    case 'Triangle':
      styleProps = { width: pointsSize || 5 };
      break;
    case 'Dot':
      styleProps = { r: pointsSize || 2 };
      break;
    case 'None':
    default:
      styleProps = { r: 0 };
  }
  return { ...styleProps, ...props };
};

const getLines = (entryPoints = []) => entryPoints.map(ep => ({
  name: ep.name,
  key: ep.name,
  color: ep.objectStyle.curveColour,
  lineStyle: ep.objectStyle.line.style, // "Continuous", "Dotted", "Dashed"
  lineSize: ep.objectStyle.line.size,
  pointsStyle: ep.objectStyle.points.style, // "None", "Triangle", "Square", "Dot"
  pointsSize: ep.objectStyle.points.size,
}));

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
      columns: []
    }
  };

  state = {
    tooltipWidth: 300,
    tooltipHeight: 100,
    disableZoom: true
  };

  componentWillMount() {
    this.lines = getLines(this.props.configuration.entryPoints);
  }

  componentWillReceiveProps(nextProps) {
    const { configuration: { entryPoints } } = this.props;
    if (entryPoints !== nextProps.configuration.entryPoints) {
      this.lines = getLines(nextProps.configuration.entryPoints);
    }
  }

  handleMouseEnter = () => {
    document.body.addEventListener('keydown', this.handleOnKeyDown);
    document.body.addEventListener('keyup', this.handleOnKeyUp);
  }

  handleMouseLeave = () => {
    document.body.removeEventListener('keydown', this.handleOnKeyDown);
    document.body.removeEventListener('keyup', this.handleOnKeyUp);
  }

  lines = [];

  dateFormat = timeFormat('%Y-%m-%d %H:%M:%S.%L');

  yExtents = d => _map(this.lines, ({ key }) => _get(d, [key, 'value']));

  handleTooltipContent = ({ currentItem, xAccessor }) => ({
    x: this.dateFormat(xAccessor(currentItem)),
    y: this.lines
      .filter(line => _get(currentItem, [line.key, 'value']))
      .map(line => ({
        label: line.name,
        value: _get(currentItem, [line.key, 'value']),
        stroke: line.color,
      })),
  });

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

    if (!this.lines || !this.lines.length) {
      return 'invalid view configuration';
    }
  }

  xAccessor = (d) => {
    if (typeof d === 'undefined' || typeof d.x === 'undefined') {
      logger.warn('empty point received');
      return;
    }

    return new Date(d.x);
  };

  handleOnKeyUp = (e) => {
    const { disableZoom } = this.state;
    if (e.keyCode === 17 && !disableZoom) {
      logger.debug('disable zoom');
      this.setState({ disableZoom: true });
    }
  }

  handleOnKeyDown = (e) => {
    const { disableZoom } = this.state;
    if (e.keyCode === 17 && disableZoom) {
      logger.debug('enable zoom');
      this.setState({ disableZoom: false });
    }
  }

  renderLines = () => this.lines.map(({ key, color, pointsStyle, pointsSize }) => (
    <div key={key}>
      <LineSeries
        key={`line${key}`}
        yAccessor={d => _get(d, [key, 'value'])}
        stroke={color}
      />
      <ScatterSeries
        key={`scatter${key}`}
        yAccessor={d => _get(d, [key, 'value'])}
        marker={getLineMarker(pointsStyle)}
        markerProps={getLineMarkerProps(pointsStyle, pointsSize, {
          stroke: color,
          fill: color
        })}
      />
      <CurrentCoordinate
        key={`coordinate${key}`}
        yAccessor={d => _get(d, [key, 'value'])}
        fill={color}
      />
    </div>
  ));

  render() {
    logger.debug('render');

    const { size, data, visuWindow } = this.props;
    const { columns } = data;
    const { lower, upper, current } = visuWindow;
    const { width, height } = size;
    const {
      tooltipWidth,
      tooltipHeight,
      disableZoom
    } = this.state;

    const noRender = this.shouldRender();
    if (noRender) {
      logger.warn('no render due to', noRender);
      // TODO : clean message component
      return <div>unable to render plot: {noRender}</div>;
    }

    // TODO : display X time for each data value object instead of master timestamp tooltip
    // TODO view.plotBackgroundColour
    return (
      <div
        style={{ height: '100%' }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
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
          disableZoomEvent={disableZoom}
          xExtents={[new Date(lower), new Date(upper)]}
        >
          <Chart
            id={1}
            yExtents={this.yExtents}
          >
            <XAxis axisAt="bottom" orient="bottom" ticks={5} zoomEnabled={!disableZoom} />
            <YAxis axisAt="right" orient="right" ticks={5} zoomEnabled={!disableZoom} />
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
            <StraightLine
              type="vertical"
              xValue={current}
              stroke="#0ee61f"
              strokeWidth={2}
              opacity={1}
            />
            {this.renderLines()}
          </Chart>
          <CrossHairCursor />
          <HoverTooltip
            tooltipContent={this.handleTooltipContent}
            opacity={1}
            fill="#FFFFFF"
            bgwidth={tooltipWidth}
            bgheight={tooltipHeight}
          />
        </ChartCanvas>
        <span className="pull-left">{this.dateFormat(lower)}</span>
        <span className="pull-right">{this.dateFormat(upper)}</span>
      </div>
    );
  }
}

export default SizeMe({ monitorHeight: true })(PlotView); // eslint-disable-line new-cap
