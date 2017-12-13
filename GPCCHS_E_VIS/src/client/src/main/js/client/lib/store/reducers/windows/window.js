import _ from 'lodash/fp';
import _defaults from 'lodash/defaults';
import _omit from 'lodash/omit';
import _without from 'lodash/without';
import _reduce from 'lodash/reduce';
import _concat from 'lodash/concat';
import _slice from 'lodash/slice';
import _pullAt from 'lodash/pullAt';
import * as types from 'store/types';

const initialState = {
  isLoaded: false,
  title: 'Unknown',
  focusedPage: null,
  pages: [],
  geometry: {
    w: 800,
    h: 600,
    x: 10,
    y: 10,
  },
  minimized: false,
  displayHelp: false,
};

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
export default function window(stateWindow = initialState, action) {
  switch (action.type) {
    case types.WS_WINDOW_ADD:
      return Object.assign({}, stateWindow, {
        uuid: action.payload.windowId,
        title: action.payload.title || stateWindow.title,
        geometry: Object.assign({}, stateWindow.geometry, action.payload.geometry),
        pages: action.payload.pages || stateWindow.pages,
        focusedPage: action.payload.focusedPage || stateWindow.focusedPage,
      });
    case types.WS_WORKSPACE_OPENED: {
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
    case types.WS_PAGE_OPENED:
    case types.WS_PAGE_ADD_BLANK: {
      const { page } = action.payload;
      return _.pipe(
        _.update('pages', _.concat(_, page.uuid)),
        _.set('focusedPage', page.uuid)
      )(stateWindow);
    }
    case types.WS_PAGE_CLOSE: {
      const newWindow = _.update('pages', _.remove(_.equals(action.payload.pageId)), stateWindow);
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
    case types.WS_WINDOW_UPDATE_TITLE: {
      return {
        ...stateWindow,
        title: action.payload.title,
      };
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
      });
    }
    case types.WS_WINDOW_MOVE_TAB_ORDER: {
      const { keyFrom, keyTarget } = action.payload;
      if (keyFrom === keyTarget) {
        return stateWindow;
      }
      const newTabs = _concat(
        _slice(stateWindow.pages, 0, keyTarget),
        stateWindow.pages[keyFrom],
        _slice(stateWindow.pages, keyTarget)
      );
      const keyToRemove = keyFrom < keyTarget ? keyFrom : keyFrom + 1;
      _pullAt(newTabs, [keyToRemove]);
      return Object.assign({}, stateWindow, {
        pages: newTabs,
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
    case types.WS_WINDOW_SET_DISPLAY_HELP:
      return { ...stateWindow, displayHelp: action.payload.display };
    case types.WS_WINDOW_SET_IS_LOADED: {
      return Object.assign({}, stateWindow, { isLoaded: true });
    }
    default:
      return stateWindow;
  }
}
