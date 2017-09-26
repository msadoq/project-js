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
  getRangesRecords,
  removeRecords,
  getLastRecords,
  addRecords,
  listCollections,
  // removeCollection,
  removeAllCollections,
  getOrCreateCollection,
  displayCollection,
  removeAllExceptIntervals,
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

  describe('addRecords', () => {
  });

  describe('getRangeData', () => {
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
      expect(listCollections().length).toEqual(3);
      addRecords(tbdId, myRecords);
      removeAllExceptIntervals({
        [tbdId]: {
          interval: [[4, 6], [12, 14]],
        },
      });
      expect(displayCollection(tbdId)).toMatchObject(
        [{
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
        }]);
      expect(listCollections().length).toEqual(1);
    });
  });
});
