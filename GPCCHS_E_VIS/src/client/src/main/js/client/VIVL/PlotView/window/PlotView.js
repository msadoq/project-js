import React, { PureComponent, PropTypes } from 'react';
import { Button, Label as BsLabel } from 'react-bootstrap';
import _ from 'lodash/fp';
import _get from 'lodash/get';
import _map from 'lodash/map';
import classnames from 'classnames';
import Dimensions from 'react-dimensions';
import { format } from 'd3-format';
import { scaleTime } from 'd3-scale';
import getLogger from 'common/log';
import {
  DEFAULT_FIELD,
} from 'common/constants';
import {
  ChartCanvas, Chart, series, annotation,
  coordinates, axes as StockchartsAxes, tooltip,
  // interactive
} from 'react-stockcharts';
import { hexToRGBA } from 'react-stockcharts/lib/utils';

import getDynamicObject from '../../../lib/windowProcess/common/getDynamicObject';
import {
  getLines,
  getLineMarker,
  getLineMarkerProps,
  fullDateFormat,
  getLineStyle,
  getEntryPointsCharts,
  drawBadge,
  zoomDateFormat,
} from './helper';
import { monitoringStateColors } from '../../../lib/windowProcess/common/colors';
import DroppableContainer from '../../../lib/windowProcess/common/DroppableContainer';
import { Danger } from '../../../lib/windowProcess/View/Alert';
import styles from './PlotView.css';

const logger = getLogger('view:plot');

const {
  LineSeries, ScatterSeries, StraightLine
} = series;
const { Label } = annotation;
const { HoverTooltip } = tooltip;
const {
  MouseCoordinateX,
  MouseCoordinateY,
  CrossHairCursor,
  CurrentCoordinate,
  EdgeIndicator
} = coordinates;
// const { ClickCallback } = interactive;
const { XAxis, YAxis } = StockchartsAxes;
const margin = { left: 20, right: 20, top: 20, bottom: 40 };
const yAxisWidth = 55;
const edgeIndicatorArrowWidth = 10;
const tooltipYMargin = 5;
const badgeWidth = 30;

const getComObject =
  _.propOr('UNKNOWN_COM_OBJECT', 0);

const format2f = format('.2f');
// parse clipboard data to create partial entry point
function parseDragData(data) {
  return {
    name: data.item,
    connectedDataX: {
      formula: `${data.catalogName}.${data.item}<${getComObject(data.comObjects)}>.groundDate`,
    },
    connectedDataY: {
      formula: `${data.catalogName}.${data.item}<${getComObject(data.comObjects)}>.${DEFAULT_FIELD}`,
    },
  };
}

function onYAxisZoom(id, domain) {
  // eslint-disable-next-line no-console
  console.log('zoom', id, domain);
}

export class PlotView extends PureComponent {
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
    }),
    viewId: PropTypes.string,
    addEntryPoint: PropTypes.func,
    entryPoints: PropTypes.array,
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

  constructor(...args) {
    super(...args);
    this.state = {
      xExtents: [
        new Date(this.props.visuWindow.lower),
        new Date(this.props.visuWindow.upper),
      ],
      disableZoom: true,
      isMenuOpened: false,
      disconnected: false,
      zoomedOrPanned: false,
      menuPosition: {
        x: 0,
        y: 0
      }
    };
  }

  componentWillMount() {
    this.lines = getLines(this.props.configuration.entryPoints);
    this.epCharts = getEntryPointsCharts(this.props.configuration);
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleOnKeyDown);
    document.body.addEventListener('keyup', this.handleOnKeyUp);
    document.body.addEventListener('wheel', this.handleOnWheel);
    document.body.addEventListener('mousedown', this.handleOnMouseDown);
  }

  componentWillReceiveProps(nextProps) {
    const {
      configuration: { entryPoints, axes },
      visuWindow,
    } = this.props;

    const nextVisuWindow = nextProps.visuWindow;

    if (entryPoints !== nextProps.configuration.entryPoints) {
      this.lines = getLines(this.props.configuration.entryPoints);
    }
    if (axes !== nextProps.configuration.axes) {
      this.epCharts = getEntryPointsCharts(nextProps.configuration);
    }

    const willSetState = {};

    if (this.state.zoomedOrPanned) {
      // We have to set new lower / upper so zoom mode is quit
      willSetState.zoomedOrPanned = false;
      willSetState.xExtents = [
        new Date(nextVisuWindow.lower - Math.round(Math.random() * 20)),
        new Date(nextVisuWindow.upper + Math.round(Math.random() * 20))
      ];

    // reset xExtents only if new lower / upper
    } else if (
      !this.state.xExtents ||
      (
        visuWindow.lower !== nextVisuWindow.lower ||
        visuWindow.upper !== nextVisuWindow.upper
      )
    ) {
      willSetState.xExtents = [
        new Date(nextVisuWindow.lower),
        new Date(nextVisuWindow.upper),
      ];
    }

    this.setState(willSetState);
  }

  shouldComponentUpdate(nextProps) {
    const { disconnected, zoomedOrPanned } = this.state;
    const {
      data,
      entryPoints,
      visuWindow,
      configuration,
      containerWidth,
      containerHeight,
    } = this.props;
    if (disconnected || zoomedOrPanned) {
      return false;
    }
    if (
      data === nextProps.data &&
      entryPoints === nextProps.entryPoints &&
      visuWindow === nextProps.visuWindow &&
      configuration === nextProps.configuration &&
      containerWidth === nextProps.containerWidth &&
      containerHeight === nextProps.containerHeight
    ) {
      return false;
    }
    return true;
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleOnKeyDown);
    document.body.removeEventListener('keyup', this.handleOnKeyUp);
    document.body.removeEventListener('wheel', this.handleOnWheel);
    document.body.removeEventListener('mousedown', this.handleOnMouseDown);
  }

  onDrop = this.drop.bind(this);

  onBackgroundShapeCanvas = this.backgroundShapeCanvas.bind(this);

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

  getEntryPointErrors(supClass = '') {
    const epWithErrors = this.props.entryPoints
      .filter(ep => ep.error);

    return epWithErrors.length ?
      <Danger
        className={classnames(
          'z100',
          'mb10',
          'w100',
          'posAbsolute',
          supClass
        )}
      >
        <div>
          {epWithErrors
            .map((ep, i) => (
              <div
                className={styles.entryPointErrorSubDiv}
                key={i}
              >
                {ep.name}: {ep.error}
              </div>
            ))}
        </div>
      </Danger> : undefined;
  }

  getYCharts = () => {
    const {
      containerWidth,
      containerHeight,
      configuration: { showYAxes }
    } = this.props;
    const { disableZoom } = this.state;
    const { y: yGrid } = this.getGrid();

    return this.epCharts.map((chart, i) => {
      const index = i + 1;
      const chartWidth = containerWidth - margin.right - margin.left;
      const AxesWidth = this.epCharts.length * yAxisWidth;
      let axisAt;
      let edgeIndicatorDx;
      if (showYAxes === 'left') {
        axisAt = (index * yAxisWidth) - AxesWidth;
        edgeIndicatorDx = (index * yAxisWidth) - (AxesWidth - edgeIndicatorArrowWidth);
      } else if (showYAxes === 'right') {
        axisAt = chartWidth - (index * yAxisWidth);
        edgeIndicatorDx = (index * -yAxisWidth) + (AxesWidth - edgeIndicatorArrowWidth);
      }

      const align = _get(chart, 'yAxis.style.align', 'center');
      const pxHeight = containerHeight - margin.top - margin.bottom;
      const yExtents =
        _get(chart, 'yAxis.autoLimits') ?
        d => _map(chart.yKeys, key => _get(d, [key, 'value']))
        :
        [
          _get(chart, 'yAxis.min', 0),
          _get(chart, 'yAxis.max')
        ];

      return (<Chart
        id={index}
        key={index}
        yScale={chart.yScale}
        yExtents={yExtents}
      >
        {showYAxes && <Label
          x={{
            left: axisAt - (yAxisWidth - 10),
            right: axisAt + (yAxisWidth - 5),
          }[showYAxes]}
          y={{
            left: pxHeight - margin.top,
            right: margin.top,
          }[align] || pxHeight / 2}
          rotate={-90}
          fill={_get(chart, 'yAxis.style.color', '#000000')}
          text={
            [
              _get(chart, 'yAxis.label'),
              (_get(chart, 'yAxis.unit') ? `(${_get(chart, 'yAxis.unit')})` : '')
            ].join(' ')
          }
          fontSize={_get(chart, 'yAxis.style.size', 12)}
          fontFamily={_get(chart, 'yAxis.style.font', 'Arial')}
        />}
        {showYAxes && <YAxis
          axisAt={axisAt}
          orient={showYAxes}
          ticks={5}
          stroke="#000000"
          showTicks={_get(chart, 'yAxis.showTicks', true)}
          tickInterval={_get(chart, 'yAxis.autoTick', true) ? undefined : _get(chart, 'yAxis.tickStep')}
          showDomain
          displayFormat={format2f}
          zoomEnabled={!disableZoom}
          {...(typeof chart.grid !== 'undefined' ? yGrid : {})}
        />}
        {this.getLineComponents(chart.lines, {
          showYAxes,
          edgeIndicatorDx,
          edgeIndicatorType: { left: 'first', right: 'last' }[showYAxes],
          edgeIndicatorOrient: ['left', 'right'].includes(showYAxes) ? showYAxes : undefined,
          edgeIndicatorEdgeAt: ['left', 'right'].includes(showYAxes) ? showYAxes : undefined,
        })}
      </Chart>
      );
    });
  }

  getXChart = () => {
    const {
      visuWindow: { current },
      containerWidth,
      containerHeight,
      configuration,
      configuration: { showYAxes },
    } = this.props;

    const {
      disableZoom,
    } = this.state;
    const { x: xGrid } = this.getGrid();

    let xAxisWidth = containerWidth - margin.left - margin.right;
    if (showYAxes === 'left' || showYAxes === 'right') {
      xAxisWidth = (containerWidth - margin.left - margin.right)
        - (this.epCharts.langth * yAxisWidth);
    }

    const xLabelAlign = _get(configuration, 'axes.Time.style.align', 'center');
    const xLabelColor = _get(configuration, 'axes.Time.style.color', '#000000');
    const xLabelFontSize = _get(configuration, 'axes.Time.style.size', 12);
    const xLabelFontFamily = _get(configuration, 'axes.Time.style.font', 'Arial');
    let xLabelPosition = [xAxisWidth / 2, containerHeight - 30];
    if (xLabelAlign === 'left') {
      xLabelPosition = [margin.left, containerHeight - 30];
    } else if (xLabelAlign === 'right') {
      xLabelPosition = [xAxisWidth - margin.left, containerHeight - 30];
    }

    return (<Chart
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
        fill={xLabelColor}
        fontSize={xLabelFontSize}
        fontFamily={xLabelFontFamily}
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
        displayFormat={format2f}
      />}
      <StraightLine
        type="vertical"
        xValue={current}
        stroke="#0ee61f"
        strokeWidth={2}
        opacity={1}
      />
    </Chart>);
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
          displayFormat={format2f}
          yAccessor={d => _get(d, [key, 'value'])}
          fill={color}
        />}
      </div>
    ));

  drop(e) {
    const data = e.dataTransfer.getData('text/plain');
    const content = JSON.parse(data);

    if (!_get(content, 'catalogName')) {
      return;
    }

    // eslint-disable-next-line no-console
    this.props.addEntryPoint(
      this.props.viewId,
      parseDragData(content)
    );

    e.stopPropagation();
  }

  epCharts = [];

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
        value: _get(currentItem, [line.key, 'symbol']) ? _get(currentItem, [line.key, 'symbol'])
                                                       : _get(currentItem, [line.key, 'value']),
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
      visuWindow,
    } = this.props;

    if (containerWidth <= 0 || containerHeight <= 0) {
      return `invisible size received ${containerWidth}x${containerHeight}`;
    }
    if (!visuWindow) {
      return 'No vizualisation window';
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

  reconnect = () => {
    this.setState({
      disconnected: false
    });
    this.forceUpdate();
  }

  disconnect = () => {
    this.setState({
      zoomedOrPanned: true
    });
    /*
    this.setState({
      disconnected: true
    });
    */
  }

  handleOnMouseDown = () => {
    if (!this.state.disconnected && this.el &&
      this.el.parentElement.querySelector(':hover')) {
      this.disconnect();
    }
  }

  handleOnWheel = () => {
    if (!this.state.disconnected
      && this.el.parentElement.querySelector(':hover')) {
      this.disconnect();
    }
  }

  handleOnKeyUp = (e) => {
    const { disableZoom } = this.state;
    if (e.keyCode === 17 && !disableZoom
      && this.el.parentElement.querySelector(':hover')) {
      this.setState({ disableZoom: true });
      this.forceUpdate();
    }
  }

  handleOnKeyDown = (e) => {
    const { disableZoom } = this.state;
    if (e.keyCode === 17 && disableZoom
      && this.el.parentElement.querySelector(':hover')) {
      this.setState({ disableZoom: false });
      this.forceUpdate();
    }
  }

  handleLineRightClick = (e) => {
    console.log('handleLineRightClick', e); // eslint-disable-line no-console
  }

  handleLineClick = (e) => {
    console.log('handleLineClick', e); // eslint-disable-line no-console
  }

  handleLineDoubleClick = (e) => {
    console.log('handleLineDoubleClick', e); // eslint-disable-line no-console
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
          onDrop={this.onDrop}
          className={styles.errorContent}
        >
          {this.getEntryPointErrors()}
          <div className="flex">
            <div className={styles.renderErrorText}>
              Unable to render view <br />
              {noRender}
            </div>
          </div>
        </DroppableContainer>
      );
    }
    const {
      containerWidth,
      containerHeight,
      data: { columns },
      configuration: { showYAxes },
    } = this.props;
    const {
      disableZoom,
      disconnected,
      zoomedOrPanned,
      xExtents,
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
    marginChart = getDynamicObject()(marginChart);

    return (
      <DroppableContainer
        onDrop={this.onDrop}
        text="add entry point"
        className={classnames(
          { [styles.disconnected]: disconnected || zoomedOrPanned },
          'h100',
          'posRelative',
        )}
      >
        <div
          ref={(el) => { this.el = el; }}
        >
          {zoomedOrPanned &&
            <BsLabel
              bsStyle="danger"
              bsSize="xs"
              className={styles.disconnectedButton}
            >Zoomed / moved</BsLabel>
          }
          {disconnected &&
            <Button
              bsStyle="danger"
              bsSize="xs"
              className={styles.disconnectedButton}
              onClick={this.reconnect}
            >Reconnect</Button>
          }
          {this.getEntryPointErrors(styles.entryPointError)}
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
            yAxisZoom={onYAxisZoom}
            zoomEvent={!disableZoom}
            xExtents={xExtents}
          >
            {
              [this.getXChart()]
                .concat(this.getYCharts())
            }
            <CrossHairCursor opacity={1} />
            <HoverTooltip
              tooltipContent={this.handleTooltipContent}
              opacity={1}
              fill="#FFFFFF"
              stroke="#F0F0F0"
              tooltipCanvas={this.tooltipCanvas}
              backgroundShapeCanvas={this.onBackgroundShapeCanvas}
              bgwidth={160}
              bgheight={50}
            />
          </ChartCanvas>
        </div>
      </DroppableContainer>
    );
  }
}

const SizeablePlotView = Dimensions()(PlotView);

export default SizeablePlotView;

/** @TODO Uncomment when implementing markers! do the same for the Editor PlotTab part.
 <PlotMenu
 isOpened={isMenuOpened}
 openOnLeft={menuOpenOnLeft}
 openOnTop={menuOpenOnTop}
 mousePosition={menuPosition}
 >
 {disconnected &&
 <Button
 bsStyle="danger"
 bsSize="xs"
 className={styles.disconnectedButton}
 onClick={this.reconnect}
 >Reconnect</Button>
 }
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
 zoomEvent={!disableZoom}
 xExtents={[new Date(lower), new Date(upper)]}
 >
 {this.getCharts()}
 <CrossHairCursor opacity={1} />
 <HoverTooltip
 tooltipContent={this.handleTooltipContent}
 opacity={1}
 fill="#FFFFFF"
 stroke="#F0F0F0"
 bgwidth={160}
 bgheight={50}
 tooltipCanvas={this.tooltipCanvas}
 backgroundShapeCanvas={this.backgroundShapeCanvas.bind(this)}
 />
 </ChartCanvas>
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
*/
