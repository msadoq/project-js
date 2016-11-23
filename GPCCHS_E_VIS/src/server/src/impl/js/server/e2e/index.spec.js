const fetch = require('node-fetch'); // eslint-disable-line import/no-extraneous-dependencies
const globalConstants = require('common/constants'); // eslint-disable-line import/no-extraneous-dependencies
const {
  getDomain,
  getSession,
  getQuery,
  getTimebasedData,
  getDataMap,
} = require('./fixture/data');
const {
  startWS,
  stopWS,
  addDataCallback,
  resetDataCallbacks,
  startHSS,
  stopHSS,
} = require('./util');

// HSS specific PORT for tests
describe('e2e tests', function () { // eslint-disable-line func-names
  this.slow(500);
  this.timeout(10000);

  // Do a event timebased query and check response
  this.testTimeBaseQuery = ({
    parameterName = 'TMMGT_BC_VIRTCHAN3',
    start = Date.now() - (60 * 1000),
    end = start + (60 * 1000),
  } = {}) => {
    const self = this;
    return new Promise((resolve) => {
      const query = getQuery(parameterName, [[start, end]]);

      self.ws.write({
        event: globalConstants.EVENT_TIMEBASED_QUERY,
        payload: query,
      });

      const expected = getTimebasedData(
        parameterName,
        start,
        end,
        Object.keys(query)[0]
      );

      const hwInterval = setInterval(() => {
        self.ws.write({
          event: globalConstants.EVENT_PULL,
        });
      }, 100);

      const removeCb = addDataCallback((actual) => {
        if (Object.keys(actual.payload).length) {
          try {
            actual.should.have.properties(expected);
          } finally {
            clearInterval(hwInterval);
            removeCb();
            resolve(actual);
          }
        }
      });
    });
  };

  before((done) => {
    startHSS().then((hss) => {
      this.hss = hss;
      done();
    });
  });

  after((done) => {
    stopHSS(this.hss).then(done);
  });

  beforeEach((done) => {
    resetDataCallbacks();
    startWS().then((ws) => {
      this.ws = ws;
      done();
    });
  });

  afterEach((done) => {
    stopWS(this.ws).then(() => done());
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

  it('EVENT_TIMEBASED_DATA', (done) => {
    this.testTimeBaseQuery().then(() => done());
  });

  it('EVENT_TIMEBASED_QUERY_INVALIDATION (all)', (done) => {
    const now = Date.now();
    const self = this;
    const start = now - (60 * 1000);
    const end = now;

    this.testTimeBaseQuery({ start, end })
    .then(() => {
      const expected = { connectedData: [], subscriptions: [], timebasedData: {} };

      self.ws.write({
        event: globalConstants.EVENT_TIMEBASED_QUERY_INVALIDATION,
        payload: {},
      });

      fetch(`${process.env.E2E_URL}:${process.env.PORT}/debug/all`)
        .then(r => r.json())
        .then((actual) => {
          try {
            actual.should.have.properties(expected);
            done();
          } catch (e) {
            done(e);
          }
        });
    });
  });

  it('EVENT_TIMEBASED_QUERY_INVALIDATION (partial)', (done) => {
    const now = (new Date(2016, 10, 22)).getTime();
    const start = now - (60 * 1000);
    const end = now;
    const parameterName = 'TMMGT_BC_VIRTCHAN3';
    const self = this;

    this.testTimeBaseQuery({ start, end })
    .then(() => {
      self.ws.write({
        event: globalConstants.EVENT_TIMEBASED_QUERY_INVALIDATION,
        payload: getDataMap(parameterName, [start, start + (30 * 1000)]),
      });

      fetch(`${process.env.E2E_URL}:${process.env.PORT}/debug/all`)
        .then(r => r.json())
        .then((actual) => {
          // eslint-disable-next-line global-require, import/no-dynamic-require
          const expected = require(`./fixture/${self.ctx.test.title}.js`);

          try {
            actual.should.have.properties(expected);
            done();
          } catch (e) {
            done(e);
          }
        });
    });
  });
});
