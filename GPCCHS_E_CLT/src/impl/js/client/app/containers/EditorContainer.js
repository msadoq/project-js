import React from 'react';
import Editor from '../components/Editor';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeEditor } from '../actions/pages';

const EditorContainer = props => <Editor {...props} />;

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps.editor,
    configuration: state.views[ownProps.viewId],
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators({
    closeEditor: () => closeEditor(ownProps.pageId),
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);
