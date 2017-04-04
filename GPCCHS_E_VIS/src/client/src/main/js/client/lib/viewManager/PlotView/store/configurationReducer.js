import _ from 'lodash/fp';

import { getAxes, updateAxis, addAxis, removeAxis } from './axes';
import { getNewPlotEntryPoint } from '../../../common/entryPoint';
import * as types from '../../../store/types';

const removeElementIn = (key, index, state) => _.update(key, _.pullAt(index), state);
const addElementIn = (key, val, state) => _.update(key, _.concat(_, val), state);

export default (stateConf = { content: '' }, action) => {
  switch (action.type) {
    case types.WS_VIEW_UPDATE_LEGEND:
      return _.set('legend', action.payload.legend, stateConf);
    case types.WS_VIEW_UPDATE_SHOWYAXES:
      return _.set('showYAxes', action.payload.showYAxes, stateConf);
    case types.WS_VIEW_UPDATE_GRID:
      return _.set(`grids[${action.payload.index}]`, action.payload.grid, stateConf);
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
    case types.WS_VIEW_ADD_ENTRYPOINT: { // TODO : move in viewManager#PlotView
      const [axisX, axisY] = getAxes(stateConf, action);
      const newEp = _.merge(getNewPlotEntryPoint(), action.payload.entryPoint);
      return {
        ...stateConf,
        entryPoints: [
          ...stateConf.entryPoints,
          {
            ...newEp,
            connectedDataX: {
              ...(newEp.connectedDataX),
              axisId: axisX.id,
              unit: axisX.unit,
            },
            connectedDataY: {
              ...(newEp.connectedDataY),
              axisId: axisY.id,
              unit: axisY.unit,
            },
          },
        ],
        axes: {
          ...stateConf.axes,
          [axisX.id]: axisX,
          [axisY.id]: axisY,
        },
      };
    }
    case types.WS_VIEW_REMOVE_ENTRYPOINT: {
      const entryPoints = stateConf.entryPoints;
      const getAllConnectedAxisIds = eps => _.concat(
        _.pluck('connectedDataX.axisId', eps),
        _.pluck('connectedDataY.axisId', eps)
      );
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
    default:
      return stateConf;
  }
};
