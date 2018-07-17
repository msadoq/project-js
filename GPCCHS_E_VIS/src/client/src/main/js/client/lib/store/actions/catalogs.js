import simple from 'store/helpers/simpleActionCreator';
import {
  WS_CATALOGS_ASK,
  WS_CATALOGS_ADD,
  WS_CATALOG_ITEMS_ASK,
  WS_CATALOG_ITEMS_ADD,
  WS_COM_OBJECTS_ASK,
  WS_COM_OBJECTS_ADD,
  WS_UNIT_ASK,
  WS_UNIT_ADD,
  WS_ITEM_STRUCTURE_ASK,
  WS_UNIT_ADD_SIMPLE,
  WS_ITEM_STRUCTURE_ADD,
  WS_ITEM_METADATA_ASK,
  WS_ITEM_METADATA_ADD,
} from '../types';
import { getSessionByNameWithFallback, getSessionNameFromTimeline } from '../reducers/sessions';
import { getDomainId } from '../reducers/domains';
import { get } from '../../common/configurationManager';

export const askCatalogs = simple(
  WS_CATALOGS_ASK,
  'domainId',
  'sessionId'
);

export const addCatalogs = simple(
  WS_CATALOGS_ADD,
  'tupleId',
  'catalogs'
);

export const askCatalogItems = simple(
  WS_CATALOG_ITEMS_ASK,
  'domainId',
  'sessionId',
  'name'
);

export const addCatalogItems = simple(
  WS_CATALOG_ITEMS_ADD,
  'tupleId',
  'name',
  'items'
);

export const askComObjects = simple(
  WS_COM_OBJECTS_ASK,
  'domainId',
  'sessionId',
  'name',
  'itemName'
);

export const addComObjects = simple(
  WS_COM_OBJECTS_ADD,
  'tupleId',
  'name',
  'itemName',
  'comObjects'
);

export const askUnit = simple(
  WS_UNIT_ASK,
  'domainId',
  'sessionId',
  'name',
  'itemName'
);

export const addUnit = simple(
  WS_UNIT_ADD,
  'tupleId',
  'name',
  'itemName',
  'unit'
);

export const askItemStructure = simple(
  WS_ITEM_STRUCTURE_ASK,
  'viewId'
);
export const addItemStructure = simple(
  WS_ITEM_STRUCTURE_ADD,
  'tupleId',
  'name',
  'itemName',
  'structure'
);

const wildcardCharacter = get('WILDCARD_CHARACTER');

export const askItemMetadata = (viewId, pageId, domainName, timelineId, catalogName, path) =>
  (dispatch, getState) => {
    const sessionName = getSessionNameFromTimeline(getState(), { timelineId, wildcardCharacter });
    const sessionId = getSessionByNameWithFallback(getState(), { sessionName, viewId, pageId }).id;
    const domainId = getDomainId(getState(), { viewId, pageId, domainName });
    dispatch({
      type: WS_ITEM_METADATA_ASK,
      payload: {
        timelineId,
        domainId,
        catalogName,
        sessionId,
        name,
        itemName: path,
      },
    });
  };

export const addCatalogItemMetadata = simple(
  WS_ITEM_METADATA_ADD,
  'tupleId',
  'name',
  'metadata'
);

export const addUnitSimple = simple(
  WS_UNIT_ADD_SIMPLE,
  'tupleId',
  'name',
  'itemName',
  'unit'
);
