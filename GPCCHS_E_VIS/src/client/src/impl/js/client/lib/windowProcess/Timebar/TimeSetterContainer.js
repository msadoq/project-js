import { connect } from 'react-redux';
import _get from 'lodash/get';
import { remove } from '../../store/actions/messages';
import Timesetter from './Timesetter';

export default connect(
  (state, { timebarId }) =>
    ({
      messages: _get(state, ['messages', 'timeSetters', timebarId], []),
    })
  ,
  {
    removeMessage: remove
  }
)(Timesetter);
