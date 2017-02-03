import { PropTypes } from 'react';
import { connect } from 'react-redux';
import PerView from './PerView';
import { getSessions } from '../../../store/selectors/sessions';
import { getDomains } from '../../../store/selectors/domains';

const mapStateToProps = (state) => {
  const sessions = getSessions(state);
  const domains = getDomains(state);

  return {
    sessions,
    domains,
  };
};


const PerViewContainer = connect(mapStateToProps)(PerView);

PerViewContainer.propTypes = {
  perView: PropTypes.object.isRequired,
  parseFormula: PropTypes.func.isRequired,
  views: PropTypes.object.isRequired,
};

export default PerViewContainer;
