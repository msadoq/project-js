import { getTupleId } from 'store/reducers/catalogs';
import {
  WS_CATALOGS_ASK,
  WS_CATALOG_ITEMS_ASK,
  WS_COM_OBJECTS_ASK,
} from 'store/types';
import {
  addCatalogs,
  addCatalogItems,
  addComObjects,
} from 'store/actions/catalogs';

const asyncCatalogFetcher = (sessionId, domainId, cb) => {
  setTimeout(
    () => { cb([{ name: 'TelemetryPacket' }]); },
    1000
  );
};

const asyncCatalogItemFetcher = (sessionId, domainId, catalogName, cb) => (
  setTimeout(
    () => { cb([{ name: 'CLCW_TM_NOMINAL' }]); },
    1000
  )
);

const asyncComObjectsFetcher = (sessionId, domainId, catalogName, CatalogItemName, cb) => {
  setTimeout(
    () => { cb([{ name: 'DecommutedPacket' }]); },
    1000
  );
};

const catalogMiddleware = ({ dispatch }) => next => (action) => {
  const nextAction = next(action);
  if (action.type === WS_CATALOGS_ASK) {
    asyncCatalogFetcher(
      action.payload.sessionId,
      action.payload.domainId,
      catalogs => dispatch(
        addCatalogs(
          getTupleId(action.payload.domainId, action.payload.sessionId),
          catalogs
        )
      )
    );
  }
  if (action.type === WS_CATALOG_ITEMS_ASK) {
    asyncCatalogItemFetcher(
      action.payload.sessionId,
      action.payload.domainId,
      action.payload.name,
      items => dispatch(
        addCatalogItems(
          getTupleId(action.payload.domainId, action.payload.sessionId),
          action.payload.name,
          items
        )
      )
    );
  }
  if (action.type === WS_COM_OBJECTS_ASK) {
    asyncComObjectsFetcher(
      action.payload.sessionId,
      action.payload.domainId,
      action.payload.name,
      action.payload.itemName,
      comObjects => dispatch(
        addComObjects(
          getTupleId(action.payload.domainId, action.payload.sessionId),
          action.payload.name,
          action.payload.itemName,
          comObjects
        )
      )
    );
  }
  return nextAction;
};

export default catalogMiddleware;
