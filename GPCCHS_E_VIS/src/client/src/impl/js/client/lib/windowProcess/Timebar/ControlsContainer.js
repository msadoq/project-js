import { connect } from 'react-redux';
import _get from 'lodash/get';

import {
  switchToNormalMode,
  switchToRealtimeMode,
  switchToExtensibleMode,
  switchToFixedMode,
  updateSpeed,
} from '../../store/actions/timebars';

import Controls from './Controls';

export default connect(
  (state, { timebarId }) => ({
    messages: _get(state, ['messages', `timeSetter-${timebarId}`], null),
  }),
  {
    switchToNormalMode,
    switchToRealtimeMode,
    switchToExtensibleMode,
    switchToFixedMode,
    updateSpeed,
  }
)(Controls);
