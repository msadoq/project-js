import _ from 'lodash/fp';
import { v4 } from 'uuid';

import simple from '../helpers/simpleActionCreator';
import ifPathChanged from './enhancers/ifPathChanged';
import * as types from '../types';
import { openEditor } from './pages';
import { getView } from '../reducers/views';
import { getPageIdByViewId } from '../reducers/pages';
import { getWindowIdByPageId } from '../reducers/windows';
import { getViewModule } from '../../viewManager';
import { focusPage } from '../actions/windows';

export const addBlankView = simple(types.WS_VIEW_ADD_BLANK, 'view', 'pageId');

export const closeView = viewId => (dispatch, getState) => {
  const pageId = getPageIdByViewId(getState(), { viewId });
  dispatch({ type: types.WS_VIEW_CLOSE, payload: { viewId, pageId } });
};

/* Update path/absolutePath */
const simpleUpdatePath = simple(types.WS_VIEW_UPDATEPATH, 'viewId', 'newPath');
const simpleUpdateAbsolutePath = simple(types.WS_VIEW_UPDATE_ABSOLUTEPATH, 'viewId', 'newPath');

export const updatePath = ifPathChanged(simpleUpdatePath, 'views', 'path', 'viewId');
export const updateAbsolutePath = ifPathChanged(simpleUpdateAbsolutePath, 'views', 'absolutePath', 'viewId');

export const updateDomainName = simple(types.WS_VIEW_UPDATE_DOMAINNAME, 'viewId', 'domainName');
export const updateSessionName = simple(types.WS_VIEW_UPDATE_SESSIONNAME, 'viewId', 'sessionName');

/* ------------------------ */

export const setViewOid = simple(types.WS_VIEW_SET_OID, 'viewId', 'oid');
export const touchViewConfiguration = simple(types.WS_VIEW_TOUCH, 'viewId');

export const setModified = simple(types.WS_VIEW_SETMODIFIED, 'viewId', 'flag');
export const toggleLegend = simple(types.WS_VIEW_TOGGLE_LEGEND, 'viewId', 'flag');
export const updateLink = simple(types.WS_VIEW_UPDATE_LINK, 'viewId', 'index', 'link');
export const updateMarker = simple(types.WS_VIEW_UPDATE_MARKER, 'viewId', 'index', 'marker');
export const updateProcedure = simple(types.WS_VIEW_UPDATE_PROCEDURE, 'viewId', 'index',
 'procedure');

export const updateRatio = simple(types.WS_VIEW_UPDATE_RATIO, 'viewId', 'ratio');
export const updateTitle = simple(types.WS_VIEW_UPDATE_TITLE, 'viewId', 'title');
export const updateTitleStyle = simple(types.WS_VIEW_UPDATE_TITLESTYLE, 'viewId', 'titleStyle');
export const updateBgColor = simple(types.WS_VIEW_UPDATE_BGCOLOR, 'viewId', 'bgColor');
export const updateLegend = simple(types.WS_VIEW_UPDATE_LEGEND, 'viewId', 'legend');
export const updateContent = simple(types.WS_VIEW_UPDATE_CONTENT, 'viewId', 'content');
export const updateShowYAxes = simple(types.WS_VIEW_UPDATE_SHOWYAXES, 'viewId', 'showYAxes');
export const updateDimensions = simple(types.WS_VIEW_UPDATE_DIMENSIONS, 'viewId', 'width', 'height');

export const updateEditorSearch = simple(types.WS_VIEW_UPDATE_EDITOR_SEARCH, 'viewId', 'search');

// ************ Axis
export const addAxis = simple(types.WS_VIEW_ADD_AXIS, 'viewId', 'axis');
export const removeAxis = simple(types.WS_VIEW_REMOVE_AXIS, 'viewId', 'axisId');
export const updateAxis = simple(types.WS_VIEW_UPDATE_AXIS, 'viewId', 'axisId', 'axis');

// ************ Grids
export const addGrid = simple(types.WS_VIEW_ADD_GRID, 'viewId', 'grid');
export const removeGrid = simple(types.WS_VIEW_REMOVE_GRID, 'viewId', 'index');
export const updateGrid = simple(types.WS_VIEW_UPDATE_GRID, 'viewId', 'index', 'grid');

// ************ Live extents
export const saveLiveExtents = simple(types.WS_VIEW_SAVE_LIVE_EXTENTS, 'viewId', 'liveExtents');

export const addLink = simple(types.WS_VIEW_ADD_LINK, 'viewId', 'link');
export const removeLink = simple(types.WS_VIEW_REMOVE_LINK, 'viewId', 'index');
export const updateShowLinks = simple(types.WS_VIEW_UPDATE_SHOWLINK, 'viewId', 'showLinks');

export const addMarker = simple(types.WS_VIEW_ADD_MARKER, 'viewId', 'marker');
export const removeMarker = simple(types.WS_VIEW_REMOVE_MARKER, 'viewId', 'index');

export const addProcedure = simple(types.WS_VIEW_ADD_PROCEDURE, 'viewId', 'procedure');
export const removeProcedure = simple(types.WS_VIEW_REMOVE_PROCEDURE, 'viewId', 'index');

export const askSaveView = simple(types.WS_ASK_SAVE_VIEW, 'viewId', 'saveAs');
export const askOpenView = simple(types.WS_ASK_OPEN_VIEW, 'absolutePath');
export const askCloseView = simple(types.WS_ASK_CLOSE_VIEW, 'viewId');
export const askReloadView = simple(types.WS_ASK_RELOAD_VIEW, 'viewId');
export const askSaveViewAsModel = simple(types.WS_ASK_SAVE_VIEW_AS_MODEL, 'viewId');

// ************ EntryPoint
export const updateEntryPoint = simple(types.WS_VIEW_UPDATE_ENTRYPOINT, 'viewId', 'entryPointId', 'entryPoint');
export const removeEntryPoint = simple(types.WS_VIEW_REMOVE_ENTRYPOINT, 'viewId', 'entryPointId');
const simpleAddEntryPoint = simple(types.WS_VIEW_ADD_ENTRYPOINT, 'viewId', 'entryPoint');

export function addEntryPoint(viewId, entryPoint) {
  return (dispatch, getState) => {
    const state = getState();
    const currentView = getView(state, { viewId });
    const ep = getViewModule(currentView.type).setEntryPointDefault(entryPoint);
    const injectUuid = _.update('id', v4);
    dispatch(simpleAddEntryPoint(viewId, injectUuid(ep)));
  };
}

// for Drag&Drop
export function dropEntryPoint(viewId, entryPoint) {
  return (dispatch, getState) => {
    const state = getState();
    const currentPageId = getPageIdByViewId(state, { viewId });
    dispatch(addEntryPoint(viewId, entryPoint));
    dispatch(openEditor(currentPageId, viewId));
  };
}

// focus a page containing a viewId
export function focusView(viewId) {
  return (dispatch, getState) => {
    const pageId = getPageIdByViewId(getState(), { viewId });
    const winId = getWindowIdByPageId(getState(), { pageId });
    if (!winId || !pageId) {
      return;
    }
    dispatch(focusPage(winId, pageId));
  };
}
