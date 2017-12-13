// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPage and getPages selectors
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getView/getViews simple selectors in store/reducers/views
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix bugs in PlotView/TextView editors
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Rewrite PlotView EntryPointDetailsContainer selectors .
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Move getFocusedPageTimelines in global store/selectors .
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Plot & Text editor panels and sub-panels are stored in store.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Plot & Text editor panels and sub-panels are stored in store.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : In Text Plot and Dynamic, domain is a dropdown list of available domains, timeline is not a free dropdown anymore.
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Split ui reducer + prepare ui/dialog reducer
// END-HISTORY
// ====================================================================

import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getFocusedPageTimelines } from 'store/selectors/timelines';

import { getAxes } from 'viewManager/PlotView/store/configurationSelectors';
import { updateViewSubPanels } from 'store/actions/ui';
import { getViewEntryPointsSubPanels } from 'store/reducers/ui/editor';
import { getDomains } from 'store/reducers/domains';
import {
  updateEntryPoint,
  removeEntryPoint,
} from 'store/actions/views';
import EntryPointDetails from './EntryPointDetails';

const mapStateToProps = createStructuredSelector({
  axes: getAxes,
  timelines: getFocusedPageTimelines,
  panels: getViewEntryPointsSubPanels,
  domains: getDomains,
});

const mapDispatchToProps = {
  updateViewSubPanels,
  updateEntryPoint,
  removeEntryPoint,
};

const EntryPointDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(EntryPointDetails);

EntryPointDetailsContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default EntryPointDetailsContainer;
