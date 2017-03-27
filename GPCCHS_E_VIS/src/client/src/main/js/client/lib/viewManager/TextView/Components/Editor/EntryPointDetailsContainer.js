import { PropTypes } from 'react';
import { connect } from 'react-redux';
import EntryPointDetails from './EntryPointDetails';
import { getFocusedPage } from '../../../../store/selectors/pages';
import { getTimebarTimelinesSelector } from '../../../../store/selectors/timebars';
import {
  updateEntryPoint,
  removeEntryPoint,
} from '../../../../store/actions/views';

const mapStateToProps = (state, { windowId }) => {
  const { timebarUuid } = getFocusedPage(state, { windowId });
  return {
    timelines: getTimebarTimelinesSelector(state, { timebarUuid }),
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
