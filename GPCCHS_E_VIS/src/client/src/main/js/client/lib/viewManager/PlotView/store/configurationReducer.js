import _ from 'lodash/fp';

import { getYAxis, updateAxis, addAxis, removeAxis } from './axes';
import * as types from '../../../store/types';

const removeElementIn = (key, index, state) => _.update(key, _.pullAt(index), state);

const addElementIn = (key, val, state) => _.update(key, x => _.compact(_.concat(x, val)), state);

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
export default (stateConf = { search: '', showLegend: true }, action) => {
  switch (action.type) {
    case types.WS_VIEW_UPDATE_LEGEND:
      return _.set('legend', action.payload.legend, stateConf);
    case types.WS_VIEW_UPDATE_SHOWYAXES:
      return _.set('showYAxes', action.payload.showYAxes, stateConf);
    case types.WS_VIEW_UPDATE_GRID:
      return _.set(`grids[${action.payload.index}]`, action.payload.grid, stateConf);
    case types.WS_VIEW_TOGGLE_LEGEND:
      return _.set('showLegend', action.payload.flag, stateConf);
    case types.WS_VIEW_ADD_GRID:
      return addElementIn('grids', action.payload.grid, stateConf);
    case types.WS_VIEW_REMOVE_GRID:
      return removeElementIn('grids', action.payload.index, stateConf);
    case types.WS_VIEW_UPDATE_MARKER:
      return _.set(`markers[${action.payload.index}]`, action.payload.marker, stateConf);
    case types.WS_VIEW_ADD_MARKER:
      return addElementIn('markers', action.payload.marker, stateConf);
    case types.WS_VIEW_REMOVE_MARKER:
      return removeElementIn('markers', action.payload.index, stateConf);
    case types.WS_VIEW_ADD_ENTRYPOINT: {
      const axisY = getYAxis(stateConf, action);
      return {
        ...stateConf,
        entryPoints: [
          ...stateConf.entryPoints,
          {
            ...action.payload.entryPoint,
            connectedData: {
              ...(action.payload.entryPoint.connectedData),
              axisId: axisY.id,
            },
          },
        ],
        axes: {
          ...stateConf.axes,
          [axisY.id]: axisY,
        },
      };
    }
    case types.WS_VIEW_REMOVE_ENTRYPOINT: {
      const entryPoints = stateConf.entryPoints;
      const getAllConnectedAxisIds = eps => _.pluck('connectedData.axisId', eps);
      const refreshAxes = _.pick(getAllConnectedAxisIds(entryPoints));
      return _.update('axes', refreshAxes, stateConf);
    }
    case types.WS_VIEW_UPDATE_AXIS: {
      return updateAxis(stateConf, action);
    }
    case types.WS_VIEW_ADD_AXIS:
      return addAxis(stateConf, action);
    case types.WS_VIEW_REMOVE_AXIS:
      return removeAxis(stateConf, action);
    case types.WS_VIEW_UPDATE_EDITOR_SEARCH:
      if (action.payload.search !== stateConf.search) {
        return _.set('search', action.payload.search, stateConf);
      }
      return stateConf;
    default:
      return stateConf;
  }
};
