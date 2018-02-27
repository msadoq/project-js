import { getTupleId } from 'store/reducers/catalogs';
import {
  WS_CATALOGS_ASK,
  WS_CATALOG_ITEMS_ASK,
  WS_COM_OBJECTS_ASK,
  WS_UNIT_ASK,
} from 'store/types';
import {
  addCatalogs,
  addCatalogItems,
  addComObjects,
  addUnit,
} from 'store/actions/catalogs';
import { dc } from '../../../serverProcess/ipc';

const asyncCatalogFetcher = (sessionId, domainId, cb) => {
  dc.retrieveSDBCatalogs({ sessionId, domainId }, cb);
  /* dc.retrieveSDBCatalogs({ sessionId, domainId }, (decoded) => {
    console.log('retrieveSDBCatalogs', decoded);
  }); */
  /* setTimeout(
    () => { cb([{ name: 'TelemetryPacket' }]); },
    1000
  ); */
};

const asyncCatalogItemFetcher = (sessionId, domainId, catalogName, cb) => {
  dc.retrieveSDBCatalogsItems({ sessionId, domainId, catalogName }, cb);
  /* dc.retrieveSDBCatalogsItems({ sessionId, domainId, catalogName }, (decoded) => {
    console.log('retrieveSDBCatalogsItems', decoded);
  }); */
  /* setTimeout(
    () => { cb([{ name: 'CLCW_TM_NOMINAL' }]); },
    1000
  ) */
};

const asyncComObjectsFetcher = (sessionId, domainId, catalogName, catalogItemName, cb) => {
  dc.retrieveSDBCatalogsItemComObject({ sessionId, domainId, catalogName, catalogItemName }, cb);
  /* dc.retrieveSDBCatalogsItemComObject({ sessionId, domainId, catalogName, catalogItemName }, (decoded) => {
    console.log('retrieveSDBCatalogsItemComObject', decoded);
  }); */
  /* setTimeout(
    () => { cb([{ name: 'DecommutedPacket' }]); },
    1000
  ); */
};

const asyncUnitFetcher = (sessionId, domainId, catalogName, catalogItemName, cb) => {
  dc.retrieveSDBCatalogItemFieldUnit(
    {
      sessionId,
      domainId,
      catalogName,
      catalogItemName,
    }, cb);
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

  if (action.type === WS_UNIT_ASK) {
    asyncUnitFetcher(
      action.payload.sessionId,
      action.payload.domainId,
      action.payload.name,
      action.payload.itemName,
      unit => dispatch(
        addUnit(
          getTupleId(action.payload.domainId, action.payload.sessionId),
          action.payload.name,
          action.payload.itemName,
          unit
        )
      )
    );
  }

  return nextAction;
};

export default catalogMiddleware;
