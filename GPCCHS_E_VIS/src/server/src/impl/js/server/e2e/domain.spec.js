const globalConstants = require('common/constants'); // eslint-disable-line import/no-extraneous-dependencies
const {
  getDomain,
} = require('./fixture/data');
const {
  startWS,
  stopWS,
  resetDataCallbacks,
  startHSS,
  stopHSS,
} = require('./util');

// HSS specific PORT for tests
describe('domain', function () { // eslint-disable-line func-names
  this.slow(500);
  this.timeout(10000);

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
});
