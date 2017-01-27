require('../utils/test');
const {
  getStdOptions,
  getMonitoringOptions,
} = require('./node');

describe('log/node', () => {
  it('getStdOptions', () => {
    getStdOptions({
      message: 'foo',
      meta: {
        time: '100',
        pid: 1000,
        pname: 'Test',
        foo: 'bar',
      },
      formatter: () => '',
    }).should.eql({
      message: 'foo +100',
      meta: {
        foo: 'bar',
      },
    });
  });
  it('getMonitoringOptions', () => {
    const log = getMonitoringOptions({
      message: 'foo',
      meta: {
        latency: {
          time: 100,
          avg: 100,
        },
        memUsage: {
          rss: 1000,
          heapTotal: 500,
          heapUsed: 400,
        },
        pid: 1000,
        pname: 'Test',
        foo: 'bar',
      },
      formatter: () => '',
    });

    log.should.have.all.keys(['meta', 'message']);
    log.meta.should.have.all.keys(['foo']);
    log.meta.should.eql({ foo: 'bar' });
  });
});
