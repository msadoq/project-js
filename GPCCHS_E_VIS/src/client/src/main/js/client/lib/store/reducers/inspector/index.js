// import _set from 'lodash/set';
import _get from 'lodash/get';
import u from 'updeep';
import * as types from '../../types';

const initialState = {
  dataId: null,
  sessionId: null,
  domainId: null,
  staticData: {},
};

export default function inspector(state = initialState, action) {
  switch (action.type) {
    case types.HSC_UPDATE_INSPECTOR_SESSION_ID:
      return Object.assign(
        {},
        state,
        { sessionId: action.payload.sessionId }
      );
    case types.HSC_UPDATE_INSPECTOR_DOMAIN_ID:
      return Object.assign(
        {},
        state,
        { domainId: action.payload.domainId }
      );
    case types.HSC_UPDATE_INSPECTOR_DATA_ID:
      return Object.assign(
        {},
        state,
        { dataId: action.payload.dataId }
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
    case types.HSC_UPDATE_INSPECTOR_STATIC_DATA:
      return Object.assign(
        {},
        state,
        { staticData: action.payload.data }
      );
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
