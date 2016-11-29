import _omit from 'lodash/omit';
import _without from 'lodash/without';
import _cloneDeep from 'lodash/cloneDeep';
import _find from 'lodash/find';
import u from 'updeep';
import { resolve } from 'path';
import { v4 } from 'node-uuid';
import globalConstants from 'common/constants';
import * as types from '../types';
import vivl from '../../../VIVL/main';
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
      return updateAxis(stateViews, action);
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
      return addAxis(stateViews, action);
    case types.WS_VIEW_REMOVE_AXIS:
      return removeAxis(stateViews, action);
    case types.WS_VIEW_ADD_ENTRYPOINT:
      return addEntryPoint(stateViews, action);
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

export function updateAxis(stateViews, action) {
  if (!stateViews[action.payload.viewId]) {
    return stateViews;
  }
  // Content only for a type of view if viewType is defined
  if (stateViews[action.payload.viewId].type !== 'PlotView') {
    return stateViews;
  }
  return u({
    [action.payload.viewId]: {
      configuration: {
        axes: { [action.payload.axisId]: action.payload.axis }
      },
      isModified: true,
    }
  }, stateViews);
}

export function addAxis(stateViews, action) {
  if (!stateViews[action.payload.viewId]) {
    return stateViews;
  }
  // Content only for a type of view if viewType is defined
  if (stateViews[action.payload.viewId].type !== 'PlotView') {
    return stateViews;
  }
  const uuid = v4();
  const axis = Object.assign({}, action.payload.axis, { uuid });
  return u({
    [action.payload.viewId]: {
      configuration: {
        axes: { [uuid]: axis }
      },
      isModified: true,
    }
  }, stateViews);
}

export function removeAxis(stateViews, action) {
  if (!stateViews[action.payload.viewId]) {
    return stateViews;
  }
  // Content only for a type of view if viewType is defined
  if (stateViews[action.payload.viewId].type !== 'PlotView') {
    return stateViews;
  }
  const newState = _cloneDeep(stateViews);
  newState[action.payload.viewId].configuration.axes =
    _omit(stateViews[action.payload.viewId].configuration.axes, action.payload.axisId);
  return newState;
}
export function createAxis(label, unit) {
  const uuid = v4();
  return {
    label,
    unit,
    uuid,
  };
}
export function addEntryPoint(stateViews, action) {
  if (!stateViews[action.payload.viewId] || !action.payload.entryPoint) {
    return stateViews;
  }
  const oldValue = stateViews[action.payload.viewId].configuration.entryPoints;
  const currentView = stateViews[action.payload.viewId];
  const newValue = action.payload.entryPoint;

  let newState = u({
    [action.payload.viewId]: {
      configuration: {
        entryPoints: [...oldValue, ...newValue],
      },
      isModified: true,
    }
  }, stateViews);
  const structureType = vivl(currentView.type, 'structureType')();
  switch (structureType) { // eslint-disable-line default-case
    case globalConstants.DATASTRUCTURETYPE_LAST: {
      // session Id
      if (!newValue.connectedData.timeline) {
        newValue.connectedData.timeline = '*';
      }
      // domain
      if (!newValue.connectedData.domain) {
        newValue.connectedData.domain = '*';
      }
      return u({
        [action.payload.viewId]: {
          configuration: {
            entryPoints: [...oldValue, newValue],
          },
          isModified: true,
        }
      }, stateViews);
    }
    case globalConstants.DATASTRUCTURETYPE_RANGE: {
      // session Id
      if (!newValue.connectedDataX.timeline) {
        newValue.connectedDataX.timeline = '*';
      }
      if (!newValue.connectedDataY.timeline) {
        newValue.connectedDataY.timeline = '*';
      }
      // domain
      if (!newValue.connectedDataX.domain) {
        newValue.connectedDataX.domain = '*';
      }
      if (!newValue.connectedDataY.domain) {
        newValue.connectedDataY.domain = '*';
      }
      // axis Id
      newState = updatePlotAxisId(stateViews, action);
      return u({
        [action.payload.viewId]: {
          configuration: {
            entryPoints: [...oldValue, newValue],
          },
          isModified: true,
        }
      }, newState);
    }
  }
  return stateViews;
}

export function updatePlotAxisId(stateViews, action) {
  const currentView = stateViews[action.payload.viewId];
  if (currentView.type !== 'PlotView') {
    return stateViews;
  }
  const newValue = action.payload.entryPoint;
  let newState = stateViews;
  // axis Id
  if (!newValue.connectedDataX.axisId) {
    let axisId = getAxisId(newValue.name, newValue.connectedDataX, currentView);
    if (!axisId) {
      const axis = createAxis(newValue.name, newValue.connectedDataX.unit);
      newState = addNewAxis(newState, action.payload.viewId, axis);
      axisId = axis.uuid;
    }
    newValue.connectedDataX.axisId = axisId; // eslint-disable-line no-param-reassign
  }
  if (!newValue.connectedDataY.axisId) {
    let axisId = getAxisId(newValue.name, newValue.connectedDataY, currentView);
    if (!axisId) {
      const axis = createAxis(newValue.name, newValue.connectedDataY.unit);
      newState = addNewAxis(newState, action.payload.viewId, axis);
      axisId = axis.uuid;
    }
    newValue.connectedDataY.axisId = axisId; // eslint-disable-line no-param-reassign
  }

  return newState;
}

export function addNewAxis(state, viewId, axis) {
  if (axis) {
    const val = { [axis.uuid]: axis };
    return u({ [viewId]: {
      configuration: {
        axes: val,
      } } }, state);
  }
  return state;
}

export function getAxisId(epName, connectedData, currentView) {
  if (connectedData.axisId) {
    return connectedData.axisId;
  }
  // Choose the axis with the right unit
  const index = _find(currentView.configuration.axes,
                      current => current.unit === connectedData.unit);
  if (index) {
    return index.uuid;
  }
}
