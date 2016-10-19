import _ from 'lodash';
import * as types from '../types';

/**
 * Reducer
 */
export default function windows(stateWindows = {}, action) {
  switch (action.type) {
    case types.WS_WINDOW_UPDATE_GEOMETRY:
    case types.WS_WINDOW_PAGE_FOCUS:
    case types.WS_WINDOW_PAGE_REORDER:
    case types.WS_WINDOW_PAGE_MOUNT:
    case types.WS_WINDOW_PAGE_UNMOUNT:
      return Object.assign({}, stateWindows, {
        [action.payload.windowId]: window(stateWindows[action.payload.windowId], action)
      });
    case types.WS_WINDOW_ADD:
      return {
        ...stateWindows,
        [action.payload.windowId]: window(undefined, action),
      };
    case types.WS_WINDOW_REMOVE:
      return _.omit(stateWindows, [action.payload.windowId]);
    default:
      return stateWindows;
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

function window(stateWindow = initialState, action) {
  switch (action.type) {
    case types.WS_WINDOW_ADD:
      return Object.assign({}, stateWindow, {
        title: action.payload.title || stateWindow.title,
        geometry: Object.assign({}, stateWindow.geometry, action.payload.geometry),
        pages: action.payload.pages || stateWindow.pages,
        focusedPage: action.payload.focusedPage || stateWindow.focusedPage,
      });
    case types.WS_WINDOW_UPDATE_GEOMETRY: {
      return Object.assign({}, stateWindow, {
        geometry: _.defaults({}, _.omit(action.payload, ['windowId']), stateWindow.geometry),
      });
    }
    case types.WS_WINDOW_PAGE_FOCUS:
      return Object.assign({}, stateWindow, {
        focusedPage: action.payload.pageId,
      });
    case types.WS_WINDOW_PAGE_REORDER: {
      const { remaining, sorted } = _.reduce(action.payload.pages, (acc, pageId) => (
        {
          remaining: _.without(acc.remaining, pageId),
          sorted: (stateWindow.pages.indexOf(pageId) !== -1) ? [...acc.sorted, pageId] : acc.sorted,
        }
      ), { remaining: _.clone(stateWindow.pages), sorted: [] });
      return Object.assign({}, stateWindow, {
        pages: [...sorted, ...remaining],
      });
    }
    case types.WS_WINDOW_PAGE_MOUNT:
      return Object.assign({}, stateWindow, {
        pages: [...stateWindow.pages, action.payload.pageId],
      });
    case types.WS_WINDOW_PAGE_UNMOUNT:
      return Object.assign({}, stateWindow, {
        pages: _.without(stateWindow.pages, action.payload.pageId),
      });
    default:
      return stateWindow;
  }
}
