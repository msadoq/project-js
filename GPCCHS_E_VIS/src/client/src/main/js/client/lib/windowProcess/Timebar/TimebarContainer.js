import { connect } from 'react-redux';
import { updateTimebarHeight, collapseTimebar } from '../../store/actions/pages';
import { pause } from '../../store/actions/hsc';
import { getTimebarTimelinesSelector } from '../../store/selectors/timebars';
import { getPlayingTimebarId } from '../../store/selectors/hsc';
import TimebarWrapper from './TimebarWrapper';

export default connect(
  (state, { focusedPageId, timebar, timebarUuid }) => {
    const playingTimebarId = getPlayingTimebarId(state, { timebarUuid });
    const isPlaying = playingTimebarId === timebarUuid;
    const timelines = getTimebarTimelinesSelector(state, { timebarUuid });

    return {
      isPlaying,
      visuWindow: timebar.visuWindow,
      slideWindow: timebar.slideWindow,
      focusedPageId,
      timelines,
    };
  }, {
    updateTimebarHeight,
    collapseTimebar,
    pause,
  }
)(TimebarWrapper);
