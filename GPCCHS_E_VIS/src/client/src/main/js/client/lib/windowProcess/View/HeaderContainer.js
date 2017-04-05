import { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getView } from '../../store/reducers/views';
import { getPage, getPanels } from '../../store/reducers/pages';
import { getWindowPages } from '../../store/selectors/windows';
import { closeView } from '../../store/actions/views';
import {
  moveViewToPage,
  setCollapsed,
  setMaximized,
  openEditor,
  minimizeEditor,
} from '../../store/actions/pages';

import Header from './Header';

const makeMapStateToProps = () => (state, { windowId, pageId, viewId }) => {
  const { type,
    oId,
    absolutePath,
    isModified,
    backgroundColor,
    titleStyle,
    title,
  } = getView(state, { viewId });

  const page = getPage(state, { pageId });
  const { editorIsMinimized } = getPanels(state, { pageId });

  return {
    backgroundColor,
    type,
    title,
    titleStyle,
    isModified,
    isViewsEditorOpen: !editorIsMinimized,
    windowPages: getWindowPages(state, { windowId }),
    oId,
    absolutePath,
    collapsed:
      !!(page.layout.find(e => e.i === viewId && e.collapsed)), // TODO boxmodel factorize
  };
};

const mapDispatchToProps = (dispatch, { windowId, pageId, viewId }) => bindActionCreators({
  moveViewToPage: toPageId => moveViewToPage(windowId, pageId, toPageId, viewId),
  collapseView: flag => setCollapsed(pageId, viewId, flag),
  maximizeView: flag => setMaximized(pageId, viewId, flag),
  closeView: () => closeView(pageId, viewId),
  openEditor: () => openEditor(pageId, viewId),
  closeEditor: () => minimizeEditor(pageId, true),
}, dispatch);

Header.propTypes = {
  windowId: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
  viewId: PropTypes.string.isRequired,
};

// return function to avoid page grid layout and React DOM re-conciliation issue
export default connect(makeMapStateToProps, mapDispatchToProps)(Header);
