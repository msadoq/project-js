import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getFocusedPage } from 'store/selectors/pages';
import { getTimebarTimelinesSelector } from 'store/selectors/timebars';
import { updateViewSubPanels } from 'store/actions/ui';
import { getViewEntryPointsSubPanels } from 'store/reducers/ui/editor';
import { getDomains } from 'store/reducers/domains';
import {
  updateEntryPoint,
  removeEntryPoint,
} from 'store/actions/views';
import EntryPointDetails from './EntryPointDetails';

const mapStateToProps = (state, { windowId, viewId, entryPoint }) => {
  const { timebarUuid } = getFocusedPage(state, { windowId });
  return {
    timelines: getTimebarTimelinesSelector(state, { timebarUuid }),
    panels: getViewEntryPointsSubPanels(state, { viewId, entryPoint }),
    domains: getDomains(state),
  };
};

const EntryPointDetailsContainer = connect(mapStateToProps, {
  updateEntryPoint,
  removeEntryPoint,
  updateViewSubPanels,
})(EntryPointDetails);

EntryPointDetailsContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default EntryPointDetailsContainer;
