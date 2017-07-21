const {
  getRangeData,
  removeRecords,
  getLastData,
  addRecords,
  // listCollections,
  // removeCollection,
  removeAllCollections,
  getOrCreateCollection,
  displayCollection,
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
      const range = getRangeData(tbdId, [6, 12]);
      expect(range).toMatchObject([]);
    });
    test('tbdId is already present ', () => {
      const tbdId = 'myTbdId';
      getOrCreateCollection(tbdId);
      addRecords(tbdId, myRecords);

      const range = getRangeData(tbdId, 6, 12);
      expect(range).toMatchObject(
        [{
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
        }]);
    });
  });

  describe('getLastData', () => {
    test('tbdId is not present', () => {
      const tbdId = 'myTbdId';
      const range = getLastData(tbdId, [6, 9]);
      expect(range).toMatchObject([]);
    });

    test('tbdId is already present ', () => {
      const tbdId = 'myTbdId';
      getOrCreateCollection(tbdId);
      addRecords(tbdId, myRecords);

      const range = getLastData(tbdId, 6, 9);
      expect(range).toMatchObject(
        [{
          timestamp: 7,
          payload: 7,
        }]);
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
});
