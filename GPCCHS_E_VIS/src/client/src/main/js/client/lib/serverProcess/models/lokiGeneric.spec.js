// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Create loki model and its test
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Update some tests . . .
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update tests and implementation . .
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix error in retrieveLast and update its related tests
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix forecast error and fix related tests
// END-HISTORY
// ====================================================================

import {
  getCollection,
  addRecord,
  addRecords,
  listCachedCollections,
  removeCollection,
  removeAllCollections,
  getOrCreateCollection,
  displayCollection,
  getPrefixedId,
} from './lokiGeneric';

const cacheId = 'knownRanges';
const myRecords = [
  {
    timestamp: 5,
    payload: 5,
  },
  {
    timestamp: 6,
    payload: 6,
  },
  {
    timestamp: 7,
    payload: 7,
  },
  {
    timestamp: 11,
    payload: 11,
  },
  {
    timestamp: 12,
    payload: 12,
  }];
describe('models/timebasedDataFactory', () => {
  beforeEach(() => {
    removeAllCollections();
  });

  describe('lokiGeneric: getCollection', () => {
    test('given an empty database, then return {"collection": null}', () => {
      expect(getCollection('test', 'test')).toEqual({ collection: null });
    });
    test('given a populated database, on a not-existing id then return {"collection": null}', () => {
      const oneRecord = { timestamp: 42, payload: 42 };
      const id = 'myId';
      addRecord(cacheId, id, oneRecord);
      expect(getCollection(cacheId, 'test')).toEqual({ collection: null });
    });
    test('given a populated database, on an existing id then return the element', () => {
      // Tested in lokiGeneric: addRecord
    });
  });

  describe('lokiGeneric: addRecord', () => {
    test('given an empty database, call addRecord then with displayCollection return an array with one object containing our record', () => {
      const oneRecord = { timestamp: 42, payload: 42 };
      const id = 'myId';
      addRecord(cacheId, id, oneRecord);
      expect(displayCollection(cacheId, id)).toMatchObject(
        [
          {
            timestamp: 42,
            payload: 42,
          },
        ]
      );
    });
    test('given an empty database, call addRecord twice with different values then with ' +
      'displayCollection return an array with one object containing our record', () => {
      const oneRecord = { timestamp: 42, payload: 42 };
      const oneRecord2 = { timestamp: 45, payload: 45 };
      const id = 'myId';
      addRecord(cacheId, id, oneRecord);
      addRecord(cacheId, id, oneRecord2);
      expect(displayCollection(cacheId, id)).toMatchObject(
        [
          {
            timestamp: 42,
            payload: 42,
          },
          {
            timestamp: 45,
            payload: 45,
          },
        ]
      );
    });
    test('given an empty database, call addRecord twice with same value then with ' +
      'displayCollection return an array with one object containing our record', () => {
      const oneRecord = { timestamp: 42, payload: 42 };
      const id = 'myId';
      addRecord(cacheId, id, oneRecord);
      const created = new Date().getTime();
      expect(displayCollection(cacheId, id)).toMatchObject(
        [
          {
            $loki: 1,
            meta: {
              created,
              revision: 0,
              version: 0,
            },
            payload: 42,
            timestamp: 42,
          },
        ]
      );
    });
  });

  describe('lokiGeneric: addRecords', () => {
    test('given an empty database, call addRecords then with displayCollection return an array with one object containing our records', () => {
      const id = 'myId';
      addRecords(cacheId, id, myRecords);
      expect(displayCollection(cacheId, id)).toMatchObject(myRecords);
    });
  });

  describe('lokiGeneric: listCachedCollection', () => {
    test('given an empty database, then return an empty array', () => {
      expect(listCachedCollections()).toEqual([]);
    });
    test('given an empty database, when adding a collection then return an array with the new id', () => {
      const id = 'myId';
      getOrCreateCollection(cacheId, id);
      const prefixedId = getPrefixedId(cacheId, id);
      expect(listCachedCollections()).toEqual([prefixedId]);
    });
  });

  describe('lokiGeneric: removeCollection', () => {
    test('given an empty database, when removing a collection which does not exist then throw an error', () => {
      const id = 'myId';
      expect(() => removeCollection(cacheId, id)).toThrow('the Collection you are trying to remove does not exist');
    });
    test('given a populated database with two ids, when removing a collection ' +
      'then listCachedCollection returns an array with one id', () => {
      const id = 'myId';
      const id2 = 'myId2';
      getOrCreateCollection(cacheId, id);
      getOrCreateCollection(cacheId, id2);
      const prefixedId2 = getPrefixedId(cacheId, id2);
      removeCollection(cacheId, id);
      expect(listCachedCollections()).toEqual([prefixedId2]);
    });
  });

  describe('lokiGeneric: removeAllCollection', () => {
    test('given an empty database, when removing all collection then return an array with one id', () => {
      removeAllCollections();
      expect(listCachedCollections()).toEqual([]);
    });
    test('given a populated database with two ids, when removing a collection then return an array with one id', () => {
      const id = 'myId';
      const id2 = 'myId2';
      getOrCreateCollection(cacheId, id);
      getOrCreateCollection(cacheId, id2);
      removeAllCollections();
      expect(listCachedCollections()).toEqual([]);
    });
  });
  describe('lokiGeneric: getOrCreateCollection', () => {
    test('given an empty database, when creating a new collection then return an array with one id', () => {
      const id = 'myId';
      const prefixedId = getPrefixedId(cacheId, id);
      getOrCreateCollection(cacheId, id);
      expect(listCachedCollections()).toEqual([prefixedId]);
    });
    test('given a populated database with one id, when creating an already existing collection then return an array with one id', () => {
      const id = 'myId';
      const prefixedId = getPrefixedId(cacheId, id);
      getOrCreateCollection(cacheId, id);
      getOrCreateCollection(cacheId, id);
      expect(listCachedCollections()).toEqual([prefixedId]);
    });
  });
});
