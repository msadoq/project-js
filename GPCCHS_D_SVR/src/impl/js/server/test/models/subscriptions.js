require('../../lib/utils/test');
const model = require('../../lib/models/subscriptions');
const { getSubscription } = require('../../lib/utils/stubData');

describe('models/subscriptions', () => {
  beforeEach(() => {
    model.clear();
  });

  describe('retrieveByMeta', () => {
    const now = Date.now();
    const query = {
      catalog: 'Reporting',
      parameter: 'ATT_BC_STR1VOLTAGE',
      type: 'ReportingParameter',
      timestamp: now,
      session: 100,
    };
    it('empty', () => {
      const records = model.retrieveByMeta(query);
      records.should.be.an('array').that.has.lengthOf(0);
    });
    it('filtered multiple and get correct results', () => {
      model.insert(getSubscription());
      model.insert(getSubscription());
      model.insert(getSubscription({
        dataFullName: 'Other.ATT_BC_STR1STRRFQ1<ReportingParameter>',
      }));
      const records = model.retrieveByMeta(query);
      records.should.be.an('array').that.has.lengthOf(2);
      records[0]
        .should.have.property('dataFullName', 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>');
      records[1]
        .should.have.property('dataFullName', 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>');
    });
    it('filter on catalog', () => {
      model.insert(getSubscription());
      model.insert(getSubscription({
        dataFullName: 'Other.ATT_BC_STR1STRRFQ1<ReportingParameter>',
      }));
      const records = model.retrieveByMeta(query);
      records.should.be.an('array').that.has.lengthOf(1);
      records[0].dataFullName.should.equal('Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>');
    });
    it('filter on parameter', () => {
      model.insert(getSubscription());
      model.insert(getSubscription({
        dataFullName: 'Other.ATT_BC_STR1STRRFQ1<ReportingParameter>',
      }));
      const records = model.retrieveByMeta(query);
      records.should.be.an('array').that.has.lengthOf(1);
      records[0].dataFullName.should.equal('Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>');
    });
    it('filter on session', () => {
      model.insert(getSubscription());
      model.insert(getSubscription({
        sessionId: 200,
      }));
      const records = model.retrieveByMeta(query);
      records.should.be.an('array').that.has.lengthOf(1);
      records[0].sessionId.should.equal(100);
    });
    describe('filter on timestamp', () => {
      beforeEach(() => {
        model.insert(getSubscription({
          id: 'sub1',
          visuWindow: {
            lower: now - 60000,
            upper: now - 30000,
          },
        }));
        model.insert(getSubscription({
          id: 'sub2',
          visuWindow: {
            lower: now - 30000,
            upper: now + 30000,
          },
        }));
        model.insert(getSubscription({
          id: 'sub3',
          visuWindow: {
            lower: now + 30000,
            upper: now + 60000,
          },
        }));
      });

      it('first', () => {
        const record = model.retrieveByMeta(Object.assign({}, query, { timestamp: now - 45000 }));
        record.should.be.an('array').that.has.lengthOf(1);
        record[0].id.should.equal('sub1');
      });
      it('middle', () => {
        const record = model.retrieveByMeta(Object.assign({}, query, { timestamp: now }));
        record.should.be.an('array').that.has.lengthOf(1);
        record[0].id.should.equal('sub2');
      });
      it('last', () => {
        const record = model.retrieveByMeta(Object.assign({}, query, { timestamp: now + 45000 }));
        record.should.be.an('array').that.has.lengthOf(1);
        record[0].id.should.equal('sub3');
      });
      it('nothing', () => {
        const record = model.retrieveByMeta(Object.assign({}, query, { timestamp: now + 90000 }));
        record.should.be.an('array').that.has.lengthOf(0);
      });
    });
  });
});
