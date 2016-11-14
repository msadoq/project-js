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
      return u({ [action.payload.pageId]: { path: action.payload.newPath } }, statePages);
    case types.WS_PAGE_UPDATE_RELATIVEPATH: {
      const newWkFolder = resolve(action.payload.newWkFolder);
      // workspace folder unchanged
      if (resolve(action.payload.oldWkFolder) === newWkFolder) {
        return statePages;
      }
      // workspace folder updated
      const oldPath = resolve(action.payload.oldWkFolder, statePages[action.payload.pageId].path);
      const pathMvt = relative(newWkFolder, oldPath);
      return u({ [action.payload.pageId]: { path: pathMvt } }, statePages);
    }
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
        path: action.payload.path,
        oId: action.payload.oId,
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
        views: _without(statePage.views, action.payload.viewId),
      });
    case types.WS_PAGE_UPDATE_LAYOUT:
      return Object.assign({}, statePage, {
        layout: action.payload.layout || statePage.layout,
      });
    default:
      return statePage;
  }
}
