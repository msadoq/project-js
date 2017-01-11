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
} from '../../store/actions/timebars';

import Controls from './Controls';

export default connect(
  (state, { timebarId }) => {
    let currentSessionExists = false;
    let masterTimelineExists = false;
    const masterTimeline = getMasterTimelineById(state, timebarId);
    if (masterTimeline) {
      masterTimelineExists = true;
      if (getSession(state, masterTimeline.sessionId)) {
        currentSessionExists = true;
      }
    }

    return {
      messages: _get(state, ['messages', `timeSetter-${timebarId}`], null),
      currentSessionExists,
      masterTimelineExists,
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
  }
)(Controls);
