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
import { smartPlay, pause } from '../../store/actions/hsc';
import RightTab from './RightTab';

export default connect(
  null,
  {
    switchToNormalMode,
    switchToRealtimeMode,
    switchToExtensibleMode,
    switchToFixedMode,
    updateViewport,
    play: smartPlay,
    pause,
    updateCursors,
    jump,
  }
)(RightTab);
