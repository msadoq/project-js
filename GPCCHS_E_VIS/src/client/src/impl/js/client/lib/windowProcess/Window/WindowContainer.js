import { connect } from 'react-redux';
import { getStatus } from '../../store/selectors/hsc';
import { getWindowFocusedPageId } from '../../store/selectors/windows';

import Window from './Window';

const mapStateToProps = (state, { windowId }) => ({
  appStatus: getStatus(state),
  focusedPageId: getWindowFocusedPageId(state, windowId),
  timelines: state.timelines,
  isModified: state.windows[windowId].isModified,
  title: state.windows[windowId].title,
});

export default connect(mapStateToProps)(Window);
