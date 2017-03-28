import React, { PureComponent, PropTypes } from 'react';
import _ from 'lodash/fp';
import _get from 'lodash/get';
import _max from 'lodash/max';
import _min from 'lodash/min';
import _sum from 'lodash/sum';
import classnames from 'classnames';
import getLogger from 'common/log';
import { get } from 'common/parameters';
import Dimensions from '../../../../windowProcess/common/Dimensions';
import { formatDuration } from '../../../../windowProcess/common/timeFormats';
import GrizzlyChart from './Grizzly/Chart';
import Legend from './Legend';

import DroppableContainer from '../../../../windowProcess/common/DroppableContainer';
import CloseableAlert from './CloseableAlert';
import styles from './PlotView.css';
import grizzlyStyles from './Grizzly/GrizzlyChart.css';

const logger = getLogger('view:plot');

const getComObject =
  _.propOr('UNKNOWN_COM_OBJECT', 0);


// parse clipboard data to create partial entry point
function parseDragData(data) {
  return {
    name: data.item,
    connectedDataX: {
      formula: `${data.catalogName}.${data.item}<${getComObject(data.comObjects)}>.groundDate`,
      unit: 's',
    },
    connectedDataY: {
      formula: `${data.catalogName}.${data.item}<${getComObject(data.comObjects)}>.${get('DEFAULT_FIELD')[getComObject(data.comObjects)]}`,
    },
  };
}

const plotPadding = 15;
const securityTopPadding = 5;
const mainStyle = { padding: `${plotPadding}px` };

export class GrizzlyPlotView extends PureComponent {
  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    updateDimensions: PropTypes.func.isRequired,
    data: PropTypes.shape({
      lines: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
    }),
    visuWindow: PropTypes.shape({
      lower: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
      current: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
      upper: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    }),
    viewId: PropTypes.string.isRequired,
    addEntryPoint: PropTypes.func.isRequired,
    entryPoints: PropTypes.objectOf(PropTypes.object).isRequired,
    configuration: PropTypes.shape({
      procedures: PropTypes.array,
      entryPoints: PropTypes.array,
      axes: PropTypes.object,
      showYAxes: PropTypes.string,
      grids: PropTypes.array,
      legend: PropTypes.object,
      markers: PropTypes.array,
    }).isRequired,
  };

  static defaultProps = {
    data: {
      lines: [],
      columns: [],
    },
    visuWindow: null,
  };

  state = {
    showLegend: false,
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.updateDimensions();
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      data,
      entryPoints,
      visuWindow,
      configuration,
      containerWidth,
      containerHeight,
    } = this.props;
    return !(
      this.state.showLegend === nextState.showLegend &&
      data === nextProps.data &&
      entryPoints === nextProps.entryPoints &&
      visuWindow === nextProps.visuWindow &&
      configuration === nextProps.configuration &&
      containerWidth === nextProps.containerWidth &&
      containerHeight === nextProps.containerHeight
    );
  }

  onDrop = this.drop.bind(this);

  getEntryPointErrors(supClass = '') {
    const epWithErrors = Object
      .keys(this.props.entryPoints)
      .filter(key => this.props.entryPoints[key].error)
      .map(key => ({
        error: this.props.entryPoints[key].error,
        key,
      }));

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
                key={ep.key}
              >
                {ep.name}: {ep.error}
              </div>
            ))}
        </div>
      </CloseableAlert> : undefined;
  }

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

  shouldRender() {
    const {
      containerWidth,
      containerHeight,
      data,
      visuWindow,
      entryPoints,
    } = this.props;
    let info;
    if (containerWidth <= 0 || containerHeight <= 0) {
      info = `invisible size received ${containerWidth}x${containerHeight}`;
    }
    if (!visuWindow) {
      info = 'No vizualisation window';
    }
    if (!data.lines || !Object.keys(data.lines).length) {
      info = 'no point';
    }
    if (!entryPoints || !Object.keys(entryPoints).length) {
      info = 'invalid view configuration';
    }
    return info;
  }

  toggleShowLegend = (e) => {
    e.preventDefault();
    this.setState({
      showLegend: !this.state.showLegend,
    });
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
      data,
      data: { lines },
      configuration: { showYAxes, axes, grids, entryPoints },
      visuWindow,
    } = this.props;
    const {
      showLegend,
    } = this.state;

    const yAxes = Object.values(axes).filter(a => a.label !== 'Time');
    const yAxesLegendHeight = yAxes.map((a) => {
      const eps = entryPoints.filter(ep =>
        _get(ep, ['connectedDataY', 'axisId']) === a.id
      ).length;
      return eps > 0 ? 22 + (Math.ceil(eps / 3) * 24) : 0;
    });
    const xExtents = [visuWindow.lower, visuWindow.upper];
    const plotHeight = containerHeight - securityTopPadding -
      (plotPadding * 2) - (showLegend ? _sum(yAxesLegendHeight) : 0);

    return (
      <DroppableContainer
        onDrop={this.onDrop}
        text="add entry point"
        className={classnames(
          'h100',
          'posRelative'
        )}
        style={mainStyle}
      >
        <GrizzlyChart
          height={plotHeight}
          width={containerWidth - (plotPadding * 2)}
          tooltipColor="blue"
          enableTooltip
          allowYZoom
          allowYPan
          allowZoom
          allowPan
          perfOutput={false}
          xExtents={xExtents}
          current={visuWindow.current}
          yAxesAt={showYAxes}
          xAxisAt="bottom"
          yAxes={yAxes.map((axis) => {
            const grid = grids.find(g => g.yAxisId === axis.id);
            const axisEntryPoints = entryPoints
              .filter(ep => _get(ep, ['connectedDataY', 'axisId']) === axis.id);
            return {
              id: axis.id,
              yExtents:
                axis.autoLimits === true ?
                [
                  _min(axisEntryPoints.map(ep => data.min[ep.name])),
                  _max(axisEntryPoints.map(ep => data.max[ep.name])),
                ]
                :
                [axis.min, axis.max],
              data: lines,
              orient: 'top',
              format: '.3f',
              showAxis: axis.showAxis === true,
              showLabels: axis.showLabels === true,
              showTicks: axis.showTicks === true,
              autoLimits: false,
              autoTick: axis.autoTick === true,
              tickStep: axis.tickStep,
              showGrid: _get(grid, 'showGrid', false),
              gridStyle: _get(grid, ['line', 'style']),
              gridSize: _get(grid, ['line', 'size']),
              unit: axis.unit,
              label: axis.label,
              labelStyle: axis.style,
            };
          })}
          lines={
            entryPoints.map(ep =>
              ({
                data: null, // data is accessed through axis.data
                id: ep.name,
                yAxis: _get(ep, ['connectedDataY', 'axisId']),
                fill: _get(ep, ['objectStyle', 'curveColor']),
                lineSize: _get(ep, ['objectStyle', 'line', 'size']),
                lineStyle: _get(ep, ['objectStyle', 'line', 'style']),
                pointStyle: _get(ep, ['objectStyle', 'points', 'style']),
                pointSize: _get(ep, ['objectStyle', 'points', 'size']),
                dataAccessor: d => d[ep.name],
                xAccessor: null, // default .x
                yAccessor: d => d.value, // default .y
                colorAccessor: d => d.color,
                tooltipFormatter: (id, foundColor, color, value,
                  x, formattedValue, formatter, packet) => {
                  const offset = value !== packet.masterTime ? formatDuration(packet.masterTime - x) : '';
                  return (
                    <div
                      key={id}
                      className={grizzlyStyles.tooltipLine}
                    >
                      <span
                        className={grizzlyStyles.tooltipLineSquare}
                        style={{ background: foundColor || color }}
                      />
                      <p>
                        <span
                          className={grizzlyStyles.tooltipLineName}
                          style={{
                            color,
                          }}
                        >{ id } :</span>
                        <span
                          className={grizzlyStyles.tooltipLineValue}
                        >{ packet.symbol ? packet.symbol : formattedValue }</span>
                      </p>
                      <span
                        className={classnames(
                          grizzlyStyles.tooltipOffset,
                          {
                            [grizzlyStyles.red]: offset[0] === '-',
                            [grizzlyStyles.green]: offset[0] && offset[0] !== '-',
                          }
                        )}
                      >{' '}{ offset }</span>
                    </div>
                  );
                },
              })
            )
          }
        />
        <Legend
          yAxes={yAxes}
          lines={entryPoints}
          show={this.state.showLegend}
          toggleShowLegend={this.toggleShowLegend}
        />
      </DroppableContainer>
    );
  }
}

const SizeablePlotView = Dimensions({ elementResize: true })(GrizzlyPlotView);

export default SizeablePlotView;
