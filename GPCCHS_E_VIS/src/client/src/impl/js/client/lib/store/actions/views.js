import _ from 'lodash';
import globalConstants from 'common/constants';
import simple from '../simpleActionCreator';
import * as types from '../types';
import vivl from '../../../VIVL/main';
import {
  openEditor,
  updateLayout,
} from './pages';
import { getPageIdByViewId, makeGetLayouts } from '../selectors/pages';
import { getTimebarByPageId } from '../selectors/timebars';

export const add = simple(types.WS_VIEW_ADD, 'viewId', 'type', 'configuration', 'path', 'oId',
  'absolutePath', 'isModified');
export const remove = simple(types.WS_VIEW_REMOVE, 'viewId');
export const reloadView = simple(types.WS_VIEW_RELOAD, 'viewId', 'configuration');
export const updatePath = simple(types.WS_VIEW_UPDATEPATH, 'viewId', 'newPath');
export const updateAbsolutePath = simple(types.WS_VIEW_UPDATE_ABSOLUTEPATH, 'viewId', 'newPath');

export const setViewOid = simple(types.WS_VIEW_SET_OID, 'viewId', 'oid');

export const setModified = simple(types.WS_VIEW_SETMODIFIED, 'viewId', 'flag');
export const setCollapsed = simple(types.WS_VIEW_SETCOLLAPSED, 'viewId', 'flag');
export const setCollapsedAndUpdateLayout = (pageId, viewId, flag) =>
  (dispatch, getState) => {
    const state = getState();
    const layout = makeGetLayouts()(state, { pageId });
    if (flag) {
      const newLayout = layout.lg.map((l) => {
        if (l.i === viewId) {
          return {
            ...l,
            maxH: l.h,
            maxW: l.w,
            h: 1,
            w: 3,
          };
        }
        return l;
      });
      dispatch(updateLayout(pageId, newLayout));
    } else {
      const newLayout = layout.lg.map((l) => {
        if (l.i === viewId) {
          return {
            ...l,
            h: l.maxH,
            w: l.maxW,
            maxH: undefined,
            maxW: undefined,
          };
        }
        return l;
      });
      dispatch(updateLayout(pageId, newLayout));
    }
    dispatch({
      type: types.WS_VIEW_SETCOLLAPSED,
      payload: {
        viewId,
        flag,
      }
    });
  };

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

const addEntryPointInternal = simple(types.WS_VIEW_ADD_ENTRYPOINT, 'viewId', 'entryPoint');

export function addEntryPoint(viewId, entryPoint) { // TODO add test
  return (dispatch, getState) => {
    const ep = _.clone(entryPoint);
    const state = getState();
    const currentView = state.views[viewId];
    const structureType = vivl(currentView.type, 'structureType')();

    const currentPageId = getPageIdByViewId(state, { viewId });
    const timebar = getTimebarByPageId(state, currentPageId);
    const defaultTimeline = timebar ? timebar.masterId : '*';
    const domain = state.domains[0].name; // TODO should be replaced by *, but for dev it's ok
    // const domain = '*';

    switch (structureType) { // eslint-disable-line default-case
      case globalConstants.DATASTRUCTURETYPE_LAST:
        ep.connectedData.timeline = ep.connectedData.timeline || defaultTimeline;
        ep.connectedData.domain = ep.connectedData.domain || domain;
        break;
      case globalConstants.DATASTRUCTURETYPE_RANGE:
        ep.connectedDataX.timeline = ep.connectedDataX.timeline || defaultTimeline;
        ep.connectedDataY.timeline = ep.connectedDataY.timeline || defaultTimeline;
        ep.connectedDataX.domain = ep.connectedDataX.domain || domain;
        ep.connectedDataY.domain = ep.connectedDataY.domain || domain;
        break;
    }
    dispatch(openEditor(currentPageId, viewId, currentView.type));
    dispatch(addEntryPointInternal(viewId, ep));
  };
}
