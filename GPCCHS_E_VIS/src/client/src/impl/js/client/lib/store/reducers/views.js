import _omit from 'lodash/omit';
import _without from 'lodash/without';
import u from 'updeep';
import { resolve } from 'path';
import * as types from '../types';

/**
 * Reducer
 */
export default function views(stateViews = {}, action) {
  switch (action.type) {
    case types.WS_VIEW_CD_MOUNT:
    case types.WS_VIEW_CD_UNMOUNT:
      return Object.assign({}, stateViews, {
        [action.payload.viewId]: view(stateViews[action.payload.viewId], action)
      });
    case types.WS_VIEW_ADD:
      return {
        ...stateViews,
        [action.payload.viewId]: view(undefined, action),
      };
    case types.WS_VIEW_REMOVE:
      return _omit(stateViews, [action.payload.viewId]);
    case types.WS_VIEW_UPDATEPATH:
      // path unchanged or newPath invalid
      if (!action.payload.newPath ||
          resolve(action.payload.newPath) === resolve(stateViews[action.payload.viewId].path)) {
        return stateViews;
      }
      return u({ [action.payload.viewId]: {
        path: action.payload.newPath,
        isModified: true,
      } }, stateViews);
    case types.WS_VIEW_UPDATE_ABSOLUTEPATH:
      // path unchanged or newPath invalid
      if (!action.payload.newPath ||
      resolve(action.payload.newPath) === resolve(stateViews[action.payload.viewId].absolutePath)) {
        return stateViews;
      }
      return u({ [action.payload.viewId]: {
        absolutePath: action.payload.newPath,
        isModified: true,
      } }, stateViews);
    case types.WS_VIEW_UPDATE_ENTRYPOINT:
      return updateArray(stateViews, action, 'entryPoints', 'entryPoint');
    case types.WS_VIEW_UPDATE_AXIS:
      return updateArray(stateViews, action, 'axes', 'axis');
    case types.WS_VIEW_UPDATE_GRID:
      return updateArray(stateViews, action, 'grids', 'grid');
    case types.WS_VIEW_UPDATE_LINK:
      return updateArray(stateViews, action, 'links', 'link');
    case types.WS_VIEW_UPDATE_MARKER:
      return updateArray(stateViews, action, 'markers', 'marker');
    case types.WS_VIEW_UPDATE_PROCEDURE:
      return updateArray(stateViews, action, 'procedures', 'procedure');
    case types.WS_VIEW_UPDATE_RATIO:
      return updateObject(stateViews, action, 'defaultRatio', 'ratio');
    case types.WS_VIEW_UPDATE_TITLE:
      return updateObject(stateViews, action, 'title', 'title');
    case types.WS_VIEW_UPDATE_TITLESTYLE:
      return updateObject(stateViews, action, 'titleStyle', 'titleStyle');
    case types.WS_VIEW_UPDATE_BGCOLOR:
      return updateObject(stateViews, action, 'plotBackgroundColour', 'bgColor', 'PlotView');
    case types.WS_VIEW_UPDATE_LEGEND:
      return updateObject(stateViews, action, 'legend', 'legend', 'PlotView');
    case types.WS_VIEW_UPDATE_CONTENT:
      return updateObject(stateViews, action, 'content', 'content', 'TextView');
    case types.WS_VIEW_ADD_AXIS:
      return addElementInArray(stateViews, action, 'axes', 'axis');
    case types.WS_VIEW_REMOVE_AXIS:
      return removeElementInArray(stateViews, action, 'axes');
    case types.WS_VIEW_ADD_ENTRYPOINT:
      return addElementInArray(stateViews, action, 'entryPoints', 'entryPoint');
    case types.WS_VIEW_REMOVE_ENTRYPOINT:
      return removeElementInArray(stateViews, action, 'entryPoints');
    case types.WS_VIEW_ADD_GRID:
      return addElementInArray(stateViews, action, 'grids', 'grid');
    case types.WS_VIEW_REMOVE_GRID:
      return removeElementInArray(stateViews, action, 'grids');
    case types.WS_VIEW_ADD_LINK:
      return addElementInArray(stateViews, action, 'links', 'link');
    case types.WS_VIEW_REMOVE_LINK:
      return removeElementInArray(stateViews, action, 'links');
    case types.WS_VIEW_ADD_MARKER:
      return addElementInArray(stateViews, action, 'markers', 'marker');
    case types.WS_VIEW_REMOVE_MARKER:
      return removeElementInArray(stateViews, action, 'markers');
    case types.WS_VIEW_ADD_PROCEDURE:
      return addElementInArray(stateViews, action, 'procedures', 'procedure');
    case types.WS_VIEW_REMOVE_PROCEDURE:
      return removeElementInArray(stateViews, action, 'procedures');
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_VIEW_SETMODIFIED:
      if (!stateViews[action.payload.viewId]) {
        return stateViews;
      }
      return u({ [action.payload.viewId]: { isModified: action.payload.flag } }, stateViews);
    default:
      return stateViews;
  }
}

const initialState = {
  type: null,
};

function view(stateView = initialState, action) {
  switch (action.type) {
    case types.WS_VIEW_ADD:
      return {
        ...stateView,
        type: action.payload.type || stateView.type,
        configuration: configuration(undefined, action),
        path: action.payload.path,
        oId: action.payload.oId,
        absolutePath: action.payload.absolutePath,
        isModified: action.payload.isModified || false,
      };
    default:
      return stateView;
  }
}

function configuration(state = { title: null }, action) {
  switch (action.type) {
    case types.WS_VIEW_ADD:
      return Object.assign({}, action.payload.configuration || state);
    default:
      return state;
  }
}

export function updateObject(stateViews, action, objectName, paramName, viewType) {
  if (!stateViews[action.payload.viewId] || !action.payload[paramName]) {
    return stateViews;
  }
  // Content only for a type of view if viewType is defined
  if (viewType && stateViews[action.payload.viewId].type !== viewType) {
    return stateViews;
  }
  return u({
    [action.payload.viewId]: {
      configuration: {
        [objectName]: action.payload[paramName]
      },
      isModified: true,
    }
  }, stateViews);
}

export function updateArray(stateViews, action, arrayName, paramName) {
  if (!stateViews[action.payload.viewId] || !action.payload[paramName]) {
    return stateViews;
  }
  const viewConf = stateViews[action.payload.viewId].configuration;
  const index = action.payload.index;
  if (index < 0 || index >= viewConf[arrayName].length) {
    return stateViews;
  }
  return u({
    [action.payload.viewId]: {
      configuration: {
        [arrayName]: {
          [index]: action.payload[paramName]
        }
      },
      isModified: true,
    }
  }, stateViews);
}

export function addElementInArray(stateViews, action, arrayName, paramName) {
  if (!stateViews[action.payload.viewId] || !action.payload[paramName]) {
    return stateViews;
  }
  const oldValue = stateViews[action.payload.viewId].configuration[arrayName];
  return u({
    [action.payload.viewId]: {
      configuration: {
        [arrayName]: [...oldValue, ...[action.payload[paramName]]]
      },
      isModified: true,
    }
  }, stateViews);
}
export function removeElementInArray(stateViews, action, arrayName) {
  if (!stateViews[action.payload.viewId] || action.payload.index === undefined) {
    return stateViews;
  }
  const viewConf = stateViews[action.payload.viewId].configuration;
  const index = action.payload.index;
  if (index < 0 || index >= viewConf[arrayName].length) {
    return stateViews;
  }
  return u({
    [action.payload.viewId]: {
      configuration: {
        [arrayName]: _without(viewConf[arrayName], viewConf[arrayName][index])
      },
      isModified: true,
    }
  }, stateViews);
}
