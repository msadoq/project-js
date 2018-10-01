import { dc } from '../../../serverProcess/ipc';


const loadCatalogs = (state, props, cb) =>
  dc.retrieveSDBCatalogs(props, cb);

const loadCatalogItems = (state, props, cb) =>
  dc.retrieveSDBCatalogsItems(props, cb);

const loadCatalogItemComObjects = (state, props, cb) =>
  dc.retrieveSDBCatalogsItemComObject(props, cb);

const loadCatalogItemMetadata = (state, props, cb) =>
  dc.retrieveCatalogItemMetadata(props, cb);

const loadCatalogItemReportingPackets = (state, props, cb) =>
  dc.retrieveReportingItemPackets(props, cb);

const loadCatalogItemStructure = (state, props, cb) =>
  dc.retrieveCatalogItemStructure(props, cb);

export default {
  loadCatalogs,
  loadCatalogItems,
  loadCatalogItemMetadata,
  loadCatalogItemComObjects,
  loadCatalogItemReportingPackets,
  loadCatalogItemStructure,
};
