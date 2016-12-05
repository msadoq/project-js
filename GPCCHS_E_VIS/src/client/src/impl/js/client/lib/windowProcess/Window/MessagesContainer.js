import { connect } from 'react-redux';
import { getGlobalMessages } from '../../store/selectors/messages';
import { remove } from '../../store/actions/messages';

import Messages from './Messages';

export default connect(
  state => ({ messages: getGlobalMessages(state) }),
  { remove }
)(Messages);
