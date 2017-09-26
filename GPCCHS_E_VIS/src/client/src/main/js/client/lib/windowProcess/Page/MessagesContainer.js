// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #3622 : 20/02/2017 : Fix missing wrong selectors calls
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/messages . . .
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Message removing can be cancel by passing the mouse over the message
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import { remove, cancelRemove } from '../../store/actions/messages';
import { getMessages } from '../../store/reducers/messages';

import Messages from './Messages';

const mapStateToProps = (state, { containerId }) =>
  ({ messages: getMessages(state, { containerId }) });

const mapDispatchToProps = {
  removeMessage: remove,
  cancelRemoveMessage: cancelRemove,
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
