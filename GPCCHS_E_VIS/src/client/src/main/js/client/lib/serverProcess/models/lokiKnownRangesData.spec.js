// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Create loki model and its test
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Update some tests . . .
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update tests and implementation . .
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix error in retrieveLast and update its related
//  tests
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix forecast error and fix related tests
// END-HISTORY
// ====================================================================

const {
  getRangesRecords,
  removeRecords,
  getLastRecords,
  addRecord,
  addRecords,
  listCachedCollections,
  removeAllCollections,
  getOrCreateCollection,
  displayCollection,
  removeAllExceptIntervals,
  getDb,
} = require('./lokiKnownRangesData');

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

  describe('lokiKnownRangesData: addRecord', () => {
    test('given an empty database, call addRecord then with displayCollection return an array with one object containing our record', () => {
      const oneRecord = { timestamp: 42, payload: 42 };
      const id = 'myId';
      addRecord(id, oneRecord);
      expect(displayCollection(id)).toMatchObject(
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
      addRecord(id, oneRecord);
      addRecord(id, oneRecord2);
      expect(displayCollection(id)).toMatchObject(
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
      addRecord(id, oneRecord);
      const created = new Date().getTime();
      expect(displayCollection(id)).toMatchObject(
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

  describe('lokiKnownRangesData: addRecords', () => {
    test('given an empty database, call addRecords then with displayCollection return an array with one object containing our records', () => {
      const id = 'myId';
      addRecords(id, myRecords);
      expect(displayCollection(id)).toMatchObject(myRecords);
    });
  });

  describe('lokiKnownRangesData: getRangesRecords', () => {
    test('tbdId is not present', () => {
      const tbdId = 'myTbdId';
      const range = getRangesRecords(tbdId, [[6, 12]]);
      expect(range).toMatchObject({ [tbdId]: {} });
    });
    test('tbdId is already present ', () => {
      const tbdId = 'myTbdId';
      getOrCreateCollection(tbdId);
      addRecords(tbdId, myRecords);

      const range = getRangesRecords(tbdId, [[6, 12]]);
      expect(range).toMatchObject({
        myTbdId: {
          6: 6,
          7: 7,
          11: 11,
          12: 12,
        },
      });
    });
  });

  describe('getLastData', () => {
    test('tbdId is not present', () => {
      const tbdId = 'myTbdId';
      const range = getLastRecords(tbdId, [6, 9]);
      expect(range).toMatchObject({});
    });

    test('tbdId is already present ', () => {
      const tbdId = 'myTbdId';
      getOrCreateCollection(tbdId);
      addRecords(tbdId, myRecords);

      const range = getLastRecords(tbdId, [6, 9]);
      expect(range).toMatchObject({ myTbdId: { 7: 7 } });
    });
  });

  describe('removeRecords', () => {
    test('tbdId is not present', () => {
    });

    test('tbdId is already present ', () => {
      const tbdId = 'myTbdId';
      getOrCreateCollection(tbdId);
      addRecords(tbdId, myRecords);

      removeRecords(tbdId, 6, 11);
      expect(displayCollection(tbdId)).toMatchObject(
        [{
          timestamp: 5,
          payload: 5,
        },
        {
          timestamp: 12,
          payload: 12,
        }]);
    });
  });

  describe('removeAllExceptIntervals', () => {
    test('removeAllExceptIntervals', () => {
      const tbdId = 'myTbdId';
      const tbdId2 = 'myTbdId2';
      const tbdId3 = 'myTbdId3';
      getOrCreateCollection(tbdId);
      getOrCreateCollection(tbdId2);
      getOrCreateCollection(tbdId3);
      const collections = getDb().listCollections();
      expect(collections.map(e => e.name)).toEqual(expect.arrayContaining(
        ['knownRanges.myTbdId', 'knownRanges.myTbdId2', 'knownRanges.myTbdId3']
      ));
      expect(listCachedCollections().length).toEqual(3);
      addRecords(tbdId, myRecords);
      removeAllExceptIntervals({
        [tbdId]: {
          interval: [[4, 6], [12, 14]],
        },
      });
      expect(displayCollection(tbdId)).toMatchObject(
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
