import cleanData from './cleanData';

describe('range/cleanData', () => {
  let viewDataState;
  beforeEach(() => {
    viewDataState = {
      plot: {
        index: [
          10, 11, 12, 13, 14, 15, 16,
        ],
        columns: [
          { STAT_SU_PID: { value: 13, x: 10 } },
          { STAT_SU_PID: { value: 13, x: 11 } },
          { STAT_SU_PID: { value: 13, x: 12 } },
          { STAT_SU_PID: { value: 13, x: 13 } },
          { STAT_SU_PID: { value: 13, x: 14 } },
          { STAT_SU_PID: { value: 13, x: 15 } },
          { STAT_SU_PID: { value: 13, x: 16 } },
        ],
        min: { STAT_SU_PID: 13 },
        max: { STAT_SU_PID: 13 },
        minTime: { STAT_SU_PID: 16 },
        maxTime: { STAT_SU_PID: 16 },
      },
      plot1: {
        index: [
          10, 11, 12,
        ],
        columns: [
          { STAT_SU_PID: { value: 13, x: 10 }, STAT_SU_PID1: { value: 14, x: 10 } },
          { STAT_SU_PID: { value: 13, x: 11 }, STAT_SU_PID1: { value: 14, x: 11 } },
          { STAT_SU_PID: { value: 13, x: 12 }, STAT_SU_PID1: { value: 14, x: 12 } },
        ],
        min: { STAT_SU_PID: 13, STAT_SU_PID1: 14 },
        max: { STAT_SU_PID: 13, STAT_SU_PID1: 14 },
        minTime: { STAT_SU_PID: 10, STAT_SU_PID1: 10 },
        maxTime: { STAT_SU_PID: 12, STAT_SU_PID1: 12 },
      },
    };
  });

  it('no clean PlotView', () => {
    cleanData(Object.freeze(viewDataState), 'plot', 'STAT_SU_PID', [10, 17])
      .should.equal(viewDataState);
  });
  it('clean 1 EP', () => {
    const newState = cleanData(Object.freeze(viewDataState), 'plot', 'STAT_SU_PID', [15, 25]);
    newState.plot.should.eql(
      {
        index: [15, 16],
        columns: [
          { STAT_SU_PID: { value: 13, x: 15 } },
          { STAT_SU_PID: { value: 13, x: 16 } },
        ],
        min: { STAT_SU_PID: 13 },
        max: { STAT_SU_PID: 13 },
        minTime: { STAT_SU_PID: 16 },
        maxTime: { STAT_SU_PID: 16 },
      }
    );
    newState.plot1.should.equal(viewDataState.plot1);
  });
  it('clean 2 EP', () => {
    const newState = cleanData(Object.freeze(viewDataState), 'plot1', 'STAT_SU_PID', [15, 25]);
    newState.plot1.should.eql(
      {
        index: [],
        columns: [],
        min: { STAT_SU_PID: 13, STAT_SU_PID1: 14 },
        max: { STAT_SU_PID: 13, STAT_SU_PID1: 14 },
        minTime: { STAT_SU_PID: 10, STAT_SU_PID1: 10 },
        maxTime: { STAT_SU_PID: 12, STAT_SU_PID1: 12 },
      }
    );
    newState.plot.should.equal(viewDataState.plot);
  });
});
