import { connect } from 'react-redux';
import {
  switchToNormalMode,
  switchToRealtimeMode,
  switchToExtensibleMode,
  switchToFixedMode,
  updateSpeed,
  restoreWidth,
  goNow,
} from '../../../store/actions/timebars';

import Controls from './Controls';
import selector from './ControlsSelector';

const mapDispatchToProps = {
  switchToNormalMode,
  switchToRealtimeMode,
  switchToExtensibleMode,
  switchToFixedMode,
  updateSpeed,
  restoreWidth,
  goNow,
};

export default connect(selector, mapDispatchToProps)(Controls);
