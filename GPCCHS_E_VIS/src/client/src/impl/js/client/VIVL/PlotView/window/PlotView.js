import React, { PureComponent, PropTypes } from 'react';
import _get from 'lodash/get';
import _map from 'lodash/map';
import SizeMe from 'react-sizeme';
import { format } from 'd3-format';
import { scaleTime } from 'd3-scale';
import getLogger from 'common/log';
import {
  ChartCanvas, Chart, series, annotation,
  coordinates, axes as StockchartsAxes, tooltip,
  // interactive
} from 'react-stockcharts';
import {
  getLines,
  getLineMarker,
  getLineMarkerProps,
  zoomDateFormat,
  fullDateFormat,
  getLineStyle,
  getEntryPointsCharts
} from './helper';
// import PlotMenu from './PlotMenu';

const logger = getLogger('GPCCHS:view:plot');

const {
  LineSeries, ScatterSeries, StraightLine
} = series;
const { Label } = annotation;
const { HoverTooltip } = tooltip;
const {
  CrossHairCursor, MouseCoordinateX,
  MouseCoordinateY, CurrentCoordinate,
  EdgeIndicator
} = coordinates;
// const { ClickCallback } = interactive;
const { XAxis, YAxis } = StockchartsAxes;
const margin = { left: 10, right: 30, top: 20, bottom: 40 };
const yAxisWidth = 55;

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
    this.epCharts = getEntryPointsCharts(this.props.configuration);
  }

  componentWillReceiveProps(nextProps) {
    const { configuration: { entryPoints, axes } } = this.props;

    if (entryPoints !== nextProps.configuration.entryPoints) {
      this.lines = getLines(this.props.configuration.entryPoints);
    }
    if (axes !== nextProps.configuration.axes) {
      this.epCharts = getEntryPointsCharts(nextProps.configuration);
    }
  }

  componentWillUnmount() {
    this.handleMouseLeave();
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
    const gridHeight = height - margin.top - margin.bottom;
    const gridWidth = width - margin.left - margin.right - (this.epCharts.length * yAxisWidth);
    const lineConf = _get(configuration, 'grids[0].line', {});
    const common = {
      tickStrokeOpacity: 0.2,
      tickStrokeWidth: lineConf.size || 1,
      tickStrokeDasharray: getLineStyle(lineConf.style)
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

  getCharts() {
    const {
      visuWindow: { current },
      size: { width, height }
    } = this.props;
    const { disableZoom } = this.state;
    const { y: yGrid, x: xGrid } = this.getGrid();
    const xAxisWidth = width - margin.left - margin.right - (this.epCharts.length * yAxisWidth);
    const xLabelPosition = [
      xAxisWidth / 2,
      height - 30
    ];
    const charts = [
      <Chart
        id={0}
        key={0}
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
        <Label
          x={xLabelPosition[0]}
          y={xLabelPosition[1]}
          text="Time"
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
        {/* <ClickCallback
          enabled
          onClick={this.handleChartClick}
        /> */}
      </Chart>
    ];

    this.epCharts.forEach((chart, i) => {
      const index = i + 1;
      const edgeRight = width - margin.right;
      const axisAt = edgeRight - (index * yAxisWidth);
      const edgeIndicatorDx = (i * -yAxisWidth) + ((this.epCharts.length - 1) * yAxisWidth);
      const yRange = [
        _get(chart, 'yAxis.min', 0),
        _get(chart, 'yAxis.max')
      ];
      const label = _get(chart, 'yAxis.label');
      const hasGrid = typeof chart.grid !== 'undefined';
      const dx = axisAt + (yAxisWidth - 5);
      charts.push(
        <Chart
          id={index}
          key={index}
          yExtents={d => _map(chart.yKeys, key => _get(d, [key, 'value']))}
        >
          <Label
            x={dx}
            y={(height - margin.top - margin.bottom) / 2}
            rotate={-90}
            text={label}
          />
          <YAxis
            axisAt={axisAt}
            orient="right"
            ticks={5}
            stroke="#000000"
            range={yRange}
            displayFormat={format('.2f')}
            zoomEnabled={!disableZoom}
            {...hasGrid ? yGrid : {}}
          />
          {this.getLineComponents(chart.lines, edgeIndicatorDx)}
        </Chart>
      );
    });

    return charts;
  }

  getLineComponents = (lines = [], dx) => lines.map(({
      key, color, lineSize = 1,
      pointsStyle, pointsSize, lineStyle
    }) => (
      <div key={key}>
        <LineSeries
          key={`line${key}`}
          yAccessor={d => _get(d, [key, 'value'])}
          connectNulls
          highlightOnHover
          onClick={this.handleLineClick}
          onDoubleClick={this.handleLineDoubleClick}
          onContextMenu={this.handleLineRightClick}
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
        <EdgeIndicator
          itemType="last"
          orient="right"
          edgeAt="right"
          dx={dx}
          displayFormat={format('.2f')}
          yAccessor={d => _get(d, [key, 'value'])}
          fill={color}
        />
      </div>
    ));

  epCharts = [];

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

  handleLineRightClick = (e) => {
    console.log('handleLineRightClick', e);
  }

  handleLineClick = (e) => {
    console.log('handleLineClick', e);
  }

  handleLineDoubleClick = (e) => {
    console.log('handleLineDoubleClick', e);
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
    const { lower, upper } = visuWindow;
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
    const marginRight = margin.right + (this.epCharts.length * yAxisWidth);

    return (
      <div
        style={{ height: '100%' }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <ChartCanvas
          plotFull={false}
          ratio={1}
          width={width}
          height={height}
          margin={{ ...margin, right: marginRight }}
          seriesName="PlotView"
          data={columns}
          type="hybrid"
          xAccessor={this.xAccessor}
          xScale={scaleTime()}
          disableZoomEvent={disableZoom}
          xExtents={[new Date(lower), new Date(upper)]}
        >
          {this.getCharts()}
          <CrossHairCursor opacity={1} />
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
