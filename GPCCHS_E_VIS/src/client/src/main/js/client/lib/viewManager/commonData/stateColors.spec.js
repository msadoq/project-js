import { getStateColorObj } from './stateColors';

describe('data/common/stateColors', () => {
  test('monitoring color', () => {
    const payload = {};
    const stateColors = [];

    expect(getStateColorObj(payload, stateColors))
      .toEqual(null);
  });
  test('apply custom state color', () => {
    const payload = {
      val1: { type: 'uinteger', value: (10) + 1 },
      val2: { type: 'uinteger', value: (10) + 2 },
      val3: { type: 'uinteger', value: (10) + 3 },
      val4: { type: 'enum', value: 1 - 10, symbol: 'val'.concat(1 - 10) },
      referenceTimestamp: { type: 'time', value: 1 },
      time: { type: 'time', value: 1 + 0.2 },
    };

    const stateColors = [
      {
        color: '#0000FF',
        condition: {
          field: 'val3',
          operator: '>',
          operand: '1',
        },
      },
    ];

    expect(getStateColorObj(payload, stateColors)).toEqual({ color: '#0000FF' });
  });
  test('apply custom state color, but nothing', () => {
    const payload = {
      val1: { type: 'uinteger', value: (10) + 1 },
      val2: { type: 'uinteger', value: (10) + 2 },
      val3: { type: 'uinteger', value: (10) + 3 },
      val4: { type: 'enum', value: 1 - 10, symbol: 'val'.concat(1 - 10) },
      referenceTimestamp: { type: 'time', value: 1 },
      time: { type: 'time', value: 1 + 0.2 },
    };

    const stateColors = [
      {
        color: '#0000FF',
        condition: {
          field: 'val3',
          operator: '<',
          operand: '1',
        },
      },
    ];

    expect(getStateColorObj(payload, stateColors)).toBeFalsy();
  });
  test('nothing to apply', () => {
    const payload = {};
    const stateColors = [];

    expect(getStateColorObj(payload, stateColors)).toBeFalsy();
  });
});
