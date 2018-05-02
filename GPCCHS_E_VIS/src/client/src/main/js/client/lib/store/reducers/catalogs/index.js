import _find from 'lodash/fp/find';
import _findIndex from 'lodash/findIndex';
import _getOr from 'lodash/fp/getOr';
import _set from 'lodash/fp/set';
import { createSelector } from 'reselect';
import {
  WS_CATALOGS_ASK,
  WS_CATALOGS_ADD,
  WS_CATALOG_ITEMS_ASK,
  WS_CATALOG_ITEMS_ADD,
  WS_COM_OBJECTS_ASK,
  WS_COM_OBJECTS_ADD,
  WS_UNIT_ADD,
  WS_UNIT_ADD_SIMPLE,
} from 'store/types';

// eslint-disable-next-line complexity
export default function catalogsReducer(state = {}, action) {
  switch (action.type) {
    case WS_CATALOGS_ASK: {
      return _set(
        getTupleId(action.payload.domainId, action.payload.sessionId),
        'requesting',
        state
      );
    }
    case WS_CATALOGS_ADD: {
      return _set(
        action.payload.tupleId,
        action.payload.catalogs,
        state
      );
    }
    case WS_CATALOG_ITEMS_ASK: {
      const tupleId = getTupleId(action.payload.domainId, action.payload.sessionId);
      if (!Array.isArray(state[tupleId])) {
        return state;
      }

      const index = getCatalogIndexByName(state, {
        tupleId,
        name: action.payload.name,
      });
      if (index === -1) {
        return state;
      }

      return _set(
        `[${tupleId}][${index}].items`,
        'requesting',
        state
      );
    }
    case WS_CATALOG_ITEMS_ADD: {
      if (!Array.isArray(state[action.payload.tupleId])) {
        return state;
      }

      const index = getCatalogIndexByName(state, {
        tupleId: action.payload.tupleId,
        name: action.payload.name,
      });
      if (index === -1) {
        return state;
      }

      return _set(
        `[${action.payload.tupleId}][${index}].items`,
        action.payload.items,
        state
      );
    }
    case WS_COM_OBJECTS_ASK: {
      const tupleId = getTupleId(action.payload.domainId, action.payload.sessionId);
      if (!Array.isArray(state[tupleId])) {
        return state;
      }

      const index = getCatalogIndexByName(state, {
        tupleId,
        name: action.payload.name,
      });
      if (index === -1) {
        return state;
      }

      const indexItem = getCatalogItemIndexByName(
        state,
        {
          tupleId,
          name: action.payload.name,
          itemName: action.payload.itemName,
        }
      );

      if (indexItem === -1) {
        return state;
      }

      const path = `[${tupleId}][${index}].items[${indexItem}].comObjects`;
      return _set(
        path,
        'requesting',
        state
      );
    }
    case WS_COM_OBJECTS_ADD: {
      if (!Array.isArray(state[action.payload.tupleId])) {
        return state;
      }

      const index = getCatalogIndexByName(state, {
        tupleId: action.payload.tupleId,
        name: action.payload.name,
      });
      if (index === -1) {
        return state;
      }

      const indexItem = getCatalogItemIndexByName(
        state,
        {
          tupleId: action.payload.tupleId,
          name: action.payload.name,
          itemName: action.payload.itemName,
        }
      );

      if (indexItem === -1) {
        return state;
      }

      const path = `[${action.payload.tupleId}][${index}].items[${indexItem}].comObjects`;
      return _set(
        path,
        action.payload.comObjects,
        state
      );
    }
    case WS_UNIT_ADD: {
      if (!Array.isArray(state[action.payload.tupleId])) {
        return state;
      }

      const index = getCatalogIndexByName(state, {
        tupleId: action.payload.tupleId,
        name: action.payload.name,
      });
      if (index === -1) {
        return state;
      }

      const indexItem = getCatalogItemIndexByName(
        state,
        {
          tupleId: action.payload.tupleId,
          name: action.payload.name,
          itemName: action.payload.itemName,
        }
      );

      if (indexItem === -1) {
        return state;
      }
      const path = `[${action.payload.tupleId}][${index}].items[${indexItem}].unit`;
      return _set(
        path,
        action.payload.unit,
        state
      );
    }
    case WS_UNIT_ADD_SIMPLE: {
      const { tupleId, name, itemName, unit } = action.payload;
      const path = `units[${tupleId}][${name}][${itemName}]`;
      return _set(
        path,
        unit,
        state
      );
    }
    default:
      return state;
  }
}

/* --- Selectors ------------------------------------------------------------ */

/**
 * @param state
 * @param domainId
 * @param sessionId
 * @returns {null}
 */
export const getCatalogsByDomainIdAndSessionId = (state, { domainId, sessionId }) =>
  _getOr(null, getTupleId(domainId, sessionId), state.catalogs);

/* --- Reducer -------------------------------------------------------------- */

/**
 * @param domainId
 * @param sessionId
 * @returns {string}
 */
export const getTupleId = (domainId, sessionId) => `${domainId}-${sessionId}`;

export const getPathToCatalogs = (state, tupleId) => _getOr(null, tupleId, state);
export const getPathToCatalogItems = catalog => _getOr(undefined, 'items', catalog);
export const getPathToCatalogItemComObjects = catalogItem => _getOr(undefined, 'comObjects', catalogItem);
export const getPathToCatalogItemUnit = catalogItem => _getOr(undefined, 'unit', catalogItem);

/**
 * @param state
 * @param tupleId
 * @returns {null}
 */
export const getCatalogsByTupleId = (state, { tupleId }) => getPathToCatalogs(state, tupleId);

/**
 * @param state
 * @param tupleId
 * @param name
 */
export const getCatalogByName = (state, { tupleId, name }) => (
  _find(c => (
    c.name === name
  ), getPathToCatalogs(state, tupleId))
);

export const getCatalogIndexByName = createSelector(
  getCatalogsByTupleId,
  (state, { name }) => name,
  (catalogs, name) => _findIndex(catalogs, c => c.name === name)
);

/**
 * @param state
 * @param tupleId
 * @param name
 * @param itemName
 */
export const getCatalogItemIndexByName = createSelector(
  (state, { itemName }) => itemName,
  getCatalogByName,
  (itemName, catalog) => _findIndex(getPathToCatalogItems(catalog), c => c.name === itemName)
);

/**
 * @param state
 * @param tupleId
 * @param name
 * @param itemName
 */
export const getCatalogItemByName = createSelector(
  (state, { itemName }) => itemName,
  getCatalogByName,
  (itemName, catalog) => _find(i => i.name === itemName, getPathToCatalogItems(catalog))
);

/**
 * @param state
 * @param tupleId
 * @param name
 */
export const getCatalogItems = createSelector(
  getCatalogByName,
  catalog => getPathToCatalogItems(catalog)
);

/**
 * @param state
 * @param tupleId
 * @param name
 * @param itemName
 */
export const getCatalogItemComObjects = createSelector(
  getCatalogItemByName,
  item => getPathToCatalogItemComObjects(item)
);

/**
 * @param state
 * @param tupleId
 * @param name
 * @param itemName
 */
export const getUnitByItemName = createSelector(
  getCatalogItemByName,
  item => getPathToCatalogItemUnit(item)
);
