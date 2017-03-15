import { connect } from 'react-redux';
import {
  getWindowFocusedPageId,
  getExplorerDisplay,
  getDisplayHelp,
} from '../../store/selectors/windows';
import { setIsLoaded, displayHelp } from '../../store/actions/windows';

import Window from './Window';

const mapStateToProps = (state, { windowId }) => ({
  focusedPageId: getWindowFocusedPageId(state, { windowId }),
  timelines: state.timelines, // TODO boxmodel remove ?
  isModified: state.windows[windowId].isModified,
  title: state.windows[windowId].title, // TODO boxmodel remove
  isExplorerOpened: getExplorerDisplay(state, { windowId }),
  isHelpDisplayed: getDisplayHelp(state, { windowId }),
});

export default connect(mapStateToProps, { setIsLoaded, displayHelp })(Window);
