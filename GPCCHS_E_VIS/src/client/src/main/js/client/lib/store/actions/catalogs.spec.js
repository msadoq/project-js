import { mockStore } from 'common/jest';
import * as actions from './catalogs';

describe('store:actions:editor', () => {
  const state = {};
  test('dispatch a "WS_CATALOGS_ASK"', () => {
    const store = mockStore(state);
    store.dispatch(actions.askCatalogs('domainId', 'sessionId'));
    expect(store.getActions()).toMatchObject([
      { payload: { domainId: 'domainId', sessionId: 'sessionId' }, type: 'WS_CATALOGS_ASK' },
    ]);
  });
  test('dispatch a "WS_CATALOGS_ADD"', () => {
    const store = mockStore(state);
    store.dispatch(actions.addCatalogs('domainId-sessionId', []));
    expect(store.getActions()).toMatchObject([
      { payload: { tupleId: 'domainId-sessionId', catalogs: [] }, type: 'WS_CATALOGS_ADD' },
    ]);
  });
  test('dispatch a "WS_CATALOG_ITEMS_ASK"', () => {
    const store = mockStore(state);
    store.dispatch(actions.askCatalogItems('domainId', 'sessionId', 'catalogName'));
    expect(store.getActions()).toMatchObject([
      { payload: { domainId: 'domainId', sessionId: 'sessionId', name: 'catalogName' }, type: 'WS_CATALOG_ITEMS_ASK' },
    ]);
  });
  test('dispatch a "WS_CATALOG_ITEMS_ADD"', () => {
    const store = mockStore(state);
    store.dispatch(actions.addCatalogItems('domainId-sessionId', 'catalogName', []));
    expect(store.getActions()).toMatchObject([
      { payload: { tupleId: 'domainId-sessionId', name: 'catalogName', items: [] }, type: 'WS_CATALOG_ITEMS_ADD' },
    ]);
  });
  test('dispatch a "WS_COM_OBJECTS_ASK"', () => {
    const store = mockStore(state);
    store.dispatch(actions.askComObjects('domainId', 'sessionId', 'catalogName', 'catalogItemName'));
    expect(store.getActions()).toMatchObject([
      { payload: { domainId: 'domainId', sessionId: 'sessionId', name: 'catalogName', itemName: 'catalogItemName' }, type: 'WS_COM_OBJECTS_ASK' },
    ]);
  });
  test('dispatch a "WS_COM_OBJECTS_ADD"', () => {
    const store = mockStore(state);
    store.dispatch(actions.addComObjects('domainId-sessionId', 'catalogName', 'catalogItemName', []));
    expect(store.getActions()).toMatchObject([
      { payload: { tupleId: 'domainId-sessionId', name: 'catalogName', itemName: 'catalogItemName', comObjects: [] }, type: 'WS_COM_OBJECTS_ADD' },
    ]);
  });
});
