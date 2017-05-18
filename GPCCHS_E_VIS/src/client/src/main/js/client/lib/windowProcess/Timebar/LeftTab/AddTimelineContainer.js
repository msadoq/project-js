import { connect } from 'react-redux';
import { getSessions } from '../../../store/reducers/sessions';
import {
  createNewTimeline,
  updateOffset,
} from '../../../store/actions/timelines';
import {
  updateMasterId,
} from '../../../store/actions/timebars';
import {
  getTimebarTimelinesSelector,
} from '../../../store/selectors/timebars';
import {
  getTimebar,
} from '../../../store/reducers/timebars';
import AddTimelineWrapper from './AddTimelineWrapper';

const mapStateToProps = (state, { timebarUuid }) => {
  const timebar = getTimebar(state, { timebarUuid });
  return {
    timelines: getTimebarTimelinesSelector(state, { timebarUuid }),
    sessions: getSessions(state),
    masterId: timebar.masterId,
  };
};

const mapDispatchToProps = {
  createNewTimeline,
  updateMasterId,
  updateOffset,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTimelineWrapper);
