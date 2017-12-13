// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #3622 : 27/02/2017 : chunk pause action on open editor and on dislay timesetter
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Timebar refactoring: components more modular, less props passed.
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/hsc . . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Removed timeline.timelineUuid, already has timeline.uuid .
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Styling and adding play / pause button to collapsed timebar.
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Handle panel collapse/expand buttons with css instead of JE and react refs.
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : Panels are now sticky on left and right.
// VERSION : 1.1.2 : FA : #6670 : 21/06/2017 : Add basic player middleware .
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import { getTimebarTimelinesSelector } from 'store/selectors/timebars';
import { getPlayingTimebarId } from 'store/reducers/hsc';
import TimebarWrapper from './TimebarWrapper';

export default connect(
  (state, { pageId, timebar }) => {
    const playingTimebarId = getPlayingTimebarId(state, { timebarUuid: timebar.uuid });
    const isPlaying = playingTimebarId === timebar.uuid;
    const timelines = getTimebarTimelinesSelector(state, { timebarUuid: timebar.uuid });

    return {
      isPlaying,
      pageId,
      timelines,
    };
  }
)(TimebarWrapper);
