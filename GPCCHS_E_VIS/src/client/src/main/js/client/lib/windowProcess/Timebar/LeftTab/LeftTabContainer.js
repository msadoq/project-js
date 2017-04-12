import { connect } from 'react-redux';
import { updateTimebarId } from '../../../store/actions/pages';
import { getSessions } from '../../../store/reducers/sessions';
import {
  createNewTimeline,
  removeTimeline,
} from '../../../store/actions/timelines';
import {
  open as openModal,
} from '../../../store/actions/modals';
import LeftTab from './LeftTab';

const mapStateToProps = state => ({
  sessions: getSessions(state),
});

const mapDispatchToProps = {
  createNewTimeline,
  removeTimeline,
  updateTimebarId,
  openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftTab);
