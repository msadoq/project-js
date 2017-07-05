import { freezeArgs } from '../../../common/jest';
import * as actions from '../../actions/rte';

import hscReducer, {
  getRteSessions,
  getRteDomains,
  getRteCatalogs,
  getRteItemNames,
  getRteFocusedInfo,
} from '.';

const reducer = freezeArgs(hscReducer);

describe('store:rte:reducer', () => {
  test('should returns initial state', () => {
    const r = reducer(undefined, {});
    expect(r).toHaveProperty('sessions', []);
    expect(r).toHaveProperty('domains', []);
    expect(r).toHaveProperty('catalogs', {});
    expect(r).toHaveProperty('itemNames', {});
    expect(r).toHaveProperty('openedItems', {});
    expect(r).toHaveProperty('focusedItem', null);
    expect(r).toHaveProperty('focusedInfo');
    expect(r.focusedInfo).toMatchObject({
      session: '',
      domain: '',
      catalog: '',
      version: '',
      namespace: '',
      name: '',
    });
  });
  test('should ignore unknown action', () => {
    const state = {
      sessions: [1, 2],
      domains: [42, 43],
    };
    expect(reducer(state, {})).toBe(state);
  });
  test('should set rte sessions', () => {
    const sessions = [0, 1];
    expect(reducer(undefined, actions.setRteSessions(sessions))).toMatchObject({
      sessions,
    });
  });
  test('should set rte domains', () => {
    const session = 1;
    const domains = [3, 4];
    expect(reducer(undefined, actions.setRteDomains(session, domains))).toMatchObject({
      domains,
      focusedInfo: {
        session,
      },
      catalogs: [],
      itemNames: [],
    });
  });
  test('should set rte catalogs', () => {
    const session = 1;
    const domain = 42;
    const catalogs = ['catalog1', 'catalog2'];
    expect(reducer(undefined, actions.setRteCatalogs(session, domain, catalogs))).toMatchObject({
      catalogs,
      focusedInfo: {
        session,
        domain,
      },
      itemNames: [],
    });
  });
  test('should update rte item names', () => {
    const catalog = 'catalog1';
    const version = 'v1';
    const itemNames = ['item1', 'item2'];
    expect(reducer(undefined, actions.setRteItemNames(catalog, version, itemNames))).toMatchObject({
      itemNames,
      focusedInfo: {
        catalog,
        version,
      },
    });
  });
});

describe('store:rte:selectors', () => {
  const emptyState = {};

  describe('getRteSessions', () => {
    test('should return status', () => {
      const state = { rte: { sessions: [1, 2] } };
      expect(getRteSessions(state)).toEqual([1, 2]);
    });
    test('should support empty state', () => {
      expect(getRteSessions(emptyState)).toBeFalsy();
    });
  });
  describe('getRteDomains', () => {
    test('should return status', () => {
      const state = { rte: { domains: [1, 2] } };
      expect(getRteDomains(state)).toEqual([1, 2]);
    });
    test('should support empty state', () => {
      expect(getRteDomains(emptyState)).toBeFalsy();
    });
  });
  describe('getRteCatalogs', () => {
    test('should return status', () => {
      const state = { rte: { catalogs: ['catalog1', 'catalog2'] } };
      expect(getRteCatalogs(state)).toEqual(['catalog1', 'catalog2']);
    });
    test('should support empty state', () => {
      expect(getRteCatalogs(emptyState)).toBeFalsy();
    });
  });
  describe('getRteItemNames', () => {
    test('should return status', () => {
      const state = { rte: { itemNames: ['item1', 'item2'] } };
      expect(getRteItemNames(state)).toEqual(['item1', 'item2']);
    });
    test('should support empty state', () => {
      expect(getRteItemNames(emptyState)).toBeFalsy();
    });
  });
  describe('getRteFocusedInfo', () => {
    test('should return status', () => {
      const state = { rte: { focusedInfo: { session: 1 } } };
      expect(getRteFocusedInfo(state)).toMatchObject({ session: 1 });
    });
    test('should support empty state', () => {
      expect(getRteFocusedInfo(emptyState)).toBeFalsy();
    });
  });
});
