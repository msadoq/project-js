import { connect } from 'react-redux';
import ServerInfo from './ServerInfo';
import { getSessions } from '../../../store/selectors/sessions';
import { getDomains } from '../../../store/selectors/domains';

const mapStateToProps = state => ({
  sessions: getSessions(state),
  domains: getDomains(state),
});

const ServerInfoContainer = connect(mapStateToProps)(ServerInfo);

export default ServerInfoContainer;
