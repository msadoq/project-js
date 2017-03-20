import { getStore } from '../../common/test';
import { getTimebarTimelines } from './timebarTimelines';

describe('store:timebarTimelines:selectors', () => {
  it('getTimebarTimelines: existing id', () => {
    const { getState } = getStore({
      timebarTimelines: {
        myTimebarId: ['tl1', 'tl2'],
        myOtherId: ['tl3'],
      },
    });
    getTimebarTimelines(getState(), { timebarUuid: 'myTimebarId' })
      .should.eql(['tl1', 'tl2']);
  });
  it('getTimebarTimelines: unknown id', () => {
    const { getState } = getStore({
      timebarTimelines: {
        myTimebarId: ['tl1', 'tl2'],
        myOtherId: ['tl3'],
      },
    });
    getTimebarTimelines(getState(), { timebarUuid: 'unknownId' }).should.eql([]);
  });
});
