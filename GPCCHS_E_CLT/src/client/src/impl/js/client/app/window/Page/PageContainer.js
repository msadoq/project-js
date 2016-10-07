import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Page from './Page';
import { getEditor } from '../../store/mutations/pageReducer';
import { openEditor, closeEditor } from '../../store/mutations/pageActions';

const PageContainer = props => <Page {...props} />;

const mapStateToProps = (state, ownProps) => {
  const editor = getEditor(state, ownProps.focusedPageId);
  return {
    ...ownProps,
    editor,
    isEditorOpened: editor && editor.isOpened,
  }
};

const mapDispatchToProps = (dispatch, { pageId }) => bindActionCreators({
  openEditor: (viewId, viewType, configuration) => openEditor(
    pageId,
    viewId,
    viewType,
    configuration
  ),
  closeEditor: () => closeEditor(pageId),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
