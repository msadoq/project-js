import updateEpLabel from './updateEpLabel';

describe('lib/dataManager/structures/last', () => {
  let state;
  before(() => {
    state = {
      myView: {
        lines: { label1: [
          {
            masterTime: 10,
            other: 11,
            x: 1,
          },
          {
            masterTime: 10.5,
            other: 11,
            x: 2,
          },
        ] },
        indexes: { label1: [10, 10.5] },
      },
      otherView: {
        indexes: { label2: [1] },
        lines: { lable2: [{ masterTime: 1, ep: 2, x: 1 }] },
      },
    };
  });
  it('values ok', () => {
    updateEpLabel(state, 'myView', 'label1', 'label2')
    .should.deep.equal({
      myView: {
        lines: { label2: [
          {
            masterTime: 10,
            other: 11,
            x: 1,
          },
          {
            masterTime: 10.5,
            other: 11,
            x: 2,
          },
        ] },
        indexes: { label2: [10, 10.5] },
      },
      otherView: {
        indexes: { label2: [1] },
        lines: { lable2: [{ masterTime: 1, ep: 2, x: 1 }] },
      },
    });
  });
});
