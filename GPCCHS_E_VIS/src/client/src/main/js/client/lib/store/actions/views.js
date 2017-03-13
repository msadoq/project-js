import _ from 'lodash/fp';
import { v4 } from 'uuid';

import simple from '../simpleActionCreator';
import ifPathChanged from './enhancers/ifPathChanged';
import addUuidsToEntryPoints from './enhancers/addUuidsToEntryPoints';
import * as types from '../types';
import { openEditor } from './pages';
import { getPageIdByViewId } from '../selectors/pages';
import { getViewModule } from '../../viewManager';

export const addBlankView = simple(types.WS_VIEW_ADD_BLANK, 'pageId', 'view');

export const closeView = simple(types.WS_VIEW_CLOSE, 'pageId', 'viewId');
export const remove = simple(types.WS_VIEW_REMOVE, 'viewId');
export const reloadView = addUuidsToEntryPoints(simple(types.WS_VIEW_RELOAD, 'viewId', 'configuration'));

/* Update path/absolutePath */
const simpleUpdatePath = simple(types.WS_VIEW_UPDATEPATH, 'viewId', 'newPath');
const simpleUpdateAbsolutePath = simple(types.WS_VIEW_UPDATE_ABSOLUTEPATH, 'viewId', 'newPath');

export const updatePath = ifPathChanged(simpleUpdatePath, 'views', 'path', 'viewId');
export const updateAbsolutePath = ifPathChanged(simpleUpdateAbsolutePath, 'views', 'absolutePath', 'viewId');
/* ------------------------ */

export const setViewOid = simple(types.WS_VIEW_SET_OID, 'viewId', 'oid');

export const setModified = simple(types.WS_VIEW_SETMODIFIED, 'viewId', 'flag');

export const updateEntryPoint = simple(types.WS_VIEW_UPDATE_ENTRYPOINT, 'viewId', 'index',
 'entryPoint');
export const updateAxis = simple(types.WS_VIEW_UPDATE_AXIS, 'viewId', 'axisId', 'axis');
export const updateGrid = simple(types.WS_VIEW_UPDATE_GRID, 'viewId', 'index', 'grid');
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

// ***************
export const addAxis = simple(types.WS_VIEW_ADD_AXIS, 'viewId', 'axis');
export const removeAxis = simple(types.WS_VIEW_REMOVE_AXIS, 'viewId', 'axisId');

export const removeEntryPoint = simple(types.WS_VIEW_REMOVE_ENTRYPOINT, 'viewId', 'index');

export const addGrid = simple(types.WS_VIEW_ADD_GRID, 'viewId', 'grid');
export const removeGrid = simple(types.WS_VIEW_REMOVE_GRID, 'viewId', 'index');

export const addLink = simple(types.WS_VIEW_ADD_LINK, 'viewId', 'link');
export const removeLink = simple(types.WS_VIEW_REMOVE_LINK, 'viewId', 'index');

export const addMarker = simple(types.WS_VIEW_ADD_MARKER, 'viewId', 'marker');
export const removeMarker = simple(types.WS_VIEW_REMOVE_MARKER, 'viewId', 'index');

export const addProcedure = simple(types.WS_VIEW_ADD_PROCEDURE, 'viewId', 'procedure');
export const removeProcedure = simple(types.WS_VIEW_REMOVE_PROCEDURE, 'viewId', 'index');

const simpleAddEntryPoint = simple(types.WS_VIEW_ADD_ENTRYPOINT, 'viewId', 'entryPoint');

export function addEntryPoint(viewId, entryPoint) {
  return (dispatch, getState) => {
    const state = getState();
    const currentView = state.views[viewId];
    const ep = getViewModule(currentView.type).setEntryPointDefault(entryPoint);
    const injectUuid = _.update('id', v4);
    dispatch(simpleAddEntryPoint(viewId, injectUuid(ep)));
  };
}

// for Drag&Drop
export function dropEntryPoint(viewId, entryPoint) {
  return (dispatch, getState) => {
    const state = getState();
    const currentView = state.views[viewId];
    const currentPageId = getPageIdByViewId(state, { viewId });
    dispatch(addEntryPoint(viewId, entryPoint));
    dispatch(openEditor(currentPageId, viewId, currentView.type));
  };
}
