import { connect } from 'react-redux';
import {
  updateViewport,
  setRealTime,
  updateCursors,
  jump,
} from 'store/actions/timebars';
import { play, pause } from 'store/actions/hsc';
import {
  open as openModal,
} from 'store/actions/modals';
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
    openModal,
  }
)(RightTab);
