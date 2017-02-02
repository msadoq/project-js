import { connect } from 'react-redux';
import {
  updateViewport,
  switchToNormalMode,
  switchToRealtimeMode,
  switchToExtensibleMode,
  switchToFixedMode,
  updateCursors,
  jump,
} from '../../store/actions/timebars';
import { play, pause } from '../../store/actions/hsc';
import RightTab from './RightTab';

export default connect(
  null,
  {
    switchToNormalMode,
    switchToRealtimeMode,
    switchToExtensibleMode,
    switchToFixedMode,
    updateViewport,
    play,
    pause,
    updateCursors,
    jump,
  }
)(RightTab);
