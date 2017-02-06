import { PropTypes } from 'react';
import { connect } from 'react-redux';
import EntryPointDetails from './EntryPointDetails';
import { getPage } from '../../../../store/selectors/pages';
import { getTimebarTimelinesSelector } from '../../../../store/selectors/timebars';
import {
  updateEntryPoint,
  removeEntryPoint,
} from '../../../../store/actions/views';

const mapStateToProps = (state, { focusedPageId }) => {
  const { timebarUuid } = getPage(state, focusedPageId);
  return {
    timelines: getTimebarTimelinesSelector(state, timebarUuid),
  };
};

const EntryPointDetailsContainer = connect(mapStateToProps, {
  updateEntryPoint,
  removeEntryPoint,
})(EntryPointDetails);

EntryPointDetailsContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default EntryPointDetailsContainer;
