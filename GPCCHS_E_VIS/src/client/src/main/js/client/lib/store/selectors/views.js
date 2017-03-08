import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import __ from 'lodash/fp';
import _omit from 'lodash/omit';
import _isEqual from 'lodash/isEqual';
import { compile } from '../../common/operators';
import makeGetPerViewData from '../../dataManager/perViewData';
import { getPageIdByViewId, getPage } from './pages';
// import { getPerViewData } from '../../dataManager/map';

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

export const getViewsIdsCollapsed = createSelector(
  getViews,
  views => __.keys(__.pickBy('configuration.collapsed', views))
);

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
/* ********************************************************
* Comparison function to omit timebars in comparison
* Useful to compute perView and perRemoteId which are independent of visuWinow
// ********************************************************/
function withoutTimebarsEqualityCheck(current, previous) {
  return _isEqual(_omit(current, 'timebars'), _omit(previous, 'timebars'));
}
export const createDeepEqualSelectorWithoutTimebars = createSelectorCreator(
  defaultMemoize,
  withoutTimebarsEqualityCheck
);
const perViewDataSelectors = {};
export const getPerViewData = createDeepEqualSelectorWithoutTimebars(
  state => state,
  (state, { viewId }) => viewId,
  (state, viewId) => {
    if (!perViewDataSelectors[viewId]) {
      perViewDataSelectors[viewId] = makeGetPerViewData();
    }
    const pageId = getPageIdByViewId(state, { viewId });
    const page = getPage(state, { pageId });
    const { timebarUuid } = page;
    return perViewDataSelectors[viewId](state, { viewId, timebarUuid });
  });

export const getViewEntryPoints = (state, { viewId }) => (
  __.get('entryPoints', getPerViewData(state, { viewId }))
);

export const getViewEntryPointsName = createSelector(getViewEntryPoints, entryPoints =>
  __.map(ep => ep.name, entryPoints)
);

export const getViewEntryPoint = (state, { viewId, epName }) =>
  Object.assign({}, getViewEntryPoints(state, { viewId })[epName], { name: epName });

export const getViewEntryPointStateColors = createSelector(
  getViewEntryPoint,
  ep => ep.stateColors || []
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
