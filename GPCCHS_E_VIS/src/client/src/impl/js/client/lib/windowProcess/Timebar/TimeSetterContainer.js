import { connect } from 'react-redux';
import _get from 'lodash/get';
import { remove } from '../../store/actions/messages';
import Timesetter from './Timesetter';
import { pause } from '../../store/actions/hsc';

export default connect(
  (state, { timebarId }) =>
    ({
      messages: _get(state, ['messages', `timeSetter-${timebarId}`], []),
    })
  ,
  {
    removeMessage: remove,
    pause
  }
)(Timesetter);
