import { connect } from 'react-redux';
import { getWindowFocusedPageId } from '../../store/selectors/windows';

import Window from './Window';

const mapStateToProps = (state, { windowId }) => ({
  focusedPageId: getWindowFocusedPageId(state, windowId),
  timelines: state.timelines,
  isModified: state.windows[windowId].isModified,
  title: state.windows[windowId].title,
});

export default connect(mapStateToProps)(Window);
