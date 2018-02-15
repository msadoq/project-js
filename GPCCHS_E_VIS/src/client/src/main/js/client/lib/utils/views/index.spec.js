import _cloneDeep from 'lodash/cloneDeep';
import { applyDefaultValues } from '.';

describe('applyDefaultvalues', () => {
  test('generates no mutation of the source object', () => {
    const source = { connectedData: { unit: 'Celsius degree' } };
    const cloneSource = _cloneDeep(source);

    applyDefaultValues(source, { name: 'truc', connectedData: { value: 4 } });

    expect(source).toEqual(cloneSource);
  });

  test('applies default values for not defined attributes, dealing with nested attributes', () => {
    const source = { connectedData: { unit: 'Celsius degree' } };
    const merged = applyDefaultValues(source, { name: 'truc', connectedData: { value: 4 } });

    expect(merged).toEqual({
      name: 'truc',
      connectedData: {
        unit: 'Celsius degree',
        value: 4,
      },
    });
  });
});
