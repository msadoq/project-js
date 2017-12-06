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
