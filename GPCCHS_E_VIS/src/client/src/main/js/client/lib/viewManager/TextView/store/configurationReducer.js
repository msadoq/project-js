import _ from 'lodash/fp';
import * as types from '../../../store/types';

export default (stateConf = { content: '' }, action) => {
  switch (action.type) {
    case types.WS_VIEW_UPDATE_CONTENT:
      return _.set('content', action.payload.content, stateConf);
    case types.WS_VIEW_ADD_ENTRYPOINT: {
      return _.update('entryPoints', _.concat(_, action.payload.entryPoint), stateConf);
    }
    default:
      return stateConf;
  }
};
