import { connect } from 'react-redux';
import { remove } from '../../store/actions/messages';
import { getMessages } from '../../store/selectors/messages';

import Messages from './Messages';

const mapStateToProps = (state, { viewId }) => ({ messages: getMessages(state, { viewId }) });

export default connect(mapStateToProps, { remove })(Messages);
