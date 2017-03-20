import { connect } from 'react-redux';
import ServerInfo from './ServerInfo';
import { getDomains } from '../../../store/reducers/domains';
import { getSessions } from '../../../store/selectors/sessions';

const mapStateToProps = state => ({
  sessions: getSessions(state),
  domains: getDomains(state),
});

const ServerInfoContainer = connect(mapStateToProps)(ServerInfo);

export default ServerInfoContainer;
