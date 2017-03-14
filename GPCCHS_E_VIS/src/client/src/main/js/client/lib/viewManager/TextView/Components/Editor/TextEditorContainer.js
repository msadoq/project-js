import _ from 'lodash/fp';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import TextEditor from './TextEditor';
import {
  addEntryPoint,
  removeEntryPoint,
  updateTitle,
  updateTitleStyle,
} from '../../../../store/actions/views';

const mapStateToProps = (state, { viewId }) => {
  const getConfiguration = _.get(`views[${viewId}].configuration`);
  return {
    configuration: getConfiguration(state),
  };
};

const mapDispatchToProps = {
  addEntryPoint,
  removeEntryPoint,
  updateTitle,
  updateTitleStyle,
};

const TextEditorContainer = connect(mapStateToProps, mapDispatchToProps)(TextEditor);

TextEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
  viewType: PropTypes.string.isRequired,
  closeEditor: PropTypes.func,
};

export default TextEditorContainer;
