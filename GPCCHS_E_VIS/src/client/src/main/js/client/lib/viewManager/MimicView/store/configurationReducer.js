import _ from 'lodash/fp';

import { getNewTextEntryPoint } from '../../../common/entryPoint';
import * as types from '../../../store/types';

export default (stateConf = { content: '' }, action) => {
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
};
