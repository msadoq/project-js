import _ from 'lodash/fp';

import * as types from '../../store/types';

const removeElementIn = (key, index, state) => _.update(key, _.pullAt(index), state);

export default (stateConf, action) => {
  switch (action.type) {
    // loading view configuration
    case types.WS_VIEW_TOUCH:
      return { ...stateConf };
    case types.WS_VIEW_OPENED:
    case types.WS_PAGE_OPENED:
    case types.WS_WORKSPACE_OPENED:
    case types.WS_VIEW_ADD_BLANK:
    case types.WS_VIEW_RELOAD:
      return _.defaults(stateConf, action.payload.view.configuration);

    // entryPoints
    case types.WS_VIEW_UPDATE_ENTRYPOINT: {
      const index = _.findIndex({ id: action.payload.entryPointId }, stateConf.entryPoints);
      return _.set(`entryPoints[${index}]`, action.payload.entryPoint, stateConf);
    }
    case types.WS_VIEW_REMOVE_ENTRYPOINT: {
      const index = _.findIndex({ id: action.payload.entryPointId }, stateConf.entryPoints);
      return removeElementIn('entryPoints', index, stateConf);
    }
    default:
      return stateConf;
  }
};
