import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _get from 'lodash/get';
import _map from 'lodash/map';
// import _remove from 'lodash/remove';
import Dimensions from 'react-dimensions';
import { format } from 'd3-format';
import { scaleTime } from 'd3-scale';
import getLogger from 'common/log';
import {
  DEFAULT_FIELD,
  DEFAULT_COM_OBJECT,
} from 'common/constants';
import {
  ChartCanvas, Chart, series, annotation,
  coordinates, axes as StockchartsAxes, tooltip,
  // interactive
} from 'react-stockcharts';
import { hexToRGBA } from 'react-stockcharts/lib/utils';
import _omit from 'lodash/omit';
import {
  getLines,
  getLineMarker,
  getLineMarkerProps,
  zoomDateFormat,
  fullDateFormat,
  getLineStyle,
  getEntryPointsCharts,
  drawBadge,
} from './helper';
import { monitoringStateColors } from '../../../lib/windowProcess/common/colors';
import { addEntryPoint } from '../../../lib/store/actions/views';
import DroppableContainer from '../../../lib/windowProcess/View/DroppableContainer';
import { getPlotViewData } from '../../../lib/store/selectors/views';

const logger = getLogger('view:plot');

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
const margin = { left: 20, right: 20, top: 20, bottom: 40 };
const yAxisWidth = 55;
const edgeIndicatorArrowWidth = 10;
const tooltipYMargin = 5;
const badgeWidth = 30;

// parse clipboard data to create partial entry point
function parseDragData(data) {
  return {
    name: data.item,
    connectedDataX: {
      formula: `${data.catalogName}.${data.item}<${DEFAULT_COM_OBJECT}>.groundDate`,
    },
    connectedDataY: {
      formula: `${data.catalogName}.${data.item}<${DEFAULT_COM_OBJECT}>.${DEFAULT_FIELD}`,
    },
  };
}

class PlotView extends PureComponent {
  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    data: PropTypes.shape({
      lines: PropTypes.array, // eslint-disable-line react/no-unused-prop-types
      columns: PropTypes.array, // eslint-disable-line react/no-unused-prop-types
    }),
    visuWindow: PropTypes.shape({
      lower: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
      current: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
      upper: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    }).isRequired,
    viewId: PropTypes.string,
    addEntryPoint: PropTypes.func,
    configuration: PropTypes.shape({
      type: PropTypes.string.isRequired,
      links: PropTypes.array,
      procedures: PropTypes.array,
      defaultRatio: PropTypes.shape({
        length: PropTypes.number,
        width: PropTypes.number
      }),
      entryPoints: PropTypes.array,
      axes: PropTypes.object,
      showYAxes: PropTypes.string,
      grids: PropTypes.array,
      title: PropTypes.string,
      titleStyle: PropTypes.shape({
        font: PropTypes.string,
        size: PropTypes.number,
        bold: PropTypes.bool,
        italic: PropTypes.bool,
        underline: PropTypes.bool,
        strikeOut: PropTypes.bool,
        align: PropTypes.string,
        color: PropTypes.string
      }),
      backgroundColor: PropTypes.string,
      legend: PropTypes.object,
      markers: PropTypes.array,
    }).isRequired,
  };

  static defaultProps = {
    data: {
      lines: [],
      columns: []
    }
  };

  state = {
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

  onDrop(e) {
    const data = e.dataTransfer.getData('application/json');
    const content = JSON.parse(data);

    // eslint-disable-next-line no-console
    this.props.addEntryPoint(
      this.props.viewId,
      parseDragData(content)
    );
  }

  getGrid() {
    const {
      configuration,
      containerWidth,
      containerHeight,
    } = this.props;
    const isDisplayed = _get(configuration, 'grids[0].showGrid', false);

    if (!isDisplayed) {
      return {
        x: {},
        y: {}
      };
    }
    const gridHeight = containerHeight - margin.top - margin.bottom;
    const gridWidth = containerWidth - margin.left - margin.right
      - (this.epCharts.length * yAxisWidth);
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
      containerWidth,
      containerHeight,
      configuration: { showYAxes }
    } = this.props;

    const { disableZoom } = this.state;
    const { y: yGrid, x: xGrid } = this.getGrid();
    let xAxisWidth;
    if (showYAxes === 'left') {
      xAxisWidth = (margin.left - margin.right) + (this.epCharts.length * yAxisWidth);
    } else if (showYAxes === 'right') {
      xAxisWidth = containerWidth - margin.left - margin.right
        - (this.epCharts.length * yAxisWidth);
    } else {
      xAxisWidth = containerWidth - margin.left - margin.right;
    }
    const xLabelPosition = [
      xAxisWidth / 2,
      containerHeight - 30
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
        {showYAxes && <MouseCoordinateY
          at={showYAxes}
          orient={showYAxes}
          dx={showYAxes === 'left' ? 10 : -10}
          rectWidth={yAxisWidth}
          displayFormat={format('.2f')}
        />}
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
      const chartWidth = containerWidth - margin.right - margin.left;
      const AxesWidth = this.epCharts.length * yAxisWidth;
      let dx;
      let axisAt;
      let edgeIndicatorDx;
      let edgeIndicatorType;
      let edgeIndicatorOrient;
      let edgeIndicatorEdgeAt;
      if (showYAxes === 'left') {
        axisAt = (index * yAxisWidth) - AxesWidth;
        edgeIndicatorType = 'first';
        edgeIndicatorOrient = 'left';
        edgeIndicatorEdgeAt = 'left';
        edgeIndicatorDx = (index * yAxisWidth) - (AxesWidth - edgeIndicatorArrowWidth);
        dx = axisAt - (yAxisWidth - 10);
      } else if (showYAxes === 'right') {
        axisAt = chartWidth - (index * yAxisWidth);
        edgeIndicatorType = 'last';
        edgeIndicatorOrient = 'right';
        edgeIndicatorEdgeAt = 'right';
        edgeIndicatorDx = (index * -yAxisWidth) + (AxesWidth - edgeIndicatorArrowWidth);
        dx = axisAt + (yAxisWidth - 5);
      }

      const hasGrid = typeof chart.grid !== 'undefined';
      const autoLimits = _get(chart, 'yAxis.autoLimits');
      const showTicks = _get(chart, 'yAxis.showTicks', true);
      const autoTick = _get(chart, 'yAxis.autoTick', true);
      const tickStep = _get(chart, 'yAxis.tickStep');
      const label = _get(chart, 'yAxis.label');
      const unit = _get(chart, 'yAxis.unit');
      const yExtents = autoLimits
        ? d => _map(chart.yKeys, key => _get(d, [key, 'value']))
        : [
          _get(chart, 'yAxis.min', 0),
          _get(chart, 'yAxis.max')
        ];

      charts.push(
        <Chart
          id={index}
          key={index}
          yScale={chart.yScale}
          yExtents={yExtents}
        >
          {showYAxes && <Label
            x={dx}
            y={(containerHeight - margin.top - margin.bottom) / 2}
            rotate={-90}
            text={
              [label, ((unit && unit.length ? `(${unit})` : ''))].join(' ')
            }
          />}
          {showYAxes && <YAxis
            axisAt={axisAt}
            orient={showYAxes}
            ticks={5}
            stroke="#000000"
            showTicks={showTicks}
            tickInterval={autoTick ? undefined : tickStep}
            showDomain
            displayFormat={format('.2f')}
            zoomEnabled={!disableZoom}
            {...hasGrid ? yGrid : {}}
          />}
          {this.getLineComponents(chart.lines, {
            showYAxes,
            edgeIndicatorDx,
            edgeIndicatorType,
            edgeIndicatorOrient,
            edgeIndicatorEdgeAt
          })}
        </Chart>
      );
    });

    return charts;
  }

  getLineComponents = (lines = [], {
    showYAxes, edgeIndicatorDx, edgeIndicatorType,
    edgeIndicatorOrient, edgeIndicatorEdgeAt
  }) => lines.map(({
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
        {showYAxes && <CurrentCoordinate
          key={`coordinate${key}`}
          yAccessor={d => _get(d, [key, 'value'])}
          fill={color}
        />}
        {showYAxes && <EdgeIndicator
          itemType={edgeIndicatorType}
          orient={edgeIndicatorOrient}
          edgeAt={edgeIndicatorEdgeAt}
          dx={edgeIndicatorDx}
          rectWidth={yAxisWidth}
          displayFormat={format('.2f')}
          yAccessor={d => _get(d, [key, 'value'])}
          fill={color}
        />}
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
        fillValue: _get(
          currentItem,
          [line.key, 'color'],
          _get(monitoringStateColors, _get(currentItem, [line.key, 'monit']))
        ),
        stroke: line.color,
      })),
  });

  shouldRender() {
    const {
      containerWidth,
      containerHeight,
      data,
    } = this.props;

    if (containerWidth <= 0 || containerHeight <= 0) {
      return `invisible size received ${containerWidth}x${containerHeight}`;
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

  /* eslint-disable no-param-reassign */
  // eslint-disable-next-line class-methods-use-this
  tooltipCanvas({ fontFamily, fontSize, fontFill }, content, ctx) {
    const startY = 10 + (fontSize * 0.9);

    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = fontFill;
    ctx.textAlign = 'left';
    ctx.fillText(content.x, 10, startY);

    for (let i = 0; i < content.y.length; i += 1) {
      const y = content.y[i];
      const textY = startY + ((fontSize + tooltipYMargin) * (i + 1));
      ctx.fillStyle = y.stroke || fontFill;
      ctx.fillText(y.label, 10, textY);

      ctx.fillStyle = fontFill;
      const value = `: ${y.value}`;
      ctx.fillText(value, 10 + ctx.measureText(y.label).width, textY);

      drawBadge({
        ctx,
        text: '',
        radius: 5,
        fillColor: y.fillValue,
        x: 10 + ctx.measureText(y.label).width + ctx.measureText(value).width + 5,
        y: textY - fontSize,
        margin: 0,
        width: 14,
        height: 14,
      });
    }
  }
  /* eslint-enable-next-line no-param-reassign */

  // eslint-disable-next-line class-methods-use-this
  backgroundShapeCanvas(props, { width, height }, ctx) {
    const { fill, stroke, opacity } = props;
    ctx.fillStyle = hexToRGBA(fill, opacity);
    ctx.strokeStyle = stroke;
    ctx.beginPath();
    ctx.rect(0, 0, width + badgeWidth, height + (this.lines.length * tooltipYMargin));
    ctx.fill();
    ctx.stroke();
  }

  render() {
    logger.debug('render');
    const noRender = this.shouldRender();

    if (noRender) {
      logger.warn('no render due to', noRender);
      // TODO : clean message component
      return (
        <DroppableContainer
          onDrop={this.onDrop.bind(this)}
        >
          unable to render plot: {noRender}
        </DroppableContainer>
      );
    }
    const {
      containerWidth,
      containerHeight,
      data: { columns },
      visuWindow: { lower, upper },
      configuration: { showYAxes }
    } = this.props;
    const {
      disableZoom,
      // isMenuOpened,
      // menuPosition
    } = this.state;
    // const menuOpenOnTop = menuPosition.y >= (height / 2);
    // const menuOpenOnLeft = menuPosition.x >= (width / 2);
    let marginChart;
    if (showYAxes === 'left') {
      const marginLeft = margin.left + (this.epCharts.length * yAxisWidth);
      marginChart = { ...margin, left: marginLeft };
    } else if (showYAxes === 'right') {
      const marginRight = margin.right + (this.epCharts.length * yAxisWidth);
      marginChart = { ...margin, right: marginRight };
    } else {
      marginChart = { ...margin };
    }

    return (
      <DroppableContainer
        style={{ height: '100%' }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onDrop={this.onDrop.bind(this)}
        text={'add entry point'}
      >
        <ChartCanvas
          plotFull={false}
          ratio={1}
          width={containerWidth}
          height={containerHeight}
          margin={marginChart}
          pointsPerPxThreshold={4}
          seriesName="PlotView"
          data={columns}
          type="hybrid"
          xAccessor={this.xAccessor}
          xScale={scaleTime()}
          yAxisZoom={(id, domain) => console.log('zoom', id, domain)}
          disableZoomEvent={disableZoom}
          xExtents={[new Date(lower), new Date(upper)]}
        >
          {this.getCharts()}
          <CrossHairCursor opacity={1} />
          <HoverTooltip
            tooltipContent={this.handleTooltipContent}
            opacity={1}
            fill="#FFFFFF"
            stroke="#F0F0F0"
            tooltipCanvas={this.tooltipCanvas}
            backgroundShapeCanvas={this.backgroundShapeCanvas.bind(this)}
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
      </DroppableContainer>
    );
  }
}

const SizeablePlotView = Dimensions()(PlotView);

export default connect(
  state => ({
    state
  }),
  dispatch => bindActionCreators({
    addEntryPoint
  }, dispatch),
  (stateProps, dispatchProps, ownProps) => {
    const data = getPlotViewData(stateProps.state, ownProps.viewId); // eslint-disable-line
    return _omit({
      ...stateProps,
      ...dispatchProps,
      ...ownProps,
      data
    }, ['state']);
  }
)(SizeablePlotView); // eslint-disable-line new-cap
