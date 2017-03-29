import { connect } from 'react-redux';
import { updateMasterId } from '../../../store/actions/timebars';
import { updateTimebarId, collapseTimebar } from '../../../store/actions/pages';
import {
  createNewTimeline,
  removeTimeline,
  updateId,
  updateOffset,
  updateSessionName,
  updateColor,
} from '../../../store/actions/timelines';
import LeftTab from './LeftTab';

export default connect(
  state => ({ sessions: state.sessions }),
  {
    collapseTimebar,
    updateMasterId,
    updateOffset,
    updateSessionName,
    updateColor,
    createNewTimeline,
    updateId,
    removeTimeline,
    updateTimebarId,
  }

)(LeftTab);
