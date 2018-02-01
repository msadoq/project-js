// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Creation of timebarTimelines reducer .
// VERSION : 1.1.2 : DM : #3622 : 21/02/2017 : Remove missing only in tests
// VERSION : 1.1.2 : DM : #3622 : 21/02/2017 : add tests on timebars selectors
// VERSION : 1.1.2 : DM : #3622 : 22/02/2017 : Write getTimebarMasterId and getTimebarTimelinesSelector tests in selectors/timebars.spec.js
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : Refactoring of dataMap generation using reselect
// VERSION : 1.1.2 : DM : #3622 : 28/02/2017 : In actions, reduers, views, timelineId -> timelineUuid to avoid confusion.
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Cleanup in selectors . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove unused selectors . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Removed timeline.timelineUuid, already has timeline.uuid .
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getTimebarMasterId simple selector in store/reducers/timebars
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getTimebar and getTimebars simple selectors in store/reducers/timebars
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Add ControlsSelector tests . .
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// END-HISTORY
// ====================================================================

import { getTimebarTimelinesSelector } from './timebars';

describe('store:timebars:selectors', () => {
  test('getTimebarTimelinesSelector', () => {
    const state = {
      timebarTimelines: {
        tb1: ['tl2', 'masterTimeline'],
      },
      timebars: {
        tb1: {
          masterId: 'masterTimeline',
        },
      },
      timelines: {
        tl2: { id: 'tl2' },
        masterTimeline: { id: 'masterTimeline' },
      },
    };
    expect(getTimebarTimelinesSelector(state, { timebarUuid: 'tb1' })).toEqual([
      { id: 'masterTimeline' },
      { id: 'tl2' },
    ]);
    expect(getTimebarTimelinesSelector(state, { timebarUuid: 'unknown' })).toEqual([]);
  });
});
