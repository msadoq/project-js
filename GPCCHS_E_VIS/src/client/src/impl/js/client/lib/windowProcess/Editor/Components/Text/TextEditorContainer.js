import { PropTypes } from 'react';
import { connect } from 'react-redux';
import TextEditor from './TextEditor';
import * as actions from '../../../../store/actions/views';

const TextEditorContainer = connect(null, actions)(TextEditor);

TextEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
  viewType: PropTypes.string.isRequired,
  configuration: PropTypes.object,
  closeEditor: PropTypes.func,
};

export default TextEditorContainer;
