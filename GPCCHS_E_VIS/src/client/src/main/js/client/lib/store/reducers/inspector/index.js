// import _set from 'lodash/set';
import _get from 'lodash/get';
import u from 'updeep';
import * as types from '../../types';

const initialState = {
  displayingTM: false,
  dataId: null,
  remoteId: null,
  sessionId: null,
  domainId: null,
  staticData: {},
};

export default function inspector(state = initialState, action) {
  switch (action.type) {
    // GENERAL
    case types.HSC_IS_INSPECTOR_DISPLAYING_A_TM:
      return Object.assign(
        {},
        state,
        { displayingTM: action.payload.displayingTM }
      );
    case types.HSC_UPDATE_INSPECTOR_REMOTE_ID:
      return Object.assign(
        {},
        state,
        { remoteId: action.payload.remoteId }
      );
    case types.HSC_UPDATE_INSPECTOR_DATA_ID:
      return Object.assign(
        {},
        state,
        { dataId: action.payload.dataId }
      );
    // STATIC DATA
    case types.HSC_SET_INSPECTOR_STATIC_DATA:
      return Object.assign(
        {},
        state,
        { staticData: action.payload.data }
      );
    case types.HSC_IS_INSPECTOR_STATIC_DATA_LOADING:
      return Object.assign(
        {},
        state,
        { staticData: { ...state.staticData, loading: action.payload.loading } }
      );
    // STATIC DATA NODE
    case types.HSC_UPDATE_INSPECTOR_STATIC_DATA_NODE:
      return Object.assign(
        {},
        state,
        {
          staticData: u.updateIn(
            action.payload.path,
            { ..._get(state.staticData, action.payload.path), ...action.payload.data },
            state.staticData),
        }
      );
    case types.HSC_IS_INSPECTOR_STATIC_DATA_NODE_LOADING:
      return Object.assign(
        {},
        state,
        {
          staticData: u.updateIn(
          action.payload.path,
          { ..._get(state.staticData, action.payload.path), loading: action.payload.loading },
          state.staticData),
        }
      );
    case types.HSC_IS_INSPECTOR_STATIC_DATA_NODE_TOGGLED:
      return Object.assign(
        {},
        state,
        {
          staticData: u.updateIn(
          action.payload.path,
          { ..._get(state.staticData, action.payload.path), toggled: action.payload.toggled },
          state.staticData),
        }
      );
    default:
      return state;
  }
}
