import { connect } from 'react-redux';
import { updateCursors } from '../../store/actions/timebars';
import { updateTimebarHeight } from '../../store/actions/pages';
import { getTimebarTimelinesSelector } from '../../store/selectors/timebars';
import { getPlayingTimebarId } from '../../store/selectors/hsc';
import TimebarWrapper from './TimebarWrapper';

export default connect(
  (state, { focusedPageId, timebar, timebarId }) => {
    const playingTimebarId = getPlayingTimebarId(state, timebarId);
    const isPlaying = playingTimebarId === timebarId;
    const timelines = getTimebarTimelinesSelector(state, timebarId);

    return {
      isPlaying,
      visuWindow: timebar.visuWindow,
      slideWindow: timebar.slideWindow,
      focusedPageId,
      timelines,
    };
  }, {
    updateCursors,
    updateTimebarHeight,
  }
)(TimebarWrapper);
