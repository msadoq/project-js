/* eslint-disable no-continue */

import _ from 'lodash/fp';
import _find from 'lodash/fp/find';
import _getOr from 'lodash/fp/getOr';
import _flow from 'lodash/fp/flow';

import {
  WS_CATALOGS_ASK,
  WS_CATALOGS_ADD,
  WS_CATALOG_ITEMS_ASK,
  WS_CATALOG_ITEMS_ADD,
  WS_COM_OBJECTS_ASK,
  WS_COM_OBJECTS_ADD,
  WS_ITEM_STRUCTURE_ASK,
  WS_ITEM_STRUCTURE_ADD,
  WS_ITEM_METADATA_ASK,
  WS_ITEM_METADATA_ADD,
  WS_REPORTING_ITEM_PACKETS_ASK,
  WS_REPORTING_ITEM_PACKETS_ADD,
} from 'store/types';

export const STATUS_LOADING = 'loading';
export const STATUS_LOADED = 'loaded';

const _setCatalogItemFieldStateToIsLoading =
  (state, { tupleId, name, itemName, fieldName }) => {
    if (
      _getCatalogItemFieldStatus(
        state, { tupleId, name, itemName, fieldName }
      ) === STATUS_LOADED
    ) {
      return state;
    }

    return _.set(
      ['_status', tupleId, name, 'items', itemName, fieldName, '_status'],
      STATUS_LOADING,
      state
    );
  };

const setCatalogItemFieldStateToIsLoaded =
  (state, { tupleId, name, itemName, fieldName }) => _.set(
    ['_status', tupleId, name, 'items', itemName, fieldName, '_status'],
    STATUS_LOADED,
    state
  );

const addCatalogs = (state, { tupleId, catalogs, all }) => {
  let updatedState = state;

  const existingCatalogs = _.getOr(
    {},
    tupleId,
    state
  );

  const newCatalogs = catalogs.reduce((acc, catalog) => ({
    ...acc,
    [catalog.name]: {},
  }), {});

  const updatedCatalogs = {
    ...newCatalogs,
    ...existingCatalogs,
  };

  updatedState = _.set(
    tupleId,
    updatedCatalogs,
    updatedState
  );

  if (all) {
    updatedState = _.set(
      ['_status', tupleId, '_status'],
      STATUS_LOADED,
      updatedState
    );
  }

  return updatedState;
};

const addCatalogItems = (state, { tupleId, name, items, all }) => {
  let updatedState = state;

  const existingItems = _.getOr(
    {},
    [tupleId, name],
    state
  );

  const newItems = items.reduce((acc, item) => ({
    ...acc,
    [item.name]: {},
  }), {});

  let updatedItems = {
    ...newItems,
    ...existingItems,
  };

  let updatedItemsSortedKeys = Object.keys(updatedItems);

  if (all) {
    updatedItemsSortedKeys = _.intersection(
      Object.keys(newItems),
      updatedItemsSortedKeys
    );
  }

  updatedItemsSortedKeys = updatedItemsSortedKeys.sort();

  updatedItems = updatedItemsSortedKeys.reduce(
    (acc, cur) => ({ ...acc, [cur]: updatedItems[cur] }),
    {}
  );

  updatedState = _.set(
    [tupleId, name],
    updatedItems,
    updatedState
  );

  if (all) {
    updatedState = _.set(
      ['_status', tupleId, name, '_status'],
      STATUS_LOADED,
      updatedState
    );
  }

  return updatedState;
};

const addCatalogItemField = (state, { tupleId, name, itemName, fieldName, content }) => {
  let updatedState = state;

  updatedState = _.set(
    [tupleId, name, itemName, fieldName],
    content,
    updatedState
  );

  updatedState =
    setCatalogItemFieldStateToIsLoaded(
      updatedState,
      { tupleId, name, itemName, fieldName }
    );

  return updatedState;
};

// eslint-disable-next-line complexity
export default function catalogsReducer(state = {}, action) {
  switch (action.type) {
    case WS_CATALOGS_ASK: {
      const { domainId, sessionId } = action.payload;

      const currentLoadingStatus = _.get(
        ['_status', getTupleId(domainId, sessionId), '_status'],
        state
      );

      if (
        typeof domainId !== 'number' ||
        typeof sessionId !== 'number' ||
        currentLoadingStatus === STATUS_LOADED
      ) {
        return state;
      }

      return _.set(
        ['_status', getTupleId(domainId, sessionId), '_status'],
        STATUS_LOADING,
        state
      );
    }
    case WS_CATALOGS_ADD: {
      const { tupleId, catalogs } = action.payload;
      return addCatalogs(state, { tupleId, catalogs, all: true });
    }
    case WS_CATALOG_ITEMS_ASK: {
      const { domainId, sessionId, name } = action.payload;

      if (
        typeof domainId !== 'number' ||
        typeof sessionId !== 'number' ||
        typeof name !== 'string'
      ) {
        return state;
      }

      const tupleId = getTupleId(domainId, sessionId);

      return _.set(
        ['_status', tupleId, name, '_status'],
        STATUS_LOADING,
        state
      );
    }
    case WS_CATALOG_ITEMS_ADD: {
      const { tupleId, name, items } = action.payload;

      return addCatalogItems(state, { tupleId, name, items, all: true });
    }
    case WS_ITEM_METADATA_ASK: {
      const { domainId, sessionId, name, itemName } = action.payload;

      if (
        typeof domainId !== 'number' ||
        typeof sessionId !== 'number' ||
        typeof name !== 'string' ||
        typeof itemName !== 'string'
      ) {
        return state;
      }

      const tupleId = getTupleId(domainId, sessionId);

      return _setCatalogItemFieldStateToIsLoading(
        state,
        { tupleId, name, itemName, fieldName: 'metadata' }
      );
    }
    case WS_ITEM_METADATA_ADD: {
      const { tupleId, name, itemName, metadata } = action.payload;

      return addCatalogItemField(
        state,
        {
          tupleId,
          name,
          itemName,
          fieldName: 'metadata',
          content: metadata,
        }
      );
    }
    case WS_COM_OBJECTS_ASK: {
      const { domainId, sessionId, name, itemName } = action.payload;

      if (
        typeof domainId !== 'number' ||
        typeof sessionId !== 'number' ||
        typeof name !== 'string' ||
        typeof itemName !== 'string'
      ) {
        return state;
      }

      const tupleId = getTupleId(domainId, sessionId);

      return _setCatalogItemFieldStateToIsLoading(
        state,
        { tupleId, name, itemName, fieldName: 'comObjects' }
      );
    }
    case WS_COM_OBJECTS_ADD: {
      const { tupleId, name, itemName, comObjects } = action.payload;

      return addCatalogItemField(
        state,
        {
          tupleId,
          name,
          itemName,
          fieldName: 'comObjects',
          content: comObjects,
        }
      );
    }
    case WS_ITEM_STRUCTURE_ASK: {
      const { domainId, sessionId, name, itemName } = action.payload;

      if (
        typeof domainId !== 'number' ||
        typeof sessionId !== 'number' ||
        typeof name !== 'string' ||
        typeof itemName !== 'string'
      ) {
        return state;
      }

      const tupleId = getTupleId(domainId, sessionId);

      return _setCatalogItemFieldStateToIsLoading(
        state,
        { tupleId, name, itemName, fieldName: 'structure' }
      );
    }
    case WS_ITEM_STRUCTURE_ADD: {
      const { tupleId, name, itemName, structure } = action.payload;

      return addCatalogItemField(
        state,
        {
          tupleId,
          name,
          itemName,
          fieldName: 'structure',
          content: structure,
        }
      );
    }
    case WS_REPORTING_ITEM_PACKETS_ASK: {
      const { domainId, sessionId, name, itemName } = action.payload;

      if (
        typeof domainId !== 'number' ||
        typeof sessionId !== 'number' ||
        typeof name !== 'string' ||
        typeof itemName !== 'string'
      ) {
        return state;
      }

      const tupleId = getTupleId(domainId, sessionId);

      return _setCatalogItemFieldStateToIsLoading(
        state,
        { tupleId, name, itemName, fieldName: 'reportingItemPackets' }
      );
    }
    case WS_REPORTING_ITEM_PACKETS_ADD: {
      const { tupleId, name, itemName, reportingItemPackets } = action.payload;

      return addCatalogItemField(
        state,
        {
          tupleId,
          name,
          itemName,
          fieldName: 'reportingItemPackets',
          content: reportingItemPackets,
        }
      );
    }
    default:
      return state;
  }
}

export const getCatalogs = state => state.catalogs;

/* --- Reducer -------------------------------------------------------------- */

/**
 * @param domainId
 * @param sessionId
 * @returns {string}
 */
export const getTupleId = (domainId, sessionId) => `${domainId}-${sessionId}`;

export const getCatalogsByTupleId =
  (state, { tupleId }) =>
    _.get(
      tupleId,
      getCatalogs(state)
    );

export const getCatalogsByDomainIdAndSessionId =
  (state, { domainId, sessionId }) =>
    _.getOr(
      {},
      getTupleId(domainId, sessionId),
      getCatalogs(state)
    );

export const getCatalogsByDomainIdAndSessionIdArray =
  (state, props) => {
    const catalogs = getCatalogsByDomainIdAndSessionId(state, props);

    return Object.keys(catalogs)
      .filter(catalogKey => catalogKey.length > 0 && catalogKey !== 'null')
      .map(
        catalog => ({
          name: catalog,
        })
      );
  };

export const getCatalogByName = (state, { tupleId, name }) =>
  _.getOr({}, [tupleId, name], getCatalogs(state));

export const getCatalogItemByName = (state, { tupleId, name, itemName }) => {
  const catalog = getCatalogByName(state, { tupleId, name });
  return _.getOr({}, itemName, catalog);
};

const getCatalogItems =
  (state, { tupleId, name }) => getCatalogByName(state, { tupleId, name });

export const getCatalogItemsArray = (state, { tupleId, name }) => {
  const items =
    Object
      .keys(getCatalogItems(state, { tupleId, name }))
      .filter(item => item.length > 0 && item !== 'null');

  return items.map(
    item => ({
      name: item,
    })
  );
};

const createCatalogItemFieldGetter =
  field =>
    (state, { tupleId, name, itemName }) =>
      _.get(field, getCatalogItemByName(state, { tupleId, name, itemName }));

export const getCatalogItemComObjects = createCatalogItemFieldGetter('comObjects');

export const getComObjectStructure = createCatalogItemFieldGetter('structure');

export const getItemMetadata = createCatalogItemFieldGetter('metadata');

export const getReportingItemPackets = createCatalogItemFieldGetter('reportingItemPackets');

export const getAlgorithmMetadata = (state, props) => {
  const metadata = getItemMetadata(state, props);

  return ({
    inputParameters: _getOr([], ['algorithm', 'inputParameters'], metadata),
    algorithm: _flow(
      _getOr([], ['algorithm', 'algorithms']),
      _find(a => a.language.toLocaleLowerCase() === 'python'),
      _getOr(undefined, 'text')
    )(metadata),
  });
};

export const getUnitMetadata =
  (state, props) => {
    const metadata = getItemMetadata(state, props);

    return _.get('unit', metadata);
  };

const _getCatalogsStatus = (state, { domainId, sessionId }) =>
  _.get(['catalogs', '_status', getTupleId(domainId, sessionId), '_status'], state);


export const areCatalogsLoading =
  (state, props) =>
    _getCatalogsStatus(state, props) === STATUS_LOADING;

export const areCatalogsLoaded =
  (state, props) =>
    _getCatalogsStatus(state, props) === STATUS_LOADED;

const _getCatalogItemsStatus =
  (state, { domainId, sessionId, name }) =>
    _.get(['catalogs', '_status', getTupleId(domainId, sessionId), name, '_status'], state);

export const areCatalogItemsLoading =
  (state, props) =>
    _getCatalogItemsStatus(state, props) === STATUS_LOADING;

export const areCatalogItemsLoaded =
  (state, props) => _getCatalogItemsStatus(state, props) === STATUS_LOADED;

const _getCatalogItemFieldStatus =
  (state, { tupleId, name, itemName, fieldName }) =>
    _.get(
      ['catalogs', '_status', tupleId, name, 'items', itemName, fieldName, '_status'],
      state
    );


const _getComObjectsStatus = (state, { tupleId, name, itemName }) =>
  _getCatalogItemFieldStatus(state, {
    tupleId,
    name,
    itemName,
    fieldName: 'comObjects',
  });

export const areComObjectsLoading = (state, props) =>
  _getComObjectsStatus(state, props) === STATUS_LOADING;

export const areComObjectsLoaded = (state, props) =>
  _getComObjectsStatus(state, props) === STATUS_LOADED;

const _getItemStructureStatus = (state, { tupleId, name, itemName }) =>
  _getCatalogItemFieldStatus(state, {
    tupleId,
    name,
    itemName,
    fieldName: 'structure',
  });

export const isItemStructureLoading = (state, props) =>
  _getItemStructureStatus(state, props) === STATUS_LOADING;

export const isItemStructureLoaded = (state, props) =>
  _getItemStructureStatus(state, props) === STATUS_LOADED;

const _getMetadataStatus = (state, { tupleId, name, itemName }) =>
  _getCatalogItemFieldStatus(state, {
    tupleId,
    name,
    itemName,
    fieldName: 'metadata',
  });

export const isMetadataLoading = (state, props) =>
  _getMetadataStatus(state, props) === STATUS_LOADING;

export const isMetadataLoaded = (state, props) =>
  _getMetadataStatus(state, props) === STATUS_LOADED;

const _getReportingItemPacketsStatus = (state, { tupleId, name, itemName }) =>
  _getCatalogItemFieldStatus(state, {
    tupleId,
    name,
    itemName,
    fieldName: 'reportingItemPackets',
  });

export const areReportingItemPacketsLoading = (state, props) =>
  _getReportingItemPacketsStatus(state, props) === STATUS_LOADING;

export const areReportingItemPacketsLoaded = (state, props) =>
  _getReportingItemPacketsStatus(state, props) === STATUS_LOADED;
