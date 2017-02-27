import cleanData from './cleanData';

describe('last/cleanData', () => {
  let viewDataState;
  beforeEach(() => {
    viewDataState = {
      dynamic: {
        index: {
          dynamicEP: 14,
        },
        values: {
          dynamicEP: {
            value: {
              referenceTimestamp: 14,
              decommuntedValues: [
                { name: { value: 'decom1' } },
                { name: { value: 'decom2' } },
              ],
            },
          },
        },
      },
      text: {
        index: {
          STAT_SU_PID: 14,
          STAT_WILDCARD_TIMELINE: 13,
        },
        values: {
          STAT_SU_PID: { value: 14, monit: 'info' },
          STAT_WILDCARD_TIMELINE: { value: 13, monit: 'info' },
        },
      },
    };
  });

  it('no clean DynamicView', () => {
    cleanData(Object.freeze(viewDataState), 'dynamic', 'dynamicEP', [10, 15])
      .should.equal(viewDataState);
  });
  it('no clean TextView', () => {
    cleanData(Object.freeze(viewDataState), 'text', 'STAT_SU_PID', [10, 15])
      .should.equal(viewDataState);
  });
  it('clean DynamicView', () => {
    const newState = cleanData(Object.freeze(viewDataState), 'dynamic', 'dynamicEP', [15, 25]);
    newState.dynamic.should.eql(
      {
        index: {},
        values: {},
      }
    );
    newState.text.should.equal(viewDataState.text);
  });
  it('clean TextView', () => {
    const newState = cleanData(Object.freeze(viewDataState), 'text', 'STAT_SU_PID', [15, 25]);
    newState.dynamic.should.equal(viewDataState.dynamic);
    newState.text.should.eql({
      index: { STAT_WILDCARD_TIMELINE: 13 },
      values: { STAT_WILDCARD_TIMELINE: { value: 13, monit: 'info' } },
    });
  });
});
