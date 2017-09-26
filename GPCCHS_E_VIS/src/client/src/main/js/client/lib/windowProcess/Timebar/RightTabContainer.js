// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 10/02/2017 : Timebar realtime mode disabled when user moving current and dragging.
// VERSION : 1.1.2 : FA : #5400 : 13/02/2017 : Merge branch 'R7S4-dev' into dev
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : Timesetter is displayed with GenericModal component.
// VERSION : 1.1.2 : FA : #6670 : 21/06/2017 : Add basic player middleware .
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import {
  updateViewport,
  setRealTime,
  updateCursors,
  jump,
} from '../../store/actions/timebars';
import { play, pause } from '../../store/actions/hsc';
import {
  open as openModal,
} from '../../store/actions/modals';
import RightTab from './RightTab';

export default connect(
  null,
  {
    setRealTime,
    updateViewport,
    play,
    pause,
    updateCursors,
    jump,
    openModal,
  }
)(RightTab);
