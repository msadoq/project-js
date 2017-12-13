// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getView/getViews simple selectors in store/reducers/views
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add getEntryPoints selector in PlotView configuration selectors
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add selectors in configurationSelectors + tests
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Plot & Text editor panels and sub-panels are stored in store.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Plot & Text editor panels and sub-panels are stored in store.
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Split ui reducer + prepare ui/dialog reducer
// END-HISTORY
// ====================================================================

import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getAxes, getShowYAxes, getEntryPoints } from 'viewManager/PlotView/store/configurationSelectors';
import { getViewSubPanels } from 'store/reducers/ui/editor';
import { updateViewSubPanels } from 'store/actions/ui';
import {
  removeAxis,
  updateAxis,
  addAxis,
  updateShowYAxes,
} from 'store/actions/views';
import PlotAxes from './PlotAxes';

const mapStateToProps = createStructuredSelector({
  axes: getAxes,
  entryPoints: getEntryPoints,
  showYAxes: getShowYAxes,
  panels: getViewSubPanels,
});

const mapDispatchToProps = {
  removeAxis,
  updateAxis,
  addAxis,
  updateShowYAxes,
  updateViewSubPanels,
};

const PlotAxesContainer = connect(mapStateToProps, mapDispatchToProps)(PlotAxes);

PlotAxesContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default PlotAxesContainer;
