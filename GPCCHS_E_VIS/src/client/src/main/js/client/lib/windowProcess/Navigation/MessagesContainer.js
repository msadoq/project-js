import { connect } from 'react-redux';
import { getGlobalMessages } from 'store/reducers/messages';
import { remove, cancelRemove } from 'store/actions/messages';

import Messages from './Messages';

export default connect(
  state => ({ messages: getGlobalMessages(state) }),
  { removeMessage: remove, cancelRemoveMessage: cancelRemove }
)(Messages);
