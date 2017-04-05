import _ from 'lodash/fp';

import composeReducers from '../../composeReducers';

import * as types from '../../types';

import plotViewReducer from '../../../viewManager/PlotView/store/configurationReducer';
import textViewReducer from '../../../viewManager/TextView/store/configurationReducer';
import dynamicViewReducer from '../../../viewManager/DynamicView/store/configurationReducer';

const removeElementIn = (key, index, state) => _.update(key, _.pullAt(index), state);

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
  TextView: textViewReducer,
  DynamicView: dynamicViewReducer,
  PlotView: plotViewReducer,
};


// Expose a reducer creator that take a view type
// and return a single reducer that deal with configuration property depends on this viewType
export default viewType => (
  composeReducers(
    configurationByViewType[viewType] || _.identity,
    commonConfiguration
  )
);
