import React, { PureComponent, PropTypes } from 'react';
import { Label as BsLabel } from 'react-bootstrap';
import _ from 'lodash/fp';
import _get from 'lodash/get';
import _map from 'lodash/map';
import classnames from 'classnames';
import Dimensions from 'react-dimensions';
import { format } from 'd3-format';
import { scaleTime } from 'd3-scale';
import getLogger from 'common/log';
import { get } from 'common/parameters';
import {
  ChartCanvas, Chart, series, annotation,
  coordinates, axes as StockchartsAxes, tooltip,
  utils,
  // interactive
} from 'react-stockcharts';

import getDynamicObject from '../../common/getDynamicObject';
import GrizzlyChart from './Grizzly/Chart';

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
import { stateColors } from '../../common/colors';
import DroppableContainer from '../../common/DroppableContainer';
import CloseableAlert from '../CloseableAlert';
import styles from './PlotView.css';
import { getEntryPointColorObj } from '../../../store/selectors/views';

const logger = getLogger('view:plot');

// const renderMethod = 'grizzly';
const renderMethod = 'classic';

const {
  LineSeries, ScatterSeries, StraightLine,
} = series;
const { Label } = annotation;
const { HoverTooltip } = tooltip;
const { hexToRGBA } = utils;
const {
  MouseCoordinateX,
  MouseCoordinateY,
  CrossHairCursor,
  CurrentCoordinate,
  EdgeIndicator,
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
      formula: `${data.catalogName}.${data.item}<${getComObject(data.comObjects)}>.${get('DEFAULT_FIELD')[getComObject(data.comObjects)]}`,
    },
  };
}

function onYAxisZoom(/* id, domain */) {
  // console.log('zoom', id, domain);
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
    }).isRequired,
    viewId: PropTypes.string.isRequired,
    addEntryPoint: PropTypes.func.isRequired,
    entryPoints: PropTypes.arrayOf(PropTypes.shape({
      connectedDataX: PropTypes.shape({
        axisId: PropTypes.string,
        digits: PropTypes.number,
        domain: PropTypes.string,
        filter: PropTypes.arrayOf(PropTypes.shape({
          field: PropTypes.string,
          operand: PropTypes.string,
          operator: PropTypes.string,
        })),
        format: PropTypes.string,
        formula: PropTypes.string,
        timeline: PropTypes.string,
        unit: PropTypes.string,
      }),
      connectedDataY: PropTypes.shape({
        axisId: PropTypes.string,
        digits: PropTypes.number,
        domain: PropTypes.string,
        filter: PropTypes.arrayOf(PropTypes.shape({
          field: PropTypes.string,
          operand: PropTypes.string,
          operator: PropTypes.string,
        })),
        format: PropTypes.string,
        formula: PropTypes.string,
        timeline: PropTypes.string,
        unit: PropTypes.string,
      }),
      name: PropTypes.string,
      id: PropTypes.string,
    })).isRequired,
    configuration: PropTypes.shape({
      type: PropTypes.string.isRequired,
      links: PropTypes.array,
      procedures: PropTypes.array,
      defaultRatio: PropTypes.shape({
        length: PropTypes.number,
        width: PropTypes.number,
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
        color: PropTypes.string,
      }),
      backgroundColor: PropTypes.string,
      legend: PropTypes.object,
      markers: PropTypes.array,
    }).isRequired,
    pointsPerPxThreshold: PropTypes.number,
  };

  static defaultProps = {
    data: {
      lines: [],
      columns: [],
    },
    pointsPerPxThreshold: 30,
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
      zoomedOrPanned: false,
      menuPosition: {
        x: 0,
        y: 0,
      },
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
        new Date(nextVisuWindow.upper + Math.round(Math.random() * 20)),
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

    if (!_.isEmpty(willSetState)) {
      this.setState(willSetState);
    }
  }

  shouldComponentUpdate(nextProps) {
    const { zoomedOrPanned } = this.state;
    if (zoomedOrPanned) {
      return false;
    }

    const {
      data,
      entryPoints,
      visuWindow,
      configuration,
      containerWidth,
      containerHeight,
    } = this.props;
    return !(
      data === nextProps.data &&
      entryPoints === nextProps.entryPoints &&
      visuWindow === nextProps.visuWindow &&
      configuration === nextProps.configuration &&
      containerWidth === nextProps.containerWidth &&
      containerHeight === nextProps.containerHeight
    );
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
        y: {},
      };
    }
    const gridHeight = containerHeight - margin.top - margin.bottom;
    const gridWidth = containerWidth - margin.left - margin.right
      - (this.epCharts.length * yAxisWidth);
    const lineConf = _get(configuration, 'grids[0].line', {});
    const common = {
      tickStrokeOpacity: 0.2,
      tickStrokeWidth: lineConf.size || 1,
      tickStrokeDasharray: getLineStyle(lineConf.style),
    };

    return {
      x: {
        innerTickSize: -1 * gridHeight,
        ...common,
      },
      y: {
        innerTickSize: -1 * gridWidth,
        ...common,
      },
    };
  }

  getEntryPointErrors(supClass = '') {
    const epWithErrors = this.props.entryPoints
      .filter(ep => ep.error);

    return epWithErrors.length ?
      <CloseableAlert
        bsStyle="danger"
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
            .map(ep => (
              <div
                className={styles.entryPointErrorSubDiv}
                key={ep.name}
              >
                {ep.name}: {ep.error}
              </div>
            ))}
        </div>
      </CloseableAlert> : undefined;
  }

  getYCharts = () => {
    const {
      containerWidth,
      containerHeight,
      configuration: { showYAxes },
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
          _get(chart, 'yAxis.max'),
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
              (_get(chart, 'yAxis.unit') ? `(${_get(chart, 'yAxis.unit')})` : ''),
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
          panEnabled={!disableZoom}
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
    edgeIndicatorOrient, edgeIndicatorEdgeAt,
  }) => lines.map(({
      key, color, lineSize = 1,
      pointsStyle, pointsSize, lineStyle,
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
            fill: color,
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
      .map((line) => {
        const customColor = _.prop('color')(
          getEntryPointColorObj({
            entryPoints: this.props.entryPoints,
            epName: line.key,
            value: _get(currentItem, [line.key, 'value']),
            dataProp: 'connectedDataY',
          })
        );

        const color = _.cond([
          [
            _.pipe(_.get('monit'), _.negate(_.eq('info'))),
            _.pipe(_.prop('monit'), _.prop(_, stateColors), _.defaultTo('#00FF00')),
          ],
          [_.pipe(_.get('color'), _.isString), _.prop('color')],
          [_.stubTrue, _.constant('#00FF00')],
        ])({
          monit: _.get([line.key, 'monit'], currentItem),
          color: customColor,
        });

        return {
          label: line.name,
          value: _get(currentItem, [line.key, 'symbol']) ? _get(currentItem, [line.key, 'symbol'])
                                                         : _get(currentItem, [line.key, 'value']),
          fillValue: color,
          stroke: line.color,
        };
      }),
  });

  shouldRender() {
    const {
      containerWidth,
      containerHeight,
      data,
      visuWindow,
    } = this.props;
    let info;
    if (containerWidth <= 0 || containerHeight <= 0) {
      info = `invisible size received ${containerWidth}x${containerHeight}`;
    }
    if (!visuWindow) {
      info = 'No vizualisation window';
    }
    if (!data.columns || !data.columns.length || data.columns.length < 2) {
      info = 'no point';
    }
    if (data.columns && data.columns.length < 2) {
      info = 'only one point';
    }

    if (!this.lines || !this.lines.length) {
      info = 'invalid view configuration';
    }
    return info;
  }

  xAccessor = (d) => {
    let toReturn = 'data undefined';
    if (typeof d === 'undefined' || typeof d.x === 'undefined') {
      logger.debug('empty point received');
    } else {
      toReturn = new Date(d.x);
    }
    return toReturn;
  };

  reconnect = () => {
    this.setState({
      zoomedOrPanned: false,
    });
    this.forceUpdate();
  }

  disconnect = () => {
    this.setState({
      zoomedOrPanned: true,
    });
    this.forceUpdate();
  }

  handleOnMouseDown = () => {
    if (!this.state.zoomedOrPanned && this.el &&
      this.el.parentElement.querySelector(':hover')) {
      this.disconnect();
    }
  }

  handleOnWheel = () => {
    if (!this.state.zoomedOrPanned && this.el
      && this.el.parentElement.querySelector(':hover')) {
      this.disconnect();
    }
  }

  handleOnKeyUp = (e) => {
    const { disableZoom } = this.state;
    if (e.keyCode === 17 && !disableZoom && this.el
      && this.el.parentElement.querySelector(':hover')) {
      this.setState({ disableZoom: true });
      this.forceUpdate();
    }
  }

  handleOnKeyDown = (e) => {
    const { disableZoom } = this.state;
    if (e.keyCode === 17 && disableZoom && this.el
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
        y: e.mouseXY[1] + margin.top,
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  tooltipCanvas({ fontFamily, fontSize, fontFill }, content, context) {
    const startY = 10 + (fontSize * 0.9);
    const ctx = context;

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

  // eslint-disable-next-line class-methods-use-this
  backgroundShapeCanvas(props, { width, height }, context) {
    const { fill, stroke, opacity } = props;
    const ctx = context;
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
      logger.debug('no render due to', noRender);
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
      entryPoints,
      data: { columns },
      configuration: { showYAxes, axes, grids },
      visuWindow,
    } = this.props;
    const {
      disableZoom,
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

    if (renderMethod === 'grizzly') {
      const yAxes = Object.values(axes).filter(a => a.label !== 'Time');

      return (
        <DroppableContainer
          onDrop={this.onDrop}
          text="add entry point"
          className={classnames(
            { [styles.disconnected]: zoomedOrPanned },
            'h100',
            'posRelative'
          )}
        >
          <GrizzlyChart
            uniqueId="aaaa-bbb"
            height={containerHeight}
            width={containerWidth}
            xExtends={[visuWindow.lower, visuWindow.upper]}
            current={visuWindow.current}
            yAxesAt={showYAxes}
            xAxisAt="bottom"
            yAxes={yAxes.map((axis) => {
              const grid = grids.find(g => g.yAxisId === axis.id || g.yAxisId === axis.label);
              return {
                id: axis.id || axis.label,
                yExtends: [axis.min, axis.max],
                orient: 'top',
                showAxis: axis.showAxis === true,
                showTicks: axis.showTicks === true,
                autoLimits: axis.autoLimits === true,
                showGrid: _get(grid, 'showGrid', false),
                gridStyle: _get(grid, ['line', 'style'], 'Continuous'),
                gridSize: _get(grid, ['line', 'size'], 1),
              };
            })}
            dataSets={[
              {
                data: columns,
                id: 'dataOne',
              },
            ]}
            lines={
              entryPoints.map(ep =>
                ({
                  id: ep.name,
                  dataSet: 'dataOne',
                  yAxis: _get(ep, ['connectedDataY', 'axisId']),
                  fill: _get(ep, ['objectStyle', 'curveColor']),
                  strokeWidth: _get(ep, ['objectStyle', 'line', 'size'], 2),
                  lineStyle: _get(ep, ['objectStyle', 'line', 'style'], 'Continuous'),
                  yAccessor: d => _get(d, [ep.name, 'value']),
                })
              )
            }
          />
        </DroppableContainer>
      );
    }

    return (
      <DroppableContainer
        onDrop={this.onDrop}
        text="add entry point"
        className={classnames(
          { [styles.disconnected]: zoomedOrPanned },
          'h100',
          'posRelative'
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
          {this.getEntryPointErrors(styles.entryPointError)}
          <ChartCanvas
            plotFull={false}
            ratio={1}
            width={containerWidth}
            height={containerHeight}
            margin={marginChart}
            pointsPerPxThreshold={this.props.pointsPerPxThreshold}
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
