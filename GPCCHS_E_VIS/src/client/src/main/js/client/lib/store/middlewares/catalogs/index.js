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
  addCatalogItemComObjects,
  addCatalogItemStructure,
  addCatalogItemMetadata,
  addCatalogItemReportingItemPackets,
} from 'store/actions/catalogs';

import loaders from './loaders';

const catalogMiddleware = ({ dispatch, getState }) => next => (action) => {
  const state = getState();

  switch (action.type) {
    case WS_CATALOGS_ASK: {
      const { payload: props } = action;
      const { sessionId, domainId } = props;

      const _addCatalogs = (catalogs) => {
        dispatch(
          addCatalogs(
            domainId,
            sessionId,
            catalogs
          )
        );
      };

      loaders.loadCatalogs(
        state,
        props,
        _addCatalogs
      );

      break;
    }
    case WS_CATALOG_ITEMS_ASK: {
      const { payload: props } = action;
      const { sessionId, domainId, catalogName } = props;

      const _addCatalogItems = items => dispatch(
        addCatalogItems(
          domainId,
          sessionId,
          catalogName,
          items
        )
      );


      loaders.loadCatalogItems(
        state,
        props,
        _addCatalogItems
      );

      break;
    }
    case WS_ITEM_METADATA_ASK: {
      const { payload: props } = action;

      const {
        sessionId,
        domainId,
        catalogName,
        catalogItemName,
      } = props;

      const _addCatalogItemMetadata = metadata => dispatch(
        addCatalogItemMetadata(
          domainId,
          sessionId,
          catalogName,
          catalogItemName,
          metadata
        )
      );

      loaders.loadCatalogItemMetadata(
        state,
        props,
        _addCatalogItemMetadata
      );

      break;
    }
    case WS_REPORTING_ITEM_PACKETS_ASK: {
      const { payload: props } = action;
      const { sessionId, domainId, catalogName, catalogItemName } = props;

      const _addCatalogItemsReportingItemPackets =
        items => dispatch(
          addCatalogItemReportingItemPackets(
            domainId,
            sessionId,
            catalogName,
            catalogItemName,
            items
          )
        );

      loaders.loadCatalogItemReportingPackets(
        state,
        props,
        _addCatalogItemsReportingItemPackets
      );

      break;
    }
    case WS_COM_OBJECTS_ASK: {
      const { payload: props } = action;
      const { sessionId, domainId, catalogName, catalogItemName } = props;

      const _addCatalogItemComObjects = comObjects => dispatch(
        addCatalogItemComObjects(
          domainId,
          sessionId,
          catalogName,
          catalogItemName,
          comObjects
        )
      );

      loaders.loadCatalogItemComObjects(
        state,
        props,
        _addCatalogItemComObjects
      );

      break;
    }
    case WS_ITEM_STRUCTURE_ASK: {
      const { payload: props } = action;
      const { domainId, sessionId, catalogName, catalogItemName } = props;

      const _addCatalogItemStructure =
        structure =>
          dispatch(
            addCatalogItemStructure(
              domainId,
              sessionId,
              catalogName,
              catalogItemName,
              structure
            )
          );

      loaders.loadCatalogItemStructure(
        state,
        props,
        _addCatalogItemStructure
      );

      break;
    }
    default:
      break;
  }

  return next(action);
};

export default catalogMiddleware;
