import __ from 'lodash/fp';
import globalConstants from 'common/constants';

import { getAxes } from './axes';
import { getNewPlotEntryPoint, getNewTextEntryPoint } from '../../../common/entryPoint';

import * as types from '../../types';

const removeElementIn = (key, index, state) => __.update(key, __.pullAt(index), state);

export const commonConfiguration = (stateConf = { title: null }, action) => {
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
    case types.WS_VIEW_UPDATE_LEGEND:
      return __.set('legend', action.payload.legend, stateConf);
    case types.WS_VIEW_UPDATE_CONTENT:
      return __.set('content', action.payload.content, stateConf);
    case types.WS_VIEW_UPDATE_SHOWYAXES:
      return __.set('showYAxes', action.payload.showYAxes, stateConf);
    case types.WS_VIEW_SETCOLLAPSED:
      return __.set('collapsed', action.payload.flag, stateConf);
    case types.WS_VIEW_UPDATE_RATIO:
      return __.set('defaultRatio', action.payload.ratio, stateConf);
    case types.WS_VIEW_UPDATE_TITLE:
      return __.set('title', action.payload.title, stateConf);
    case types.WS_VIEW_UPDATE_TITLESTYLE:
      return __.set('titleStyle', action.payload.titleStyle, stateConf);
    case types.WS_VIEW_UPDATE_BGCOLOR:
      return __.set('backgroundColor', action.payload.bgColor, stateConf);
    case types.WS_VIEW_UPDATE_GRID:
      return __.set(`grids[${action.payload.index}]`, action.payload.grid, stateConf);
    case types.WS_VIEW_ADD_GRID:
      return __.update('grids', __.concat(__, action.payload.grid), stateConf);
    case types.WS_VIEW_REMOVE_GRID:
      return removeElementIn('grids', action.payload.index, stateConf);
    case types.WS_VIEW_UPDATE_LINK:
      return __.set(`links[${action.payload.index}]`, action.payload.link, stateConf);
    case types.WS_VIEW_ADD_LINK:
      return __.update('links', __.concat(__, action.payload.link), stateConf);
    case types.WS_VIEW_REMOVE_LINK:
      return removeElementIn('links', action.payload.index, stateConf);
    case types.WS_VIEW_UPDATE_MARKER:
      return __.set(`markers[${action.payload.index}]`, action.payload.marker, stateConf);
    case types.WS_VIEW_ADD_MARKER:
      return __.update('markers', __.concat(__, action.payload.marker), stateConf);
    case types.WS_VIEW_REMOVE_MARKER:
      return removeElementIn('markers', action.payload.index, stateConf);
    case types.WS_VIEW_UPDATE_PROCEDURE:
      return __.set(`procedures[${action.payload.index}]`, action.payload.procedure, stateConf);
    case types.WS_VIEW_ADD_PROCEDURE:
      return __.update('procedures', __.concat(__, action.payload.procedure), stateConf);
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

export const configurationByViewType = {
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

export const configurationByStructureType = {
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
