import { get } from 'common/parameters';

import { should } from '../../common/test';
import { getStateColorObj } from './stateColors';

describe('viewManager/commonData/stateColors', () => {
  it('monitoring color', () => {
    const payload = {};
    const stateColors = [];

    getStateColorObj(payload, stateColors, 'severe')
      .should.eql({ color: get('STATE_COLORS').severe });
  });
  it('apply custom state color', () => {
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

    getStateColorObj(payload, stateColors).should.eql({ color: '#0000FF' });
  });
  it('apply custom state color, but nothing', () => {
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

    should.not.exist(getStateColorObj(payload, stateColors));
  });
  it('nothing to apply', () => {
    const payload = {};
    const stateColors = [];

    should.not.exist(getStateColorObj(payload, stateColors));
  });
});
