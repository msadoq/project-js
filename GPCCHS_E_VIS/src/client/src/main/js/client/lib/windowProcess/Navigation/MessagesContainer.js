// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/messages . . .
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Message removing can be cancel by passing the mouse over the message
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import { getGlobalMessages } from 'store/reducers/messages';
import { remove, cancelRemove } from 'store/actions/messages';

import Messages from './Messages';

export default connect(
  state => ({ messages: getGlobalMessages(state) }),
  { removeMessage: remove, cancelRemoveMessage: cancelRemove }
)(Messages);
