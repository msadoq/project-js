const fetch = require('node-fetch'); // eslint-disable-line import/no-extraneous-dependencies
const cp = require('child_process');
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

// HSS specific PORT for tests
describe('e2e tests', function () { // eslint-disable-line func-names
  this.slow(500);
  this.timeout(10000);

  // If E2E_URL is not defined, HSS server is started
  const startHSS = !process.env.E2E_URL;
  const PORT = startHSS ? 3001 : process.env.PORT;

  process.env.E2E_URL = process.env.E2E_URL || 'http://localhost';
  process.env.PORT = PORT;

  // Array of callbacks triggered on ws.on('data')
  this.onDataCallbacks = [];

  // start WS connection to HSS
  this.startWS = () => { // eslint-disable-line arrow-body-style
    return new Promise((resolve) => {
      this.ws = new Primus(testUtils.e2eUrl());
      this.ws.on('open', () => {
        this.ws.on('data', (...args) => {
          this.onDataCallbacks.forEach(cb => cb(...args));
        });
        resolve();
      });
    });
  };

  // stop WS connection to HSS
  this.stopWS = () => Promise.resolve(this.ws.end());

  // Add a callback to onDataCallbacks array. They are called on this.on('data') event
  this.addDataCallback = (cb) => {
    const i = this.onDataCallbacks.push(cb);
    // Returns function to remove callback from onDataCallbacks array
    return () => this.onDataCallbacks.splice(i - 1, 1);
  };

  // Start HSS
  this.startHSS = () => { // eslint-disable-line arrow-body-style
    return new Promise((resolve) => {
      this.hss = cp.fork('index.js', [], {
        silent: true, // disable stdin, stdout, stderr
        env: {
          PORT,
          RUN_BY_MOCHA: 'true',
          ZMQ_GPCCDC_PUSH: 'tcp://127.0.0.1:5043', // use different port from standard HSS
          ZMQ_GPCCDC_PULL: 'tcp://127.0.0.1:49166', // use different port from standard HSS
        },
      });
      this.hss.on('message', () => resolve());
    });
  };

  // Stop HSS
  this.stopHSS = () => { // eslint-disable-line arrow-body-style
    return new Promise((resolve) => {
      if (this.hss) {
        this.hss.kill();
        resolve();
      }
    });
  };

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

      const removeCb = self.addDataCallback((actual) => {
        if (Object.keys(actual.payload).length) {
          try {
            actual.should.have.properties(expected);
          } finally {
            clearInterval(hwInterval);
            removeCb();
            resolve();
          }
        }
      });
    });
  };

  before((done) => {
    if (!startHSS) {
      done();
      return;
    }
    this.startHSS().then(done);
  });

  after((done) => {
    this.stopHSS().then(done);
  });

  beforeEach((done) => {
    this.onDataCallbacks = [];
    this.startWS().then(done);
  });

  afterEach((done) => {
    this.stopWS().then(() => done());
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
});
