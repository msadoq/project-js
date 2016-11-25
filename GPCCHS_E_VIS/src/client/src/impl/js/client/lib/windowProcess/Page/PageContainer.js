import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Page from './Page';
import { getEditor } from '../../store/selectors/pages';
import { openEditor, closeEditor } from '../../store/actions/pages';

const mapStateToProps = (state, ownProps) => {
  const editor = getEditor(state, ownProps.focusedPageId);
  return {
    editorViewId: editor && editor.viewId,
    isEditorOpened: editor && editor.isOpened
  };
};

const mapDispatchToProps = (dispatch, { focusedPageId }) => bindActionCreators({
  openEditor: (viewId, viewType, configuration) => openEditor(
    focusedPageId,
    viewId,
    viewType,
    configuration
  ),
  closeEditor: () => closeEditor(focusedPageId)
}, dispatch);

const PageContainer = connect(mapStateToProps, mapDispatchToProps)(Page);

PageContainer.propTypes = {
  focusedPageId: PropTypes.string.isRequired
};

export default PageContainer;
