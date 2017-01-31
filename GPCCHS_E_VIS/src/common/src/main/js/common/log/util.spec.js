require('../utils/test');

const {
  bytesConverter,
  parseParams,
  parseConfig,
} = require('./util');

describe('log/utils', () => {
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

  it('bytesConverter', () => {
    bytesConverter('1000').should.eql('1000 bytes');
    bytesConverter('1000000').should.eql('976.6 kB (1000000 bytes)');
    bytesConverter('10000000').should.eql('9.5 MB (10000000 bytes)');
  });
});
