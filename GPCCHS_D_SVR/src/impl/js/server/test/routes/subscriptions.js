const debug = require('../../lib/io/debug')('test:routes:subscriptions');
const {
  chai,
  request,
  expressApp,
} = require('../utils');

describe('POST API subscriptions', () => {
  it('not found', (done) => {
    request(expressApp)
      .post('/subscriptions')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Accept', 'application/vnd.api+json')
      .send(JSON.stringify({}))
      .expect('Content-Type', /json/)
      .expect(res => {
        const body = res.body;
        body.should.be.an('object').that.not.have.property('data');
        body.should.have.a.property('errors')
          .that.is.an('array')
          .and.have.lengthOf(1);
        body.errors[0].should.be.an('object').that.has.properties({
          status: 404,
          title: 'Not Found',
        });
      })
      .expect(404, done);
  });
  it('without dataFullName', (done) => {
    request(expressApp)
      .post('/api/subscriptions')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Accept', 'application/vnd.api+json')
      .send(JSON.stringify({}))
      .expect('Content-Type', /json/)
      .expect(res => {
        const body = res.body;
        body.should.be.an('object').that.not.have.property('data');
        body.should.have.a.property('errors')
          .that.is.an('array')
          .and.have.lengthOf(1);
        body.errors[0].should.be.an('object').that.has.properties({
          status: 400,
          title: 'dataFullName parameter required',
          source: {
            pointer: '/body/dataFullName',
          },
        });
      })
      .expect(400, done);
  });
  it('works', (done) => {
    request(expressApp)
      .post('/api/subscriptions')
      .set('Content-Type', 'application/vnd.api+json')
      .set('Accept', 'application/vnd.api+json')
      .send({
        dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
        field: 'rawValue',
        domainId: 0,
        timeLineType: 'session',
        sessionId: 1,
        setFileName: '',
        subscriptionState: 'play',
        visuSpeed: 0,
        visuWindow: {
          lower: 0,
          upper: 42,
        },
        filter: [
          {
            dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
            field: 'rawValue',
            operator: 'OP_GT',
            value: 25,
          }, {
            dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
            field: 'rawValue',
            operator: 'OP_LT',
            value: 75,
          },
        ],
      })
      .expect('Content-Type', /json/)
      .expect(res => {
        const body = res.body;
        body.should.be.an('object').and.have.property('subscriptionId', 1);
      })
      .expect(200, done);
  });
});
