import { connect } from 'react-redux';
import { unmountPageTimebar } from '../../../store/actions/pages';
import { getSessions } from '../../../store/reducers/sessions';
import {
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
  removeTimeline,
  unmountPageTimebar,
  openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftTab);
