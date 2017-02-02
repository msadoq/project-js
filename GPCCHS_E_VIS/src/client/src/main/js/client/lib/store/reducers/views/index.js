import _omit from 'lodash/omit';
import _without from 'lodash/without';
import _merge from 'lodash/merge';
import u from 'updeep';
// import { resolve } from 'path';
import globalConstants from 'common/constants';
import * as types from '../../types';
import vivl from '../../../../VIVL/main';
import {
  getNewPlotEntryPoint,
  getNewTextEntryPoint,
} from '../../../common/entryPoint';
import {
  updateAxis,
  addAxis,
  removeAxis,
  createAxis,
  addNewAxis,
  getAxisId,
} from './axis';

/**
 * Reducer
 */

export default function views(stateViews = {}, action) {
  switch (action.type) {

    // VIEW MAIN OPERATIONS
    case types.WS_VIEW_ADD:
      return {
        ...stateViews,
        [action.payload.viewId]: view(undefined, action),
      };
    case types.WS_VIEW_REMOVE:
      return _omit(stateViews, [action.payload.viewId]);
    case types.WS_VIEW_RELOAD: {
      return {
        ...stateViews,
        [action.payload.viewId]: {
          ...stateViews[action.payload.viewId],
          isModified: false,
          configuration: configuration(stateViews[action.payload.viewId], action),
        }
      };
    }

    // VIEW CONFIGURATION
    case types.WS_VIEW_UPDATEPATH: {
      return u({
        [action.payload.viewId]: {
          path: action.payload.newPath,
          isModified: true,
        }
      }, stateViews);
    }
    case types.WS_VIEW_UPDATE_ABSOLUTEPATH: {
      return u({ [action.payload.viewId]: {
        absolutePath: action.payload.newPath,
        isModified: true,
      } }, stateViews);
    }
    case types.WS_VIEW_SET_OID: {
      return u({
        [action.payload.viewId]: {
          oId: action.payload.oid,
        }
      }, stateViews);
    }
    case types.WS_VIEW_UPDATE_GRID:
      return updateConfigurationArray(stateViews, action, 'grids', 'grid');
    case types.WS_VIEW_UPDATE_LINK:
      return updateConfigurationArray(stateViews, action, 'links', 'link');
    case types.WS_VIEW_UPDATE_MARKER:
      return updateConfigurationArray(stateViews, action, 'markers', 'marker');
    case types.WS_VIEW_UPDATE_PROCEDURE:
      return updateConfigurationArray(stateViews, action, 'procedures', 'procedure');
    case types.WS_VIEW_UPDATE_RATIO:
      return updateConfiguration(stateViews, action, 'defaultRatio', 'ratio');
    case types.WS_VIEW_UPDATE_TITLE:
      return updateConfiguration(stateViews, action, 'title', 'title');
    case types.WS_VIEW_UPDATE_TITLESTYLE:
      return updateConfiguration(stateViews, action, 'titleStyle', 'titleStyle');
    case types.WS_VIEW_UPDATE_BGCOLOR:
      return updateConfiguration(stateViews, action, 'backgroundColor', 'bgColor');
    case types.WS_VIEW_UPDATE_LEGEND:
      return updateConfiguration(stateViews, action, 'legend', 'legend', 'PlotView');
    case types.WS_VIEW_UPDATE_CONTENT:
      return updateConfiguration(stateViews, action, 'content', 'content', 'TextView');
    case types.WS_VIEW_UPDATE_SHOWYAXES:
      return updateConfiguration(stateViews, action, 'showYAxes', 'showYAxes', 'PlotView');
    case types.WS_VIEW_ADD_GRID:
      return addElementInConfigurationArray(stateViews, action, 'grids', 'grid');
    case types.WS_VIEW_REMOVE_GRID:
      return removeElementInConfigurationArray(stateViews, action, 'grids');
    case types.WS_VIEW_ADD_LINK:
      return addElementInConfigurationArray(stateViews, action, 'links', 'link');
    case types.WS_VIEW_REMOVE_LINK:
      return removeElementInConfigurationArray(stateViews, action, 'links');
    case types.WS_VIEW_ADD_MARKER:
      return addElementInConfigurationArray(stateViews, action, 'markers', 'marker');
    case types.WS_VIEW_REMOVE_MARKER:
      return removeElementInConfigurationArray(stateViews, action, 'markers');
    case types.WS_VIEW_ADD_PROCEDURE:
      return addElementInConfigurationArray(stateViews, action, 'procedures', 'procedure');
    case types.WS_VIEW_REMOVE_PROCEDURE:
      return removeElementInConfigurationArray(stateViews, action, 'procedures');
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_VIEW_SETCOLLAPSED:
      return updateConfiguration(stateViews, action, 'collapsed', 'flag');
    case types.WS_VIEW_SETMODIFIED: {
      if (!stateViews[action.payload.viewId]) {
        return stateViews;
      }
      return u({
        [action.payload.viewId]: {
          isModified: action.payload.flag,
        }
      }, stateViews);
    }


    // VIEW AXIS
    case types.WS_VIEW_UPDATE_AXIS:
      return updateAxis(stateViews, action);
    case types.WS_VIEW_ADD_AXIS:
      return addAxis(stateViews, action);
    case types.WS_VIEW_REMOVE_AXIS:
      return removeAxis(stateViews, action);

    // VIEW ENTRY POINT
    case types.WS_VIEW_UPDATE_ENTRYPOINT:
      return updateConfigurationArray(stateViews, action, 'entryPoints', 'entryPoint');
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
      let newState = removeElementInConfigurationArray(stateViews, action, 'entryPoints');
      if (stateViews[action.payload.viewId] &&
          stateViews[action.payload.viewId].type === 'PlotView') {
        newState = removeUnreferencedAxis(newState, action.payload.viewId, axisIdX, axisIdY);
      }
      return newState;
    }

    default:
      return stateViews;
  }
}

const initialState = {
  type: null,
  isModified: true,
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
        isModified: (action.payload.isModified === undefined)
          ? stateView.isModified
          : action.payload.isModified,
      };
    default:
      return stateView;
  }
}

function configuration(state = { title: null }, action) {
  switch (action.type) {
    case types.WS_VIEW_RELOAD:
    case types.WS_VIEW_ADD: {
      if (!action.payload.configuration) {
        return Object.assign({}, state);
      }
      const uuids = (action.meta && action.meta.uuids) || [];

      // Add an id on entry points
      const config = action.payload.configuration;
      const viewType = action.payload.type;
      // For dynamic view, format entry point to be used as in other view
      if (viewType === 'DynamicView') {
        if (!config.entryPoint) {
          const formattedConfig = Object.assign({}, config);
          formattedConfig.entryPoints = [];
          return formattedConfig;
        }
        const formattedConfig = _omit(config, 'entryPoint');
        formattedConfig.entryPoints = [];
        formattedConfig.entryPoints.push(Object.assign({}, config.entryPoint, {
          name: 'dynamicEP',
          id: uuids[0] }));
        return Object.assign({}, formattedConfig);
      }
      if (!config.entryPoints) {
        return Object.assign({}, config);
      }
      config.entryPoints.forEach((ep, index, entryPoints) => {
        // eslint-disable-next-line no-param-reassign
        entryPoints[index] = Object.assign({}, ep, { id: uuids[index] });
      });
      return Object.assign({}, config);
    }
    default:
      return state;
  }
}

export function updateConfiguration(stateViews, action, objectName, paramName, viewType) {
  if (!stateViews[action.payload.viewId]) {
    return stateViews;
  }
  // Content only for a type of view if viewType is defined
  if (viewType && stateViews[action.payload.viewId].type !== viewType) {
    return stateViews;
  }
  return u({
    [action.payload.viewId]: {
      configuration: {
        [objectName]: action.payload[paramName],
      },
      isModified: true,
    }
  }, stateViews);
}

export function updateConfigurationArray(stateViews, action, arrayName, paramName) {
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
      },
      isModified: true,
    }
  }, stateViews);
}

export function addElementInConfigurationArray(stateViews, action, arrayName, paramName) {
  if (!stateViews[action.payload.viewId] || !action.payload[paramName]) {
    return stateViews;
  }
  const oldValue = stateViews[action.payload.viewId].configuration[arrayName];
  return u({
    [action.payload.viewId]: {
      configuration: {
        [arrayName]: [...oldValue, ...[action.payload[paramName]]],
      },
      isModified: true,
    }
  }, stateViews);
}
export function removeElementInConfigurationArray(stateViews, action, arrayName) {
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
      },
      isModified: true,
    }
  }, stateViews);
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
        },
        isModified: true,
      }
    }, newState);
  }
  return newState;
}
