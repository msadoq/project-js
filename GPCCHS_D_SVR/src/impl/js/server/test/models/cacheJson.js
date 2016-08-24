require('../../lib/utils/test');
const model = require('../../lib/models/cacheJson');
const { getDcReportingParameter } = require('../../lib/utils/stub');

describe('models/cacheJson', () => {
  beforeEach(() => {
    model.clear();
  });

  describe('addRecord', () => {
    it('one', () => {
      model.addRecord({ metaField: 'foo' }, { dataField: 'text' });
      const records = model.find();
      records.should.be.an('array').that.has.lengthOf(1);
      records[0].should.be.an('object').with.properties({
        metaField: 'foo',
        jsonPayload: {
          dataField: 'text',
        },
      });
    });
    it('multi', () => {
      model.addRecord({ metaField: 'foo' }, { dataField: 'text1' });
      model.addRecord({ metaField: 'foo' }, { dataField: 'text2' });
      model.count().should.equal(2);
    });
  });
  describe('retrieveBySubscription', () => {
    const query = {
      catalog: 'Reporting',
      parameter: 'ATT_BC_STR1VOLTAGE',
      visuWindow: {
        lower: Date.now() - (3600 * 1000),
        upper: Date.now() + (3600 * 1000),
      },
      sessionId: 100,
      filter: [],
    };
    it('empty', () => {
      const records = model.retrieveBySubscription(query);
      records.should.be.an('array').that.has.lengthOf(0);
    });
    it('filtered multiple and get correct results', () => {
      const r1 = getDcReportingParameter();
      model.addRecord(r1.meta, r1.data);
      const r2 = getDcReportingParameter();
      model.addRecord(r2.meta, r2.data);
      const r3 = getDcReportingParameter({
        meta: {
          fullDataId: 'Other.ATT_BC_STR1STRRFQ1<ReportingParameter>',
        },
      });
      model.addRecord(r3.meta, r3.data);
      const records = model.retrieveBySubscription(query);
      records.should.be.an('array').that.has.lengthOf(2);
    });
    it('filter on catalog', () => {
      const r1 = getDcReportingParameter();
      model.addRecord(r1.meta, r1.data);
      const r2 = getDcReportingParameter({
        meta: {
          fullDataId: 'Other.ATT_BC_STR1STRRFQ1<ReportingParameter>',
        },
      });
      model.addRecord(r2.meta, r2.data);
      const records = model.retrieveBySubscription(query);
      records.should.be.an('array').that.has.lengthOf(1);
      records[0].fullDataId.should.equal('Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>');
    });
    it('filter on parameter', () => {
      const r1 = getDcReportingParameter();
      model.addRecord(r1.meta, r1.data);
      const r2 = getDcReportingParameter({
        meta: {
          fullDataId: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>',
        },
      });
      model.addRecord(r2.meta, r2.data);
      const records = model.retrieveBySubscription(query);
      records.should.be.an('array').that.has.lengthOf(1);
      records[0].fullDataId.should.equal('Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>');
    });
    it('filter on session', () => {
      const r1 = getDcReportingParameter();
      model.addRecord(r1.meta, r1.data);
      const r2 = getDcReportingParameter({
        meta: {
          session: 200,
        },
      });
      model.addRecord(r2.meta, r2.data);
      const records = model.retrieveBySubscription(query);
      records.should.be.an('array').that.has.lengthOf(1);
      records[0].session.should.equal(100);
    });
    describe('filter on timestamp', () => {
      const now = Date.now();
      beforeEach(() => {
        const r1 = getDcReportingParameter({ meta: { timestamp: now - 10000 } }); // 10s before
        const r2 = getDcReportingParameter({ meta: { timestamp: now } });
        const r3 = getDcReportingParameter({ meta: { timestamp: now + 10000 } }); // 10s after
        model.addRecord(r1.meta, r1.data);
        model.addRecord(r2.meta, r2.data);
        model.addRecord(r3.meta, r3.data);
      });

      it('all', () => {
        model.retrieveBySubscription(query)
          .should.be.an('array').that.has.lengthOf(3);
      });
      it('lasts', () => {
        model.retrieveBySubscription(Object.assign({}, query, {
          visuWindow: {
            lower: now - 5000,
            upper: now + 20000,
          },
        })).should.be.an('array').that.has.lengthOf(2);
      });
      it('firsts', () => {
        model.retrieveBySubscription(Object.assign({}, query, {
          visuWindow: {
            lower: now - 20000,
            upper: now + 5000,
          },
        })).should.be.an('array').that.has.lengthOf(2);
      });
      it('middle', () => {
        model.retrieveBySubscription(Object.assign({}, query, {
          visuWindow: {
            lower: now - 5000,
            upper: now + 5000,
          },
        })).should.be.an('array').that.has.lengthOf(1);
      });
      it('nothing', () => {
        model.retrieveBySubscription(Object.assign({}, query, {
          visuWindow: {
            lower: now - 20000,
            upper: now - 15000,
          },
        })).should.be.an('array').that.has.lengthOf(0);
        model.retrieveBySubscription(Object.assign({}, query, {
          visuWindow: {
            lower: now + 15000,
            upper: now + 20000,
          },
        })).should.be.an('array').that.has.lengthOf(0);
        model.retrieveBySubscription(Object.assign({}, query, {
          visuWindow: {
            lower: now - 4000,
            upper: now - 2000,
          },
        })).should.be.an('array').that.has.lengthOf(0);
      });
    });
  });
});
