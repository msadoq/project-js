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
import {
  open as openModal,
} from '../../../store/actions/modals';

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
  openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
