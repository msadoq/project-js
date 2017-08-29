import _ from 'lodash/fp';
import * as types from '../../../store/types';

export default (stateConf = { content: '', search: '' }, action) => {
  switch (action.type) {
    case types.WS_VIEW_UPDATE_CONTENT:
      return _.set('content', action.payload.content, stateConf);
    case types.WS_VIEW_ADD_ENTRYPOINT: {
      return _.update('entryPoints', _.concat(_, action.payload.entryPoint), stateConf);
    }
    case types.WS_VIEW_UPDATE_EDITOR_SEARCH:
      if (action.payload.search !== stateConf.search) {
        return _.set('search', action.payload.search, stateConf);
      }
      return stateConf;
    default:
      return stateConf;
  }
};
