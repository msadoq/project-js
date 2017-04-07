import { connect } from 'react-redux';
import { updateMasterId } from '../../../store/actions/timebars';
import { updateTimebarId } from '../../../store/actions/pages';
import { getSessions } from '../../../store/reducers/sessions';
import {
  createNewTimeline,
  removeTimeline,
  updateId,
  updateOffset,
  updateSessionName,
  updateColor,
} from '../../../store/actions/timelines';
import LeftTab from './LeftTab';

const mapStateToProps = state => ({
  sessions: getSessions(state),
});

const mapDispatchToProps = {
  updateMasterId,
  updateOffset,
  updateSessionName,
  updateColor,
  createNewTimeline,
  updateId,
  removeTimeline,
  updateTimebarId,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftTab);
