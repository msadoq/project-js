import React, { PureComponent, PropTypes } from 'react';
import _get from 'lodash/get';
import _map from 'lodash/map';
import SizeMe from 'react-sizeme';
import { format } from 'd3-format';
import { scaleTime } from 'd3-scale';
// import {
//   MenuItem
// } from 'react-bootstrap';
import {
  ChartCanvas, Chart, series,
  coordinates, axes, tooltip, interactive
} from 'react-stockcharts';
import {
  getLineMarker,
  getLineMarkerProps,
  getLines,
  zoomDateFormat,
  fullDateFormat,
  getLineStyle
} from './helper';
// import PlotMenu from './PlotMenu';

import debug from '../../../lib/common/debug/windowDebug';

const logger = debug('view:plot');

const {
  LineSeries, ScatterSeries, StraightLine
} = series;
const { HoverTooltip } = tooltip;
const {
  CrossHairCursor, MouseCoordinateX,
  MouseCoordinateY, CurrentCoordinate
} = coordinates;
const { ClickCallback } = interactive;
const { XAxis, YAxis } = axes;
const margin = { left: 10, right: 60, top: 20, bottom: 20 };
const offsetTop = 50;

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
    disableZoom: true,
    isMenuOpened: false,
    menuPosition: {
      x: 0,
      y: 0
    }
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

  getGrid() {
    const { configuration, size } = this.props;
    const isDisplayed = _get(configuration, 'grids[0].showGrid', false);

    if (!isDisplayed) {
      return {
        x: {},
        y: {}
      };
    }
    const { width, height } = size;
    const gridHeight = height - margin.top - margin.bottom - offsetTop;
    const gridWidth = width - margin.left - margin.right;
    const lineConf = _get(configuration, 'grids[0].line', {});
    const common = {
      tickStrokeOpacity: 0.2,
      strokeWidth: lineConf.size || 1,
      strokeDasharray: getLineStyle(lineConf.style)
    };

    return {
      x: {
        innerTickSize: -1 * gridHeight,
        ...common
      },
      y: {
        innerTickSize: -1 * gridWidth,
        ...common
      }
    };
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

  yExtents = d => _map(this.lines, ({ key }) => _get(d, [key, 'value']));

  handleTooltipContent = ({ currentItem, xAccessor }) => ({
    x: fullDateFormat(xAccessor(currentItem)),
    y: this.lines
      .filter(
        line => typeof _get(currentItem, [line.key, 'value']) !== 'undefined'
      )
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

  handleChartClick = (e) => {
    const { isMenuOpened } = this.state;

    if (isMenuOpened) {
      this.setState({ isMenuOpened: false });
      return;
    }

    this.setState({
      isMenuOpened: true,
      menuPosition: {
        x: e.mouseXY[0] + margin.left,
        y: e.mouseXY[1] + margin.top
      }
    });
  }

  renderLines = () => this.lines.map(({
      key, color, lineSize = 1,
      pointsStyle, pointsSize, lineStyle
    }) => {
    if (!key) {
      return ({});
    }
    return (
      <div key={key}>
        <LineSeries
          key={`line${key}`}
          yAccessor={d => _get(d, [key, 'value'])}
          connectNulls
          stroke={color}
          strokeWidth={lineSize}
          strokeDasharray={getLineStyle(lineStyle)}
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
    );
  });

  render() {
    logger.debug('render');
    const noRender = this.shouldRender();

    if (noRender) {
      logger.warn('no render due to', noRender);
      // TODO : clean message component
      return <div>unable to render plot: {noRender}</div>;
    }

    const { size, data, visuWindow } = this.props;
    const { columns } = data;
    const { lower, upper, current } = visuWindow;
    const { width, height } = size;
    const {
      tooltipWidth,
      tooltipHeight,
      disableZoom,
      // isMenuOpened,
      // menuPosition
    } = this.state;
    // const menuOpenOnTop = menuPosition.y >= (height / 2);
    // const menuOpenOnLeft = menuPosition.x >= (width / 2);
    const { y: yGrid, x: xGrid } = this.getGrid();

    return (
      <div
        style={{ height: '100%' }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <ChartCanvas
          plotFull
          ratio={2}
          width={width}
          height={height - offsetTop}
          margin={margin}
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
            <XAxis
              axisAt="bottom"
              orient="bottom"
              ticks={5}
              tickFormat={zoomDateFormat}
              zoomEnabled={!disableZoom}
              {...xGrid}
            />
            <YAxis
              axisAt="right"
              orient="right"
              ticks={5}
              zoomEnabled={!disableZoom}
              {...yGrid}
            />
            <MouseCoordinateX
              at="bottom"
              orient="bottom"
              rectWidth={150}
              displayFormat={fullDateFormat}
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
            <ClickCallback
              enabled
              onClick={this.handleChartClick}
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

        { /* @TODO Uncomment when implementing markers!
          do the same for the Editor PlotTab part.
        <PlotMenu
          isOpened={isMenuOpened}
          openOnLeft={menuOpenOnLeft}
          openOnTop={menuOpenOnTop}
          mousePosition={menuPosition}
        >
          <MenuItem header>Markers</MenuItem>
          <MenuItem divider />
          <MenuItem>Add a Text</MenuItem>
          <MenuItem>Add an horizontal line</MenuItem>
          <MenuItem>Add an Vertical line</MenuItem>
        </PlotMenu>
        */}
      </div>
    );
  }
}

export default SizeMe({ monitorHeight: true })(PlotView); // eslint-disable-line new-cap
