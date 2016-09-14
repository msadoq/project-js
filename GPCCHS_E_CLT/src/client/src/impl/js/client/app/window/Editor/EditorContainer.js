import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { closeEditor } from '../store/mutations/pageActions';
import Editor from './Editor';

const EditorContainer = props => <Editor {...props} />;

// function mapStateToProps(state, ownProps) {
//   return {
//     ...ownProps.editor,
//     configuration: state.views[ownProps.viewId],
//     viewId: ownProps.viewId,
//   };
// }
//
// function mapDispatchToProps(dispatch, ownProps) {
//   return bindActionCreators({
//     closeEditor: () => closeEditor(ownProps.pageId),
//     requestSub: (subType) => requestSub(ownProps.viewId, subType),
//   }, dispatch);
// }

export default connect()(EditorContainer);
