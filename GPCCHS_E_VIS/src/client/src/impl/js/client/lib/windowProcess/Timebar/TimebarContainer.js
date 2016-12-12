import { connect } from 'react-redux';
import { updateCursors } from '../../store/actions/timebars';
import { updateTimebarHeight } from '../../store/actions/pages';
import { getTimebarTimelinesSelector } from '../../store/selectors/timebars';
import { getPlayingTimebarId } from '../../store/selectors/hsc';
import { getSession } from '../../store/selectors/sessions';
import TimebarWrapper from './TimebarWrapper';

export default connect(
  (state, { focusedPageId, timebar, timebarId }) => {
    const playingTimebarId = getPlayingTimebarId(state, timebarId);
    const isPlaying = playingTimebarId === timebarId;

    const timelines = getTimebarTimelinesSelector(state, timebarId);
    const masterTimeline = Object.values(timelines).find(t => t.id === timebar.masterId);

    if (!masterTimeline) {
      // TODO dispatch error on page
      console.log('NO MASTER TIMELINE'); // eslint-disable-line no-console
    }

    let currentSession;
    if (masterTimeline) {
      currentSession = getSession(state.sessions, masterTimeline.sessionId);
    }
    if (!currentSession) {
      // TODO dispatch error on page
      console.log('NO CURRENT SESSION'); // eslint-disable-line no-console
    }

    return {
      isPlaying,
      visuWindow: timebar.visuWindow,
      slideWindow: timebar.slideWindow,
      focusedPageId,
      timelines,
      currentSession,
      sessions: state.sessions,
    };
  }, {
    updateCursors,
    updateTimebarHeight,
  }
)(TimebarWrapper);
