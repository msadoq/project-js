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

const {
  addRecord,
  addRecords,
  removeAllCollections,
  displayCollection,
  getRecordByTimestamp,
  listCachedCollections,
  getObsoleteEventRecordsByInterval,
} = require('./lokiObsoleteEventData');

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

  describe('lokiObsoleteEventData: addRecord', () => {
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

  describe('lokiObsoleteEventData: listCachedCollections', () => {
    test('given populate database, call listCachedCollections then length equal 1', () => {
      const id = 'myId';
      addRecords(id, myRecords);
      expect(listCachedCollections().length).toEqual(1);
    });
  });

  describe('lokiObsoleteEventData: addRecords', () => {
    test('given an empty database, call addRecords then with displayCollection return an array with one object containing our records', () => {
      const id = 'myId';
      addRecords(id, myRecords);
      expect(listCachedCollections().length).toEqual(1);
      expect(displayCollection(id)).toMatchObject(myRecords);
    });
  });

  describe('lokiObsoleteEventData: getRecordByTimestamp', () => {
    test('given populate database, call getRecordByTimestamp return an array with one object containing our records', () => {
      const id = 'myId';
      addRecords(id, myRecords);
      const created = new Date().getTime();
      expect(listCachedCollections().length).toEqual(1);
      expect(getRecordByTimestamp(id, 6)).toMatchObject(
        [
          {
            $loki: 2,
            meta: {
              created,
              revision: 0,
              version: 0,
            },
            payload: 6,
            timestamp: 6,
          },
        ]
      );
    });
  });

  describe('lokiObsoleteEventData: getObsoleteEventRecordsByInterval', () => {
    test('given an empty database, call getObsoleteEventRecordsByInterval return an empty set of record values', () => {
      const tbdId = 'myTbdId';
      const range = getObsoleteEventRecordsByInterval(tbdId, [[6, 12]]);
      expect(range).toMatchObject({ [tbdId]: {} });
    });
    test('given a populate database, call getObsoleteEventRecordsByInterval return a set of records values', () => {
      const tbdId = 'myTbdId';
      addRecords(tbdId, myRecords);
      const obsoleteEvents = getObsoleteEventRecordsByInterval(tbdId, [[6, 12]]);
      expect(obsoleteEvents).toMatchObject({
        myTbdId: {
          6: 6,
          7: 7,
          11: 11,
          12: 12,
        },
      });
    });
  });
});
