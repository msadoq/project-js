const fetch = require('node-fetch'); // eslint-disable-line import/no-extraneous-dependencies
const globalConstants = require('common/constants'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path');
const {
  getQuery,
  getDataMap,
} = require('./fixture/data');
const {
  startWS,
  stopWS,
  addDataCallback,
  resetDataCallbacks,
  startHSS,
  stopHSS,
  getMatchSnapshot,
} = require('./util');

// HSS specific PORT for tests
describe('timebased query', function () { // eslint-disable-line func-names
  this.slow(500);
  this.timeout(3000);

  const matchSnapshot = getMatchSnapshot(
    this,
    path.join(
      __dirname,
      'fixture',
      path.parse(__filename).name
    )
  );

  // Do a event timebased query and check response
  this.testTimeBaseQuery = ({
    parameterName = 'TMMGT_BC_VIRTCHAN3',
    start = Date.now() - (60 * 1000),
    end = start + (60 * 1000),
    assert = false,
    structureType,
    filters,
  } = {}) => {
    const self = this;
    return new Promise((resolve) => {
      const query = getQuery(parameterName, [[start, end]], structureType, filters);

      self.ws.write({
        event: globalConstants.EVENT_TIMEBASED_QUERY,
        payload: query,
      });

      const hwInterval = setInterval(() => {
        self.ws.write({
          event: globalConstants.EVENT_PULL,
        });
      }, 100);

      const removeCb = addDataCallback((actual) => {
        if (Object.keys(actual.payload).length) {
          try {
            // eslint-disable-next-line
            assert && matchSnapshot(actual);
          } finally {
            clearInterval(hwInterval);
            removeCb();
            resolve(actual);
          }
        }
      });
    });
  };

  // Return HSS state
  this.getHSSState = () => fetch(`${process.env.E2E_URL}:${process.env.PORT}/debug/all`)
    .then(r => r.json());

  // Test HSS state
  this.checkHHSState = () => this.getHSSState()
  .then((actual) => {
    // eslint-disable-next-line
    actual.connectedData[0] && delete actual.connectedData[0].meta.created;
    // eslint-disable-next-line
    actual.subscriptions[0] && delete actual.subscriptions[0].meta.created;
    matchSnapshot(actual);
  });

  // Returns a promise resolved when HSS update his cache
  this.waitHSSUpdate = () =>
    new Promise((r) => {
      if (this.noSpecificHSS) {
        setTimeout(() => r(), 1000);
      }

      const hw = setInterval(() => {
        if (this.updateCount) {
          this.updateCount -= 1;
          clearInterval(hw);
          r();
        }
      }, 100);
    });

  before((done) => {
    startHSS().then((hss) => {
      if (!hss) {
        this.noSpecificHSS = true;
      }
      if (hss) {
        this.hss = hss;

        hss.on('message', (msg) => {
          if (msg === 'updated') {
            this.updateCount += 1;
          }
        });
      }

      done();
    });
  });

  after((done) => {
    stopHSS(this.hss).then(done);
  });

  beforeEach((done) => {
    resetDataCallbacks();
    this.updateCount = 0;
    startWS().then((ws) => {
      this.ws = ws;
      done();
    });
  });

  afterEach((done) => {
    stopWS(this.ws).then(() => done());
  });

  it('1 last query : value on current time', () => {
    const now = (new Date(2016, 10, 22)).getTime();
    const start = now - (60 * 1000);
    const end = start + (2 * 1000);

    return this.testTimeBaseQuery({
      start,
      end,
      structureType: 'last',
      assert: true,
      filters: [{
        fieldName: 'monitoringState',
        type: 1,
        fieldValue: 'nominal',
      }],
    }).then((r) => {
      const val = r.payload['last@Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:monitoringState.!=.nominal'];
      const keys = Object.keys(val);
      keys.should.have.length(1);
      keys[0].should.deep.equal(''.concat(end));
    });
  });
  it('1 last query: value less than current time', () => {
    const now = (new Date(2016, 10, 22)).getTime();
    const start = (now - (60 * 1000)) + 5;
    const end = start + (2 * 1000) + 50;

    return this.testTimeBaseQuery({
      start,
      end,
      structureType: 'last',
      assert: true,
      filters: [{
        fieldName: 'monitoringState',
        type: 1,
        fieldValue: 'nominal',
      }],
    }).then((r) => {
      const val = r.payload['last@Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:monitoringState.!=.nominal'];
      const keys = Object.keys(val);
      keys.should.have.length(1);
      const current = start + (2 * 1000);
      keys[0].should.deep.equal(''.concat(current));
    });
  });

  it('1 range query', () => {
    const now = (new Date(2016, 10, 22)).getTime();
    const start = now - (60 * 1000);
    const end = start + (2 * 1000);

    return this.testTimeBaseQuery({ start, end, assert: true });
  });

  it('2 range queries with overlap intervals. Second one is after', () => {
    const now = (new Date(2016, 10, 22)).getTime();
    const start = now - (60 * 1000);
    const end = start + (4 * 1000);

    return this.testTimeBaseQuery({ start, end })
      .then(() => this.waitHSSUpdate())
      .then(() => this.checkHHSState())
      .then(() =>
        this.testTimeBaseQuery({
          start: start + (2 * 1000),
          end: end + (2 * 1000),
        }))
      .then(() => this.waitHSSUpdate())
      .then(() => this.checkHHSState());
  });

  it('2 range queries with overlap intervals. Second one is before', () => {
    const now = (new Date(2016, 10, 22)).getTime();
    const start = now - (60 * 1000);
    const end = start + (4 * 1000);

    return this.testTimeBaseQuery({ start, end })
      .then(() => this.waitHSSUpdate())
      .then(() => this.checkHHSState())
      .then(() =>
        this.testTimeBaseQuery({
          start: start - (2 * 1000),
          end: end - (2 * 1000),
        }))
      .then(() => this.waitHSSUpdate())
      .then(() => this.checkHHSState());
  });

  it('2 range queries with overlap intervals. Second one is inside first one', () => {
    const now = (new Date(2016, 10, 22)).getTime();
    const start = now - (60 * 1000);
    const end = start + (4 * 1000);

    return this.testTimeBaseQuery({ start, end })
      .then(() => this.waitHSSUpdate())
      .then(() => this.checkHHSState())
      .then(() =>
        this.testTimeBaseQuery({
          start: start + (1 * 1000),
          end: start + (2 * 1000),
        }))
      .then(() => this.checkHHSState());
  });

  it('2 range queries with overlap intervals. First one is inside second one', () => {
    const now = (new Date(2016, 10, 22)).getTime();
    const start = now - (60 * 1000);
    const end = start + (4 * 1000);

    return this.testTimeBaseQuery({ start, end })
      .then(() => this.waitHSSUpdate())
      .then(() => this.checkHHSState())
      .then(() =>
        this.testTimeBaseQuery({
          start: start - (3 * 1000),
          end: end + (3 * 1000),
        }))
      .then(() => this.waitHSSUpdate())
      .then(() => this.checkHHSState());
  });

  it('2 range queries with apart intervals. Second one is after', () => {
    const now = (new Date(2016, 10, 22)).getTime();
    const start = now - (60 * 1000);
    const end = start + (4 * 1000);

    return this.testTimeBaseQuery({ start, end })
      .then(() => this.waitHSSUpdate())
      .then(() => this.checkHHSState())
      .then(() =>
        this.testTimeBaseQuery({
          start: end + (2 * 1000),
          end: end + (5 * 1000),
        }))
      .then(() => this.waitHSSUpdate())
      .then(() => this.checkHHSState());
  });

  it('2 range queries with apart intervals. Second one is before', () => {
    const now = (new Date(2016, 10, 22)).getTime();
    const start = now - (60 * 1000);
    const end = start + (4 * 1000);

    return this.testTimeBaseQuery({ start, end })
      .then(() => this.waitHSSUpdate())
      .then(() => this.checkHHSState())
      .then(() =>
        this.testTimeBaseQuery({
          start: start - (5 * 1000),
          end: start - (2 * 1000),
        }))
      .then(() => this.waitHSSUpdate())
      .then(() => this.checkHHSState());
  });

  it('EVENT_TIMEBASED_QUERY_INVALIDATION (all)', () => {
    const now = (new Date(2016, 10, 22)).getTime();
    const self = this;
    const start = now - (60 * 1000);
    const end = start + (2 * 1000);

    return this.testTimeBaseQuery({ start, end })
      .then(() => {
        self.ws.write({
          event: globalConstants.EVENT_TIMEBASED_QUERY_INVALIDATION,
          payload: {},
        });
      })
      .then(() => this.checkHHSState());
  });

  it('EVENT_TIMEBASED_QUERY_INVALIDATION (partial)', () => {
    const now = (new Date(2016, 10, 22)).getTime();
    const start = now - (60 * 1000);
    const end = start + (2 * 1000);
    const parameterName = 'TMMGT_BC_VIRTCHAN3';
    const self = this;

    return this.testTimeBaseQuery({ start, end })
      .then(() => this.checkHHSState())
      .then(() => {
        self.ws.write({
          event: globalConstants.EVENT_TIMEBASED_QUERY_INVALIDATION,
          payload: getDataMap(parameterName, [start, start + (1 * 1000)]),
        });
      })
      .then(() => this.checkHHSState());
  });
});
