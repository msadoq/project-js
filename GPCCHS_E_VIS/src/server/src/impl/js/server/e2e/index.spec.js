const testUtils = require('../lib/utils/test');

const Primus = require('common/websocket'); // eslint-disable-line import/no-extraneous-dependencies
const cp = require('child_process');
const globalConstants = require('common/constants'); // eslint-disable-line import/no-extraneous-dependencies
const {
  getDomain,
  getSession,
  getQuery,
  getEmptyTimebasedData,
  getTimebasedData,
} = require('./fixture/data');

// HSS specific PORT for tests
describe('e2e tests', function () { // eslint-disable-line func-names
  this.slow(500);
  this.timeout(10000);

  // If E2E_URL is not defined, HSS server is started
  const startHSS = !process.env.E2E_URL;
  const PORT = startHSS ? 3001 : process.env.PORT;

  process.env.E2E_URL = process.env.E2E_URL || 'http://localhost';
  process.env.PORT = PORT;

  before((done) => {
    if (!startHSS) {
      done();
      return;
    }
    this.hss = cp.fork('index.js', [], {
      silent: true,
      env: {
        PORT,
        RUN_BY_MOCHA: 'true',
        ZMQ_GPCCDC_PUSH: 'tcp://127.0.0.1:5043',
        ZMQ_GPCCDC_PULL: 'tcp://127.0.0.1:49166',
      },
    });
    this.hss.on('message', () => done());
  });

  after(() => {
    if (this.hss) {
      this.hss.kill();
    }
  });

  beforeEach((done) => {
    this.ws = new Primus(testUtils.e2eUrl());
    this.ws.on('open', () => {
      done();
    });
  });

  afterEach(() => {
    if (this.hwInterval) {
      clearInterval(this.hwInterval);
      this.hwInterval = undefined;
    }
    this.ws.end();
  });

  it('EVENT_DOMAIN_QUERY', (done) => {
    const expected = getDomain();

    this.ws.write({
      event: globalConstants.EVENT_DOMAIN_QUERY,
      queryId: expected.queryId,
    });

    this.ws.on('data', (actual) => {
      actual.should.have.properties(expected);
      done();
    });
  });

  it('EVENT_SESSION_QUERY', (done) => {
    const expected = getSession();

    this.ws.write({
      event: globalConstants.EVENT_SESSION_QUERY,
      queryId: expected.queryId,
    });

    this.ws.on('data', (actual) => {
      actual.should.have.properties(expected);
      done();
    });
  });

  it('EVENT_TIMEBASED_DATA (without query)', (done) => {
    const expected = getEmptyTimebasedData();

    this.ws.write({
      event: globalConstants.EVENT_PULL,
    });

    this.ws.on('data', (actual) => {
      actual.should.have.properties(expected);
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

    const expected = getTimebasedData(
      parameterName,
      start,
      end,
      Object.keys(query)[0]
    );

    this.hwInterval = setInterval(() => {
      this.ws.write({
        event: globalConstants.EVENT_PULL,
      });
    }, 100);

    this.ws.on('data', (actual) => {
      if (Object.keys(actual.payload).length) {
        actual.should.have.properties(expected);
        done();
      }
    });
  });
});
