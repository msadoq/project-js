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
// VERSION : 1.1.2 : DM : #3622 : 15/03/2017 : Grizzly : perfOutput as an option, log lines number, points PropTypes.number and axis.
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
// VERSION : 1.1.2 : FA : #7814 : 18/09/2017 : Handling data differently in PlotView : using
//  indexes to iterate.
// VERSION : 1.1.2 : FA : #7814 : 18/09/2017 : Handling data differently in PlotView : using indexes to iterate.
// VERSION : 1.1.2 : FA : #7814 : 18/09/2017 : Handling data differently in PlotView : using indexes to iterate.
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Move common/Dimensions.js in
//  common/hoc/withDimensions .
// VERSION : 2.0.0 : DM : #6835 : 26/09/2017 : Remove useless prop from PlotView.js
// VERSION : 2.0.0 : DM : #6835 : 09/10/2017 : PlotView always renders GrizzlyParametric with one x
//  axis. Tooltip reviewed. Current cursor reviewed for parametric and basic.
// VERSION : 2.0.0 : DM : #6835 : 20/10/2017 : Fix problem with PlotView's grid not updating.
// VERSION : 2.0.0 : DM : #6835 : 24/10/2017 : PlotView auto processes and generates x and y axes
//  for Grizzly. Ready for parametric.
// VERSION : 2.0.0 : DM : #6835 : 24/10/2017 : Fix on finding which ep is on a non-time x axis.
// VERSION : 2.0.0 : FA : #8045 : 06/11/2017 : PlotView can draw string parameters, and a defaultY
//  property can be set.
// VERSION : 2.0.0 : DM : #6818 : 15/11/2017 : Refacto Grizzly Chart / Add tests
// VERSION : 2.0.0 : DM : #6818 : 16/11/2017 : Test plot view . .
// VERSION : 2.0.0 : DM : #6818 : 16/11/2017 : cleanup PropTypes declaration / tests / debounce
//  linesListener action on zoom & pan
// VERSION : 2.0.0 : DM : #6818 : 20/11/2017 : save live extents zooms & pans (plot view) in the
//  store
// VERSION : 2.0.0 : DM : #6818 : 21/11/2017 : add stop instruction to grizzly & update tests
//  (obsolete data)
// VERSION : 2.0.0 : FA : ISIS-FT-2281 : 24/11/2017 : zoom plotView VIMA trigger pause on zoom
// VERSION : 2.0.0 : DM : #6818 : 01/12/2017 : Revision of PlotView's propTypes: name is not
//  mandatory.
// VERSION : 2.0.0 : FA : ISIS-FT-2280 : 06/12/2017 : ergonomie plotView VIMA // afficher la grille
//  (celle-ci ne s'affiche pas malgre un etat a ON)
// VERSION : 2.0.0 : FA : ISIS-FT-2280 : 06/12/2017 : ergonomie plotView VIMA // l'utilisateur doit
//  pouvoir choisir avec ou sans ligne entre les points sans "tricher" en mettant Line size = 0
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : #8082 : 11/12/2017 : Plot view refresh problem // Lorsqu'on cree un entry
//  point...
// VERSION : 2.0.0 : DM : #5806 : 11/12/2017 : Fix Open/Close Editor bunny code in MimicView,
//  PlotView and TextView
// VERSION : 2.0.0 : FA : ISIS-FT-2237 : 20/03/2018 : Update how an entry point formula is built
// VERSION : 2.0.0 : FA : #10769 : 20/03/2018 : Fix bug when adding a new entry point when no
//  timebar has been selected
// VERSION : 2.0.0 : FA : ISIS-FT-2949 : 22/03/2018 : dates now display in TAI
// VERSION : 2.0.0 : FA : #11614 : 06/04/2018 : Plotview unit display + snap
// VERSION : 2.0.0.2 : FA : #11609 : 20/04/2018 : correction plot view editeur unit + label(unit) +
//  test (cherry picked from commit 3c9fde0)
// VERSION : 2.0.0.3 : FA : ISIS-FT-3154 : 09/05/2018 : labels are displayed or not depending on
//  displayLine prop in Axis.js
// VERSION : 2.0.0.3 : FA : ISIS-FT-3154 : 30/05/2018 : Revert : labels are displayed or not
//  depending on displayLine prop in Axis.js
// VERSION : 2.0.0.3 : FA : ISIS-FT-3154 : 30/05/2018 : labels are displayed or not depending on
//  displayLine prop in Axis.js
// VERSION : 2.0.0.3 : FA : ISIS-FT-3181 : 07/06/2018 : Fix orientation of x axis for parametric
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';
import _each from 'lodash/each';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _has from 'lodash/has';
import _max from 'lodash/max';
import _min from 'lodash/min';
import _sum from 'lodash/sum';
import _keys from 'lodash/keys';
import _memoize from 'lodash/memoize';
import _uniq from 'lodash/uniq';
import classnames from 'classnames';
import LinksContainer from 'windowProcess/View/LinksContainer';
// TODO @JMIRA SAMPLING decomment if sampling is not guilty
import SamplingButtonContainer from 'windowProcess/View/SamplingButtonContainer';
import withDimensions from 'windowProcess/common/hoc/withDimensions';
import handleContextMenu from 'windowProcess/common/handleContextMenu';
import DroppableContainer from 'windowProcess/common/DroppableContainer';
import { getByField } from 'windowProcess/common/stringToIntegerMapSingleton';
import dateFormat, { TAI } from 'viewManager/commonData/date';
import getLogger from 'common/logManager';
import { updateSearchCountArray } from 'store/reducers/pages';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import Legend from './Legend';
import GrizzlyChart from './GrizzlyParametric/Chart';
import CloseableAlert from './CloseableAlert';
import styles from './PlotView.css';
import grizzlyStyles from './Grizzly/GrizzlyChart.css';
import { memoizeIsSignificantValue } from '../../../common';
import { parseDragData } from '../../../common/utils';
import { getCatalogItemMetadata } from '../../../../store/selectors/catalogs';

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
 * @param constants
 * @param data
 * @param visuWindow
 * @returns {{xAxes: Array, yAxes: Array}}
 * @pure
 */
export const getUniqAxes = (entryPoints, axes, grids, constants, data, visuWindow) => {
  let xAxesIds = [];
  const xAxes = [];
  let yAxesIds = [];
  const yAxes = [];
  let formatAsString = false;
  let stringField = null;
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
    const axisConstant = _filter(constants, constant => constant.axis === axisId);

    const axisEntryPoints = entryPoints
      .filter(ep =>
        (
          _get(ep, ['connectedData', 'axisId']) === axis.id
        )
      );

    axisEntryPoints.forEach((ep) => {
      formatAsString = !!getByField(_get(ep, ['connectedData', 'comObjectField']));
      stringField = formatAsString ? _get(ep, ['connectedData', 'comObjectField']) : stringField;
    });

    let dataMin = _min(axisEntryPoints.map(ep => data.min[ep.name]));
    let dataMax = _max(axisEntryPoints.map(ep => data.max[ep.name]));

    if (isNaN(dataMin)) {
      dataMin = 137;
    }

    if (isNaN(dataMax)) {
      dataMax = 140;
    }

    const delta = dataMax - dataMin;
    const margin = 0.1 * delta;
    const min = dataMin - margin;
    const max = dataMax + margin;

    yAxes.push({
      id: axis.id,
      extents: axis.autoLimits ? [min, max] : [axis.min, axis.max],
      orient: 'top',
      format: '.3f',
      showAxis: axis.showAxis,
      showLabels: axis.showLabels,
      showTicks: axis.showTicks,
      autoLimits: false,
      autoTick: axis.autoTick,
      tickStep: axis.tickStep,
      showGrid: _get(grid, 'showGrid', false),
      gridStyle: _get(grid, ['line', 'style']),
      gridSize: _get(grid, ['line', 'size']),
      unit: axis.unit,
      label: axis.label,
      labelStyle: axis.style,
      logarithmic: axis.logarithmic,
      logSettings: axis.logSettings,
      formatAsDate: !!axis.formatAsDate,
      constants: axisConstant,
      formatAsString,
      stringField,
    });
  });

  xAxesIds.forEach((axisId) => {
    // specific for asciss axis (x), always add time
    // it will only be drawn if an entry point is associated
    if (axisId === 'time') {
      return xAxes.push({
        id: 'time',
        orient: 'top',
        extents: [visuWindow && visuWindow.lower, visuWindow && visuWindow.upper],
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
        formatAsString,
      });
    }
    const axis = axes[axisId];
    const grid = grids.find(g => g.yAxisId === axis.id);
    const axisEntryPoints = entryPoints
      .filter(ep =>
        (ep.parametric && _get(ep, ['connectedDataParametric', 'xAxisId']) === axis.id)
      );

    const min = _min(axisEntryPoints.map(ep => data.minTime[ep.name]));
    const max = _max(axisEntryPoints.map(ep => data.maxTime[ep.name]));

    return xAxes.push({
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
      formatAsDate: axis.formatAsDate,
      formatAsString,
    });
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
 * @returns {{id, extents: *[], orient: string, format: string, showAxis: boolean, showLabels: boolean, showTicks: boolean, autoLimits: boolean, autoTick: boolean, tickStep, showGrid: *, gridStyle: *, gridSize: *, unit, label, labelStyle, logarithmic, logSettings: *|{base: PropTypes.number, max: PropTypes.number, min: PropTypes.number}|yAxis.logSettings|{base, max, min}|logSettings|{min, max, base}, formatAsDate: boolean}}
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
        <span className={grizzlyStyles.tooltipLineName} style={{ color }}>{id} :</span>
        <span className={grizzlyStyles.tooltipLineValue}>
          {packet.symbol ? packet.symbol : formattedValue}
        </span>
        <br />
        <strong>{dateFormat(packet.refTime, TAI)}</strong>
        {' '}
        {packet.valX ? <span>({dateFormat(packet.valX, TAI)})</span> : null}
      </p>
    </div>
  );

const stopInstruction = (packet, entryPoint, showEpNonNominal) => {
  let stop = false;
  if (showEpNonNominal.includes(entryPoint.id)) {
    stop = false;
  } else {
    stop = !memoizeIsSignificantValue(packet.validityState);
  }
  return stop;
};

const plotPadding = 15;
const securityTopPadding = 5;
const mainStyle = { padding: `${plotPadding}px` };

export class GrizzlyPlotView extends React.Component {
  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    updateDimensions: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
    saveLiveExtents: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
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
    entryPoints: PropTypes.shape(),
    configuration: PropTypes.shape({
      procedures: PropTypes.array,
      entryPoints: PropTypes.array,
      axes: PropTypes.object,
      showYAxes: PropTypes.string,
      showLegend: PropTypes.bool.isRequired,
      grids: PropTypes.array,
      constants: PropTypes.shape(),
      legend: PropTypes.object,
      markers: PropTypes.array,
    }).isRequired,
    toggleLegend: PropTypes.func.isRequired,
    toggleZoomState: PropTypes.func.isRequired,
    openInspector: PropTypes.func.isRequired,
    isInspectorOpened: PropTypes.bool.isRequired,
    inspectorEpId: PropTypes.string,
    openEditor: PropTypes.func.isRequired,
    closeEditor: PropTypes.func.isRequired,
    askRemoveEntryPoint: PropTypes.func.isRequired,
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
    catalogs: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    searchForThisView: PropTypes.bool.isRequired,
    updateSearchCount: PropTypes.func.isRequired,
    searching: PropTypes.string,
    searchCount: PropTypes.objectOf(PropTypes.shape),
    addMessage: PropTypes.func.isRequired,
    sessions: PropTypes.arrayOf(PropTypes.any),
    timelines: PropTypes.shape(),
  };

  static defaultProps = {
    data: {
      lines: [],
      cols: [],
    },
    visuWindow: null,
    inspectorEpId: null,
    links: [],
    showLinks: false,
  };

  state = {
    showEpNames: [],
    hideEpNames: [],
    showEpNonNominal: [],
    updateUnit: false,
    epNamesMatchWithSearching: [],
    searching: null,
    update: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.updateDimensions();
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      entryPoints,
    } = nextProps;

    Object.keys(entryPoints).forEach((catalogItem) => {
      if (entryPoints[catalogItem].dataId) {
        const {
          domainId,
          sessionId,
          catalog,
        } = entryPoints[catalogItem].dataId;
        if (
          domainId !== null &&
          sessionId !== null &&
          catalog !== null &&
          catalogItem !== null
        ) {
          this.setState({ updateUnit: true });
        } else {
          this.setState({ updateUnit: false });
        }
      } else {
        this.setState({ updateUnit: true });
      }
    });

    if (
      nextProps.configuration.entryPoints !== this.props.configuration.entryPoints ||
      nextProps.configuration.axes !== this.props.configuration.axes ||
      nextProps.configuration.grids !== this.props.configuration.grids ||
      nextProps.configuration.constants !== this.props.configuration.constants ||
      nextProps.visuWindow !== this.props.visuWindow ||
      nextProps.data !== this.props.data
    ) {
      const processedAxes = getUniqAxes(
        nextProps.configuration.entryPoints,
        nextProps.configuration.axes,
        nextProps.configuration.grids,
        nextProps.configuration.constants,
        nextProps.data,
        nextProps.visuWindow
      );
      this.xAxes = processedAxes.xAxes;
      this.yAxes = processedAxes.yAxes;
    }
    const { searching, searchForThisView } = nextProps;
    if (searching && this.state.searching !== searching) {
      this.state.searching = searching;
      this.state.update = true;
    }
    this.state.epNamesMatchWithSearching =
      this.getEntryPointSearchingAndUpdateCount(searching, searchForThisView);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.showLinks !== this.props.showLinks ||
      nextState.showEpNames !== this.state.showEpNames ||
      nextState.hideEpNames !== this.state.hideEpNames ||
      nextState.showEpNonNominal !== this.state.showEpNonNominal ||
      this.state.update ||
      nextState.hideEpNames !== this.state.hideEpNames ||
      nextState.updateUnit
    ) {
      return true;
    }

    const attrs = ['data', 'entryPoints', 'visuWindow', 'configuration',
      'containerWidth', 'containerHeight'];
    for (let i = 0; i < attrs.length; i += 1) {
      if (nextProps[attrs[i]] !== this.props[attrs[i]]) {
        return true;
      }
    }

    return false;
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
  getEntryPointSearchingAndUpdateCount = (searching, searchForThisView) => {
    const { viewId, searchCount, updateSearchCount, entryPoints } = this.props;
    if (searchForThisView && searching && searching.length > 1) {
      const epNamesMatchWithSearching =
        _keys(entryPoints).filter(name => name.match(searching) !== null);
      const searchCountArray =
        updateSearchCountArray(searchCount, viewId, epNamesMatchWithSearching.length);
      updateSearchCount(searchCountArray);
      return epNamesMatchWithSearching;
    }
    return [];
  }

  /**
   * TODO: Method drop: ready to be moved to directory viewManager/common and
   * TODO: factorized together with the onDrop method of HistoryView
   * @param ev
   */
  drop(e) {
    const {
      addEntryPoint,
      openEditor,
      configuration,
      sessions,
      timelines,
      viewId,
      defaultTimelineId,
      addMessage,
    } = this.props;
    const data = e.dataTransfer.getData('text/plain');
    const content = JSON.parse(data);
    const required = ['catalogName', 'comObjects', 'item', 'nameSpace', 'sessionName', 'domain'];
    const missing = required.filter(
      key => !_has(content, key)
    );
    if (!(missing.length === 0)) {
      const messageToDisplay = `Missing properties in dropped data: ${missing.join(', ')}.`;
      addMessage('danger', messageToDisplay);
    }
    const session = _find(
      sessions,
      item => item.id.toString() === content.sessionName.toString()
    );
    if (session === undefined) {
      const messageToDisplay = `No session is found with sessionName '${content.sessionName.toString()}'.`;
      addMessage('danger', messageToDisplay);
    }
    const timeline = _find(
      timelines,
      item => item.sessionName === session.name
    );
    if (timeline === undefined) {
      const messageToDisplay = `No timeline associated with sessionName '${content.sessionName.toString()} is found'.`;
      addMessage('danger', messageToDisplay);
    }
    const epId = getUniqueEpId(data.item || 'entryPoint', configuration.entryPoints);
    addEntryPoint(
      viewId,
      parseDragData(content, epId, timeline.id || defaultTimelineId)
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
      showEpNonNominal,
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
    newState.showEpNonNominal = [].concat(showEpNonNominal);
    this.setState(newState);
  };
  showNonNominal = (e, lineId) => {
    e.preventDefault();
    const {
      showEpNames,
      hideEpNames,
      showEpNonNominal,
    } = this.state;
    const newState = {};
    if (showEpNonNominal.includes(lineId)) {
      const index = showEpNonNominal.indexOf(lineId);
      showEpNonNominal.splice(index, 1);
    } else {
      showEpNonNominal.push(lineId);
    }
    newState.showEpNonNominal = [].concat(showEpNonNominal);
    newState.showEpNames = [].concat(showEpNames);
    newState.hideEpNames = [].concat(hideEpNames);
    this.setState(newState);
  };
  hideEp = (e, lineId) => {
    e.preventDefault();
    const {
      hideEpNames,
      showEpNames,
      showEpNonNominal,
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
    newState.showEpNonNominal = [].concat(showEpNonNominal);
    this.setState(newState);
  };
  removeEntryPoint = (e, id) => {
    e.preventDefault();
    const {
      askRemoveEntryPoint,
      entryPoints,
      viewId,
    } = this.props;
    const entryPointToRemove = Object.values(entryPoints).find(epk => epk.id === id);
    if (entryPointToRemove) {
      askRemoveEntryPoint(viewId, {
        ...entryPointToRemove,
        name: entryPointToRemove.dataId.parameterName,
      });
    } else {
      logger.error('No entry point found for id', id);
    }
  };
  removeLink = (e, index) => {
    e.preventDefault();
    const { removeLink, viewId } = this.props;
    removeLink(viewId, index);
  };
  zoomInDispatcher = () => {
    this.props.toggleZoomState(this.props.viewId);
  };
  render() {
    logger.debug('render');
    const noRender = this.shouldRender();
    if (noRender) {
      logger.debug('no render due to', noRender);
      // TODO : clean message component
      return (
        <ErrorBoundary>
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
        </ErrorBoundary>
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
        constants,
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
      catalogs,
      entryPoints,
    } = this.props;
    let entryPointsConfiguration = this.props.configuration.entryPoints;
    const {
      showEpNames,
      hideEpNames,
      showEpNonNominal,
    } = this.state;

    // On first render only
    if (!this.xAxes || !this.yAxes) {
      const processedAxes = getUniqAxes(
        this.props.configuration.entryPoints,
        axes,
        grids,
        constants,
        data,
        visuWindow
      );
      this.xAxes = processedAxes.xAxes;
      this.yAxes = processedAxes.yAxes;
    }
    if (showEpNames.length) {
      entryPointsConfiguration =
        entryPointsConfiguration.filter(ep => showEpNames.includes(ep.id));
    } else if (hideEpNames.length) {
      entryPointsConfiguration =
        entryPointsConfiguration.filter(ep => !hideEpNames.includes(ep.id));
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
        showNonNominal={this.showNonNominal}
        showEpNonNominal={showEpNonNominal}
        onContextMenu={this.onContextMenuLegend}
        removeEntryPoint={this.removeEntryPoint}
      />);

    return (
      <ErrorBoundary>
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
            allowPanshowEpNonNominal={showEpNonNominal}
            showEpNonNominal={showEpNonNominal}perfOutput={false}
            linesListener={memoizeLiveExtents(saveLiveExtents, viewId)}
            zoomPanListener={memoizeZoomOrPan(pause, viewId)}
            zoomInListener={() => { this.props.toggleZoomState(this.props.viewId); }}
            current={visuWindow.current}
            yAxesAt={showYAxes}
            xAxesAt="bottom"
            parametric
            additionalStyle={memoizeMainStyle(legend.location)}
            yAxes={this.yAxes}
            xAxes={this.xAxes}
            updateAxis={this.state.updateUnit}
            lines={
            entryPointsConfiguration.map((ep) => {
              let unit;
              if (entryPoints[ep.name] && entryPoints[ep.name].dataId) {
                const { domainId, sessionId, catalog, parameterName } =
                  entryPoints[ep.name].dataId;
                const metadata = getCatalogItemMetadata(
                  catalogs,
                  {
                    domainId,
                    sessionId,
                    catalogName: catalog,
                    catalogItemName: parameterName,
                  }
                );

                unit = (metadata || {}).unit || 'Unknown';
              } else {
                unit = ep.unit;
              }
              return {
                data: lines[ep.name],
                indexes: indexes[ep.name],
                id: ep.name,
                xAxisId: ep.parametric ? _get(ep, ['connectedDataParametric', 'xAxisId']) : 'time',
                yAxisId: ep.parametric ? _get(ep, ['connectedDataParametric', 'yAxisId']) : _get(ep, ['connectedData', 'axisId']),
                fill: _get(ep, ['objectStyle', 'curveColor']),
                displayLine: _get(ep, ['objectStyle', 'displayLine'], true),
                lineSize: _get(ep, ['objectStyle', 'displayLine'], true) === true
                  ? _get(ep, ['objectStyle', 'line', 'size'])
                  : 0,
                lineStyle: _get(ep, ['objectStyle', 'line', 'style']),
                displayPoints: _get(ep, ['objectStyle', 'displayPoints'], true),
                pointStyle: _get(ep, ['objectStyle', 'displayPoints'], true) === true
                  ? _get(ep, ['objectStyle', 'points', 'style'])
                  : 'None',
                pointSize: _get(ep, ['objectStyle', 'points', 'size']),
                dataAccessor: ep.name,
                stopInstruction: packet => stopInstruction(packet, ep, this.state.showEpNonNominal),
                xAccessor: null, // default packet => packet.x
                yAccessor: null, // default packet => packet.value
                xTooltipAccessor: null, // default packet => packet.x
                yTooltipAccessor: null, // default packet => packet.value
                colorAccessor: 'color',
                tooltipFormatter,
                highlighted: this.state.epNamesMatchWithSearching.indexOf(ep.name) !== -1,
                unit: ep.connectedData.convertTo ?
                    ep.connectedData.convertTo : unit,
                displayMode: ep.connectedData.displayMode,
              };
            })
          }
          />
          { (legend.location === 'bottom' || legend.location === 'right') &&
        legendComponent
        }
          <div className={styles.pvRow}>
            <div className={styles.firstPvColumn}>
              <LinksContainer
                show={showLinks}
                toggleShowLinks={this.toggleShowLinks}
                links={links}
                removeLink={this.removeLink}
                viewId={viewId}
                pageId={pageId}
              />
            </div>
            <div className={styles.pvColumn}>
              <SamplingButtonContainer
                viewId={viewId}
                pageId={pageId}
              />
            </div>
          </div>
        </DroppableContainer>
      </ErrorBoundary>
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
