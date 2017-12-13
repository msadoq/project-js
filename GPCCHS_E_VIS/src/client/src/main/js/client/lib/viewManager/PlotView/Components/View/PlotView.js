// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Renamed GrizzlyPlot and RSCPlot with coherent names.
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving DynamicView PlotView and TextView in dataManager.
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : New legend toggable on plotview !
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Grizzly: autoTick and tickStep are taken into consideration.
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Format tooltip line function is given in props, and no longer resides in Tooltip.
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Adapting PlotView and Grizzly for the new data structure.
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Move general variables at top level of a view
// VERSION : 1.1.2 : FA : #5512 : 15/03/2017 : PlotView legend height is smarter.
// VERSION : 1.1.2 : DM : #3622 : 15/03/2017 : Grizzly : perfOutput as an option, log lines number, points number and axis.
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove react-dimensions from project, use custom HOC
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Fix mount or unmount components for resizing plotview
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Fix display legend in plotview
// VERSION : 1.1.2 : DM : #5822 : 23/03/2017 : add context menu on plotview
// VERSION : 1.1.2 : DM : #5822 : 24/03/2017 : inspector view: separate general data from specific TM data
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : PlotView: x axis is always time/s , not editable. Newly created Ep always stick to time axis or create one.
// VERSION : 1.1.2 : DM : #5822 : 27/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : PlotView: show symbol in tooltip
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : PlotView and Grizzly : user can configure tickStep, autoTick and showTicks for x axis.
// VERSION : 1.1.2 : FA : #6130 : 30/03/2017 : User can re-click on legend item to cancel curve highlight.
// VERSION : 1.1.2 : FA : #6130 : 30/03/2017 : Highlight curve by selecting entry point in the legend.
// VERSION : 1.1.2 : DM : #5828 : 30/03/2017 : Fix open editor when entrypoint is dropped
// VERSION : 1.1.2 : DM : #5822 : 03/04/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Define PlotView's format tooltip function outside of react component, cleaner.
// VERSION : 1.1.2 : DM : #5828 : 04/04/2017 : Fix plot view drawing .
// VERSION : 1.1.2 : DM : #5828 : 04/04/2017 : no connectedDataX and connectedDataY for default drag&drop created EP.
// VERSION : 1.1.2 : DM : #6302 : 04/04/2017 : FIx lint in Grizzly and PlotView.js .
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : Merging branch dev into branch dev-plot-ep-refacto.
// VERSION : 1.1.2 : DM : #5828 : 14/04/2017 : It's possible to select multiple lines in PlotView legend.
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : mark parameter as checked in context menu when opened in inspector
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : open parameter in editor via context menu
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : add context menu on views
// VERSION : 1.1.2 : DM : #5828 : 26/04/2017 : Ported 1.1.0 patch to dev branch. EP Drag & drop auto-axis-creation.
// VERSION : 1.1.2 : DM : #5828 : 03/05/2017 : Fix editor search on open
// VERSION : 1.1.2 : DM : #5828 : 03/05/2017 : fix context menu on plot view
// VERSION : 1.1.2 : DM : #5822 : 03/05/2017 : Inspector : display dynamic data
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : PlotView must show every point, if any point is out of limits in Plot, limits are modified.
// VERSION : 1.1.2 : DM : #5828 : 11/05/2017 : User can now show/hide/remove EP from Plot in legend.
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add possibility to show links in views
// VERSION : 1.1.2 : DM : #6835 : 31/05/2017 : First draft for parametric PlotView, x axis becomes basic axis with numb values.
// VERSION : 1.1.2 : DM : #6785 : 12/06/2017 : activate links in views .
// VERSION : 1.1.2 : FA : ISIS-FT-2107 : 13/06/2017 : Prep for point labels option on PlotView.
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : ISIS-FT-2107 : 19/06/2017 : Improve PlotView editor UI -> legend in store.
// VERSION : 1.1.2 : DM : #6829 : 22/06/2017 : Working logarithmic scale for Y axes on PlotView.
// VERSION : 1.1.2 : DM : #6829 : 27/06/2017 : Plot axes log settings stored in store and documents.
// VERSION : 1.1.2 : DM : #6829 : 27/06/2017 : PlotView legend : left right top bottom.
// VERSION : 1.1.2 : DM : #7111 : 03/07/2017 : Add config parameter VISU_WINDOW_MAX_DURATION to limit visuWindow per view
// VERSION : 1.1.2 : DM : #6829 : 10/07/2017 : PlotView default yAccessor : .value instead of .y
// VERSION : 1.1.2 : DM : #6835 : 18/07/2017 : PlotView's lines take string instead of function for colorAccessor attribute.
// VERSION : 1.1.2 : DM : #6830 : 20/07/2017 : Carried few changes to Grizzly-PlotView to avoid useless re-renders + removed stuff related to pointLabels.
// VERSION : 1.1.2 : FA : #7256 : 20/07/2017 : Working on cleaning style, added variables to edit style easily.
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 20/07/2017 : Reimplement openLink middleware . .
// VERSION : 1.1.2 : DM : #6830 : 21/07/2017 : Interactive logarithmic y axes on PlotView.
// VERSION : 1.1.2 : DM : #6830 : 21/07/2017 : PlotView -> logarithmic axis : base can be anything: 2, 10, 12....
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 24/08/2017 : no point is not an error anymore on PlotView.
// VERSION : 1.1.2 : FA : #7776 : 13/09/2017 : update of plot view tooltip
// VERSION : 1.1.2 : FA : #7776 : 13/09/2017 : Fix plot drawing when timeline has offset
// VERSION : 1.1.2 : FA : #7834 : 15/09/2017 : Fixed right click on PlotView and PlotView legend.
// VERSION : 1.1.2 : FA : #7814 : 18/09/2017 : Handling data differently in PlotView : using indexes to iterate.
// END-HISTORY
// ====================================================================

import React, { PureComponent, PropTypes } from 'react';
import _each from 'lodash/each';
import _get from 'lodash/get';
import _max from 'lodash/max';
import _min from 'lodash/min';
import _sum from 'lodash/sum';
import _memoize from 'lodash/memoize';
import _uniq from 'lodash/uniq';
import _result from 'lodash/result';
import classnames from 'classnames';
import moment from 'moment';
import LinksContainer from 'windowProcess/View/LinksContainer';
import { get } from 'common/configurationManager';
import withDimensions from 'windowProcess/common/hoc/withDimensions';
import handleContextMenu from 'windowProcess/common/handleContextMenu';
import DroppableContainer from 'windowProcess/common/DroppableContainer';

import getLogger from 'common/logManager';
import Legend from './Legend';
import GrizzlyChart from './GrizzlyParametric/Chart';
import CloseableAlert from './CloseableAlert';
import styles from './PlotView.css';
import grizzlyStyles from './Grizzly/GrizzlyChart.css';

import { entryPointType } from '../../../common/Components/types';

const logger = getLogger('view:plot');

/**
 * @param master
 * @returns {function(*, *=)}
 */
export const sortAxes = master => (
  (a, b) => {
    if (a === master) {
      return 1;
    }
    if (b === master) {
      return -1;
    }

    return a.localeCompare(b);
  }
);

/**
 * @param entryPoints
 * @param axes
 * @param grids
 * @param data
 * @param visuWindow
 * @returns {{xAxes: Array, yAxes: Array}}
 * @pure
 */
export const getUniqAxes = (entryPoints, axes, grids, data, visuWindow) => {
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
  xAxesIds = xAxesIds.sort(sortAxes(_get(grids, [0, 'xAxisId'])));
  yAxesIds = yAxesIds.sort(sortAxes(_get(grids, [0, 'yAxisId'])));

  yAxesIds.forEach((axisId) => {
    const axis = axes[axisId];
    const grid = grids.find(g => g.yAxisId === axis.id);
    const { min, max } = computeMinMaxForAxis(entryPoints, axis, data, true);
    return yAxes.push(defaultAxisConfig(axis, grid, min, max));
  });

  xAxesIds.forEach((axisId) => {
    // specific for asciss axis (x), always add time
    // it will only be drawn if an entry point is associated
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
    const { min, max } = computeMinMaxForAxis(entryPoints, axis, data, false);
    return xAxes.push(defaultAxisConfig(axis, grid, min, max));
  });

  return { xAxes, yAxes };
};

/**
 * @param entryPoints
 * @param axis
 * @param data
 * @param ordinal
 * @returns {{min: *, max: *}}
 * @pure
 */
export const computeMinMaxForAxis = (entryPoints, axis, data, ordinal) => {
  const axisEntryPoints =
    ordinal
      // only for ordinate values (Y).
      ? entryPoints.filter(ep => (
        (ep.parametric && _get(ep, ['connectedDataParametric', 'yAxisId']) === axis.id) ||
        (!ep.parametric && _get(ep, ['connectedData', 'axisId']) === axis.id)
      ))
      // Absciss values (X)
      : entryPoints.filter(ep =>
        (ep.parametric && _get(ep, ['connectedDataParametric', 'xAxisId']) === axis.id)
      )
  ;
  const mins = [];
  const maxs = [];
  axisEntryPoints.forEach((ep) => {
    // only for ordinal values (Y). we should draw a single line for non parametric string values
    // the height will be defined by the defaultY value
    if (ordinal && !ep.parametric && _get(ep, ['connectedData', 'stringParameter'])) {
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

  return { min, max };
};

/**
 * @param axis
 * @param grid
 * @param min
 * @param max
 * @returns {{id, extents: *[], orient: string, format: string, showAxis: boolean, showLabels: boolean, showTicks: boolean, autoLimits: boolean, autoTick: boolean, tickStep, showGrid: *, gridStyle: *, gridSize: *, unit, label, labelStyle, logarithmic, logSettings: *|{base: number, max: number, min: number}|yAxis.logSettings|{base, max, min}|logSettings|{min, max, base}, formatAsDate: boolean}}
 * @pure
 */
export const defaultAxisConfig = (axis, grid, min, max) => ({
  id: axis.id,
  extents:
    axis.autoLimits === true
      ? [min, max]
      : [
        min < axis.min
          ? min
          : axis.min,
        max > axis.max
            ? max
            : axis.max,
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

/**
 * @param id
 * @param entryPoints
 * @returns {*}
 * @pure
 */
export const getUniqueEpId = (id, entryPoints) => {
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

/**
 * @param data
 * @param id
 * @param defaultTimelineId
 * @returns {{name: *, connectedData: {formula: string, fieldX: string, timeline: *}}}
 * @pure
 */
export const parseDragData = (data, id, defaultTimelineId) => {
  const val = _result(data, 'comObjects[0]', 'UNKNOWN_COM_OBJECT');
  return {
    name: id,
    connectedData: {
      formula: `${data.catalogName}.${data.item}<${val}>.${get('DEFAULT_FIELD')[val]}`,
      fieldX: 'onboardDate',
      unit: 'V',
      domain: '*',
      timeline: defaultTimelineId,
    },
  };
};

const plotPadding = 15;
const securityTopPadding = 5;
const mainStyle = { padding: `${plotPadding}px` };
const { shape, string, arrayOf, number, func, object, array, bool } = PropTypes;

export class GrizzlyPlotView extends PureComponent {
  static propTypes = {
    containerWidth: number.isRequired,
    containerHeight: number.isRequired,
    updateDimensions: func.isRequired,
    saveLiveExtents: func.isRequired,
    pause: func.isRequired,
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
    entryPoints: entryPointType.isRequired,
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
    handleContextMenu([inspectorMenu, separator, ...mainMenu]);
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
      saveLiveExtents,
      pause,
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
          linesListener={memoizeLiveExtents(saveLiveExtents, viewId)}
          zoomPanListener={memoizeZoomOrPan(pause, viewId)}
          current={visuWindow.current}
          yAxesAt={showYAxes}
          xAxesAt="bottom"
          parametric={false}
          additionalStyle={memoizeMainStyle(legend.location)}
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
                lineSize: _get(ep, ['objectStyle', 'displayLine'], true) === true
                  ? _get(ep, ['objectStyle', 'line', 'size'])
                  : 0,
                lineStyle: _get(ep, ['objectStyle', 'line', 'style']),
                pointStyle: _get(ep, ['objectStyle', 'displayPoints'], true) === true
                  ? _get(ep, ['objectStyle', 'points', 'style'])
                  : 0,
                pointSize: _get(ep, ['objectStyle', 'points', 'size']),
                dataAccessor: ep.name,
                stopInstruction: packet => (packet.isObsolete || false),
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

/**
 * @param saveLiveExtents
 * @param viewId
 * @returns {Function}
 */
const memoizeLiveExtents = (saveLiveExtents, viewId) => _memoize(
  liveExtents => saveLiveExtents(viewId, liveExtents)
);

/**
 * @param pause
 * @param viewId
 * @returns {Function}
 */
const memoizeZoomOrPan = (pause, viewId) => _memoize(
  e => pause(viewId, e)
);

/**
 * @type {Function}
 * @returns {Object}
 */
const memoizeMainStyle = _memoize(
  legendLocation => ({
    display: legendLocation === 'left' || legendLocation === 'right' ? 'table-cell' : 'block',
  })
);

export default SizeablePlotView;
