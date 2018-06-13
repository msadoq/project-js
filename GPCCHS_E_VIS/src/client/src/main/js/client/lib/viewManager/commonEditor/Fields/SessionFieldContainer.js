import { connect } from 'react-redux';
import SessionField from './SessionField';
import { getSessions } from '../../../store/reducers/sessions';

const mapStateToProps = state => ({
  sessions: getSessions(state),
});

const SessionFieldContainer = connect(mapStateToProps, {})(SessionField);

export default SessionFieldContainer;
