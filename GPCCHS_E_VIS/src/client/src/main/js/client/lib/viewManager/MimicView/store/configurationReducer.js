// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #6816 : 13/09/2017 : Its possible to change the size of the mimic in the view ezeditor
// END-HISTORY
// ====================================================================

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
    case types.WS_VIEW_UPDATE_DIMENSIONS:
      return _.set('dimensions', { width: action.payload.width, height: action.payload.height }, stateConf);
    default:
      return stateConf;
  }
};
