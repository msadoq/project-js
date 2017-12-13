import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import _ from 'lodash/fp';
import _isEqual from 'lodash/isEqual';
import makeGetPerViewData from 'dataManager/perViewData';
import { configurationReducers } from 'viewManager';
import { getPage, getPages, getPageIdByViewId } from '../reducers/pages';
import { getWindowPageIds } from '../reducers/windows';

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  _.isEqual
);

/* ********************************************************
* Comparison function to omit timebars in comparison
* Useful to compute perView and perRemoteId which are independent of visuWinow
******************************************************* */
function arePagesEqual(currentPages, previousPages) {
  const currentIds = Object.keys(currentPages);
  const previousIds = Object.keys(previousPages);
  if (!_isEqual(currentIds, previousIds)) {
    return false;
  }
  for (let i = 0; i < currentIds.length; i += 1) {
    const currentPage = currentPages[currentIds[i]];
    const previousPage = previousPages[currentIds[i]];
    if (currentPage.layout !== previousPage.layout
      || currentPage.views !== previousPage.views) {
      return false;
    }
  }
  return true;
}

function perViewDataEqualityCheck(current, previous) {
  if (current.timelines !== previous.timelines
    || current.windows !== previous.windows
    || current.views !== previous.views
    || current.domains !== previous.domains
    || current.sessions !== previous.sessions
    || current.masterSession !== previous.masterSession
    || current.timebarTimelines !== previous.timebarTimelines) {
    return false;
  }
  if (current.pages !== previous.pages) {
    if (!arePagesEqual(current.pages, previous.pages)) {
      return false;
    }
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
    return perViewDataSelectors[viewId](state, { viewId, timebarUuid, pageId: page.uuid });
  });

// composed / to rename ?
export const getViewEntryPoints = (state, { viewId }) => (
  _.get('entryPoints',
    getPerViewData(state, { viewId })));

// composed
export const getViewEntryPointsName = createSelector(getViewEntryPoints, entryPoints =>
  _.map(ep => ep.name, entryPoints)
);

// composed
export const getViewEntryPoint = (state, { viewId, epName }) =>
  Object.assign({}, getViewEntryPoints(state, { viewId })[epName], { name: epName });

export const getWindowAllViewsIds = createSelector(
  getWindowPageIds,
  getPages,
  (ids, pages) => _.pipe(
    _.pick(ids),
    _.flatMap('views'),
    _.compact
  )(pages)
);
