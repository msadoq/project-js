import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TextEditor from './TextEditor';

const TextEditorContainer = props => <TextEditor {...props} />;

TextEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
  viewType: PropTypes.string.isRequired,
  configuration: PropTypes.object,
  closeEditor: PropTypes.func,
};

export default connect()(TextEditorContainer);
