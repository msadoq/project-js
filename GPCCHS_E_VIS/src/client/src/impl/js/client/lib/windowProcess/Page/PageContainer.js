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

const mapDispatchToProps = (dispatch, { focusedPageId }) => bindActionCreators({
  closeEditor: () => closeEditor(focusedPageId),
  openEditor: (viewId, viewType, configuration) => openEditor(
    focusedPageId,
    viewId,
    viewType,
    configuration
  ),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
