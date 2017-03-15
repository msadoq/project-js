import { connect } from 'react-redux';
import {
  getWindowFocusedPageId,
  getExplorerDisplay,
  getDisplayHelp,
} from '../../store/selectors/windows';
import { setIsLoaded, displayExplorer, displayHelp } from '../../store/actions/windows';

import Window from './Window';

const mapStateToProps = (state, { windowId }) => ({
  focusedPageId: getWindowFocusedPageId(state, { windowId }),
  timelines: state.timelines,
  isModified: state.windows[windowId].isModified,
  title: state.windows[windowId].title,
  isExplorerOpened: getExplorerDisplay(state, { windowId }),
  isHelpDisplayed: getDisplayHelp(state, { windowId }),
});

export default connect(mapStateToProps, {
  displayExplorer,
  setIsLoaded,
  displayHelp,
})(Window);
