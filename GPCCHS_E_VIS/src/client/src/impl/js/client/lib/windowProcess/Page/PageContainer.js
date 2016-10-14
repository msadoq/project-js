import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Page from './Page';
import { getEditor } from '../../store/selectors/pages';
import { openEditor, closeEditor } from '../../store/actions/pages';

const PageContainer = props => <Page {...props} />;

const mapStateToProps = (state, ownProps) => {
  const editor = getEditor(state, ownProps.focusedPageId);
  return {
    editor,
    isEditorOpened: editor && editor.isOpened,
  };
};

const mapDispatchToProps = (dispatch, { pageId }) => bindActionCreators({
  closeEditor: () => closeEditor(pageId),
  openEditor: (viewId, viewType, configuration) => openEditor(
    pageId,
    viewId,
    viewType,
    configuration
  ),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
