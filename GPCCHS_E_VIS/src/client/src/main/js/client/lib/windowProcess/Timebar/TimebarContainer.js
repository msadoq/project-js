import { connect } from 'react-redux';
import { updateTimebarHeight, collapseTimebar } from '../../store/actions/pages';
import { pause } from '../../store/actions/hsc';
import { getTimebarTimelinesSelector } from '../../store/selectors/timebars';
import { getPlayingTimebarId } from '../../store/reducers/hsc';
import TimebarWrapper from './TimebarWrapper';

export default connect(
  (state, { focusedPageId, timebarUuid }) => {
    const playingTimebarId = getPlayingTimebarId(state, { timebarUuid });
    const isPlaying = playingTimebarId === timebarUuid;
    const timelines = getTimebarTimelinesSelector(state, { timebarUuid });

    return {
      isPlaying,
      focusedPageId,
      timelines,
    };
  }, {
    updateTimebarHeight,
    collapseTimebar,
    pause,
  }
)(TimebarWrapper);
