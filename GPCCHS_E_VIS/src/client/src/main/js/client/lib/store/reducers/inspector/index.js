import _get from 'lodash/get';
import _map from 'lodash/map';
import u from 'updeep';
import * as types from 'store/types';


const initialState = {
  generalData: {
    viewId: null,
    viewType: null,
    epId: null,
    epName: null,
    dataId: null,
    field: null,
    displayingTM: false,
  },
  staticData: null,
};

const recursiveToggleNode = (node, toggled) => {
  if (!node) {
    return node;
  }
  return ({
    ...node,
    children: _map(node.children, child => recursiveToggleNode(child, toggled)),
    toggled,
  });
};

/* --- Reducer -------------------------------------------------------------- */

export default function inspector(state = initialState, action) {
  switch (action.type) {
    // GENERAL
    case types.HSC_IS_INSPECTOR_DISPLAYING_A_TM:
      return Object.assign(
        {},
        state,
        {
          generalData: {
            ...state.generalData,
            displayingTM: action.payload.displayingTM,
          },
        }
      );
    case types.HSC_SET_INSPECTOR_GENERAL_DATA:
      return Object.assign(
        {},
        state,
        {
          generalData: {
            viewId: action.payload.viewId,
            viewType: action.payload.viewType,
            epId: action.payload.epId,
            epName: action.payload.epName,
            dataId: action.payload.dataId,
            field: action.payload.field,
            displayingTM: false,
          },
        }
      );
    case types.HSC_DELETE_INSPECTOR_GENERAL_DATA:
      return initialState;
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
    case types.HSC_TOGGLE_ALL_INSPECTOR_STATIC_DATA_NODES:
      return Object.assign(
        {},
        state,
        { staticData: recursiveToggleNode(state.staticData, action.payload.toggled) }
      );
    // STATIC DATA NODE
    case types.HSC_UPDATE_INSPECTOR_STATIC_DATA_NODE:
      return u.updateIn(
        ['staticData', ...action.payload.path],
        { ...action.payload.data, loading: false },
        state
      );
    case types.HSC_IS_INSPECTOR_STATIC_DATA_NODE_LOADING:
      return u.updateIn(
        ['staticData', ...action.payload.path],
        { loading: action.payload.loading, toggled: true },
        state
      );
    case types.HSC_IS_INSPECTOR_STATIC_DATA_NODE_TOGGLED:
      return u.updateIn(
        ['staticData', ...action.payload.path],
        { toggled: action.payload.toggled },
        state
      );
    default:
      return state;
  }
}

/* --- Selectors -------------------------------------------------------------- */

// GENERAL
export const getInspectorGeneralData = state => state.inspector.generalData;
export const getInspectorViewId = state => state.inspector.generalData.viewId;
export const getInspectorViewType = state => state.inspector.generalData.viewType;
export const getInspectorEpId = state => state.inspector.generalData.epId;
export const getInspectorDataId = state => state.inspector.generalData.dataId;
export const getInspectorEpName = state => state.inspector.generalData.epName;
export const getInspectorField = state => state.inspector.generalData.field;
export const getInspectorDisplayingTM = state => state.inspector.generalData.displayingTM;
// STATIC DATA
export const getInspectorStaticData = state => state.inspector.staticData;
export const getInspectorStaticDataLoading = state => (_get(state.inspector.staticData, 'loading') === true);
export const getInspectorStaticDataChildren = state => _get(state.inspector.staticData, 'children');
// STATIC DATA NODE
export const getInspectorStaticDataNode = (state, path) => (path.length ?
  _get(state.inspector.staticData, path) :
  state.inspector.staticData
);
export const getInspectorStaticDataNodeToggled = (state, path) => (_get(state.inspector.staticData, [...path, 'toggled']) === true);
