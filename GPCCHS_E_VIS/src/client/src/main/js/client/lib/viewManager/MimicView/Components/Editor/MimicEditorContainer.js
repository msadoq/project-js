import { PropTypes } from 'react';
import { connect } from 'react-redux';
import MimicEditor from './MimicEditor';
import {
  addEntryPoint,
  removeEntryPoint,
  updateTitle,
  updateTitleStyle,
} from '../../../../store/actions/views';
import { getConfiguration } from '../../store/configurationReducer';

const mapStateToProps = (state, { viewId }) =>
  ({
    configuration: getConfiguration(viewId)(state),
  });

const mapDispatchToProps = {
  addEntryPoint,
  removeEntryPoint,
  updateTitle,
  updateTitleStyle,
};

const MimicEditorContainer = connect(mapStateToProps, mapDispatchToProps)(MimicEditor);

MimicEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default MimicEditorContainer;
