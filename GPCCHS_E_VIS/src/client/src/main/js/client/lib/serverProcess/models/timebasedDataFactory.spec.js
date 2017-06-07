const { should } = require('../utils/test');
const {
  clearFactory,
  getOrCreateTimebasedDataModel,
  getTimebasedDataModel,
  removeTimebasedDataModel,
  getAllTimebasedDataModelRemoteIds,
} = require('./timebasedDataFactory');
const { getReportingParameter } = require('common/protobuf/stubs');

describe('models/timebasedDataFactory', () => {
  beforeEach(() => {
    clearFactory();
  });
  describe('getOrCreateTimebasedDataModel', () => {
    let model;

    beforeEach(() => {
      model = getOrCreateTimebasedDataModel('myRemoteId');
    });

    const payload = getReportingParameter();

    describe('addRecord', () => {
      const timestamp = Date.now();
      it('one', () => {
        const record = model.addRecord(timestamp, payload);
        expect(record).be.an('object').toHaveProperty('$loki');
        const records = model.find();
        expect(records).be.an('array').toHaveLength(1);
        expect(typeof records[0]).toBe('object').with.properties({
          timestamp,
          payload,
        });
      });
      it('multi', () => {
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
      it('multi', () => {
        model.addRecords(payloads);
        const records = model.find();
        expect(records).be.an('array').toHaveLength(2);
        expect(typeof records[0]).toBe('object').with.properties({
          timestamp: now,
          payload,
        });
        expect(typeof records[1]).toBe('object').with.properties({
          timestamp: now + 1,
          payload,
        });
      });
    });

    describe('findByInterval', () => {
      it('empty', () => {
        const records = model.findByInterval(Date.now(), Date.now());
        expect(records).be.an('array').toHaveLength(0);
      });

      describe('filter on interval', () => {
        const now = Date.now();
        beforeEach(() => {
          model.addRecord(now - 10000, payload); // 10s before
          model.addRecord(now, payload);
          model.addRecord(now + 10000, payload); // 10s after
        });

        it('lasts', () => {
          expect(model.findByInterval(now - 5000, now + 20000)).be.an('array').toHaveLength(2);
        });
        it('firsts', () => {
          expect(model.findByInterval(now - 20000, now + 5000)).be.an('array').toHaveLength(2);
        });
        it('middle', () => {
          expect(model.findByInterval(now - 5000, now + 5000)).be.an('array').toHaveLength(1);
        });
        it('no interval', () => {
          expect(model.findByInterval()).be.an('array').toHaveLength(3);
        });
        it('only lower', () => {
          expect(model.findByInterval(now + 5000)).be.an('array').toHaveLength(1);
        });
        it('only upper', () => {
          expect(model.findByInterval(null, now - 5000)).be.an('array').toHaveLength(1);
        });
        it('nothing', () => {
          expect(model.findByInterval(now - 20000, now - 15000)).be.an('array').toHaveLength(0);
          expect(model.findByInterval(now + 15000, now + 20000)).be.an('array').toHaveLength(0);
          expect(model.findByInterval(now - 4000, now - 2000)).be.an('array').toHaveLength(0);
        });
      });
    });
  });
  describe('getTimebasedDataModel', () => {
    it('existing', () => {
      const myTbdModel = getOrCreateTimebasedDataModel('myRemoteId');
      const tbdModel = getTimebasedDataModel('myRemoteId');
      expect(Object.keys(myTbdModel)).have.properties(Object.keys(tbdModel));
    });
    it('not existing', () => {
      const tbdModel = getTimebasedDataModel('myRemoteId');
      expect(tbdModel).toBeFalsy();
    });
  });
  describe('removeTimebasedDataModel', () => {
    it('works', () => {
      getOrCreateTimebasedDataModel('myRemoteId');
      removeTimebasedDataModel('myRemoteId');
      const tbdModel = getTimebasedDataModel('myRemoteId');
      expect(tbdModel).toBeFalsy();
    });
    it('no model', () => {
      expect(() => removeTimebasedDataModel('myRemoteId')).not.throw;
    });
  });
  describe('getAllTimebasedDataModelRemoteIds', () => {
    it('works', () => {
      getOrCreateTimebasedDataModel('myRemoteId');
      getOrCreateTimebasedDataModel('myOtherRemoteId');
      getOrCreateTimebasedDataModel('myThirdRemoteId');
      removeTimebasedDataModel('myOtherRemoteId');
      const remoteIds = getAllTimebasedDataModelRemoteIds();
      expect(remoteIds).toHaveLength(2);
      expect(remoteIds).have.properties(['myRemoteId', 'myThirdRemoteId']);
    });
  });
});
