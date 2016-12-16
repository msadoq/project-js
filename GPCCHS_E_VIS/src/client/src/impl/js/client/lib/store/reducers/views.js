import _omit from 'lodash/omit';
import _without from 'lodash/without';
import _find from 'lodash/find';
import _trim from 'lodash/trim';
import _deburr from 'lodash/deburr';
import _merge from 'lodash/merge';
import _snakeCase from 'lodash/snakeCase';
import u from 'updeep';
import { resolve } from 'path';
import { v4 } from 'node-uuid';

import globalConstants from 'common/constants';
import * as types from '../types';
import vivl from '../../../VIVL/main';
import {
  getNewPlotEntryPoint,
  getNewTextEntryPoint,
} from '../../common/entryPoint';

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
    case types.WS_VIEW_UPDATEPATH: {
      // path unchanged or newPath invalid
      if (!action.payload.newPath ||
        resolve(action.payload.newPath) === resolve(stateViews[action.payload.viewId].path)) {
        return stateViews;
      }
      return u({
        [action.payload.viewId]: {
          path: action.payload.newPath,
          isModified: true,
          configuration: {
            title: addStarOnTitle(stateViews[action.payload.viewId]),
          }
        }
      }, stateViews);
    }
    case types.WS_VIEW_UPDATE_ABSOLUTEPATH: {
      // path unchanged or newPath invalid
      if (stateViews[action.payload.viewId].absolutePath
        && (!action.payload.newPath || resolve(action.payload.newPath)
        === resolve(stateViews[action.payload.viewId].absolutePath))) {
        return stateViews;
      }
      return u({ [action.payload.viewId]: {
        absolutePath: action.payload.newPath,
        isModified: true,
        configuration: {
          title: addStarOnTitle(stateViews[action.payload.viewId]),
        },
      } }, stateViews);
    }
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
      return updateObject(stateViews, action, 'backgroundColor', 'bgColor');
    case types.WS_VIEW_UPDATE_LEGEND:
      return updateObject(stateViews, action, 'legend', 'legend', 'PlotView');
    case types.WS_VIEW_UPDATE_CONTENT:
      return updateObject(stateViews, action, 'content', 'content', 'TextView');
    case types.WS_VIEW_UPDATE_SHOWYAXES:
      return updateObject(stateViews, action, 'showYAxes', 'showYAxes', 'PlotView');
    case types.WS_VIEW_ADD_AXIS:
      return addAxis(stateViews, action);
    case types.WS_VIEW_REMOVE_AXIS:
      return removeAxis(stateViews, action);
    case types.WS_VIEW_ADD_ENTRYPOINT:
      return addEntryPoint(stateViews, action);
    case types.WS_VIEW_REMOVE_ENTRYPOINT: {
      let axisIdX;
      let axisIdY;
      if (stateViews[action.payload.viewId] &&
          stateViews[action.payload.viewId].type === 'PlotView') {
        const ep = stateViews[action.payload.viewId].configuration
                  .entryPoints[action.payload.index];
        axisIdX = ep.connectedDataX.axisId;
        axisIdY = ep.connectedDataY.axisId;
      }
      let newState = removeElementInArray(stateViews, action, 'entryPoints');
      if (stateViews[action.payload.viewId] &&
          stateViews[action.payload.viewId].type === 'PlotView') {
        newState = removeUnreferencedAxis(newState, action.payload.viewId, axisIdX, axisIdY);
      }
      return newState;
    }
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
    case types.WS_VIEW_SETCOLLAPSED: {
      if (!stateViews[action.payload.viewId]) {
        return stateViews;
      }
      return u({
        [action.payload.viewId]: {
          isCollapsed: action.payload.flag,
        }
      }, stateViews);
    }
    case types.WS_VIEW_SETMODIFIED: {
      if (!stateViews[action.payload.viewId]) {
        return stateViews;
      }
      let newTitle = stateViews[action.payload.viewId].configuration.title;
      if (!action.payload.flag && newTitle.startsWith('*')) {
        newTitle = newTitle.substring(2);
      } else if (action.payload.flag && !newTitle.startsWith('*')) {
        newTitle = '* '.concat(newTitle);
      }
      return u({
        [action.payload.viewId]: {
          configuration: {
            title: newTitle
          },
          isModified: true,
        }
      }, stateViews);
    }
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
        isModified: action.payload.isModified || false
      };
    default:
      return stateView;
  }
}

function configuration(state = { title: null }, action) {
  switch (action.type) {
    case types.WS_VIEW_ADD: {
      if (!action.payload.configuration) {
        return Object.assign({}, state);
      }

      // Add an id on entry points
      const config = action.payload.configuration;
      if (!config.entryPoints) {
        return Object.assign({}, config);
      }
      config.entryPoints.forEach((ep, index, entryPoints) => {
        // eslint-disable-next-line no-param-reassign
        entryPoints[index] = Object.assign({}, ep, { id: v4() });
      });
      return Object.assign({}, config);
    }
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
  const title = stateViews[action.payload.viewId].configuration.title;
  let newTitle = (objectName === 'title') ? action.payload[paramName] : title;
  newTitle = newTitle.startsWith('*') ? newTitle : '* '.concat(newTitle);
  return u({
    [action.payload.viewId]: {
      configuration: {
        [objectName]: action.payload[paramName],
        title: newTitle
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
        },
        title: addStarOnTitle(stateViews[action.payload.viewId]),
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
        [arrayName]: [...oldValue, ...[action.payload[paramName]]],
        title: addStarOnTitle(stateViews[action.payload.viewId]),
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
        [arrayName]: _without(viewConf[arrayName], viewConf[arrayName][index]),
        title: addStarOnTitle(stateViews[action.payload.viewId]),
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
        axes: { [action.payload.axisId]: action.payload.axis },
        title: addStarOnTitle(stateViews[action.payload.viewId]),
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
  if (!action.payload.axis.label) {
    return stateViews;
  }
  let id = action.payload.axis.id;
  let axis;
  if (!id) {
    id = getUniqueAxisId(stateViews[action.payload.viewId], action.payload.axis.label);
    axis = Object.assign({}, action.payload.axis, { id });
  }
  return u({
    [action.payload.viewId]: {
      configuration: {
        axes: { [id]: axis || action.payload.axis },
        title: addStarOnTitle(stateViews[action.payload.viewId]),
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
  return u({
    [action.payload.viewId]: {
      configuration: {
        axes: u.omit(action.payload.axisId),
        title: addStarOnTitle(stateViews[action.payload.viewId]),
      },
      isModified: true,
    }
  }, stateViews);
}

export function getUniqueAxisId(stateView, label) {
  const id = _snakeCase(_trim(_deburr(label)));
  // check id isn't already defined
  let isUnique = false;
  let index = 1;
  let finalId = id;
  const axes = Object.keys(stateView.configuration.axes);
  while (!isUnique) {
    if (axes.indexOf(finalId) === -1) {
      isUnique = true;
    } else {
      finalId = id.concat('_', index);
      index += 1;
    }
  }
  return finalId;
}
export function createAxis(stateView, label, unit) {
  return {
    label,
    unit,
    id: getUniqueAxisId(stateView, label),
  };
}
export function addEntryPoint(stateViews, action) {
  if (!stateViews[action.payload.viewId] || !action.payload.entryPoint) {
    return stateViews;
  }
  const oldValue = stateViews[action.payload.viewId].configuration.entryPoints;
  const currentView = stateViews[action.payload.viewId];
  const newValue = action.payload.entryPoint;
  const structureType = vivl(currentView.type, 'structureType')();
  switch (structureType) { // eslint-disable-line default-case
    case globalConstants.DATASTRUCTURETYPE_LAST: {
      const newLastValue = u(
        newValue,
        getNewTextEntryPoint(),
      );

      return u({
        [action.payload.viewId]: {
          configuration: {
            entryPoints: [...oldValue, newLastValue],
            title: addStarOnTitle(currentView),
          },
          isModified: true,
        }
      }, stateViews);
    }
    case globalConstants.DATASTRUCTURETYPE_RANGE: {
      const newRangeValue = _merge(
        getNewPlotEntryPoint(),
        newValue);


      // axis Id
      const newState = updatePlotAxisId(
        stateViews,
        {
          payload: {
            viewId: action.payload.viewId,
            entryPoint: newRangeValue
          }
        }
      );

      return u({
        [action.payload.viewId]: {
          configuration: {
            entryPoints: [...oldValue, newRangeValue],
            title: addStarOnTitle(currentView),
          },
          isModified: true,
        }
      }, newState);
    }
  }
  return stateViews;
}

export function updatePlotAxisId(stateViews, { payload: { viewId, entryPoint } }) {
  const currentView = stateViews[viewId];
  if (currentView.type !== 'PlotView') {
    return stateViews;
  }
  const newValue = entryPoint;
  let newState = stateViews;
  // axis Id
  if (!newValue.connectedDataX.axisId) {
    let axisId = getAxisId(newValue.name, newValue.connectedDataX, currentView);
    if (!axisId) {
      const axis = createAxis(currentView, newValue.name, newValue.connectedDataX.unit);
      newState = addNewAxis(newState, viewId, axis);
      axisId = axis.id;
    }
    newValue.connectedDataX.axisId = axisId; // eslint-disable-line no-param-reassign
  }
  if (!newValue.connectedDataY.axisId) {
    let axisId = getAxisId(newValue.name, newValue.connectedDataY, currentView);
    if (!axisId) {
      const axis = createAxis(newState[viewId], newValue.name,
        newValue.connectedDataY.unit);
      newState = addNewAxis(newState, viewId, axis);
      axisId = axis.id;
    }
    newValue.connectedDataY.axisId = axisId; // eslint-disable-line no-param-reassign
  }

  return newState;
}

export function addNewAxis(state, viewId, axis) {
  if (axis) {
    const val = { [axis.id]: axis };
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
    return index.id;
  }
}

export function removeUnreferencedAxis(stateViews, viewId, axisIdX, axisIdY) {
  const epOnAxisX = [];
  const epOnAxisY = [];
  stateViews[viewId].configuration.entryPoints.forEach((ep) => {
    if (ep.connectedDataX.axisId === axisIdX || ep.connectedDataY.axisId === axisIdX) {
      epOnAxisX.push(ep.name);
    }
    if (ep.connectedDataX.axisId === axisIdY || ep.connectedDataY.axisId === axisIdY) {
      epOnAxisY.push(ep.name);
    }
  });
  // No axis to delete
  if (epOnAxisX.length && epOnAxisY.length) {
    return stateViews;
  }
  let newState = stateViews;
  if (!epOnAxisX.length) {
    newState = u({
      [viewId]: {
        configuration: {
          axes: u.omit(axisIdX),
          title: addStarOnTitle(stateViews[viewId]),
        },
        isModified: true,
      }
    }, stateViews);
  }
  if (!epOnAxisY.length) {
    newState = u({
      [viewId]: {
        configuration: {
          axes: u.omit(axisIdY),
          title: addStarOnTitle(stateViews[viewId]),
        },
        isModified: true,
      }
    }, newState);
  }
  return newState;
}

function addStarOnTitle(stateView) {
  if (!stateView) {
    return '';
  }
  const title = stateView.configuration.title;
  return title.startsWith('*') ? title : '* '.concat(title);
}
