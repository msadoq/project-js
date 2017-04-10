import { createStructuredSelector } from 'reselect';
import { PropTypes } from 'react';
import { connect } from 'react-redux';

import TextEditor from './TextEditor';
import {
  addEntryPoint,
  removeEntryPoint,
  updateTitle,
  updateTitleStyle,
} from '../../../../store/actions/views';
import { getConfigurationByViewId } from '../../../../viewManager';

const mapStateToProps = createStructuredSelector({
  configuration: getConfigurationByViewId,
});

const mapDispatchToProps = {
  addEntryPoint,
  removeEntryPoint,
  updateTitle,
  updateTitleStyle,
};

const TextEditorContainer = connect(mapStateToProps, mapDispatchToProps)(TextEditor);

TextEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default TextEditorContainer;
