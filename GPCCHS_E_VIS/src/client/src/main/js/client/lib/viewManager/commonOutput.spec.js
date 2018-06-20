import commonOutput from 'viewManager/commonOutput';
import _set from 'lodash/set';
import _omit from 'lodash/omit';
import { VM_COMMON_PROPERTIES } from './constants';

describe('viewManager/commonOutput', () => {
  it('should remove unwanted properties', () => {
    const props = {
      foo: 'foo',
      bar: 'bar',
    };
    expect(commonOutput(props)).toEqual({});
  });
  it('should keep common properties and remove unwanted ones', () => {
    const props = {
      foo: 'foo',
      bar: 'bar',
    };
    VM_COMMON_PROPERTIES.map(key => _set(props, key, key));
    expect(commonOutput(props)).toEqual({
      ..._omit(props, ['foo', 'bar']),
    });
  });
  it('should keep common properties, configuration and remove unwanted ones', () => {
    const props = {
      foo: 'foo',
      bar: 'bar',
      configuration: {
        baz: 'baz',
      },
    };
    expect(commonOutput(props)).toEqual({
      baz: 'baz',
    });
  });
});
