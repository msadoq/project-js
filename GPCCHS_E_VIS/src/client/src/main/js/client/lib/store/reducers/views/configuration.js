import __ from 'lodash/fp';
import globalConstants from 'common/constants';

import composeReducers from '../../composeReducers';
import { getAxes, updateAxis, addAxis, removeAxis } from './axes';
import { getNewPlotEntryPoint, getNewTextEntryPoint } from '../../../common/entryPoint';
import { getStructureType } from '../../../viewManager';

import * as types from '../../types';

const removeElementIn = (key, index, state) => __.update(key, __.pullAt(index), state);
const addElementIn = (key, val, state) => __.update(key, __.concat(__, val), state);

// Here we are the common configuration reducer,
// any type of view will be processed by this reducer
export const commonConfiguration = (stateConf = { title: null }, action) => {
  switch (action.type) {
    case types.WS_VIEW_UPDATE_LEGEND:
      return __.set('legend', action.payload.legend, stateConf);
    case types.WS_VIEW_UPDATE_CONTENT:
      return __.set('content', action.payload.content, stateConf);
    case types.WS_VIEW_UPDATE_SHOWYAXES:
      return __.set('showYAxes', action.payload.showYAxes, stateConf);
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
      return addElementIn('grids', action.payload.grid, stateConf);
    case types.WS_VIEW_REMOVE_GRID:
      return removeElementIn('grids', action.payload.index, stateConf);
    case types.WS_VIEW_UPDATE_LINK:
      return __.set(`links[${action.payload.index}]`, action.payload.link, stateConf);
    case types.WS_VIEW_ADD_LINK:
      return addElementIn('links', action.payload.link, stateConf);
    case types.WS_VIEW_REMOVE_LINK:
      return removeElementIn('links', action.payload.index, stateConf);
    case types.WS_VIEW_UPDATE_MARKER:
      return __.set(`markers[${action.payload.index}]`, action.payload.marker, stateConf);
    case types.WS_VIEW_ADD_MARKER:
      return addElementIn('markers', action.payload.marker, stateConf);
    case types.WS_VIEW_REMOVE_MARKER:
      return removeElementIn('markers', action.payload.index, stateConf);
    case types.WS_VIEW_UPDATE_PROCEDURE:
      return __.set(`procedures[${action.payload.index}]`, action.payload.procedure, stateConf);
    case types.WS_VIEW_ADD_PROCEDURE:
      return addElementIn('procedures', action.payload.procedure, stateConf);
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

// This is specfic reducers by view type
// TODO garm factorize in viewManager
export const configurationByViewType = {
  DynamicView: (stateConf, action) => {
    switch (action.type) {
      case types.WS_VIEW_RELOAD:
      case types.WS_VIEW_OPEN:
      case types.WS_LOAD_DOCUMENTS:
      case types.WS_VIEW_ADD_BLANK: {
        const config = action.payload.configuration || action.payload.view.configuration;
        const nextConf = __.set('entryPoints', [{
          ...config.entryPoint,
          name: 'dynamicEP',
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
        const getAllConnectedAxisIds = eps => __.concat(
          __.pluck('connectedDataX.axisId', eps),
          __.pluck('connectedDataY.axisId', eps)
        );
        const refreshAxes = __.pick(getAllConnectedAxisIds(entryPoints));
        return __.update('axes', refreshAxes, stateConf);
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

// This is specfic reducers by structure type
// TODO garm factorize in viewManager
export const configurationByStructureType = {
  [globalConstants.DATASTRUCTURETYPE_RANGE]: (stateConf, action) => {
    switch (action.type) {
      case types.WS_VIEW_ADD_ENTRYPOINT: {
        const [axisX, axisY] = getAxes(stateConf, action);
        const addAxisXId = __.set('connectedDataX.axisId', axisX.id);
        const addAxisYId = __.set('connectedDataY.axisId', axisY.id);
        const addAxesIds = __.compose(addAxisXId, addAxisYId);

        const newEp = __.merge(getNewPlotEntryPoint(), action.payload.entryPoint);
        return {
          ...stateConf,
          entryPoints: [...stateConf.entryPoints, addAxesIds(newEp)],
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
        const newEp = __.merge(getNewTextEntryPoint(), action.payload.entryPoint);
        return __.update('entryPoints', __.concat(__, newEp), stateConf);
      }
      default:
        return stateConf;
    }
  },
};

// Expose a reducer creator that take a view type
// and return a single reducer that deal with configuration property depends on this viewType
export default (viewType) => {
  const structureType = viewType
    ? getStructureType(viewType)
    : ''; // TODO garm viewType or '', how '' could happens ??????
  return composeReducers(
    configurationByStructureType[structureType] || __.identity,
    configurationByViewType[viewType] || __.identity,
    commonConfiguration
  );
};
