require('../utils/test');
const {
  parseParams,
  parseConfig,
  getStdOptions,
  getMonitoringOptions,
} = require('./node');

describe('log/node', () => {
  it('parseParams', () => {
    const params = 'param1=value1,param2=value2';
    parseParams(params).should.have.properties({
      param1: 'value1',
      param2: 'value2',
    });
  });
  it('parseConfig (empty)', () => {
    parseConfig('').should.have.lengthOf(0);
  });
  it('parseConfig', () => {
    const cfg = 'logger1?param1=value1,param2=value2:logger2?param1=value1';
    parseConfig(cfg).should.have.lengthOf(2);
    parseConfig(cfg)[0].should.have.properties({
      params: {
        param1: 'value1',
        param2: 'value2',
      },
      type: 'logger1',
    });
    parseConfig(cfg)[1].should.have.properties({
      params: {
        param1: 'value1',
      },
      type: 'logger2',
    });
  });
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
