import _defaults from 'lodash/defaults';
import _omit from 'lodash/omit';
import _without from 'lodash/without';
import _reduce from 'lodash/reduce';
import * as types from '../../types';

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
  isModified: true,
  minimized: false,
  tabName: 'perRemoteId',
};

export default function window(stateWindow = initialState, action) {
  switch (action.type) {
    case types.WS_WINDOW_ADD:
      return Object.assign({}, stateWindow, {
        title: action.payload.title || stateWindow.title,
        geometry: Object.assign({}, stateWindow.geometry, action.payload.geometry),
        pages: action.payload.pages || stateWindow.pages,
        focusedPage: action.payload.focusedPage || stateWindow.focusedPage,
        isModified: (action.payload.isModified === undefined) ?
          stateWindow.isModified : action.payload.isModified,
      });
    case types.WS_WINDOW_UPDATE_GEOMETRY: {
      return Object.assign({}, stateWindow, {
        geometry: _defaults({}, _omit(action.payload, ['windowId']), stateWindow.geometry),
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
      }), { remaining: stateWindow.pages, sorted: [] });
      return Object.assign({}, stateWindow, {
        pages: [...sorted, ...remaining],
        isModified: true,
      });
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
    case types.WS_WINDOW_MINIMIZE:
      return Object.assign({}, stateWindow, {
        minimized: true,
      });
    case types.WS_WINDOW_RESTORE:
      return Object.assign({}, stateWindow, {
        minimized: false,
      });
    case types.WS_WINDOW_SETMODIFIED:
      return Object.assign({}, stateWindow, {
        isModified: action.payload.flag,
      });
    case types.WS_WINDOW_DISPLAY_EXPLORER:
      return Object.assign({}, stateWindow, {
        displayExplorer: action.payload.open,
      });
    case types.WS_WINDOW_EXPLORER_UPDATEFLAG:
      return Object.assign({}, stateWindow, {
        [action.payload.flagName]: action.payload.flag,
      });
    case types.WS_WINDOW_CURRENT_EXPLORER:
      return Object.assign({}, stateWindow, {
        tabName: action.payload.tabName,
      });
    case types.WS_WINDOW_EXPLORERWIDTH_UPDATE:
      return Object.assign({}, stateWindow, {
        explorerWidth: action.payload.width,
      });
    default:
      return stateWindow;
  }
}
