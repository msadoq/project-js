import { connect } from 'react-redux';
import _get from 'lodash/get';
import { getMasterTimelineById } from '../../store/selectors/timebars';
import { getSession } from '../../store/selectors/sessions';
import { getMasterSessionId } from '../../store/selectors/masterSession';
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
  (state, { timebarUuid }) => {
    let currentSessionExists = false;
    let masterTimelineExists = false;
    const masterTimeline = getMasterTimelineById(state, timebarUuid);
    if (masterTimeline) {
      masterTimelineExists = true;
      if (getSession(state, masterTimeline.sessionId)) {
        currentSessionExists = true;
      }
    }

    return {
      messages: _get(state, ['messages', `timeSetter-${timebarUuid}`], null),
      currentSessionExists,
      masterTimelineExists,
      masterTimeline,
      masterSessionId: getMasterSessionId(state),
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
