import { connect } from 'react-redux';
import { PropTypes } from 'react';
import { ServerInfo } from './ServerInfo';
// import { getSessions } from '../../../store/selectors/sessions';
// import { getDomains } from '../../../store/selectors/domains';

// const mapStateToProps = (state) => {
//   const sessions = getSessions(state);
//   const domains = getDomains(state);
//   return {
//     sessions,
//     domains,
//   };
// };

const ServerInfoContainer = connect()(ServerInfo);

ServerInfoContainer.propTypes = {
  server: PropTypes.object.isRequired,
};

export default ServerInfoContainer;
