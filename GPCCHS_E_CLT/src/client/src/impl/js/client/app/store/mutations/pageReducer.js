import _ from 'lodash';
import u from 'updeep';
import * as types from './types';

/**
 * Reducer
 */
export default function pages(state = {}, action) {
  switch (action.type) {
    case types.WS_PAGE_EDITOR_OPEN:
    case types.WS_PAGE_EDITOR_CLOSE:
    case types.WS_PAGE_VIEW_MOUNT:
    case types.WS_PAGE_VIEW_UNMOUNT:
    case types.WS_PAGE_UPDATE_LAYOUT:
      return Object.assign({}, state, {
        [action.payload.pageId]: page(state[action.payload.pageId], action)
      });
    case types.WS_PAGE_ADD:
      return {
        ...state,
        [action.payload.pageId]: page(undefined, action),
      };
    case types.WS_PAGE_REMOVE:
      return _.omit(state, [action.payload.pageId]);
    default:
      return state;
  }
}

const initialState = {
  title: 'Unknown',
  layout: [],
  views: [],
  editor: {
    isOpened: false,
    viewId: null,
    viewType: null,
    configuration: null,
  },
};

function page(state = initialState, action) {
  switch (action.type) {
    case types.WS_PAGE_ADD:
      return Object.assign({}, state, {
        title: action.payload.title || state.title,
        layout: action.payload.layout || state.layout,
        views: action.payload.views || state.views,
      });
    case types.WS_PAGE_EDITOR_OPEN:
      return u({
        editor: {
          isOpened: true,
          viewId: action.payload.viewId,
          viewType: action.payload.viewType,
          configuration: action.payload.configuration,
        },
      }, state);
    case types.WS_PAGE_EDITOR_CLOSE:
      return u({ editor: { isOpened: false } }, state);
    case types.WS_PAGE_VIEW_MOUNT:
      return Object.assign({}, state, {
        views: [...state.views, action.payload.viewId],
      });
    case types.WS_PAGE_VIEW_UNMOUNT:
      return Object.assign({}, state, {
        views: _.without(state.views, action.payload.viewId),
      });
    case types.WS_PAGE_UPDATE_LAYOUT:
      return Object.assign({}, state, {
        layout: action.payload.layout || state.layout,
      });
    default:
      return state;
  }
}

/**
 * Selectors
 */
export function getPage(state, pageId) {
  return state.pages[pageId];
}

export function getViews(state, pageId) {
  if (!pageId || !_.get(state, `pages.${pageId}.views`)) { // TODO replicate on getPages + TEST
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

export function getLayout(state, pageId) { // TODO
  return {};
}
