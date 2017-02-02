import { PropTypes } from 'react';
import { connect } from 'react-redux';
import TextEditor from './TextEditor';
import {
  addEntryPoint,
  removeEntryPoint,
  updateTitle,
  updateTitleStyle,
} from '../../../../store/actions/views';

const TextEditorContainer = connect(
  null,
  {
    addEntryPoint,
    removeEntryPoint,
    updateTitle,
    updateTitleStyle,
  }
)(TextEditor);

TextEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
  viewType: PropTypes.string.isRequired,
  configuration: PropTypes.object,
  closeEditor: PropTypes.func,
};

export default TextEditorContainer;
