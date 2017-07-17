import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPage, getPanels } from '../../store/reducers/pages';
import { getView } from '../../store/reducers/views';
import { updateEditorSearch, askSaveView, askCloseView } from '../../store/actions/views';
import { open as openModal, close as closeModal } from '../../store/actions/modals';
import { setCollapsed, setMaximized, openEditor, minimizeEditor } from '../../store/actions/pages';
import View from './View';

const makeMapStateToProps = () => {
  const mapStateToProps = (state, { viewId, pageId }) => {
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
      oId,
      absolutePath,
      isModified,
      pageId,
      collapsed: !!collapsedLayout,
      isViewsEditorOpen: !editorIsMinimized && editorViewId === viewId,
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, { windowId, pageId, viewId }) => bindActionCreators({
  collapseView: flag =>
    setCollapsed(pageId, viewId, flag),
  maximizeView: flag =>
    setMaximized(pageId, viewId, flag),
  openEditor: (pattern = '') => (disp) => {
    disp(updateEditorSearch(viewId, pattern));
    disp(openEditor(pageId, viewId));
  },
  closeEditor: () => minimizeEditor(pageId, true),
  openModal: args => openModal(windowId, { windowId, pageId, viewId, ...args }),
  closeModal: () => closeModal(windowId),
  save: () => askSaveView(viewId, false),
  saveAs: () => askSaveView(viewId, true),
  closeView: () => askCloseView(viewId),
}, dispatch);

// return function to avoid page grid layout and React DOM re-conciliation issue
export default connect(makeMapStateToProps, mapDispatchToProps)(View);
