// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for
//  each reducer
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Refacto some selectors . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPageLayout simple selector in reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPanels selectors in reducers folder
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPage and getPages selectors
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPageViewsIds simple selector in
//  reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getModifiedPagesIds simple selector in
//  reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getEditor simple selector in reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getPageIdByViewId simple selector in
//  reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : set page modified when one of its views is saved as
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Prevent renderer crash when close all pages
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Refacto opening a view .
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : SaveAs at a different path should set workspace
//  isModified
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Change addBlankView action creator signature
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : Remove correspondingh views and pages when close a
//  window
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : Check if editors are closed in smartPlay action
//  creator
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add getPageIsModified selectors . .
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Create getPageAbsolutePath selector in
//  reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add domainName and sessionName on view, window, page
//  and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add domainName and sessionName on view, window, page
//  and hsc in store
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Rename documentManager actions . .
// VERSION : 2.0.0 : DM : #7111 : 25/09/2017 : Add current in history view data
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : #10835 : 23/02/2018 : head color on views depends on domains
// END-HISTORY
// ====================================================================

import { createSelector } from 'reselect';
import _ from 'lodash/fp';
import _map from 'lodash/map';
import { SEARCH_VIEWS_TYPE } from 'constants';

import * as types from 'store/types';
import page from './page';
import { getViewType } from '../views';
import { getConfigurationByViewId } from '../../../viewManager/selectors';

/* --- Reducer -------------------------------------------------------------- */

// move a view to a page
const moveViewToPage = (statePages, action) => {
  const { fromPageId, toPageId, viewId } = action.payload;
  if (fromPageId === toPageId) {
    return statePages;
  }

  const fromPage = statePages[fromPageId];
  const viewGeometry = _.find(_.propEq('i', viewId), fromPage.layout);
  const resetPosition = _.pipe(
    _.set('x', 0),
    _.set('y', 0)
  );

  const moveView = _.pipe(
    _.update([toPageId, 'layout'], _.concat(_, resetPosition(viewGeometry))),
    _.update([toPageId, 'views'], _.concat(_, viewId)),
    _.update([fromPageId, 'views'], _.remove(_.equals(viewId))),
    _.update([fromPageId, 'layout'], _.remove(_.propEq('i', viewId))),
    _.set([fromPageId, 'isModified'], true),
    _.set([toPageId, 'isModified'], true)
  );
  return moveView(statePages);
};

// load pages
const loadPages = (statePages, action) => {
  const setPayloadPage = _.set('payload.page');
  const singlePageReducer = statePage => page(undefined, setPayloadPage(statePage, action));
  return _.compose(
    _.defaults(statePages),          // 3. merge with old statePages
    _.indexBy('uuid'),               // 2. index pages array by uuid
    _.map(singlePageReducer)         // 1. apply single page reducer on all pages
  )(action.payload.pages);
};

// Main pages reducer
const pagesReducer = (statePages = {}, action) => {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_PAGE_OPENED:
    case types.WS_PAGE_ADD_BLANK:
      return _.set(action.payload.page.uuid, page(undefined, action), statePages);
    case types.WS_WINDOW_CLOSE:
      return _.omit(action.payload.pages, statePages);
    case types.WS_PAGE_CLOSE:
      return _.omit(action.payload.pageId, statePages);
    case types.WS_VIEW_MOVE_TO_PAGE: {
      return moveViewToPage(statePages, action);
    }
    case types.WS_WORKSPACE_OPENED: {
      return loadPages(statePages, action);
    }
    case types.WS_VIEW_UPDATE_ABSOLUTEPATH: {
      const pageId = _.findKey(
        p => _.findIndex(i => i === action.payload.viewId, p.views) !== -1,
        statePages
      );
      return _.set(pageId, page(statePages[pageId], action), statePages);
    }
    case types.WS_PAGE_UPDATE_DOMAINNAME:
    case types.WS_PAGE_UPDATE_SESSIONNAME: {
      const pageId = action.payload.pageId;
      return _.set(pageId, page(statePages[pageId], action), statePages);
    }
    default: {
      if (
        action.payload &&
        action.payload.pageId &&
        statePages[action.payload.pageId]
      ) {
        const updatePage = _.update(action.payload.pageId, pageState => page(pageState, action));
        return updatePage(statePages);
      }
      return statePages;
    }
  }
};

export default pagesReducer;

/* --- Selectors ------------------------------------------------------------ */

export const getPages = state => state.pages;
export const getPage = (state, { pageId }) => state.pages[pageId] && { // TODO use page.uuid instead
  ...state.pages[pageId], pageId,
};

const inPage = (key, fallback = null) => _.compose(_.getOr(fallback, key), getPage);

export const getPanels = inPage('panels', {});
export const getPageViewsIds = inPage('views', []);
export const getPageLayout = inPage('layout', []);
export const getEditor = inPage('editor', {});
export const getPageAbsolutePath = inPage('absolutePath', '');
export const getPageIsModified = inPage('isModified');
export const getPageDomainName = inPage('domainName');
export const getPageSessionName = inPage('sessionName');
export const getPageTimebarId = inPage('timebarUuid');

export const isEditorOpened = (state, { pageId }) => _.get(['pages', pageId, 'panels', 'editorWidth']) > 0;

export const getSearchCount = createSelector(
  state => state,
  getPage,
  getPanels,
  (state, mypage, panels) => panels.searchCount
);

export const getModifiedPagesIds = createSelector(
  getPages,
  _.pipe(
    _.filter(_.propEq('isModified', true)),
    _.map('uuid')
  )
);

export const getPageIdByViewId = createSelector(
  getPages,
  (state, { viewId }) => viewId,
  (pages, viewId) => _.pipe(
    _.find(_.pipe(
      _.get('views'),
      _.find(_.equals(viewId))
    )),
    _.get('uuid')
  )(pages)
);

export const getPageViewsConfiguration = createSelector(
  state => state,
  getPageViewsIds,
  (state, viewIds) => _map(
    viewIds,
    viewId => getConfigurationByViewId(state, { viewId })
  )
);

export const getSearchingByPage = createSelector(
  state => state,
  getPage,
  (state, mypage) => mypage.searching
);

export const getSearchViewsIds = createSelector(
  state => state,
  getPage,
  getPanels,
  (state, mypage, panel) => panel.searchViewsIds
);

export const getPageViewsIdsForSearch = createSelector(
  state => state,
  getPageViewsIds,
  (state, viewIds) => {
    const viewsIdsForSearch = [];
    _.forEach(
      (viewId) => {
        if (SEARCH_VIEWS_TYPE.indexOf(getViewType(state, { viewId })) !== -1) {
          viewsIdsForSearch.push(viewId);
        }
      },
      viewIds
    );
    return viewsIdsForSearch;
  }
);

export const getPageTitle = createSelector(
  getPage,
  _.prop('title')
);

export const updateSearchCountArray = (searchCount, viewId, count) => {
  let newObject;
  if (!searchCount) {
    newObject = {};
  } else {
    newObject = searchCount;
  }
  newObject[viewId] = count;
  return newObject;
};

export const computeSearhCount = (searchCountObject) => {
  if (_.size(searchCountObject)) {
    return Object.values(searchCountObject).reduce((a, b) => a + b);
  }
  return 0;
};

