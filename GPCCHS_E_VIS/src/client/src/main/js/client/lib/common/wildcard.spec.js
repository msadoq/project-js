// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// END-HISTORY
// ====================================================================

import { detect, generate } from './wildcard';

describe('connectedData/wildcard', () => {
  describe('detect', () => {
    test('no wildcard', () => {
      expect(detect('')).toBe(false);
      expect(detect(undefined)).toBe(false);
      expect(detect('foo')).toBe(false);
      expect(detect('foo.bar')).toBe(false);
    });
    test('wildcard', () => {
      expect(detect('*')).toBe(true);
      expect(detect('?')).toBe(true);
      expect(detect('foo?')).toBe(true);
      expect(detect('foo*')).toBe(true);
      expect(detect('foo*bar?')).toBe(true);
    });
  });
  describe('generate', () => {
    test('returns regexp', () => {
      expect(generate('*')).toBeInstanceOf(RegExp);
      expect(generate('foo')).toBeInstanceOf(RegExp);
      expect(generate()).toBeInstanceOf(RegExp);
      expect(generate('')).toBeInstanceOf(RegExp);
    });
    test('works', () => {
      expect(generate('fo?').test('foo')).toBe(true);
      expect(generate('fo?o').test('fooo')).toBe(true);
      expect(generate('fo*').test('foooo')).toBe(true);
      expect(generate('fo*baz').test('foobarbaz')).toBe(true);
      expect(generate('fo?').test('fooo')).toBe(false);
      expect(generate('foo*').test('barfoo')).toBe(false);
    });
  });
});
