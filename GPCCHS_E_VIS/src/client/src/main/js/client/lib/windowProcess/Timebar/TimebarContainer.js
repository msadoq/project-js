import { connect } from 'react-redux';
import { updateTimebarHeight, collapseTimebar } from '../../store/actions/pages';
import { pause, smartPlay } from '../../store/actions/hsc';
import { getTimebarTimelinesSelector } from '../../store/selectors/timebars';
import { getPlayingTimebarId } from '../../store/reducers/hsc';
import TimebarWrapper from './TimebarWrapper';

export default connect(
  (state, { focusedPageId, timebar }) => {
    const playingTimebarId = getPlayingTimebarId(state, { timebarUuid: timebar.uuid });
    const isPlaying = playingTimebarId === timebar.uuid;
    const timelines = getTimebarTimelinesSelector(state, { timebarUuid: timebar.uuid });

    return {
      isPlaying,
      focusedPageId,
      timelines,
    };
  }, {
    updateTimebarHeight,
    collapseTimebar,
    pause,
    play: smartPlay,
  }
)(TimebarWrapper);
