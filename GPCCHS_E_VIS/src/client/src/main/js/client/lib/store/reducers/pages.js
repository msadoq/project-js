import _without from 'lodash/without';
import _isEqual from 'lodash/isEqual';
import _omit from 'lodash/omit';
import u from 'updeep';
import { resolve } from 'path';
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
    case types.WS_PAGE_TIMEBAR_COLLAPSE:
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
      return _omit(statePages, [action.payload.pageId]);
    case types.WS_PAGE_UPDATEPATH:
      if (!statePages[action.payload.pageId]) {
        return statePages;
      }
      return u({
        [action.payload.pageId]: {
          path: action.payload.newPath,
          isModified: true,
        }
      }, statePages);
    case types.WS_PAGE_UPDATE_ABSOLUTEPATH: {
      const statePage = statePages[action.payload.pageId];
      if (!statePage || (statePage.absolutePath && action.payload.newPath &&
        resolve(action.payload.newPath) === resolve(statePage.absolutePath))) {
        return statePages;
      }
      return u({
        [action.payload.pageId]: {
          absolutePath: action.payload.newPath,
          isModified: true,
        }
      }, statePages);
    }
    case types.WS_PAGE_SET_OID: {
      return u({
        [action.payload.pageId]: {
          oId: action.payload.oid,
        }
      }, statePages);
    }
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_PAGE_SETMODIFIED: {
      if (!statePages[action.payload.pageId]) {
        return statePages;
      }
      return u({
        [action.payload.pageId]: {
          isModified: action.payload.flag,
        }
      },
      statePages);
    }
    case types.WS_PAGE_UPDATE_TIMEBARID:
      if (!statePages[action.payload.focusedPageId]) {
        return statePages;
      }
      return u({ [action.payload.focusedPageId]: {
        timebarUuid: action.payload.timebarUuid,
        // when timebarUuid is modified, it's the window which is modified, not the page
      } },
        statePages);
    case types.WS_PAGE_UPDATE_TIMEBARHEIGHT:
      if (!statePages[action.payload.focusedPageId]) {
        return statePages;
      }
      return u({ [action.payload.focusedPageId]: {
        timebarHeight: (!action.payload.timebarHeight || action.payload.timebarHeight < 135) ?
          135 : action.payload.timebarHeight,
        isModified: true,
      } },
        statePages);
    default:
      return statePages;
  }
}

const initialState = {
  title: 'Unknown',
  timebarHeight: 135,
  timebarCollapsed: false,
  timebarUuid: null,
  layout: [],
  views: [],
  editor: {
    isOpened: false,
    viewId: null,
    viewType: null
  },
  isModified: true,
  properties: [],
};

function page(statePage = initialState, action) {
  switch (action.type) {
    case types.WS_PAGE_ADD:
      return Object.assign({}, statePage, {
        title: action.payload.title || statePage.title,
        timebarUuid: action.payload.timebarUuid || statePage.timebarUuid,
        timebarHeight: action.payload.timebarHeight || statePage.timebarHeight,
        timebarCollapsed: action.payload.timebarCollapsed || statePage.timebarCollapsed,
        layout: action.payload.layout || statePage.layout,
        views: action.payload.views || statePage.views,
        path: action.payload.path,
        oId: action.payload.oId,
        absolutePath: action.payload.absolutePath,
        isModified: (action.payload.isModified === undefined) ?
          statePage.isModified : action.payload.isModified,
        properties: action.payload.properties ? action.payload.properties : [],
      });
    case types.WS_PAGE_EDITOR_OPEN:
      return u({
        editor: {
          isOpened: true,
          viewId: action.payload.viewId,
          viewType: action.payload.viewType
        },
      }, statePage);
    case types.WS_PAGE_EDITOR_CLOSE:
      return u({ editor: { isOpened: false } }, statePage);
    case types.WS_PAGE_VIEW_MOUNT: {
      const update = {
        views: [...statePage.views, action.payload.viewId],
        isModified: true,
      };
      if (action.payload.layout) {
        update.layout = action.payload.layout;
      }
      return Object.assign({}, statePage, update);
    }
    case types.WS_PAGE_VIEW_UNMOUNT: {
      return Object.assign({}, statePage, {
        views: _without(statePage.views, action.payload.viewId),
        isModified: true,
      });
    }
    case types.WS_PAGE_UPDATE_LAYOUT: {
      if (!action.payload.layout || _isEqual(action.payload.layout, statePage.layout)) {
        return statePage;
      }
      return Object.assign({}, statePage, {
        layout: action.payload.layout,
        isModified: true
      });
    }
    case types.WS_PAGE_TIMEBAR_COLLAPSE: {
      return {
        ...statePage,
        timebarCollapsed: action.payload.flag,
        isModified: true,
      };
    }
    default:
      return statePage;
  }
}