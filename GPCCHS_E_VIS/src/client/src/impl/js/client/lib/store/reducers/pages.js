import _without from 'lodash/without';
import _omit from 'lodash/omit';
import u from 'updeep';
import { relative, resolve } from 'path';
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
      return _omit(statePages, [action.payload.pageId]);
    case types.WS_PAGE_UPDATEPATH:
      // path unchanged or newPath invalid
      if (!action.payload.newPath ||
          resolve(action.payload.newPath) === resolve(statePages[action.payload.pageId].path)) {
        return statePages;
      }
      return u({ [action.payload.pageId]: { path: action.payload.newPath, isModified: true } },
        statePages);
    case types.WS_PAGE_UPDATE_RELATIVEPATH: {
      const newWkFolder = resolve(action.payload.newWkFolder);
      // workspace folder unchanged
      if (resolve(action.payload.oldWkFolder) === newWkFolder) {
        return statePages;
      }
      // workspace folder updated
      const oldPath = resolve(action.payload.oldWkFolder, statePages[action.payload.pageId].path);
      const pathMvt = relative(newWkFolder, oldPath);
      return u({ [action.payload.pageId]: { path: pathMvt, isModified: true } }, statePages);
    }
    case types.WS_CLOSE_WORKSPACE:
      return {};
    case types.WS_PAGE_SETMODIFIED:
      if (!statePages[action.payload.pageId]) {
        return statePages;
      }
      return u({ [action.payload.pageId]: { isModified: action.payload.flag } }, statePages);
    case types.WS_PAGE_UPDATE_TIMEBARID:
      if (!statePages[action.payload.focusedPageId]) {
        return statePages;
      }
      return u({ [action.payload.focusedPageId]: {
        timebarId: action.payload.timebarId,
        isModified: true,
      } },
        statePages);
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
    viewType: null
  },
  isModified: false,
};

function page(statePage = initialState, action) {
  switch (action.type) {
    case types.WS_PAGE_ADD:
      return Object.assign({}, statePage, {
        title: action.payload.title || statePage.title,
        timebarId: action.payload.timebarId || statePage.timebarId,
        layout: action.payload.layout || statePage.layout,
        views: action.payload.views || statePage.views,
        path: action.payload.path,
        oId: action.payload.oId,
        absolutePath: action.payload.absolutePath,
        isModified: false,
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
    case types.WS_PAGE_VIEW_UNMOUNT:
      return Object.assign({}, statePage, {
        views: _without(statePage.views, action.payload.viewId),
        isModified: true,
      });
    case types.WS_PAGE_UPDATE_LAYOUT:
      return Object.assign({}, statePage, {
        layout: action.payload.layout || statePage.layout,
        isModified: action.payload.layout ? true : statePage.isModified,
      });
    default:
      return statePage;
  }
}
