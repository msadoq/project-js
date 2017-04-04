import _ from 'lodash/fp';

import composeReducers from '../../composeReducers';
import { getAxes, updateAxis, addAxis, removeAxis } from './axes';
import { getNewPlotEntryPoint, getNewTextEntryPoint } from '../../../common/entryPoint';

import * as types from '../../types';

const removeElementIn = (key, index, state) => _.update(key, _.pullAt(index), state);
const addElementIn = (key, val, state) => _.update(key, _.concat(_, val), state);

// Here we are the common configuration reducer,
// any type of view will be processed by this reducer
export const commonConfiguration = (stateConf = {}, action) => {
  switch (action.type) {
    case types.WS_VIEW_UPDATE_ENTRYPOINT:
      return _.set(`entryPoints[${action.payload.index}]`, action.payload.entryPoint, stateConf);
    case types.WS_VIEW_REMOVE_ENTRYPOINT: {
      return removeElementIn('entryPoints', action.payload.index, stateConf);
    }
    default:
      return stateConf;
  }
};

// This is specfic reducers by view type
// TODO garm factorize in viewManager
export const configurationByViewType = {
  TextView: (stateConf, action) => {
    switch (action.type) {
      case types.WS_VIEW_UPDATE_CONTENT:
        return _.set('content', action.payload.content, stateConf);
      case types.WS_VIEW_ADD_ENTRYPOINT: {
        const newEp = _.merge(getNewTextEntryPoint(), action.payload.entryPoint);
        return _.update('entryPoints', _.concat(_, newEp), stateConf);
      }
      default:
        return stateConf;
    }
  },
  DynamicView: (stateConf, action) => {
    switch (action.type) {
      case types.WS_VIEW_RELOAD:
      case types.WS_VIEW_OPEN:
      case types.WS_PAGE_OPEN:
      case types.WS_WORKSPACE_OPEN:
      case types.WS_VIEW_ADD_BLANK: {
        const config = action.payload.view.configuration;
        const nextConf = _.set('entryPoints', [{
          ...config.entryPoint,
          name: 'dynamicEP',
        }], config);
        return _.omit('entryPoint', nextConf);
      }

      default:
        return stateConf;
    }
  },
  PlotView: (stateConf, action) => {
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
        const axisY = getAxes(stateConf, action);
        const newEp = _.merge(getNewPlotEntryPoint(), action.payload.entryPoint);
        return {
          ...stateConf,
          entryPoints: [
            ...stateConf.entryPoints,
            {
              ...newEp,
              connectedData: {
                ...(newEp.connectedData),
                axisId: axisY.id,
                unit: axisY.unit,
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
      default:
        return stateConf;
    }
  },
};


// Expose a reducer creator that take a view type
// and return a single reducer that deal with configuration property depends on this viewType
export default viewType => (
  composeReducers(
    configurationByViewType[viewType] || _.identity,
    commonConfiguration
  )
);
