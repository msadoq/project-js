/* eslint-disable complexity */
import {
  getTupleId,
  areCatalogItemsLoaded,
  areCatalogsLoaded,
  areCatalogItemsLoading,
  areCatalogsLoading,
  areComObjectsLoaded,
  areComObjectsLoading,
  areReportingItemPacketsLoaded,
  areReportingItemPacketsLoading,
  isItemStructureLoaded,
  isItemStructureLoading,
  isMetadataLoaded,
  isMetadataLoading,
} from 'store/reducers/catalogs';

import {
  WS_CATALOG_ITEMS_ASK,
  WS_CATALOGS_ASK,
  WS_COM_OBJECTS_ASK,
  WS_ITEM_STRUCTURE_ASK,
  WS_ITEM_METADATA_ASK,
  WS_REPORTING_ITEM_PACKETS_ASK,
} from 'store/types';
import {
  addCatalogItems,
  addCatalogs,
  addComObjects,
  addItemStructure,
  addCatalogItemMetadata,
  addReportingItemPackets,
} from 'store/actions/catalogs';
import { getSingleEntryPoint } from 'viewManager/DecommutedPacketView/store/dataSelectors';

import { dc } from '../../../serverProcess/ipc';
import { getSessionIdWithFallback } from '../../reducers/sessions';
import { getDomainId } from '../../reducers/domains';
import { get } from '../../../common/configurationManager';
import { getPageIdByViewId } from '../../reducers/pages';


const fetchCatalogs = (sessionId, domainId, cb) =>
  dc.retrieveSDBCatalogs({ sessionId, domainId }, cb);

const fetchCatalogItems = (sessionId, domainId, catalogName, cb) =>
  dc.retrieveSDBCatalogsItems({
    sessionId,
    domainId,
    catalogName,
  }, cb);

const fetchComObjects = (sessionId, domainId, catalogName, catalogItemName, cb) =>
  dc.retrieveSDBCatalogsItemComObject({ sessionId, domainId, catalogName, catalogItemName }, cb);

const fetchItemMetadata = (sessionId, domainId, catalogName, catalogItemName, cb) =>
  dc.retrieveCatalogItemMetadata({ sessionId, domainId, catalogName, catalogItemName }, cb);

const fetchReportingItemPackets = (sessionId, domainId, catalogName, catalogItemName, cb) =>
  dc.retrieveReportingItemPackets({ sessionId, domainId, catalogName, catalogItemName }, cb);


const fetchItemStructure = (sessionId, domainId, catalogName, catalogItemName, cb) =>
  dc.retrieveCatalogItemStructure({
    sessionId,
    domainId,
    catalogName,
    catalogItemName,
  }, cb);

const wildcard = get('WILDCARD_CHARACTER');

const catalogMiddleware = ({ dispatch, getState }) => next => (action) => {
  const state = getState();
  switch (action.type) {
    case WS_CATALOGS_ASK: {
      const { sessionId, domainId } = action.payload;

      if (typeof domainId !== 'number' || typeof sessionId !== 'number') {
        return next(action);
      }

      if (
        areCatalogsLoaded(state, { sessionId, domainId }) ||
        areCatalogsLoading(state, { sessionId, domainId })
      ) {
        return next(action);
      }

      fetchCatalogs(
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

      break;
    }
    case WS_CATALOG_ITEMS_ASK: {
      const { sessionId, domainId, name } = action.payload;

      if (
        typeof domainId !== 'number' ||
        typeof sessionId !== 'number' ||
        typeof name !== 'string'
      ) {
        return next(action);
      }

      if (
        areCatalogItemsLoaded(state, { sessionId, domainId, name }) ||
        areCatalogItemsLoading(state, { sessionId, domainId, name })
      ) {
        return next(action);
      }

      fetchCatalogItems(
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

      break;
    }
    case WS_COM_OBJECTS_ASK: {
      const { sessionId, domainId, name, itemName } = action.payload;

      if (
        typeof domainId !== 'number' ||
        typeof sessionId !== 'number' ||
        typeof name !== 'string' ||
        typeof itemName !== 'string'
      ) {
        return next(action);
      }

      if (
        areComObjectsLoaded(state, { domainId, sessionId, name, itemName }) ||
        areComObjectsLoading(state, { domainId, sessionId, name, itemName })
      ) {
        return next(action);
      }

      fetchComObjects(
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
      break;
    }
    case WS_ITEM_STRUCTURE_ASK: {
      const { viewId } = action.payload;

      const pageId = getPageIdByViewId(state, { viewId });
      const domainId = getDomainId(state, { domainName: wildcard, viewId, pageId });
      const sessionId = getSessionIdWithFallback(state, { sessionName: wildcard, viewId, pageId });
      const tupleId = getTupleId(domainId, sessionId);
      const {
        catalogItem: itemName,
        catalog: name,
      } = getSingleEntryPoint(state, { viewId }).connectedData;

      if (
        typeof domainId !== 'number' ||
        typeof sessionId !== 'number' ||
        typeof name !== 'string' ||
        typeof itemName !== 'string'
      ) {
        return next(action);
      }

      if (
        isItemStructureLoading(state, { domainId, sessionId, name, itemName }) ||
        isItemStructureLoaded(state, { domainId, sessionId, name, itemName })
      ) {
        return next(action);
      }

      fetchItemStructure(
        sessionId,
        domainId,
        name,
        itemName,
        structure => dispatch(addItemStructure(tupleId, name, itemName, structure))
      );

      break;
    }
    case WS_ITEM_METADATA_ASK: {
      const { sessionId, domainId, name, itemName } = action.payload;

      if (
        typeof domainId !== 'number' ||
        typeof sessionId !== 'number' ||
        typeof name !== 'string' ||
        typeof itemName !== 'string'
      ) {
        return next(action);
      }

      if (
        isMetadataLoaded(state, { domainId, sessionId, name, itemName }) ||
        isMetadataLoading(state, { domainId, sessionId, name, itemName })
      ) {
        return next(action);
      }

      fetchItemMetadata(sessionId, domainId, name, itemName,
        metadata => dispatch(
          addCatalogItemMetadata(
            getTupleId(domainId, sessionId),
            name,
            itemName,
            metadata
          )
        ));

      break;
    }

    case WS_REPORTING_ITEM_PACKETS_ASK: {
      const { sessionId, domainId, name, itemName } = action.payload;

      if (
        typeof domainId !== 'number' ||
        typeof sessionId !== 'number' ||
        typeof name !== 'string' ||
        typeof itemName !== 'string'
      ) {
        return next(action);
      }

      if (
        areReportingItemPacketsLoaded(state, { domainId, sessionId, name, itemName }) ||
        areReportingItemPacketsLoading(state, { domainId, sessionId, name, itemName })
      ) {
        return next(action);
      }

      fetchReportingItemPackets(sessionId, domainId, name, itemName,
        items => dispatch(
          addReportingItemPackets(
            getTupleId(domainId, sessionId),
            name,
            itemName,
            items
          )
        ));

      break;
    }
    default:
      break;
  }

  return next(action);
};

export default catalogMiddleware;
