import { should, getStore } from '../../utils/test';
import { getTimelines } from './timebarReducer';

describe('timebarReducer', () => {
  // TODO missing all test!!

  describe('selectors', () => {
    describe('getTimelines', () => {
      it('empty store', () => {
        getTimelines({}, 'tb1').should.eql([]);
      });

      const state = {
        timebars: {
          tb1: { timelines: ['tl1', 'tl2'] },
          tb2: { timelines: ['tl3', undefined] },
        },
        timelines: {
          tl1: { sessionId: 's1' },
          tl2: { sessionId: 's2' },
          tl3: { sessionId: 's3' },
        },
      };
      it('no argument', () => {
        getTimelines(state).should.eql([]);
      });
      it('unknown', () => {
        getTimelines(state, 'tb3').should.eql([]);
      });
      it('works', () => {
        getTimelines(state, 'tb1').should.eql([{ sessionId: 's1' }, { sessionId: 's2' }]);
        getTimelines(state, 'tb2').should.eql([{ sessionId: 's3' }]);
      });
    });
  });
});
