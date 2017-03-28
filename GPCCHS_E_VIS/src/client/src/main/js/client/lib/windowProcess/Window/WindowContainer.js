import { connect } from 'react-redux';
import {
  getWindow,
  getWindowFocusedPageId,
  getDisplayHelp,
} from '../../store/reducers/windows';
import { getPanels } from '../../store/reducers/pages';
import { setIsLoaded, displayHelp } from '../../store/actions/windows';
import {
  resizeEditor,
  resizeTimebar,
  resizeExplorer,
} from '../../store/actions/pages';

import Window from './Window';

const mapStateToProps = (state, { windowId }) => {
  const pageId = getWindowFocusedPageId(state, { windowId });
  const { isModified } = getWindow(state, { windowId });
  const {
    editorWidth,
    timebarHeight,
    timebarCollapsed,
    explorerWidth,
  } = getPanels(state, { pageId });

  return {
    pageId,
    isModified,
    isHelpDisplayed: getDisplayHelp(state, { windowId }),
    editorWidth,
    timebarHeight,
    timebarCollapsed,
    explorerWidth,
  };
};

export default connect(mapStateToProps, {
  setIsLoaded,
  displayHelp,
  resizeEditor,
  resizeTimebar,
  resizeExplorer,
})(Window);
