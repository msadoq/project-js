import { PropTypes } from 'react';
import { connect } from 'react-redux';
import EntryPointDetails from './EntryPointDetails';
import { getView } from '../../../../store/selectors/views';
import { getPage } from '../../../../store/selectors/pages';
import { getTimebarTimelinesSelector } from '../../../../store/selectors/timebars';
import {
  updateEntryPoint,
  removeEntryPoint
} from '../../../../store/actions/views';

const mapStateToProps = (state, { viewId, focusedPageId }) => {
  const view = getView(state, viewId);
  const { timebarUuid } = getPage(state, focusedPageId);
  const timelines = getTimebarTimelinesSelector(state, timebarUuid);
  return {
    axes: view.configuration.axes,
    timelines
  };
};

const EntryPointDetailsContainer = connect(mapStateToProps, {
  updateEntryPoint,
  removeEntryPoint
})(EntryPointDetails);

EntryPointDetailsContainer.propTypes = {
  viewId: PropTypes.string.isRequired
};

export default EntryPointDetailsContainer;
