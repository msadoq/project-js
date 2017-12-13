// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Write first configurationReducer (TextView) .
// VERSION : 1.1.2 : DM : #5828 : 13/04/2017 : EntryPoint addition now uses GenericModal. General refacto of default EntryPoints props, set in viewManager's setDefaultEntryPoint for text, plot and Dynamic.
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : open parameter in editor via context menu
// VERSION : 1.1.2 : DM : #6700 : 29/08/2017 : fix unnecessary datamap generation .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import * as types from 'store/types';

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
