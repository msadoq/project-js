import { PropTypes } from 'react';
import { connect } from 'react-redux';
import PlotEditor from './PlotEditor';
import {
  addEntryPoint,
  removeEntryPoint,
} from '../../../../store/actions/views';

const PlotEditorContainer = connect(
  null,
  {
    addEntryPoint,
    removeEntryPoint,
  }
)(PlotEditor);

PlotEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
  viewType: PropTypes.string.isRequired,
  configuration: PropTypes.object,
  closeEditor: PropTypes.func
};

export default PlotEditorContainer;
