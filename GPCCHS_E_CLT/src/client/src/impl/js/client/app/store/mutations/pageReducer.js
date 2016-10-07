import _ from 'lodash';
import u from 'updeep';
import * as types from '../types';

/**
 * Reducer
 */
export default function pages(statePages = {}, action) {
  switch (action.type) {
    case types.WS_PAGE_EDITOR_OPEN:
    case types.WS_PAGE_EDITOR_CLOSE:
    case types.WS_PAGE_VIEW_MOUNT:
    case types.WS_PAGE_VIEW_UNMOUNT:
    case types.WS_PAGE_UPDATE_LAYOUT:
      return Object.assign({}, statePages, {
        [action.payload.pageId]: page(statePages[action.payload.pageId], action)
      });
    case types.WS_PAGE_ADD:
      return {
        ...statePages,
        [action.payload.pageId]: page(undefined, action),
      };
    case types.WS_PAGE_REMOVE:
      return _.omit(statePages, [action.payload.pageId]);
    default:
      return statePages;
  }
}

const initialState = {
  title: 'Unknown',
  timebarId: null,
  layout: [],
  views: [],
  editor: {
    isOpened: false,
    viewId: null,
    viewType: null,
    configuration: null,
  },
};

function page(statePage = initialState, action) {
  switch (action.type) {
    case types.WS_PAGE_ADD:
      return Object.assign({}, statePage, {
        title: action.payload.title || statePage.title,
        timebarId: action.payload.timebarId || statePage.timebarId,
        layout: action.payload.layout || statePage.layout,
        views: action.payload.views || statePage.views,
      });
    case types.WS_PAGE_EDITOR_OPEN:
      return u({
        editor: {
          isOpened: true,
          viewId: action.payload.viewId,
          viewType: action.payload.viewType,
          configuration: action.payload.configuration,
        },
      }, statePage);
    case types.WS_PAGE_EDITOR_CLOSE:
      return u({ editor: { isOpened: false } }, statePage);
    case types.WS_PAGE_VIEW_MOUNT:
      return Object.assign({}, statePage, {
        views: [...statePage.views, action.payload.viewId],
      });
    case types.WS_PAGE_VIEW_UNMOUNT:
      return Object.assign({}, statePage, {
        views: _.without(statePage.views, action.payload.viewId),
      });
    case types.WS_PAGE_UPDATE_LAYOUT:
      return Object.assign({}, statePage, {
        layout: action.payload.layout || statePage.layout,
      });
    default:
      return statePage;
  }
}

/**
 * Selectors
 */
export function getPage(state, pageId) {
  return state.pages[pageId];
}

export function getViews(state, pageId) {
  if (!pageId || !_.get(state, `pages.${pageId}.views`)) { // TODO TEST
    return [];
  }

  return _.reduce(state.pages[pageId].views, (views, id) => {
    const view = state.views[id];
    if (!view) {
      return views;
    }

    return [...views, Object.assign({ viewId: id }, view)];
  }, []);
}

export function getEditor(state, pageId) { // TODO TESt
  if (!pageId) {
    return null;
  }

  return _.get(state, `pages.${pageId}.editor`);
}
