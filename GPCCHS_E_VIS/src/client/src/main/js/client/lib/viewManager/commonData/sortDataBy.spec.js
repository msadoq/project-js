import _ from 'lodash/fp';
import sortDataBy from './sortDataBy';

describe('viewManager:commonData:sortDataBy', () => {
  test('sort numbers with complex iteratee', () => {
    const array = [
      { a: { b: 5 } },
      { a: { b: 4 } },
      { a: { b: 3 } },
      { a: { b: 2 } },
      { a: { b: 1 } },
      { a: { b: 5 } },
    ];
    const sorted = sortDataBy(_.prop('a.b'), 'ASC', array);
    expect(sorted).toEqual([
      { a: { b: 1 } },
      { a: { b: 2 } },
      { a: { b: 3 } },
      { a: { b: 4 } },
      { a: { b: 5 } },
      { a: { b: 5 } },
    ]);
  });
  describe('errors', () => {
    test('throw if sortMode is unknown', () => {
      expect(() => sortDataBy(_.identity, 'UNKNOWN', [])).toThrow('Unknown sortMode');
    });
    test('throw a TypeError if comparator is unknown', () => {
      expect(() => sortDataBy(_.identity, 'ASC', [{}, {}])).toThrow('Unknown comparator');
    });
  });
  describe('sort raw js number', () => {
    test('ascending number sort', () => {
      const array = [5, 4, 3, 2, 1, 5];
      const sorted = sortDataBy(_.identity, 'ASC', array);
      expect(sorted).toEqual([1, 2, 3, 4, 5, 5]);
    });
    test('descending number sort', () => {
      const array = [1, 2, 3, 4, 5, 1];
      const sorted = sortDataBy(_.identity, 'DESC', array);
      expect(sorted).toEqual([5, 4, 3, 2, 1, 1]);
    });
  });
  describe('sort raw js string', () => {
    test('ascending string sort', () => {
      const array = ['e', 'd', 'c', 'b', 'a', 'e'];
      const sorted = sortDataBy(_.identity, 'ASC', array);
      expect(sorted).toEqual(['a', 'b', 'c', 'd', 'e', 'e']);
    });
    test('descending string sort', () => {
      const array = ['a', 'b', 'c', 'd', 'e', 'e'];
      const sorted = sortDataBy(_.identity, 'DESC', array);
      expect(sorted).toEqual(['e', 'e', 'd', 'c', 'b', 'a']);
    });
  });
  describe('sort raw js boolean', () => {
    test('ascending boolean sort', () => {
      const array = [true, false, true, false, true];
      const sorted = sortDataBy(_.identity, 'ASC', array);
      expect(sorted).toEqual([false, false, true, true, true]);
    });
    test('descending boolean sort', () => {
      const array = [true, false, true, false, true];
      const sorted = sortDataBy(_.identity, 'DESC', array);
      expect(sorted).toEqual([true, true, true, false, false]);
    });
  });
  describe('sort string', () => {
    test('ascending string sort', () => {
      const array = [
        { type: 'string', value: 'e' },
        { type: 'string', value: 'd' },
        { type: 'string', value: 'c' },
        { type: 'string', value: 'b' },
        { type: 'string', value: 'a' },
        { type: 'string', value: 'e' },
      ];
      const sorted = sortDataBy(_.identity, 'ASC', array);
      expect(sorted).toMatchSnapshot();
    });
    test('descending string sort', () => {
      const array = [
        { type: 'string', value: 'a' },
        { type: 'string', value: 'b' },
        { type: 'string', value: 'c' },
        { type: 'string', value: 'd' },
        { type: 'string', value: 'e' },
        { type: 'string', value: 'a' },
      ];
      const sorted = sortDataBy(_.identity, 'DESC', array);
      expect(sorted).toMatchSnapshot();
    });
  });
  describe('sort number', () => {
    test('ascending number sort', () => {
      const array = [
        { type: 'number', value: 5 },
        { type: 'number', value: 4 },
        { type: 'number', value: 3 },
        { type: 'number', value: 2 },
        { type: 'number', value: 1 },
        { type: 'number', value: 5 },
      ];
      const sorted = sortDataBy(_.identity, 'ASC', array);
      expect(sorted).toMatchSnapshot();
    });
    test('descending number sort', () => {
      const array = [
        { type: 'number', value: 1 },
        { type: 'number', value: 2 },
        { type: 'number', value: 3 },
        { type: 'number', value: 4 },
        { type: 'number', value: 5 },
        { type: 'number', value: 1 },
      ];
      const sorted = sortDataBy(_.identity, 'DESC', array);
      expect(sorted).toMatchSnapshot();
    });
  });
  describe('sort boolean', () => {
    test('ascending boolean sort', () => {
      const array = [
        { type: 'boolean', value: true },
        { type: 'boolean', value: false },
        { type: 'boolean', value: true },
        { type: 'boolean', value: false },
        { type: 'boolean', value: true },
        { type: 'boolean', value: false },
      ];
      const sorted = sortDataBy(_.identity, 'ASC', array);
      expect(sorted).toMatchSnapshot();
    });
    test('descending boolean sort', () => {
      const array = [
        { type: 'boolean', value: true },
        { type: 'boolean', value: false },
        { type: 'boolean', value: true },
        { type: 'boolean', value: false },
        { type: 'boolean', value: true },
        { type: 'boolean', value: false },
      ];
      const sorted = sortDataBy(_.identity, 'DESC', array);
      expect(sorted).toMatchSnapshot();
    });
  });
  describe('sort time', () => {
    test('ascending time sort', () => {
      const array = [
        { type: 'time', value: 50000 },
        { type: 'time', value: 40000 },
        { type: 'time', value: 30000 },
        { type: 'time', value: 20000 },
        { type: 'time', value: 10000 },
        { type: 'time', value: 50000 },
      ];
      const sorted = sortDataBy(_.identity, 'ASC', array);
      expect(sorted).toMatchSnapshot();
    });
    test('descending time sort', () => {
      const array = [
        { type: 'time', value: 10000 },
        { type: 'time', value: 20000 },
        { type: 'time', value: 30000 },
        { type: 'time', value: 40000 },
        { type: 'time', value: 50000 },
        { type: 'time', value: 10000 },
      ];
      const sorted = sortDataBy(_.identity, 'DESC', array);
      expect(sorted).toMatchSnapshot();
    });
  });
  describe('sort duration', () => {
    test('ascending duration sort', () => {
      const array = [
        { type: 'duration', value: 50 },
        { type: 'duration', value: 40 },
        { type: 'duration', value: 30 },
        { type: 'duration', value: 20 },
        { type: 'duration', value: 10 },
        { type: 'duration', value: 50 },
      ];
      const sorted = sortDataBy(_.identity, 'ASC', array);
      expect(sorted).toMatchSnapshot();
    });
    test('descending duration sort', () => {
      const array = [
        { type: 'duration', value: 10 },
        { type: 'duration', value: 20 },
        { type: 'duration', value: 30 },
        { type: 'duration', value: 40 },
        { type: 'duration', value: 50 },
        { type: 'duration', value: 10 },
      ];
      const sorted = sortDataBy(_.identity, 'DESC', array);
      expect(sorted).toMatchSnapshot();
    });
  });
  describe('sort double', () => {
    test('ascending double sort', () => {
      const array = [
        { type: 'double', value: '50.000000005' },
        { type: 'double', value: '50.000000004' },
        { type: 'double', value: '50.000000003' },
        { type: 'double', value: '50.000000002' },
        { type: 'double', value: '50.000000001' },
        { type: 'double', value: '50.000000005' },
      ];
      const sorted = sortDataBy(_.identity, 'ASC', array);
      expect(sorted).toMatchSnapshot();
    });
    test('descending double sort', () => {
      const array = [
        { type: 'double', value: '50.000000005' },
        { type: 'double', value: '50.000000001' },
        { type: 'double', value: '50.000000002' },
        { type: 'double', value: '50.000000003' },
        { type: 'double', value: '50.000000004' },
        { type: 'double', value: '50.000000005' },
      ];
      const sorted = sortDataBy(_.identity, 'DESC', array);
      expect(sorted).toMatchSnapshot();
    });
  });
  describe('sort long', () => {
    test('ascending long sort', () => {
      const array = [
        { type: 'long', value: '50000000005' },
        { type: 'long', value: '50000000004' },
        { type: 'long', value: '50000000003' },
        { type: 'long', value: '50000000002' },
        { type: 'long', value: '50000000001' },
        { type: 'long', value: '50000000005' },
      ];
      const sorted = sortDataBy(_.identity, 'ASC', array);
      expect(sorted).toMatchSnapshot();
    });
    test('descending long sort', () => {
      const array = [
        { type: 'long', value: '50000000005' },
        { type: 'long', value: '50000000001' },
        { type: 'long', value: '50000000002' },
        { type: 'long', value: '50000000003' },
        { type: 'long', value: '50000000004' },
        { type: 'long', value: '50000000005' },
      ];
      const sorted = sortDataBy(_.identity, 'DESC', array);
      expect(sorted).toMatchSnapshot();
    });
  });
});
