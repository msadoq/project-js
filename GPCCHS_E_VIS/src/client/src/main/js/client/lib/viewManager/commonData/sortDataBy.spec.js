import _ from 'lodash/fp';
import sortDataBy from './sortDataBy';

describe('viewManager:commonData:sortDataBy', () => {
  test('should deal with null or empty data', () => {
    const array = [
      null,
      { a: { b: 5 } },
      { a: { b: 4 } },
    ];
    const sorted = sortDataBy(_.prop('a.b'), 'ASC', array);
    expect(sorted).toEqual([
      { a: { b: 4 } },
      { a: { b: 5 } },
      null,
    ]);
  });
  test('should deal with null or empty data', () => {
    const array = [
      undefined,
      { a: { b: 5 } },
      { a: { b: 4 } },
    ];
    const sorted = sortDataBy(_.prop('a.b'), 'ASC', array);
    expect(sorted).toEqual([
      { a: { b: 4 } },
      { a: { b: 5 } },
      undefined,
    ]);
  });
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

    test('ascending string sort with absent values', () => {
      const array = [
        { alarmType: 'truc' },
        { alarmType: 'bidule' },
        {},
        { alarmType: 'machin' },
        {},
      ];
      const sorted = sortDataBy(a => a.alarmType, 'ASC', array);
      expect(sorted).toEqual([
        { alarmType: 'bidule' },
        { alarmType: 'machin' },
        { alarmType: 'truc' },
        {},
        {},
      ]);
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
        { type: 'double', symbol: '1.9657346537574994381321318135132138000000000' },
        { type: 'double', symbol: '0.5018656680472457284828493' },
        { type: 'double', symbol: '1.2381381381995407957751765' },
        { type: 'double', symbol: '0.062910627484683543549782439' },
      ];
      const sorted = sortDataBy(_.identity, 'ASC', array);
      expect(sorted).toEqual([
        { type: 'double', symbol: '0.062910627484683543549782439' },
        { type: 'double', symbol: '0.5018656680472457284828493' },
        { type: 'double', symbol: '1.2381381381995407957751765' },
        { type: 'double', symbol: '1.9657346537574994381321318135132138000000000' },
      ]);
    });
    test('descending double sort', () => {
      const array = [
        { type: 'double', symbol: '50.000000005' },
        { type: 'double', symbol: '50.000000001' },
        { type: 'double', symbol: '50.000000002' },
        { type: 'double', symbol: '50.000000003' },
        { type: 'double', symbol: '50.000000004' },
        { type: 'double', symbol: '50.000000005' },
      ];
      const sorted = sortDataBy(_.identity, 'DESC', array);
      expect(sorted).toMatchSnapshot();
    });
  });
  describe('sort long', () => {
    test('ascending long sort', () => {
      const array = [
        { type: 'long', symbol: '50000000005' },
        { type: 'long', symbol: '50000000004' },
        { type: 'long', symbol: '50000000003' },
        { type: 'long', symbol: '50000000002' },
        { type: 'long', symbol: '50000000001' },
        { type: 'long', symbol: '50000000005' },
      ];
      const sorted = sortDataBy(_.identity, 'ASC', array);
      expect(sorted).toMatchSnapshot();
    });
    test('descending long sort', () => {
      const array = [
        { type: 'long', symbol: '50000000005' },
        { type: 'long', symbol: '50000000001' },
        { type: 'long', symbol: '50000000002' },
        { type: 'long', symbol: '50000000003' },
        { type: 'long', symbol: '50000000004' },
        { type: 'long', symbol: '50000000005' },
      ];
      const sorted = sortDataBy(_.identity, 'DESC', array);
      expect(sorted).toMatchSnapshot();
    });
  });
});


const lines = {
  '#0': {
    rawAlarm: {
      oid: '#0',
      timestamp: { type: 'time', value: 9900 },
    },
    timestamp: '1970-01-01T00:00:09.900',
  },
  '#1': {
    rawAlarm: {
      oid: '#1',
      timestamp: { type: 'time', value: 1522322964134 },
    },
    timestamp: '2018-03-29T11:29:24.134',
  },
  '#2': {
    rawAlarm: {
      oid: '#2',
      timestamp: { type: 'time', value: 10900 },
    },
    timestamp: '1970-01-01T00:00:10.900',
  },
  '#3': {
    rawAlarm: {
      oid: '#3',
      timestamp: { type: 'time', value: 1522323572107 },
    },
    timestamp: '2018-03-29T11:39:32.107',
  },
  '#4': {
    rawAlarm: {
      oid: '#4',
      timestamp: { type: 'time', value: 1522324238661 },
    },
    timestamp: '2018-03-29T11:50:38.661',
  },
  '#5': {
    rawAlarm: {
      oid: '#5',
      timestamp: { type: 'time', value: 1522324378936 },
    },
    timestamp: '2018-03-29T11:52:58.936',
  },
  '#6': {
    rawAlarm: {
      oid: '#6',
      timestamp: { type: 'time', value: 1522324406613 },
    },
    timestamp: '2018-03-29T11:53:26.613',
  },
  '#7': {
    rawAlarm: {
      oid: '#7',
      timestamp: { type: 'time', value: 1522324422484 },
    },
    timestamp: '2018-03-29T11:53:42.484',
  },
  '#8': {
    rawAlarm: {
      oid: '#8',
      timestamp: { type: 'time', value: 1522324493870 },
    },
    timestamp: '2018-03-29T11:54:53.870',
  },
  '#9': {
    rawAlarm: {
      oid: '#9',
      timestamp: { type: 'time', value: 1522324572816 },
    },
    timestamp: '2018-03-29T11:56:12.816',
  },
  '#10': {
    rawAlarm: {
      oid: '#10',
      timestamp: { type: 'time', value: 1522324596981 },
    },
    timestamp: '2018-03-29T11:56:36.981',
  },
  '#11': {
    rawAlarm: {
      oid: '#11',
      timestamp: { type: 'time', value: 1522324626426 },
    },
    timestamp: '2018-03-29T11:57:06.426',
  },
  '#12': {
    rawAlarm: {
      oid: '#12',
      timestamp: { type: 'time', value: 1522324701005 },
    },
    timestamp: '2018-03-29T11:58:21.005',
  },
  '#13': {
    rawAlarm: {
      oid: '#13',
      timestamp: { type: 'time', value: 1522324728142 },
    },
    timestamp: '2018-03-29T11:58:48.142',
  },
  '#14': {
    rawAlarm: {
      oid: '#14',
      timestamp: { type: 'time', value: 1522324729142 },
    },
    timestamp: '2018-03-29T11:58:49.142',
  },
  '#15': {
    rawAlarm: {
      oid: '#15',
      timestamp: { type: 'time', value: 1522324744142 },
    },
  },
  '#16': {
    rawAlarm: {
      oid: '#16',
      timestamp: { type: 'time', value: 1522324992420 },
    },
  },
};

describe('sort with real values', () => {
  test('should sort properly according to timestamp', () => {
    const column = 'timestamp';
    const indexes = [
      '#0',
      '#1',
      '#2',
      '#3',
      '#4',
      '#5',
      '#6',
      '#7',
      '#8',
      '#9',
      '#10',
      '#11',
      '#12',
      '#13',
      '#14',
      '#15',
      '#16',
    ];
    expect(sortDataBy(oid => lines[oid].rawAlarm[column], 'ASC', indexes)).toEqual([
      '#0',
      '#2',
      '#1',
      '#3',
      '#4',
      '#5',
      '#6',
      '#7',
      '#8',
      '#9',
      '#10',
      '#11',
      '#12',
      '#13',
      '#14',
      '#15',
      '#16',
    ]);
    expect(sortDataBy(oid => lines[oid].rawAlarm[column], 'DESC', indexes)).toEqual([
      '#16',
      '#15',
      '#14',
      '#13',
      '#12',
      '#11',
      '#10',
      '#9',
      '#8',
      '#7',
      '#6',
      '#5',
      '#4',
      '#3',
      '#1',
      '#2',
      '#0',
    ]);
  });
});
