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

import {
  getTimeSetterMessages,
  getCurrentSessionId,
} from './ControlsSelectors';

const mapStateToProps = createStructuredSelector({
  messages: getTimeSetterMessages,
  sessionId: getCurrentSessionId,
});

const mapDispatchToProps = {
  switchToNormalMode,
  switchToRealtimeMode,
  switchToExtensibleMode,
  switchToFixedMode,
  updateSpeed,
  restoreWidth,
  goNow,
  openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
