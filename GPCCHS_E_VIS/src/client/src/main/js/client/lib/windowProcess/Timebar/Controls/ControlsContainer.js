import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  switchToNormalMode,
  setRealTime,
  switchToExtensibleMode,
  switchToFixedMode,
  updateSpeed,
  restoreWidth,
  goNow,
} from 'store/actions/timebars';
import {
  open as openModal,
} from 'store/actions/modals';

import { getTimeSetterMessages } from 'store/reducers/messages';

import { getCurrentSessionExists } from 'store/selectors/sessions';
import Controls from './Controls';

const mapStateToProps = createStructuredSelector({
  messages: getTimeSetterMessages,
  enableRealTime: getCurrentSessionExists,
});

const mapDispatchToProps = {
  switchToNormalMode,
  switchToRealtimeMode: timebarUuid => setRealTime(timebarUuid, true),
  switchToExtensibleMode,
  switchToFixedMode,
  updateSpeed,
  restoreWidth,
  goNow,
  openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
