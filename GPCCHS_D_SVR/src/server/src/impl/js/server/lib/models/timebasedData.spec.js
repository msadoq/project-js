require('../utils/test');
const model = require('./timebasedData');
const { getRemoteId, getReportingParameter } = require('../stubs/data');

describe('models/timebasedData', () => {
  beforeEach(() => {
    model.clear();
  });

  const remoteId = getRemoteId();
  const payload = getReportingParameter();

  describe('addRecord', () => {
    const timestamp = Date.now();
    it('one', () => {
      const record = model.addRecord(remoteId, timestamp, payload);
      record.should.be.an('object').with.property('$loki');
      const records = model.find();
      records.should.be.an('array').that.has.lengthOf(1);
      records[0].should.be.an('object').with.properties({
        remoteId,
        timestamp,
        payload,
      });
    });
    it('multi', () => {
      model.addRecord(remoteId, timestamp, payload);

      const secondRemoteId = getRemoteId({
        parameterName: 'ATT_BC_STR1STRRFQ1',
      });
      model.addRecord(secondRemoteId, timestamp, payload);
      model.count().should.equal(2);
      const records = model.find();
      records[0].remoteId.should.equal(remoteId);
      records[1].remoteId.should.equal(secondRemoteId);
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
      model.addRecords(remoteId, payloads);
      const records = model.find();
      records.should.be.an('array').that.has.lengthOf(2);
      records[0].should.be.an('object').with.properties({
        remoteId,
        timestamp: now,
        payload,
      });
      records[1].should.be.an('object').with.properties({
        remoteId,
        timestamp: now + 1,
        payload,
      });
    });
  });

  describe('findByInterval', () => {
    it('empty', () => {
      const records = model.findByInterval(remoteId, Date.now(), Date.now());
      records.should.be.an('array').that.has.lengthOf(0);
    });
    it('filter on remoteId', () => {
      model.addRecord(remoteId, Date.now(), payload);
      model.addRecord(getRemoteId({
        catalog: 'TmPacket',
      }), Date.now(), payload);
      model.addRecord(getRemoteId({
        parameterName: 'ATT_BC_STR1STRSAQ1',
      }), Date.now(), payload);
      model.addRecord(getRemoteId({
        comObject: 'TmPacket',
      }), Date.now(), payload);
      model.addRecord(getRemoteId({
        sessionId: 150,
      }), Date.now(), payload);
      model.addRecord(getRemoteId({
        domainId: 250,
      }), Date.now(), payload);

      const records = model.findByInterval(remoteId, Date.now() - 1000, Date.now() + 1000);
      records.should.be.an('array').that.has.lengthOf(1);
    });

    describe('filter on interval', () => {
      const now = Date.now();
      beforeEach(() => {
        model.addRecord(remoteId, now - 10000, payload); // 10s before
        model.addRecord(remoteId, now, payload);
        model.addRecord(remoteId, now + 10000, payload); // 10s after
      });

      it('lasts', () => {
        model.findByInterval(remoteId, now - 5000, now + 20000)
          .should.be.an('array').that.has.lengthOf(2);
      });
      it('firsts', () => {
        model.findByInterval(remoteId, now - 20000, now + 5000)
          .should.be.an('array').that.has.lengthOf(2);
      });
      it('middle', () => {
        model.findByInterval(remoteId, now - 5000, now + 5000)
          .should.be.an('array').that.has.lengthOf(1);
      });
      it('no interval', () => {
        model.findByInterval(remoteId)
          .should.be.an('array').that.has.lengthOf(3);
      });
      it('only lower', () => {
        model.findByInterval(remoteId, now + 5000)
          .should.be.an('array').that.has.lengthOf(1);
      });
      it('only upper', () => {
        model.findByInterval(remoteId, null, now - 5000)
          .should.be.an('array').that.has.lengthOf(1);
      });
      it('nothing', () => {
        model.findByInterval(remoteId, now - 20000, now - 15000)
          .should.be.an('array').that.has.lengthOf(0);
        model.findByInterval(remoteId, now + 15000, now + 20000)
          .should.be.an('array').that.has.lengthOf(0);
        model.findByInterval(remoteId, now - 4000, now - 2000)
          .should.be.an('array').that.has.lengthOf(0);
      });
    });
  });
});
