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
import { getSession } from '../../../store/reducers/sessions';

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
  getSession,
};

export default connect(selector, mapDispatchToProps)(Controls);
