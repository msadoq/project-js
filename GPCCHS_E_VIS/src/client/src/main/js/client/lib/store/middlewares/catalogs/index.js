import {
  WS_CATALOG_ITEMS_ASK,
  WS_CATALOGS_ASK,
  WS_COM_OBJECTS_ASK,
  WS_ITEM_STRUCTURE_ASK,
  WS_ITEM_METADATA_ASK,
  WS_REPORTING_ITEM_PACKETS_ASK,
  STATUS_LOADING,
  STATUS_LOADED,
} from 'store/types';

import {
  updateCatalogsStatus,
  addCatalogItems,
  addCatalogs,
  addCatalogItemComObjects,
  addCatalogItemStructure,
  addCatalogItemMetadata,
  addCatalogItemReportingItemPackets,
  updateCatalogItemsStatus,
  updateCatalogItemComObjectsStatus,
  updateCatalogItemMetadataStatus,
  updateCatalogItemReportingItemPacketsStatus,
  updateCatalogItemStructureStatus,
} from 'store/actions/catalogs';

import loaders from './loaders';

import {
  areCatalogItemComObjectsLoaded,
  areCatalogItemComObjectsLoading, areCatalogItemFieldPropsValid,
  areCatalogItemsLoaded,
  areCatalogItemsLoading, areCatalogItemsPropsValid,
  areCatalogsLoaded, areCatalogsLoading, areCatalogsPropsValid,
  areReportingItemPacketsLoaded,
  areReportingItemPacketsLoading,
  isCatalogItemMetadataLoaded,
  isCatalogItemMetadataLoading,
  isCatalogItemStructureLoaded,
  isCatalogItemStructureLoading,
} from '../../selectors/catalogs';


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

        dispatch(
          updateCatalogsStatus(
            domainId,
            sessionId,
            STATUS_LOADED
          )
        );
      };

      if (
        areCatalogsPropsValid(props) &&
        !areCatalogsLoaded(state, props) &&
        !areCatalogsLoading(state, props)
      ) {
        dispatch(updateCatalogsStatus(domainId, sessionId, STATUS_LOADING));
        loaders.loadCatalogs(state, props, _addCatalogs);
      }

      break;
    }
    case WS_CATALOG_ITEMS_ASK: {
      const { payload: props } = action;
      const { sessionId, domainId, catalogName } = props;

      const _addCatalogItems = (items) => {
        dispatch(
          addCatalogItems(
            domainId,
            sessionId,
            catalogName,
            items
          ))
        ;

        dispatch(
          updateCatalogItemsStatus(
            domainId,
            sessionId,
            catalogName,
            STATUS_LOADED
          )
        );
      };


      if (
        areCatalogItemsPropsValid(props) &&
        !areCatalogItemsLoaded(state, props) &&
        !areCatalogItemsLoading(state, props)
      ) {
        dispatch(
          updateCatalogItemsStatus(
            domainId,
            sessionId,
            catalogName,
            STATUS_LOADING
          )
        );

        loaders.loadCatalogItems(state, props, _addCatalogItems);
      }

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

      const _addCatalogItemMetadata = (metadata) => {
        dispatch(
          addCatalogItemMetadata(
            domainId,
            sessionId,
            catalogName,
            catalogItemName,
            metadata
          )
        );

        dispatch(
          updateCatalogItemMetadataStatus(
            domainId,
            sessionId,
            catalogName,
            catalogItemName,
            STATUS_LOADED
          )
        );
      };

      if (
        areCatalogItemFieldPropsValid(props) &&
        !isCatalogItemMetadataLoaded(state, props) &&
        !isCatalogItemMetadataLoading(state, props)
      ) {
        dispatch(
          updateCatalogItemMetadataStatus(
            domainId,
            sessionId,
            catalogName,
            catalogItemName,
            STATUS_LOADING
          ));

        loaders.loadCatalogItemMetadata(state, props, _addCatalogItemMetadata);
      }

      break;
    }
    case WS_REPORTING_ITEM_PACKETS_ASK: {
      const { payload: props } = action;
      const { sessionId, domainId, catalogName, catalogItemName } = props;

      const _addCatalogItemsReportingItemPackets =
        (items) => {
          dispatch(
            addCatalogItemReportingItemPackets(
              domainId,
              sessionId,
              catalogName,
              catalogItemName,
              items
            )
          );

          dispatch(
            updateCatalogItemReportingItemPacketsStatus(
              domainId,
              sessionId,
              catalogName,
              catalogItemName,
              STATUS_LOADED
            )
          );
        };

      if (
        areCatalogItemFieldPropsValid(props) &&
        !areReportingItemPacketsLoaded(state, props) &&
        !areReportingItemPacketsLoading(state, props)
      ) {
        dispatch(
          updateCatalogItemReportingItemPacketsStatus(
            domainId,
            sessionId,
            catalogName,
            catalogItemName,
            STATUS_LOADING
          )
        );

        loaders.loadCatalogItemReportingPackets(
          state,
          props,
          _addCatalogItemsReportingItemPackets
        );
      }

      break;
    }
    case WS_COM_OBJECTS_ASK: {
      const { payload: props } = action;
      const { sessionId, domainId, catalogName, catalogItemName } = props;

      const _addCatalogItemComObjects = (comObjects) => {
        dispatch(
          addCatalogItemComObjects(
            domainId,
            sessionId,
            catalogName,
            catalogItemName,
            comObjects
          )
        );

        dispatch(
          updateCatalogItemComObjectsStatus(
            domainId,
            sessionId,
            catalogName,
            catalogItemName,
            STATUS_LOADED
          )
        );
      };

      if (
        areCatalogItemFieldPropsValid(props) &&
        !areCatalogItemComObjectsLoaded(state, props) &&
        !areCatalogItemComObjectsLoading(state, props)
      ) {
        dispatch(
          updateCatalogItemComObjectsStatus(
            domainId,
            sessionId,
            catalogName,
            catalogItemName,
            STATUS_LOADING
          )
        );

        loaders.loadCatalogItemComObjects(
          state,
          props,
          _addCatalogItemComObjects
        );
      }

      break;
    }
    case WS_ITEM_STRUCTURE_ASK: {
      const { payload: props } = action;
      const { domainId, sessionId, catalogName, catalogItemName } = props;

      const _addCatalogItemStructure =
        (structure) => {
          dispatch(
            addCatalogItemStructure(
              domainId,
              sessionId,
              catalogName,
              catalogItemName,
              structure
            )
          );

          dispatch(
            updateCatalogItemStructureStatus(
              domainId,
              sessionId,
              catalogName,
              catalogItemName,
              STATUS_LOADED
            )
          );
        };


      if (
        areCatalogItemFieldPropsValid(props) &&
        !isCatalogItemStructureLoaded(state, props) &&
        !isCatalogItemStructureLoading(state, props)
      ) {
        dispatch(
          updateCatalogItemStructureStatus(
            domainId,
            sessionId,
            catalogName,
            catalogItemName,
            STATUS_LOADING
          )
        );

        loaders.loadCatalogItemStructure(
          state,
          props,
          _addCatalogItemStructure
        );
      }

      break;
    }
    default:
      break;
  }

  return next(action);
};

export default catalogMiddleware;
