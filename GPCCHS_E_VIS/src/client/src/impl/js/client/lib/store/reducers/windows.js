import _defaults from 'lodash/defaults';
import _omit from 'lodash/omit';
import _without from 'lodash/without';
import _clone from 'lodash/clone';
import _reduce from 'lodash/reduce';
import u from 'updeep';
import * as types from '../types';

export default function windows(stateWindows = {}, action) {
  switch (action.type) {
    case types.WS_WINDOW_UPDATE_GEOMETRY:
    case types.WS_WINDOW_PAGE_FOCUS:
    case types.WS_WINDOW_PAGE_REORDER:
    case types.WS_WINDOW_PAGE_MOUNT:
    case types.WS_WINDOW_PAGE_UNMOUNT:
    case types.WS_WINDOW_DEBUG_SWITCH:
      return Object.assign({}, stateWindows, {
        [action.payload.windowId]: window(stateWindows[action.payload.windowId], action)
      });
    case types.WS_WINDOW_ADD:
      return {
        ...stateWindows,
        [action.payload.windowId]: window(undefined, action),
      };
    case types.WS_WINDOW_REMOVE:
      return _omit(stateWindows, [action.payload.windowId]);
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_WINDOW_SETMODIFIED:
      if (!stateWindows[action.payload.windowId]) {
        return stateWindows;
      }
      return u({ [action.payload.windowId]: { isModified: action.payload.flag } }, stateWindows);
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
  debug: {
    whyDidYouUpdate: false,
    timebarVisibility: true,
  },
  isModified: false,
};

function window(stateWindow = initialState, action) {
  switch (action.type) {
    case types.WS_WINDOW_ADD:
      return Object.assign({}, stateWindow, {
        title: action.payload.title || stateWindow.title,
        geometry: Object.assign({}, stateWindow.geometry, action.payload.geometry),
        pages: action.payload.pages || stateWindow.pages,
        focusedPage: action.payload.focusedPage || stateWindow.focusedPage,
        isModified: action.payload.isModified || false,
      });
    case types.WS_WINDOW_UPDATE_GEOMETRY: {
      return Object.assign({}, stateWindow, {
        geometry: _defaults({}, _omit(action.payload, ['windowId']), stateWindow.geometry),
        isModified: true,
      });
    }
    case types.WS_WINDOW_PAGE_FOCUS:
      return Object.assign({}, stateWindow, {
        focusedPage: action.payload.pageId,
      });
    case types.WS_WINDOW_PAGE_REORDER: {
      const { remaining, sorted } = _reduce(action.payload.pages, (acc, pageId) => ({
        remaining: _without(acc.remaining, pageId),
        sorted: (stateWindow.pages.indexOf(pageId) !== -1) ? [...acc.sorted, pageId] : acc.sorted,
      }), { remaining: _clone(stateWindow.pages), sorted: [] });
      return Object.assign({}, stateWindow, {
        pages: [...sorted, ...remaining],
        isModified: true,
      });
    }
    case types.WS_WINDOW_DEBUG_SWITCH: { // TODO test
      return u({
        debug: {
          [action.payload.which]: action.payload.status,
        },
      }, stateWindow);
    }
    case types.WS_WINDOW_PAGE_MOUNT:
      return Object.assign({}, stateWindow, {
        pages: [...stateWindow.pages, action.payload.pageId],
        isModified: true,
      });
    case types.WS_WINDOW_PAGE_UNMOUNT:
      return Object.assign({}, stateWindow, {
        pages: _without(stateWindow.pages, action.payload.pageId),
        isModified: true,
      });
    default:
      return stateWindow;
  }
}
