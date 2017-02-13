import { connect } from 'react-redux';
import {
  updateViewport,
  setRealTime,
  updateCursors,
  jump,
} from '../../store/actions/timebars';
import { smartPlay, pause } from '../../store/actions/hsc';
import RightTab from './RightTab';

export default connect(
  null,
  {
    setRealTime,
    updateViewport,
    play: smartPlay,
    pause,
    updateCursors,
    jump,
  }
)(RightTab);
