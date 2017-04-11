import { connect } from 'react-redux';
import { pause, smartPlay as play } from '../../store/actions/hsc';
import { getTimebarTimelinesSelector } from '../../store/selectors/timebars';
import { getPlayingTimebarId } from '../../store/reducers/hsc';
import TimebarWrapper from './TimebarWrapper';
import {
  minimizeTimebar,
} from '../../store/actions/pages';

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
  }, {
    pause,
    play,
    minimizeTimebar,
  }
)(TimebarWrapper);
