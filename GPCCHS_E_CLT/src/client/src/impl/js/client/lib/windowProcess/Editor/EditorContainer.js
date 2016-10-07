import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { closeEditor } from '../store/actions/pages';
import Editor from './Editor';

const EditorContainer = props => <Editor {...props} />;

EditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
  viewType: PropTypes.string.isRequired,
  configuration: PropTypes.object,
  closeEditor: PropTypes.func,
};

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
//   }, dispatch);
// }

export default connect()(EditorContainer);
