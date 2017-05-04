import { connect } from 'react-redux';
import {
  addEntryPoint,
} from '../../../../store/actions/views';
import { getConfigurationByViewId } from '../../../../viewManager';
import AddEntryPointWrapper from './AddEntryPointWrapper';

export default connect(
  (state, { viewId }) => {
    const viewConfiguration = getConfigurationByViewId(state, { viewId });
    console.log('viewConfiguration', viewConfiguration);
    return {
      axes: viewConfiguration.axes,
    };
  },
  { addEntryPoint }
)(AddEntryPointWrapper);
