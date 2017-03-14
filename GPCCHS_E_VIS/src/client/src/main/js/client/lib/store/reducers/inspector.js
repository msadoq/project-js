import _set from 'lodash/set';
import * as types from '../types';

const initialState = {
  dataId: null,
  staticData: {},
};

export default function inspector(state = initialState, action) {
  switch (action.type) {
    case types.HSC_IS_INSPECTOR_STATIC_DATA_LOADING:
      return {
        ...state,
        staticData: Object.assign({}, state.staticData, { loading: action.payload.loading }),
      };
    case types.HSC_UPDATE_INSPECTOR_DATA_ID:
      return Object.assign(
        {},
        state,
        { dataId: action.payload.dataId }
      );
    case types.HSC_UPDATE_INSPECTOR_STATIC_DATA:
      return Object.assign(
        {},
        state,
        { staticData: action.payload.staticData }
      );
    case types.HSC_IS_INSPECTOR_STATIC_DATA_NODE_TOGGLED: {
      const staticData = Object.assign({}, state.staticData);
      _set(staticData, [...action.payload.path, 'toggled'], action.payload.toggled);
      return {
        ...state,
        staticData,
      };
    }
    default:
      return state;
  }
}
