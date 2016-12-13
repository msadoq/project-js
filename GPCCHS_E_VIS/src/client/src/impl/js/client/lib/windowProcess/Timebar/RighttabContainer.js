import { connect } from 'react-redux';
import _get from 'lodash/get';

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
  (state, { timebarId }) => ({
    messages: _get(state, ['messages', `timeSetter-${timebarId}`], []),
  }),
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
