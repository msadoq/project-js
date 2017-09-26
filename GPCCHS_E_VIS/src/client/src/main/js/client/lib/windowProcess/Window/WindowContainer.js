// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 14/02/2017 : Explorer Right panel refactoring .
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Ignore not loaded views in dataMap and data requesting
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Remove displayHelp state and replace with store
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Control help, explorer and timebar from electron menu
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Remove the explorer resizable behavior and use panels data to handle show/hide
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPanels selectors in reducers folder
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move all windows simple selectors in store/reducers/windows
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : Timebar is collapsable. action reducer test.
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : minimize and keep old size for explorer and editor
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : Collapse / minimize buttons on panel dividers. New colors for dividers, darker.
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : New GenericModal component displayed or not displayed at root (Window.js) AddTimeline and EditTimeline forms displayed through it.
// VERSION : 1.1.2 : DM : #5828 : 21/04/2017 : WHen mouse out of body / escape pressed, "mouseup" is triggered.
// VERSION : 1.1.2 : DM : #5828 : 21/04/2017 : REVERT WHen mouse out of body / escape pressed, "mouseup" is triggered."
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : New D P I buttons in explorer vertical bar.
// END-HISTORY
// ====================================================================

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
  focusTabInExplorer,
} from '../../store/actions/pages';

import WindowWrapper from './WindowWrapper';

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
  focusTabInExplorer,
})(WindowWrapper);
