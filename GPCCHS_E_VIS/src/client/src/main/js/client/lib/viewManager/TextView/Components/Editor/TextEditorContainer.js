import { createStructuredSelector } from 'reselect';
import { PropTypes } from 'react';
import { connect } from 'react-redux';

import TextEditor from './TextEditor';
import {
  removeEntryPoint,
  updateTitle,
  updateTitleStyle,
} from '../../../../store/actions/views';
import {
  open as openModal,
} from '../../../../store/actions/modals';
import { getConfigurationByViewId } from '../../../../viewManager';

const mapStateToProps = createStructuredSelector({
  configuration: getConfigurationByViewId,
});

const mapDispatchToProps = {
  removeEntryPoint,
  updateTitle,
  updateTitleStyle,
  openModal,
};

const TextEditorContainer = connect(mapStateToProps, mapDispatchToProps)(TextEditor);

TextEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default TextEditorContainer;
