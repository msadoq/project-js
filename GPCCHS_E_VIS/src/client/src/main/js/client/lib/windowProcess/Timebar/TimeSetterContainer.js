import { connect } from 'react-redux';
import { getMessages } from '../../store/selectors/messages';
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
      messages: getMessages(state, { containerId: `timeSetter-${timebarUuid}` }),
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
