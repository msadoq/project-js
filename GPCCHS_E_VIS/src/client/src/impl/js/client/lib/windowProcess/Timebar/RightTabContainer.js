import { connect } from 'react-redux';
import {
  updateViewport,
  switchToNormalMode,
  switchToRealtimeMode,
  switchToExtensibleMode,
  switchToFixedMode,
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
  }
)(RightTab);
