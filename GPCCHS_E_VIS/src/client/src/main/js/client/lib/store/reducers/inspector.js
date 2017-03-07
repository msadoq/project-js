import * as types from '../types';

const initialState = {
  isLoading: false,
  dataId: null,
  staticData: {},
};

export default function inspector(state = initialState, action) {
  switch (action.type) {
    case types.HSC_UPDATE_INSPECTOR_IS_LOADING:
      return Object.assign(
        {},
        state,
        { isLoading: action.payload.isLoading }
      );
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
    default:
      return state;
  }
}
