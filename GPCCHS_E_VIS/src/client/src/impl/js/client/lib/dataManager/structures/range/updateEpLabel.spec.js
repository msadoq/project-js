import updateEpLabel from './updateEpLabel';

describe('lib/dataManager/structures/last', () => {
  let state;
  before(() => {
    state = {
      viewData: {
        myView: {
          columns: [
            {
              label1: 10,
              other: 11,
              x: 1
            },
            {
              label1: 10,
              other: 11,
              x: 2
            },
          ],
          index: [1, 2]
        },
        otherView: {
          index: [1],
          columns: [{ ep: 2, x: 1 }]
        }
      }
    };
  });
  it('values ok', () => {
    updateEpLabel(state, 'myView', 'label1', 'label2')
    .should.deep.equal({
      viewData: {
        myView: {
          columns: [
            {
              label2: 10,
              other: 11,
              x: 1
            },
            {
              label2: 10,
              other: 11,
              x: 2
            },
          ],
          index: [1, 2]
        },
        otherView: {
          index: [1],
          columns: [{ ep: 2, x: 1 }]
        }
      }
    });
  });
});
