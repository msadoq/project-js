// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 14/02/2017 : Explorer Right panel refactoring .
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Creation of timebarTimelines reducer .
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Ignore not loaded views in dataMap and data requesting
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Add displayHelp key in window reducer to store help screen state in store
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Remove the explorer resizable behavior and use panels data to handle show/hide
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Remove old explorer keys from store
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/hsc . . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Simplify simple selector getWindowsArray .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPage and getPages selectors
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Add comments on all selectors
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Rename comments about simple/derived selectors
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Cleanup in selectors . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove unused selectors . .
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Rename somme comments in store/selectors
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getView/getViews simple selectors in store/reducers/views
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move all windows simple selectors in store/reducers/windows
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Import getViews instead of recode it
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Move getWindowsTitle in windowsManager/selectors .
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Move getWindowsVisibleViews in dataManager/map.js .
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Move getModifiedWindowsIds in menuManager selectors
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Add number of points per view in explorer panel
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Rewrite all saving page code
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Fix selector in onSaveView documents middleware
// VERSION : 1.1.2 : DM : #6816 : 06/09/2017 : test perfs on hss process
// VERSION : 1.1.2 : DM : #6700 : 07/09/2017 : Fix linting error . .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import _get from 'lodash/get';
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';

import { getFocusedWindowId } from '../reducers/hsc';
import { getPages, getPageIdByViewId } from '../reducers/pages';
import {
  getWindows,
  getWindowPageIds,
  getWindowFocusedPageId,
  getWindowsArray,
  getWindowIdByPageId,
} from '../reducers/windows';
import { getViews } from '../reducers/views';


export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  _.isEqual
);

// composed
export const getFocusedWindow = createSelector(
  getWindows,
  getFocusedWindowId,
  _get
);

// composed
export const getWindowPages = createSelector(
  getWindowPageIds,
  getPages,
  (ids = [], pages) => ids.map(id => ({ ...pages[id], pageId: id }))
);

// composed
export const getWindowFocusedPageSelector = createSelector(
  getWindowFocusedPageId,
  getPages,
  _.get
);

export const getWindowByPageId = createSelector(
  getWindows,
  (state, { pageId }) => pageId,
  (windows, pageId) => _.find(
    _.compose(_.find(_.equals(pageId)), _.get('pages')),
    windows
  )
);

/* -------------------------------------------------------------------------- */
const getWindowsFocusedPageIds = createSelector(
  getWindowsArray,
  windows =>
    windows
      .filter(w => w.isLoaded === true && w.focusedPage)
      .map(w => w.focusedPage)
);

const getWindowsFocusedPage = createSelector(
  createDeepEqualSelector(getWindowsFocusedPageIds, _.identity),
  getPages,
  (pageIds, pages) => pageIds.filter(id => id in pages).map(id => pages[id])
);

const getWindowsVisibleViewIds = createSelector(
  getWindowsFocusedPage,
  pages => pages
      .filter(p => p.views && p.views.length && p.timebarUuid)
      .map(p => ({
        timebarUuid: p.timebarUuid,
        viewIds: p.views,
      }))
);

export const getWindowsVisibleViews = createSelector(
  getWindowsVisibleViewIds,
  getViews,
  (viewIds, views) => viewIds
      .map(p => p.viewIds.map(vId => ({
        timebarUuid: p.timebarUuid,
        viewId: vId,
      })))
      .reduce((acc, ids) => acc.concat(ids), [])
      .filter(v => !!views[v.viewId])
      .map(v => ({
        ...v,
        viewData: views[v.viewId],
      }))
);

export const getWindowIdByViewId = (state, { viewId }) => {
  const pageId = getPageIdByViewId(state, { viewId });
  return getWindowIdByPageId(state, { pageId });
};
/* -------------------------------------------------------------------------- */
