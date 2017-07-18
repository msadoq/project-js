import { connect } from 'react-redux';
import { pause, play } from '../../store/actions/hsc';
import { getTimebar } from '../../store/reducers/timebars';
import { getPage } from '../../store/reducers/pages';
import { getPlayingTimebarId } from '../../store/reducers/hsc';
import { minimizeTimebar } from '../../store/actions/pages';
import TimebarCollapsed from './TimebarCollapsed';

export default connect(
  (state, { pageId }) => {
    const focusedPage = getPage(state, { pageId });
    const { timebarUuid } = focusedPage;
    const isPlaying = getPlayingTimebarId(state, { timebarUuid }) === timebarUuid;
    const timebar = getTimebar(state, { timebarUuid });

    return {
      timebarUuid,
      isPlaying,
      current: timebar.visuWindow.current,
    };
  }, {
    pause,
    play,
    minimizeTimebar,
  }
)(TimebarCollapsed);
