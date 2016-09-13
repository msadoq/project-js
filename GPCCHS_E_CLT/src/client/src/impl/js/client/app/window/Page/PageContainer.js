import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Page from './Page';
import { getEditor } from '../../store/mutations/pageReducer';
import { openEditor, closeEditor } from '../../store/mutations/pageActions';

const PageContentContainer = props => <Page {...props} />;

const mapStateToProps = (state, { windowId, pageId }) => {
  return {
    windowId,
    pageId,
    editor: getEditor(state, pageId),
  }
};

const mapDispatchToProps = (dispatch, { pageId }) => {
  return bindActionCreators({
    openEditor: (viewId, viewType, configuration) => openEditor(
      pageId,
      viewId,
      viewType,
      configuration
    ),
    closeEditor: () => closeEditor(pageId),
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageContentContainer);
