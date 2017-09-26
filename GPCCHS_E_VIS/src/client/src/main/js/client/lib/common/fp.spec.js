// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Wrtie common/fp tests . .
// END-HISTORY
// ====================================================================

import { copyProp, moveProp } from './fp';

describe('common:fp', () => {
  describe('copyProp', () => {
    test('copy a simple prop', () => {
      expect(copyProp('a', 'b', { a: true })).toEqual({ a: true, b: true });
    });
    test('copy a deep src prop', () => {
      expect(copyProp('a.b.c', 'b', { a: { b: { c: true } } }))
        .toEqual({ a: { b: { c: true } }, b: true });
    });
    test('copy a simple src prop into a deep dest prop', () => {
      expect(copyProp('a', 'b.c.d', { a: true }))
        .toEqual({ a: true, b: { c: { d: true } } });
    });
    test('copy a deep src prop into a deep dest prop', () => {
      expect(copyProp('a.b.c', 'b.c.d', { a: { b: { c: true } } }))
        .toEqual({ a: { b: { c: true } }, b: { c: { d: true } } });
    });
    test('do not copy a non-existant prop', () => {
      expect(copyProp('unknown', 'new', {})).toEqual({});
    });
    test('do not erase dest prop if src prop is non-existant', () => {
      expect(copyProp('unknown', 'a', { a: true })).toEqual({ a: true });
    });
    test('erase dest prop if src prop exist', () => {
      expect(copyProp('a', 'b', { a: 1, b: 2 })).toEqual({ a: 1, b: 1 });
    });
  });

  describe('moveProp', () => {
    test('move a simple prop', () => {
      expect(moveProp('a', 'b', { a: true })).toEqual({ b: true });
    });
    test('move a deep prop', () => {
      expect(moveProp('a.b.c', 'b', { a: { b: { c: true } } }))
        .toEqual({ a: { b: {} }, b: true });
    });
    test('move a simple src prop into a deep dest prop', () => {
      expect(moveProp('a', 'b.c.d', { a: true }))
        .toEqual({ b: { c: { d: true } } });
    });
    test('move a deep src prop into a deep dest prop', () => {
      expect(moveProp('a.b.c', 'b.c.d', { a: { b: { c: true } } }))
        .toEqual({ a: { b: {} }, b: { c: { d: true } } });
    });
    test('do not move a non-existant prop', () => {
      expect(moveProp('a', 'b', {})).toEqual({});
    });
    test('do not erase dest prop if srs prop is non-existant', () => {
      expect(moveProp('unknown', 'a', { a: true })).toEqual({ a: true });
    });
    test('erase dest prop if src prop exist', () => {
      expect(moveProp('a', 'b', { a: 1, b: 2 })).toEqual({ b: 1 });
    });
  });
});
