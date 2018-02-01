// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5316 : 09/02/2017 : Remove last eslint-disable default-case .
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : Remove actions/enhancers/index.js . . .
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : Change ifPathChanged action creator enhancer arguments
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : Rename addUuids action creator enhancer into addUuidsToEntryPoints
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Refacto setCollapsedAndUpdateLayout thunk in actions/views
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Move VIVL files in lib/viewManager and fix plenty of inline view/structure type specific code
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Test all views thunks .
// VERSION : 1.1.2 : DM : #3622 : 22/02/2017 : Add dropEntrypoint thunk in actions/views
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse bugs
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse views
// VERSION : 1.1.2 : DM : #3622 : 10/03/2017 : store collapsed & maximized bool in page layout
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Fix missing generated id to entryPoints
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Fix view reloading . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Cleanup redux actions . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Add WS_VIEW_CLOSE action + remove unmountAndRemove (view)
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Replace WS_VIEW_ADD by WS_VIEW_ADD_BLANK .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Move reloadView in documentManager .
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getPageIdByViewId simple selector in reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Refacto opening a view .
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Merge branch 'dbrugne-boxmodel2' into dev
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Change addBlankView action creator signature
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : PlotView: x axis is always time/s , not editable. Newly created Ep always stick to time axis or create one.
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Use selector in action/views#addEntryPoint .
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : open parameter in editor via context menu
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #6785 : 12/06/2017 : activate links in views .
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : FA : ISIS-FT-2107 : 19/06/2017 : Improve PlotView editor UI -> legend in store.
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : On open view middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add onSaveViewAsModel documents middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add onReloadView documents middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add onSaveView documents middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add types and action creator for views middlewares
// VERSION : 1.1.2 : DM : #6816 : 13/09/2017 : Its possible to change the size of the mimic in the view ezeditor
// VERSION : 1.1.2 : FA : #7773 : 14/09/2017 : Argument in updateEntryPoint action should change index -> entryPointId.
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { v4 } from 'uuid';

import { getViewModule } from 'viewManager';
import ifPathChanged from './enhancers/ifPathChanged';
import * as types from '../types';
import { focusPage } from '../actions/windows';
import { getView } from '../reducers/views';
import { getPageIdByViewId } from '../reducers/pages';
import { getWindowIdByPageId } from '../reducers/windows';
import simple from '../helpers/simpleActionCreator';
import { openEditor } from './pages';

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
