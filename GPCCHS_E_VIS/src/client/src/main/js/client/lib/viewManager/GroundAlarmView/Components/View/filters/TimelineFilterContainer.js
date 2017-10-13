import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import TimelineFilter from './TimelineFilter';
import { getAlarmTimeline } from '../../../store/configurationReducer';
import * as actions from '../../../store/actions';
import { getTimelinesByViewId } from '../../../../../store/selectors/timelines';

const mapStateToProps = createStructuredSelector({
  timeline: getAlarmTimeline,
  availableTimelines: getTimelinesByViewId,
});

const mapDispatchToProps = (dispatch, { viewId }) => ({
  updateTimeline: domain => dispatch(actions.updateAlarmTimeline(viewId, domain)),
});

const TimelineFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineFilter);

TimelineFilterContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default TimelineFilterContainer;
