// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Move getMasterTimelineById from timebars/selectors to Controls/ControlsSelector.js
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Reorganized files and folders in windowProcess/Timebar
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Rename ControlsSelector in ControlsSelectors .
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : Timesetter is displayed with GenericModal component.
// VERSION : 1.1.2 : DM : #5828 : 11/05/2017 : Fix / refacto and test timebar controls components
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Add realTimeHandler and goNowHandler in player middleware
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Use getCurrentSessionExists selector in ControlsContainer
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Remove Timebar/Controls/ControlsSelectors + tests .
// END-HISTORY
// ====================================================================

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
} from '../../../store/actions/timebars';
import {
  open as openModal,
} from '../../../store/actions/modals';

import Controls from './Controls';

import { getTimeSetterMessages } from '../../../store/reducers/messages';
import { getCurrentSessionExists } from '../../../store/selectors/sessions';

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
