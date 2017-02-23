import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import __ from 'lodash/fp';
import u from 'updeep';
import { getData } from './viewData';
import { compile } from '../../common/operators';
import { getDomains } from './domains';
import { getTimebars, _getTimebarTimelines } from './timebars';
import { getTimelines } from './timelines';
import { getWindowsVisibleViews } from './windows';
import { _getViewData as viewData } from '../../dataManager/map';
import { getMasterSessionId } from './masterSession';
import { getTimebarsTimelines } from './timebarTimelines';

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  __.isEqual
);

export const getViews =
  __.prop('views');

export const getView =
  (state, { viewId }) =>
    __.prop(viewId, getViews(state));

export const getEntryPointOnAxis = (state, { viewId, axisId }) => {
  const epOnAxis = [];
  if (!state.views[viewId] || !state.views[viewId].configuration.axes[axisId]) {
    return epOnAxis;
  }
  state.views[viewId].configuration.entryPoints.forEach((ep) => {
    if (ep.connectedDataX.axisId === axisId || ep.connectedDataY.axisId === axisId) {
      epOnAxis.push(ep.name);
    }
  });
  return epOnAxis;
};

export const getModifiedViewsIds = state =>
  Object
    .keys(getViews(state))
    .filter(vId => state.views[vId].isModified);

export const getViewConfiguration = createSelector(
  getView,
  __.prop('configuration')
);

export const getViewContent = createSelector(
  getViewConfiguration,
  __.prop('content')
);

export const _getViewEntryPoints = createSelector(
  getView,
  getMasterSessionId,
  getWindowsVisibleViews,
  getDomains,
  getTimebars,
  getTimelines,
  (state, { viewId }) => viewId,
  getTimebarsTimelines,
  (view, masterSessionId, visibleViews, domains, timebars, timelines, viewId,
    timebarsTimelines) => {
    const visibleView = visibleViews.find(v => v.viewId === viewId);
    const timebarUuid = __.get('timebarUuid', visibleView);
    const viewTimelines = _getTimebarTimelines(timebarsTimelines[timebarUuid], timelines);

    const data = viewData({
      domains,
      timebars,
      timelines,
      view: __.get('viewData', visibleView),
      timebarUuid,
      masterSessionId,
      viewTimelines,
    });

    return __.pipe(
      __.pathOr([], ['configuration', 'entryPoints']),
      entryPoints => entryPoints.map(
        (ep, i) => {
          const error = __.get(['epsData', i, 'error'], data);
          return error ?
            __.assoc('error', error, ep) :
            ep;
        }
      )
    )(view);
  }
);

export const makeGetViewEntryPoints = () => createDeepEqualSelector(
  _getViewEntryPoints,
  __.identity
);

export const getViewEntryPoints = makeGetViewEntryPoints();

export const getViewEntryPointsName = createSelector(getViewEntryPoints, entryPoints =>
  entryPoints.map(ep => ep.name)
);

export const getViewEntryPoint = (state, { viewId, epName }) =>
  getViewEntryPoints(state, { viewId })
    .find(ep => ep.name === epName);

export const getViewEntryPointStateColors = createSelector(
  getViewEntryPoint,
  __.propOr([], 'stateColors')
);

const _getEntryPoint = (epName, entryPoints) => entryPoints.find(ep => ep.name === epName);

export const _getEntryPointColorObj = ({ entryPoints, epName, value, dataProp }) => {
  const stateColor = __.propOr([], 'stateColors', _getEntryPoint(epName, entryPoints))
    .filter(c =>
      (new RegExp(`${__.pathOr('', ['condition', 'field'], c)}$`, 'g'))
        .test(__.pathOr('', [dataProp, 'formula'], _getEntryPoint(epName, entryPoints))))
    .find(c => compile(c.condition)(value));
  if (__.prop('color', stateColor)) {
    return {
      color: __.prop('color', stateColor),
    };
  }
  return undefined;
};

// Return value obj for TextView with color and check if entryPoint is valid
const _getTextValueFn = (entryPoints, epName) => ({ value, ...args }) => ({
  value,
  ...args,
  ..._getEntryPointColorObj({
    entryPoints,
    epName,
    value,
    dataProp: 'connectedData',
  }),
});

// Apply state colors on entry points value and return view data with state colors
export const getTextViewData = createSelector(
    getViewEntryPoints,
    getData,
    (entryPoints, data) => u({
      values: {
        ...Object.keys(__.getOr({}, ['values'], data)).reduce((acc, epName) => ({
          ...acc,
          [epName]: _getTextValueFn(entryPoints, epName),
        }), {}),
      },
    }, data)
);
