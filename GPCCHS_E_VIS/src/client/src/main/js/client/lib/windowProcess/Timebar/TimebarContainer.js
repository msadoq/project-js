import { connect } from 'react-redux';
import { getTimebarTimelinesSelector } from '../../store/selectors/timebars';
import { getPlayingTimebarId } from '../../store/reducers/hsc';
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
