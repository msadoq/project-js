import { connect } from 'react-redux';
import {
  updateViewport,
  setRealTime,
  updateCursors,
  jump,
} from '../../store/actions/timebars';
import { play, pause } from '../../store/actions/hsc';
import RightTab from './RightTab';

export default connect(
  null,
  {
    setRealTime,
    updateViewport,
    play,
    pause,
    updateCursors,
    jump,
  }
)(RightTab);
