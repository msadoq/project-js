// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 27/04/2017 : Uniforming new EP process for PlotView and textView.
//  Fot PlotView EP, user might choose unit and axis in form to prevent VIMA from auto-creating Y
//  axis.
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Plot & Text editor panels and sub-panels are stored
//  in store.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Plot & Text editor panels and sub-panels are stored
//  in store.
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { connect } from 'react-redux';
import {
  addEntryPoint,
} from 'store/actions/views';
import { getConfigurationByViewId } from 'viewManager';
import AddEntryPointWrapper from './AddEntryPointWrapper';

export default connect(
  (state, { viewId }) => {
    const viewConfiguration = getConfigurationByViewId(state, { viewId });

    const selectableAxes = _.omit('time', viewConfiguration.axes);

    return {
      axes: selectableAxes,
    };
  },
  { addEntryPoint }
)(AddEntryPointWrapper);
