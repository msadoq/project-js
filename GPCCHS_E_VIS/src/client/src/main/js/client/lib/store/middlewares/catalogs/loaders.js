import {
  areCatalogItemsLoaded,
  areCatalogItemsLoading,
  areCatalogsLoaded,
  areCatalogsLoading,
  areCatalogItemComObjectsLoaded,
  areCatalogItemComObjectsLoading,
  areReportingItemPacketsLoaded,
  areReportingItemPacketsLoading,
  isCatalogItemItemStructureLoaded,
  isCatalogItemItemStructureLoading,
  isCatalogItemMetadataLoaded,
  isCatalogItemMetadataLoading,
} from 'store/selectors/catalogs';

import { dc } from '../../../serverProcess/ipc';


const loadCatalogs = (state, props, cb) => {
  const { sessionId, domainId } = props;

  if (
    typeof domainId !== 'number' ||
    typeof sessionId !== 'number' ||
    areCatalogsLoaded(state, props) ||
    areCatalogsLoading(state, props)
  ) {
    return;
  }

  dc.retrieveSDBCatalogs(props, cb);
};

const loadCatalogItems = (state, props, cb) => {
  const { sessionId, domainId, catalogName } = props;

  if (
    typeof domainId !== 'number' ||
    typeof sessionId !== 'number' ||
    typeof catalogName !== 'string' ||
    areCatalogItemsLoaded(state, props) ||
    areCatalogItemsLoading(state, props)
  ) {
    return;
  }

  dc.retrieveSDBCatalogsItems(props, cb);
};

const loadCatalogItemComObjects = (state, props, cb) => {
  const {
    sessionId,
    domainId,
    catalogName,
    catalogItemName,
  } = props;

  if (
    typeof domainId !== 'number' ||
    typeof sessionId !== 'number' ||
    typeof catalogName !== 'string' ||
    typeof catalogItemName !== 'string' ||
    areCatalogItemComObjectsLoaded(state, props) ||
    areCatalogItemComObjectsLoading(state, props)
  ) {
    return;
  }

  dc.retrieveSDBCatalogsItemComObject(props, cb);
};

const loadCatalogItemMetadata = (state, props, cb) => {
  const {
    sessionId,
    domainId,
    catalogName,
    catalogItemName,
  } = props;

  if (
    typeof domainId !== 'number' ||
    typeof sessionId !== 'number' ||
    typeof catalogName !== 'string' ||
    typeof catalogItemName !== 'string' ||
    isCatalogItemMetadataLoaded(state, props) ||
    isCatalogItemMetadataLoading(state, props)
  ) {
    return;
  }

  dc.retrieveCatalogItemMetadata(props, cb);
};

const loadCatalogItemReportingPackets = (state, props, cb) => {
  const {
    sessionId,
    domainId,
    catalogName,
    catalogItemName,
  } = props;

  if (
    typeof domainId !== 'number' ||
    typeof sessionId !== 'number' ||
    typeof catalogName !== 'string' ||
    typeof catalogItemName !== 'string' ||
    areReportingItemPacketsLoaded(state, props) ||
    areReportingItemPacketsLoading(state, props)
  ) {
    return;
  }

  dc.retrieveReportingItemPackets(props, cb);
};

const loadCatalogItemStructure = (state, props, cb) => {
  const { sessionId, domainId, catalogName, catalogItemName } = props;

  if (
    typeof domainId !== 'number' ||
    typeof sessionId !== 'number' ||
    typeof catalogName !== 'string' ||
    typeof catalogItemName !== 'string' ||
    isCatalogItemItemStructureLoading(state, props) ||
    isCatalogItemItemStructureLoaded(state, props)
  ) {
    return;
  }

  dc.retrieveCatalogItemStructure(props, cb);
};

export default {
  loadCatalogs,
  loadCatalogItems,
  loadCatalogItemMetadata,
  loadCatalogItemComObjects,
  loadCatalogItemReportingPackets,
  loadCatalogItemStructure,
};
