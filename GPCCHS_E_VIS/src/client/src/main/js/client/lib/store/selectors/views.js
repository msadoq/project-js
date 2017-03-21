import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import _ from 'lodash/fp';
import makeGetPerViewData from '../../dataManager/perViewData';
import { getPage, getPageIdByViewId } from '../reducers/pages';
import { getView, getViews } from '../reducers/views';
import { configurationReducers } from '../../viewManager/';

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  _.isEqual
);

// simple
export const getModifiedViewsIds = state =>
  Object
    .keys(getViews(state))
    .filter(vId => state.views[vId].isModified);

// simple
export const getViewConfiguration = createSelector(
  getView,
  _.prop('configuration')
);

// simple
export const getViewContent = createSelector(
  getViewConfiguration,
  _.prop('content')
);
/* ********************************************************
* Comparison function to omit timebars in comparison
* Useful to compute perView and perRemoteId which are independent of visuWinow
// ********************************************************/
function perViewDataEqualityCheck(current, previous) {
  if (current.timebarTimelines !== previous.timebarTimelines // TODO : use a shallow equals
    || current.timelines !== previous.timelines
    || current.windows !== previous.windows
    || current.pages !== previous.pages
    || current.views !== previous.views
    || current.domains !== previous.domains
    || current.sessions !== previous.sessions
    || current.masterSession !== previous.masterSession
    || current.timebarTimelines !== previous.timebarTimelines) {
    return false;
  }
  const confs = Object.keys(configurationReducers);
  for (let i = 0; i < confs.length; i += 1) {
    if (current[confs[i]] !== previous[confs[i]]) {
      return false;
    }
  }
  // ViewId
  if (typeof previous === 'string' && previous !== current) {
    return false;
  }
  return true;
  // return _isEqual(_omit(current, 'timebars'), _omit(previous, 'timebars'));
}
export const createDeepEqualSelectorPerViewData = createSelectorCreator(
  defaultMemoize,
  perViewDataEqualityCheck
);
const perViewDataSelectors = {};
// composed
export const getPerViewData = createDeepEqualSelectorPerViewData(
  state => state,
  (state, { viewId }) => viewId,
  (state, { viewId }) => getPage(state, { pageId: getPageIdByViewId(state, { viewId }) }),
  (state, viewId, page) => {
    if (!perViewDataSelectors[viewId]) {
      perViewDataSelectors[viewId] = makeGetPerViewData();
    }
    // const pageId = getPageIdByViewId(state, { viewId });
    // const page = getPage(state, { pageId });
    const { timebarUuid } = page;
    return perViewDataSelectors[viewId](state, { viewId, timebarUuid });
  });

// composed / to rename ?
export const getViewEntryPoints = (state, { viewId }) => (
  _.get('entryPoints', getPerViewData(state, { viewId })));

// composed
export const getViewEntryPointsName = createSelector(getViewEntryPoints, entryPoints =>
  _.map(ep => ep.name, entryPoints)
);

// composed
export const getViewEntryPoint = (state, { viewId, epName }) =>
  Object.assign({}, getViewEntryPoints(state, { viewId })[epName], { name: epName });
