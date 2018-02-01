// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-2138 : 01/09/2017 : Added error message when dropped item's mime type is not supported.
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import { remove, cancelRemove } from 'store/actions/messages';
import { getMessages } from 'store/reducers/messages';

import Messages from './Messages';

const mapStateToProps = (state, { containerId }) =>
  ({ messages: getMessages(state, { containerId }) });

const mapDispatchToProps = {
  removeMessage: remove,
  cancelRemoveMessage: cancelRemove,
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
