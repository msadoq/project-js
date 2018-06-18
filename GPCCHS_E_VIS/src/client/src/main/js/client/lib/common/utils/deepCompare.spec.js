import deepCompare from './deepCompare';

describe('deepCompare', () => {
  const source = { a: { b: 'truc', d: 'machin' }, c: 'bidule' };
  test('should return an empty object if X is deepCompared to itself', () => {
    expect(deepCompare(source, source)).toEqual({});
  });
  test('should return source if compared to an empty object', () => {
    expect(deepCompare(source, {})).toEqual(source);
  });
  test('should return diffs', () => {
    expect(deepCompare(source, { c: 'bidule' })).toEqual({ a: { b: 'truc', d: 'machin' } });

    expect(deepCompare(source, { a: { d: 'machin' }, c: 'bidule' })).toEqual({ a: { b: 'truc' } });
  });
});
