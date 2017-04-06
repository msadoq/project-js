import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPage, getPanels } from '../../store/reducers/pages';
import { getView } from '../../store/reducers/views';
import { getWindowPages } from '../../store/selectors/windows';
import { closeView } from '../../store/actions/views';
import { moveViewToPage, setCollapsed, setMaximized, openEditor, minimizeEditor } from '../../store/actions/pages';
import View from './View';

const makeMapStateToProps = () => {
  const mapStateToProps = (state, { viewId, windowId, pageId }) => {
    const { type, oId, absolutePath, isModified, backgroundColor, titleStyle, title }
        = getView(state, { viewId });

    const page = getPage(state, { pageId });
    const collapsedLayout = page.layout.find(e => e.i === viewId && e.collapsed);
    const { editorIsMinimized, editorViewId } = getPanels(state, { pageId });

    return {
      backgroundColor,
      type,
      title,
      titleStyle,
      windowPages: getWindowPages(state, { windowId }),
      oId,
      absolutePath,
      isModified,
      windowId,
      pageId,
      collapsed: !!collapsedLayout,
      isViewsEditorOpen: !editorIsMinimized && editorViewId === viewId,
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, { windowId, pageId, viewId }) => bindActionCreators({
  moveViewToPage: toPageId =>
    moveViewToPage(windowId, pageId, toPageId, viewId),
  collapseView: flag =>
    setCollapsed(pageId, viewId, flag),
  maximizeView: flag =>
    setMaximized(pageId, viewId, flag),
  openEditor: () => openEditor(pageId, viewId),
  closeEditor: () => minimizeEditor(pageId, true),
  closeView: () => closeView(pageId, viewId),
}, dispatch);

// return function to avoid page grid layout and React DOM re-conciliation issue
export default connect(makeMapStateToProps, mapDispatchToProps)(View);
