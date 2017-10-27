import * as types from '../../../store/types';

export default (stateConf = { content: '' }, action) => {
  switch (action.type) {
    case types.WS_VIEW_RELOAD:
    case types.WS_VIEW_OPENED:
    case types.WS_PAGE_OPENED:
    case types.WS_WORKSPACE_OPENED:
    case types.WS_VIEW_ADD_BLANK: {
      return action.payload.view.configuration;
    }

    default:
      return stateConf;
  }
};
