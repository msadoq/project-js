// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting
//  between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPage and getPages selectors
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getView/getViews simple selectors in
//  store/reducers/views
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix bugs in PlotView/TextView editors
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Rewrite PlotView EntryPointDetailsContainer
//  selectors .
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Move getFocusedPageTimelines in global
//  store/selectors .
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Plot & Text editor panels and sub-panels are stored
//  in store.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Plot & Text editor panels and sub-panels are stored
//  in store.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : In Text Plot and Dynamic, domain is a dropdown list
//  of available domains, timeline is not a free dropdown anymore.
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Split ui reducer + prepare ui/dialog reducer
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
import WithForm from '../../../common/Hoc/WithForm';
import {
  getSelectedComObjectName,
  getSelectedDomainInForm,
  getSelectedTimelineId,
  getSelectedCatalogName,
  getSelectedItemName,
} from '../../../commonEditor/Fields/selectors';

const mapStateToProps = (state, props) => ({
  axes: getAxes(state, props),
  timelines: getFocusedPageTimelines(state, props),
  panels: getViewEntryPointsSubPanels(state, props),
  domains: getDomains(state),
  selectedDomainName: getSelectedDomainInForm(props.form, state),
  selectedTimelineId: getSelectedTimelineId(props.form, state),
  selectedCatalogName: getSelectedCatalogName(props.form, state),
  selectedItemName: getSelectedItemName(props.form, state),
  selectedComObjectName: getSelectedComObjectName(props.form, state),
});

const mapDispatchToProps = {
  updateViewSubPanels,
  updateEntryPoint,
  removeEntryPoint,
};

const EntryPointDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(
  WithForm(EntryPointDetails)
);

EntryPointDetailsContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default EntryPointDetailsContainer;
