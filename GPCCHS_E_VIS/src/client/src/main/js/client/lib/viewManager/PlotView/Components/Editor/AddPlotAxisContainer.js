import { connect } from 'react-redux';
import { getConfigurationByViewId } from 'viewManager';
import {
  addAxis,
} from 'store/actions/views';
import AddPlotAxisWrapper from './AddPlotAxisWrapper';

export default connect(
  (state, { viewId }) => {
    const viewConfiguration = getConfigurationByViewId(state, { viewId });
    return {
      axes: viewConfiguration.axes,
    };
  },
  { addAxis }
)(AddPlotAxisWrapper);
