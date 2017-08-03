import React, { PureComponent, PropTypes } from 'react';
import _ from 'lodash/fp';
import _each from 'lodash/each';
import _get from 'lodash/get';
import _max from 'lodash/max';
import _min from 'lodash/min';
import _sum from 'lodash/sum';
import _memoize from 'lodash/memoize';
import classnames from 'classnames';
import getLogger from '../../../../common/logManager';
import { get } from '../../../../common/configurationManager';
import Dimensions from '../../../../windowProcess/common/Dimensions';
import { formatDuration } from '../../../../windowProcess/common/timeFormats';
import GrizzlyChart from './Grizzly/Chart';
import Legend from './Legend';

import DroppableContainer from '../../../../windowProcess/common/DroppableContainer';
import handleContextMenu from '../../../../windowProcess/common/handleContextMenu';
import CloseableAlert from './CloseableAlert';
import styles from './PlotView.css';
import grizzlyStyles from './Grizzly/GrizzlyChart.css';
import LinksContainer from '../../../../windowProcess/View/LinksContainer';

const logger = getLogger('view:plot');

const getComObject =
  _.propOr('UNKNOWN_COM_OBJECT', 0);

const getUniqueEpId = (id, entryPoints) => {
  let i = 2;
  let newId = id;
  // eslint-disable-next-line no-loop-func, "DV6 TBC_CNES Check if name is taken"
  while (Object.keys(entryPoints).find(k => entryPoints[k].name === newId)) {
    newId = `${id}_${i}`;
    i += 1;
  }
  return newId;
};

const tooltipFormatter = (id, foundColor, color, value,
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
};

// parse clipboard data to create partial entry point
function parseDragData(data, id, defaultTimelineId) {
  return {
    name: id,
    connectedData: {
      formula: `${data.catalogName}.${data.item}<${getComObject(data.comObjects)}>.${get('DEFAULT_FIELD')[getComObject(data.comObjects)]}`,
      fieldX: 'onboardDate',
      timeline: defaultTimelineId,
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
      showLegend: PropTypes.bool.isRequired,
      grids: PropTypes.array,
      legend: PropTypes.object,
      markers: PropTypes.array,
    }).isRequired,
    toggleLegend: PropTypes.func.isRequired,
    openInspector: PropTypes.func.isRequired,
    isInspectorOpened: PropTypes.bool.isRequired,
    inspectorEpId: PropTypes.string,
    openEditor: PropTypes.func.isRequired,
    closeEditor: PropTypes.func.isRequired,
    removeEntryPoint: PropTypes.func.isRequired,
    isViewsEditorOpen: PropTypes.bool.isRequired,
    mainMenu: PropTypes.arrayOf(PropTypes.object).isRequired,
    defaultTimelineId: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })),
    removeLink: PropTypes.func.isRequired,
    pageId: PropTypes.string.isRequired,
    showLinks: PropTypes.bool,
    updateShowLinks: PropTypes.func.isRequired,
    isMaxVisuDurationExceeded: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    data: {
      lines: [],
      columns: [],
    },
    visuWindow: null,
    inspectorEpId: null,
    links: [],
    showLinks: false,
  };

  state = {
    showEpNames: [],
    hideEpNames: [],
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.updateDimensions();
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldRender = false;
    const attrs = ['data', 'entryPoints', 'visuWindow', 'configuration',
      'containerWidth', 'containerHeight'];
    for (let i = 0; i < attrs.length; i += 1) {
      if (nextProps[attrs[i]] !== this.props[attrs[i]]) {
        shouldRender = true;
      }
    }
    if (nextProps.showLinks !== this.props.showLinks) {
      shouldRender = true;
    }
    if (nextState.showEpNames !== this.state.showEpNames) {
      shouldRender = true;
    }
    if (nextState.hideEpNames !== this.state.hideEpNames) {
      shouldRender = true;
    }
    return shouldRender;
  }

  onContextMenu = (event, name) => {
    event.stopPropagation();
    const {
      entryPoints,
      openInspector,
      isViewsEditorOpen,
      closeEditor,
      openEditor,
      mainMenu,
      inspectorEpId,
      isInspectorOpened,
    } = this.props;
    const separator = { type: 'separator' };
    if (name) {
      const editorMenu = [{
        label: `Open ${name} in Editor`,
        click: () => {
          openEditor(name);
        },
      }];
      if (isViewsEditorOpen) {
        editorMenu.push({
          label: 'Close Editor',
          click: () => closeEditor(),
        });
      }
      const inspectorLabel = `Open ${name} in Inspector`;
      if (_get(entryPoints, [name, 'error'])) {
        const inspectorMenu = {
          label: inspectorLabel,
          enabled: false,
        };
        handleContextMenu([inspectorMenu, ...editorMenu, separator, ...mainMenu]);
        return;
      }
      const { id, dataId, fieldY } = entryPoints[name];
      const opened = isInspectorOpened && (inspectorEpId === id);
      const inspectorMenu = {
        label: inspectorLabel,
        type: 'checkbox',
        click: () => openInspector({
          epId: id,
          epName: name,
          dataId,
          field: fieldY,
        }),
        checked: opened,
      };
      handleContextMenu([inspectorMenu, ...editorMenu, separator, ...mainMenu]);
      return;
    }
    const inspectorMenu = {
      label: 'Open parameter in Inspector',
      submenu: [],
    };
    _each(entryPoints, (ep, epName) => {
      const label = `${epName}`;
      if (ep.error) {
        inspectorMenu.submenu.push({ label, enabled: false });
        return;
      }
      const { id, dataId, fieldY } = ep;
      const opened = isInspectorOpened && (inspectorEpId === id);
      inspectorMenu.submenu.push({
        label,
        type: 'checkbox',
        click: () => openInspector({
          epId: id,
          epName,
          dataId,
          field: fieldY,
        }),
        checked: opened,
      });
    });
    const editorMenu = (isViewsEditorOpen) ?
    {
      label: 'Close Editor',
      click: () => closeEditor(),
    } : {
      label: 'Open Editor',
      click: () => {
        openEditor();
      },
    };
    handleContextMenu([inspectorMenu, editorMenu, separator, ...mainMenu]);
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
    const {
      addEntryPoint,
      openEditor,
      viewId,
      configuration,
      defaultTimelineId,
    } = this.props;

    const data = e.dataTransfer.getData('text/plain');
    const content = JSON.parse(data);
    if (!_get(content, 'catalogName')) {
      return;
    }
    const epId = getUniqueEpId(data.item || 'entryPoint', configuration.entryPoints);
    addEntryPoint(
      viewId,
      parseDragData(content, epId, defaultTimelineId)
    );
    openEditor();

    e.stopPropagation();
  }

  shouldRender() {
    const {
      containerWidth,
      containerHeight,
      data,
      visuWindow,
      entryPoints,
      isMaxVisuDurationExceeded,
    } = this.props;
    let info;
    if (isMaxVisuDurationExceeded) {
      return 'Visu Window is too long for this type of view';
    }
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
    const {
      toggleLegend,
      configuration,
      viewId,
    } = this.props;
    toggleLegend(viewId, !configuration.showLegend);
  }

  toggleShowLinks = (e) => {
    e.preventDefault();
    const { showLinks, updateShowLinks, viewId } = this.props;
    updateShowLinks(viewId, !showLinks);
  }

  showEp = (e, lineId) => {
    e.preventDefault();
    const {
      showEpNames,
      hideEpNames,
    } = this.state;
    const newState = {};

    if (showEpNames.includes(lineId)) {
      const index = showEpNames.indexOf(lineId);
      showEpNames.splice(index, 1);
      newState.showEpNames = [].concat(showEpNames);
    } else {
      showEpNames.push(lineId);
      newState.showEpNames = [].concat(showEpNames);
    }
    if (hideEpNames.includes(lineId)) {
      const index = hideEpNames.indexOf(lineId);
      hideEpNames.splice(index, 1);
      newState.hideEpNames = [].concat(hideEpNames);
    }

    this.setState(newState);
  }

  hideEp = (e, lineId) => {
    e.preventDefault();
    const {
      hideEpNames,
      showEpNames,
    } = this.state;
    const newState = {};

    if (hideEpNames.includes(lineId)) {
      const index = hideEpNames.indexOf(lineId);
      hideEpNames.splice(index, 1);
      newState.hideEpNames = [].concat(hideEpNames);
    } else {
      hideEpNames.push(lineId);
      newState.hideEpNames = [].concat(hideEpNames);
    }
    if (showEpNames.includes(lineId)) {
      const index = showEpNames.indexOf(lineId);
      showEpNames.splice(index, 1);
      newState.showEpNames = [].concat(showEpNames);
    }

    this.setState(newState);
  }

  memoizeXAxisProps = _memoize(
    (xExtents, tickStep, autoTick, showTicks, format) => ({
      xExtents,
      tickStep,
      autoTick,
      showTicks,
      format,
    }),
    (a, b, c, d, e) => `${a[0]}-${a[1]}-${b}-${c}-${d}-${e}`
  )

  memoizeMainStyle = _memoize(
    legendLocation => ({
      display: legendLocation === 'left' || legendLocation === 'right' ? 'table-cell' : 'block',
    })
  )

  removeEntryPoint = (e, id) => {
    e.preventDefault();
    const {
      removeEntryPoint,
      viewId,
      configuration: { entryPoints },
    } = this.props;
    const index = entryPoints.findIndex(a => a.id === id);
    removeEntryPoint(viewId, index);
  }

  removeLink = (e, index) => {
    e.preventDefault();
    const { removeLink, viewId } = this.props;
    removeLink(viewId, index);
  }

  render() {
    logger.debug('render');
    const noRender = this.shouldRender();

    if (noRender) {
      logger.debug('no render due to', noRender);
      // TODO : clean message component
      return (
        <DroppableContainer
          onContextMenu={this.onContextMenu}
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
      configuration: {
        showYAxes,
        axes,
        grids,
        showLegend,
        legend,
      },
      visuWindow,
      links,
      pageId,
      viewId,
      showLinks,
    } = this.props;
    let {
      configuration: { entryPoints },
    } = this.props;
    const {
      showEpNames,
      hideEpNames,
    } = this.state;

    if (showEpNames.length) {
      entryPoints = entryPoints.filter(ep => showEpNames.includes(ep.id));
    } else if (hideEpNames.length) {
      entryPoints = entryPoints.filter(ep => !hideEpNames.includes(ep.id));
    }

    const yAxes = Object.values(axes).filter(a => a.label !== 'Time');
    const yAxesLegendHeight = yAxes.map((a) => {
      const eps = this.props.configuration.entryPoints.filter(ep =>
        _get(ep, ['connectedData', 'axisId']) === a.id
      ).length;
      return eps > 0 ? 84 : 0;
    });

    const linksHeight = links.length ? 23 + (links.length * 29) : 0;
    const xExtents = [visuWindow.lower, visuWindow.upper];
    let plotHeight = containerHeight - securityTopPadding -
      (plotPadding * 4) - (showLinks ? linksHeight : 0);
    if (showLegend && (legend.location === 'top' || legend.location === 'bottom')) {
      plotHeight -= _sum(yAxesLegendHeight);
    }

    let width = containerWidth - (plotPadding * 2);
    if (legend.location === 'right' || legend.location === 'left') {
      width -= 150;
    }
    const legendComponent =
      (<Legend
        plotHeight={plotHeight}
        axes={axes}
        legendLocation={legend.location}
        lines={this.props.configuration.entryPoints}
        show={showLegend}
        toggleShowLegend={this.toggleShowLegend}
        showEp={this.showEp}
        showEpNames={showEpNames}
        hideEp={this.hideEp}
        hideEpNames={hideEpNames}
        onContextMenu={this.onContextMenu}
        removeEntryPoint={this.removeEntryPoint}
      />);

    return (
      <DroppableContainer
        onContextMenu={this.onContextMenu}
        onDrop={this.onDrop}
        text="add entry point"
        className="h100 posRelative PlotView"
        style={mainStyle}
      >
        { (legend.location === 'top' || legend.location === 'left') &&
          legendComponent
        }
        <GrizzlyChart
          height={plotHeight}
          width={width}
          tooltipColor="white"
          enableTooltip
          allowYZoom
          allowYPan
          allowZoom
          allowPan
          perfOutput={false}
          current={visuWindow.current}
          yAxesAt={showYAxes}
          xAxisAt="bottom"
          xAxis={this.memoizeXAxisProps(
            xExtents,
            _get(axes, ['time', 'tickStep']),
            _get(axes, ['time', 'autoTick']),
            _get(axes, ['time', 'showTicks']),
            '.2f'
          )}
          additionalStyle={this.memoizeMainStyle(legend.location)}
          yAxes={yAxes.map((axis) => {
            const grid = grids.find(g => g.yAxisId === axis.id);
            const axisEntryPoints = entryPoints
              .filter(ep => _get(ep, ['connectedData', 'axisId']) === axis.id);
            const min = _min(axisEntryPoints.map(ep => data.min[ep.name]));
            const max = _max(axisEntryPoints.map(ep => data.max[ep.name]));
            return {
              id: axis.id,
              yExtents:
                axis.autoLimits === true ?
                [min, max]
                :
                [
                  min < axis.min ? min : axis.min,
                  max > axis.max ? max : axis.max,
                ],
              data: lines,
              orient: 'top',
              format: '.3f',
              showAxis: axis.showAxis === true,
              showLabels: axis.showLabels === true,
              showTicks: axis.showTicks === true,
              autoLimits: false,
              autoTick: axis.autoTick === true,
              tickStep: axis.tickStep,
              showPointLabels: false,
              showGrid: _get(grid, 'showGrid', false),
              gridStyle: _get(grid, ['line', 'style']),
              gridSize: _get(grid, ['line', 'size']),
              unit: axis.unit,
              label: axis.label,
              labelStyle: axis.style,
              logarithmic: axis.logarithmic,
              logSettings: axis.logSettings,
            };
          })}
          lines={
            entryPoints.map(ep =>
              ({
                data: null, // data is accessed through axis.data
                id: ep.name,
                yAxis: _get(ep, ['connectedData', 'axisId']),
                fill: _get(ep, ['objectStyle', 'curveColor']),
                lineSize: _get(ep, ['objectStyle', 'line', 'size']),
                lineStyle: _get(ep, ['objectStyle', 'line', 'style']),
                pointStyle: _get(ep, ['objectStyle', 'points', 'style']),
                pointSize: _get(ep, ['objectStyle', 'points', 'size']),
                dataAccessor: ep.name,
                xAccessor: null, // default .x
                yAccessor: null, // default .value
                colorAccessor: 'color',
                tooltipFormatter,
              })
            )
          }
        />
        { (legend.location === 'bottom' || legend.location === 'right') &&
          legendComponent
        }
        <LinksContainer
          show={showLinks}
          toggleShowLinks={this.toggleShowLinks}
          links={links}
          removeLink={this.removeLink}
          viewId={viewId}
          pageId={pageId}
        />

      </DroppableContainer>
    );
  }
}

const SizeablePlotView = Dimensions({ elementResize: true })(GrizzlyPlotView);

export default SizeablePlotView;
