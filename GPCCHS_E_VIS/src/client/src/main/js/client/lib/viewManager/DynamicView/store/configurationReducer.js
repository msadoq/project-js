// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Add PlotView and DynamicView configurationReducer in viewManager
// VERSION : 1.1.2 : DM : #5828 : 13/04/2017 : By default, dynamicView has no filter, and DV.configuration.entryPoints is a, array of objects.
// VERSION : 1.1.2 : DM : #5828 : 13/04/2017 : EntryPoint addition now uses GenericModal. General refacto of default EntryPoints props, set in viewManager's setDefaultEntryPoint for text, plot and Dynamic.
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Rename documentManager actions . .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';

import * as types from '../../../store/types';

export default (stateConf = { content: '' }, action) => {
  switch (action.type) {
    case types.WS_VIEW_RELOAD:
    case types.WS_VIEW_OPENED:
    case types.WS_PAGE_OPENED:
    case types.WS_WORKSPACE_OPENED:
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
};
