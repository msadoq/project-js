import updateEpLabel from './updateEpLabel';

describe('lib/dataManager/structures/last', () => {
  let state;
  before(() => {
    state = {
      myView: {
        index: {
          label1: 10,
          other: 11,
        },
        values: {
          label1: 100,
          other: 110,
        },
      },
      otherView: {
        index: { ep: 1 },
        values: { ep: 2 },
      },
    };
  });
  it('values ok', () => {
    updateEpLabel(state, 'myView', 'label1', 'label2')
    .should.deep.equal(
      {
        myView: {
          index: {
            label2: 10,
            other: 11,
          },
          values: {
            label2: 100,
            other: 110,
          },
        },
        otherView: {
          index: { ep: 1 },
          values: { ep: 2 },
        },
      }
    );
  });
});
