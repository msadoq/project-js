import cleanData from './cleanData';

describe('range/cleanData', () => {
  let viewDataState;
  beforeEach(() => {
    viewDataState = {
      plot: {
        indexes: { STAT_SU_PID: [10, 11, 12, 13, 14, 15, 16] },
        lines: {
          STAT_SU_PID: [
          { masterTime: 10, value: 13, x: 10 },
          { masterTime: 11, value: 13, x: 11 },
          { masterTime: 12, value: 13, x: 12 },
          { masterTime: 13, value: 13, x: 13 },
          { masterTime: 14, value: 13, x: 14 },
          { masterTime: 15, value: 13, x: 15 },
          { masterTime: 16, value: 13, x: 16 },
          ] },
        min: { STAT_SU_PID: 13 },
        max: { STAT_SU_PID: 13 },
        minTime: { STAT_SU_PID: 16 },
        maxTime: { STAT_SU_PID: 16 },
      },
      plot1: {
        indexes: { STAT_SU_PID: [10, 11, 12], STAT_SU_PID1: [10, 11, 12] },
        lines: {
          STAT_SU_PID: [
            { masterTime: 10, value: 13, x: 10 },
            { masterTime: 11, value: 13, x: 11 },
            { masterTime: 12, value: 13, x: 12 },
          ],
          STAT_SU_PID1: [
            { masterTime: 10, value: 14, x: 10 },
            { masterTime: 11, value: 14, x: 11 },
            { masterTime: 12, value: 14, x: 12 },
          ] },
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
        indexes: { STAT_SU_PID: [15, 16] },
        lines: { STAT_SU_PID: [
          { masterTime: 15, value: 13, x: 15 },
          { masterTime: 16, value: 13, x: 16 },
        ] },
        min: { STAT_SU_PID: 13 },
        max: { STAT_SU_PID: 13 },
        minTime: { STAT_SU_PID: 16 },
        maxTime: { STAT_SU_PID: 16 },
      }
    );
    newState.plot1.should.equal(viewDataState.plot1);
  });
});
