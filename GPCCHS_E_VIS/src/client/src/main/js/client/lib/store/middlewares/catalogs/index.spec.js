import configureMockStore from 'redux-mock-store';
import catalogMiddleware, {
  isCatalogLoaded,
  areCatalogItemsLoaded,
} from './index';
import stateTest from '../../../common/jest/stateTest';
import { getTupleId, REQUESTING } from '../../reducers/catalogs';

const unknownAction = { type: 'UNKNOWN' };
const mockStore = configureMockStore([catalogMiddleware]);
const sessionId = 0;
const domainId = 1;
const tupleId = getTupleId(domainId, sessionId);
const state = {
  sessions: [
    {
      id: sessionId,
      name: 'Master',
      timestamp: {
        ms: 1420106890818,
        ps: 0,
      },
    }, {
      id: 42,
      name: 'Session #42',
      timestamp: {
        ms: 1420106890818,
        ps: 0,
      },
    }, {
      id: 181,
      name: 'Session# 181',
      timestamp: {
        ms: 1420106890818,
        ps: 0,
      },
    },
  ],
  domains: [
    {
      domainId,
      itemNamespace: 'Domains',
      name: 'fr.cnes.isis',
      oid: '0051525005151000565215465660515',
      parentDomainId: 0,
    }, {
      domainId: 4,
      itemNamespace: 'Domains',
      name: 'fr.cnes.isis.simupus',
      oid: '0051525005151000565215465660515',
      parentDomainId: 1,
    },
  ],
  catalogs: [],
};

describe('catalog:middleware', () => {
  test('it does nothing with unknown actions', () => {
    const store = mockStore(stateTest);
    store.dispatch(unknownAction);
    expect(store.getActions()).toEqual([unknownAction]);
  });
  describe('catalog:middleware isCatalogLoaded', () => {
    test('empty catalog list', () => {
      expect(isCatalogLoaded(state, { sessionId, domainId })).toBeFalsy();
    });
    test('requesting, catalog is thus not loaded', () => {
      const state2 = {
        ...state,
        catalogs: {
          [tupleId]: REQUESTING,
        },
      };
      expect(isCatalogLoaded(state2, { sessionId, domainId })).toBeFalsy();
    });
    test('catalog loaded', () => {
      const state2 = {
        ...state,
        catalogs: {
          [tupleId]: [],
        },
      };
      expect(isCatalogLoaded(state2, { sessionId, domainId })).toBeTruthy();
    });
  });
  describe('catalog:middleware areCatalogItemsLoaded', () => {
    test('empty catalog list', () => {
      expect(areCatalogItemsLoaded(state, { sessionId, domainId, name: 'Reporting' })).toBeFalsy();
    });
    test('requesting, catalog is thus not loaded', () => {
      const state2 = {
        ...state,
        catalogs: {
          [tupleId]: REQUESTING,
        },
      };
      expect(areCatalogItemsLoaded(state2, { sessionId, domainId, name: 'Reporting' })).toBeFalsy();
    });
    test('catalog loaded, but nothing fetched', () => {
      const state2 = {
        ...state,
        catalogs: {
          [tupleId]: [],
        },
      };
      expect(areCatalogItemsLoaded(state2, { sessionId, domainId, name: 'Reporting' })).toBeFalsy();
    });
    test('catalog loaded, catalog item name not found', () => {
      const state2 = {
        ...state,
        catalogs: {
          [tupleId]: [{
            name: 'Telemetry',
            items: [],
          }],
        },
      };
      expect(areCatalogItemsLoaded(state2, { sessionId, domainId, name: 'Reporting' })).toBeFalsy();
    });
    test('catalog loaded, catalog item name found but requesting', () => {
      const state2 = {
        ...state,
        catalogs: {
          [tupleId]: [{
            name: 'Reporting',
            items: REQUESTING,
          }],
        },
      };
      expect(areCatalogItemsLoaded(state2, { sessionId, domainId, name: 'Reporting' })).toBeFalsy();
    });
    test('catalog loaded, catalog item name found and filled', () => {
      const state2 = {
        ...state,
        catalogs: {
          [tupleId]: [{
            name: 'Reporting',
            items: [],
          }],
        },
      };
      expect(areCatalogItemsLoaded(state2, { sessionId, domainId, name: 'Reporting' })).toBeTruthy();
    });
  });
});
