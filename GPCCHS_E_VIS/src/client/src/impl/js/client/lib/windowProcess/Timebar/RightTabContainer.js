import { connect } from 'react-redux';
import { getSession } from '../../store/selectors/sessions';
import { getMasterTimelineById } from '../../store/selectors/timebars';
import {
  updateViewport,
  switchToNormalMode,
  switchToRealtimeMode,
  switchToExtensibleMode,
  switchToFixedMode,
} from '../../store/actions/timebars';
import { play, pause } from '../../store/actions/hsc';
import RightTab from './RightTab';

export default connect(
  (state, { timebarId }) => {
    const masterTimeline = getMasterTimelineById(state, timebarId);
    let currentSessionExists = false;
    if (masterTimeline) {
      const currentSession = getSession(state.sessions, masterTimeline.sessionId);
      if (currentSession) {
        currentSessionExists = true;
      }
    }
    return {
      currentSessionExists,
    };
  },
  {
    switchToNormalMode,
    switchToRealtimeMode,
    switchToExtensibleMode,
    switchToFixedMode,
    updateViewport,
    play,
    pause,
  }
)(RightTab);
