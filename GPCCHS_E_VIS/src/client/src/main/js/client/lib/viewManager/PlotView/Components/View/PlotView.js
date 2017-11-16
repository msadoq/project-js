import React, { PureComponent, PropTypes } from 'react';
import _ from 'lodash/fp';
import _each from 'lodash/each';
import _get from 'lodash/get';
import _max from 'lodash/max';
import _min from 'lodash/min';
import _sum from 'lodash/sum';
import _memoize from 'lodash/memoize';
import _uniq from 'lodash/uniq';
import classnames from 'classnames';
import moment from 'moment';
import getLogger from '../../../../common/logManager';
import { get } from '../../../../common/configurationManager';
import withDimensions from '../../../../windowProcess/common/hoc/withDimensions';
import GrizzlyChart from './GrizzlyParametric/Chart';
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

const getUniqAxes = (entryPoints, axes, grids, data, visuWindow) => {
  let xAxesIds = [];
  const xAxes = [];
  let yAxesIds = [];
  const yAxes = [];
  entryPoints.forEach((ep) => {
    if (ep.parametric) {
      xAxesIds.push(_get(ep, ['connectedDataParametric', 'xAxisId']));
      yAxesIds.push(_get(ep, ['connectedDataParametric', 'yAxisId']));
    } else {
      xAxesIds.push('time');
      yAxesIds.push(_get(ep, ['connectedData', 'axisId']));
    }
  });

  xAxesIds = _uniq(xAxesIds);
  yAxesIds = _uniq(yAxesIds);

  yAxesIds.forEach((axisId) => {
    const axis = axes[axisId];
    const grid = grids.find(g => g.yAxisId === axis.id);
    const axisEntryPoints = entryPoints
      .filter(ep =>
        (
          (ep.parametric && _get(ep, ['connectedDataParametric', 'yAxisId']) === axis.id) ||
          (!ep.parametric && _get(ep, ['connectedData', 'axisId']) === axis.id)
        )
      );
    const mins = [];
    const maxs = [];
    axisEntryPoints.forEach((ep) => {
      if (!ep.parametric && _get(ep, ['connectedData', 'stringParameter'])) {
        mins.push(ep.connectedData.defaultY);
        maxs.push(ep.connectedData.defaultY);
      } else {
        if (typeof data.min[ep.name] === 'number') {
          mins.push(data.min[ep.name]);
        }
        if (typeof data.min[ep.name] === 'number') {
          maxs.push(data.max[ep.name]);
        }
      }
    });
    const min = _min(mins);
    const max = _max(maxs);
    return yAxes.push({
      id: axis.id,
      extents:
        axis.autoLimits === true ?
        [min, max]
        :
        [
          min < axis.min ? min : axis.min,
          max > axis.max ? max : axis.max,
        ],
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
      logarithmic: axis.logarithmic,
      logSettings: axis.logSettings,
      formatAsDate: false,
    });
  });

  xAxesIds.forEach((axisId) => {
    if (axisId === 'time') {
      return xAxes.push({
        id: 'time',
        orient: 'top',
        extents: [visuWindow.lower, visuWindow.upper],
        autoLimits: false,
        showAxis: true,
        showLabels: true,
        showTicks: true,
        autoTick: true,
        tickStep: 20000,
        showGrid: true,
        gridStyle: _get(grids, [0, 'line', 'style'], 'Continuous'),
        gridSize: _get(grids, [0, 'line', 'size'], 1),
        unit: 'V',
        label: 'time',
        format: '.2f',
        formatAsDate: true,
        labelStyle: {},
      });
    }
    const axis = axes[axisId];
    const grid = grids.find(g => g.yAxisId === axis.id);
    const axisEntryPoints = entryPoints
      .filter(ep =>
        (ep.parametric && _get(ep, ['connectedDataParametric', 'xAxisId']) === axis.id)
      );
    const mins = [];
    const maxs = [];
    axisEntryPoints.forEach((ep) => {
      if (typeof data.min[ep.name] === 'number') {
        mins.push(data.min[ep.name]);
      }
      if (typeof data.min[ep.name] === 'number') {
        maxs.push(data.max[ep.name]);
      }
    });
    const min = _min(mins);
    const max = _max(maxs);
    return yAxes.push({
      id: axis.id,
      extents:
        axis.autoLimits === true ?
        [min, max]
        :
        [
          min < axis.min ? min : axis.min,
          max > axis.max ? max : axis.max,
        ],
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
      logarithmic: axis.logarithmic,
      logSettings: axis.logSettings,
      formatAsDate: false,
    });
  });

  return { xAxes, yAxes };
};

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

const tooltipFormatter = (id, foundColor, color, value, x, formattedValue, formatter, packet) =>
  (
    <div
      key={id}
      className={grizzlyStyles.tooltipLine}
    >
      <span
        className={grizzlyStyles.tooltipLineSquare}
        style={{ background: foundColor || color }}
      />
      <p>
        <span className={grizzlyStyles.tooltipLineName} style={{ color }}>{ id } :</span>
        <span className={grizzlyStyles.tooltipLineValue}>
          { packet.symbol ? packet.symbol : formattedValue }
        </span>
        <br />
        <strong>{ moment(packet.refTime).utc().toISOString() }</strong>
        {' '}
        {packet.valX ? <span>({ moment(packet.valX).utc().toISOString() })</span> : null}
      </p>
    </div>
  );

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
const { shape, string, arrayOf, number, func, object, objectOf, array, bool } = PropTypes;

export class GrizzlyPlotView extends PureComponent {
  static propTypes = {
    containerWidth: number.isRequired,
    containerHeight: number.isRequired,
    updateDimensions: func.isRequired,
    data: shape({
      lines: object, // eslint-disable-line react/no-unused-prop-types
    }),
    visuWindow: shape({
      lower: number, // eslint-disable-line react/no-unused-prop-types
      current: number, // eslint-disable-line react/no-unused-prop-types
      upper: number, // eslint-disable-line react/no-unused-prop-types
    }),
    viewId: string.isRequired,
    addEntryPoint: func.isRequired,
    entryPoints: objectOf(object).isRequired,
    configuration: shape({
      procedures: array,
      entryPoints: array,
      axes: object,
      showYAxes: string,
      showLegend: bool.isRequired,
      grids: array,
      legend: object,
      markers: array,
    }).isRequired,
    toggleLegend: func.isRequired,
    openInspector: func.isRequired,
    isInspectorOpened: bool.isRequired,
    inspectorEpId: string,
    openEditor: func.isRequired,
    closeEditor: func.isRequired,
    removeEntryPoint: func.isRequired,
    isViewsEditorOpen: bool.isRequired,
    mainMenu: arrayOf(object).isRequired,
    defaultTimelineId: string.isRequired,
    links: arrayOf(shape({
      name: string.isRequired,
      path: string.isRequired,
    })),
    removeLink: func.isRequired,
    pageId: string.isRequired,
    showLinks: bool,
    updateShowLinks: func.isRequired,
    isMaxVisuDurationExceeded: bool.isRequired,
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
  };

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
    if (
      nextProps.configuration.entryPoints !== this.props.configuration.entryPoints ||
      nextProps.configuration.axes !== this.props.configuration.axes ||
      nextProps.configuration.grids !== this.props.configuration.grids ||
      nextProps.visuWindow !== this.props.visuWindow ||
      nextProps.data !== this.props.data
    ) {
      const processedAxes = getUniqAxes(
        nextProps.configuration.entryPoints,
        nextProps.configuration.axes,
        nextProps.configuration.grids,
        nextProps.data,
        nextProps.visuWindow
      );
      this.xAxes = processedAxes.xAxes;
      this.yAxes = processedAxes.yAxes;
    }
    if (shouldRender) {
      return true;
    }
    if (nextProps.showLinks !== this.props.showLinks) {
      return true;
    }
    if (nextState.showEpNames !== this.state.showEpNames) {
      return true;
    }
    if (nextState.hideEpNames !== this.state.hideEpNames) {
      return true;
    }
    return shouldRender;
  }

  onContextMenuLegend = (event, name) => {
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
    if (!name) {
      return;
    }
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
  };

  onContextMenu = (e) => {
    e.stopPropagation();
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
    const inspectorMenu = {
      label: 'Open parameter in Inspector',
      submenu: [],
    };
    _each(entryPoints, (ep, epName) => {
      if (ep.error) {
        inspectorMenu.submenu.push({ label: epName, enabled: false });
        return;
      }
      const { id, dataId, fieldY } = ep;
      const opened = isInspectorOpened && (inspectorEpId === id);
      inspectorMenu.submenu.push({
        label: epName,
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
  };

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
  };

  toggleShowLinks = (e) => {
    e.preventDefault();
    const { showLinks, updateShowLinks, viewId } = this.props;
    updateShowLinks(viewId, !showLinks);
  };

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
  };

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
  };

  memoizeMainStyle = _memoize(
    legendLocation => ({
      display: legendLocation === 'left' || legendLocation === 'right' ? 'table-cell' : 'block',
    })
  );

  removeEntryPoint = (e, id) => {
    e.preventDefault();
    const {
      removeEntryPoint,
      viewId,
      configuration: { entryPoints },
    } = this.props;
    const index = entryPoints.findIndex(a => a.id === id);
    removeEntryPoint(viewId, index);
  };

  removeLink = (e, index) => {
    e.preventDefault();
    const { removeLink, viewId } = this.props;
    removeLink(viewId, index);
  };

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
      data: { lines, indexes },
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

    // On first render only
    if (!this.xAxes || !this.yAxes) {
      const processedAxes = getUniqAxes(
        this.props.configuration.entryPoints,
        axes,
        grids,
        data,
        visuWindow
      );
      this.xAxes = processedAxes.xAxes;
      this.yAxes = processedAxes.yAxes;
    }

    if (showEpNames.length) {
      entryPoints = entryPoints.filter(ep => showEpNames.includes(ep.id));
    } else if (hideEpNames.length) {
      entryPoints = entryPoints.filter(ep => !hideEpNames.includes(ep.id));
    }

    const yAxesLegendHeight = this.yAxes.map((a) => {
      const eps = this.props.configuration.entryPoints.filter(ep =>
        (
          (ep.parametric && _get(ep, ['connectedDataParametric', 'yAxisId']) === a.id) ||
          (!ep.parametric && _get(ep, ['connectedData', 'axisId']) === a.id)
        )
      ).length;
      return eps > 0 ? 84 : 0;
    });

    const linksHeight = links.length ? 23 + (links.length * 29) : 0;

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
        onContextMenu={this.onContextMenuLegend}
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
// eslint-disable-next-line no-console
          linesListener={console.log}
          current={visuWindow.current}
          yAxesAt={showYAxes}
          xAxesAt="bottom"
          parametric={false}
          additionalStyle={this.memoizeMainStyle(legend.location)}
          yAxes={this.yAxes}
          xAxes={this.xAxes}
          lines={
            entryPoints.map((ep) => {
              const defaultY = _get(ep, ['connectedData', 'defaultY'], 1);
              const stringParameter = !ep.parametric && _get(ep, ['connectedData', 'stringParameter']);
              return {
                data: lines[ep.name],
                indexes: indexes[ep.name],
                id: ep.name,
                xAxisId: 'time',
                yAxisId: _get(ep, ['connectedData', 'axisId']),
                fill: _get(ep, ['objectStyle', 'curveColor']),
                lineSize: _get(ep, ['objectStyle', 'line', 'size']),
                lineStyle: _get(ep, ['objectStyle', 'line', 'style']),
                pointStyle: _get(ep, ['objectStyle', 'points', 'style']),
                pointSize: _get(ep, ['objectStyle', 'points', 'size']),
                dataAccessor: ep.name,
                xAccessor: null, // default packet => packet.x
                yAccessor: stringParameter ? () => defaultY : null, // default packet => packet.value
                xTooltipAccessor: null, // default packet => packet.x
                yTooltipAccessor: stringParameter ? packet => packet.symbol : null, // default packet => packet.value
                colorAccessor: 'color',
                tooltipFormatter,
              };
            })
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

const SizeablePlotView = withDimensions({ elementResize: true })(GrizzlyPlotView);

export default SizeablePlotView;
