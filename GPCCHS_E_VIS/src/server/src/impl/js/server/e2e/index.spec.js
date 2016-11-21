const testUtils = require('../lib/utils/test');

const Primus = require('common/websocket'); // eslint-disable-line import/no-extraneous-dependencies
const globalConstants = require('common/constants'); // eslint-disable-line import/no-extraneous-dependencies
const {
  getDomain,
  getSession,
  getQuery,
  getEmptyTimebasedData,
  getTimebasedData,
} = require('./fixture/data');

describe('e2e tests', function () { // eslint-disable-line func-names
  this.timeout(10000);

  beforeEach((done) => {
    this.ws = new Primus(testUtils.e2eUrl);
    this.ws.on('open', () => {
      done();
    });
  });

  afterEach(() => {
    this.ws.end();
  });

  it('EVENT_DOMAIN_QUERY', (done) => {
    const domain = getDomain();

    this.ws.write({
      event: globalConstants.EVENT_DOMAIN_QUERY,
      queryId: domain.queryId,
    });

    this.ws.on('data', (data) => {
      data.should.have.properties(domain);
      done();
    });
  });

  it('EVENT_SESSION_QUERY', (done) => {
    const session = getSession();

    this.ws.write({
      event: globalConstants.EVENT_SESSION_QUERY,
      queryId: session.queryId,
    });

    this.ws.on('data', (data) => {
      data.should.have.properties(session);
      done();
    });
  });

  it('EVENT_TIMEBASED_DATA (without query)', (done) => {
    this.ws.write({
      event: globalConstants.EVENT_PULL,
    });

    this.ws.on('data', (data) => {
      data.should.have.properties(getEmptyTimebasedData());
      done();
    });
  });

  it('EVENT_TIMEBASED_DATA', (done) => {
    const parameterName = 'TMMGT_BC_VIRTCHAN3';
    const start = Date.now();
    const end = Date.now() * 60 * 1000;
    const query = getQuery(parameterName, [[start, end]]);

    this.ws.write({
      event: globalConstants.EVENT_TIMEBASED_QUERY,
      payload: query,
    });

    const timebasedData = getTimebasedData(
      parameterName,
      start,
      end,
      Object.keys(query)[0]
    );

    setInterval(() => {
      this.ws.write({
        event: globalConstants.EVENT_PULL,
      });
    }, 100);

    this.ws.on('data', (data) => {
      if (Object.keys(data.payload).length) {
        data.should.have.properties(timebasedData);
        done();
      }
    });
  });
});
