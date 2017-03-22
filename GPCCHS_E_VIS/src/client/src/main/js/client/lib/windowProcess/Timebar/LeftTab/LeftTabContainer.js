import { connect } from 'react-redux';
import { updateMasterId } from '../../../store/actions/timebars';
import { updateTimebarId } from '../../../store/actions/pages';
import {
  createNewTimeline,
  removeTimeline,
  updateId,
  updateOffset,
  updateSessionId,
  updateColor,
} from '../../../store/actions/timelines';
import LeftTab from './LeftTab';

export default connect(
  state => ({ sessions: state.sessions }),
  {
    updateMasterId,
    updateOffset,
    updateSessionId,
    updateColor,
    createNewTimeline,
    updateId,
    removeTimeline,
    updateTimebarId,
  }

)(LeftTab);
