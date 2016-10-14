import '../../../lib/common/test';
import getDisplayedValues from './getDisplayedValues';

describe('TextView/main/getDisplayedValues', () => {
  describe('getDisplayedValues', () => {
    const payload = [
      { timestamp: 1, payload: { val1: '10', val2: '20' } },
      { timestamp: 2, payload: { val1: '11', val2: '21' } },
      { timestamp: 3, payload: { val1: '12', val2: '22' } },
    ];

    it('valid payload with current inside', () => {
      const visuWindow = [1.9, 2];
      const ret = getDisplayedValues(undefined, 'val1', visuWindow, payload);
      ret.should.be.an('object').with.keys('timestamp', 'value');
      ret.timestamp.should.equal(payload[1].timestamp);
      ret.value.should.equal(payload[1].payload.val1);
    });
    it('valid payload without current inside', () => {
      const visuWindow = [1.9, 2.5];
      const ret = getDisplayedValues(undefined, 'val1', visuWindow, payload);
      ret.should.be.an('object').with.keys('timestamp', 'value');
      ret.timestamp.should.equal(payload[1].timestamp);
      ret.value.should.equal(payload[1].payload.val1);
    });
  });
});
