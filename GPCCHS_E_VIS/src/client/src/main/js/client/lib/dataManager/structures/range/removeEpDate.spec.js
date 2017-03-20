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
          indexes: { point1: [1, 2, 3, 4], point2: [1, 3], point3: [2, 3] },
          lines: { point1: [
            { masterTime: 1, value: 150, point2: 200, x: 1 },
            { masterTime: 2, value: 151, point3: 301, x: 2 },
            { masterTime: 3, value: 152, point2: 202, x: 3 },
            { masterTime: 4, value: 153, x: 4 },
          ],
            point2: [
              { masterTime: 1, value: 200, x: 1 },
              { masterTime: 3, value: 202, x: 3 },
            ],
            point3: [
              { masterTime: 2, value: 301, x: 1 },
              { masterTime: 3, value: 202, x: 3 },
            ],
          } } });
      removeEpData(stateEp, 'myViewId', 'point1')
      .should.deep.eq({
        myViewId: {
          indexes: { point2: [1, 3], point3: [2, 3] },
          lines: {
            point2: [
              { masterTime: 1, value: 200, x: 1 },
              { masterTime: 3, value: 202, x: 3 },
            ],
            point3: [
              { masterTime: 2, value: 301, x: 1 },
              { masterTime: 3, value: 202, x: 3 },
            ],
          } } });
    });
    it('no data to remove', () => {
      const stateEp = Object.freeze({
        myViewId: {
          indexes: { point1: [1, 2, 3, 4], point2: [1, 3], point3: [2, 3] },
          lines: { point1: [
            { masterTime: 1, value: 150, point2: 200, x: 1 },
            { masterTime: 2, value: 151, point3: 301, x: 2 },
            { masterTime: 3, value: 152, point2: 202, x: 3 },
            { masterTime: 4, value: 153, x: 4 },
          ],
            point2: [
              { masterTime: 1, value: 200, x: 1 },
              { masterTime: 3, value: 202, x: 3 },
            ],
            point3: [
              { masterTime: 2, value: 301, x: 1 },
              { masterTime: 3, value: 202, x: 3 },
            ],
          } } });
      removeEpData(stateEp, 'myViewId', 'unknown').should.eql(stateEp);
    });
  });
});
