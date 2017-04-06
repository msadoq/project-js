import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  switchToNormalMode,
  switchToRealtimeMode,
  switchToExtensibleMode,
  switchToFixedMode,
  updateSpeed,
  restoreWidth,
  goNow,
} from '../../../store/actions/timebars';

import Controls from './Controls';

import { getSession } from '../../../store/reducers/sessions';
import { getMasterSessionId } from '../../../store/reducers/masterSession';
import {
  getTimeSetterMessages,
  getMasterTimelineById,
  getMasterTimelineExists,
  getCurrentSessionExists,
} from './ControlsSelectors';

const mapStateToProps = createStructuredSelector({
  messages: getTimeSetterMessages,
  masterSessionId: getMasterSessionId,
  masterTimeline: getMasterTimelineById,
  masterTimelineExists: getMasterTimelineExists,
  currentSessionExists: getCurrentSessionExists,
});

const mapDispatchToProps = {
  switchToNormalMode,
  switchToRealtimeMode,
  switchToExtensibleMode,
  switchToFixedMode,
  updateSpeed,
  restoreWidth,
  goNow,
  getSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
