const globalConstants = require('common/constants');
const { v4 } = require('uuid');
const path = require('path');

const {
  startWS,
  stopWS,
  resetDataCallbacks,
  startHSSAndDC,
  stopHSSAndDC,
  getMatchSnapshot,
  addDataCallback,
} = require('./util');

// HSS specific PORT for tests
describe('domain', function () { // eslint-disable-line func-names
  this.slow(500);
  this.timeout(10000);

  const matchSnapshot = getMatchSnapshot(
    this,
    path.join(
      __dirname,
      'fixture',
      path.parse(__filename).name
    )
  );

  before(() => startHSSAndDC().then((processes) => {
    this.processes = processes;
  }));

  after(() => stopHSSAndDC(this.processes));

  beforeEach(() => {
    resetDataCallbacks();

    return startWS().then((ws) => {
      this.ws = ws;
    });
  });

  afterEach((done) => {
    stopWS(this.ws).then(() => done());
  });

  it('EVENT_DOMAIN_QUERY', (done) => {
    this.ws.write({
      event: globalConstants.EVENT_DOMAIN_QUERY,
      queryId: v4(),
    });

    addDataCallback((actual) => {
      delete actual.queryId; // eslint-disable-line no-param-reassign
      matchSnapshot(actual);
      done();
    });
  });
});
