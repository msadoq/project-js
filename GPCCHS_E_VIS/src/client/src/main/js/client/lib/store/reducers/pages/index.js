import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import * as types from '../../types';
import page from './page';

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
    case types.WS_PAGE_OPEN:
    case types.WS_PAGE_ADD_BLANK:
      return _.set(action.payload.page.uuid, page(undefined, action), statePages);
    case types.WS_PAGE_CLOSE:
      return _.omit(action.payload.pageId, statePages);
    case types.WS_VIEW_MOVE_TO_PAGE: {
      return moveViewToPage(statePages, action);
    }
    case types.WS_WORKSPACE_OPEN: {
      return loadPages(statePages, action);
    }
    case types.WS_VIEW_UPDATE_ABSOLUTEPATH: {
      const pageId = _.findKey(
        p => _.findIndex(i => i === action.payload.viewId, p.views) !== -1,
        statePages
      );
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

const inPage = (key, fallback) => _.compose(_.getOr(fallback, key), getPage);

export const getPanels = inPage('panels', {});
export const getPageViewsIds = inPage('views', []);
export const getPageLayout = inPage('layout', []);
export const getEditor = inPage('editor', {});

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
