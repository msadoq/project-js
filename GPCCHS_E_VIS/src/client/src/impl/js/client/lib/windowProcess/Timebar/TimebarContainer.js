import { connect } from 'react-redux';
import { updateCursors, updateViewport, updateSpeed, updateMode } from '../../store/actions/timebars';
import { updateTimebarHeight } from '../../store/actions/pages';
import { play, pause } from '../../store/actions/hsc';
import { getTimebarTimelinesSelector } from '../../store/selectors/timebars';
import { getPlayingTimebarId } from '../../store/selectors/hsc';
import TimebarWrapper from './TimebarWrapper';

export default connect(
  (state, { focusedPageId, timebar, timebarId }) => {
    const playingTimebarId = getPlayingTimebarId(state, timebarId);
    const isPlaying = playingTimebarId === timebarId;

    const timelines = getTimebarTimelinesSelector(state, timebarId);
    const masterTimeline = (timelines[0] && timelines[0].id === timebar.masterId) ?
      timelines[0] : null;
    if (!masterTimeline) {
      // TODO dispatch error on page
      console.log('NO MASTER TIMELINE'); // eslint-disable-line no-console
    }

    let currentSession;
    if (masterTimeline) {
      currentSession = state.sessions.find(s => (s.id === masterTimeline.sessionId));
    }
    if (!currentSession) {
      // TODO dispatch error on page
      console.log('NO CURRENT SESSION'); // eslint-disable-line no-console
    }

    const currentSessionOffsetMs = currentSession ? currentSession.offsetWithmachineTime : null;

    return {
      isPlaying,
      visuWindow: timebar.visuWindow,
      slideWindow: timebar.slideWindow,
      focusedPageId,
      timebarHeight: timebar.timebarHeight,
      timelines,
      currentSessionOffsetMs,
      sessions: state.sessions,
    };
  }, {
    updateMode,
    updateCursors,
    updateViewport,
    play,
    pause,
    updateSpeed,
    updateTimebarHeight,
  }
)(TimebarWrapper);
