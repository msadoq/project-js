import simple from 'store/helpers/simpleActionCreator';
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
  FORM_CATALOG_CHANGE,
} from '../types';

export const updateCatalogField = simple(
  FORM_CATALOG_CHANGE,
  'domainId',
  'sessionId'
);

export const askCatalogs = simple(
  WS_CATALOGS_ASK,
  'domainId',
  'sessionId'
);

export const addCatalogs = simple(
  WS_CATALOGS_ADD,
  'domainId',
  'sessionId',
  'catalogs'
);

export const askCatalogItems = simple(
  WS_CATALOG_ITEMS_ASK,
  'domainId',
  'sessionId',
  'catalogName'
);

export const addCatalogItems = simple(
  WS_CATALOG_ITEMS_ADD,
  'domainId',
  'sessionId',
  'catalogName',
  'items'
);

export const askCatalogItemComObjects = simple(
  WS_COM_OBJECTS_ASK,
  'domainId',
  'sessionId',
  'catalogName',
  'catalogItemName'
);

export const addCatalogItemComObjects = simple(
  WS_COM_OBJECTS_ADD,
  'domainId',
  'sessionId',
  'catalogName',
  'catalogItemName',
  'comObjects'
);

export const askCatalogItemStructure = simple(
  WS_ITEM_STRUCTURE_ASK,
  'domainId',
  'sessionId',
  'catalogName',
  'catalogItemName'
);
export const addCatalogItemStructure = simple(
  WS_ITEM_STRUCTURE_ADD,
  'domainId',
  'sessionId',
  'catalogName',
  'catalogItemName',
  'structure'
);

export const askItemMetadata =
  simple(
    WS_ITEM_METADATA_ASK,
    'domainId',
    'sessionId',
    'catalogName',
    'catalogItemName'
  );

export const askCatalogItemReportingItemPackets =
  simple(
    WS_REPORTING_ITEM_PACKETS_ASK,
    'domainId',
    'sessionId',
    'catalogName',
    'catalogItemName'
  );

export const addCatalogItemMetadata = simple(
  WS_ITEM_METADATA_ADD,
  'domainId',
  'sessionId',
  'catalogName',
  'catalogItemName',
  'metadata'
);

export const addCatalogItemReportingItemPackets = simple(
  WS_REPORTING_ITEM_PACKETS_ADD,
  'domainId',
  'sessionId',
  'catalogName',
  'catalogItemName',
  'reportingItemPackets'
);
