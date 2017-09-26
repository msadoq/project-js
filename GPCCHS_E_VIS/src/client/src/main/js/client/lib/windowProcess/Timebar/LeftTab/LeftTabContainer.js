// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Reorganized files and folders in windowProcess/Timebar
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : Timebar is collapsable. action reducer test.
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Using selectors in Timebar/LeftTab/LeftTabContainer .
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : Collapse / minimize buttons on panel dividers. New colors for dividers, darker.
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : New GenericModal component displayed or not displayed at root (Window.js) AddTimeline and EditTimeline forms displayed through it.
// VERSION : 1.1.2 : DM : #5828 : 13/04/2017 : Lint errors fixes and useless props removed in LeftTab / AddTimelineWrapper.
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : split updateTimebarId in mountTimebar and unmountTimebar
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : split updateTimebarId in mountTimebar and unmountTimebar
// END-HISTORY
// ====================================================================

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
