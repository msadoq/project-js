import { connect } from 'react-redux';
import _get from 'lodash/get';
import { remove } from '../../store/actions/messages';
import {
  updateDefaultWidth,
  updateCursors,
} from '../../store/actions/timebars';
import TimeSetter from './TimeSetter';
import { pause } from '../../store/actions/hsc';

export default connect(
  (state, { timebarId }) =>
    ({
      messages: _get(state, ['messages', `timeSetter-${timebarId}`], []),
    })
  ,
  {
    removeMessage: remove,
    pause,
    updateDefaultWidth,
    updateCursors,
  }
)(TimeSetter);
