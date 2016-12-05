import * as types from '../types';

export default function viewData(state = {}, action) {
  switch (action.type) {

    case types.DATA_REMOVE_ALL_VIEWDATA:
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.DATA_UPDATE_VIEWDATA:
      return action.payload.viewData;
    default:
      return state;
  }
}
