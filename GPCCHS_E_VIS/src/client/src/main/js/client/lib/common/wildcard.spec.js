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
