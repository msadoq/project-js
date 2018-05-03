import { getTupleId, getUnitByItemName, REQUESTING } from 'store/reducers/catalogs';

import {
  WS_CATALOG_ITEMS_ASK,
  WS_CATALOGS_ASK,
  WS_COM_OBJECTS_ASK,
  WS_UNIT_ASK,
} from 'store/types';
import {
  addCatalogItems,
  addCatalogs,
  addComObjects,
  addUnit,
  addUnitSimple,
} from 'store/actions/catalogs';

// import getLogger from 'common/logManager';

import { dc } from '../../../serverProcess/ipc';

// const logger = getLogger('middleware:catalogs');

const asyncCatalogFetcher = (sessionId, domainId, cb) =>
  dc.retrieveSDBCatalogs({ sessionId, domainId }, cb);

const asyncCatalogItemFetcher = (sessionId, domainId, catalogName, cb) =>
  dc.retrieveSDBCatalogsItems({ sessionId, domainId, catalogName }, cb);

const asyncComObjectsFetcher = (sessionId, domainId, catalogName, catalogItemName, cb) =>
  dc.retrieveSDBCatalogsItemComObject({ sessionId, domainId, catalogName, catalogItemName }, cb);

const asyncUnitFetcher = (sessionId, domainId, catalogName, catalogItemName, cb) =>
  dc.retrieveSDBCatalogItemFieldUnit(
    {
      sessionId,
      domainId,
      catalogName,
      catalogItemName,
    }, cb);

const getCatalogItems = (state, { sessionId, domainId, name }) => {
  const tupleId = getTupleId(domainId, sessionId);
  const found =
    state.catalogs &&
    Array.isArray(state.catalogs[tupleId]) &&
    state.catalogs[tupleId].filter(catalogObj =>
      catalogObj.name === name &&
      catalogObj.items !== REQUESTING
    );

  if (found.length > 0) {
    return found[0];
  }

  return null;
};

/**
 * @param state
 * @param sessionId
 * @param domainId
 * @returns {state.catalogs|{'domain-id-session-id'}|boolean}
 */
export const isCatalogLoaded = (state, { sessionId, domainId }) =>
  state.catalogs &&
  Object.keys(state.catalogs).includes(getTupleId(domainId, sessionId)) &&
  state.catalogs[getTupleId(domainId, sessionId)] !== REQUESTING
;

/**
 * @param state
 * @param sessionId
 * @param domainId
 * @param name
 * @returns {state.catalogs|{'domain-id-session-id'}|boolean|boolean}
 */
export const areCatalogItemsLoaded = (state, { sessionId, domainId, name }) =>
  isCatalogLoaded(state, { sessionId, domainId }) &&
  getCatalogItems(state, { sessionId, domainId, name }) !== null;

const catalogMiddleware = ({ dispatch, getState }) => next => (action) => {
  const nextAction = next(action);

  const state = getState();

  if (action.type === WS_CATALOGS_ASK) {
    const { sessionId, domainId } = action.payload;

    if (isCatalogLoaded(state, { sessionId, domainId })) {
      return nextAction;
    }

    asyncCatalogFetcher(
      sessionId,
      domainId,
      (catalogs) => {
        dispatch(
          addCatalogs(
            getTupleId(domainId, sessionId),
            catalogs
          )
        );
      }
    );
  }
  if (action.type === WS_CATALOG_ITEMS_ASK) {
    const { sessionId, domainId, name } = action.payload;

    console.log('catalogMiddleware :: WS_CATALOG_ITEMS_ASK');
    if (areCatalogItemsLoaded(state, { sessionId, domainId, name })) {
      console.log('catalogMiddleware :: areCatalogItemsLoaded');
      return nextAction;
    }

    console.log('catalogMiddleware :: asyncCatalogItemFetcher');
    asyncCatalogItemFetcher(
      sessionId,
      domainId,
      name,
      items => dispatch(
        addCatalogItems(
          getTupleId(domainId, sessionId),
          name,
          items
        )
      )
    );
  }
  if (action.type === WS_COM_OBJECTS_ASK) {
    const { sessionId, domainId, name, itemName } = action.payload;

    asyncComObjectsFetcher(
      sessionId,
      domainId,
      name,
      itemName,
      comObjects => dispatch(
        addComObjects(
          getTupleId(domainId, sessionId),
          name,
          itemName,
          comObjects
        )
      )
    );
  }

  if (action.type === WS_UNIT_ASK) {
    const { sessionId, domainId, name, itemName } = action.payload;

    const tupleId = getTupleId(domainId, sessionId);

    const existingUnit = getUnitByItemName(
      state.catalogs,
      {
        tupleId,
        name,
        itemName,
      }
    );

    if (existingUnit) {
      return nextAction;
    }

    asyncUnitFetcher(
      sessionId,
      domainId,
      name,
      itemName,
      (unit) => {
        dispatch(
          addUnit(
            getTupleId(domainId, sessionId),
            name,
            itemName,
            unit
          )
        );
        dispatch(
          addUnitSimple(
            getTupleId(domainId, sessionId),
            name,
            itemName,
            unit
          )
        );
      }
    );
  }

  return nextAction;
};

export default catalogMiddleware;
