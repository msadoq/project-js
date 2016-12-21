import { connect } from 'react-redux';

import {
  updateViewport,
  switchToNormalMode,
  switchToRealtimeMode,
  switchToExtensibleMode,
  switchToFixedMode,
} from '../../store/actions/timebars';
import { play, pause } from '../../store/actions/hsc';
import Righttab from './Righttab';

export default connect(
  () => ({}),
  {
    switchToNormalMode,
    switchToRealtimeMode,
    switchToExtensibleMode,
    switchToFixedMode,
    updateViewport,
    play,
    pause,
  }
)(Righttab);
