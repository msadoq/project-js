import { connect } from 'react-redux';
import {
  getWindow,
  getWindowFocusedPageId,
  getDisplayHelp,
} from '../../store/reducers/windows';
import { getPanels } from '../../store/reducers/pages';
import { getModal } from '../../store/reducers/modals';
import { setIsLoaded, displayHelp } from '../../store/actions/windows';
import { close as closeModal } from '../../store/actions/modals';
import {
  resizeEditor,
  resizeTimebar,
  resizeExplorer,
  minimizeExplorer,
  minimizeEditor,
  minimizeTimebar,
} from '../../store/actions/pages';

import Window from './Window';

const mapStateToProps = (state, { windowId }) => {
  const pageId = getWindowFocusedPageId(state, { windowId });
  const { isModified } = getWindow(state, { windowId });
  const {
    editorWidth,
    editorIsMinimized,
    timebarHeight,
    timebarIsMinimized,
    explorerWidth,
    explorerIsMinimized,
  } = getPanels(state, { pageId });

  return {
    pageId,
    isModified,
    isHelpDisplayed: getDisplayHelp(state, { windowId }),
    editorWidth,
    editorIsMinimized,
    timebarHeight,
    timebarIsMinimized,
    explorerWidth,
    explorerIsMinimized,
    modal: getModal(state, { windowId }),
  };
};

export default connect(mapStateToProps, {
  setIsLoaded,
  displayHelp,
  resizeEditor,
  resizeTimebar,
  resizeExplorer,
  minimizeEditor,
  minimizeExplorer,
  minimizeTimebar,
  closeModal,
})(Window);
