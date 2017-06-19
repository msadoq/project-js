const {
  bytesConverter,
  parseParams,
  parseConfig,
} = require('./util');

describe('logManager/utils', () => {
  test('parseParams', () => {
    const params = 'param1=value1,param2=value2';
    expect(parseParams(params)).toMatchObject({
      param1: 'value1',
      param2: 'value2',
    });
  });
  test('parseConfig (empty)', () => {
    expect(parseConfig('')).toHaveLength(0);
  });
  test('parseConfig', () => {
    const cfg = 'logger1?param1=value1,param2=value2:logger2?param1=value1';
    expect(parseConfig(cfg)).toHaveLength(2);
    expect(parseConfig(cfg)[0]).toMatchObject({
      params: {
        param1: 'value1',
        param2: 'value2',
      },
      type: 'logger1',
    });
    expect(parseConfig(cfg)[1]).toMatchObject({
      params: {
        param1: 'value1',
      },
      type: 'logger2',
    });
  });
  test('bytesConverter', () => {
    expect(bytesConverter('1000')).toEqual('1000 bytes');
    expect(bytesConverter('1000000')).toEqual('976.6 kB (1000000 bytes)');
    expect(bytesConverter('10000000')).toEqual('9.5 MB (10000000 bytes)');
  });
});
