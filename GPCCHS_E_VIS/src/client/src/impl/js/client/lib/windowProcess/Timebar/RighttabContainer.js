import { connect } from 'react-redux';
import { updateViewport, updateSpeed, updateMode } from '../../store/actions/timebars';
import { play, pause } from '../../store/actions/hsc';
import Righttab from './Righttab';

export default connect(
  () => ({}),
  {
    updateMode,
    updateViewport,
    play,
    pause,
    updateSpeed
  }
)(Righttab);
