import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ChoosePage from './ChoosePage';
import { getWindowPages } from '../../store/selectors/windows';
import { getPanels } from '../../store/reducers/pages';
import { moveViewToPage, minimizeEditor } from '../../store/actions/pages';

const mapStateToProps = (state, { windowId, pageId, viewId }) => {
  const windowPages = getWindowPages(state, { windowId });
  const pageTitles = windowPages.reduce((list, page) => (
    [...list, { title: page.title, id: page.pageId }]
  ), []);
  pageTitles.push({ title: 'New page', id: '' });
  const { editorIsMinimized, editorViewId } = getPanels(state, { pageId });
  return {
    pageTitles,
    isViewsEditorOpen: !editorIsMinimized && editorViewId === viewId,
  };
};

const mapDispatchToProps = (dispatch, { windowId, pageId, viewId }) => bindActionCreators({
  closeEditor: () => minimizeEditor(pageId, true),
  moveViewToPage: toPageId =>
    moveViewToPage(windowId, pageId, toPageId, viewId),
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ChoosePage);
