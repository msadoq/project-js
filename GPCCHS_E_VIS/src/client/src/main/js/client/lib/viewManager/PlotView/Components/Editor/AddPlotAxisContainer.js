import { connect } from 'react-redux';
import AddPlotAxisWrapper from './AddPlotAxisWrapper';
import { getConfigurationByViewId } from '../../../../viewManager';
import {
  addAxis,
} from '../../../../store/actions/views';

export default connect(
  (state, { viewId }) => {
    const viewConfiguration = getConfigurationByViewId(state, { viewId });
    return {
      axes: viewConfiguration.axes,
    };
  },
  { addAxis }
)(AddPlotAxisWrapper);
