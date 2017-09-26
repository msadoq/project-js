// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : First draft on catalog explorer
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : catalog explorer : open, close and browse items
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 24/08/2017 : Fixed few eslint errors / warnings no-console and spaced-comment.
// END-HISTORY
// ====================================================================

import _get from 'lodash/get';
import _omit from 'lodash/omit';
import _map from 'lodash/map';
import u from 'updeep';
import * as types from '../../types';


const initialState = {
  sessions: [],
  domains: [],
  catalogs: {},
  itemNames: {},
  openedItems: {},
  focusedItem: null,
  focusedInfo: {
    session: '',
    domain: '',
    catalog: '',
    version: '',
    namespace: '',
    name: '',
  },
};

const recursiveAssignNodeField = (node, field, value) => {
  if (!node) {
    return node;
  }
  return ({
    ...node,
    children: _map(node.children, child => recursiveAssignNodeField(child, field, value)),
    [field]: value,
  });
};

/* --- Reducer -------------------------------------------------------------- */

export default function rte(state = initialState, action) {
  switch (action.type) {
    // GENERAL
    case types.HSC_SET_RTE_SESSIONS:
      return Object.assign(
        {},
        state,
        {
          sessions: action.payload.sessions,
        }
      );
    case types.HSC_SET_RTE_DOMAINS: {
      return Object.assign(
        {},
        state,
        {
          domains: action.payload.domains,
          focusedInfo: {
            session: action.payload.session,
          },
          catalogs: [],
          itemNames: [],
        }
      );
    }
    case types.HSC_SET_RTE_CATALOGS: {
      const ret = Object.assign(
        {},
        state,
        {
          catalogs: action.payload.catalogs,
          focusedInfo: {
            session: action.payload.session,
            domain: action.payload.domain,
          },
          itemNames: [],
        }
      );
      return ret;
    }
    case types.HSC_SET_RTE_ITEM_NAMES:
      return Object.assign(
        {},
        state,
        {
          itemNames: action.payload.itemNames,
          focusedInfo: {
            session: state.focusedInfo.session,
            domain: state.focusedInfo.domain,
            catalog: action.payload.catalog,
            version: action.payload.version,
          },
        }
      );
    case types.HSC_OPEN_RTE_ITEM:
      return Object.assign(
        {},
        state,
        {
          openedItems: {
            ...state.openedItems,
            [action.payload.key]: {
              attributes: {
                session: action.payload.session,
                domain: action.payload.domain,
                catalog: action.payload.catalog,
                version: action.payload.version,
                namespace: action.payload.namespace,
                name: action.payload.name,
              },
              item: action.payload.item,
            },
          },
          focusedItem: action.payload.key,
          focusedInfo: {
            session: action.payload.session,
            domain: action.payload.domain,
            catalog: action.payload.catalog,
            version: action.payload.version,
            namespace: action.payload.namespace,
            name: action.payload.name,
          },
        }
      );
    case types.HSC_CLOSE_RTE_ITEM: {
      return Object.assign(
        {},
        state,
        {
          openedItems: _omit(state.openedItems, action.payload.key),
        }
      );
    }
    case types.HSC_SET_RTE_FOCUSED_ITEM:
      return Object.assign(
        {},
        state,
        {
          focusedItem: action.payload.key,
          focusedInfo: {
            session: action.payload.session,
            domain: action.payload.domain,
            catalog: action.payload.catalog,
            version: action.payload.version,
            namespace: action.payload.namespace,
            name: action.payload.name,
          },
        }
      );
    // OPENED ITEM
    /* case types.HSC_TOGGLE_ALL_INSPECTOR_STATIC_DATA_NODES:
       return Object.assign(
        {},
        state,
        { staticData: recursiveToggleNode(state.staticData, action.payload.toggled) }
      );

      break; */
    // OPENED ITEM NODE
    /* case types.HSC_UPDATE_INSPECTOR_STATIC_DATA_NODE:
       return u.updateIn(
        ['staticData', ...action.payload.path],
        { ...action.payload.data, loading: false },
        state
      );
      break; */
    /* case types.HSC_IS_INSPECTOR_STATIC_DATA_NODE_LOADING:
       return u.updateIn(
        ['staticData', ...action.payload.path],
        { loading: action.payload.loading, toggled: true },
        state
      );
      break; */
    case types.HSC_IS_RTE_CATALOG_NODE_TOGGLED:
      return u.updateIn(
        ['catalogs', ...action.payload.path],
        { toggled: action.payload.toggled },
        state
      );
    case types.HSC_IS_RTE_ITEM_NAME_NODE_TOGGLED:
      return u.updateIn(
        ['itemNames', ...action.payload.path],
        { toggled: action.payload.toggled },
        state
      );
    case types.HSC_IS_RTE_ITEM_NODE_TOGGLED:
      return u.updateIn(
        ['openedItems', action.payload.key, 'item', ...action.payload.path],
        { toggled: action.payload.toggled },
        state
      );
    case types.HSC_IS_RTE_CATALOG_NODE_ACTIVE:
      return u.updateIn(
        ['catalogs', ...action.payload.path],
        { active: action.payload.active },
        Object.assign(
          {},
          state,
          { catalogs: recursiveAssignNodeField(state.catalogs, 'active', false) }
        )
      );
    case types.HSC_IS_RTE_ITEM_NAME_NODE_ACTIVE:
      return u.updateIn(
        ['itemNames', ...action.payload.path],
        { active: action.payload.active },
        Object.assign(
          {},
          state,
          { itemNames: recursiveAssignNodeField(state.itemNames, 'active', false) }
        )
      );
    default:
      return state;
  }
}

/* --- Selectors -------------------------------------------------------------- */

// GENERAL
export const getRteSessions = state => _get(state, 'rte.sessions');
export const getRteDomains = state => _get(state, 'rte.domains');
export const getRteCatalogs = state => _get(state, 'rte.catalogs');
export const getRteItemNames = state => _get(state, 'rte.itemNames');

export const getRteOpenedItems = state => _get(state, 'rte.openedItems');
export const getRteOpenedItem = (state, uuid) => _get(state, ['rte', 'openedItems', uuid]);
export const getRteFocusedItem = state => _get(state, 'rte.focusedItem');
export const getRteFocusedInfo = state => _get(state, 'rte.focusedInfo');


// STATIC DATA
// export const getInspectorStaticData = state => state.inspector.staticData;
// export const getInspectorStaticDataLoading = state => (_get(state.inspector.staticData, 'loading') === true);
// export const getInspectorStaticDataChildren = state => _get(state.inspector.staticData, 'children');
// STATIC DATA NODE
// export const getInspectorStaticDataNode = (state, path) => (path.length ?
//   _get(state.inspector.staticData, path) :
//   state.inspector.staticData
// );
// export const getInspectorStaticDataNodeToggled = (state, path) => (_get(state.inspector.staticData, [...path, 'toggled']) === true);
