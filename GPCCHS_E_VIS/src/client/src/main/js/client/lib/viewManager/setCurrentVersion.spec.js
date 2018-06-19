import setCurrentVersion from 'viewManager/setCurrentVersion';

jest.mock('common/configurationManager', () => ({
  get: () => 'MyVersion',
}));

describe('viewManager/commonOutput', () => {
  it('should set version if not already defined', () => {
    const props = {
      foo: 'foo',
      bar: 'bar',
    };
    expect(setCurrentVersion(props)).toEqual({
      foo: 'foo',
      bar: 'bar',
      version: 'MyVersion',
    });
  });
  it('should override version if already defined', () => {
    const props = {
      foo: 'foo',
      bar: 'bar',
      version: 'OldVersion',
    };
    expect(setCurrentVersion(props)).toEqual({
      foo: 'foo',
      bar: 'bar',
      version: 'MyVersion',
    });
  });
});
