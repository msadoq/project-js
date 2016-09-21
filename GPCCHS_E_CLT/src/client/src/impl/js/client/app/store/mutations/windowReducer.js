import _ from 'lodash';
import * as types from './types';
import { getViews } from './pageReducer';
import { getConnectedData } from './viewReducer';

/**
 * Reducer
 */
export default function windows(state = {}, action) {
  switch (action.type) {
    case types.WS_WINDOW_UPDATE_GEOMETRY:
    case types.WS_WINDOW_PAGE_FOCUS:
    case types.WS_WINDOW_PAGE_REORDER:
    case types.WS_WINDOW_PAGE_MOUNT:
    case types.WS_WINDOW_PAGE_UNMOUNT:
      return Object.assign({}, state, {
        [action.payload.windowId]: window(state[action.payload.windowId], action)
      });
    case types.WS_WINDOW_ADD:
      return {
        ...state,
        [action.payload.windowId]: window(undefined, action),
      };
    case types.WS_WINDOW_REMOVE:
      return _.omit(state, [action.payload.windowId]);
    default:
      return state;
  }
}

const initialState = {
  title: 'Unknown',
  focusedPage: null,
  pages: [],
  geometry: {
    w: 800,
    h: 600,
    x: 10,
    y: 10,
  },
};

function window(state = initialState, action) {
  switch (action.type) {
    case types.WS_WINDOW_ADD:
      return Object.assign({}, state, {
        title: action.payload.title || state.title,
        geometry: Object.assign({}, state.geometry, action.payload.geometry),
        pages: action.payload.pages || state.pages,
      });
    case types.WS_WINDOW_UPDATE_GEOMETRY: {
      return Object.assign({}, state, {
        geometry: _.defaults({}, _.omit(action.payload, ['windowId']), state.geometry),
      });
    }
    case types.WS_WINDOW_PAGE_FOCUS:
      return Object.assign({}, state, {
        focusedPage: action.payload.pageId,
      });
    case types.WS_WINDOW_PAGE_REORDER:
      const { remaining, sorted } = _.reduce(action.payload.pages, (acc, pageId) => {
        return {
          remaining: _.without(acc.remaining, pageId),
          sorted: (state.pages.indexOf(pageId) !== -1) ? [...acc.sorted, pageId] : acc.sorted,
        };
      }, { remaining: _.clone(state.pages), sorted: [] });
      return Object.assign({}, state, {
        pages: [...sorted, ...remaining],
      });
    case types.WS_WINDOW_PAGE_MOUNT:
      return Object.assign({}, state, {
        pages: [...state.pages, action.payload.pageId],
      });
    case types.WS_WINDOW_PAGE_UNMOUNT:
      return Object.assign({}, state, {
        pages: _.without(state.pages, action.payload.pageId),
      });
    default:
      return state;
  }
}

/**
 * Selectors
 */
export function getWindow(state, windowId) {
  return state.windows[windowId];
}

export function getPages(state, windowId) {
  if (!windowId || !_.get(state, `windows.${windowId}.pages`)) { // TODO TEST
    return [];
  }

  return _.reduce(state.windows[windowId].pages, (pages, id) => {
    const page = state.pages[id];
    if (!page) {
      return pages;
    }

    return [...pages, Object.assign({ pageId: id }, page)];
  }, []);
}

export function getFocusedPage(state, windowId) {
  const w = state.windows[windowId];
  if (!w) {
    return null;
  }

  const pages = w.pages;
  if (!pages || !pages.length) {
    return null;
  }

  let pageId = w.focusedPage;
  if (!pageId || !pages.indexOf(pageId) === -1 || !state.pages[pageId]) {
    // take first existing pages
    pageId = _.find(pages, uuid => !!state.pages[uuid]);
  }

  return pageId;
}

/**
 * Return a list a all pub/sub subscriptions to mount in this window
 * @param state
 * @param windowId
 */
export function getWindowSubscriptions(state, windowId) {
  const cds = [];
  _.each(getPages(state, windowId), ({ pageId }) => {
    if (pageId) {
      _.each(getViews(state, pageId), ({ viewId }) => {
        if (viewId) {
          _.each(getConnectedData(state, viewId), connectedData => {
            cds.push(connectedData);
          });
        }
      });
    }
  });

  // TODO : deduplicate connectedData (same param in multiple view)
  return cds;
}
