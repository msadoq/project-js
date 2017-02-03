import { PropTypes } from 'react';
import { connect } from 'react-redux';
import PerRemoteId from './PerRemoteId';
import { getTimebars } from '../../../store/selectors/timebars';
import { getSessions } from '../../../store/selectors/sessions';
import { getDomains } from '../../../store/selectors/domains';

const mapStateToProps = (state) => {
  const timebars = getTimebars(state);
  const sessions = getSessions(state);
  const domains = getDomains(state);

  return {
    timebars,
    sessions,
    domains,
  };
};

const PerRemoteIdContainer = connect(mapStateToProps)(PerRemoteId);

PerRemoteIdContainer.propTypes = {
  perRemoteId: PropTypes.object.isRequired,
};

export default PerRemoteIdContainer;
