import { getStore } from '../../common/test';
import { getTimebarsTimelines, getTimebarTimelines } from './timebarTimelines';

describe('store:timebarTimelines:selectors', () => {
  it('getTimebarsTimelines', () => {
    const { getState } = getStore({
      timebarTimelines: {
        myTimebarId: ['tl1', 'tl2'],
        myOtherId: ['tl3'],
      },
    });
    getTimebarsTimelines(getState()).should.eql({
      myTimebarId: ['tl1', 'tl2'],
      myOtherId: ['tl3'],
    });
  });
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
