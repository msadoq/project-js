// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : General Editor Refacto : using GenericModal, using rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : General Editor Refacto : using GenericModal, using rc-collapse module instead of bootstrap accordion.
// END-HISTORY
// ====================================================================

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
