import { connect } from 'react-redux';
import _get from 'lodash/get';
import { getMasterTimelineById } from '../../store/selectors/timebars';
import { getSession } from '../../store/selectors/sessions';
import {
  switchToNormalMode,
  switchToRealtimeMode,
  switchToExtensibleMode,
  switchToFixedMode,
  updateSpeed,
  restoreWidth,
  goNow,
  jump,
} from '../../store/actions/timebars';

import Controls from './Controls';

export default connect(
  (state, { timebarId }) => {
    const masterTimeline = getMasterTimelineById(state, timebarId);
    let currentSessionExists = false;
    let currentSession;
    if (masterTimeline) {
      currentSession = getSession(state.sessions, masterTimeline.sessionId);
    } else {
      // TODO dispatch error on page
      console.log('NO MASTER TIMELINE'); // eslint-disable-line no-console
    }
    if (currentSession) {
      currentSessionExists = true;
    } else {
      // TODO dispatch error on page
      console.log('NO CURRENT SESSION'); // eslint-disable-line no-console
    }
    return {
      messages: _get(state, ['messages', `timeSetter-${timebarId}`], null),
      currentSessionExists,
    };
  },
  {
    switchToNormalMode,
    switchToRealtimeMode,
    switchToExtensibleMode,
    switchToFixedMode,
    updateSpeed,
    restoreWidth,
    goNow,
    jump,
  }
)(Controls);
