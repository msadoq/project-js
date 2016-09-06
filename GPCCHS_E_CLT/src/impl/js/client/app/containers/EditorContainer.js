import React from 'react';
import Editor from '../components/Editor';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeEditor } from '../store/actions/pages';
import { switchSubVisibility, requestSub } from '../store/actions/views';

const EditorContainer = props => <Editor {...props} />;

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps.editor,
    configuration: state.views[ownProps.viewId],
    viewId: ownProps.viewId,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators({
    closeEditor: () => closeEditor(ownProps.pageId),
    switchSubVisibility: (subId) => switchSubVisibility(ownProps.viewId, subId),
    requestSub: (subType) => requestSub(ownProps.viewId, subType),
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);
