const { should } = require('../utils/test');
const {
  clearFactory,
  addTimebasedDataModel,
  getTimebasedDataModel,
  removeTimebasedDataModel,
  getAllTimebasedDataModelRemoteIds,
} = require('./timebasedDataFactory');
// eslint-disable-next-line import/no-extraneous-dependencies
const { getReportingParameter } = require('common/stubs/data');

describe('models/timebasedDataFactory', () => {
  beforeEach(() => {
    clearFactory();
  });
  describe('addTimebasedDataModel', () => {
    let model;

    beforeEach(() => {
      model = addTimebasedDataModel('myRemoteId');
    });

    const payload = getReportingParameter();

    describe('addRecord', () => {
      const timestamp = Date.now();
      it('one', () => {
        const record = model.addRecord(timestamp, payload);
        record.should.be.an('object').with.property('$loki');
        const records = model.find();
        records.should.be.an('array').that.has.lengthOf(1);
        records[0].should.be.an('object').with.properties({
          timestamp,
          payload,
        });
      });
      it('multi', () => {
        model.addRecord(timestamp, payload);

        const timestamp2 = timestamp + 1;
        model.addRecord(timestamp2, payload);
        model.count().should.equal(2);
        const records = model.find();
        records[0].timestamp.should.equal(timestamp);
        records[1].timestamp.should.equal(timestamp2);
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
        records.should.be.an('array').that.has.lengthOf(2);
        records[0].should.be.an('object').with.properties({
          timestamp: now,
          payload,
        });
        records[1].should.be.an('object').with.properties({
          timestamp: now + 1,
          payload,
        });
      });
    });

    describe('findByInterval', () => {
      it('empty', () => {
        const records = model.findByInterval(Date.now(), Date.now());
        records.should.be.an('array').that.has.lengthOf(0);
      });

      describe('filter on interval', () => {
        const now = Date.now();
        beforeEach(() => {
          model.addRecord(now - 10000, payload); // 10s before
          model.addRecord(now, payload);
          model.addRecord(now + 10000, payload); // 10s after
        });

        it('lasts', () => {
          model.findByInterval(now - 5000, now + 20000)
            .should.be.an('array').that.has.lengthOf(2);
        });
        it('firsts', () => {
          model.findByInterval(now - 20000, now + 5000)
            .should.be.an('array').that.has.lengthOf(2);
        });
        it('middle', () => {
          model.findByInterval(now - 5000, now + 5000)
            .should.be.an('array').that.has.lengthOf(1);
        });
        it('no interval', () => {
          model.findByInterval()
            .should.be.an('array').that.has.lengthOf(3);
        });
        it('only lower', () => {
          model.findByInterval(now + 5000)
            .should.be.an('array').that.has.lengthOf(1);
        });
        it('only upper', () => {
          model.findByInterval(null, now - 5000)
            .should.be.an('array').that.has.lengthOf(1);
        });
        it('nothing', () => {
          model.findByInterval(now - 20000, now - 15000)
            .should.be.an('array').that.has.lengthOf(0);
          model.findByInterval(now + 15000, now + 20000)
            .should.be.an('array').that.has.lengthOf(0);
          model.findByInterval(now - 4000, now - 2000)
            .should.be.an('array').that.has.lengthOf(0);
        });
      });
    });
  });
  describe('getTimebasedDataModel', () => {
    it('existing', () => {
      const myTbdModel = addTimebasedDataModel('myRemoteId');
      const tbdModel = getTimebasedDataModel('myRemoteId');
      Object.keys(myTbdModel).should.have.properties(Object.keys(tbdModel));
    });
    it('not existing', () => {
      const tbdModel = getTimebasedDataModel('myRemoteId');
      should.not.exist(tbdModel);
    });
  });
  describe('removeTimebasedDataModel', () => {
    it('works', () => {
      addTimebasedDataModel('myRemoteId');
      removeTimebasedDataModel('myRemoteId');
      const tbdModel = getTimebasedDataModel('myRemoteId');
      should.not.exist(tbdModel);
    });
    it('no model', () => {
      should.not.throw(() => removeTimebasedDataModel('myRemoteId'));
    });
  });
  describe('getAllTimebasedDataModelRemoteIds', () => {
    it('works', () => {
      addTimebasedDataModel('myRemoteId');
      addTimebasedDataModel('myOtherRemoteId');
      addTimebasedDataModel('myThirdRemoteId');
      removeTimebasedDataModel('myOtherRemoteId');
      const remoteIds = getAllTimebasedDataModelRemoteIds();
      remoteIds.should.have.lengthOf(2);
      remoteIds.should.have.properties(['myRemoteId', 'myThirdRemoteId']);
    });
  });
});
