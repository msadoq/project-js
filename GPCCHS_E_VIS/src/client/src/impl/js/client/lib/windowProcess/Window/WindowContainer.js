import { connect } from 'react-redux';
import { getStatus } from '../../store/selectors/hsc';
import { remove, add } from '../../store/actions/messages';

import {
  getWindowFocusedPageId,
} from '../../store/selectors/windows';

import Window from './Window';

const mapStateToProps = (state, { windowId }) => ({
  appStatus: getStatus(state),
  focusedPageId: getWindowFocusedPageId(state, windowId),
  timelines: state.timelines,
  messages: state.messages.global
});

export default connect(
  mapStateToProps,
  {
    removeMessage: remove,
    addMessage: add,
  }
)(Window);
