import { connect } from 'react-redux';
import {
  getWindowFocusedPageId,
  getDisplayHelp,
} from '../../store/selectors/windows';
import { getPanels } from '../../store/selectors/pages';
import { setIsLoaded, displayHelp } from '../../store/actions/windows';

import Window from './Window';

const mapStateToProps = (state, { windowId }) => {
  const pageId = getWindowFocusedPageId(state, { windowId });
  const { editorWidth, timebarHeight, explorerWidth } = getPanels(state, { pageId });

  return {
    pageId,
    timelines: state.timelines, // TODO boxmodel remove ?
    isModified: state.windows[windowId].isModified,
    title: state.windows[windowId].title, // TODO boxmodel remove
    isHelpDisplayed: getDisplayHelp(state, { windowId }),
    editorWidth,
    timebarHeight,
    explorerWidth,
  };
};

export default connect(mapStateToProps, { setIsLoaded, displayHelp })(Window);
