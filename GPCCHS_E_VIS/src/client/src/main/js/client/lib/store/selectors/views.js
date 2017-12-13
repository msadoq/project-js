// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5316 : 08/02/2017 : Add viewData points count in right bar explorer
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Creation of timebarTimelines reducer .
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : Remove useless selectors for state colors
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : Add getentrypointsname in view selector
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : Refactoring of dataMap generation using reselect
// VERSION : 1.1.2 : DM : #3622 : 27/02/2017 : merge dev into abesson-html-editor and resolve conflicts
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse bugs
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse views
// VERSION : 1.1.2 : DM : #3622 : 06/03/2017 : Fix bug remount all views
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove unused selectors . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPage and getPages selectors
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Add comments on all selectors
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove unused getEntryPointOnAxis selector .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Creation of data store for plotView
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Cleanup in selectors . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Rename comments about simple/derived selectors
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Rename '__' in '_' (lodash/fp)
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move simple selectors from selectors/views to reducers/views
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getPageIdByViewId simple selector in reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getView/getViews simple selectors in store/reducers/views
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Add some comments . .
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Remove useless line in selectors/views
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : Add getWindowAllViewsIds selector in selectors/views
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 24/08/2017 : Fixed few eslint errors / warnings no-console and spaced-comment.
// VERSION : 1.1.2 : DM : #6700 : 29/08/2017 : fix unnecessary datamap generation .
// END-HISTORY
// ====================================================================

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
