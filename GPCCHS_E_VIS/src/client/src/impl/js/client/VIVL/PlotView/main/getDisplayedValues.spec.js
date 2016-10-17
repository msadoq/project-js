import '../../../lib/common/test';

import getDisplayedValues from './getDisplayedValues';

describe('PlotView/main/getDisplayedValues', () => {
  describe('getDisplayedValues', () => {
    const payload = [
      { timestamp: 1, payload: { val1: '10', val2: '20' } },
      { timestamp: 2, payload: { val1: '11', val2: '21' } },
      { timestamp: 3, payload: { val1: '12', val2: '22' } },
    ];

    const visuWindow = [2, 3];

    it('valid payload, state undefined', () => {
      const ret = getDisplayedValues(undefined, 'val1', visuWindow, payload);
      ret.should.be.an('object').with.keys('data', 'index');
      ret.data.should.be.an('object').with.keys('2', '3');
      ret.data[3].should.deep.equal(payload[2].payload.val1);
      ret.data[2].should.deep.equal(payload[1].payload.val1);
      ret.index.should.be.an('array').with.length(2)
      .that.have.properties([2, 3]);
    });
    it('valid payload, state defined', () => {
      const stateLocalId = {
        data: { 0: '100', 2.5: '101', 4: '102' },
        index: [0, 2.5, 4],
      };
      const ret = getDisplayedValues(stateLocalId, 'val1', visuWindow, payload);
      ret.should.be.an('object').with.keys('data', 'index');
      ret.data.should.be.an('object').with.keys('2', '2.5', '3');
      ret.data[3].should.deep.equal(payload[2].payload.val1);
      ret.data[2].should.deep.equal(payload[1].payload.val1);
      ret.index.should.be.an('array').with.length(3)
      .that.have.properties([2, 2.5, 3]);
    });
  });
});
