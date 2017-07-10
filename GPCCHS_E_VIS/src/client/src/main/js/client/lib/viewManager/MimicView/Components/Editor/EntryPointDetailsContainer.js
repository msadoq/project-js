import { PropTypes } from 'react';
import { connect } from 'react-redux';
import EntryPointDetails from './EntryPointDetails';
import { getFocusedPage } from '../../../../store/selectors/pages';
import { getTimebarTimelinesSelector } from '../../../../store/selectors/timebars';
import {
  updateEntryPoint,
  removeEntryPoint,
} from '../../../../store/actions/views';
import { getViewEntryPointsSubPanels } from '../../../../store/reducers/ui/editor';
import { updateViewSubPanels } from '../../../../store/actions/ui';

const mapStateToProps = (state, { windowId, viewId, entryPoint }) => {
  const { timebarUuid } = getFocusedPage(state, { windowId });
  return {
    timelines: getTimebarTimelinesSelector(state, { timebarUuid }),
    panels: getViewEntryPointsSubPanels(state, { viewId, entryPoint }),
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
