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
  getLastRecords,
  getRecordsByInterval,
  removeRecords,
  removeAllExceptIntervals,
  getDb,
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
  describe('lokiGeneric: getLastData', () => {
    test('tbdId is not present', () => {
      const tbdId = 'myTbdId';
      const range = getLastRecords(cacheId, tbdId, [6, 9]);
      expect(range).toMatchObject({});
    });

    test('tbdId is already present ', () => {
      const tbdId = 'myTbdId';
      getOrCreateCollection(cacheId, tbdId);
      addRecords(cacheId, tbdId, myRecords);

      const range = getLastRecords(cacheId, tbdId, [6, 9]);
      expect(range).toMatchObject({ myTbdId: { 7: 7 } });
    });
  });
  describe('lokiGeneric: getRecordsByInterval', () => {
    test('tbdId is not present', () => {
      const tbdId = 'myTbdId';
      const records = getRecordsByInterval(cacheId, tbdId, [[6, 12]]);
      expect(records).toMatchObject({ [tbdId]: {} });
    });
    test('tbdId is already present ', () => {
      const tbdId = 'myTbdId';
      getOrCreateCollection(cacheId, tbdId);
      addRecords(cacheId, tbdId, myRecords);

      const records = getRecordsByInterval(cacheId, tbdId, [[6, 12]]);
      expect(records).toMatchObject({
        myTbdId: {
          6: 6,
          7: 7,
          11: 11,
          12: 12,
        },
      });
    });
  });
  describe('lokiGeneric: removeRecords', () => {
    test('tbdId is not present', () => {});
    test('tbdId is already present ', () => {
      const tbdId = 'myTbdId';
      getOrCreateCollection(cacheId, tbdId);
      addRecords(cacheId, tbdId, myRecords);

      removeRecords(cacheId, tbdId, 6, 11);
      expect(displayCollection(cacheId, tbdId)).toMatchObject(
        [
          {
            timestamp: 5,
            payload: 5,
          },
          {
            timestamp: 12,
            payload: 12,
          },
        ]);
    });
  });
  describe('lokiGeneric: removeAllExceptIntervals', () => {
    test('removeAllExceptIntervals', () => {
      const tbdId = '';
      const tbdId2 = 'myTbdId2';
      const tbdId3 = 'myTbdId3';
      getOrCreateCollection(cacheId, tbdId);
      getOrCreateCollection(cacheId, tbdId2);
      getOrCreateCollection(cacheId, tbdId3);
      const collections = getDb().listCollections();
      expect(collections.map(e => e.name)).toEqual(expect.arrayContaining(
        ['knownRanges.', 'knownRanges.myTbdId2', 'knownRanges.myTbdId3']
      ));
      expect(listCachedCollections().length).toEqual(3);
      addRecords(cacheId, tbdId, myRecords);
      removeAllExceptIntervals(
        cacheId,
        {
          '': {
            interval: [[4, 6], [12, 14]],
          },
        }
      );
      expect(displayCollection(cacheId, tbdId)).toMatchObject(
        [
          {
            timestamp: 5,
            payload: 5,
          },
          {
            timestamp: 6,
            payload: 6,
          },
          {
            timestamp: 12,
            payload: 12,
          },
        ]);
      expect(listCachedCollections().length).toEqual(1);
    });
  });
});
