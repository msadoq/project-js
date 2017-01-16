import { connect } from 'react-redux';
import _get from 'lodash/get';
import { remove } from '../../store/actions/messages';
import {
  updateDefaultWidth,
  updateCursors,
  jump,
  updateViewport,
} from '../../store/actions/timebars';
import TimeSetter from './TimeSetter';
import { pause } from '../../store/actions/hsc';

export default connect(
  (state, { timebarUuid }) =>
    ({
      messages: _get(state, ['messages', `timeSetter-${timebarUuid}`], []),
    })
  ,
  {
    removeMessage: remove,
    pause,
    updateDefaultWidth,
    updateCursors,
    jump,
    updateViewport,
  }
)(TimeSetter);
