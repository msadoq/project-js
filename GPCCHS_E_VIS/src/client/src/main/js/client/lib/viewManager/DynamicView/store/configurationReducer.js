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
