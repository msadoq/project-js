const {
  clearFactory,
  getOrCreateTimebasedDataModel,
  getTimebasedDataModel,
  removeTimebasedDataModel,
  getAllTimebasedDataModelRemoteIds,
} = require('./timebasedDataFactory');


const { getStubData } = require('../../utils/stubs');
const { mockLoadStubs } = require('../../common/jest');

mockLoadStubs();
const dataStub = getStubData();
describe('models/timebasedDataFactory', () => {
  beforeEach(() => {
    clearFactory();
  });
  describe('getOrCreateTimebasedDataModel', () => {
    let model;

    beforeEach(() => {
      model = getOrCreateTimebasedDataModel('myRemoteId');
    });

    const payload = dataStub.getReportingParameter();

    describe('addRecord', () => {
      const timestamp = Date.now();
      test('one', () => {
        const record = model.addRecord(timestamp, payload);
        expect(record).toHaveProperty('$loki');
        const records = model.find();
        expect(records).toHaveLength(1);
        expect(records[0]).toMatchObject({
          timestamp,
          payload,
        });
      });
      test('multi', () => {
        model.addRecord(timestamp, payload);

        const timestamp2 = timestamp + 1;
        model.addRecord(timestamp2, payload);
        expect(model.count()).toBe(2);
        const records = model.find();
        expect(records[0].timestamp).toBe(timestamp);
        expect(records[1].timestamp).toBe(timestamp2);
      });
    });

    describe('addRecords', () => {
      const now = Date.now();
      const payloads = [
        {
          timestamp: now,
          payload,
        }, {
          timestamp: now + 1,
          payload,
        },
      ];
      test('multi', () => {
        model.addRecords(payloads);
        const records = model.find();
        expect(records).toHaveLength(2);
        expect(records[0]).toMatchObject({
          timestamp: now,
          payload,
        });
        expect(records[1]).toMatchObject({
          timestamp: now + 1,
          payload,
        });
      });
    });

    describe('findByInterval', () => {
      test('empty', () => {
        const records = model.findByInterval(Date.now(), Date.now());
        expect(records).toHaveLength(0);
      });

      describe('filter on interval', () => {
        const now = Date.now();
        beforeEach(() => {
          model.addRecord(now - 10000, payload); // 10s before
          model.addRecord(now, payload);
          model.addRecord(now + 10000, payload); // 10s after
        });

        test('lasts', () => {
          expect(model.findByInterval(now - 5000, now + 20000)).toHaveLength(2);
        });
        test('firsts', () => {
          expect(model.findByInterval(now - 20000, now + 5000)).toHaveLength(2);
        });
        test('middle', () => {
          expect(model.findByInterval(now - 5000, now + 5000)).toHaveLength(1);
        });
        test('no interval', () => {
          expect(model.findByInterval()).toHaveLength(3);
        });
        test('only lower', () => {
          expect(model.findByInterval(now + 5000)).toHaveLength(1);
        });
        test('only upper', () => {
          expect(model.findByInterval(null, now - 5000)).toHaveLength(1);
        });
        test('nothing', () => {
          expect(model.findByInterval(now - 20000, now - 15000)).toHaveLength(0);
          expect(model.findByInterval(now + 15000, now + 20000)).toHaveLength(0);
          expect(model.findByInterval(now - 4000, now - 2000)).toHaveLength(0);
        });
      });
    });
  });
  describe('getTimebasedDataModel', () => {
    test('existing', () => {
      const myTbdModel = getOrCreateTimebasedDataModel('myRemoteId');
      const tbdModel = getTimebasedDataModel('myRemoteId');
      expect(myTbdModel).toMatchObject(tbdModel);
    });
    test('not existing', () => {
      const tbdModel = getTimebasedDataModel('myRemoteId');
      expect(tbdModel).toBeFalsy();
    });
  });
  describe('removeTimebasedDataModel', () => {
    test('works', () => {
      getOrCreateTimebasedDataModel('myRemoteId');
      removeTimebasedDataModel('myRemoteId');
      const tbdModel = getTimebasedDataModel('myRemoteId');
      expect(tbdModel).toBeFalsy();
    });
    test('no model', () => {
      expect(() => removeTimebasedDataModel('myRemoteId')).not.toThrow();
    });
  });
  describe('getAllTimebasedDataModelRemoteIds', () => {
    test('works', () => {
      getOrCreateTimebasedDataModel('myRemoteId');
      getOrCreateTimebasedDataModel('myOtherRemoteId');
      getOrCreateTimebasedDataModel('myThirdRemoteId');
      removeTimebasedDataModel('myOtherRemoteId');
      const remoteIds = getAllTimebasedDataModelRemoteIds();
      expect(remoteIds).toHaveLength(2);
      expect(remoteIds).toEqual(expect.arrayContaining(['myRemoteId', 'myThirdRemoteId']));
    });
  });
});
