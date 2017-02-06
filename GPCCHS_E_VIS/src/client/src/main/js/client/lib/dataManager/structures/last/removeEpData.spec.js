import removeEpData from './removeEpData';

describe('dataManager/structures/last', () => {
  describe('removeEpData', () => {
    it('unknown view', () => {
      const state = { myViewId: {}, myOtherView: {} };
      removeEpData(state, 'unknownView', 'ep1').should.eql(state);
    });
    it('last structure view', () => {
      const state = Object.freeze({
        myViewId: {
          index: { myEntryPoint: 10, myOther: 20 },
          values: { myEntryPoint: 150, myOther: 200 },
        },
      });
      removeEpData(state, 'myViewId', 'myOther')
      .should.deep.eq({
        myViewId: {
          index: { myEntryPoint: 10 },
          values: { myEntryPoint: 150 },
        },
      });
    });
  });
});
