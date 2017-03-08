import { connect } from 'react-redux';
import { updateMasterId } from '../../store/actions/timebars';
import { unmountTimeline } from '../../store/actions/timebarTimelines';
import { updateTimebarId } from '../../store/actions/pages';
import {
  addNewTimeline,
  updateId,
  updateOffset,
  updateSessionId,
  updateColor,
} from '../../store/actions/timelines';
import LeftTab from './LeftTab';

export default connect(
  state => ({ sessions: state.sessions }),
  {
    updateMasterId,
    updateOffset,
    updateSessionId,
    updateColor,
    addNewTimeline,
    updateId,
    unmountTimeline,
    updateTimebarId,
  }

)(LeftTab);
