import { connect } from 'react-redux';
import { remove } from '../../store/actions/messages';
import { getMessages } from '../../store/reducers/messages';

import Messages from './Messages';

const mapStateToProps = (state, { containerId }) =>
  ({ messages: getMessages(state, { containerId }) });

export default connect(mapStateToProps, { remove })(Messages);
