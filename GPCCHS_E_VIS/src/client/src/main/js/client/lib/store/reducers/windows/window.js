import _ from 'lodash/fp';
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
        uuid: action.payload.windowId,
        title: action.payload.title || stateWindow.title,
        geometry: Object.assign({}, stateWindow.geometry, action.payload.geometry),
        pages: action.payload.pages || stateWindow.pages,
        focusedPage: action.payload.focusedPage || stateWindow.focusedPage,
        isModified: (action.payload.isModified === undefined) ?
          stateWindow.isModified : action.payload.isModified,
      });
    case types.WS_WORKSPACE_OPEN: {
      const newWindow = _.merge(stateWindow, action.payload.window);
      const windowPages = _.groupBy('windowId', action.payload.pages)[newWindow.uuid];
      if (!windowPages) {
        return newWindow;
      }
      const getUuids = _.map('uuid');
      const getFocusedPageId = _.get('[0].uuid');
      return _.pipe(
        _.update('pages', _.concat(_, getUuids(windowPages))),
        _.set('focusedPage', getFocusedPageId(windowPages))
      )(newWindow);
    }
    case types.WS_PAGE_OPEN:
    case types.WS_PAGE_ADD_BLANK: {
      const { page, windowId } = action.payload;
      if (windowId === stateWindow.uuid) {
        return _.pipe(
          _.update('pages', _.concat(_, page.uuid)),
          _.set('focusedPage', page.uuid),
          _.set('isModified', true)
        )(stateWindow);
      }
      return stateWindow;
    }
    case types.WS_PAGE_CLOSE: {
      const newWindow = _.pipe(
        _.update('pages', _.remove(_.equals(action.payload.pageId))),
        _.set('isModified', true)
      )(stateWindow);
      if (newWindow.focusedPage !== action.payload.pageId) {
        return newWindow;
      }
      return _.set('focusedPage', newWindow.pages[0], newWindow);
    }
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
    case types.WS_PAGE_UPDATE_TIMEBARID: {
      if (_.contains(action.payload.pageId, stateWindow.pages)) {
        return Object.assign({}, stateWindow, {
          isModified: true,
        });
      }
      return stateWindow;
    }
    default:
      return stateWindow;
  }
}
