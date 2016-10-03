import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Page from './Page';
import { getEditor, getPage } from '../../store/mutations/pageReducer';
import { openEditor, closeEditor } from '../../store/mutations/pageActions';

const PageContainer = props => <Page {...props} />;

const mapStateToProps = (state, { windowId, pageId }) => {
  const { timebarId } = getPage(state, pageId);
  return {
    windowId,
    pageId,
    timebarId,
    editor: getEditor(state, pageId),
    isEditorOpened: getEditor(state, pageId).isOpened
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
