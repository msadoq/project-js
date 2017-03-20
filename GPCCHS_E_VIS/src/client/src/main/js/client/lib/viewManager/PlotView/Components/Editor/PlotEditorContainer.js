import _ from 'lodash/fp';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import PlotEditor from './PlotEditor';
import {
  addEntryPoint,
  removeEntryPoint,
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
};

const PlotEditorContainer = connect(mapStateToProps, mapDispatchToProps)(PlotEditor);

PlotEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default PlotEditorContainer;
