import { connect } from 'react-redux';
import { addAndMountTimeline, unmountTimeline, updateMasterId } from '../../store/actions/timebars';
import { updateTimebarId } from '../../store/actions/pages';
import { updateId, updateOffset } from '../../store/actions/timelines';
import Lefttab from './Lefttab';

export default connect(
  state => ({ sessions: state.sessions }),
  {
    updateMasterId,
    updateOffset,
    addAndMountTimeline,
    updateId,
    unmountTimeline,
    updateTimebarId,
  }

)(Lefttab);
