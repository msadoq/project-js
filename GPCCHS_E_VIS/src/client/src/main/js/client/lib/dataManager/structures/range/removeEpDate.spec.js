import removeEpData from './removeEpData';

describe('dataManager/structures/range', () => {
  describe('removeEpData', () => {
    it('unknown view', () => {
      const state = { myViewId: {}, myOtherView: {} };
      removeEpData(state, 'unknownView', 'ep1').should.eql(state);
    });
    it('range structure view', () => {
      const stateEp = Object.freeze({
        myViewId: {
          index: [1, 2, 3, 4],
          columns: [
            { point1: 150, point2: 200, x: 1 },
            { point1: 151, point3: 301, x: 2 },
            { point1: 152, point2: 202, point3: 302, x: 3 },
            { point1: 153, x: 4 },
          ] } });
      removeEpData(stateEp, 'myViewId', 'point1')
      .should.deep.eq({
        myViewId: {
          index: [1, 2, 3],
          columns: [
            { point2: 200, x: 1 },
            { point3: 301, x: 2 },
            { point2: 202, point3: 302, x: 3 },
          ] } });
    });
  });
});
