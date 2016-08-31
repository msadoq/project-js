require('../../lib/utils/test');
const model = require('../../lib/models/cacheJson');
const { getDataId, getReportingParameter } = require('../../lib/utils/stubData');

describe('models/cacheJson', () => {
  beforeEach(() => {
    model.clear();
  });

  const dataId = getDataId();
  const payload = getReportingParameter();

  describe('addRecord', () => {
    const timestamp = Date.now();
    it('one', () => {
      model.addRecord(dataId, timestamp, payload);
      const records = model.find();
      records.should.be.an('array').that.has.lengthOf(1);
      records[0].should.be.an('object').with.properties({
        localId: model.getLocalId(dataId),
        timestamp,
        payload,
      });
    });
    it('multi', () => {
      model.addRecord(dataId, timestamp, payload);

      const secondDataId = getDataId({
        parameterName: 'ATT_BC_STR1STRRFQ1',
      });
      model.addRecord(secondDataId, timestamp, payload);
      model.count().should.equal(2);
      const records = model.find();
      records[0].localId.should.equal(model.getLocalId(dataId));
      records[1].localId.should.equal(model.getLocalId(secondDataId));
    });
  });
  describe('findByInterval', () => {
    it('empty', () => {
      const records = model.findByInterval(dataId, Date.now(), Date.now());
      records.should.be.an('array').that.has.lengthOf(0);
    });
    it('filter on localId', () => {
      model.addRecord(dataId, Date.now(), payload);
      model.addRecord(getDataId({
        catalog: 'TmPacket',
      }), Date.now(), payload);
      model.addRecord(getDataId({
        parameterName: 'ATT_BC_STR1STRSAQ1',
      }), Date.now(), payload);
      model.addRecord(getDataId({
        comObject: 'TmPacket',
      }), Date.now(), payload);
      model.addRecord(getDataId({
        sessionId: 150,
      }), Date.now(), payload);
      model.addRecord(getDataId({
        domainId: 250,
      }), Date.now(), payload);

      const records = model.findByInterval(dataId, Date.now() - 1000, Date.now() + 1000);
      records.should.be.an('array').that.has.lengthOf(1);
    });
    describe('filter on interval', () => {
      const now = Date.now();
      beforeEach(() => {
        model.addRecord(dataId, now - 10000, payload); // 10s before
        model.addRecord(dataId, now, payload);
        model.addRecord(dataId, now + 10000, payload); // 10s after
      });

      it('lasts', () => {
        model.findByInterval(dataId, now - 5000, now + 20000)
          .should.be.an('array').that.has.lengthOf(2);
      });
      it('firsts', () => {
        model.findByInterval(dataId, now - 20000, now + 5000)
          .should.be.an('array').that.has.lengthOf(2);
      });
      it('middle', () => {
        model.findByInterval(dataId, now - 5000, now + 5000)
          .should.be.an('array').that.has.lengthOf(1);
      });
      it('no interval', () => {
        model.findByInterval(dataId)
          .should.be.an('array').that.has.lengthOf(3);
      });
      it('only lower', () => {
        model.findByInterval(dataId, now + 5000)
          .should.be.an('array').that.has.lengthOf(1);
      });
      it('only upper', () => {
        model.findByInterval(dataId, null, now - 5000)
          .should.be.an('array').that.has.lengthOf(1);
      });
      it('nothing', () => {
        model.findByInterval(dataId, now - 20000, now - 15000)
          .should.be.an('array').that.has.lengthOf(0);
        model.findByInterval(dataId, now + 15000, now + 20000)
          .should.be.an('array').that.has.lengthOf(0);
        model.findByInterval(dataId, now - 4000, now - 2000)
          .should.be.an('array').that.has.lengthOf(0);
      });
    });
  });
});
