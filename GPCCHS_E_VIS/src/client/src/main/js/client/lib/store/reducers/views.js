import __ from 'lodash/fp';
import globalConstants from 'common/constants';

import composeReducers from '../composeReducers';
import * as types from '../types';
import vivl from '../../../VIVL/main';
import {
  getNewPlotEntryPoint,
  getNewTextEntryPoint,
} from '../../common/entryPoint';
import {
  updateAxis,
  addAxis,
  removeAxis,
  getAxes,
} from './view/axes';

/**
 * Reducer
 */
export default function views(stateViews = {}, action) {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return {};

    // VIEW AXIS
    case types.WS_VIEW_UPDATE_AXIS:
      return updateAxis(stateViews, action);
    case types.WS_VIEW_ADD_AXIS:
      return addAxis(stateViews, action);
    case types.WS_VIEW_REMOVE_AXIS:
      return removeAxis(stateViews, action);

    default: {
      const viewId = __.get('payload.viewId', action);
      if (viewId) {
        const nextView = view(stateViews[viewId], action);
        if (!nextView) {
          return __.omit(viewId, stateViews);
        }
        return __.set(viewId, nextView, stateViews);
      }
      return stateViews;
    }
  }
}

const viewIsModified = (stateView, action) => {
  const setIsModified = __.set('isModified');
  const isModified = action.payload && action.payload.isModified;

  if (!stateView) {
    return stateView;
  }
  if (__.isBoolean(isModified)) {
    return setIsModified(isModified, stateView);
  }

  const shouldSetModifiedToFalse = __.contains(__, [
    types.WS_VIEW_RELOAD,
  ]);
  const shouldSetModifiedToTrue = __.contains(__, [
    types.WS_VIEW_ADD,
    types.WS_VIEW_UPDATEPATH,
    types.WS_VIEW_UPDATE_ABSOLUTEPATH,
    types.WS_VIEW_SET_OID,
    types.WS_VIEW_SETMODIFIED,
    types.WS_VIEW_UPDATE_RATIO,
    types.WS_VIEW_UPDATE_TITLE,
    types.WS_VIEW_UPDATE_GRID,
    types.WS_VIEW_UPDATE_LINK,
    types.WS_VIEW_UPDATE_MARKER,
    types.WS_VIEW_UPDATE_PROCEDURE,
    types.WS_VIEW_UPDATE_TITLESTYLE,
    types.WS_VIEW_UPDATE_BGCOLOR,
    types.WS_VIEW_UPDATE_LEGEND,
    types.WS_VIEW_UPDATE_CONTENT,
    types.WS_VIEW_UPDATE_SHOWYAXES,
    types.WS_VIEW_UPDATE_ENTRYPOINT,
    types.WS_VIEW_ADD_LINK,
    types.WS_VIEW_REMOVE_LINK,
    types.WS_VIEW_ADD_MARKER,
    types.WS_VIEW_REMOVE_MARKER,
    types.WS_VIEW_ADD_PROCEDURE,
    types.WS_VIEW_REMOVE_PROCEDURE,
    types.WS_VIEW_SETCOLLAPSED,
    types.WS_VIEW_ADD_ENTRYPOINT,
  ]);
  if (shouldSetModifiedToTrue(action.type)) {
    return setIsModified(true, stateView);
  } else if (shouldSetModifiedToFalse(action.type)) {
    return setIsModified(false, stateView);
  }
  return stateView;
};

const initialState = {
  type: null,
  isModified: true,
};

export function simpleView(stateView = initialState, action) {
  switch (action.type) {
    case types.WS_VIEW_REMOVE:
      return undefined;
    case types.WS_VIEW_ADD:
      return {
        ...stateView,
        type: action.payload.type || stateView.type,
        path: action.payload.path,
        oId: action.payload.oId,
        absolutePath: action.payload.absolutePath,
      };
    case types.WS_VIEW_UPDATEPATH:
      return {
        ...stateView,
        path: action.payload.newPath,
      };
    case types.WS_VIEW_UPDATE_ABSOLUTEPATH:
      return {
        ...stateView,
        absolutePath: action.payload.newPath,
      };
    case types.WS_VIEW_SET_OID:
      return {
        ...stateView,
        oId: action.payload.oid,
      };
    default:
      return stateView;
  }
}

const viewConfiguration = (stateView, action) => {
  if (!stateView) {
    return stateView;
  }
  const viewType = stateView.type;
  const structureType = viewType ? vivl(viewType, 'structureType')() : '';
  const configuration = composeReducers(
    configurationByStructureType[structureType] || __.identity,
    configurationByViewType[viewType] || __.identity,
    commonConfiguration
  );
  return __.set('configuration', configuration(stateView.configuration, action), stateView);
};

const view = composeReducers(viewConfiguration, viewIsModified, simpleView);


/* ************************************************************************** */

const removeElementIn = (key, index, state) => __.update(key, __.pullAt(index), state);
const commonConfiguration = (stateConf = { title: null }, action) => {
  switch (action.type) {
    case types.WS_VIEW_RELOAD:
    case types.WS_VIEW_ADD: {
      const config = action.payload.configuration;
      const uuids = (action.meta && action.meta.uuids);
      if (!config) {
        return stateConf;
      }
      if (__.isEmpty(config.entryPoints)) {
        return config;
      }
      const entryPointsWithUuids = __.zipWith(__.set('id'), uuids, config.entryPoints);
      return __.set('entryPoints', entryPointsWithUuids, config);
    }
    case types.WS_VIEW_UPDATE_RATIO:
      return __.set('defaultRatio', action.payload.ratio, stateConf);
    case types.WS_VIEW_UPDATE_TITLE:
      return __.set('title', action.payload.title, stateConf); // updateConfiguration
    case types.WS_VIEW_UPDATE_GRID:
      return __.set(`grids[${action.payload.index}]`, action.payload.grid, stateConf);
    case types.WS_VIEW_UPDATE_LINK:
      return __.set(`links[${action.payload.index}]`, action.payload.link, stateConf);
    case types.WS_VIEW_UPDATE_MARKER:
      return __.set(`markers[${action.payload.index}]`, action.payload.marker, stateConf);
    case types.WS_VIEW_UPDATE_PROCEDURE:
      return __.set(`procedures[${action.payload.index}]`, action.payload.procedure, stateConf);
    case types.WS_VIEW_UPDATE_TITLESTYLE:
      return __.set('titleStyle', action.payload.titleStyle, stateConf);
    case types.WS_VIEW_UPDATE_BGCOLOR:
      return __.set('backgroundColor', action.payload.bgColor, stateConf);
    case types.WS_VIEW_UPDATE_LEGEND:
      return __.set('legend', action.payload.legend, stateConf);
    case types.WS_VIEW_UPDATE_CONTENT:
      return __.set('content', action.payload.content, stateConf);
    case types.WS_VIEW_UPDATE_SHOWYAXES:
      return __.set('showYAxes', action.payload.showYAxes, stateConf);
    case types.WS_VIEW_SETCOLLAPSED:
      return __.set('collapsed', action.payload.flag, stateConf);
    case types.WS_VIEW_ADD_GRID:
      return __.update('grids', __.concat(__, action.payload.grid), stateConf);
    case types.WS_VIEW_ADD_LINK:
      return __.update('links', __.concat(__, action.payload.link), stateConf);
    case types.WS_VIEW_ADD_MARKER:
      return __.update('markers', __.concat(__, action.payload.marker), stateConf);
    case types.WS_VIEW_ADD_PROCEDURE:
      return __.update('procedures', __.concat(__, action.payload.procedure), stateConf);
    case types.WS_VIEW_REMOVE_GRID:
      return removeElementIn('grids', action.payload.index, stateConf);
    case types.WS_VIEW_REMOVE_LINK:
      return removeElementIn('links', action.payload.index, stateConf);
    case types.WS_VIEW_REMOVE_MARKER:
      return removeElementIn('markers', action.payload.index, stateConf);
    case types.WS_VIEW_REMOVE_PROCEDURE:
      return removeElementIn('procedures', action.payload.index, stateConf);
    // entryPoints
    case types.WS_VIEW_UPDATE_ENTRYPOINT:
      return __.set(`entryPoints[${action.payload.index}]`, action.payload.entryPoint, stateConf);
    case types.WS_VIEW_REMOVE_ENTRYPOINT: {
      return removeElementIn('entryPoints', action.payload.index, stateConf);
    }
    default:
      return stateConf;
  }
};

const configurationByViewType = {
  DynamicView: (stateConf, action) => {
    switch (action.type) {
      case types.WS_VIEW_ADD: {
        const uuid = __.get('meta.uuids[0]', action);
        const config = action.payload.configuration;
        const nextConf = __.set('entryPoints', [{
          ...config.entryPoint,
          name: 'dynamicEP',
          id: uuid,
        }], config);
        return __.omit('entryPoint', nextConf);
      }
      default:
        return stateConf;
    }
  },
  PlotView: (stateConf, action) => {
    switch (action.type) {
      case types.WS_VIEW_REMOVE_ENTRYPOINT: {
        const entryPoints = stateConf.entryPoints;
        const getAllConnectedAxis = eps => __.concat(
          __.pluck('connectedDataX.axisId', eps),
          __.pluck('connectedDataY.axisId', eps)
        );
        const refreshAxes = __.pick(getAllConnectedAxis(entryPoints));
        return __.update('axes', refreshAxes, stateConf);
      }
      default:
        return stateConf;
    }
  },
};

const configurationByStructureType = {
  [globalConstants.DATASTRUCTURETYPE_RANGE]: (stateConf, action) => {
    switch (action.type) {
      case types.WS_VIEW_ADD_ENTRYPOINT: {
        const newRangeValue = __.merge(getNewPlotEntryPoint(), action.payload.entryPoint);
        const [axisX, axisY] = getAxes(newRangeValue, stateConf);
        const addAxisXId = __.set('connectedDataX.axisId', axisX.id);
        const addAxisYId = __.set('connectedDataY.axisId', axisY.id);
        const addAxesIds = __.compose(addAxisXId, addAxisYId);
        return {
          ...stateConf,
          entryPoints: [...stateConf.entryPoints, addAxesIds(newRangeValue)],
          axes: {
            [axisX.id]: axisX,
            [axisY.id]: axisY,
          },
        };
      }
      default:
        return stateConf;
    }
  },
  [globalConstants.DATASTRUCTURETYPE_LAST]: (stateConf, action) => {
    switch (action.type) {
      case types.WS_VIEW_ADD_ENTRYPOINT: {
        const newLastValue = __.merge(getNewTextEntryPoint(), action.payload.entryPoint);
        return __.update('entryPoints', __.concat(__, newLastValue), stateConf);
      }
      default:
        return stateConf;
    }
  },
};
