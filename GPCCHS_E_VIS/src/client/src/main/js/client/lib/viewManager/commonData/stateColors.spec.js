// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Fix broken tests . .
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : remove structure last and range
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Remove viewManager utils folder .
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// END-HISTORY
// ====================================================================

import { get } from '../../common/configurationManager';
import { getStateColorObj } from './stateColors';

describe('data/common/stateColors', () => {
  test('monitoring color', () => {
    const payload = {};
    const stateColors = [];

    expect(getStateColorObj(payload, stateColors, 'severe'))
      .toEqual({ color: get('STATE_COLORS').severe });
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
