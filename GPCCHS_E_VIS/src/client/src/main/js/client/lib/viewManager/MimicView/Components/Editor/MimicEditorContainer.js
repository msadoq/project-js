import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MimicEditor from './MimicEditor';
import {
  addEntryPoint,
  removeEntryPoint,
  updateTitle,
  updateTitleStyle,
} from '../../../../store/actions/views';
import { getConfigurationByViewId } from '../../../../viewManager';
import {
  open as openModal,
} from '../../../../store/actions/modals';

const mapStateToProps = createStructuredSelector({
  configuration: getConfigurationByViewId,
});

const mapDispatchToProps = {
  addEntryPoint,
  removeEntryPoint,
  updateTitle,
  updateTitleStyle,
  openModal,
};

const MimicEditorContainer = connect(mapStateToProps, mapDispatchToProps)(MimicEditor);

MimicEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default MimicEditorContainer;
