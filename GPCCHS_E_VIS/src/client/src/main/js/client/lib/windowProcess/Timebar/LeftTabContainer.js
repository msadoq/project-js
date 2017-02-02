import { connect } from 'react-redux';
import { addAndMountTimeline, unmountTimeline, updateMasterId } from '../../store/actions/timebars';
import { updateTimebarId } from '../../store/actions/pages';
import {
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
    addAndMountTimeline,
    updateId,
    unmountTimeline,
    updateTimebarId,
  }

)(LeftTab);
