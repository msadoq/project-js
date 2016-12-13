import { connect } from 'react-redux';
import {
  switchToNormalMode,
  switchToRealtimeMode,
  switchToExtensibleMode,
  switchToFixedMode,
  updateSpeed,
} from '../../store/actions/timebars';

import Controls from './Controls';

export default connect(
  () => ({}),
  {
    switchToNormalMode,
    switchToRealtimeMode,
    switchToExtensibleMode,
    switchToFixedMode,
    updateSpeed,
  }
)(Controls);
