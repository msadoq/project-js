import { connect } from 'react-redux';
import { getSessions } from 'store/reducers/sessions';
import {
  updateId,
  updateOffset,
  updateSessionName,
  updateColor,
} from 'store/actions/timelines';
import {
  updateMasterId,
} from 'store/actions/timebars';
import {
  getTimebarTimelinesSelector,
} from 'store/selectors/timebars';
import {
  getTimebar,
} from 'store/reducers/timebars';
import {
  getTimeline,
} from 'store/reducers/timelines';
import EditTimelineWrapper from './EditTimelineWrapper';

const mapStateToProps = (state, { timebarUuid, timelineUuid }) => ({
  timelines: getTimebarTimelinesSelector(state, { timebarUuid }),
  sessions: getSessions(state),
  timebar: getTimebar(state, { timebarUuid }),
  timeline: getTimeline(state, { timelineUuid }),
});

const mapDispatchToProps = {
  updateId,
  updateOffset,
  updateSessionName,
  updateColor,
  updateMasterId,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTimelineWrapper);
